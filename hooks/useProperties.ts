import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { propertiesApi, PropertyFilters, CreatePropertyRequest } from '@/lib/api/properties';

export const useProperties = (filters: PropertyFilters = {}, enabled = false) => {
  const queryClient = useQueryClient();

  // Get properties with pagination (on-demand query)
  const usePropertiesQuery = (queryFilters: PropertyFilters = filters, queryEnabled = false) =>
    useQuery({
      queryKey: ['properties', queryFilters],
      queryFn: () => propertiesApi.getProperties(queryFilters),
      staleTime: 2 * 60 * 1000, // 2 minutes
      placeholderData: () => queryClient.getQueryData(['properties', queryFilters]),
      enabled: queryEnabled,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    });

  // Get single property
  const useProperty = (id: string) => {
    return useQuery({
      queryKey: ['property', id],
      queryFn: () => propertiesApi.getProperty(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get property by slug
  const usePropertyBySlug = (slug: string) => {
    return useQuery({
      queryKey: ['property-slug', slug],
      queryFn: () => propertiesApi.getPropertyBySlug(slug),
      enabled: !!slug,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get user's properties (only when called)
  const useUserProperties = (enabled = true) =>
    useQuery({
      queryKey: ['user-properties'],
      queryFn: propertiesApi.getUserProperties,
      staleTime: 2 * 60 * 1000,
      enabled,
    });



  // Get user favorites (only when called)
  const useFavorites = (enabled = true) =>
    useQuery({
      queryKey: ['favorites'],
      queryFn: propertiesApi.getFavorites,
      staleTime: 2 * 60 * 1000,
      enabled,
    });

  

  // Create property mutation
  const createPropertyMutation = useMutation({
    mutationFn: propertiesApi.createProperty,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['user-properties'] });
      toast.success('Property created successfully!');
      return data;
    },
    onError: (error: any) => {
      console.error('Create property error:', error);
    },
  });

  // Update property mutation
  const updatePropertyMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreatePropertyRequest> }) =>
      propertiesApi.updateProperty(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['user-properties'] });
      queryClient.setQueryData(['property', data._id], data);
      toast.success('Property updated successfully!');
    },
    onError: (error: any) => {
      console.error('Update property error:', error);
    },
  });

  // Delete property mutation
  const deletePropertyMutation = useMutation({
    mutationFn: propertiesApi.deleteProperty,
    onSuccess: (_, propertyId) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['user-properties'] });
      queryClient.removeQueries({ queryKey: ['property', propertyId] });
      toast.success('Property deleted successfully!');
    },
    onError: (error: any) => {
      console.error('Delete property error:', error);
    },
  });

  // Toggle favorite mutation
  const toggleFavoriteMutation = useMutation({
    mutationFn: propertiesApi.toggleFavorite,
    onSuccess: (_, propertyId) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.setQueryData(['property', propertyId], (old: any) => {
        if (old) {
          return { ...old, isFavorite: !old.isFavorite };
        }
        return old;
      });
      toast.success('Favorites updated!');
    },
    onError: (error: any) => {
      console.error('Toggle favorite error:', error);
    },
  });

  return {
  

    // Expose hooks for on-demand queries
    usePropertiesQuery,
    useUserProperties,
    useFavorites,
    useProperty,
    usePropertyBySlug,
    

    // Infinite query
    // infiniteProperties: infinitePropertiesQuery,

    // Mutations
    createProperty: (data: CreatePropertyRequest) => createPropertyMutation.mutate(data),
    updateProperty: (id: string, data: Partial<CreatePropertyRequest>) =>
      updatePropertyMutation.mutate({ id, data }),
    deleteProperty: (id: string) => deletePropertyMutation.mutate(id),
    toggleFavorite: (propertyId: string) => toggleFavoriteMutation.mutate(propertyId),

    // Mutation states
    isCreatingProperty: createPropertyMutation.isPending,
    isUpdatingProperty: updatePropertyMutation.isPending,
    isDeletingProperty: deletePropertyMutation.isPending,
    isTogglingFavorite: toggleFavoriteMutation.isPending,
  };
};