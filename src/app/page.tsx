"use client";

import { useState } from "react";
import Image from "next/image";
import { HorizonLine, SectionLabel, ButtonPrimary, ButtonOutline, ServiceCard } from "@/components/ui";

function ContactForm() {
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
        <div className="text-green text-3xl mb-3">✓</div>
        <p className="font-semibold text-white mb-1">Message sent!</p>
        <p className="text-muted text-sm">We&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted mb-1.5">Name</label>
          <input type="text" required value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-bg1 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
            placeholder="Your name" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1.5">Email</label>
          <input type="email" required value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-bg1 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
            placeholder="your@email.com" />
        </div>
      </div>
      <div>
        <label className="block text-xs text-muted mb-1.5">Message</label>
        <textarea required rows={5} value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-bg1 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors resize-none"
          placeholder="Tell us about your project..." />
      </div>
      {status === "error" && <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>}
      <ButtonPrimary type="submit" className="w-full sm:w-auto" onClick={undefined}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </ButtonPrimary>
    </form>
  );
}

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-bg0">
        <div className="absolute inset-0">
          <Image src="/images/j-class-racing.jpg" alt="" fill className="object-cover opacity-45" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/60 via-bg0/30 to-bg0" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-5">Global Yacht Consultancy</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-6 leading-[1.1]">
              Smooth sailing.<br />Every time.
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-10">
              Foreland Marine provides Project Management, Representation and Consultancy services to some of the world&apos;s most famous yachts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ButtonPrimary href="#services">Our Services</ButtonPrimary>
              <ButtonOutline href="/contact">Get in touch</ButtonOutline>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel>Our Services</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white">Expert marine consultancy,<br />end to end.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              title="Refit Project Management"
              description="We manage every aspect of your yacht refit from beginning to end, from planning and design to project management and crew services. Our team ensures timely delivery, quality workmanship, and effective budgeting for motor and sail yachts over 24m+."
              href="/refit"
            />
            <ServiceCard
              title="Race Winning Technical Consultancy"
              description="Our industry leading Consultants provide top-tier technical guidance for your sailing yacht. We work with you to ensure optimal performance and reliability on the race course, helping you achieve winning results, every time."
              href="/technical-consultancy"
            />
            <ServiceCard
              title="New Build Owner's Representation"
              description="Accredited by the Superyacht Builders Association (SYBAss), Foreland Marine provides expert leadership, management and representation on behalf of yacht owners for new build projects."
              href="/new-build"
            />
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* ABOUT - image left, text right */}
      <section className="py-0 bg-bg1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-72 lg:h-auto min-h-[460px]">
            <Image src="/images/balthasar-racing.jpg" alt="Maxi yacht Balthasar racing under sail" fill className="object-cover" />
            <div className="absolute inset-0 bg-bg0/10" />
          </div>
          <div className="flex items-center px-8 py-20 lg:px-16 lg:py-24">
            <div className="max-w-lg">
              <SectionLabel>About Us</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">
                Your guiding light through the storm.
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                At Foreland Marine, we provide yacht management and marine engineering consultancy across the full lifecycle of a superyacht project, from acquisition and new build through to refit, optimisation and ongoing management. Based in London, with a network of experienced professionals in Antibes, Palma de Mallorca, Fort Lauderdale, Antigua, the Netherlands, Germany, Italy and other key maritime centres, we operate with both global reach and local insight.
              </p>
              <p className="text-muted leading-relaxed mb-5">
                Our team works closely with owners, captains and project stakeholders to ensure each vessel is delivered, maintained and operated to the highest standard. Whether overseeing complex refit programmes, supporting new build development, advising on vessel purchase, or refining performance on the race course, our approach is measured, practical and detail driven. The focus remains on protecting the owner&apos;s interests while enabling efficient, well coordinated project execution.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                The company takes its name from the South Foreland Lighthouse in Kent, a historic navigational landmark that has guided vessels into the Thames Estuary since the 17th century and later played a role in the first ship to shore wireless communication. That heritage underpins our ethos: to provide clear direction, dependable oversight and steady guidance through the complexities of modern yacht ownership and operation.
              </p>
              <ButtonPrimary href="/contact">Get in touch</ButtonPrimary>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* CONTACT CTA */}
      <section className="relative py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-superyacht.jpg" alt="" fill className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-bg0/75" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <SectionLabel>Reach Out Today</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">Got a project coming up?</h2>
              <p className="text-muted leading-relaxed">
                A large project, maintenance period or big race coming up? We&apos;d love to hear from you.
              </p>
            </div>
            <div className="bg-bg2/80 border border-white/5 rounded p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
