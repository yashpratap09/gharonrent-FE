"use client";

import { useState, useRef, useCallback, memo, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { placesApi, PlaceSuggestion, PlaceDetails } from '@/lib/api/places';

interface LocationSearchOptimizedProps {
  placeholder?: string;
  className?: string;
  onLocationSelect?: (location: PlaceDetails) => void;
  onInputChange?: (value: string) => void;
  initialValue?: string;
  disabled?: boolean;
}

export const LocationSearchOptimized = memo(({
  placeholder = "Enter city, area, or landmark",
  className,
  onLocationSelect,
  onInputChange,
  initialValue = "",
  disabled = false
}: LocationSearchOptimizedProps) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  const fetchSuggestions = useCallback(async (input: string) => {
    if (!input || input.trim().length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const suggestions = await placesApi.getPlaceSuggestions(input);
      setSuggestions(suggestions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch suggestions');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedFetch = useCallback((input: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(input);
    }, 300);
  }, [fetchSuggestions]);

  const getPlaceDetails = useCallback(async (placeId: string): Promise<PlaceDetails | null> => {
    try {
      return await placesApi.getPlaceDetails(placeId);
    } catch (err) {
      console.error('Error fetching place details:', err);
      return null;
    }
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onInputChange?.(newValue);
    
    // Call API with debounce
    debouncedFetch(newValue);
    
    setIsOpen(true);
    setSelectedIndex(-1);
  }, [onInputChange, debouncedFetch]);

  const handleSuggestionSelect = useCallback(async (suggestion: PlaceSuggestion) => {
    const selectedText = suggestion.main_text || suggestion.description;
    setInputValue(selectedText);
    setIsOpen(false);
    setSuggestions([]);
    onInputChange?.(selectedText);

    // Fetch detailed place information
    if (onLocationSelect) {
      const details = await getPlaceDetails(suggestion.place_id);
      if (details) {
        onLocationSelect(details);
      }
    }
  }, [onLocationSelect, getPlaceDetails, onInputChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  }, [isOpen, suggestions, selectedIndex, handleSuggestionSelect]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !inputRef.current?.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, []);

  // Handle click outside
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [handleClickOutside]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className={cn(
            "w-full h-14 pl-12 pr-12 text-lg rounded-xl border-2 focus:border-primary",
            className
          )}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          disabled={disabled}
          autoComplete="off"
        />
        {loading && (
          <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />
        )}
      </div>

      {/* Suggestions dropdown */}
      {isOpen && (suggestions.length > 0 || loading || error) && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          {error && (
            <div className="p-4 text-sm text-destructive">
              {error}
            </div>
          )}
          
          {loading && suggestions.length === 0 && (
            <div className="p-4 text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching locations...
            </div>
          )}

          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.place_id}
              className={cn(
                "w-full text-left p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0 first:rounded-t-xl last:rounded-b-xl",
                selectedIndex === index && "bg-muted/50"
              )}
              onClick={() => handleSuggestionSelect(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex-grow min-w-0">
                  <div className="font-medium text-foreground truncate">
                    {suggestion.main_text}
                  </div>
                  {suggestion.secondary_text && (
                    <div className="text-sm text-muted-foreground truncate">
                      {suggestion.secondary_text}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

LocationSearchOptimized.displayName = 'LocationSearchOptimized';
