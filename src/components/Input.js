export default function Input({ label, error, className = "", ...props }) {
  return (
    <label className={`grid gap-1 ${className}`}>
      {label && <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
      <input
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-teal-400 focus:ring-2 focus:ring-teal-300 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
        {...props}
      />
      {error && <span className="text-xs text-rose-500">{error}</span>}
    </label>
  );
}
