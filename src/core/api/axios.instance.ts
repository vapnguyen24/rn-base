import axios, { AxiosError } from 'axios';
import { ENV } from '@core/config/env';

export const axiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});

// Request: inject auth token without a circular import.
// The auth store is read lazily so it is only resolved after the module graph
// is fully initialised.
axiosInstance.interceptors.request.use((config) => {
  // Lazy import avoids a circular dependency between axios ↔ auth store.
  const { useAuthStore } =
     
    require('@features/auth/presentation/store/auth.store') as typeof import('@features/auth/presentation/store/auth.store');

  const token = useAuthStore.getState().tokens?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response: clear session on 401.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const { useAuthStore } =
         
        require('@features/auth/presentation/store/auth.store') as typeof import('@features/auth/presentation/store/auth.store');
      useAuthStore.getState().clearAuth();
    }
    return Promise.reject(error);
  },
);
