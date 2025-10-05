import { useState } from "react";
import Button from "./Button";

export default function PasswordCard({ item, onDelete }) {
  const [reveal, setReveal] = useState(false);

  function copy(text) {
    navigator.clipboard?.writeText(text).catch(() => {});
  }

  return (
    <div className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{item.serviceName}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">{item.username}</p>
        </div>
        <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button variant="ghost" onClick={() => setReveal((v) => !v)}>{reveal ? "Hide" : "Reveal"}</Button>
          <Button variant="ghost" onClick={() => copy(item.password)}>Copy</Button>
          <Button variant="danger" onClick={() => onDelete?.(item.id)}>Delete</Button>
        </div>
      </div>
      <div className="mt-3 rounded bg-slate-50 p-3 font-mono text-sm text-slate-800 dark:bg-slate-900/60 dark:text-slate-200">
        {reveal ? item.password : "••••••••••••••••"}
      </div>
    </div>
  );
}
