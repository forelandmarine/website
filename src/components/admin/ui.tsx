import Link from "next/link";
import type { ReactNode } from "react";

export { money, fmtDate, fmtDateTime, titleCase } from "@/lib/admin/format";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-slate-200 bg-white ${className}`}>{children}</div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  href,
}: {
  label: string;
  value: string;
  hint?: string;
  href?: string;
}) {
  const inner = (
    <>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </>
  );
  const cls = "block rounded-lg border border-slate-200 bg-white p-5 transition-colors" + (href ? " hover:border-navy" : "");
  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
      <p className="text-lg font-medium text-slate-700">{title}</p>
      {hint && <p className="mt-2 text-sm text-slate-500">{hint}</p>}
    </div>
  );
}

const badgeTones: Record<string, string> = {
  slate: "bg-slate-100 text-slate-600",
  navy: "bg-navy/10 text-navy",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-red-100 text-red-700",
  blue: "bg-sky-100 text-sky-700",
};

// Maps a status string to a tone so badges read consistently across modules.
const statusTone: Record<string, keyof typeof badgeTones> = {
  new: "blue", contacted: "amber", quoting: "amber", won: "green", lost: "slate", archived: "slate",
  draft: "slate", sent: "blue", accepted: "green", declined: "red", expired: "slate",
  lead: "slate", scheduled: "blue", in_progress: "amber", on_hold: "amber", completed: "green", cancelled: "red",
  pending: "slate", complete: "green", invoiced: "navy",
  part_paid: "amber", paid: "green", overdue: "red", void: "slate",
  succeeded: "green", failed: "red", refunded: "amber",
  unpaid: "amber",
};

export function Badge({ children, tone }: { children: ReactNode; tone?: keyof typeof badgeTones }) {
  const key = typeof children === "string" ? children.toLowerCase() : "";
  const resolved = tone ?? statusTone[key] ?? "slate";
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${badgeTones[resolved]}`}>
      {typeof children === "string" ? children.replace(/_/g, " ") : children}
    </span>
  );
}

export function LinkButton({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "outline" }) {
  const cls =
    variant === "primary"
      ? "inline-flex items-center justify-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-700"
      : "inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50";
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
