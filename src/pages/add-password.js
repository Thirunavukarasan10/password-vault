import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useVault } from "../context/VaultContext";
import Button from "../components/Button";
import Input from "../components/Input";

function generatePassword({ length, useLower, useUpper, useDigits, useSymbols, excludeSimilar }) {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{};:,.?/";
  const similar = new Set(["l","1","I","O","0","o"]);

  let charset = "";
  if (useLower) charset += lower;
  if (useUpper) charset += upper;
  if (useDigits) charset += digits;
  if (useSymbols) charset += symbols;
  if (!charset) charset = lower + upper + digits;

  const pool = excludeSimilar ? [...charset].filter((c)=>!similar.has(c)).join("") : charset;

  let result = "";
  for (let i = 0; i < length; i += 1) {
    const idx = Math.floor(Math.random() * pool.length);
    result += pool[idx];
  }
  return result;
}

export default function AddPasswordPage() {
  const router = useRouter();
  const { addPasswordEntry, currentUser, loading } = useVault();
  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace("/login");
    }
  }, [loading, currentUser, router]);

  if (!currentUser) return null;

  const [form, setForm] = useState({ serviceName: "", username: "", password: "" });
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ useLower: true, useUpper: true, useDigits: true, useSymbols: true, excludeSimilar: true });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleGenerate() {
    const pwd = generatePassword({ length, ...opts });
    setForm((f) => ({ ...f, password: pwd }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.serviceName.trim() || !form.username.trim() || !form.password.trim()) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await addPasswordEntry({
        serviceName: form.serviceName.trim(),
        username: form.username.trim(),
        password: form.password,
      });
      router.push("/dashboard");
    } catch (err) {
      alert(err?.data?.error || err?.message || "Failed to save");
    }
  }

  return (
    <section className="max-w-2xl mx-auto grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-3xl font-bold">Add Password</h1>
        <Button variant="outline" onClick={() => router.push("/dashboard")}>Cancel</Button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 rounded border p-4 bg-white dark:border-slate-700 dark:bg-slate-800">
        <Input label="Service Name" name="serviceName" value={form.serviceName} onChange={handleChange} placeholder="e.g. Gmail" />
        <Input label="Username" name="username" value={form.username} onChange={handleChange} placeholder="e.g. alice@example.com" />
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
          <div className="flex gap-2">
            <Input name="password" value={form.password} onChange={handleChange} placeholder="Click Generate" />
            <Button type="button" onClick={handleGenerate}>Generate</Button>
          </div>
        </div>

        <fieldset className="grid gap-3">
          <legend className="text-sm font-semibold text-slate-700 dark:text-slate-300">Generator options</legend>
          <div className="flex items-center gap-3">
            <label className="text-sm">Length: <span className="font-medium">{length}</span></label>
            <input type="range" min={8} max={64} value={length} onChange={(e)=>setLength(parseInt(e.target.value, 10))} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(opts).map(([key, val]) => (
              <label key={key} className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={val} onChange={(e)=>setOpts((o)=>({ ...o, [key]: e.target.checked }))} />
                {key.replace(/([A-Z])/g, " $1").toLowerCase()}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex gap-3">
          <Button type="submit">Save</Button>
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>Cancel</Button>
        </div>
      </form>
    </section>
  );
}
