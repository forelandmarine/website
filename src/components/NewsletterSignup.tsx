"use client";

import { useState } from "react";
import { ButtonPrimary } from "@/components/ui";

export default function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mwvwevze", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          _subject: "Newsletter signup — The Foreland Quarter",
          message: `Newsletter signup: ${form.name} <${form.email}>`,
        }),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  }

  if (status === "success") {
    return (
      <div className="bg-green/10 border border-green/30 rounded p-8 text-center">
        <div className="text-green text-3xl mb-3">✓</div>
        <p className="font-semibold text-white mb-1">You&apos;re on the list.</p>
        <p className="text-muted text-sm">Next issue of The Foreland Quarter will land in your inbox.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted mb-1.5">Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-bg1 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1.5">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-bg1 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>
      {status === "error" && (
        <p className="text-red-400 text-sm">Something went wrong. Please try again or email info@forelandmarine.com.</p>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs text-muted/70 leading-relaxed">
          Quarterly. No spam, no sharing. Unsubscribe any time.
        </p>
        <ButtonPrimary type="submit" className="w-full sm:w-auto" onClick={undefined}>
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </ButtonPrimary>
      </div>
    </form>
  );
}
