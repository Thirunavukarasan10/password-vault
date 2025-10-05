import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useVault } from "../context/VaultContext";

export default function HomePage() {
  const { currentUser, loading } = useVault();
  const router = useRouter();

  useEffect(() => {
    if (!loading && currentUser) {
      router.replace("/dashboard");
    }
  }, [loading, currentUser, router]);

  return (
    <section className="grid gap-8 items-center justify-items-center text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Keep your passwords safe with <span className="text-teal-500">Password Vault</span>
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Generate, save, and manage your credentials in a simple and private vault.
          Your data is secured via your account; only you can access your entries.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/register" className="px-5 py-3 rounded bg-teal-500 text-white hover:bg-teal-400 dark:bg-teal-400 dark:hover:bg-teal-300">Get Started</Link>
        <Link href="/login" className="px-5 py-3 rounded border border-slate-300 hover:bg-slate-100">Login</Link>
      </div>
      <ul className="mt-6 grid sm:grid-cols-3 gap-4 text-left w-full max-w-4xl">
        <li className="rounded border p-4 bg-white dark:bg-slate-800 dark:border-slate-700">
          <h3 className="font-semibold">Fast and minimal</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Clean UI built with Next.js and Tailwind CSS.</p>
        </li>
        <li className="rounded border p-4 bg-white dark:bg-slate-800 dark:border-slate-700">
          <h3 className="font-semibold">Privacy-first</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Only your authenticated account can access your vault.</p>
        </li>
        <li className="rounded border p-4 bg-white dark:bg-slate-800 dark:border-slate-700">
          <h3 className="font-semibold">Easy management</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Add, edit, and delete entries from a simple dashboard.</p>
        </li>
      </ul>
    </section>
  );
}
