import Link from "next/link";
import { useVault } from "../context/VaultContext";
import Button from "./Button";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { currentUser, logoutUser } = useVault();
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200 dark:bg-slate-900/70 dark:border-slate-800">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          <span className="text-teal-500">Password</span> Vault
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link className="px-3 py-2 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-800" href="/">Home</Link>
          <Link className="px-3 py-2 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-800" href="/dashboard">Dashboard</Link>
          <Button variant="ghost" onClick={toggle} className="hidden sm:inline-flex">
            {theme === "dark" ? "Light" : "Dark"}
          </Button>
          {!currentUser && (
            <>
              <Link className="px-3 py-2 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-800" href="/login">Login</Link>
              <Link className="px-3 py-2 text-sm rounded bg-teal-500 text-white hover:bg-teal-400 dark:bg-teal-400 dark:hover:bg-teal-300" href="/register">Register</Link>
            </>
          )}
          {currentUser && (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-slate-700 dark:text-slate-300">Hi, {currentUser.name}</span>
              <Button onClick={logoutUser} variant="secondary">Logout</Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
