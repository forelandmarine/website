"use client";

import { useFormStatus } from "react-dom";

// Submit button that disables while the server action runs, preventing the
// double-submit duplicate-row bug.
export function PendingButton({
  children,
  pendingLabel,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  variant?: "primary" | "outline" | "danger";
  className?: string;
}) {
  const { pending } = useFormStatus();
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-navy text-white hover:bg-navy-700",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
    danger: "border border-red-300 text-red-700 hover:bg-red-50",
  };
  return (
    <button type="submit" disabled={pending} className={`${base} ${variants[variant]} ${className}`}>
      {pending ? pendingLabel ?? "Saving…" : children}
    </button>
  );
}
