"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HorizonLine, SectionLabel, ButtonPrimary, ServiceCard } from "@/components/ui";

const services = [
  { title: "Planning & Specification", description: "Scope definition, design review, work specification, and budget development prior to the yard period. Thorough planning at this stage is fundamental to a well-executed refit." },
  { title: "On-Site Project Management", description: "A dedicated project manager present at the yard throughout the refit. Daily progress monitoring, contractor coordination, quality assurance, and structured owner reporting." },
  { title: "Yard Selection & Tendering", description: "Assessment of yards against capability, availability, track record, and commercial value. Management of the tendering process and contract negotiation on behalf of the owner." },
  { title: "Budget & Cost Control", description: "Detailed financial tracking from the outset, with monthly reporting, change order review, and supplier negotiation. Full transparency on expenditure at every stage." },
  { title: "Quality & Compliance", description: "Milestone inspections, coatings and paint survey, systems testing, and formal sign-off at each phase. Coordination of class surveys and flag state requirements as required." },
  { title: "Sea Trials & Handover", description: "Coordination of trials, snagging resolution, crew briefing, and a structured handover process to ensure the vessel departs the yard fully operational and to the agreed standard." },
];

export default function RefitPage() {
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
              serviceType: "Yacht Refit Project Management",
              provider: {
                "@type": "Organization",
                name: "Foreland Marine Consultancy Ltd",
              },
              areaServed: "Worldwide",
              description:
                "Refit project management for motor and sailing yachts over 24m. 25 large yacht projects across 7 countries, from high-profile racing programmes to in-depth motor yacht rebuilds.",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How do you select the right refit yard?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yard selection is based on the vessel type, scope of work, geographic preference, yard capabilities, and track record. We assess multiple yards against these criteria, manage the tendering process, and recommend the option that best serves the owner's interests.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the typical scope of refit project management?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our involvement covers the full lifecycle of a refit, from initial survey and scope definition through yard selection, budget planning, daily on-site oversight, quality control, and contractor coordination, through to sea trials and formal handover.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do you manage refit budgets and timelines?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We provide detailed cost tracking from the outset, with regular reporting to the owner, structured change order management, milestone-based payments, and proactive identification of schedule risks. Full financial transparency is maintained throughout.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can you manage a refit at any shipyard worldwide?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. We have delivered 25 large yacht refit projects across 7 countries and have established relationships with yards in the Mediterranean, Northern Europe, the UK, and beyond. Our team can deploy to any yard worldwide.",
                  },
                },
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
          <Image src="/images/refit-yard.jpg" alt="" fill sizes="100vw" className="object-cover opacity-55 saturate-[1.15] scale-110" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/35 via-bg0/15 to-bg0" />
        </div>
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <div className="max-w-3xl">
            <SectionLabel>Refit Project Management</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Managed with rigour,<br />delivered with care
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              We provide full refit project management for motor and sailing yachts over 24 metres, from initial assessment through to sea trials and handover. From a light refresh to a complete rebuild, our first priority is to deliver on time and on budget.
            </p>
          </div>
        </div>
      </section>

      {/* TRACK RECORD */}
      <section className="bg-bg1 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-animate="fade-up">
              <SectionLabel>Track Record</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">Classic to Carbon</h2>
              <p className="text-muted leading-relaxed mb-5">
                Twenty-five large yacht refit projects delivered across seven countries. High-profile classic and modern racing yachts prepared for the grand prix circuit. Multiple sailing yachts exceeding 40 metres. Motor yachts in excess of 60 metres undergoing comprehensive rebuilds. Historic restorations of vessels dating from the 1920s alongside performance programmes on recently launched craft.
              </p>
              <p className="text-muted leading-relaxed">
                This breadth of experience means our team has encountered the specific challenges associated with each vessel type, from managing complex coatings schemes on pre-war hulls to commissioning carbon rigs on contemporary racing yachts, and overseeing in-depth mechanical and interior refits on large motor yachts.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8" data-animate-stagger>
              <div className="text-center" data-animate="fade-up">
                <p className="text-3xl sm:text-4xl font-light text-white mb-1">25</p>
                <p className="text-sm text-muted">Large yacht projects</p>
              </div>
              <div className="text-center" data-animate="fade-up">
                <p className="text-3xl sm:text-4xl font-light text-white mb-1">7</p>
                <p className="text-sm text-muted">Countries</p>
              </div>
              <div className="text-center" data-animate="fade-up">
                <p className="text-3xl sm:text-4xl font-light text-white mb-1">30-60m+</p>
                <p className="text-sm text-muted">Projects delivered</p>
              </div>
              <div className="text-center" data-animate="fade-up">
                <p className="text-3xl sm:text-4xl font-light text-white mb-1">100+</p>
                <p className="text-sm text-muted">Years of vessel heritage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* SERVICES */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12" data-animate="fade-up">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white">The full scope of a refit</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-animate-stagger>
            {services.map((s) => (
              <ServiceCard key={s.title} title={s.title} description={s.description} data-animate="fade-up" />
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* APPROACH */}
      <section className="bg-bg1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="px-8 py-16 lg:px-14 lg:py-20 flex flex-col justify-center" data-animate="slide-right">
            <SectionLabel>How We Work</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Independent oversight, aligned with the owner
            </h2>
            <p className="text-muted leading-relaxed mb-5">
              Our project leads are predominantly former captains and chief engineers who have managed complex yard periods from the operational side. Their practical experience enables them to identify quality issues early, manage contractor performance effectively, and maintain the standards the owner expects.
            </p>
            <p className="text-muted leading-relaxed mb-5">
              They are supported by in-house naval architects, vibration analysts, coatings and paint surveyors, and equipment specialists. Financial oversight is provided by qualified accountants within the team, with tax advisors and shipping brokers available for registration or commercial matters. The necessary expertise is readily accessible within the organisation.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Foreland receives no commissions from yards, suppliers, or subcontractors. The owner receives impartial advice and transparent reporting throughout the project.
            </p>
          </div>
          <div className="relative h-64 sm:h-72 lg:h-auto lg:min-h-[460px]" data-animate="slide-left">
            <Image src="/images/welder-hull.jpg" alt="Welder working on a yacht hull in dry dock" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-bg0/10" />
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* HERITAGE RESTORATION */}
      <section className="bg-bg0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 sm:h-72 lg:h-auto lg:min-h-[460px]" data-animate="slide-right">
            <Image src="/images/classic-restoration.jpg" alt="Craftsmen restoring traditional timber planking on a classic yacht" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-bg0/20" />
          </div>
          <div className="px-8 py-16 lg:px-14 lg:py-20 flex flex-col justify-center" data-animate="slide-left">
            <SectionLabel>Classic Yachts</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Preserving heritage, faithfully
            </h2>
            <p className="text-muted leading-relaxed mb-5">
              Some projects demand more than technical competence. The restoration of a classic yacht carries a responsibility to honour the original design intent, the craftsmanship of a previous era, and the vessel&apos;s place in maritime history. We approach these projects with the respect they deserve.
            </p>
            <p className="text-muted leading-relaxed mb-5">
              Whether working with traditional timber construction, period-correct hardware, or sympathetic upgrades to mechanical and electrical systems, our team understands the balance between preservation and practical seaworthiness. The goal is always a vessel that sails as beautifully as she looks, faithful to her heritage but ready for the sea.
            </p>
            <p className="text-muted leading-relaxed">
              We work closely with specialist yards, skilled shipwrights and conservation-minded designers to ensure that every decision, from material selection to structural approach, is made with the vessel&apos;s legacy in mind.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* FAQ - hidden visually, kept for JSON-LD SEO */}
      <section className="sr-only">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                How do you select the right refit yard?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Yard selection is based on the vessel type, scope of work, geographic preference, yard capabilities, and track record. We assess multiple yards against these criteria, manage the tendering process, and recommend the option that best serves the owner&apos;s interests.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What is the typical scope of refit project management?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Our involvement covers the full lifecycle of a refit, from initial survey and scope definition through yard selection, budget planning, daily on-site oversight, quality control, and contractor coordination, through to sea trials and formal handover.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                How do you manage refit budgets and timelines?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                We provide detailed cost tracking from the outset, with regular reporting to the owner, structured change order management, milestone-based payments, and proactive identification of schedule risks. Full financial transparency is maintained throughout.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                Can you manage a refit at any shipyard worldwide?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Yes. We have delivered 25 large yacht refit projects across 7 countries and have established relationships with yards in the Mediterranean, Northern Europe, the UK, and beyond. Our team can deploy to any yard worldwide.
              </div>
            </details>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* CLASSIC RACING IMAGE */}
      <section className="py-20 bg-bg1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded overflow-hidden shadow-2xl shadow-black/40" data-animate="scale-in">
            <Image
              src="/images/classic-racing.jpg"
              alt="Classic yacht racing under full sail"
              width={1800}
              height={1200}
              className="w-full h-auto"
            />
          </div>
          <p className="text-center text-sm text-muted mt-6">
            Built to last. Built to race. Ready for whatever comes next.
          </p>
        </div>
      </section>

      <HorizonLine />

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/shipyard-2.jpg" alt="" fill sizes="100vw" className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-bg0/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Work With Us</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-5">Ready to begin your refit?</h2>
          <p className="text-muted leading-relaxed text-base mb-8 max-w-xl mx-auto">
            From a focused pre-season programme to a multi-year restoration, we provide the planning, oversight, and project management required to deliver on time and on budget.
          </p>
          <ButtonPrimary href="/contact">Get in touch</ButtonPrimary>
        </div>
      </section>
    </>
  );
}
