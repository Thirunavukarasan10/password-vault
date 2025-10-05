import Link from "next/link";
import { useThemeMode } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { theme, toggleTheme } = useThemeMode();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-slate-800 text-slate-100">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold">
          <span className="text-teal-400">Password</span> Vault
        </Link>
        <div className="flex items-center gap-3">
          <Link className="px-3 py-2 text-sm rounded hover:bg-slate-800" href="/">Home</Link>
          <Link className="px-3 py-2 text-sm rounded hover:bg-slate-800" href="/dashboard">Dashboard</Link>
          {!user && (
            <>
              <Link className="px-3 py-2 text-sm rounded hover:bg-slate-800" href="/login">Login</Link>
              <Link className="px-3 py-2 text-sm rounded bg-teal-600 text-white hover:bg-teal-500" href="/register">Register</Link>
            </>
          )}
          {user && (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm">Hi, {user.name}</span>
              <button onClick={logout} className="px-3 py-2 text-sm rounded bg-slate-800 hover:bg-slate-700">Logout</button>
            </div>
          )}
          <button aria-label="Toggle dark mode" onClick={toggleTheme} className="px-3 py-2 text-sm rounded border border-slate-700 hover:bg-slate-800">
            {theme === "dark" ? "Dark" : "Light"}
          </button>
        </div>
      </nav>
    </header>
  );
}
