import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { api, decodeJwtPayload, getToken, setToken } from "../lib/api";

const VaultContext = createContext(undefined);

function generateId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

const initialPasswords = [];

export function VaultProvider({ children }) {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState(null);
  const [passwordEntries, setPasswordEntries] = useState(initialPasswords);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hydrate from token on first load
  useEffect(() => {
    const existing = getToken();
    if (!existing) {
      setLoading(false);
      return;
    }
    const payload = decodeJwtPayload(existing);
    if (!payload) {
      setToken(null);
      setLoading(false);
      return;
    }
    setCurrentUser({ id: payload.userId, name: payload.name, email: payload.email });
    api
      .listPasswords()
      .then((list) => setPasswordEntries(list))
      .catch(() => setPasswordEntries([]))
      .finally(() => setLoading(false));
  }, []);

  async function registerUser(name, email, password) {
    setError(null);
    await api.register({ name, email, password });
    // After registration, immediately login
    const { token, user } = await api.login({ email, password });
    setToken(token);
    setCurrentUser(user);
    const list = await api.listPasswords().catch(() => []);
    setPasswordEntries(list);
  }

  async function loginUser(email, password) {
    setError(null);
    const { token, user } = await api.login({ email, password });
    setToken(token);
    setCurrentUser(user);
    const list = await api.listPasswords().catch(() => []);
    setPasswordEntries(list);
  }

  function logoutUser() {
    setToken(null);
    setCurrentUser(null);
    setPasswordEntries([]);
    router.push("/");
  }

  async function addPasswordEntry(entry) {
    const res = await api.createPassword(entry);
    const newItem = { id: res.id, ...entry };
    setPasswordEntries((prev) => [newItem, ...prev]);
    return newItem.id;
  }

  async function updatePasswordEntry(id, updates) {
    await api.updatePassword({ id, ...updates });
    setPasswordEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  }

  async function deletePasswordEntry(id) {
    await api.deletePassword(id);
    setPasswordEntries((prev) => prev.filter((e) => e.id !== id));
  }

  const value = useMemo(
    () => ({
      currentUser,
      passwordEntries,
      loading,
      error,
      registerUser,
      loginUser,
      logoutUser,
      addPasswordEntry,
      updatePasswordEntry,
      deletePasswordEntry,
    }),
    [currentUser, passwordEntries, loading, error]
  );

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault() {
  const ctx = useContext(VaultContext);
  if (!ctx) {
    throw new Error("useVault must be used within a VaultProvider");
  }
  return ctx;
}
