import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useVault } from "../context/VaultContext";
import Button from "../components/Button";
import Input from "../components/Input";

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useVault();
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
      await loginUser(form.email.trim(), form.password);
      router.push("/dashboard");
    } catch (err) {
      setError(err?.data?.error || err?.message || "Login failed");
    }
  }

  return (
    <section className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold">Welcome back</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Log in to access your vault.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
        {error && <p className="text-sm text-rose-500">{error}</p>}
        <Button type="submit" className="mt-2">Login</Button>
      </form>

      <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
        New here? <Link className="text-teal-600 dark:text-teal-400 hover:underline" href="/register">Create an account</Link>
      </p>
    </section>
  );
}
