"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HorizonLine, SectionLabel, ButtonPrimary, ServiceCard } from "@/components/ui";

const servicesTop = [
  { title: "ISM, Safety & Compliance", description: "Full ISM Code implementation for 500 GT+ vessels, including Safety Management System development, internal audits, corrective action tracking, and incident management. For vessels below 500 GT, voluntary safety management systems aligned with ISM principles." },
  { title: "Crew Management", description: "Recruitment support, contract administration, payroll coordination, leave planning, and ongoing HR advisory. All employment managed per MLC, flag state requirements, and owner preferences." },
  { title: "Financial Management", description: "Annual operating budgets built with the owner, tracked against actuals, and reported monthly with clear variance commentary. Supplier engagement managed with commercial rigour and full transparency." },
];

const servicesBottom = [
  { title: "Class & Flag State", description: "Management of all class and flag state requirements. Survey schedules, statutory inspections, certification renewals, and flag state correspondence coordinated centrally to minimise disruption to the vessel programme." },
  { title: "Insurance", description: "Coordination with specialist marine insurance brokers to ensure appropriate hull, machinery, P&I, and crew cover is in place. Policy review, renewal management, and claims support." },
];

export default function YachtManagementPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "Yacht Management",
              provider: {
                "@type": "Organization",
                name: "Foreland Marine Consultancy Ltd",
              },
              areaServed: "Worldwide",
              description:
                "Independent, owner-focused yacht management covering ISM compliance, crew management, financial oversight, insurance, class and flag state requirements.",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is independent yacht management?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Independent yacht management means serving the owner's interests without conflicts from brokerage, charter, or yard affiliations. Foreland does not sell yachts, broker charter, or earn commissions from suppliers. Every recommendation is made solely in the owner's interest.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What does ISM compliance involve for yachts?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "ISM (International Safety Management) compliance involves developing and maintaining a Safety Management System, crew training and certification, incident reporting procedures, regular internal audits, emergency drills, and a framework of continuous improvement. For vessels over 500 GT, ISM Code compliance is mandatory.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you handle crew recruitment and management?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. We provide full crew management services including recruitment support, contract administration, payroll coordination, training and certification tracking, leave planning, and ongoing HR advisory, all managed per MLC and flag state requirements.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What size yachts do you manage?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We manage motor and sailing yachts over 24 metres, from private cruising vessels to large commercial yachts. Our experience spans vessels from 24 metres to over 60 metres across a range of vessel types and operational profiles.",
                  },
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://forelandmarine.com" },
                { "@type": "ListItem", position: 2, name: "Yacht Management", item: "https://forelandmarine.com/yacht-management" },
              ],
            },
          ]),
        }}
      />

      {/* HERO */}
      <section ref={heroRef} className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-bg0">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Image src="/images/sailing-yacht-deck.jpg" alt="" fill sizes="100vw" className="object-cover opacity-60 saturate-[1.15] scale-110" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/35 via-bg0/15 to-bg0" />
        </div>
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <div className="max-w-3xl">
            <SectionLabel>Yacht Management</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              On the owner&apos;s side,<br />by the captain&apos;s side
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              Independent, owner-focused yacht management covering safety, compliance, crew, finances, and operations. We protect asset value, ensure regulatory confidence, and let owners enjoy their yachts.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES - TOP ROW */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12" data-animate="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white">Comprehensive management services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8" data-animate-stagger>
            {servicesTop.map((s) => (
              <ServiceCard key={s.title} title={s.title} description={s.description} data-animate="fade-up" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" data-animate-stagger>
            {servicesBottom.map((s) => (
              <ServiceCard key={s.title} title={s.title} description={s.description} data-animate="fade-up" />
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* LIGHTSHIP ISM FEATURE */}
      <section className="bg-bg0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center gap-6 p-8 lg:p-12" data-animate="slide-right">
            {/* iPad frame */}
            <div className="relative w-[70%] max-w-[480px]">
              <div className="rounded-[20px] border-[8px] border-[#2a2a2e] bg-[#1a1a1e] p-1 shadow-2xl shadow-black/40">
                <div className="overflow-hidden rounded-[12px]">
                  <Image
                    src="/images/lightship-dashboard.png"
                    alt="Lightship ISM dashboard on tablet"
                    width={1400}
                    height={900}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            {/* iPhone frame */}
            <div className="relative w-[22%] max-w-[140px]">
              <div className="rounded-[18px] border-[5px] border-[#2a2a2e] bg-[#1a1a1e] p-0.5 shadow-2xl shadow-black/40">
                <div className="overflow-hidden rounded-[13px]">
                  <Image
                    src="/images/lightship-mobile.png"
                    alt="Lightship ISM safety drills on mobile"
                    width={590}
                    height={1280}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="px-8 py-16 lg:px-14 lg:py-20 flex flex-col justify-center" data-animate="slide-left">
            <SectionLabel>Lightship ISM</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">Fleet compliance at a glance</h2>
            <p className="text-muted leading-relaxed mb-5">
              Lightship is our proprietary ISM and fleet reporting platform, built from the ground up by people who manage yachts. It gives owners and managers real-time visibility of compliance status across the fleet, consolidating audit trails, non-conformities, corrective actions, incident logs, and certification schedules in one place.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              No more spreadsheets, no more chasing paperwork. One dashboard, every vessel, always up to date.
            </p>
            <div className="self-start"><ButtonPrimary href="/tools/lightship-ism">Learn more</ButtonPrimary></div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* APPROACH */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center" data-animate="fade-up">
          <SectionLabel>Our Approach</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">Independent advice, no conflicts</h2>
          <p className="text-muted leading-relaxed mb-5">
            Unlike many management companies, Foreland does not sell yachts, broker charter, or earn commissions from suppliers. That independence is fundamental to how we operate. Every recommendation we make is in the owner&apos;s interest.
          </p>
          <p className="text-muted leading-relaxed mb-8">
            We work closely with owners, captains and project stakeholders to ensure each vessel is delivered, maintained and operated to the highest standard. The focus remains on protecting the owner&apos;s interests while enabling efficient, well coordinated project execution.
          </p>
          <ButtonPrimary href="/contact">Discuss your requirements</ButtonPrimary>
        </div>
      </section>

      <HorizonLine />

      {/* TESTIMONIAL */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/sailing-fleet-horizon.jpg" alt="" fill sizes="100vw" className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-bg0/80" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center" data-animate="fade-up">
          <SectionLabel>Client Testimonial</SectionLabel>
          <blockquote className="mt-6">
            <svg className="mx-auto mb-6 text-accent/50 w-10 h-10" fill="currentColor" viewBox="0 0 32 32">
              <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H7c0-1.7 1.3-3 3-3V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-7c0-1.7 1.3-3 3-3V8z" />
            </svg>
            <p className="text-xl sm:text-2xl text-white leading-relaxed font-light italic mb-8">
              &ldquo;Dan, Jack &amp; Team have been great to work with. The budget has been clear, they were realistic about timelines, and they listen when something doesn&apos;t make sense operationally. Having FMC on side takes a lot of pressure off and lets me focus on my day-to-day.&rdquo;
            </p>
            <cite className="text-muted text-sm font-medium not-italic">Captain, 30m SY</cite>
          </blockquote>
        </div>
      </section>

      <HorizonLine />

      {/* RELATED SERVICES & FURTHER READING */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-muted">
          Related: <Link href="/new-build" className="text-accent hover:text-white transition-colors">New Build</Link> · <Link href="/refit" className="text-accent hover:text-white transition-colors">Refit Project Management</Link> · <Link href="/technical-consultancy" className="text-accent hover:text-white transition-colors">Technical Consultancy</Link>
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <p className="text-xs text-muted/60 uppercase tracking-widest mb-3">Further Reading</p>
        <div className="flex flex-col gap-2">
          <Link href="/insights/choosing-yacht-management-company" className="text-sm text-accent hover:text-white transition-colors">How to Choose an Independent Yacht Management Company</Link>
          <Link href="/insights/ism-compliance-guide-for-yacht-owners" className="text-sm text-accent hover:text-white transition-colors">A Practical Guide to ISM Compliance for Yacht Owners</Link>
        </div>
      </div>

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/yacht-management.jpg" alt="" fill sizes="100vw" className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-bg0/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Work With Us</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-5">Start a conversation</h2>
          <p className="text-muted leading-relaxed text-base mb-8 max-w-xl mx-auto">
            Whether you need a single specialist or a full management team, we&apos;ll put the right expertise alongside you.
          </p>
          <ButtonPrimary href="/contact">Get in touch</ButtonPrimary>
        </div>
      </section>
    </>
  );
}
