import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    try {
      await login({ email: form.email.trim(), password: form.password });
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold">Welcome back</h1>
      <p className="mt-2 text-slate-300">Log in to access your vault.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <button type="submit" className="mt-2 rounded bg-teal-600 text-white py-2.5 px-4 hover:bg-teal-500">
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-300">
        New here? <Link className="text-teal-400 hover:underline" href="/register">Create an account</Link>
      </p>
    </section>
  );
}
