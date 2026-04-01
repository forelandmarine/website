import type { Metadata } from "next";
import { DotGrid, Glow, HorizonLine, SectionLabel } from "@/components/ui";

export const metadata: Metadata = {
  title: "PMS Database Services",
  description:
    "Expert planned maintenance system database setup, licensing, and on-site population. Authorised DeepBlue agents. We also work with IDEA, SeaHub, Aquator and other leading PMS platforms.",
};

const platforms = [
  {
    name: "DeepBlue",
    badge: "Authorised Agent",
    description:
      "Our primary platform. DNV type-approved, modular yacht management system covering PMS, crewing, inventory, compliance and finance.",
    primary: true,
  },
  {
    name: "IDEA",
    description:
      "Industry standard with 1,300+ installations. Comprehensive PMS, ISM and inventory management for yachts of all sizes.",
    primary: false,
  },
  {
    name: "SeaHub",
    description:
      "Cloud-based PMS built by engineers. Strong warranty tracking and new build worklist management.",
    primary: false,
  },
  {
    name: "Aquator",
    description:
      "Modern platform with AI-powered maintenance predictions. Lloyd\u2019s Register approved, DNV ISO 9001 certified.",
    primary: false,
  },
];

const steps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "Understanding the vessel, existing systems, crew capability and operational requirements. We assess what you have and what you need.",
  },
  {
    number: "02",
    title: "Platform Selection",
    description:
      "Recommending the right PMS for the vessel\u2019s size, programme and management structure. Licensing, hosting and integration considerations.",
  },
  {
    number: "03",
    title: "Database Architecture",
    description:
      "Structuring the equipment hierarchy, maintenance plans, spare parts catalogues, technical documentation and regulatory compliance tasks.",
  },
  {
    number: "04",
    title: "On-Site Population",
    description:
      "Our team comes aboard to inspect and catalogue every system, compartment and piece of equipment. Manufacturer data, serial numbers, service intervals \u2014 all captured first-hand.",
  },
  {
    number: "05",
    title: "Training & Handover",
    description:
      "Crew training on the platform, ongoing support, and a fully populated database ready for immediate use. No loose ends.",
  },
];

const reasons = [
  {
    title: "Class & Flag Compliance",
    description:
      "A properly structured PMS satisfies class society and flag state requirements for planned maintenance.",
  },
  {
    title: "Survey Readiness",
    description:
      "Annual, intermediate and renewal surveys go more smoothly when maintenance records are complete and auditable.",
  },
  {
    title: "Operational Efficiency",
    description:
      "Crew spend less time on admin and more time on maintenance. Nothing falls through the cracks.",
  },
  {
    title: "Resale Value",
    description:
      "A complete, well-maintained PMS database is a tangible asset. Buyers and their surveyors notice.",
  },
  {
    title: "Crew Workload",
    description:
      "A well-structured database reduces the burden on engineering crew and makes handovers between rotations seamless.",
  },
  {
    title: "ISM Compliance",
    description:
      "LSA, FFE, critical equipment and safety systems all require scheduled maintenance under the ISM Code.",
  },
];

export default function PMSDatabasePage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "PMS Database Services",
            description:
              "Expert planned maintenance system database setup, licensing, and on-site population for yachts 24\u201360m.",
            provider: {
              "@type": "Organization",
              name: "Foreland Marine Consultancy",
              url: "https://forelandmarine.com",
            },
            serviceType: "Planned Maintenance System Database Setup",
            areaServed: "Worldwide",
          }),
        }}
      />

      {/* HERO */}
      <section className="relative py-28 overflow-hidden bg-bg1">
        <DotGrid />
        <Glow className="-top-40 left-1/2 -translate-x-1/2" color="rgba(30,155,255,0.2)" size={700} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>Tools</SectionLabel>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight mb-6 leading-[1.05]">
              Planned Maintenance Systems, set up right.
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              Expert PMS database setup, licensing, and on-site population. We structure your maintenance systems properly from day one, so your crew can focus on the work that matters.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <HorizonLine />
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-20 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Platform-agnostic PMS expertise
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              A PMS is only as good as the data inside it. We provide the complete service: selecting the right platform, licensing, building the database architecture, and populating it on board with real equipment data.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Our team structures equipment hierarchies, maintenance schedules, spare parts catalogues, and technical documentation to class and flag standards. We build in regulatory compliance tasks for LSA, FFE, and ISM critical equipment, and we do it by inspecting every system on board first-hand.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {[
              "Database structuring & equipment hierarchy",
              "Maintenance schedule programming",
              "Spare parts cataloguing",
              "Technical documentation management",
              "LSA, FFE & ISM compliance tasks",
              "On-site inspection & population",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 bg-bg2/60 border border-white/5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-accent mt-0.5 shrink-0">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* PLATFORMS */}
      <section className="py-20 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionLabel>Platforms</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              We work with the leading PMS platforms
            </h2>
            <p className="text-muted leading-relaxed">
              Every vessel is different. We recommend the right platform based on your size, programme, management structure and budget, then build the database to the same standard regardless of which system you choose.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className={`relative p-7 border ${
                  platform.primary
                    ? "border-accent/40 bg-accent/5"
                    : "border-white/8 bg-bg2/60"
                } transition-colors`}
              >
                {platform.primary && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />
                )}
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                  {platform.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 border border-accent/30 px-2.5 py-0.5 rounded-full">
                      {platform.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted leading-relaxed">{platform.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* OUR PROCESS */}
      <section className="py-20 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              From consultation to handover
            </h2>
            <p className="text-muted leading-relaxed">
              A structured approach that delivers a fully populated, crew-ready PMS database.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-0">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 md:gap-8 py-8 ${
                  i < steps.length - 1 ? "border-b border-white/8" : ""
                }`}
              >
                <div className="text-3xl font-light text-accent/60 tabular-nums">{step.number}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed max-w-2xl">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* WHY IT MATTERS */}
      <section className="py-20 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionLabel>Why It Matters</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Proper PMS setup pays for itself
            </h2>
            <p className="text-muted leading-relaxed">
              A well-structured maintenance database is not just admin. It directly impacts compliance, operational costs, crew workload and vessel value.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reasons.map((reason) => (
              <div key={reason.title} className="p-6 border border-white/8 bg-bg2/40">
                <h3 className="text-sm font-semibold text-white mb-2">{reason.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* CTA */}
      <section className="relative py-24 bg-bg1 overflow-hidden">
        <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="rgba(30,155,255,0.12)" size={600} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Get Started</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
            Ready to get your maintenance systems in order?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            Whether you need a new PMS from scratch or want to clean up an existing database, we can help.
          </p>
          <a
            href="mailto:info@forelandmarine.com"
            className="inline-flex items-center justify-center bg-accent text-white font-semibold text-sm px-8 py-3 rounded hover:bg-accent/90 transition-colors gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            info@forelandmarine.com
          </a>
        </div>
      </section>
    </>
  );
}
