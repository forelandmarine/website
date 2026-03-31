import type { Metadata } from "next";
import Image from "next/image";
import { HorizonLine, SectionLabel, ButtonPrimary, ServiceCard } from "@/components/ui";

export const metadata: Metadata = {
  title: "Refit Project Management",
  description:
    "Refit project management for motor and sailing yachts over 24m. 25 large yacht projects across 7 countries, from high-profile racing programmes to in-depth motor yacht rebuilds.",
};

const services = [
  { title: "Planning & Specification", description: "Scope definition, design review, work specification, and budget development prior to the yard period. Thorough planning at this stage is fundamental to a well-executed refit." },
  { title: "On-Site Project Management", description: "A dedicated project manager present at the yard throughout the refit. Daily progress monitoring, contractor coordination, quality assurance, and structured owner reporting." },
  { title: "Yard Selection & Tendering", description: "Assessment of yards against capability, availability, track record, and commercial value. Management of the tendering process and contract negotiation on behalf of the owner." },
  { title: "Budget & Cost Control", description: "Detailed financial tracking from the outset, with monthly reporting, change order review, and supplier negotiation. Full transparency on expenditure at every stage." },
  { title: "Quality & Compliance", description: "Milestone inspections, coatings and paint survey, systems testing, and formal sign-off at each phase. Coordination of class surveys and flag state requirements as required." },
  { title: "Sea Trials & Handover", description: "Coordination of trials, snagging resolution, crew briefing, and a structured handover process to ensure the vessel departs the yard fully operational and to the agreed standard." },
];

export default function RefitPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-36 overflow-hidden bg-bg0">
        <div className="absolute inset-0">
          <Image src="/images/refit-yard.jpg" alt="" fill className="object-cover opacity-35" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/70 via-bg0/40 to-bg0" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>Refit Project Management</SectionLabel>
            <h1 className="text-5xl sm:text-6xl font-light text-white mb-6 leading-tight">
              Managed with rigour,<br />delivered with care
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              We provide full refit project management for motor and sailing yachts over 24 metres, from initial assessment through to sea trials and handover. From a light refresh to a complete rebuild, our first priority is to deliver on time and on budget.
            </p>
          </div>
        </div>
      </section>

      {/* TRACK RECORD */}
      <section className="bg-bg2 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel>Track Record</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">Classic to Carbon</h2>
              <p className="text-muted leading-relaxed mb-5">
                Twenty-five large yacht refit projects delivered across seven countries. High-profile classic and modern racing yachts prepared for the grand prix circuit. Multiple sailing yachts exceeding 40 metres. Motor yachts in excess of 60 metres undergoing comprehensive rebuilds. Historic restorations of vessels dating from the 1920s alongside performance programmes on recently launched craft.
              </p>
              <p className="text-muted leading-relaxed">
                This breadth of experience means our team has encountered the specific challenges associated with each vessel type, from managing complex coatings schemes on pre-war hulls to commissioning carbon rigs on contemporary racing yachts, and overseeing in-depth mechanical and interior refits on large motor yachts.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-light text-white mb-1">25</p>
                <p className="text-sm text-muted">Large yacht projects</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-light text-white mb-1">7</p>
                <p className="text-sm text-muted">Countries</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-light text-white mb-1">30-60m+</p>
                <p className="text-sm text-muted">Projects delivered</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-light text-white mb-1">100+</p>
                <p className="text-sm text-muted">Years of vessel heritage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* SERVICES */}
      <section className="py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white">The full scope of a refit</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <ServiceCard key={s.title} title={s.title} description={s.description} />
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* APPROACH */}
      <section className="bg-bg1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="px-8 py-16 lg:px-14 lg:py-20 flex flex-col justify-center">
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
          <div className="relative h-72 lg:h-auto min-h-[460px]">
            <Image src="/images/welder-hull.jpg" alt="Welder working on a yacht hull in dry dock" fill className="object-cover" />
            <div className="absolute inset-0 bg-bg0/10" />
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* CTA */}
      <section className="relative py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/shipyard-2.jpg" alt="" fill className="object-cover opacity-15" />
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
