import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useVault } from "../context/VaultContext";

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useVault();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    loginUser({
      email: form.email.trim(),
      password: form.password.trim(),
    })
      .then(() => router.push("/dashboard"))
      .catch((err) => setError(err.message));
  }

  return (
    <section className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold">Welcome back</h1>
      <p className="mt-2 text-slate-600">Log in to access your vault.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="mt-2 rounded bg-slate-900 text-white py-2.5 px-4 hover:bg-slate-700"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-700">
        New here?{" "}
        <Link className="hover:underline" href="/register">
          Create an account
        </Link>
      </p>
    </section>
  );
}
