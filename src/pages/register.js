import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    if (!form.password.trim()) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await register({ name: form.name.trim(), email: form.email.trim(), password: form.password });
      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <section className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold">Create your account</h1>
      <p className="mt-2 text-slate-300">Join Password Vault and start managing your credentials.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Jane Doe"
          />
          {errors.name && <p className="mt-1 text-sm text-rose-400">{errors.name}</p>}
        </div>
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
          {errors.email && <p className="mt-1 text-sm text-rose-400">{errors.email}</p>}
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
          {errors.password && <p className="mt-1 text-sm text-rose-400">{errors.password}</p>}
        </div>
        <button type="submit" className="mt-2 rounded bg-teal-600 text-white py-2.5 px-4 hover:bg-teal-500">
          Register
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-300">
        Already have an account? <Link className="text-teal-400 hover:underline" href="/login">Log in</Link>
      </p>
    </section>
  );
}
