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
              "@type": "ProfessionalService",
              "@id": "https://www.forelandmarine.com/owners-representation#service",
              name: "Yacht Owner's Representation",
              alternateName: [
                "Yacht Owners Representation",
                "Superyacht Representation",
                "Superyacht Owner's Representation",
                "Yacht New Build",
                "Yacht New Build Project Management",
                "New Build Owner's Representation",
                "Independent Owner's Representative",
                "Yacht Owner's Representative",
              ],
              serviceType: "Yacht Owner's Representation",
              provider: {
                "@type": "Organization",
                name: "Foreland Marine Consultancy Ltd",
                memberOf: [
                  {
                    "@type": "Organization",
                    name: "Yacht Owner's Representative Register",
                    alternateName: "YORR",
                    url: "https://superyachtalliance.org/register/register-table/",
                    sameAs: "https://superyachtalliance.org/register/register-table/",
                  },
                  {
                    "@type": "Organization",
                    name: "Superyacht Builders Association",
                    alternateName: "SYBAss",
                    url: "https://www.sybass.org",
                  },
                ],
                hasCredential: {
                  "@type": "EducationalOccupationalCredential",
                  name: "Yacht Owner's Representative",
                  credentialCategory: "Professional Registration",
                  recognizedBy: {
                    "@type": "Organization",
                    name: "Yacht Owner's Representative Register",
                    url: "https://superyachtalliance.org/register/register-table/",
                  },
                  url: "https://superyachtalliance.org/register/register-table/",
                },
              },
              areaServed: "Worldwide",
              description:
                "Independent yacht owner's representation and superyacht representation for yacht new build and refit, 24 to 60 metres. SYBAss accredited, YORR registered. No yard commissions, no broker referral fees, no supplier kickbacks. Fee paid by the owner only.",
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
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.forelandmarine.com" },
                { "@type": "ListItem", position: 2, name: "New Build", item: "https://www.forelandmarine.com/owners-representation" },
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
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/70 via-bg0/40 to-bg0" />
        </div>
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <div className="flex items-start justify-between gap-8">
            <div className="max-w-3xl">
              <SectionLabel>New Build</SectionLabel>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                Your owner&apos;s representative,<br />every step of the way
              </h1>
              <p className="text-lg text-[#8FBAD4] leading-relaxed max-w-2xl">
                Independent owner&apos;s representation and build management for sailing and motor yacht new builds from 24 to 60 metres. Our consultancy bench draws on unlimited Chief Engineers, Master Mariner captains, naval architects, surveyors, members from commercial shipping, and America&apos;s Cup and SailGP sailors, with particular depth in performance sailing yachts and carbon composite construction.
              </p>
            </div>
            <div className="hidden lg:flex flex-col items-center gap-6 flex-shrink-0 mt-[50px] relative z-20">
              <Image src="/logos/sybass-white.png" alt="SYBAss accredited" width={240} height={73} />
              <a
                href="https://superyachtalliance.org/register/register-table/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Foreland Marine on the Yacht Owner's Representative Register"
                className="transition-opacity hover:opacity-80"
              >
                <Image src="/logos/yacht-owners-register-white.png" alt="Yacht Owner's Representative Register" width={240} height={96} />
              </a>
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
                We count Captains, unlimited Chief Engineers, Surveyors and Naval Architects amongst our ranks, each with extensive build management experience across the world&apos;s leading shipyards, including Royal Huisman, Pendennis Falmouth, Pendennis Vilanova, Newport Shipyard, Lyman Morse, Rockport Marine, Hinckley Yachts and Markos. Their judgement is grounded in hands-on project delivery, not theory.
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

      {/* THE TEAM */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div data-animate="slide-right">
              <SectionLabel>The Team</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">
                Depth of experience across every discipline
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                Foreland&apos;s consultancy team is drawn from the most senior practitioners in the industry. Chief Engineers hold unlimited tickets, the highest engineering qualification at sea. Captains operate to Master Mariner level, having commanded yachts and commercial vessels in every ocean.
              </p>
              <p className="text-muted leading-relaxed mb-5">
                The technical bench is built around naval architects, surveyors, and coatings specialists with decades of yard-side experience. Colleagues from commercial shipping bring the contractual rigour and schedule discipline of regulated tonnage, and our sailing strength includes America&apos;s Cup and SailGP campaigners with first-hand knowledge of rig design, sail plans, and on-water performance.
              </p>
              <p className="text-muted leading-relaxed mb-5">
                This breadth means every project is covered by people who have done the work themselves. When a question arises on the yard floor, on a sea trial, or during a contractual review, the answer comes from someone who has seen the issue before.
              </p>
              <p className="text-muted/80 leading-relaxed text-sm">
                The team is SYBAss accredited and registered on the{" "}
                <a
                  href="https://superyachtalliance.org/register/register-table/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-white transition-colors"
                >
                  Yacht Owner&apos;s Representative Register
                </a>
                , with membership of British Marine and Superyacht UK.
              </p>
            </div>
            <div data-animate="slide-left">
              <h3 className="text-lg font-light text-white mb-5">Disciplines on the consultancy bench</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">Engineering</h4>
                  <p className="text-sm text-muted leading-relaxed">Unlimited Chief Engineers with hands-on experience of new build, conversion, and refit projects across yachts and commercial tonnage.</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">Command</h4>
                  <p className="text-sm text-muted leading-relaxed">Senior Captains to Master Mariner level, bringing operational understanding of the vessels we are helping owners build.</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">Naval Architecture &amp; Survey</h4>
                  <p className="text-sm text-muted leading-relaxed">Independent inspection of structure, systems and outfitting, supported by chartered surveyors, naval architects and coatings specialists.</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">Commercial Shipping</h4>
                  <p className="text-sm text-muted leading-relaxed">Members from commercial backgrounds applying the contractual discipline and schedule rigour of regulated shipping to private projects.</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">Performance Sailing</h4>
                  <p className="text-sm text-muted leading-relaxed">America&apos;s Cup and SailGP sailors contributing to rig specification, sail plan review, and on-water performance evaluation.</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">Yard Operations</h4>
                  <p className="text-sm text-muted leading-relaxed">Project managers with delivery experience across leading European and US shipyards including Royal Huisman, Pendennis, Newport Shipyard, Lyman Morse, Rockport Marine and Hinckley Yachts, with particular depth in J Class and carbon composite programmes.</p>
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
            <ServiceCard data-animate="fade-up" title="Project Coordination" description="Managing communication between the owner, shipyard, design offices, subcontractors, and classification societies (Lloyd's Register, RINA, DNV, Bureau Veritas, ABS) to maintain alignment on scope, schedule, and quality." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-animate-stagger>
            <ServiceCard data-animate="fade-up" title="Technical Review" description="Independent inspection of hull construction, structural work, systems installation, and outfitting quality, supported by our naval architects, engineers, and coatings specialists. For sailing yachts, this extends to rig specification, sail plan review, and deck hardware selection." />
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
                An Owner&apos;s Representative provides independent oversight of the entire new build process. This includes budget control and cost tracking, quality assurance inspections, schedule monitoring, and representing the owner&apos;s interests at the shipyard during production meetings, milestone reviews, and contractual discussions. For a fuller account, see <Link href="/insights/what-is-a-yacht-owners-representative" className="text-accent hover:text-white transition-colors underline underline-offset-2">what a yacht owner&apos;s representative does</Link>.
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

      {/* ACCREDITATION VERIFY */}
      <section className="py-12 sm:py-14 bg-bg0">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="border border-white/8 bg-bg1 p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center gap-8 flex-shrink-0">
              <Image src="/logos/sybass-white.png" alt="SYBAss accredited" width={140} height={42} />
              <Image src="/logos/yacht-owners-register-white.png" alt="Yacht Owner's Representative Register" width={140} height={56} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-lg font-light text-white mb-2">Accredited and on the public register</h2>
              <p className="text-sm text-muted leading-relaxed mb-4">
                Foreland Marine is accredited by the Superyacht Builders Association (SYBAss) and listed on the Yacht Owner&apos;s Representative Register, maintained by the Superyacht Alliance. Owners are welcome to verify our standing directly.
              </p>
              <a
                href="https://superyachtalliance.org/register/register-table/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-white transition-colors"
              >
                Visit the Yacht Owner&apos;s Representative Register
                <span aria-hidden="true">→</span>
              </a>
            </div>
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
