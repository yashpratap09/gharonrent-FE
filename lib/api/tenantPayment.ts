import api from '@/lib/axios';

export interface TenantCreateOrderRequest {
  packageName: string;
}

export interface TenantCreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  receipt: string;
}

export interface TenantVerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface TenantSubscriptionInfo {
  canViewFullDetails: boolean;
  canViewAddress: boolean;
  canViewOwnerContact: boolean;
  remainingViews: number;
  packageName: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

export interface TenantPaymentHistoryItem {
  _id: string;
  amount: number;
  currency: string;
  status: string;
  packageName: string;
  paymentDate: string;
  description: string;
  razorpayPaymentId?: string;
  duration: string;
  propertyViews: string;
}

export const tenantPaymentApi = {
  // Create Razorpay order for tenant subscription
  createOrder: async (data: TenantCreateOrderRequest): Promise<TenantCreateOrderResponse> => {
    const response = await api.post<TenantCreateOrderResponse>('/tenant-payment/create-order', data);
    return response.data;
  },

  // Verify tenant subscription payment
  verifyPayment: async (data: TenantVerifyPaymentRequest): Promise<{ 
    subscription: TenantSubscriptionInfo; 
    payment: TenantPaymentHistoryItem 
  }> => {
    const response = await api.post('/tenant-payment/verify-payment', data);
    return response.data;
  },

  // Get tenant payment history
  getTenantPaymentHistory: async (page = 1, limit = 10): Promise<{
    payments: TenantPaymentHistoryItem[];
    totalPages: number;
    currentPage: number;
    total: number;
  }> => {
    const response = await api.get(`/tenant-payment/history?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get current tenant subscription
  getCurrentTenantSubscription: async (): Promise<{ subscription: TenantSubscriptionInfo | null }> => {
    const response = await api.get('/tenant-payment/subscription');
    return response.data;
  },

  // Cancel tenant subscription
  cancelTenantSubscription: async (): Promise<{ subscription: TenantSubscriptionInfo }> => {
    const response = await api.post('/tenant-payment/cancel-subscription');
    return response.data;
  },
};
