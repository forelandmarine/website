import type { Metadata } from "next";
import { DotGrid, Glow, HorizonLine, SectionLabel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Lightship ISM: Fleet Management",
  description:
    "Lightship streamlines your workflow, leaving you more time for the important stuff. ISM compliance, incident reporting, and AIS sea service records in one clear interface.",
};

const features = [
  {
    title: "ISM Compliance",
    description:
      "International Safety Management System for yachts under 500 GT, and mini-ISM voluntarily compliant reporting.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5386B6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Incidents, Drills and Permits",
    description:
      "Ops Checklists, Databases, Hours of Rest, Passage Planning. At your fingertips. Reports generated in a couple of taps.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5386B6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "AIS Sea Service Records",
    description:
      "Each crew member marked as embarked is given a sea day as soon as the vessel has been underway for more than 4 hours, reported by AIS.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5386B6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    title: "Desktop and Mobile",
    description:
      "All the right people notified. Crew keeping cool. Full access on any device.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5386B6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export default function LightshipISMPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-28 overflow-hidden bg-bg1">
        <DotGrid />
        <Glow className="-top-40 left-1/2 -translate-x-1/2" color="rgba(30,155,255,0.2)" size={700} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>Fleet Management</SectionLabel>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight mb-6 leading-[1.05]">
              Yacht Administration, but a bit clever.
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              Lightship streamlines your workflow, leaving you more time for the important stuff. Everything you need in one clear interface, with just enough automation to make it easy without getting in the way.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <HorizonLine />
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-24 bg-bg1">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionLabel>Platform Features</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white">Everything in one place.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-bg2 border border-white/8 rounded p-7 hover:border-accent/30 transition-colors">
                <div className="mb-5">{f.icon}</div>
                <h3 className="text-lg font-light text-white mb-3">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.description}</p>
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
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">Fancy a demo?</h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            Send our team an email for a no-obligation walkthrough.
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
