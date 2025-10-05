export default function Button({ as: Tag = "button", variant = "primary", className = "", children, ...props }) {
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-teal-500 text-white hover:bg-teal-400 focus:ring-teal-400 dark:bg-teal-400 dark:hover:bg-teal-300 dark:focus:ring-teal-300",
    secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300 focus:ring-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:focus:ring-slate-600",
    ghost: "bg-transparent text-teal-500 hover:bg-teal-50 focus:ring-teal-300 dark:text-teal-300 dark:hover:bg-teal-900/30 dark:focus:ring-teal-800",
    danger: "bg-rose-500 text-white hover:bg-rose-400 focus:ring-rose-400 dark:bg-rose-500/90 dark:hover:bg-rose-400/90 dark:focus:ring-rose-400",
    outline: "border border-slate-300 text-slate-900 hover:bg-slate-100 focus:ring-slate-300 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus:ring-slate-700",
  };
  const cls = `${base} ${variants[variant] || variants.primary} ${className}`;
  return <Tag className={cls} {...props}>{children}</Tag>;
}
