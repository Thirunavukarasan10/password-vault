import { createContext, useContext, useMemo, useState } from "react";
import { useRouter } from "next/router";

const VaultContext = createContext(undefined);

function generateId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

const initialPasswords = [
  {
    id: generateId(),
    serviceName: "Gmail",
    username: "alice@example.com",
    password: "S3cur3!Pass",
  },
  {
    id: generateId(),
    serviceName: "GitHub",
    username: "alice",
    password: "Gh!b2025#",
  },
];

export function VaultProvider({ children }) {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState(null);
  const [passwordEntries, setPasswordEntries] = useState(initialPasswords);

  function registerUser(name, email) {
    setCurrentUser({ name, email });
  }

  function loginUser(email) {
    const derivedName = email?.split("@")[0] || "User";
    setCurrentUser({ name: derivedName, email });
  }

  function logoutUser() {
    setCurrentUser(null);
    router.push("/");
  }

  function addPasswordEntry(entry) {
    const newEntry = { ...entry, id: generateId() };
    setPasswordEntries((prev) => [newEntry, ...prev]);
    return newEntry.id;
  }

  function updatePasswordEntry(id, updates) {
    setPasswordEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  }

  function deletePasswordEntry(id) {
    setPasswordEntries((prev) => prev.filter((e) => e.id !== id));
  }

  const value = useMemo(
    () => ({
      currentUser,
      passwordEntries,
      registerUser,
      loginUser,
      logoutUser,
      addPasswordEntry,
      updatePasswordEntry,
      deletePasswordEntry,
    }),
    [currentUser, passwordEntries, registerUser, loginUser, logoutUser]
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
