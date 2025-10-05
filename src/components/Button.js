export default function Button({ as: As = "button", className = "", variant = "primary", ...props }) {
  const base = "inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-teal-600 text-white hover:bg-teal-500 focus:ring-teal-400",
    secondary: "bg-slate-700 text-white hover:bg-slate-600 focus:ring-slate-400",
    outline: "border border-slate-500 text-slate-100 hover:bg-slate-800 focus:ring-slate-400",
    danger: "bg-rose-600 text-white hover:bg-rose-500 focus:ring-rose-400",
  };
  return <As className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
