import api from '@/lib/axios';

export interface RecentlyViewedItem {
  _id: string;
  userId: string;
  propertyId: {
    _id: string;
    title: string;
    rent: number;
    location: string;
    propertyImages: Array<{ imagePath: string }>;
    bedroom: number;
    washroom: number;
    squareFeet: number;
    furnishTypes: string;
    slug?: string;
  };
  viewedAt: string;
}

export const recentlyViewedApi = {
  // Get recently viewed properties
  getRecentlyViewed: async (limit = 10): Promise<RecentlyViewedItem[]> => {
    const response = await api.get(`/recently-viewed?limit=${limit}`);
    return response.data.recentlyViewed;
  },

  // Add property to recently viewed
  addToRecentlyViewed: async (propertyId: string): Promise<void> => {
    await api.post('/recently-viewed', { propertyId });
  },

  // Get stats for dashboard
  getStats: async (): Promise<{ totalViewed: number }> => {
    const response = await api.get('/recently-viewed/stats');
    return response.data;
  }
};