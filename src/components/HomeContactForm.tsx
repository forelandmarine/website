"use client";

import { useState } from "react";
import { ButtonPrimary } from "@/components/ui";

export default function HomeContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mwvwevze", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  }

  if (status === "success") {
    return (
      <div className="bg-green/10 border border-green/30 rounded p-8 text-center">
        <div className="text-green text-3xl mb-3" aria-hidden="true">✓</div>
        <p className="font-semibold text-white mb-1">Message sent!</p>
        <p className="text-muted text-sm">We&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="home-contact-name" className="block text-xs text-muted mb-1.5">Name</label>
          <input
            id="home-contact-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-bg1 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="home-contact-email" className="block text-xs text-muted mb-1.5">Email</label>
          <input
            id="home-contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-bg1 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="home-contact-message" className="block text-xs text-muted mb-1.5">Message</label>
        <textarea
          id="home-contact-message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-bg1 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors resize-none"
          placeholder="Tell us about your project..."
        />
      </div>
      {status === "error" && <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>}
      <ButtonPrimary type="submit" className="w-full sm:w-auto" onClick={undefined}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </ButtonPrimary>
    </form>
  );
}
