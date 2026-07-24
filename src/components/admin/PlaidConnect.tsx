"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

// Minimal Plaid Link launcher: loads Plaid's CDN script, fetches a link token,
// opens Link, and on success posts the public_token to our exchange endpoint.
// Avoids a client dependency by using window.Plaid directly.

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Plaid?: any;
  }
}

const SCRIPT_SRC = "https://cdn.plaid.com/link/v2/stable/link-initialize.js";

function loadPlaidScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Plaid) return resolve();
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Plaid")));
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Plaid"));
    document.body.appendChild(s);
  });
}

export function PlaidConnect() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const connect = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      await loadPlaidScript();
      const res = await fetch("/api/banking/plaid/link-token", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.link_token) throw new Error(data.error || "Could not start Plaid.");

      const handler = window.Plaid.create({
        token: data.link_token,
        onSuccess: async (public_token: string) => {
          setBusy(true);
          const ex = await fetch("/api/banking/plaid/exchange", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ public_token }),
          });
          if (!ex.ok) {
            const d = await ex.json().catch(() => ({}));
            setError(d.error || "Could not connect the account.");
            setBusy(false);
            return;
          }
          router.push("/admin/banking?connected=1");
          router.refresh();
        },
        onExit: (err: unknown) => {
          setBusy(false);
          if (err) setError("Connection cancelled.");
        },
      });
      handler.open();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setBusy(false);
    }
  }, [router]);

  return (
    <div>
      <button
        type="button"
        onClick={connect}
        disabled={busy}
        className="rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-700 disabled:opacity-50"
      >
        {busy ? "Opening…" : "Connect a bank"}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
