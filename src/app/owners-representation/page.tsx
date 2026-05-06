"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HorizonLine, SectionLabel, ButtonPrimary, ServiceCard } from "@/components/ui";

const process = [
  { step: "01", title: "Concept & Specification", timeframe: "3 to 12 months", description: "Collaborative development of the project brief with the owner and design team. Reviewing initial concepts, establishing technical parameters, and defining the scope that will govern the entire build." },
  { step: "02", title: "Yard Selection & Contract", timeframe: "1 to 3 months", description: "Systematic evaluation of shipyards against capability, track record, capacity, and commercial terms. Supporting contract negotiation to ensure the owner's position is properly protected." },
  { step: "03", title: "Build Oversight", timeframe: "12 to 48 months", description: "Continuous on-site presence throughout the construction period. Attendance at production meetings, milestone inspections, financial tracking, and structured reporting to the owner." },
  { step: "04", title: "Sea Trials & Delivery", timeframe: "1 to 3 months", description: "Coordination of sea trials, commissioning of all onboard systems, management of handover documentation, and formal acceptance on behalf of the owner." },
  { step: "05", title: "Warranty Period", timeframe: "12 to 24 months", description: "Continued involvement post-delivery to monitor defect rectification, manage claims against the shipyard, and ensure all contractual obligations are fulfilled." },
];

const fiveQuestions = [
  { q: "What other revenue do you earn from this transaction?", a: "Yard commissions, broker referral fees, supplier kickbacks, or a management contract that activates on delivery all bend the advice you receive. None are illegal. All are worth knowing about." },
  { q: "Are you SYBAss accredited and on the YORR register?", a: "Accreditation does not guarantee good judgement, but it confirms the firm has been vetted against an industry standard and operates under a code of conduct." },
  { q: "Who on your team will actually be on-site at the yard?", a: "The person at the pitch is sometimes not the person who runs the project. Get names, CVs, and the on-site presence model in writing." },
  { q: "How is your fee structured?", a: "A fixed-scope fee, paid by the owner, that does not move with the build cost is the only structure that aligns incentives properly. Anything else is independence in name only." },
  { q: "Can I speak to the owners of three recent projects?", a: "Reference calls are the single best test of quality. Anyone worth engaging will provide them without hesitation." },
];

export default function OwnersRepresentationPage() {
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
              "@type": "ProfessionalService",
              "@id": "https://forelandmarine.com/owners-representation#service",
              name: "Yacht Owner's Representation",
              alternateName: ["Yacht Owner's Representative", "Superyacht Owner's Representation", "Independent Owner's Representative", "New Build Owner's Representation"],
              serviceType: "Yacht Owner's Representation",
              provider: {
                "@type": "Organization",
                name: "Foreland Marine Consultancy Ltd",
                url: "https://forelandmarine.com",
                logo: "https://forelandmarine.com/logos/foreland-marine-white.svg",
              },
              areaServed: "Worldwide",
              audience: {
                "@type": "Audience",
                audienceType: "Yacht Owners, First-Time Superyacht Buyers, Family Offices",
              },
              description:
                "Independent yacht owner's representation for new builds and refits, 24 to 60 metres. SYBAss accredited, YORR registered. No yard commissions, no broker referral fees, no supplier kickbacks. Fee paid by the owner only.",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is a yacht owner's representative?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A yacht owner's representative is an independent professional who acts solely for the owner during a new build or major refit. The role covers yard selection, contract negotiation, on-site build supervision, quality control, budget oversight, sea trials, delivery, and warranty management. The defining feature is independence: a genuine owner's representative receives no commissions from yards, brokers, or suppliers and is paid only by the owner.",
                  },
                },
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
                  name: "What does an independent owner's representative cost?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Full-service new build representation typically runs at one to three percent of the contract value, scoped at the start and not linked to the final build cost. Refit representation is usually quoted as a fixed monthly fee against the agreed project duration. The fee should never be a percentage of the final cost: that structure quietly rewards the representative when costs grow.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the difference between an owner's representative, a project manager, and a broker?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A broker finds the yacht or the yard and is paid by commission. A project manager runs the build on the ground, often employed by the yard, and delivers against the contract that exists. An owner's representative sits on the buyer's side from the start, reviews the deal before it is signed, supervises the build against that deal, and handles the warranty period.",
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
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://forelandmarine.com" },
                { "@type": "ListItem", position: 2, name: "Owner's Representation", item: "https://forelandmarine.com/owners-representation" },
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
          <Image src="/images/shipyard-launch.jpg" alt="Yacht hull under construction in shipyard" fill sizes="100vw" className="object-cover object-[90%_center] opacity-55 saturate-[1.15] scale-110" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/35 via-bg0/15 to-bg0" />
        </div>
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <div className="flex items-start justify-between gap-8">
            <div className="max-w-3xl">
              <SectionLabel>Owner&apos;s Representation</SectionLabel>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                Your owner&apos;s representative,<br />every step of the way
              </h1>
              <p className="text-lg text-[#8FBAD4] leading-relaxed max-w-2xl">
                Accredited by the Superyacht Builders Association (SYBAss), we provide independent owner&apos;s representation and build management for sailing and motor yacht new builds from 24 to 60 metres, with particular expertise in performance sailing yachts and carbon composite construction. A new build is among the most significant undertakings in yacht ownership, and we ensure the process is managed with the same care and precision as the vessel itself.
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

      {/* THREE ROLES (NEW) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10" data-animate="fade-up">
            <SectionLabel>Three roles, often confused</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Owner&apos;s representative, project manager, broker
            </h2>
            <p className="text-muted leading-relaxed">
              These three roles get conflated in the superyacht industry. They are not the same.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-animate-stagger>
            <ServiceCard data-animate="fade-up" title="Broker" description="Finds the yacht or the yard. Paid by commission, usually 5 to 10 percent of the deal. Their incentive is to close. That can align with the buyer. It can also not." />
            <ServiceCard data-animate="fade-up" title="Project manager" description="Runs the build on the ground. Usually employed by the yard or contractor. Their incentive is to deliver against the contract that exists, not to challenge whether it is the right one." />
            <ServiceCard data-animate="fade-up" title="Owner's representative" description="Sits on the buyer's side from the start. Reviews the deal before it is signed, supervises the build against that deal, and handles the warranty period. Independent, owner-paid, no commissions." />
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
            <ServiceCard data-animate="fade-up" title="Technical Review" description="Independent inspection of hull construction, structural work, systems installation, and outfitting quality, supported by our naval architects, engineers, and coatings specialists. For sailing yachts, this extends to rig specification, sail plan review, and deck hardware selection." />
            <ServiceCard data-animate="fade-up" title="Crew & Commissioning" description="Crew recruitment and employment administration during the build phase, followed by coordination of sea trials, systems commissioning, and formal handover." />
            <ServiceCard data-animate="fade-up" title="Warranty Management" description="Post-delivery oversight including defect tracking, claims management, and continued liaison with the shipyard throughout the warranty period." />
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* FEE STRUCTURE (NEW) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4" data-animate="fade-up">
              <SectionLabel>What it costs</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white leading-tight">
                The fee question
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-5" data-animate="fade-up">
              <div className="border border-accent/30 bg-bg1 p-6">
                <p className="text-xs text-accent uppercase tracking-widest mb-3">Rule of thumb</p>
                <p className="text-muted leading-relaxed mb-3">
                  Full new build representation typically runs at <span className="text-white font-semibold">one to three percent of the contract value</span>, scoped at the start and not linked to the final cost.
                </p>
                <p className="text-muted leading-relaxed">
                  Refit representation is usually a <span className="text-white font-semibold">fixed monthly fee</span> against the agreed project duration.
                </p>
              </div>
              <p className="text-muted leading-relaxed">
                Two structures should give an owner pause. Any percentage-of-final-cost fee quietly rewards the representative when costs grow. Any fee bundled with brokerage or yard introduction commissions is independence in name only. Foreland&apos;s fee is fixed, owner-paid, and unchanged whether the build comes in on or over budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* FIVE QUESTIONS (NEW) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10" data-animate="fade-up">
            <SectionLabel>Diligence</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Five questions to ask any prospective owner&apos;s representative
            </h2>
            <p className="text-muted leading-relaxed">
              Whether the candidate is Foreland Marine or anyone else, these five questions surface most of what an owner needs to know before signing an engagement letter.
            </p>
          </div>
          <div className="space-y-6" data-animate-stagger>
            {fiveQuestions.map((item, i) => (
              <div key={i} className="border-l-2 border-accent/40 pl-6" data-animate="fade-up">
                <p className="text-xs text-accent uppercase tracking-widest mb-2">Question {String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-base font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-sm text-muted leading-relaxed max-w-3xl">{item.a}</p>
              </div>
            ))}
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
                What is a yacht owner&apos;s representative?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                A yacht owner&apos;s representative is an independent professional who acts solely for the owner during a new build or major refit. The role covers yard selection, contract negotiation, on-site build supervision, quality control, budget oversight, sea trials, delivery, and warranty management. The defining feature is independence: a genuine owner&apos;s representative receives no commissions from yards, brokers, or suppliers and is paid only by the owner.
              </div>
            </details>
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
                What does an independent owner&apos;s representative cost?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Full-service new build representation typically runs at one to three percent of the contract value, scoped at the start and not linked to the final build cost. Refit representation is usually quoted as a fixed monthly fee against the agreed project duration.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What is the difference between an owner&apos;s representative, a project manager, and a broker?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                A broker finds the yacht or the yard and is paid by commission. A project manager runs the build on the ground, often employed by the yard, and delivers against the contract that exists. An owner&apos;s representative sits on the buyer&apos;s side from the start, reviews the deal before it is signed, supervises the build against that deal, and handles the warranty period.
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

      {/* RELATED SERVICES & FURTHER READING */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-muted">
          Related: <Link href="/refit" className="text-accent hover:text-white transition-colors">Refit Project Management</Link> · <Link href="/technical-consultancy" className="text-accent hover:text-white transition-colors">Technical Consultancy</Link> · <Link href="/yacht-management" className="text-accent hover:text-white transition-colors">Yacht Management</Link>
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <p className="text-xs text-muted/60 uppercase tracking-widest mb-3">Further Reading</p>
        <div className="flex flex-col gap-2">
          <Link href="/insights/what-is-a-yacht-owners-representative" className="text-sm text-accent hover:text-white transition-colors">What is a Yacht Owner&apos;s Representative and Why Independence Matters</Link>
          <Link href="/insights/the-role-of-an-owners-representative" className="text-sm text-accent hover:text-white transition-colors">The Role of an Owner&apos;s Representative in a New Build Project</Link>
          <Link href="/insights/owner-representation-during-yard-selection" className="text-sm text-accent hover:text-white transition-colors">Owner&apos;s Representation During Yard Selection: Getting It Right from Day One</Link>
        </div>
      </div>

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/j-class-finish.jpg" alt="J Class yacht racing, built with independent owner's representation" fill sizes="100vw" className="object-cover opacity-15" />
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
