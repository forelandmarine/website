import type { Metadata } from "next";
import Image from "next/image";
import { DotGrid, Glow, HorizonLine, SectionLabel, ButtonPrimary } from "@/components/ui";

export const metadata: Metadata = {
  title: "Lightship ISM: Fleet Management",
  description:
    "Lightship streamlines your workflow, leaving you more time for the important stuff. ISM compliance, incident reporting, project management, logbooks, and AIS sea service records in one clear interface.",
};

function ScreenFrame({ src, alt, width = 1400, height = 900 }: { src: string; alt: string; width?: number; height?: number }) {
  return (
    <div className="rounded-[16px] border-[6px] border-[#2a2a2e] bg-[#1a1a1e] p-1 shadow-2xl shadow-black/40">
      <div className="overflow-hidden rounded-[10px]">
        <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" />
      </div>
    </div>
  );
}

function FeatureSection({
  label,
  title,
  description,
  children,
  reverse = false,
  bg = "bg-bg1",
}: {
  label: string;
  title: string;
  description: string;
  children: React.ReactNode;
  reverse?: boolean;
  bg?: string;
}) {
  return (
    <section className={`py-20 ${bg} overflow-hidden`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? "lg:[direction:rtl]" : ""}`}>
        <div className={reverse ? "lg:[direction:ltr]" : ""}>
          <SectionLabel>{label}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">{title}</h2>
          <p className="text-muted leading-relaxed">{description}</p>
        </div>
        <div className={reverse ? "lg:[direction:ltr]" : ""}>{children}</div>
      </div>
    </section>
  );
}

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight mb-6 leading-[1.05]">
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

      {/* FLEET DASHBOARD */}
      <FeatureSection
        label="Fleet Overview"
        title="Every vessel, one dashboard"
        description="Real-time visibility across your entire fleet. Safety incidents, audit schedules, crew status, equipment condition, and compliance, all surfaced in a single view. No more chasing spreadsheets or waiting for email updates."
      >
        <ScreenFrame src="/images/lightship-dashboard.png" alt="Lightship fleet overview dashboard" />
      </FeatureSection>

      <HorizonLine />

      {/* SAFETY CHECKLISTS */}
      <FeatureSection
        label="Safety Checklists"
        title="Create, assign, and track inspections"
        description="Build checklists from templates or from scratch. Assign them across your fleet with due dates and frequency. Track progress in real time, flag deficiencies, and raise corrective actions, all from one screen."
        reverse
        bg="bg-bg0"
      >
        <ScreenFrame src="/images/lightship-checklists.png" alt="Safety checklists with progress tracking" />
      </FeatureSection>

      <HorizonLine />

      {/* INCIDENTS & DRILLS */}
      <FeatureSection
        label="Incidents &amp; Drills"
        title="Report, investigate, improve"
        description="Structured incident reports with root cause analysis, corrective actions, and witness statements. Safety drill records capture scenarios, participants, equipment used, lessons learned, and areas for improvement. Everything auditable and exportable."
      >
        <div className="grid grid-cols-2 gap-4">
          <ScreenFrame src="/images/lightship-incident.png" alt="Safety incident report with root cause analysis" width={800} height={1000} />
          <ScreenFrame src="/images/lightship-drill.png" alt="Man overboard drill record" width={800} height={1000} />
        </div>
      </FeatureSection>

      <HorizonLine />

      {/* RISK ASSESSMENTS */}
      <FeatureSection
        label="Risk Assessments"
        title="Identify, assess, mitigate"
        description="Operational risk assessments for every activity onboard: engine room operations, deck work, navigation, and more. Identify hazards, assign likelihood and consequence, define controls, and set review dates. All linked to your vessels and crew."
        reverse
        bg="bg-bg0"
      >
        <ScreenFrame src="/images/lightship-risk-assessments.png" alt="Risk assessments list with status indicators" />
      </FeatureSection>

      <HorizonLine />

      {/* EMERGENCY PROCEDURES */}
      <FeatureSection
        label="Procedures"
        title="Emergency response at everyone&apos;s fingertips"
        description="Documented emergency procedures accessible to all crew. Step-by-step response protocols, safety precautions, and approval workflows. From man overboard to fire response, versioned, approved, and always available."
      >
        <ScreenFrame src="/images/lightship-procedures.png" alt="Man overboard emergency response procedure" width={800} height={1000} />
      </FeatureSection>

      <HorizonLine />

      {/* PROJECT MANAGEMENT */}
      <FeatureSection
        label="Project Management"
        title="Refit and build projects, on track"
        description="Gantt-chart project planning built for marine projects. Break work into phases and tasks, assign dates, track dependencies, and monitor progress. Whether it&apos;s a mid-life refit or a new build commissioning, keep every stakeholder aligned."
        reverse
        bg="bg-bg0"
      >
        <ScreenFrame src="/images/lightship-project-management.png" alt="Project management Gantt chart for yacht refit" />
      </FeatureSection>

      <HorizonLine />

      {/* SHIP'S LOGBOOK */}
      <FeatureSection
        label="Ship&apos;s Logbook"
        title="Official logs, digitally compliant"
        description="Malta and Red Ensign Group compliant ship&apos;s logbook. Record watch changes, port arrivals and departures, noon positions, and all statutory entries. Every entry timestamped with position, weather, and sea state. Export to PDF at any time."
      >
        <ScreenFrame src="/images/lightship-logbook.png" alt="Official ship's logbook with log entries" />
      </FeatureSection>

      <HorizonLine />

      {/* MARPOL RECORDS */}
      <FeatureSection
        label="MARPOL Compliance"
        title="Oil and garbage record books"
        description="MARPOL Annex I and Annex V compliant record keeping. Log fuel receipts, bilge water discharges, oil transfers, and waste disposal with proper operation codes. All entries signed, auditable, and ready for port state inspection."
        reverse
        bg="bg-bg0"
      >
        <div className="grid grid-cols-2 gap-4">
          <ScreenFrame src="/images/lightship-oil-record.png" alt="Oil record book with MARPOL entries" width={800} height={1000} />
          <ScreenFrame src="/images/lightship-garbage-record.png" alt="Garbage record book with waste categories" width={800} height={1000} />
        </div>
      </FeatureSection>

      <HorizonLine />

      {/* DEVICE MOCKUPS */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg1 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>Desktop &amp; Mobile</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">Works on every device</h2>
            <p className="text-muted text-lg max-w-xl mx-auto">
              Full access on desktop, tablet, or phone. Crew can file reports dockside or mid-ocean, wherever they are, the platform is with them.
            </p>
          </div>
          <div className="flex items-center justify-center gap-6">
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
        </div>
      </section>

      <HorizonLine />

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg1 overflow-hidden">
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
