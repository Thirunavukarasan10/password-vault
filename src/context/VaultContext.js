import { createContext, useContext, useState, useEffect } from "react";

const VaultContext = createContext();

export function VaultProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [passwordEntries, setPasswordEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        setCurrentUser(parsedUser);
        loadPasswords();
      } catch (err) {
        console.error("Error parsing user data:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  // 🔹 Register
  async function registerUser({ name, email, password }) {
    console.log("Register user - skipped backend (mock)");
    return { success: true, message: "Registered successfully (mock)" };
  }

  // 🔹 Login
  async function loginUser({ email, password }) {
    console.log("Login user - skipped backend (mock)");
    const mockUser = { email, name: "Demo User" };
    const mockToken = "mock-token";
    localStorage.setItem("token", mockToken);
    localStorage.setItem("user", JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    loadPasswords();
    return { success: true, data: { user: mockUser, token: mockToken } };
  }

  // 🔹 Logout
  function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setPasswordEntries([]);
  }

  // 🔹 Load passwords (from localStorage)
  function loadPasswords() {
    const storedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];
    setPasswordEntries(storedPasswords);
  }

  // 🔹 Add password
  function addPasswordEntry(entry) {
    const updated = [...passwordEntries, { id: Date.now(), ...entry }];
    setPasswordEntries(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
  }

  // 🔹 Update password (edit)
  function updatePasswordEntry(updatedEntry) {
    const updated = passwordEntries.map((item) =>
      item.id === updatedEntry.id ? { ...item, ...updatedEntry } : item
    );
    setPasswordEntries(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
  }

  // 🔹 Delete password
  function deletePasswordEntry(id) {
    const updated = passwordEntries.filter((item) => item.id !== id);
    setPasswordEntries(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
  }

  return (
    <VaultContext.Provider
      value={{
        currentUser,
        registerUser,
        loginUser,
        logoutUser,
        passwordEntries,
        loadPasswords,
        addPasswordEntry,
        updatePasswordEntry, // ✅ Added update function
        deletePasswordEntry,
        editingEntry,
        setEditingEntry,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
}

export function useVault() {
  return useContext(VaultContext);
}
