"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";

type Role = "owner" | "staff" | "bookkeeper";

const nav: { href: string; label: string; roles: Role[] }[] = [
  { href: "/admin", label: "Dashboard", roles: ["owner", "staff", "bookkeeper"] },
  { href: "/admin/enquiries", label: "Enquiries", roles: ["owner", "staff"] },
  { href: "/admin/clients", label: "Clients", roles: ["owner", "staff", "bookkeeper"] },
  { href: "/admin/quotes", label: "Proposals", roles: ["owner", "staff"] },
  { href: "/admin/jobs", label: "Engagements", roles: ["owner", "staff"] },
  { href: "/admin/calendar", label: "Calendar", roles: ["owner", "staff"] },
  { href: "/admin/invoices", label: "Invoices", roles: ["owner", "bookkeeper"] },
  { href: "/admin/payments", label: "Payments", roles: ["owner", "bookkeeper"] },
  { href: "/admin/banking", label: "Banking", roles: ["owner", "bookkeeper"] },
  { href: "/admin/expenses", label: "Expenses", roles: ["owner", "bookkeeper"] },
  { href: "/admin/reports", label: "Reports", roles: ["owner", "bookkeeper"] },
  { href: "/admin/services", label: "Rate card", roles: ["owner"] },
  { href: "/admin/team", label: "Team", roles: ["owner"] },
  { href: "/admin/settings", label: "Settings", roles: ["owner"] },
];

function Wordmark() {
  return (
    <div className="leading-tight">
      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Foreland</div>
      <div className="text-[0.6rem] font-light uppercase tracking-[0.28em] text-white/50">Operations</div>
    </div>
  );
}

export function Sidebar({ role, name }: { role: Role; name: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [open, setOpen] = useState(false);

  async function signOut() {
    setSigningOut(true);
    await getSupabaseBrowser().auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const items = nav.filter((n) => n.roles.includes(role));

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-navy px-4 py-3 lg:hidden">
        <Wordmark />
        <button onClick={() => setOpen(true)} className="text-sm uppercase tracking-widest text-white" aria-label="Open menu">
          Menu
        </button>
      </div>

      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={`${open ? "flex" : "hidden"} fixed inset-y-0 left-0 z-40 w-64 flex-col bg-navy text-white lg:flex lg:static lg:z-auto lg:w-60 lg:shrink-0`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Wordmark />
          <button onClick={() => setOpen(false)} className="text-white/70 lg:hidden" aria-label="Close menu">
            ✕
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
          {items.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                  active ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/15 px-5 py-4">
          <p className="text-sm text-white/90">{name}</p>
          <p className="text-[0.65rem] uppercase tracking-widest text-white/50 capitalize">{role}</p>
          <div className="mt-3 flex items-center gap-4">
            <Link href="/admin/account" onClick={() => setOpen(false)} className="text-xs text-white/70 hover:text-white">
              Account
            </Link>
            <button onClick={signOut} disabled={signingOut} className="text-xs text-accent hover:text-white">
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
