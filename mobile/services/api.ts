import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_ENDPOINTS.AUTH.LOGIN.split('/api')[0], // Get base URL from any endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      AsyncStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  signup: async (userData: any) => {
    const response = await api.post(API_ENDPOINTS.AUTH.SIGNUP, userData);
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  logout: async () => {
    await AsyncStorage.removeItem('token');
    return api.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
};

export const userService = {
  getProfile: async () => {
    const response = await api.get(API_ENDPOINTS.USER.PROFILE);
    return response.data;
  },
  
  updateProfile: async (userData: any) => {
    const response = await api.put(API_ENDPOINTS.USER.UPDATE, userData);
    return response.data;
  },
};

export const servicesService = {
  list: async () => {
    const response = await api.get(API_ENDPOINTS.SERVICES.LIST);
    return response.data;
  },
  
  create: async (serviceData: any) => {
    const response = await api.post(API_ENDPOINTS.SERVICES.CREATE, serviceData);
    return response.data;
  },
  
  update: async (id: string, serviceData: any) => {
    const response = await api.put(API_ENDPOINTS.SERVICES.UPDATE(id), serviceData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(API_ENDPOINTS.SERVICES.DELETE(id));
    return response.data;
  },
};

export const eventsService = {
  list: async () => {
    const response = await api.get(API_ENDPOINTS.EVENTS.LIST);
    return response.data;
  },
  
  create: async (eventData: any) => {
    const response = await api.post(API_ENDPOINTS.EVENTS.CREATE, eventData);
    return response.data;
  },
  
  update: async (id: string, eventData: any) => {
    const response = await api.put(API_ENDPOINTS.EVENTS.UPDATE(id), eventData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(API_ENDPOINTS.EVENTS.DELETE(id));
    return response.data;
  },
};

export default api; 