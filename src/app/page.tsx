"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HorizonLine, SectionLabel, ButtonPrimary, ButtonOutline, ServiceCard } from "@/components/ui";
import ScrollHint from "@/components/ScrollHint";

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
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-bg0">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Image src="/images/j-class-racing.jpg" alt="" fill sizes="100vw" className="object-cover opacity-65 scale-110 saturate-[1.15]" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/30 via-bg0/15 to-bg0" />
        </div>
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 -mt-[12vh] will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-white mb-6 leading-[1.1]">
              Smooth sailing.<br />Every time.
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-10">
              Foreland Marine provides Project Management, Representation and Consultancy services to some of the world&apos;s most famous yachts.
            </p>
            <div className="hidden sm:flex flex-col sm:flex-row gap-4">
              <ButtonPrimary href="#services">Our Services</ButtonPrimary>
              <ButtonOutline href="/contact">Get in touch</ButtonOutline>
            </div>
          </div>
        </div>
        <ScrollHint />
      </section>

      {/* SERVICES */}
      <section id="services" className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" data-animate="fade-up">
            <SectionLabel>Our Services</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white">Expert marine consultancy, from<br />stem to stern.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-animate-stagger>
            <ServiceCard
              data-animate="fade-up"
              title="Refit Project Management"
              description="We manage every aspect of your yacht refit from beginning to end, from planning and design to project management and crew services. Our team ensures timely delivery, quality workmanship, and effective budgeting for motor and sail yachts over 24m+."
              href="/refit"
            />
            <ServiceCard
              data-animate="fade-up"
              title="Race Winning Technical Consultancy"
              description="Our industry leading Consultants provide top-tier technical guidance for your sailing yacht. We work with you to ensure optimal performance and reliability on the race course, helping you achieve winning results, every time."
              href="/technical-consultancy"
            />
            <ServiceCard
              data-animate="fade-up"
              title="New Build Owner's Representation"
              description="Accredited by the Superyacht Builders Association (SYBAss), Foreland Marine provides expert leadership, management and representation on behalf of yacht owners for new build projects."
              href="/new-build"
            />
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* ABOUT - image left, text right */}
      <section className="py-0 bg-bg0 overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-0 sm:px-0 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 items-center">
            <div className="relative h-64 sm:h-80 md:h-[500px] lg:h-[720px] rounded-none lg:rounded overflow-hidden" data-animate="slide-right">
              <Image src="/images/balthasar-racing.jpg" alt="Maxi yacht Balthasar racing under sail" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-bg0/40" />
            </div>
            <div className="px-8 py-20 lg:px-0 lg:py-24" data-animate="slide-left">
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
        </div>
      </section>

      <HorizonLine />

      {/* FAQ - hidden visually, kept for JSON-LD SEO */}
      <section className="sr-only">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What services does Foreland Marine offer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Foreland Marine provides new build owner's representation, yacht refit project management, technical consultancy, independent yacht management, ISM compliance, and performance sailing yacht engineering. We operate worldwide from our base in London.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is an owner's representative in a yacht new build?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "An owner's representative acts independently on behalf of the yacht owner throughout the new build process. They provide oversight of the shipyard, manage budgets, review technical specifications, monitor build quality and ensure the owner's interests are protected from contract through to delivery.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are you independent from shipyards and brokers?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Foreland Marine is entirely independent. We hold no yard affiliations, receive no broker commissions and accept no referral fees from suppliers. Every recommendation we make serves one interest alone: the owner.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What size yachts do you work with?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We specialise in sailing and motor yachts from 24 to 60 metres, with particular depth in performance sailing yachts. Our team has extensive experience with J Class yachts, maxi racers, fast carbon composite yachts and large motor yachts.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What qualifications does the Foreland Marine team hold?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our team includes Captains, unlimited Chief Engineers, Naval Architects, Fleet Managers and Surveyors. Foreland Marine is SYBAss accredited and registered on the Yacht Owner's Representative Register (YORR).",
                  },
                },
              ],
            }),
          }}
        />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div data-animate="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-10">
              Common questions
            </h2>
          </div>
          <div className="space-y-3">
            <details className="group border border-white/10 bg-bg0" data-animate="fade-up">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What services does Foreland Marine offer?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed text-sm">
                We provide new build owner&apos;s representation, yacht refit project management, technical consultancy, independent yacht management, ISM compliance, and performance sailing yacht engineering. We operate worldwide from our base in London.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg0" data-animate="fade-up">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What is an owner&apos;s representative in a yacht new build?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed text-sm">
                An owner&apos;s representative acts independently on behalf of the yacht owner throughout the new build process. They provide oversight of the shipyard, manage budgets, review technical specifications, monitor build quality and ensure the owner&apos;s interests are protected from contract through to delivery.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg0" data-animate="fade-up">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                Are you independent from shipyards and brokers?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed text-sm">
                Yes. Foreland Marine is entirely independent. We hold no yard affiliations, receive no broker commissions and accept no referral fees from suppliers. Every recommendation we make serves one interest alone: the owner.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg0" data-animate="fade-up">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What size yachts do you work with?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed text-sm">
                We specialise in sailing and motor yachts from 24 to 60 metres, with particular depth in performance sailing yachts. Our team has extensive experience with J Class yachts, maxi racers, fast carbon composite yachts and large motor yachts.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg0" data-animate="fade-up">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What qualifications does the Foreland Marine team hold?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed text-sm">
                Our team includes Captains, unlimited Chief Engineers, Naval Architects, Fleet Managers and Surveyors. Foreland Marine is SYBAss accredited and registered on the Yacht Owner&apos;s Representative Register (YORR).
              </div>
            </details>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* CONTACT CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/racing-marina.jpg" alt="" fill sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-bg0/75" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12" data-animate="fade-up">
              <SectionLabel>Reach Out Today</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">Got a project coming up?</h2>
              <p className="text-muted leading-relaxed">
                A large project, maintenance period or big race coming up? We&apos;d love to hear from you.
              </p>
            </div>
            <div className="bg-bg2/80 border border-white/5 rounded p-4 sm:p-6 lg:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
