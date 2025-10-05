import Button from "./Button";

export default function PasswordCard({ item, onDelete }) {
  return (
    <div className="rounded border border-slate-700 bg-slate-900 p-4 flex items-start justify-between gap-4">
      <div>
        <div className="font-semibold text-teal-300">{item.serviceName}</div>
        <div className="text-sm text-slate-300">{item.username}</div>
        <div className="mt-1 font-mono text-slate-200">{item.password}</div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => alert("Edit coming soon")}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete?.(item.id)}>Delete</Button>
      </div>
    </div>
  );
}
