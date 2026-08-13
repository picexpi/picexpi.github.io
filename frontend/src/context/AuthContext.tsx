// frontend/src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';

export interface User {
  id: string;
  username: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (
    pi_user_id: string,
    username: string,
    accessToken?: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);

      const token = localStorage.getItem('token');

      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.success) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          throw new Error('Invalid token response');
        }
      } catch (error: any) {
        console.error(
          'Auth initialization failed:',
          error.response?.data || error.message
        );

        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (
    pi_user_id: string,
    username: string,
    accessToken?: string
  ) => {
    try {
      const response = await api.post('/auth/pi-login', {
        pi_user_id,
        username,
        accessToken,
      });

      if (response.data && response.data.success) {
        const { token, user: userData } = response.data;

        if (!token || !userData) {
          throw new Error('Invalid login response from server');
        }

        localStorage.setItem('token', token);
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        throw new Error(response.data?.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login Error:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType | undefined => {
  return useContext(AuthContext);
};
