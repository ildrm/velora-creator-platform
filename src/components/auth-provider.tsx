"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Permission, SafeUser } from "@/lib/auth";

type AuthState = {
  loading: boolean;
  authenticated: boolean;
  user: SafeUser | null;
  permissions: readonly Permission[];
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  can: (permission: Permission) => boolean;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<SafeUser | null>(null);
  const [userPermissions, setUserPermissions] = useState<readonly Permission[]>([]);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/session", { cache: "no-store", credentials: "same-origin" });
      const result = await response.json();
      setUser(result.authenticated ? result.user : null);
      setUserPermissions(result.authenticated ? result.permissions : []);
    } catch { setUser(null); setUserPermissions([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/session", { cache: "no-store", credentials: "same-origin" })
      .then((response) => response.json())
      .then((result) => {
        if (!active) return;
        setUser(result.authenticated ? result.user : null);
        setUserPermissions(result.authenticated ? result.permissions : []);
      })
      .catch(() => {
        if (!active) return;
        setUser(null);
        setUserPermissions([]);
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
    setUser(null); setUserPermissions([]);
    window.location.assign("/");
  }, []);

  const value = useMemo<AuthState>(() => ({ loading, authenticated: Boolean(user), user, permissions: userPermissions, refresh, logout, can: (permission) => userPermissions.includes(permission) }), [loading, user, userPermissions, refresh, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
