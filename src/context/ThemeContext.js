import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getStoredTheme, setStoredTheme } from "../lib/api";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  // Initialize from localStorage; default to dark
  useEffect(() => {
    const stored = getStoredTheme();
    const initial = stored === "light" || stored === "dark" ? stored : "dark";
    setTheme(initial);
  }, []);

  // Apply to <html> class and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    setStoredTheme(theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggle }), [theme, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
