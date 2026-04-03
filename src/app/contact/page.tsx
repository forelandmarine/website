"use client";

import { useState } from "react";
import Image from "next/image";
import { HorizonLine, SectionLabel, ButtonPrimary } from "@/components/ui";
import ParallaxHero from "@/components/ParallaxHero";

export default function ContactPage() {
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

  return (
    <>
      {/* HERO */}
      <ParallaxHero
        className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-bg0"
        bg={
          <>
            <Image src="/images/monaco-harbour-sunset.jpg" alt="" fill sizes="100vw" className="object-cover object-[center_75%] opacity-50 saturate-[1.15] scale-110" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-bg0/35 via-bg0/15 to-bg0" />
          </>
        }
        content={
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <SectionLabel>Contact Us</SectionLabel>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-5 leading-tight">
                Get in Touch
              </h1>
              <p className="text-lg text-muted leading-relaxed">
                Got a large project, maintenance period or big race coming up? We&apos;d love to hear from you.
              </p>
            </div>
          </div>
        }
      />

      <HorizonLine />

      {/* FORM + DETAILS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="bg-bg2 border border-white/10 p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl font-light text-white mb-6">Send us a message</h2>
              {status === "success" ? (
                <div className="bg-green/10 border border-green/30 rounded p-8 text-center">
                  <div className="text-green text-4xl mb-4">✓</div>
                  <p className="text-white font-semibold mb-2">Message sent!</p>
                  <p className="text-muted text-sm">Thank you for reaching out. We&apos;ll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs text-muted mb-1.5">Name</label>
                    <input type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-bg1 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1.5">Email</label>
                    <input type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-bg1 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1.5">Message</label>
                    <textarea required rows={6} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-bg1 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                      placeholder="Tell us about your project, vessel, or requirements..." />
                  </div>
                  {status === "error" && (
                    <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly at info@forelandmarine.com</p>
                  )}
                  <ButtonPrimary type="submit" className="w-full">
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </ButtonPrimary>
                </form>
              )}
            </div>

            {/* Contact details */}
            <div className="space-y-10">
              <div>
                <h2 className="text-xl font-light text-white mb-6">Contact details</h2>
                <div className="space-y-6">
                  {[
                    {
                      label: "Email",
                      content: <a href="mailto:info@forelandmarine.com" className="text-white hover:text-accent transition-colors">info@forelandmarine.com</a>,
                    },
                    {
                      label: "Address",
                      content: <address className="text-white not-italic">7 Bell Yard, London<br />WC2A 2JR</address>,
                    },
                    {
                      label: "Instagram",
                      content: <a href="https://instagram.com/forelandmarine" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">@forelandmarine</a>,
                    },
                    {
                      label: "LinkedIn",
                      content: <a href="https://www.linkedin.com/company/forelandmarine" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">Foreland Marine</a>,
                    },
                  ].map((item) => (
                    <div key={item.label} className="border-l-2 border-accent/40 pl-4">
                      <p className="text-xs text-muted uppercase tracking-widest mb-1">{item.label}</p>
                      {item.content}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
