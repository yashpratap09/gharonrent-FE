import api from '@/lib/axios';
import { User } from '@/store/authStore';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  refreshToken: string;
  user: User;
  token: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Auth API functions
export const authApi = {
  // Login user
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  // Register user
  signup: async (userData: SignupRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/auth/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put<ApiResponse<User>>('/profile', userData);
    return response.data.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await api.post('/logout');
  },

  // Refresh token
  refreshToken: async (): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/refresh-token');
    return response.data.data;
  },

  // Verify email
  verifyEmail: async (token: string): Promise<void> => {
    await api.post('/verify-email', { token });
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/forgot-password', { email });
  },

  // Reset password
  resetPassword: async (token: string, password: string): Promise<void> => {
    await api.post('/reset-password', { token, password });
  },
};