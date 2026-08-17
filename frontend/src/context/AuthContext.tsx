// frontend/src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axiosClient from '../lib/axiosClient';

export interface User {
  id: string;
  username: string;
  role: 'user' | 'admin' | string;
  piUserId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (
    pi_user_id: string,
    username: string,
    accessToken?: string
  ) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * نرمال‌سازی اطلاعات کاربر
 * چون ممکن است Backend یا Pi SDK نام فیلدها را متفاوت برگرداند.
 */
const normalizeUser = (userData: any): User => {
  const id =
    userData?.id ||
    userData?.piUserId ||
    userData?.pi_user_id ||
    userData?.uid ||
    userData?._id;

  const piUserId =
    userData?.piUserId ||
    userData?.pi_user_id ||
    userData?.uid ||
    userData?.id ||
    userData?._id;

  return {
    id: String(id || ''),
    username: userData?.username || userData?.name || 'Pi User',
    role: String(userData?.role || 'user').toLowerCase(),
    piUserId: piUserId ? String(piUserId) : undefined,
  };
};

const getSavedUser = (): User | null => {
  try {
    const savedUser = localStorage.getItem('user');

    if (!savedUser) {
      return null;
    }

    const parsedUser = JSON.parse(savedUser);
    const normalizedUser = normalizeUser(parsedUser);

    if (!normalizedUser.id) {
      localStorage.removeItem('user');
      return null;
    }

    return normalizedUser;
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => getSavedUser());

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    return Boolean(token && savedUser);
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const persistAuth = (token: string, userData: any) => {
    const normalizedUser = normalizeUser(userData);

    if (!token || !normalizedUser.id) {
      throw new Error('Invalid authentication data received from server.');
    }

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(normalizedUser));

    setUser(normalizedUser);
    setIsAuthenticated(true);
  };

  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        clearAuth();
        return;
      }

      const response = await axiosClient.get('/auth/me');

      const responseUser = response.data?.user;
      const success = response.data?.success;

      if ((success && responseUser) || responseUser) {
        persistAuth(token, responseUser);
      } else {
        clearAuth();
      }
    } catch (err: any) {
      console.error('Auth refresh failed:', err?.response?.data || err);
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  const login = async (
    pi_user_id: string,
    username: string,
    accessToken?: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      if (!pi_user_id || !username) {
        throw new Error('Invalid Pi user data.');
      }

      const response = await axiosClient.post('/auth/pi-login', {
        pi_user_id,
        username,
        accessToken,
      });

      const responseToken = response.data?.token;
      const responseUser = response.data?.user;
      const success = response.data?.success;

      if ((success && responseToken && responseUser) || (responseToken && responseUser)) {
        persistAuth(responseToken, responseUser);
      } else {
        throw new Error(response.data?.message || 'Login failed');
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Login failed';

      setError(message);
      clearAuth();

      console.error('Login Error:', err?.response?.data || err);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        refreshAuth,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType | undefined => {
  return useContext(AuthContext);
};
