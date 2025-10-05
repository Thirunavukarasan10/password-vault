import Link from "next/link";

export default function HomePage() {
  return (
    <section className="grid gap-8 items-center justify-items-center text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Keep your passwords safe with <span className="text-teal-400">Password Vault</span>
        </h1>
        <p className="mt-4 text-slate-300">
          Generate, save, and manage your credentials in a simple and private vault.
          Now powered by secure backend APIs with JWT auth.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/register" className="px-5 py-3 rounded bg-teal-600 text-white hover:bg-teal-500">Get Started</Link>
        <Link href="/login" className="px-5 py-3 rounded border border-slate-700 hover:bg-slate-800">Login</Link>
      </div>
      <ul className="mt-6 grid sm:grid-cols-3 gap-4 text-left w-full max-w-4xl">
        <li className="rounded border border-slate-700 p-4 bg-slate-900">
          <h3 className="font-semibold">Fast and minimal</h3>
          <p className="text-sm text-slate-300">Clean UI built with Next.js and Tailwind CSS.</p>
        </li>
        <li className="rounded border border-slate-700 p-4 bg-slate-900">
          <h3 className="font-semibold">Privacy-first</h3>
          <p className="text-sm text-slate-300">Only your account can access your encrypted vault.</p>
        </li>
        <li className="rounded border border-slate-700 p-4 bg-slate-900">
          <h3 className="font-semibold">Easy management</h3>
          <p className="text-sm text-slate-300">Add and delete entries easily from your dashboard.</p>
        </li>
      </ul>
    </section>
  );
}
