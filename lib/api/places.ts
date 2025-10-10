import api from '@/lib/axios';

export interface PlaceSuggestion {
  place_id: string;
  description: string;
  main_text: string;
  secondary_text: string;
  types: string[];
}

export interface PlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    lat: number;
    lng: number;
  };
}

export interface PlaceAutocompleteResponse {
  predictions: PlaceSuggestion[];
  status: string;
}

export const placesApi = {
  // Get place suggestions for autocomplete
  getPlaceSuggestions: async (input: string): Promise<PlaceSuggestion[]> => {
    if (!input || input.trim().length < 2) {
      return [];
    }

    const response = await api.get<PlaceAutocompleteResponse>(
      `/places/autocomplete?input=${encodeURIComponent(input)}`
    );
    return response.data.predictions || [];
  },

  // Get detailed place information by place ID
  getPlaceDetails: async (placeId: string): Promise<PlaceDetails | null> => {
    try {
      const response = await api.get<PlaceDetails>(`/places/details/${placeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching place details:', error);
      return null;
    }
  },
};
