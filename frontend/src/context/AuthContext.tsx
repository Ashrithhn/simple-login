/**
 * Auth context: user, token, login, register, logout. Persists token in localStorage.
 */

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { User } from '../types/auth';
import * as api from '../services/authApi';

const STORAGE_KEY = 'city_info_token';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  setUserFromToken: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));
  const [loading, setLoading] = useState(true);

  const setUserFromToken = useCallback(async (t: string) => {
    const u = await api.me(t);
    setUser(u);
    setToken(t);
    localStorage.setItem(STORAGE_KEY, t);
  }, []);

  useEffect(() => {
    const t = localStorage.getItem(STORAGE_KEY);
    if (!t) {
      setLoading(false);
      return;
    }
    api.me(t)
      .then((u) => {
        setUser(u);
        setToken(t);
      })
      .catch(() => {
        localStorage.removeItem(STORAGE_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { user: u, token: t } = await api.login(email, password);
    setUser(u);
    setToken(t);
    localStorage.setItem(STORAGE_KEY, t);
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    const { user: u, token: t } = await api.register(email, password, name);
    setUser(u);
    setToken(t);
    localStorage.setItem(STORAGE_KEY, t);
  }, []);

  const logout = useCallback(() => {
    if (token) api.logout(token).catch(() => {});
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  }, [token]);

  const value: AuthContextValue = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    setUserFromToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
