'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useWishlist } from '@/hooks/useWishlist';

interface WishlistContextType {
  wishlistItems: any[];
  loading: boolean;
  initialized: boolean;
  isPropertyWishlisted: (propertyId: string) => boolean;
  addToWishlist: (propertyId: string) => Promise<boolean>;
  removeFromWishlist: (propertyId: string) => Promise<boolean>;
  toggleWishlist: (propertyId: string) => Promise<boolean>;
  refetch: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const wishlistData = useWishlist();

  return (
    <WishlistContext.Provider value={wishlistData}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlistContext must be used within a WishlistProvider');
  }
  return context;
};
