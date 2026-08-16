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

const normalizeUser = (userData: any): User => {
  return {
    id: String(userData.id || userData.piUserId || userData.uid),
    username: userData.username || 'Pi User',
    role: String(userData.role || 'user').toLowerCase(),
    piUserId: userData.piUserId || userData.id || userData.uid,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? normalizeUser(JSON.parse(savedUser)) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('token'));
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const persistAuth = (token: string, userData: any) => {
    const normalizedUser = normalizeUser(userData);

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

      if (response.data?.success && response.data?.user) {
        const savedToken = localStorage.getItem('token');

        if (savedToken) {
          persistAuth(savedToken, response.data.user);
        }
      } else if (response.data?.user) {
        const savedToken = localStorage.getItem('token');

        if (savedToken) {
          persistAuth(savedToken, response.data.user);
        }
      } else {
        clearAuth();
      }
    } catch (err: any) {
      console.error('Auth refresh failed:', err);
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
      const response = await axiosClient.post('/auth/pi-login', {
        pi_user_id,
        username,
        accessToken,
      });

      if (response.data?.success && response.data?.token && response.data?.user) {
        persistAuth(response.data.token, response.data.user);
      } else if (response.data?.token && response.data?.user) {
        persistAuth(response.data.token, response.data.user);
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
