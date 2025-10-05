import Link from "next/link";
import { useVault } from "../context/VaultContext";
import Button from "../components/Button";
import PasswordCard from "../components/PasswordCard";

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const { currentUser, passwordEntries, deletePasswordEntry, loading } = useVault();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace("/login");
    }
  }, [loading, currentUser, router]);

  if (!currentUser) return null;

  return (
    <section className="grid gap-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-300">{currentUser ? `Welcome, ${currentUser.name}` : "Please log in to access your vault."}</p>
        </div>
        <Link href="/add-password" className="hidden sm:inline-flex">
          <Button>Add Password</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <section className="md:col-span-2 grid gap-4">
          <h2 className="text-xl font-semibold">My Vault</h2>
          {loading && <p className="text-sm text-slate-500">Loading...</p>}
          <div className="grid gap-4 sm:grid-cols-2">
            {passwordEntries.map((item) => (
              <PasswordCard key={item.id} item={item} onDelete={deletePasswordEntry} />
            ))}
          </div>
          {passwordEntries.length === 0 && !loading && (
            <p className="text-slate-600 dark:text-slate-300">No entries yet. Use "Add Password" to create one.</p>
          )}
        </section>

        <aside className="grid gap-6">
          <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="text-lg font-semibold">Add Password</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Create a new credential entry.</p>
            <Link href="/add-password" className="mt-3 inline-flex">
              <Button className="w-full">Add</Button>
            </Link>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="text-lg font-semibold">Profile</h3>
            <div className="mt-2 text-sm text-slate-700 dark:text-slate-300">
              <p>Email: {currentUser?.email || "-"}</p>
            </div>
            <Button variant="secondary" className="mt-3" href="/" as={Link}>Logout</Button>
          </section>
        </aside>
      </div>
    </section>
  );
}
