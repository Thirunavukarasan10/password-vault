import Link from "next/link";

export default function HomePage() {
  return (
    <section className="grid gap-8 items-center justify-items-center text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Keep your passwords safe with <span className="">Password Vault</span>
        </h1>
        <p className="mt-4 text-slate-600">
          Generate, save, and manage your credentials in a simple and private vault.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/register" className="px-5 py-3 rounded bg-indigo-600 text-white hover:bg-indigo-500">Get Started</Link>
        <Link href="/login" className="px-5 py-3 rounded border border-slate-300 hover:bg-slate-100">Login</Link>
      </div>
      
        
    </section>
  );
}
