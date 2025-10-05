import Link from "next/link";

export default function HomePage() {
  return (
    <section className="grid gap-8 items-center justify-items-center text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Keep your passwords safe with <span className="text-indigo-600">Password Vault</span>
        </h1>
        <p className="mt-4 text-slate-600">
          Generate, save, and manage your credentials in a simple and private vault.
          This MVP is frontend-only using mock data and local state.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/register" className="px-5 py-3 rounded bg-indigo-600 text-white hover:bg-indigo-500">Get Started</Link>
        <Link href="/login" className="px-5 py-3 rounded border border-slate-300 hover:bg-slate-100">Login</Link>
      </div>
      <ul className="mt-6 grid sm:grid-cols-3 gap-4 text-left w-full max-w-4xl">
        <li className="rounded border p-4 bg-white">
          <h3 className="font-semibold">Fast and minimal</h3>
          <p className="text-sm text-slate-600">Clean UI built with Next.js and Tailwind CSS.</p>
        </li>
        <li className="rounded border p-4 bg-white">
          <h3 className="font-semibold">Privacy-first</h3>
          <p className="text-sm text-slate-600">No backend yet; everything stays in your browser state.</p>
        </li>
        <li className="rounded border p-4 bg-white">
          <h3 className="font-semibold">Easy management</h3>
          <p className="text-sm text-slate-600">Add, edit, and delete entries from a simple dashboard.</p>
        </li>
      </ul>
    </section>
  );
}
