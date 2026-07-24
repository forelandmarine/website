"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const supabase = getSupabaseBrowser();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Could not sign in. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center">
        <div className="text-lg font-semibold uppercase tracking-[0.2em] text-navy">Foreland</div>
        <p className="mt-1 text-xs uppercase tracking-[0.28em] text-slate-400">Operations</p>
      </div>

      {!isSupabaseConfigured ? (
        <div className="mt-8 rounded-lg border border-amber-300 bg-amber-50 p-6 text-center text-sm text-amber-800">
          The operations database is not connected yet. Once the Supabase keys are set,
          sign-in will work here.
        </div>
      ) : (
        <form onSubmit={submit} className="mt-8 space-y-4">
          <label className="block">
            <span className="fm-label">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="fm-fld"
              autoComplete="email"
            />
          </label>
          <label className="block">
            <span className="fm-label">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="fm-fld"
              autoComplete="current-password"
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-700 disabled:opacity-50"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      )}
      <p className="mt-6 text-center text-xs text-slate-400">Foreland Marine Consultancy Ltd</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="fm-admin fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-50 p-6">
      <Suspense fallback={<div className="text-sm text-slate-400">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
