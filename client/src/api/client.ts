import axios from 'axios';
import { Product } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productApi = {
  getAll: async (filters?: { category?: string; featured?: boolean }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.featured !== undefined) params.append('featured', String(filters.featured));
    
    const response = await apiClient.get<{ success: boolean; data: Product[] }>(
      `/products${params.toString() ? `?${params.toString()}` : ''}`
    );
    return response.data.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<{ success: boolean; data: Product }>(`/products/${id}`);
    return response.data.data;
  },

  getFeatured: async () => {
    const response = await apiClient.get<{ success: boolean; data: Product[] }>('/products/featured');
    return response.data.data;
  },

  search: async (query: string) => {
    const response = await apiClient.get<{ success: boolean; data: Product[] }>(
      `/products/search?q=${encodeURIComponent(query)}`
    );
    return response.data.data;
  },
};

export const chatApi = {
  sendMessage: async (message: string, context?: { budget?: number; occasion?: string; style?: string }) => {
    const response = await apiClient.post('/chat/recommend', {
      message,
      context,
    });
    return response.data.data;
  },
};

export default apiClient;

