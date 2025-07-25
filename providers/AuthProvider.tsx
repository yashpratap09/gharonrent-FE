"use client";

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/hooks/useAuth';
import Cookies from 'js-cookie';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, setToken, clearAuth } = useAuthStore();
  const { refetchProfile } = useAuth();

  useEffect(() => {
    // Check for token in cookies on app initialization
    const token = Cookies.get('auth_token');
    
    if (token && !isAuthenticated) {
      // Set token and fetch user profile
      setToken(token);
      refetchProfile();
    } else if (!token && isAuthenticated) {
      // Clear auth state if no token found
      clearAuth();
    }
  }, [isAuthenticated, setToken, clearAuth, refetchProfile]);

  return <>{children}</>;
}