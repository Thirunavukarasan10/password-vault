import { useVault } from "../context/VaultContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const {
    currentUser,
    passwordEntries,
    deletePasswordEntry,
    updatePasswordEntry
  } = useVault();
  const router = useRouter();

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ serviceName: "", username: "", password: "" });

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setEditForm(entry);
  };

  const handleSaveEdit = () => {
    updatePasswordEntry(editForm);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">
            Welcome, {currentUser ? currentUser.name : "Demo User"}
          </p>
        </div>

        <button
          onClick={() => router.push("/addpassword")}
          className="px-5 py-2.5 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition"
        >
          Add Password
        </button>
      </div>

      {/* Password Table */}
      <div className="overflow-x-auto bg-white border border-slate-200 rounded-lg shadow-sm">
        <table className="min-w-full text-sm text-left text-slate-700">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-700">Service</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Username</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Password</th>
              <th className="px-6 py-3 font-semibold text-slate-700 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {passwordEntries.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-slate-500">
                  No passwords saved yet. Click{" "}
                  <span className="font-medium text-emerald-600">“Add Password”</span> to get started.
                </td>
              </tr>
            ) : (
              passwordEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50 transition-colors duration-150">
                  {editingId === entry.id ? (
                    <>
                      <td className="px-6 py-3">
                        <input
                          value={editForm.serviceName}
                          onChange={(e) => setEditForm({ ...editForm, serviceName: e.target.value })}
                          className="border px-2 py-1 rounded w-full"
                        />
                      </td>
                      <td className="px-6 py-3">
                        <input
                          value={editForm.username}
                          onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                          className="border px-2 py-1 rounded w-full"
                        />
                      </td>
                      <td className="px-6 py-3">
                        <input
                          value={editForm.password}
                          onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                          className="border px-2 py-1 rounded w-full"
                        />
                      </td>
                      <td className="px-6 py-3 flex gap-2 justify-center">
                        <button
                          onClick={handleSaveEdit}
                          className="px-3 py-1.5 rounded bg-green-600 text-white hover:bg-green-500"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1.5 rounded bg-gray-300 hover:bg-gray-200"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-3">{entry.serviceName}</td>
                      <td className="px-6 py-3">{entry.username}</td>
                      <td className="px-6 py-3">{entry.password}</td>
                      <td className="px-6 py-3 text-center flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(entry)}
                          className="px-3 py-1.5 rounded text-indigo-600 hover:bg-indigo-50 border border-indigo-200 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePasswordEntry(entry.id)}
                          className="px-3 py-1.5 rounded text-red-600 hover:bg-red-50 border border-red-200 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
