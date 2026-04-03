"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HorizonLine, SectionLabel, ButtonPrimary, ServiceCard } from "@/components/ui";

const process = [
  { step: "01", title: "Concept & Specification", timeframe: "3 to 12 months", description: "Collaborative development of the project brief with the owner and design team. Reviewing initial concepts, establishing technical parameters, and defining the scope that will govern the entire build." },
  { step: "02", title: "Yard Selection & Contract", timeframe: "1 to 3 months", description: "Systematic evaluation of shipyards against capability, track record, capacity, and commercial terms. Supporting contract negotiation to ensure the owner's position is properly protected." },
  { step: "03", title: "Build Oversight", timeframe: "12 to 48 months", description: "Continuous on-site presence throughout the construction period. Attendance at production meetings, milestone inspections, financial tracking, and structured reporting to the owner." },
  { step: "04", title: "Sea Trials & Delivery", timeframe: "1 to 3 months", description: "Coordination of sea trials, commissioning of all onboard systems, management of handover documentation, and formal acceptance on behalf of the owner." },
  { step: "05", title: "Warranty Period", timeframe: "12 to 24 months", description: "Continued involvement post-delivery to monitor defect rectification, manage claims against the shipyard, and ensure all contractual obligations are fulfilled." },
];

export default function NewBuildPage() {
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
              serviceType: "New Build Owner's Representation",
              provider: {
                "@type": "Organization",
                name: "Foreland Marine Consultancy Ltd",
              },
              areaServed: "Worldwide",
              description:
                "Owner's representation and build management for new yacht projects. Accredited by SYBAss. Foreland Marine.",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What does an Owner's Representative do during a new build?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "An Owner's Representative provides independent oversight of the entire new build process. This includes budget control and cost tracking, quality assurance inspections, schedule monitoring, and representing the owner's interests at the shipyard during production meetings, milestone reviews, and contractual discussions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "When should I appoint an Owner's Representative?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "As early as possible, ideally before signing a Letter of Intent or selecting a shipyard. Early involvement allows the representative to contribute to yard evaluation, contract negotiation, and specification development, ensuring the owner's position is properly protected from the outset.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What qualifications should an Owner's Representative have?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Look for accreditation by SYBAss (Superyacht Builders Association), registration on the Yacht Owner's Representative Register, and a relevant background in engineering, naval architecture, or yacht operations. Foreland's team holds all of these credentials alongside extensive practical shipyard experience.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How long does a typical new build project take?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Timelines vary by size and complexity, but a new build yacht over 30 metres typically takes 18 to 36 months from contract signing to delivery. Larger or more complex projects can extend beyond this, particularly where custom engineering or bespoke interior design is involved.",
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
          <Image src="/images/shipyard-launch.jpg" alt="" fill sizes="100vw" className="object-cover object-[90%_center] opacity-55 saturate-[1.15] scale-110" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/35 via-bg0/15 to-bg0" />
        </div>
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <div className="flex items-start justify-between gap-8">
            <div className="max-w-3xl">
              <SectionLabel>New Build</SectionLabel>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                Your interests, every<br />step of the way
              </h1>
              <p className="text-lg text-[#8FBAD4] leading-relaxed max-w-2xl">
                Accredited by the Superyacht Builders Association (SYBAss), we provide independent owner&apos;s representation and build management for new yacht projects worldwide. A new build is among the most significant undertakings in yacht ownership, and we ensure the process is managed with the same care and precision as the vessel itself.
              </p>
            </div>
            <div className="hidden lg:flex flex-col items-center gap-6 flex-shrink-0 mt-[50px] relative z-20">
              <Image src="/logos/sybass-white.png" alt="SYBAss accredited" width={240} height={73} />
              <Image src="/logos/yacht-owners-register-white.png" alt="Yacht Owner's Representative Register" width={240} height={96} />
            </div>
          </div>
        </div>
      </section>

      {/* OUR ROLE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl" data-animate="fade-up">
            <SectionLabel>Our Role</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Independent representation at every stage
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8" data-animate-stagger>
            <div className="border-l-2 border-accent/40 pl-6" data-animate="fade-up">
              <p className="text-muted leading-relaxed">
                A new build is one of the most significant undertakings in yacht ownership, and shipyards naturally operate in their own commercial interest. We provide continuous, independent oversight throughout the build, ensuring the owner&apos;s requirements are upheld from contract through to sea trials and delivery.
              </p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6" data-animate="fade-up">
              <p className="text-muted leading-relaxed">
                We count Captains, unlimited Chief Engineers, Surveyors and Naval Architects amongst our ranks, each with extensive build management experience across leading European and global shipyards. Their judgement is grounded in hands-on project delivery, not theory.
              </p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6" data-animate="fade-up">
              <p className="text-muted leading-relaxed">
                Foreland is entirely independent. We hold no yard affiliations, receive no commissions from shipyards or suppliers, and accept no referral fees. Every recommendation we make serves one interest alone: the owner.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <ButtonPrimary href="/contact">Discuss your project</ButtonPrimary>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* ACCREDITATION & CODE OF CONDUCT */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div data-animate="slide-right">
              <SectionLabel>Accreditation</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">
                Qualified Owner&apos;s Representatives
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                Our team holds the Yacht Owner&apos;s Representative qualification, formally recognised by SYBAss member shipyards as the standard for owner&apos;s representation during new build projects. This accreditation ensures that our representatives have the technical competence and professional standing expected by the world&apos;s leading yards.
              </p>
              <p className="text-muted leading-relaxed mb-5">
                The role of the Owner&apos;s Representative is to act as an independent advocate for the owner throughout the build process - monitoring progress, verifying quality, reviewing costs, and ensuring the shipyard delivers to the agreed specification. It is a position of trust, sitting between the owner and the yard, and requires both deep technical knowledge and commercial judgement.
              </p>
              <p className="text-muted leading-relaxed">
                Foreland Marine Consultancy is also a member of British Marine and Superyacht UK, reinforcing our commitment to the highest standards in the industry and championing British businesses.
              </p>
            </div>
            <div data-animate="slide-left">
              <h3 className="text-lg font-light text-white mb-5">Code of Conduct</h3>
              <p className="text-muted leading-relaxed text-sm mb-6">
                As registered Owner&apos;s Representatives, we adhere to the Yacht Owner&apos;s Representative Register Code of Conduct. Its core principles:
              </p>
              <div className="space-y-4">
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">Integrity &amp; Objectivity</h4>
                  <p className="text-sm text-muted leading-relaxed">Act with honesty, fairness and objectivity. Present objective facts, avoid speculation, and seek balanced agreements.</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">Competence &amp; Expertise</h4>
                  <p className="text-sm text-muted leading-relaxed">Full disclosure of qualifications and experience. Recognise the limits of expertise and seek additional support when required.</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">Owner&apos;s Interest</h4>
                  <p className="text-sm text-muted leading-relaxed">Protect the best interests of the owner while dealing fairly with all parties. Respect the industry ideal of completing and delivering yachts.</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">No Conflicts of Interest</h4>
                  <p className="text-sm text-muted leading-relaxed">Disclose known or potential conflicts. No commissions from multiple sources without full disclosure. No bribes or facilitation payments.</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">Respectful Collaboration</h4>
                  <p className="text-sm text-muted leading-relaxed">Optimise collaboration between all parties and resolve disputes professionally. Treat everyone with respect and courtesy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* PROCESS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">The stages of a new build</h2>
          <p className="text-muted leading-relaxed mb-14">
            Each project follows its own course, but the underlying framework remains consistent. We apply structured oversight at every phase, allowing the owner to focus on the decisions that shape the vessel.
          </p>
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-0" data-animate-stagger>
            {process.map((p, i) => (
              <div key={p.step} className="flex gap-6 items-stretch" data-animate="fade-up">
                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-accent/40 text-accent text-sm font-semibold">
                    {p.step}
                  </div>
                  {i < process.length - 1 && <div className="w-px flex-1 bg-accent/20 my-2" />}
                </div>
                <div className="pb-10">
                  <h3 className="text-base font-semibold text-white mb-1">{p.title}</h3>
                  <p className="text-xs text-accent uppercase tracking-widest mb-2">{p.timeframe}</p>
                  <p className="text-sm text-muted leading-relaxed max-w-lg">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* SERVICES */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12" data-animate="fade-up">
            <SectionLabel>What We Cover</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white">Scope of our involvement</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8" data-animate-stagger>
            <ServiceCard data-animate="fade-up" title="On-Site Representation" description="Daily presence at the shipyard throughout the build period, attending production meetings, conducting inspections, and providing structured progress reports." />
            <ServiceCard data-animate="fade-up" title="Budget & Cost Control" description="Monitoring expenditure against budget, verifying milestone payment claims, reviewing change orders, and identifying cost risks at the earliest opportunity." />
            <ServiceCard data-animate="fade-up" title="Project Coordination" description="Managing communication between the owner, shipyard, design offices, subcontractors, and classification society to maintain alignment on scope, schedule, and quality." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-animate-stagger>
            <ServiceCard data-animate="fade-up" title="Technical Review" description="Independent inspection of hull construction, structural work, systems installation, and outfitting quality, supported by our naval architects, engineers, and coatings specialists." />
            <ServiceCard data-animate="fade-up" title="Crew & Commissioning" description="Crew recruitment and employment administration during the build phase, followed by coordination of sea trials, systems commissioning, and formal handover." />
            <ServiceCard data-animate="fade-up" title="Warranty Management" description="Post-delivery oversight including defect tracking, claims management, and continued liaison with the shipyard throughout the warranty period." />
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
                What does an Owner&apos;s Representative do during a new build?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                An Owner&apos;s Representative provides independent oversight of the entire new build process. This includes budget control and cost tracking, quality assurance inspections, schedule monitoring, and representing the owner&apos;s interests at the shipyard during production meetings, milestone reviews, and contractual discussions.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                When should I appoint an Owner&apos;s Representative?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                As early as possible, ideally before signing a Letter of Intent or selecting a shipyard. Early involvement allows the representative to contribute to yard evaluation, contract negotiation, and specification development, ensuring the owner&apos;s position is properly protected from the outset.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What qualifications should an Owner&apos;s Representative have?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Look for accreditation by SYBAss (Superyacht Builders Association), registration on the Yacht Owner&apos;s Representative Register, and a relevant background in engineering, naval architecture, or yacht operations. Foreland&apos;s team holds all of these credentials alongside extensive practical shipyard experience.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                How long does a typical new build project take?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Timelines vary by size and complexity, but a new build yacht over 30 metres typically takes 18 to 36 months from contract signing to delivery. Larger or more complex projects can extend beyond this, particularly where custom engineering or bespoke interior design is involved.
              </div>
            </details>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/j-class-finish.jpg" alt="" fill sizes="100vw" className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-bg0/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Start Your Project</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-5">Engage at any stage</h2>
          <p className="text-muted leading-relaxed text-base mb-8 max-w-xl mx-auto">
            Whether the project is at concept stage or construction is already underway, our team can integrate at any point and contribute from the outset.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonPrimary href="/contact">Get in touch</ButtonPrimary>
          </div>
        </div>
      </section>
    </>
  );
}
