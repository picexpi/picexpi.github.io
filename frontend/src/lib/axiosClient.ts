// frontend/src/lib/axiosClient.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL =
  (import.meta.env.VITE_API_URL || 'https://picex.bonto.run/api').replace(
    /\/+$/,
    ''
  );

const axiosClient = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    'Content-Type': 'application/json',
  },

  timeout: 30000,
});

/**
 * Request Interceptor
 * Adds JWT token to all authenticated requests.
 */
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles errors safely to avoid white screen.
 */
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const requestUrl = error.config?.url || '';

    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.warn('Unauthorized request:', {
          url: requestUrl,
          data: error.response.data,
        });

        /**
         * IMPORTANT:
         * Do not auto-redirect while the user is trying to login.
         * Otherwise /auth/pi-login failure can cause a redirect loop or destroy debugging.
         */
        const isLoginRequest = requestUrl.includes('/auth/pi-login');

        if (!isLoginRequest) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');

          const currentHash = window.location.hash || '#/';

          if (!currentHash.includes('/login')) {
            window.location.hash = '#/login';
          }
        }
      } else if (status === 403) {
        console.error('Forbidden:', error.response.data);
      } else if (status === 404) {
        console.error('API route not found:', requestUrl);
      } else if (status === 500) {
        console.error('Server Error:', error.response.data);
      } else {
        console.error('API Error:', {
          status,
          data: error.response.data,
          url: requestUrl,
        });
      }
    } else if (error.request) {
      console.error('Network Error:', {
        message:
          'Cannot connect to the server. Check VITE_API_URL, CORS, internet, or backend status.',
        baseURL: API_BASE_URL,
        url: requestUrl,
      });
    } else {
      console.error('Axios Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
