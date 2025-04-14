import { Platform } from 'react-native';

// Use localhost for web, Android emulator, and iOS simulator
const BASE_URL = Platform.OS === 'web'
  ? 'http://localhost:8080'  // Web browser
  : Platform.OS === 'android'
    ? 'http://10.0.2.2:8080'  // Android emulator
    : 'http://localhost:8080'; // iOS simulator

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/api/auth/login`,
    SIGNUP: `${BASE_URL}/api/auth/signup`,
    LOGOUT: `${BASE_URL}/api/auth/logout`,
  },
  USER: {
    PROFILE: `${BASE_URL}/api/user/profile`,
    UPDATE: `${BASE_URL}/api/user/update`,
  },
  SERVICES: {
    LIST: `${BASE_URL}/api/services`,
    CREATE: `${BASE_URL}/api/services`,
    UPDATE: (id: string) => `${BASE_URL}/api/services/${id}`,
    DELETE: (id: string) => `${BASE_URL}/api/services/${id}`,
  },
  EVENTS: {
    LIST: `${BASE_URL}/api/events`,
    CREATE: `${BASE_URL}/api/events`,
    UPDATE: (id: string) => `${BASE_URL}/api/events/${id}`,
    DELETE: (id: string) => `${BASE_URL}/api/events/${id}`,
  },
}; 