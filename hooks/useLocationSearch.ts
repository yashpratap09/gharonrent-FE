import { useState, useCallback, useRef } from 'react';
import { placesApi, PlaceSuggestion, PlaceDetails } from '@/lib/api/places';

export type { PlaceSuggestion, PlaceDetails };

export const useLocationSearch = () => {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const debouncedFetchSuggestions = useCallback((input: string) => {
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

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setLoading(false);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  }, []);

  return {
    suggestions,
    loading,
    error,
    getPlaceDetails,
    clearSuggestions,
    debouncedFetchSuggestions
  };
};
