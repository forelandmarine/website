"use client";

import { useState } from "react";

export function PayInvoice({ token, label }: { token: string; label: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function pay() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/i/${token}/pay`, { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Could not start payment.");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <div className="print:hidden">
      <button
        type="button"
        onClick={pay}
        disabled={busy}
        className="rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-700 disabled:opacity-50"
      >
        {busy ? "Redirecting…" : label}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
