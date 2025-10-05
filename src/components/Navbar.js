import Link from "next/link";
import { useVault } from "../context/VaultContext";

export default function Navbar() {
  const { currentUser, logoutUser } = useVault();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          <span className="text-indigo-600">Password</span> Vault
        </Link>
        <div className="flex items-center gap-3">
          <Link className="px-3 py-2 text-sm rounded hover:bg-slate-100" href="/">Home</Link>
          <Link className="px-3 py-2 text-sm rounded hover:bg-slate-100" href="/dashboard">Dashboard</Link>
          {!currentUser && (
            <>
              <Link className="px-3 py-2 text-sm rounded hover:bg-slate-100" href="/login">Login</Link>
              <Link className="px-3 py-2 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-500" href="/register">Register</Link>
            </>
          )}
          {currentUser && (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-slate-700">Hi, {currentUser.name}</span>
              <button onClick={logoutUser} className="px-3 py-2 text-sm rounded bg-slate-900 text-white hover:bg-slate-700">Logout</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
