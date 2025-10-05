import { useEffect } from "react";
import Button from "./Button";

export default function Modal({ open, onClose, title, children, actions }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-lg border border-slate-200 bg-white p-4 shadow-xl animate-in slide-in-from-bottom-2 sm:slide-in-from-bottom-0 sm:zoom-in-95 dark:border-slate-700 dark:bg-slate-900">
        {title && <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>}
        <div className="mt-2 text-slate-700 dark:text-slate-300">{children}</div>
        {actions && (
          <div className="mt-4 flex justify-end gap-2">
            {actions}
          </div>
        )}
        {!actions && (
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>Close</Button>
          </div>
        )}
      </div>
    </div>
  );
}
