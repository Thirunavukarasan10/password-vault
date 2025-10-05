import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useVault } from "../context/VaultContext";
import Button from "../components/Button";
import Input from "../components/Input";

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser } = useVault();
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
      await registerUser(form.name.trim(), form.email.trim(), form.password);
      router.push("/dashboard");
    } catch (err) {
      const apiError = err?.data?.error || err?.message || "Registration failed";
      setErrors((prev) => ({ ...prev, api: apiError }));
    }
  }

  return (
    <section className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold">Create your account</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Join Password Vault and start managing your credentials.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          error={errors.password}
        />
        {errors.api && <p className="text-sm text-rose-500">{errors.api}</p>}
        <Button type="submit" className="mt-2">Register</Button>
      </form>

      <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
        Already have an account? <Link className="text-teal-600 dark:text-teal-400 hover:underline" href="/login">Log in</Link>
      </p>
    </section>
  );
}
