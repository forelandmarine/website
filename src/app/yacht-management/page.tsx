import Image from "next/image";
import Link from "next/link";
import { HorizonLine, ButtonPrimary, ServiceCard } from "@/components/ui";
import ParallaxHero from "@/components/ParallaxHero";

const servicesTop = [
  { title: "ISM, Safety & Compliance", description: "Full ISM Code implementation for 500 GT+ vessels, including Safety Management System development, internal audits, corrective action tracking, and incident management. For vessels below 500 GT, we develop voluntary safety management systems aligned with ISM principles, giving owners the same rigorous safety framework regardless of vessel size. Our proprietary Lightship ISM platform provides real-time compliance visibility across the fleet." },
  { title: "Crew Management", description: "Recruitment support, contract administration, payroll coordination, leave planning, and ongoing HR advisory. All employment managed per MLC, flag state requirements, and owner preferences. We handle crew certification tracking, training schedules, performance reviews, and succession planning to ensure continuity and high standards across every department on board. For racing programmes, we coordinate shore team logistics, sail inventory management, and regatta scheduling alongside day-to-day crew operations." },
  { title: "Financial Management", description: "Annual operating budgets built collaboratively with the owner, tracked against actuals, and reported monthly with clear variance commentary. Supplier engagement is managed with commercial rigour and full transparency. Every invoice is reviewed, every cost is justified, and owners receive detailed breakdowns with no mark-ups or hidden handling fees on third-party expenditure." },
];

const servicesBottom = [
  { title: "Class & Flag State", description: "Management of all class and flag state requirements. Survey schedules, statutory inspections, certification renewals, and flag state correspondence coordinated centrally to minimise disruption to the vessel programme. We maintain close working relationships with all major classification societies and flag state administrations, ensuring that documentation is prepared thoroughly and submissions are handled efficiently." },
  { title: "Insurance", description: "Coordination with specialist marine insurance brokers to ensure appropriate hull, machinery, P&I, and crew cover is in place. Policy review, renewal management, and claims support handled proactively. We ensure that cover reflects the vessel's actual operational profile and risk exposure, and we advocate on the owner's behalf throughout the claims process." },
];

export default function YachtManagementPage() {

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://www.forelandmarine.com/yacht-management#service",
              name: "Yacht Management",
              alternateName: [
                "Superyacht Management",
                "Independent Yacht Management",
                "Yacht Management Services",
                "Superyacht Management Services",
              ],
              serviceType: "Yacht Management",
              provider: {
                "@type": "Organization",
                name: "Foreland Marine Consultancy Ltd",
                "@id": "https://www.forelandmarine.com/#organization",
              },
              areaServed: "Worldwide",
              description:
                "Independent, owner-focused yacht management covering ISM compliance, crew management, financial oversight, insurance, class and flag state requirements. No brokerage, no charter commissions, no supplier kickbacks.",
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
                  name: "How much does yacht management cost?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Management fees typically account for 3 to 5 percent of a yacht's annual operating budget. The compliance cost sitting underneath the fee matters more: on a 40 metre yacht, ISM, MLC, flag administration, class society fees and the management company's compliance services together run EUR 80,000 to 200,000 a year. That figure does not appear in broker-quoted operating budgets, so an owner comparing a management proposal against a budget assembled during the sale is comparing two documents built on different assumptions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Should I use the yacht manager my broker recommends?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Not without asking what the recommendation is worth to the person making it. Introductory retrocessions are a normal feature of the market: a share of contract value paid back to the introducing party by the supplier who wins the work. On a EUR 5 million annual management contract a 10 percent introductory retrocession is EUR 500,000 in the first year, and it appears on no invoice to the owner because the broker is not invoicing the owner. None of this is unlawful and most is disclosed if asked directly. The point is that a recommendation carrying a six-figure payment is a different object from an assessment.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does a yacht under 500 gross tonnes need ISM?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Not as a legal requirement. The ISM Code binds yachts above 500 gross tonnes, and below that a safety management system is voluntary. A growing number of owners adopt a proportionate system anyway, for practical rather than regulatory reasons: insurers increasingly request risk management surveys assessing crew procedures, training and onboard management, and a documented system is what those surveys look for. Foreland runs voluntary systems on that basis for several vessels below the threshold.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What size yachts do you manage?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We manage sailing and motor yachts over 24 metres, from private cruising vessels to large commercial yachts. Our experience spans vessels from 24 metres to over 60 metres across a range of vessel types and operational profiles.",
                  },
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.forelandmarine.com" },
                { "@type": "ListItem", position: 2, name: "Yacht Management", item: "https://www.forelandmarine.com/yacht-management" },
              ],
            },
          ]),
        }}
      />

      {/* HERO */}
      <ParallaxHero
        imageSrc="/images/sailing-yacht-deck.jpg"
        imageAlt="Sailing yacht deck under way at sea"
        imageClassName="object-cover opacity-60 saturate-[1.15] scale-110"
      >
<div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              On the owner&apos;s side,<br />by the captain&apos;s side
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              Independent, owner-focused yacht management covering safety, compliance, crew, finances, and operations. From rig maintenance programmes and racing calendar logistics to ISM compliance and financial reporting, we protect asset value, ensure regulatory confidence, and let owners enjoy their yachts.
            </p>
          </div>
      </ParallaxHero>

      {/* SERVICES - TOP ROW */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12" data-animate="fade-up">
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

      {/* WHAT SETS US APART */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12" data-animate="fade-up">
            <h2 className="text-3xl sm:text-4xl font-light text-white">What sets us apart</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-animate-stagger>
            {/* Truly Independent */}
            <div className="relative bg-bg2 border border-white/8 overflow-hidden" data-animate="fade-up">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-70" />
              <div className="p-8 pl-9">
                <h3 className="text-base font-semibold text-white mb-3">Truly Independent</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  We do not sell yachts, broker charter, or earn commissions from suppliers. There is no adjacent business that profits when you spend more, change yacht, or enter the charter market.
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  Every recommendation we make serves one interest: the owner&apos;s. Our management fee is our only revenue from the relationship, which means our advice is never shaped by competing commercial incentives.
                </p>
              </div>
            </div>
            {/* Technical Depth */}
            <div className="relative bg-bg2 border border-white/8 overflow-hidden" data-animate="fade-up">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-70" />
              <div className="p-8 pl-9">
                <h3 className="text-base font-semibold text-white mb-3">Technical Depth</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  Our team includes unlimited Chief Engineers, Captains, and Naval Architects who understand vessels from the inside out. We do not outsource technical judgement to third-party consultants.
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  Whether it is evaluating a refit scope, reviewing a maintenance plan, or assessing a class survey finding, our people have the qualifications and sea time to make informed decisions at the technical level. That includes hands-on experience with carbon rigs, hydraulic deck systems, and performance sailing programmes.
                </p>
              </div>
            </div>
            {/* Transparent Reporting */}
            <div className="relative bg-bg2 border border-white/8 overflow-hidden" data-animate="fade-up">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-70" />
              <div className="p-8 pl-9">
                <h3 className="text-base font-semibold text-white mb-3">Transparent Reporting</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  Owners receive clear, detailed financial and operational reporting with no hidden fees or mark-ups. Monthly reports include itemised expenditure, budget variance commentary, and full audit trails.
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  We believe owners should know exactly where every pound is going and why. Transparency is not a feature we offer; it is the foundation of how we work.
                </p>
              </div>
            </div>
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

      <HorizonLine />

      {/* WHAT MANAGEMENT COSTS */}
      <section className="py-20 bg-bg0">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-8 leading-tight" data-animate="fade-up">
            What management costs, and what sits underneath it
          </h2>
          <div className="space-y-5 text-muted leading-relaxed" data-animate="fade-up">
            <p>
              Management fees typically account for 3 to 5 percent of a yacht&apos;s annual operating budget. That is the visible number and it is the smaller half of the story. Underneath it sits the compliance cost itself: on a 40 metre yacht, ISM, MLC, flag administration, class society fees and the management company&apos;s compliance services together run EUR 80,000 to 200,000 a year.
            </p>
            <p>
              That figure is worth holding because it does not appear in broker-quoted operating budgets. An owner comparing a management proposal against a budget assembled during the sale is comparing two documents built on different assumptions, and the gap is not usually in the owner&apos;s favour.
            </p>
            <p>
              For context on where the rest of the budget goes, the working split on a privately operated yacht runs roughly: crew at 30 to 40 percent, maintenance and repair at 14 to 18, insurance at 10 to 14, berths and marina fees at 8 to 12, fuel at 8 to 12, management at 3 to 5, regulatory and class compliance at 2 to 3, and a contingency of 6 to 10. The remainder is provisioning, communications, owner travel and the lines that simply happen. Those ranges are set out with their sources in{" "}
              <Link href="https://firstownersreference.com/01-reality-of-ownership" className="text-accent hover:text-white transition-colors underline underline-offset-2">chapter one of The First Owner&apos;s Reference</Link>.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* THE REFERRAL PROBLEM */}
      <section className="bg-bg1 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-8 leading-tight" data-animate="fade-up">
            Why the broker should not choose your manager
          </h2>
          <div className="space-y-5 text-muted leading-relaxed" data-animate="fade-up">
            <p>
              The management company is the long-running operational partner, engaged for the length of the ownership rather than the length of the transaction. It is also, in most cases, introduced by the broker who sold the yacht.
            </p>
            <p>
              The mechanism worth understanding is the introductory retrocession: a share of the contract value paid back to the introducing party by the supplier who won the work. On a EUR 5 million annual management contract, a 10 percent introductory retrocession is EUR 500,000 in the first year. On a EUR 4 million repaint, a 5 percent retrocession is EUR 200,000. These sums do not appear on any invoice to the owner, because the broker is not invoicing the owner. The owner pays the management company, the yard and the paint contractor, and the retrocession flows inside the supplier&apos;s books.
            </p>
            <p>
              None of this is unlawful and most of it is disclosed if asked directly. The structural point is simply that a recommendation carrying a five or six figure payment attached to it is not the same object as an assessment, and an owner is entitled to know which one they are being given. Andrew Roch has documented the wider version of the same shift in Superyacht News: management companies migrating since the 1990s from administrative support into operational and financial control, drawing authority away from the captain while responsibility stayed with the master.
            </p>
            <p>
              Foreland takes no introductory payment from any supplier and pays none. The management fee is our only revenue from the relationship. That is a narrower business than the multi-line houses run, and it is the reason a recommendation from us is worth reading.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* ISM AND MLC */}
      <section className="py-20 bg-bg0">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-8 leading-tight" data-animate="fade-up">
            ISM, MLC, and who actually does what
          </h2>
          <div className="space-y-5 text-muted leading-relaxed" data-animate="fade-up">
            <p>
              Yachts above 500 gross tonnes operate under the International Safety Management Code, which requires a documented safety management system and a regular audit cycle. Yachts in commercial operation also fall under the Maritime Labour Convention, which governs crew contracts, hours, working conditions and welfare. Both are binding and both are audited, and neither is satisfied by a folder that is opened the week before the inspector arrives.
            </p>
            <p>
              Below 500 gross tonnes the position is voluntary, and a growing number of owners adopt a proportionate safety management system anyway. The reasoning is practical rather than regulatory: insurers increasingly request risk management surveys that assess crew procedures, training and onboard management, and a documented system is what those surveys are looking for. Foreland runs voluntary systems on this basis for several vessels below the threshold.
            </p>
            <p>
              The division of labour is worth stating plainly, because it is often blurred in proposals. The captain runs the yacht. The management company runs the compliance, maintaining the system, filing the regulatory paperwork, running the audit cycle and supporting the captain on flag state interactions. The insurance broker runs the risk. The owner runs the team. A manager who is quietly taking operational decisions that belong to the master has moved outside that structure, whatever the contract says.
            </p>
            <p>
              Our{" "}
              <Link href="/tools/lightship-ism" className="text-accent hover:text-white transition-colors underline underline-offset-2">Lightship ISM platform</Link>{" "}
              exists because the systems most yachts inherit are built for auditors rather than for crews, and a system the crew does not use is not a safety management system.
            </p>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center" data-animate="fade-up">
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
          <Image src="/images/sailing-fleet-horizon.jpg" alt="Sailing fleet on the horizon at sunset" fill sizes="100vw" className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-bg0/80" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center" data-animate="fade-up">
          <blockquote className="mt-6">
            <svg aria-hidden="true" className="mx-auto mb-6 text-accent/50 w-10 h-10" fill="currentColor" viewBox="0 0 32 32">
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

      <HorizonLine />

      {/* Common questions, on the page as well as in the schema */}
      <section className="py-20 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-10">Common questions about yacht management</h2>
          <div className="space-y-8">
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">What is independent yacht management?</h3>
              <p className="text-sm text-muted leading-relaxed">Independent yacht management means serving the owner&apos;s interests without conflicts from brokerage, charter, or yard affiliations. Foreland does not sell yachts, broker charter, or earn commissions from suppliers. Every recommendation is made solely in the owner&apos;s interest.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">What does ISM compliance involve for yachts?</h3>
              <p className="text-sm text-muted leading-relaxed">ISM (International Safety Management) compliance involves developing and maintaining a Safety Management System, crew training and certification, incident reporting procedures, regular internal audits, emergency drills, and a framework of continuous improvement. For vessels over 500 GT, ISM Code compliance is mandatory.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">Do you handle crew recruitment and management?</h3>
              <p className="text-sm text-muted leading-relaxed">Yes. We provide full crew management services including recruitment support, contract administration, payroll coordination, training and certification tracking, leave planning, and ongoing HR advisory, all managed per MLC and flag state requirements.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">What size yachts do you manage?</h3>
              <p className="text-sm text-muted leading-relaxed">We manage sailing and motor yachts over 24 metres, from private cruising vessels to large commercial yachts. Our experience spans vessels from 24 metres to over 60 metres across a range of vessel types and operational profiles.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">How much does yacht management cost?</h3>
              <p className="text-sm text-muted leading-relaxed">Management fees typically account for 3 to 5 percent of a yacht&apos;s annual operating budget. The compliance cost sitting underneath the fee matters more: on a 40 metre yacht, ISM, MLC, flag administration, class society fees and the management company&apos;s compliance services together run EUR 80,000 to 200,000 a year. That figure does not appear in broker-quoted operating budgets, so an owner comparing a management proposal against a budget assembled during the sale is comparing two documents built on different assumptions.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">Should I use the yacht manager my broker recommends?</h3>
              <p className="text-sm text-muted leading-relaxed">Not without asking what the recommendation is worth to the person making it. Introductory retrocessions are a normal feature of the market: a share of contract value paid back to the introducing party by the supplier who wins the work. On a EUR 5 million annual management contract a 10 percent introductory retrocession is EUR 500,000 in the first year, and it appears on no invoice to the owner because the broker is not invoicing the owner. None of this is unlawful and most is disclosed if asked directly. The point is that a recommendation carrying a six-figure payment is a different object from an assessment.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">Does a yacht under 500 gross tonnes need ISM?</h3>
              <p className="text-sm text-muted leading-relaxed">Not as a legal requirement. The ISM Code binds yachts above 500 gross tonnes, and below that a safety management system is voluntary. A growing number of owners adopt a proportionate system anyway, for practical rather than regulatory reasons: insurers increasingly request risk management surveys assessing crew procedures, training and onboard management, and a documented system is what those surveys look for. Foreland runs voluntary systems on that basis for several vessels below the threshold.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES & FURTHER READING */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-muted">
          Related: <Link href="/owners-representation" className="text-accent hover:text-white transition-colors">New Build</Link>, <Link href="/refit" className="text-accent hover:text-white transition-colors">Refit Project Management</Link>, <Link href="/technical-consultancy" className="text-accent hover:text-white transition-colors">Technical Consultancy</Link>
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <p className="text-xs text-muted/60 uppercase tracking-widest mb-3">Further Reading</p>
        <div className="flex flex-col gap-2">
          <Link href="/insights/why-independent-yacht-management-matters" className="text-sm text-accent hover:text-white transition-colors">Why Independent Yacht Management Matters</Link>
          <Link href="/insights/choosing-yacht-management-company" className="text-sm text-accent hover:text-white transition-colors">How to Choose an Independent Yacht Management Company</Link>
          <Link href="/insights/ism-compliance-guide-for-yacht-owners" className="text-sm text-accent hover:text-white transition-colors">A Practical Guide to ISM Compliance for Yacht Owners</Link>
        </div>
      </div>

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/yacht-management.jpg" alt="Superyacht under management at sea" fill sizes="100vw" className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-bg0/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
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
