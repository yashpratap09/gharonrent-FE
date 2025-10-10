import api from '@/lib/axios';
import { Property } from './properties';

export interface WishlistItem {
  _id: string;
  propertyId: Property;
  createdAt: string;
}

export const wishlistApi = {
  getWishlist: async (): Promise<WishlistItem[]> => {
    const res = await api.get<{ wishlist: WishlistItem[] }>('/wishlist');
    return res.data.wishlist;
  },
  addToWishlist: async (propertyId: string): Promise<void> => {
    await api.post('/wishlist', { propertyId });
  },
  removeFromWishlist: async (propertyId: string): Promise<void> => {
    await api.delete(`/wishlist/${propertyId}`);
  },
};
