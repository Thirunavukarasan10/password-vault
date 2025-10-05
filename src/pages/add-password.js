import { useState } from "react";
import { useRouter } from "next/router";
import { useVault } from "../context/VaultContext";

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
  const { addPasswordEntry } = useVault();
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

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.serviceName.trim() || !form.username.trim() || !form.password.trim()) {
      alert("Please fill in all fields");
      return;
    }
    addPasswordEntry({
      serviceName: form.serviceName.trim(),
      username: form.username.trim(),
      password: form.password,
    });
    router.push("/dashboard");
  }

  return (
    <section className="max-w-2xl mx-auto grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-3xl font-bold">Add Password</h1>
        <button onClick={() => router.push("/dashboard")} className="px-4 py-2 rounded border hover:bg-slate-50">Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 bg-white rounded border p-4">
        <div>
          <label className="block text-sm font-medium">Service Name</label>
          <input name="serviceName" value={form.serviceName} onChange={handleChange} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Gmail" />
        </div>
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input name="username" value={form.username} onChange={handleChange} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. alice@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <div className="flex gap-2">
            <input name="password" value={form.password} onChange={handleChange} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Click Generate" />
            <button type="button" onClick={handleGenerate} className="mt-1 px-4 py-2 rounded bg-slate-900 text-white hover:bg-slate-700">Generate</button>
          </div>
        </div>

        <fieldset className="grid gap-3">
          <legend className="text-sm font-semibold text-slate-700">Generator options</legend>
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
          <button type="submit" className="px-5 py-2.5 rounded bg-indigo-600 text-white hover:bg-indigo-500">Save</button>
          <button type="button" onClick={() => router.push("/dashboard")} className="px-5 py-2.5 rounded border hover:bg-slate-50">Cancel</button>
        </div>
      </form>
    </section>
  );
}
