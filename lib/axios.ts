import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    
    // Handle different error status codes
    switch (error.response?.status) {
      case 401:
        // Unauthorized - clear token and redirect to login
        Cookies.remove('auth_token');
        toast.error('Session expired. Please login again.');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        break;
      case 403:
        toast.error('Access denied');
        break;
      case 404:
        toast.error('Resource not found');
        break;
      case 422:
        // Validation errors
        const errors = error.response?.data?.errors;
        if (errors && typeof errors === 'object') {
          Object.values(errors).forEach((errorArray: any) => {
            if (Array.isArray(errorArray)) {
              errorArray.forEach((err: string) => toast.error(err));
            }
          });
        } else {
          toast.error(message);
        }
        break;
      case 500:
        toast.error('Server error. Please try again later.');
        break;
      default:
        toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

export default api;