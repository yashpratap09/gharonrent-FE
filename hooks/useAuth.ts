import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { authApi, LoginRequest, SignupRequest } from '@/lib/api/auth';
import { useAuthStore, User } from '@/store/authStore';
import { useEffect } from 'react';

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    login: setLogin, 
    logout: setLogout, 
    setLoading,
    updateUser 
  } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      setLogin(data.user, data.token, data.refreshToken);
      toast.success(data.message || 'Login successful!');
      router.push('/');
    },
    onError: (error: any) => {
      console.error('Login error:', error);
      // Error is already handled by axios interceptor
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: authApi.signup,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      console.log(data);
      setLogin(data.user, data.token, data.refreshToken);
      toast.success(data.message || 'Account created successfully!');
      router.push('/');
    },
    onError: (error: any) => {
      console.error('Signup error:', error);
      // Error is already handled by axios interceptor
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setLogout();
      queryClient.clear(); // Clear all cached data
      toast.success('Logged out successfully');
      router.push('/login');
    },
    onError: (error: any) => {
      // Even if API call fails, logout locally
      setLogout();
      queryClient.clear();
      router.push('/login');
      console.error('Logout error:', error);
    },
  });

  // Get user profile query
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: authApi.getProfile,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });

  // Handle profile query side effects
useEffect(() => {
    if (profileQuery.isSuccess && profileQuery.data) {
      console.log(profileQuery.data);
      updateUser(profileQuery.data);
    }
    if (profileQuery.isError) {
      const error: any = profileQuery.error;
      if (error?.response?.status === 401) {
        setLogout();
        router.push('/login');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileQuery.isSuccess, profileQuery.data, profileQuery.isError]);

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (data) => {
      updateUser(data);
      queryClient.setQueryData(['profile'], data);
      toast.success('Profile updated successfully!');
    },
    onError: (error: any) => {
      console.error('Update profile error:', error);
    },
  });

  // Verify email mutation
  const verifyEmailMutation = useMutation({
    mutationFn: authApi.verifyEmail,
    onSuccess: () => {
      toast.success('Email verified successfully!');
      profileQuery.refetch();
    },
    onError: (error: any) => {
      console.error('Email verification error:', error);
    },
  });

  // Forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      toast.success('Password reset link sent to your email!');
    },
    onError: (error: any) => {
      console.error('Forgot password error:', error);
    },
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authApi.resetPassword(token, password),
    onSuccess: () => {
      toast.success('Password reset successfully!');
      router.push('/login');
    },
    onError: (error: any) => {
      console.error('Reset password error:', error);
    },
  });

  return {
    // State
    user,
    isAuthenticated,
    isLoading: isLoading || loginMutation.isPending || signupMutation.isPending,
    
    // Mutations
    login: (credentials: LoginRequest) => loginMutation.mutate(credentials),
    signup: (userData: SignupRequest) => signupMutation.mutate(userData),
    logout: () => logoutMutation.mutate(),
    updateProfile: (userData: any) => updateProfileMutation.mutate(userData),
    verifyEmail: (token: string) => verifyEmailMutation.mutate(token),
    forgotPassword: (email: string) => forgotPasswordMutation.mutate(email),
    resetPassword: (token: string, password: string) => 
      resetPasswordMutation.mutate({ token, password }),
    
    // Query states
    isLoginLoading: loginMutation.isPending,
    isSignupLoading: signupMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    isProfileLoading: profileQuery.isLoading,
    isUpdateProfileLoading: updateProfileMutation.isPending,
    
    // Profile data
    profileData: profileQuery.data,
    profileError: profileQuery.error,
    refetchProfile: profileQuery.refetch,
  };
};