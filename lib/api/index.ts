// Export all API modules for centralized access
export * from './types';
export * from './auth';
export * from './payment';
export * from './profile';
export * from './properties';
export * from './recentlyViewed';
export * from './wishlist';
export * from './places';
export * from './tenantPayment';

// Re-export the main axios instance
export { default as api } from '../axios';
