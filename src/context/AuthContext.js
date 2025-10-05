import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const t = localStorage.getItem("pv-token");
      const u = localStorage.getItem("pv-user");
      if (t) setToken(t);
      if (u) setUser(JSON.parse(u));
    } catch {}
    setLoading(false);
  }, []);

  function saveAuth(nextToken, nextUser) {
    setToken(nextToken);
    setUser(nextUser);
    try {
      localStorage.setItem("pv-token", nextToken ?? "");
      localStorage.setItem("pv-user", JSON.stringify(nextUser ?? null));
    } catch {}
  }

  function clearAuth() {
    saveAuth(null, null);
  }

  async function register({ name, email, password }) {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw new Error((await res.json()).error || "Registration failed");
    // immediately log the user in
    await login({ email, password });
  }

  async function login({ email, password }) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    saveAuth(data.token, data.user);
    router.push("/dashboard");
  }

  function logout() {
    clearAuth();
    router.push("/");
  }

  const value = useMemo(
    () => ({ token, user, loading, login, logout, register, saveAuth, clearAuth }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
