"use client";

import { useState } from "react";
import { ButtonPrimary } from "@/components/ui";

export default function ContactPageForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, source: "contact-page" }),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  }

  if (status === "success") {
    return (
      <div className="bg-green/10 border border-green/30 rounded p-8 text-center">
        <div className="text-green text-4xl mb-4" aria-hidden="true">✓</div>
        <p className="text-white font-semibold mb-2">Message sent!</p>
        <p className="text-muted text-sm">Thank you for reaching out. We&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-page-name" className="block text-xs text-muted mb-1.5">Name</label>
        <input
          id="contact-page-name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-bg1 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
          placeholder="Your full name"
        />
      </div>
      <div>
        <label htmlFor="contact-page-email" className="block text-xs text-muted mb-1.5">Email</label>
        <input
          id="contact-page-email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-bg1 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label htmlFor="contact-page-message" className="block text-xs text-muted mb-1.5">Message</label>
        <textarea
          id="contact-page-message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-bg1 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors resize-none"
          placeholder="Tell us about your project, vessel, or requirements..."
        />
      </div>
      {status === "error" && (
        <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly at info@forelandmarine.com</p>
      )}
      <ButtonPrimary type="submit" className="w-full">
        {status === "loading" ? "Sending..." : "Send Message"}
      </ButtonPrimary>
    </form>
  );
}
