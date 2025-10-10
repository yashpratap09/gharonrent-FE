import { useState, useEffect, useCallback } from 'react';
import { wishlistApi, WishlistItem } from '@/lib/api/wishlist';
import { useAuthStore } from '@/store/authStore';

export const useWishlist = () => {
  const { isAuthenticated } = useAuthStore();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Fetch wishlist once on mount (only if authenticated)
  const fetchWishlist = useCallback(async () => {
    if (initialized || !isAuthenticated) return;
    
    setLoading(true);
    try {
      const wishlist = await wishlistApi.getWishlist();
      setWishlistItems(wishlist);
      setInitialized(true);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setLoading(false);
    }
  }, [initialized, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      // Clear wishlist when not authenticated
      setWishlistItems([]);
      setInitialized(false);
    }
  }, [fetchWishlist, isAuthenticated]);

  // Check if property is in wishlist
  const isPropertyWishlisted = useCallback((propertyId: string) => {
    return wishlistItems.some(item => item.propertyId._id === propertyId);
  }, [wishlistItems]);

  // Refetch wishlist data
  const refetchWishlist = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const wishlist = await wishlistApi.getWishlist();
      setWishlistItems(wishlist);
    } catch (error) {
      console.error('Failed to refetch wishlist:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Add to wishlist
  const addToWishlist = useCallback(async (propertyId: string) => {
    try {
      await wishlistApi.addToWishlist(propertyId);
      // Refetch to get complete data instead of optimistic update
      await refetchWishlist();
      return true;
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      return false;
    }
  }, [refetchWishlist]);

  // Remove from wishlist
  const removeFromWishlist = useCallback(async (propertyId: string) => {
    try {
      await wishlistApi.removeFromWishlist(propertyId);
      // Refetch to get updated data
      await refetchWishlist();
      return true;
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      return false;
    }
  }, [refetchWishlist]);

  // Toggle wishlist status
  const toggleWishlist = useCallback(async (propertyId: string) => {
    const isWishlisted = isPropertyWishlisted(propertyId);
    if (isWishlisted) {
      return await removeFromWishlist(propertyId);
    } else {
      return await addToWishlist(propertyId);
    }
  }, [isPropertyWishlisted, addToWishlist, removeFromWishlist]);

  return {
    wishlistItems,
    loading,
    initialized,
    isPropertyWishlisted,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    refetch: refetchWishlist
  };
};
