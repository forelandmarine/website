"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
              "@id": "https://www.forelandmarine.com/refit#service",
              name: "Yacht Refit Management",
              alternateName: [
                "Yacht Refit Project Management",
                "Superyacht Refit Management",
                "Independent Yacht Refit Management",
                "Sailing Yacht Refit Management",
                "Motor Yacht Refit Management",
              ],
              serviceType: "Yacht Refit Management",
              provider: {
                "@type": "Organization",
                name: "Foreland Marine Consultancy Ltd",
              },
              areaServed: "Worldwide",
              description:
                "Independent yacht refit management for motor and sailing yachts over 24 metres. 25 large yacht refit projects across 7 countries, from high-profile racing programmes to in-depth motor yacht rebuilds. SYBAss accredited.",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is yacht refit project management?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yacht refit project management is the independent oversight of a refit on behalf of the owner. The project manager is present at the yard throughout the works, monitors progress, controls budget, manages change orders, coordinates classification and flag surveys, and reports to the owner. The role is separate from the yard's own project staff, who represent the yard's commercial interest.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How much does yacht refit project management cost?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Independent project management on a typical 30 to 50 metre refit ranges from 3 to 8 percent of total refit value, depending on scope, yacht complexity, and yard location. On a £2 million refit this represents £60,000 to £160,000. The cost is routinely outweighed by cost savings achieved through competitive tendering, supplier negotiation, and change order discipline, which commonly save 10 to 20 percent on the gross refit budget.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do you select the right refit yard?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yard selection is based on vessel type, scope of work, geographic preference, capabilities, and track record. We assess multiple yards against these criteria, manage the tendering process across northern European, Mediterranean, and lower-cost options, and recommend the option that best serves the owner's interests, not the option that pays the largest referral fee, because we do not accept referral fees from yards.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the typical scope of refit project management?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our involvement covers the full lifecycle: initial condition survey, scope and specification development, yard selection and tendering, contract negotiation, daily on-site oversight, budget and cost control, quality assurance, classification and flag coordination, sea trials, and formal handover. Owners can also engage us for individual stages if a refit is already in progress.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How long does a typical superyacht refit take?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A routine maintenance haul-out runs two to four weeks. A standard winter refit runs eight to sixteen weeks. A mid-life refit with paint and machinery work runs three to six months. A major refit with structural and interior scope runs six to twelve months. A full rebuild on a yacht over 50 metres can extend to eighteen to twenty-four months.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do you manage refit budgets and timelines?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Detailed cost tracking from day one, with monthly reporting to the owner, structured change order management, milestone-based payments, and proactive identification of schedule risks. We tender all variations to multiple suppliers where time allows. Full financial transparency is maintained throughout, with the owner able to see line-item expenditure at any time.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can you manage a refit at any shipyard worldwide?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. We have delivered 25 large yacht refit projects across 7 countries, with established working relationships at yards across the Mediterranean (MB92 Barcelona, STP Palma, Monaco Marine, Lusben Viareggio), northern Europe (Pendennis, Lürssen Wadden, Vitters, Royal Huisman), the UK (Pendennis, Berthon), the Caribbean and the US. Our team deploys to any yard.",
                  },
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.forelandmarine.com" },
                { "@type": "ListItem", position: 2, name: "Refit", item: "https://www.forelandmarine.com/refit" },
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
          <Image src="/images/refit-yard.jpg" alt="Sailing yacht in refit yard" fill sizes="100vw" className="object-cover opacity-55 saturate-[1.15] scale-110" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/35 via-bg0/15 to-bg0" />
        </div>
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <div className="max-w-3xl">
            <SectionLabel>Refit Project Management</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Superyacht refit,<br />managed with rigour
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

      {/* FAQ */}
      <section className="py-20 bg-bg0">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-10">Frequently asked questions</h2>
          <div className="space-y-4">
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What is yacht refit project management?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Yacht refit project management is the independent oversight of a refit on behalf of the owner. The project manager is present at the yard throughout the works, monitors progress, controls budget, manages change orders, coordinates classification and flag surveys, and reports to the owner. The role is separate from the yard&apos;s own project staff, who represent the yard&apos;s commercial interest.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                How much does yacht refit project management cost?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Independent project management on a typical 30 to 50 metre refit ranges from 3 to 8 percent of total refit value, depending on scope, yacht complexity, and yard location. On a £2 million refit this represents £60,000 to £160,000. The cost is routinely outweighed by cost savings achieved through competitive tendering, supplier negotiation, and change order discipline, which commonly save 10 to 20 percent on the gross refit budget. See our detailed guide to <Link href="/insights/how-much-does-a-superyacht-refit-cost" className="text-accent hover:text-white transition-colors underline underline-offset-2">superyacht refit cost</Link> for full ranges.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                How do you select the right refit yard?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Yard selection is based on vessel type, scope of work, geographic preference, capabilities, and track record. We assess multiple yards against these criteria, manage the tendering process across northern European, Mediterranean, and lower-cost options, and recommend the option that best serves the owner&apos;s interests, not the option that pays the largest referral fee, because we do not accept referral fees from yards.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What is the typical scope of refit project management?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Our involvement covers the full lifecycle: initial condition survey, scope and specification development, yard selection and tendering, contract negotiation, daily on-site oversight, budget and cost control, quality assurance, classification and flag coordination, sea trials, and formal handover. Owners can also engage us for individual stages if a refit is already in progress.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                How long does a typical superyacht refit take?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                A routine maintenance haul-out runs two to four weeks. A standard winter refit runs eight to sixteen weeks. A mid-life refit with paint and machinery work runs three to six months. A major refit with structural and interior scope runs six to twelve months. A full rebuild on a yacht over 50 metres can extend to eighteen to twenty-four months.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                How do you manage refit budgets and timelines?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Detailed cost tracking from day one, with monthly reporting to the owner, structured change order management, milestone-based payments, and proactive identification of schedule risks. We tender all variations to multiple suppliers where time allows. Full financial transparency is maintained throughout, with the owner able to see line-item expenditure at any time.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                Can you manage a refit at any shipyard worldwide?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Yes. We have delivered 25 large yacht refit projects across 7 countries, with established working relationships at yards across the Mediterranean (MB92 Barcelona, STP Palma, Monaco Marine, Lusben Viareggio), northern Europe (Pendennis, Lürssen Wadden, Vitters, Royal Huisman), the UK (Pendennis, Berthon), the Caribbean and the US. Our team deploys to any yard.
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

      {/* RELATED SERVICES & FURTHER READING */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-muted">
          Related: <Link href="/owners-representation" className="text-accent hover:text-white transition-colors">New Build</Link> · <Link href="/technical-consultancy" className="text-accent hover:text-white transition-colors">Technical Consultancy</Link> · <Link href="/yacht-management" className="text-accent hover:text-white transition-colors">Yacht Management</Link>
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <p className="text-xs text-muted/60 uppercase tracking-widest mb-3">Further Reading</p>
        <div className="flex flex-col gap-2">
          <Link href="/insights/refit-project-management-what-to-expect" className="text-sm text-accent hover:text-white transition-colors">Refit Project Management: What to Expect from Planning to Sea Trials</Link>
          <Link href="/insights/how-much-does-a-superyacht-refit-cost" className="text-sm text-accent hover:text-white transition-colors">How Much Does a Superyacht Refit Cost?</Link>
          <Link href="/insights/refit-for-performance-upgrading-a-racing-programme" className="text-sm text-accent hover:text-white transition-colors">Refit for Performance: Upgrading an Ageing Racing Programme</Link>
        </div>
      </div>

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/shipyard-2.jpg" alt="Shipyard with yachts in dry dock" fill sizes="100vw" className="object-cover opacity-15" />
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
