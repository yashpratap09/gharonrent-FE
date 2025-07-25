import api from '@/lib/axios';

export interface Property {
  _id: string;
  title: string;
  description: string;
  bedroom: number;
  washroom: number;
  squareFeet: number;
  carParking: boolean;
  floor: number;
  rent: number;
  securityDeposit: number;
  address: string;
  fullAddress: string;
  propertyType: 'apartment' | 'house' | 'villa' | 'studio' | 'commercial';
  category: string;
  furnishTypes: 'fully' | 'semi' | 'unfurnished';
  livingCoupleAllowed: boolean;
  fullyIndependent: boolean;
  studentAllowed: boolean;
  ownerFree: boolean;
  rentNegotiable: boolean;
  brokerage?: number;
  brokerageFeeType?: string;
  propertyImages: any;
  amenities: string[];
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  featured: boolean;
  verified: boolean;
  status: 'active' | 'inactive' | 'rented';
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  propertyType?: string;
  minRent?: number;
  maxRent?: number;
  bedrooms?: number;
  location?: string;
  furnishType?: string;
  studentAllowed?: boolean;
  coupleAllowed?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'rent' | 'createdAt' | 'featured' | string;
  sortOrder?: 'asc' | 'desc' | string;
}

export interface PropertySearchResponse {
  properties: Property[];
  totalProperties: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface CreatePropertyRequest {
  title: string;
  description: string;
  bedroom: number;
  washroom: number;
  squareFeet: number;
  carParking: boolean;
  floor: number;
  rent: number;
  securityDeposit: number;
  address: string;
  fullAddress: string;
  propertyType: string;
  category: string;
  furnishTypes: string;
  livingCoupleAllowed: boolean;
  fullyIndependent: boolean;
  studentAllowed: boolean;
  ownerFree: boolean;
  rentNegotiable: boolean;
  brokerage?: number;
  brokerageFeeType?: string;
  amenities: string[];
  images: File[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Properties API functions
export const propertiesApi = {
  // Get all properties with filters
  getProperties: async (filters: PropertyFilters = {}): Promise<PropertySearchResponse> => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get<PropertySearchResponse>(
      `/properties?${params.toString()}`
    );
    return response.data;
  },

  // Get single property by ID
  getProperty: async (id: string): Promise<Property> => {
    const response = await api.get<ApiResponse<Property>>(`/properties/${id}`);
    return response.data.data;
  },

  // Create new property
  createProperty: async (propertyData: CreatePropertyRequest): Promise<Property> => {
    const formData = new FormData();
    
    // Append all property data
    Object.entries(propertyData).forEach(([key, value]) => {
      if (key === 'images') {
        // Handle file uploads
        (value as File[]).forEach((file, index) => {
          formData.append(`images[${index}]`, file);
        });
      } else if (key === 'amenities') {
        // Handle array data
        (value as string[]).forEach((amenity, index) => {
          formData.append(`amenities[${index}]`, amenity);
        });
      } else {
        formData.append(key, value.toString());
      }
    });

    const response = await api.post<ApiResponse<Property>>('/properties', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  // Update property
  updateProperty: async (id: string, propertyData: Partial<CreatePropertyRequest>): Promise<Property> => {
    const formData = new FormData();
    
    Object.entries(propertyData).forEach(([key, value]) => {
      if (key === 'images' && value) {
        (value as File[]).forEach((file, index) => {
          formData.append(`images[${index}]`, file);
        });
      } else if (key === 'amenities' && value) {
        (value as string[]).forEach((amenity, index) => {
          formData.append(`amenities[${index}]`, amenity);
        });
      } else if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    const response = await api.put<ApiResponse<Property>>(`/properties/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  // Delete property
  deleteProperty: async (id: string): Promise<void> => {
    await api.delete(`/properties/${id}`);
  },

  // Get user's properties
  getUserProperties: async (): Promise<Property[]> => {
    const response = await api.get<ApiResponse<Property[]>>('/properties/my-properties');
    return response.data.data;
  },

  // Search properties
  searchProperties: async (query: string, filters: PropertyFilters = {}): Promise<PropertySearchResponse> => {
    const params = new URLSearchParams({ q: query });
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get<ApiResponse<PropertySearchResponse>>(
      `/properties/search?${params.toString()}`
    );
    return response.data.data;
  },

  // Get featured properties
  getFeaturedProperties: async (): Promise<Property[]> => {
    const response = await api.get<ApiResponse<Property[]>>('/properties/featured');
    return response.data.data;
  },

  // Toggle property favorite
  toggleFavorite: async (propertyId: string): Promise<void> => {
    await api.post(`/properties/${propertyId}/favorite`);
  },

  // Get user favorites
  getFavorites: async (): Promise<Property[]> => {
    const response = await api.get<ApiResponse<Property[]>>('/properties/favorites');
    return response.data.data;
  },
};