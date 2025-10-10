"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocationSearch, PlaceSuggestion, PlaceDetails } from "@/hooks/useLocationSearch";

interface LocationSearchProps {
  placeholder?: string;
  className?: string;
  onLocationSelect?: (location: PlaceDetails) => void;
  onInputChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
}

export const LocationSearch = ({
  placeholder = "Enter city, area, or landmark",
  className,
  onLocationSelect,
  onInputChange,
  value = "",
  disabled = false
}: LocationSearchProps) => {
  const [localValue, setLocalValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const initialValue = useRef(value);

  const {
    suggestions,
    loading,
    error,
    getPlaceDetails,
    clearSuggestions,
    debouncedFetchSuggestions
  } = useLocationSearch();

  // Only sync once on mount or when value changes significantly
  useEffect(() => {
    if (initialValue.current !== value) {
      setLocalValue(value);
      initialValue.current = value;
    }
  }, [value]);

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onInputChange?.(newValue);
    
    // Call API with debounce
    debouncedFetchSuggestions(newValue);
    
    setIsOpen(true);
    setSelectedIndex(-1);
  }, [onInputChange, debouncedFetchSuggestions]);

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback(async (suggestion: PlaceSuggestion) => {
    const selectedText = suggestion.main_text || suggestion.description;
    setLocalValue(selectedText);
    setIsOpen(false);
    clearSuggestions();
    onInputChange?.(selectedText);

    // Fetch detailed place information
    if (onLocationSelect) {
      const details = await getPlaceDetails(suggestion.place_id);
      if (details) {
        onLocationSelect(details);
      }
    }
  }, [onLocationSelect, getPlaceDetails, clearSuggestions]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
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
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show suggestions when there are results
  useEffect(() => {
    if (suggestions.length > 0) {
      setIsOpen(true);
    }
  }, [suggestions]);

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
          value={localValue}
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
};
