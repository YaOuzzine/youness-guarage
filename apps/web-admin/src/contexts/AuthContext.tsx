'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { LoginDto, UserResponse } from '@youness-garage/shared';
import { UserRole } from '@youness-garage/shared';
import {
  apiLogin,
  apiLogout,
  apiGetMe,
  apiRefresh,
} from '@/lib/api';

interface AuthContextValue {
  user: UserResponse | null;
  loading: boolean;
  login: (dto: LoginDto) => Promise<UserResponse>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const me = await apiGetMe();
        if (!cancelled) setUser(me);
      } catch {
        try {
          const me = await apiRefresh();
          if (!cancelled) setUser(me);
        } catch {
          // No valid session
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void init();
    return () => { cancelled = true; };
  }, []);

  const login = useCallback(async (dto: LoginDto) => {
    const u = await apiLogin(dto);
    if (u.role !== UserRole.ADMIN) {
      // Immediately logout if not admin
      await apiLogout().catch(() => {});
      throw new Error('Admin access required');
    }
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // Best-effort
    }
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
