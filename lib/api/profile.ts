import api from '@/lib/axios';

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  userType: string;
  isVerified: boolean;
  isPaid: boolean;
  isConfirmed: boolean;
  bio?: string;
  address?: string;
  avatar?: string;
}

export interface ProfileUpdateRequest {
  name?: string;
  email?: string;
  phoneNumber?: string;
  bio?: string;
  address?: string;
  password?: string;
  confirmPassword?: string;
}

export interface ProfileResponse {
  message: string;
  user: ProfileData;
}

export const profileApi = {
  // Get current user's profile
  getProfile: async (): Promise<ProfileData> => {
    const response = await api.get<ProfileData>('/profile');
    return response.data;
  },

  // Update current user's profile
  updateProfile: async (data: ProfileUpdateRequest): Promise<ProfileData> => {
    const response = await api.put<ProfileResponse>('/profile', data);
    return response.data.user;
  },

  // Get profile by user ID
  getProfileById: async (userId: string): Promise<ProfileData> => {
    const response = await api.get<ProfileData>(`/profile/${userId}`);
    return response.data;
  },

  // Update profile by user ID (admin or own profile)
  updateProfileById: async (userId: string, data: ProfileUpdateRequest): Promise<ProfileData> => {
    const response = await api.put<ProfileResponse>(`/profile/${userId}`, data);
    return response.data.user;
  },
};
