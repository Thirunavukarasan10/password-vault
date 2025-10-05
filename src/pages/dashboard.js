import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useApi } from "../lib/api";
import PasswordCard from "../components/PasswordCard";
import Button from "../components/Button";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const api = useApi();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ serviceName: "", username: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.get("/api/passwords");
        setItems(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addItem(e) {
    e.preventDefault();
    if (!form.serviceName || !form.username || !form.password) return;
    setSubmitting(true);
    try {
      const { id } = await api.post("/api/passwords", form);
      setItems((prev) => [{ id, ...form }, ...prev]);
      setForm({ serviceName: "", username: "", password: "" });
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteItem(id) {
    try {
      await api.del(`/api/passwords?id=${id}`);
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <section className="grid gap-8">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-300">{!loading && user ? `Welcome, ${user.name}` : ""}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid gap-4">
          <h2 className="text-xl font-semibold">My Vault</h2>
          <div className="grid gap-3">
            {items.map((item) => (
              <PasswordCard key={item.id} item={item} onDelete={deleteItem} />
            ))}
            {items.length === 0 && (
              <p className="text-slate-400">No entries yet. Use the form to add one.</p>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">Add Password</h2>
          <form onSubmit={addItem} className="grid gap-3 p-4 rounded border border-slate-700 bg-slate-900">
            <label className="grid gap-1 text-sm">
              <span>Service Name</span>
              <input className="rounded bg-slate-800 border border-slate-700 px-3 py-2" value={form.serviceName} onChange={(e)=>setForm((f)=>({...f, serviceName: e.target.value}))} />
            </label>
            <label className="grid gap-1 text-sm">
              <span>Username</span>
              <input className="rounded bg-slate-800 border border-slate-700 px-3 py-2" value={form.username} onChange={(e)=>setForm((f)=>({...f, username: e.target.value}))} />
            </label>
            <label className="grid gap-1 text-sm">
              <span>Password</span>
              <input className="rounded bg-slate-800 border border-slate-700 px-3 py-2" value={form.password} onChange={(e)=>setForm((f)=>({...f, password: e.target.value}))} />
            </label>
            <Button disabled={submitting} variant="primary" type="submit">{submitting ? "Saving..." : "Save"}</Button>
          </form>

          <div className="grid gap-2">
            <h2 className="text-xl font-semibold">Profile</h2>
            <div className="rounded border border-slate-700 bg-slate-900 p-4 text-sm">
              <div>Email: {user?.email ?? "-"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
