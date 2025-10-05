export default function Input({ label, className = "", ...props }) {
  return (
    <label className={`grid gap-1 ${className}`}>
      {label && <span className="text-sm text-slate-300">{label}</span>}
      <input
        className="rounded bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        {...props}
      />
    </label>
  );
}
