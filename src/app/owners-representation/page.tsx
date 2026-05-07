"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HorizonLine, SectionLabel, ButtonPrimary, ServiceCard } from "@/components/ui";

const newBuildJobs = [
  { step: "01", title: "Yard selection", description: "Systematic shortlist of three to five shipyards based on capability, current order book, recent delivery quality, and financial health. The choice of yard is the single biggest determinant of build cost, quality, and timeline. We do not accept referral fees from yards, so the shortlist reflects fit to the project, not who pays for introductions." },
  { step: "02", title: "Contract negotiation", description: "Detailed review of the build contract before signature. Payment schedule tied to verifiable milestones, not calendar dates. Liquidated damages that bite. Warranty terms that survive delivery. Arbitration in a jurisdiction the owner can actually use. Specifications cross-checked against the brief, line by line." },
  { step: "03", title: "Build supervision", description: "On-site presence at major milestones throughout the build period. Attendance at production and design meetings, independent quality inspections, milestone payment verification, and structured monthly reporting to the owner. Defects log maintained by us, not the yard." },
  { step: "04", title: "Sea trials and delivery", description: "Coordination of harbour and sea trials, commissioning of every onboard system, snag list management, handover documentation, and formal acceptance on behalf of the owner. We refuse to sign off on systems that have not been demonstrated to perform to specification." },
  { step: "05", title: "Warranty period", description: "Continued involvement for the first twelve to twenty-four months after delivery. Defect tracking, warranty claim management, and continued liaison with the shipyard until every contractual obligation is closed. The warranty period is when most disputes arise, and where independent representation pays for itself many times over." },
];

const refitJobs = [
  { step: "01", title: "Scope definition and budget", description: "Translation of the owner's brief into a structured work package, with cost estimates anchored in current yard rates and material prices. We separate must-haves from wants, and we tell the owner the truth about what each item costs before any contract is signed." },
  { step: "02", title: "Yard selection", description: "Shortlist based on capacity for the planned start date, capability in the relevant disciplines (paint, carpentry, mechanical, electrical, composite), current workload, and commercial terms. Refit yards differ markedly. The wrong yard for the wrong job costs more than any saving on day rates." },
  { step: "03", title: "Refit project management", description: "On-site management of the refit through to completion. Coordination of subcontractors, class and flag liaison, change order discipline, weekly progress and cost reporting, and resolution of the inevitable surprises that surface once the vessel is opened up." },
  { step: "04", title: "Quality and acceptance", description: "Independent quality inspections at each milestone, sea trial coordination where applicable, and a structured acceptance process. We hold the yard to the agreed scope and standard, and we document everything." },
  { step: "05", title: "Cost and schedule control", description: "Continuous tracking of expenditure against budget, change order review, and forecast updates so the owner sees overruns coming long before the final invoice. The fee for our involvement does not move with the cost of the refit. That is deliberate." },
];

const fiveQuestions = [
  { q: "What other revenue do you earn from this transaction?", a: "If the answer involves yard commissions, broker referral fees, supplier kickbacks, or a management contract that activates on delivery, the advice you receive is not independent." },
  { q: "Are you SYBAss accredited and on the YORR register?", a: "These are the recognised standards for owner's representation in the superyacht industry. Accreditation does not guarantee good judgement, but it does confirm the representative has been vetted against an industry benchmark." },
  { q: "Who on your team will actually be on-site at the yard?", a: "The person you meet at the pitch is sometimes not the person who runs the project. Ask for the names, the CVs, and the on-site presence model in writing." },
  { q: "How is your fee structured?", a: "A fixed-scope fee, paid by the owner, that does not move with the build cost is the only structure that aligns the representative's incentives with the owner's. Any percentage-of-build-cost fee creates a quiet pressure to let costs grow." },
  { q: "Can I speak to the owners of three recent projects you have represented?", a: "Direct reference calls with prior clients are the single best test of quality. Any owner's representative worth engaging will provide them without hesitation." },
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
              name: "Yacht New Build Project Management",
              alternateName: ["Yacht New Build Management", "Superyacht New Build Project Management", "New Build Owner's Representation", "Yacht Owner's Representation", "Yacht Owner's Representative", "Superyacht Owner's Representative", "Independent Owner's Representative"],
              serviceType: "Yacht New Build Project Management",
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
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Owner's Representation Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "New Build Owner's Representation" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Refit Owner's Representation" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pre-purchase Survey Coordination" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Contract Negotiation Support" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Warranty Management" } },
                ],
              },
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
                    text: "A yacht owner's representative is an independent professional who acts solely for the owner during a new build or refit. The role covers yard selection, contract negotiation, on-site build supervision, quality control, budget oversight, sea trials, delivery, and warranty management. The defining feature is independence: a genuine owner's representative receives no commissions from yards, brokers, or suppliers and is paid only by the owner.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need a yacht owner's representative?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "If you are buying, building, or refitting a yacht above approximately 24 metres, the answer is almost always yes. The technical, contractual, and commercial complexity of a superyacht project is not something most owners encounter more than once or twice in a lifetime. The yard, the broker, and the suppliers all have professional teams advocating for their interests. Without an owner's representative, the owner sits opposite that table without equivalent expertise.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What does an independent owner's representative cost?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Fees vary by project size, duration, and scope of involvement, but a typical full-service new build representation runs at roughly one to three percent of the contract value, scoped at the start and not linked to the final build cost. Refit representation is usually quoted as a fixed monthly fee against the agreed project duration. The fee should never be a percentage of the final cost: that structure quietly rewards the representative when costs grow.",
                  },
                },
                {
                  "@type": "Question",
                  name: "When should I appoint an owner's representative?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "As early as possible, ideally before signing a Letter of Intent or shortlisting yards. The largest single contribution an owner's representative makes is usually in the contract and yard-selection phase, before any money has changed hands. That said, it is never too late: a representative can integrate at any stage of a build or refit, review what has already been agreed, and establish proper oversight from that point forward.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the difference between an owner's representative, a project manager, and a broker?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A broker finds the yacht or the yard and is paid by commission, usually five to ten percent of the deal. A project manager runs the build or refit on the ground, often employed by the yard or contractor, and delivers against the contract that exists. An owner's representative sits on the buyer's side from the start, reviews the deal before it is signed, supervises the build against that deal, and handles the warranty period. The three roles are not interchangeable.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What accreditations should a yacht owner's representative hold?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The two recognised credentials are SYBAss (Superyacht Builders Association) accreditation and registration on the Yacht Owner's Representative Register (YORR). SYBAss accreditation confirms the representative is recognised by member shipyards as meeting the technical and professional standard for new build oversight. YORR registration requires adherence to a formal Code of Conduct covering integrity, transparency, and conflict of interest disclosure. Foreland Marine holds both.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Why does independence matter in owner's representation?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Many firms presenting themselves as owner's representatives also operate brokerage arms, hold yard relationships that pay referral fees, or earn management contracts that activate on delivery. None of these are illegal, but all of them quietly bend the advice the owner receives. An independent owner's representative earns income only from the owner, has no financial relationship with the yard or suppliers, and can challenge any party in the project without fear of damaging a commercial relationship.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What size of yacht warrants an owner's representative?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Foreland Marine specialises in new builds and refits from 24 to 60 metres, with particular expertise in performance sailing yachts, J Class, and carbon composite construction. Below 24 metres the technical and contractual complexity may not justify full owner's representation, although contract review and yard-selection support can still be valuable. Above 60 metres the case for representation is overwhelming.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can an owner's representative work on a project that is already under construction?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. We regularly integrate into builds and refits that are already underway. The first task is to review the existing contract, specifications, and reporting structure, then assess the current state of the project. From there we establish a structured oversight and reporting framework. Late involvement is less effective than early engagement, but it is far better than continuing without representation.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How is Foreland Marine different from other yacht owner's representatives?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Foreland Marine is structurally independent: no brokerage arm, no yard affiliations, no referral fees, no preferred suppliers. The team comprises Captains, unlimited Chief Engineers, surveyors, and naval architects with hands-on shipyard experience, with particular depth in performance sailing yachts, J Class, and carbon composite construction. The fee is fixed-scope, paid by the owner, and does not move with the build cost.",
                  },
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://forelandmarine.com" },
                { "@type": "ListItem", position: 2, name: "Yacht New Build", item: "https://forelandmarine.com/owners-representation" },
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
          <Image src="/images/shipyard-1.jpg" alt="Independent yacht owner's representative on site at a superyacht shipyard" fill sizes="100vw" className="object-cover object-[60%_center] opacity-55 saturate-[1.15] scale-110" priority />
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
                Yacht new build,<br />independently managed
              </h1>
              <p className="text-lg text-[#8FBAD4] leading-relaxed max-w-2xl">
                A yacht owner&apos;s representative acts for the owner alone, end to end, on a new build or major refit. We are accredited by SYBAss and registered on the Yacht Owner&apos;s Representative Register. We hold no yard affiliations, take no broker referral fees, and accept no supplier commissions. Sailing and motor yachts, 24 to 60 metres, with particular depth in performance sailing, J Class, and carbon composite construction.
              </p>
            </div>
            <div className="hidden lg:flex flex-col items-center gap-6 flex-shrink-0 mt-[50px] relative z-20">
              <Image src="/logos/sybass-white.png" alt="SYBAss accredited" width={240} height={73} />
              <Image src="/logos/yacht-owners-register-white.png" alt="Yacht Owner's Representative Register" width={240} height={96} />
            </div>
          </div>
        </div>
      </section>

      {/* THE ROLE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4" data-animate="fade-up">
              <SectionLabel>The Role</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white leading-tight">
                What a yacht owner&apos;s representative actually does
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-5" data-animate="fade-up">
              <p className="text-muted leading-relaxed">
                A yacht owner&apos;s representative is an independent professional retained by the owner to oversee a new build or major refit from concept through to the end of the warranty period. The role is straightforward to describe and difficult to do well. It covers contract negotiation before the project starts, on-site supervision while the work is in progress, formal acceptance at delivery, and warranty management for the months that follow.
              </p>
              <p className="text-muted leading-relaxed">
                The need for the role arises from a basic asymmetry. A shipyard builds yachts every day. Most owners undertake one new build, perhaps two, in a lifetime. The yard has its lawyers, its naval architects, its project managers, and its commercial team. Without an owner&apos;s representative, the owner sits across the table from that infrastructure with no equivalent on their side.
              </p>
              <p className="text-muted leading-relaxed">
                Owner&apos;s representation closes that gap. It is not a generic project management service rebranded for yachts, and it is not a broker function with extra hours billed. It is a specific, accredited discipline with a recognised code of conduct, a defined scope of work, and an industry standard maintained by SYBAss and the YORR. The output of the work is simple: a vessel delivered to the agreed specification, on time, within budget, with the owner&apos;s position protected at every stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* INDEPENDENCE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div data-animate="slide-right">
              <SectionLabel>Independence</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">
                The single most important quality
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                Many firms describe themselves as yacht owner&apos;s representatives. Far fewer of them are structurally independent. Most operate alongside one or more of the following: a brokerage arm that earns commission on the sale, a yard relationship that pays referral fees, a management contract that activates the moment the yacht splashes, or a preferred-supplier list that returns the favour.
              </p>
              <p className="text-muted leading-relaxed mb-5">
                None of these arrangements are illegal. All of them quietly bend the advice the owner receives. When the person representing the owner has a financial relationship with the yard, the broker, or a supplier, their recommendations cannot be considered impartial, regardless of intent. The advice may still be technically correct. It is not, however, free of pressure.
              </p>
              <p className="text-muted leading-relaxed">
                Independence is what the YORR Code of Conduct exists to enforce. Foreland Marine takes no commissions from shipyards or suppliers, accepts no referral fees from brokers or designers, and runs no management contracts that depend on a particular yacht being delivered or sold. The fee for our representation is paid by the owner, scoped at the start, and does not move with the build cost.
              </p>
            </div>
            <div data-animate="slide-left">
              <h3 className="text-lg font-light text-white mb-5">A simple test</h3>
              <p className="text-muted leading-relaxed text-sm mb-6">
                If a recommendation we make would cost us money, would we still make it? The answer determines whether the advice is genuinely independent or merely presented as such. The same test, applied to any prospective owner&apos;s representative, separates the structurally independent from the rest.
              </p>
              <div className="space-y-4 mt-6">
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">No yard commissions</h4>
                  <p className="text-sm text-muted leading-relaxed">No fees, kickbacks, or hospitality from any shipyard. The shortlist reflects fit to the project, not commercial relationships.</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">No broker referral fees</h4>
                  <p className="text-sm text-muted leading-relaxed">No payments received for introducing the owner to brokerage firms or for placing the yacht with a particular sales house at resale.</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">No supplier kickbacks</h4>
                  <p className="text-sm text-muted leading-relaxed">No commissions from designers, surveyors, naval architects, paint manufacturers, equipment vendors, or subcontractors specified during the build.</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">Fixed-scope fee</h4>
                  <p className="text-sm text-muted leading-relaxed">Owner-paid only, agreed at the start of the engagement, and unchanged whether the build comes in on or over budget.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* WHEN TO APPOINT */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10" data-animate="fade-up">
            <SectionLabel>When to Appoint</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">
              The earlier, the better
            </h2>
            <p className="text-muted leading-relaxed">
              The largest single contribution an owner&apos;s representative makes is usually in the weeks before any contract is signed. Yard selection, contract terms, payment schedule, and specification scope are decisions that quietly determine the cost and quality of the next two to four years. Once those decisions are locked in, the role becomes harder, not easier.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-animate-stagger>
            <div className="border-l-2 border-accent/40 pl-6" data-animate="fade-up">
              <h3 className="text-base font-semibold text-white mb-2">Pre-contract</h3>
              <p className="text-sm text-muted leading-relaxed">
                The ideal stage. The representative contributes to yard shortlist, specification development, and contract negotiation before money changes hands. Most of the value in owner&apos;s representation lives in this phase.
              </p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6" data-animate="fade-up">
              <h3 className="text-base font-semibold text-white mb-2">Mid-build</h3>
              <p className="text-sm text-muted leading-relaxed">
                Construction has started, the contract is signed, and the owner has decided independent oversight is needed. We review the existing contract, audit the current state of the build, and establish a structured oversight and reporting framework from that point forward.
              </p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6" data-animate="fade-up">
              <h3 className="text-base font-semibold text-white mb-2">Pre-delivery</h3>
              <p className="text-sm text-muted leading-relaxed">
                The build is nearing completion and the owner wants independent eyes on sea trials, commissioning, snag list management, and formal acceptance. Late engagement is less effective than early, but it is far better than signing for delivery without representation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* NEW BUILD JOBS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>New Build</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Five jobs in a yacht new build
          </h2>
          <p className="text-muted leading-relaxed mb-14">
            Every project is different, but the structure of owner&apos;s representation in a new build follows a consistent pattern. These are the five phases, in order.
          </p>
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-0" data-animate-stagger>
            {newBuildJobs.map((job, i) => (
              <div key={job.step} className="flex gap-6 items-stretch" data-animate="fade-up">
                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-accent/40 text-accent text-sm font-semibold">
                    {job.step}
                  </div>
                  {i < newBuildJobs.length - 1 && <div className="w-px flex-1 bg-accent/20 my-2" />}
                </div>
                <div className="pb-10">
                  <h3 className="text-base font-semibold text-white mb-2">{job.title}</h3>
                  <p className="text-sm text-muted leading-relaxed max-w-2xl">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* REFIT JOBS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Refit</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Five jobs in a yacht refit
          </h2>
          <p className="text-muted leading-relaxed mb-14">
            Refit owner&apos;s representation runs on a shorter clock than a new build, but the principles are the same. The aim is a vessel returned to service on the agreed scope, on the agreed budget, with the warranty paperwork in order.
          </p>
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-0" data-animate-stagger>
            {refitJobs.map((job, i) => (
              <div key={job.step} className="flex gap-6 items-stretch" data-animate="fade-up">
                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-accent/40 text-accent text-sm font-semibold">
                    {job.step}
                  </div>
                  {i < refitJobs.length - 1 && <div className="w-px flex-1 bg-accent/20 my-2" />}
                </div>
                <div className="pb-10">
                  <h3 className="text-base font-semibold text-white mb-2">{job.title}</h3>
                  <p className="text-sm text-muted leading-relaxed max-w-2xl">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/refit" className="text-sm text-accent hover:text-white transition-colors">
              See our full refit service →
            </Link>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* OWNER'S REP VS PM VS BROKER */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10" data-animate="fade-up">
            <SectionLabel>Three roles, often confused</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">
              Owner&apos;s representative, project manager, broker
            </h2>
            <p className="text-muted leading-relaxed">
              These three roles are routinely conflated in the superyacht industry. They are not the same thing, and the difference matters for the owner.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-animate-stagger>
            <ServiceCard data-animate="fade-up" title="Broker" description="Finds the yacht or the yard. Paid by commission, usually five to ten percent of the deal. The incentive is to close. This can align with the buyer's interest. It can also not. A broker is not an owner's representative, even when titled as one." />
            <ServiceCard data-animate="fade-up" title="Project manager" description="Runs the build or refit on the ground. Often employed by the yard or the contractor. The incentive is to deliver on the contract that exists, not to challenge whether the contract is the right one. A project manager is necessary on every project. They are not an owner's representative." />
            <ServiceCard data-animate="fade-up" title="Owner's representative" description="Sits on the buyer's side of the table from the start. Reviews the deal before it is signed, supervises the build against that deal, and handles the warranty period. Independent, owner-paid, no commissions. The role is structurally distinct from the other two." />
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* ACCREDITATION */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div data-animate="slide-right">
              <SectionLabel>Accreditation</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">
                Qualified yacht owner&apos;s representatives
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                Foreland Marine is accredited by the Superyacht Builders Association (SYBAss) and registered on the Yacht Owner&apos;s Representative Register (YORR). These are the recognised credentials for owner&apos;s representation in the superyacht industry, and they exist for a reason.
              </p>
              <p className="text-muted leading-relaxed mb-5">
                SYBAss accreditation confirms that the representative is recognised by member shipyards as meeting the technical and professional standard expected on a new build. YORR registration confirms adherence to a formal Code of Conduct covering integrity, transparency, conflict of interest disclosure, and professional collaboration with all parties on the project.
              </p>
              <p className="text-muted leading-relaxed">
                Foreland Marine is also a member of British Marine and Superyacht UK, reinforcing our commitment to the standards expected of British marine consultancies operating in the international superyacht market.
              </p>
            </div>
            <div data-animate="slide-left">
              <h3 className="text-lg font-light text-white mb-5">YORR Code of Conduct</h3>
              <p className="text-muted leading-relaxed text-sm mb-6">
                As registered owner&apos;s representatives, we operate under the YORR Code of Conduct. The five core principles:
              </p>
              <div className="space-y-4">
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">Integrity and objectivity</h4>
                  <p className="text-sm text-muted leading-relaxed">Honesty, fairness, and objectivity in every recommendation. Facts presented as facts. Opinions presented as opinions.</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">Competence and expertise</h4>
                  <p className="text-sm text-muted leading-relaxed">Full disclosure of qualifications and experience. Recognition of the limits of expertise. Additional specialists engaged when required.</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">Owner&apos;s interest</h4>
                  <p className="text-sm text-muted leading-relaxed">Protection of the owner&apos;s position while dealing fairly with all parties on the project.</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">No conflicts of interest</h4>
                  <p className="text-sm text-muted leading-relaxed">Disclosure of every actual or potential conflict. No undisclosed commissions. No bribes or facilitation payments.</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h4 className="text-sm font-semibold text-white mb-1">Respectful collaboration</h4>
                  <p className="text-sm text-muted leading-relaxed">Constructive, professional engagement with the yard, the design team, and the owner. Disputes resolved through process, not personality.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* FIVE QUESTIONS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10" data-animate="fade-up">
            <SectionLabel>Diligence</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">
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

      {/* THE FORELAND APPROACH */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4" data-animate="fade-up">
              <SectionLabel>The Foreland approach</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white leading-tight">
                Independent, technical, owner-paid
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-5" data-animate="fade-up">
              <p className="text-muted leading-relaxed">
                Foreland Marine is a specialist yacht consultancy, structurally independent of brokers, yards, and suppliers. The team comprises Captains, unlimited Chief Engineers, surveyors, and naval architects with hands-on experience across the leading European and global shipyards. We focus on sailing and motor yachts from 24 to 60 metres, with particular depth in performance sailing yachts, J Class, and carbon composite construction.
              </p>
              <p className="text-muted leading-relaxed">
                Our owner&apos;s representation engagements are scoped at the start, priced as a fixed fee paid by the owner, and run by the same named team from yard selection through to the end of the warranty period. We do not subcontract the work. The person you meet at the pitch is the person who runs the project.
              </p>
              <p className="text-muted leading-relaxed">
                If you are at any stage of a new build or refit and want a second opinion on the structure of the deal, the strength of the contract, or the choice of yard, we can speak in confidence. <Link href="/contact" className="text-accent hover:text-white transition-colors">Get in touch</Link> and we will arrange an initial conversation, with no obligation and no fee, to understand the project and tell you honestly whether and how we can help.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* FAQ - visible accordion */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-10">Frequently asked questions</h2>
          <div className="space-y-4">
            <details className="group border border-white/10 bg-bg2">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What is a yacht owner&apos;s representative?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                A yacht owner&apos;s representative is an independent professional who acts solely for the owner during a new build or refit. The role covers yard selection, contract negotiation, on-site build supervision, quality control, budget oversight, sea trials, delivery, and warranty management. The defining feature is independence: a genuine owner&apos;s representative receives no commissions from yards, brokers, or suppliers and is paid only by the owner.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg2">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                Do I need a yacht owner&apos;s representative?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                If you are buying, building, or refitting a yacht above approximately 24 metres, the answer is almost always yes. The technical, contractual, and commercial complexity of a superyacht project is not something most owners encounter more than once or twice in a lifetime. The yard, the broker, and the suppliers all have professional teams advocating for their interests. Without an owner&apos;s representative, the owner sits opposite that table without equivalent expertise.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg2">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What does an independent owner&apos;s representative cost?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Fees vary by project size, duration, and scope of involvement, but a typical full-service new build representation runs at roughly one to three percent of the contract value, scoped at the start and not linked to the final build cost. Refit representation is usually quoted as a fixed monthly fee against the agreed project duration. The fee should never be a percentage of the final cost: that structure quietly rewards the representative when costs grow.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg2">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                When should I appoint an owner&apos;s representative?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                As early as possible, ideally before signing a Letter of Intent or shortlisting yards. The largest single contribution an owner&apos;s representative makes is usually in the contract and yard-selection phase, before any money has changed hands. That said, it is never too late: a representative can integrate at any stage of a build or refit, review what has already been agreed, and establish proper oversight from that point forward.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg2">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What is the difference between an owner&apos;s representative, a project manager, and a broker?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                A broker finds the yacht or the yard and is paid by commission, usually five to ten percent of the deal. A project manager runs the build or refit on the ground, often employed by the yard or contractor, and delivers against the contract that exists. An owner&apos;s representative sits on the buyer&apos;s side from the start, reviews the deal before it is signed, supervises the build against that deal, and handles the warranty period. The three roles are not interchangeable.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg2">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What accreditations should a yacht owner&apos;s representative hold?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                The two recognised credentials are SYBAss (Superyacht Builders Association) accreditation and registration on the Yacht Owner&apos;s Representative Register (YORR). SYBAss accreditation confirms the representative is recognised by member shipyards as meeting the technical and professional standard for new build oversight. YORR registration requires adherence to a formal Code of Conduct covering integrity, transparency, and conflict of interest disclosure. Foreland Marine holds both.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg2">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                Why does independence matter in owner&apos;s representation?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Many firms presenting themselves as owner&apos;s representatives also operate brokerage arms, hold yard relationships that pay referral fees, or earn management contracts that activate on delivery. None of these are illegal, but all of them quietly bend the advice the owner receives. An independent owner&apos;s representative earns income only from the owner, has no financial relationship with the yard or suppliers, and can challenge any party in the project without fear of damaging a commercial relationship.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg2">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What size of yacht warrants an owner&apos;s representative?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Foreland Marine specialises in new builds and refits from 24 to 60 metres, with particular expertise in performance sailing yachts, J Class, and carbon composite construction. Below 24 metres the technical and contractual complexity may not justify full owner&apos;s representation, although contract review and yard-selection support can still be valuable. Above 60 metres the case for representation is overwhelming.
              </div>
            </details>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* RELATED & FURTHER READING */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-muted">
          Related: <Link href="/refit" className="text-accent hover:text-white transition-colors">Refit</Link> · <Link href="/yacht-management" className="text-accent hover:text-white transition-colors">Independent Yacht Management</Link> · <Link href="/technical-consultancy" className="text-accent hover:text-white transition-colors">Technical Consultancy</Link>
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <p className="text-xs text-muted/60 uppercase tracking-widest mb-3">Further reading</p>
        <div className="flex flex-col gap-2">
          <Link href="/insights/what-is-a-yacht-owners-representative" className="text-sm text-accent hover:text-white transition-colors">What is a Yacht Owner&apos;s Representative and Why Independence Matters</Link>
          <Link href="/insights/the-role-of-an-owners-representative" className="text-sm text-accent hover:text-white transition-colors">The Role of an Owner&apos;s Representative in a New Build Project</Link>
          <Link href="/insights/owner-representation-during-yard-selection" className="text-sm text-accent hover:text-white transition-colors">Owner&apos;s Representation During Yard Selection: Getting It Right from Day One</Link>
          <Link href="/insights/why-independent-yacht-management-matters" className="text-sm text-accent hover:text-white transition-colors">Why Independent Yacht Management Matters</Link>
          <Link href="/insights/how-to-buy-your-first-superyacht" className="text-sm text-accent hover:text-white transition-colors">How to Buy Your First Superyacht</Link>
        </div>
      </div>

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/monaco-harbour-sunset.jpg" alt="Superyachts in Monaco harbour at sunset, owner's representation case in point" fill sizes="100vw" className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-bg0/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Start the conversation</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-5">A confidential first conversation</h2>
          <p className="text-muted leading-relaxed text-base mb-8 max-w-xl mx-auto">
            We will tell you, honestly, whether independent owner&apos;s representation is the right call for your project, and how we would approach it. There is no fee for the initial conversation and no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonPrimary href="/contact">Get in touch</ButtonPrimary>
          </div>
        </div>
      </section>
    </>
  );
}
