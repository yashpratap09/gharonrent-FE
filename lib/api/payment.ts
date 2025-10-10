import api from '@/lib/axios';

export interface CreateOrderRequest {
  planName: string;
}

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  receipt: string;
  paymentId: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface PaymentHistoryItem {
  _id: string;
  amount: number;
  currency: string;
  status: string;
  planName: string;
  paymentDate: string;
  description: string;
  razorpayPaymentId?: string;
}

export interface SubscriptionData {
  _id: string;
  planName: string;
  planPrice: number;
  startDate: string;
  endDate: string;
  status: string;
  features: {
    maxProperties: number;
    maxPhotos: number;
    featuredListings: number;
    prioritySupport: boolean;
    analytics: boolean;
    virtualTours: boolean;
    tenantScreening: boolean;
    unlimitedProperties: boolean;
  };
}

export const paymentApi = {
  // Create Razorpay order
  createOrder: async (data: CreateOrderRequest): Promise<CreateOrderResponse> => {
    const response = await api.post<CreateOrderResponse>('/payment/create-order', data);
    return response.data;
  },

  // Verify payment
  verifyPayment: async (data: VerifyPaymentRequest): Promise<{ subscription: SubscriptionData; payment: PaymentHistoryItem }> => {
    const response = await api.post('/payment/verify', data);
    return response.data;
  },

  // Get payment history
  getPaymentHistory: async (page = 1, limit = 10): Promise<{
    payments: PaymentHistoryItem[];
    totalPages: number;
    currentPage: number;
    total: number;
  }> => {
    const response = await api.get(`/payment/history?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get current subscription
  getCurrentSubscription: async (): Promise<{ subscription: SubscriptionData | null }> => {
    const response = await api.get('/payment/subscription');
    return response.data;
  },

  // Cancel subscription
  cancelSubscription: async (): Promise<{ subscription: SubscriptionData }> => {
    const response = await api.post('/payment/cancel-subscription');
    return response.data;
  },
};
