import Link from "next/link";
import { useVault } from "../context/VaultContext";

export default function DashboardPage() {
  const { currentUser, passwordEntries, deletePasswordEntry } = useVault();

  return (
    <section className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-600">{currentUser ? `Welcome, ${currentUser.name}` : "You are viewing demo data."}</p>
        </div>
        <Link href="/add-password" className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500">Add Password</Link>
      </div>

      <div className="overflow-hidden rounded border">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 text-left text-sm font-semibold text-slate-700">
            <tr>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Password</th>
              <th className="px-4 py-3 w-56">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {passwordEntries.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 font-medium">{item.serviceName}</td>
                <td className="px-4 py-3">{item.username}</td>
                <td className="px-4 py-3 font-mono">{item.password}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm rounded border hover:bg-slate-50" onClick={() => alert("Edit coming soon")}>Edit</button>
                    <button className="px-3 py-1.5 text-sm rounded border border-red-300 text-red-700 hover:bg-red-50" onClick={() => deletePasswordEntry(item.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {passwordEntries.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-600">No entries yet. Click &quot;Add Password&quot; to create one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
