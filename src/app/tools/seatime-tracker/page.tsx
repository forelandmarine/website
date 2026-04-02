"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Glow, HorizonLine, SectionLabel, ButtonPrimary, ButtonOutline } from "@/components/ui";

function PhoneMockup({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      <div className="relative w-[240px] h-[490px] sm:w-[270px] sm:h-[552px] rounded-[2.5rem] border-[6px] border-[#2e2e2e] bg-black shadow-2xl shadow-black/50 overflow-hidden ring-1 ring-[#444]">
        <Image src={src} alt={alt} fill className="object-cover object-top" sizes="270px" />
      </div>
    </div>
  );
}

const features = [
  "Automatic AIS Tracking",
  "MCA-Compliant PDF Reports",
  "Unlimited Voyage Logbook",
  "Multiple Vessel Support",
  "Daily Review Reminders",
  "Secure Cloud Backup",
];

const comparison = [
  { label: "Paper logbooks", good: false, desc: "Manual. Easily lost. Not MCA-ready." },
  { label: "Manual entry apps", good: false, desc: "Relies on you remembering. Easy to miss voyages." },
  { label: "Spreadsheets", good: false, desc: "Time consuming. Difficult to export for MCA submission." },
  { label: "SeaTime Tracker", good: true, desc: "Automatic. Secure. MCA-compliant PDF reports in seconds." },
];

export default function SeaTimeTrackerPage() {
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
      {/* HERO */}
      <section ref={heroRef} className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-bg0">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Glow className="-top-40 left-1/2 -translate-x-1/2" color="rgba(30,155,255,0.2)" size={800} />
        </div>
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <SectionLabel>Automatic AIS Tracking</SectionLabel>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                Your sea time,<br />on autopilot.
              </h1>
              <p className="text-lg text-muted leading-relaxed mb-4 max-w-xl">
                Built for seafarers who need MCA-compliant records, automatically tracked via AIS. No manual entry, no paperwork.
              </p>
              <p className="text-base text-muted/60 leading-relaxed mb-10 max-w-xl">
                SeaTime Tracker uses live AIS data to record every passage automatically, even when your phone is off.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <ButtonPrimary href="https://apps.apple.com" className="gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download on the App Store
                </ButtonPrimary>
                <ButtonOutline href="#how-it-works">Learn more</ButtonOutline>
              </div>
              <div className="flex items-center gap-4">
                <a href="https://instagram.com/seatimetracker" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <span className="text-muted/30">|</span>
                <a href="https://instagram.com/seatimetracker" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-white transition-colors">
                  @seatimetracker
                </a>
              </div>
            </div>
            <div className="lg:col-span-2 flex justify-center">
              <PhoneMockup src="/images/seatime/IMG_0594.PNG" alt="SeaTime Tracker - Active vessel tracking with AIS" />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <SectionLabel>Always On</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-4 leading-tight">
                Detected. Before you dock.
              </h2>
              <p className="text-muted leading-relaxed mb-10 max-w-lg">
                Our servers check your vessel position around the clock via AIS. No typing, no paper, no forgotten entries.
              </p>
              <div className="space-y-6">
                {[
                  { num: "01", title: "Position checked every 2 hours via AIS", desc: "Server checks vessel position every 2 hours via AIS data, even when your phone is off." },
                  { num: "02", title: "Movement detected, entry created", desc: "Compares current position with 2 hours ago. If you've moved, a pending sea time entry is created." },
                  { num: "03", title: "You review and confirm in one tap", desc: "Open the app, review the entry, and confirm or reject with a single tap." },
                ].map((step, i, arr) => (
                  <div key={step.num} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-accent/40 text-accent text-xs font-semibold">
                        {step.num}
                      </div>
                      {i < arr.length - 1 && <div className="w-px flex-1 bg-accent/20 mt-2" />}
                    </div>
                    <div className="pb-6">
                      <h3 className="text-white text-sm font-semibold mb-1">{step.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 flex justify-center">
              <PhoneMockup src="/images/seatime/IMG_0601.PNG" alt="SeaTime Tracker - Scheduled AIS tasks" />
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* COMPARISON */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionLabel>Why SeaTime Tracker</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white">Manual entry is the old way.</h2>
          </div>
          <div className="max-w-3xl space-y-3">
            {comparison.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-4 p-5 border ${
                  item.good
                    ? "bg-accent/5 border-accent/30"
                    : "bg-bg2/60 border-white/8"
                }`}
              >
                <div
                  className={`flex-shrink-0 h-7 w-7 flex items-center justify-center ${
                    item.good ? "bg-green/20 border border-green/40" : "bg-red-500/10 border border-red-500/20"
                  }`}
                >
                  {item.good ? (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M4 4l6 6M10 4l-6 6" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`font-semibold text-sm ${item.good ? "text-white" : "text-white/70"}`}>
                    {item.label}
                  </span>
                  <span className={`ml-3 text-sm ${item.good ? "text-muted" : "text-muted/50"}`}>
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* LOGBOOK */}
      <section className="bg-bg1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center px-8 py-20 lg:px-16 lg:py-24">
            <div className="max-w-lg">
              <SectionLabel>Digital Logbook</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
                Every voyage, perfectly logged.
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                Switch between list and calendar views. Your complete sea service history, always at hand and ready to export. Each entry includes vessel name, dates, duration, and route.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Add entries manually or let AIS do the work. Entries are tagged by service type (seagoing, watchkeeping, standby, or yard) so your MCA records are always accurate.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "List", sub: "View" },
                  { value: "Calendar", sub: "View" },
                  { value: "Notes", sub: "Per voyage" },
                ].map((item) => (
                  <div key={item.value} className="bg-bg2 border border-white/8 p-4 text-center">
                    <h3 className="text-sm font-semibold text-white">{item.value}</h3>
                    <p className="text-xs text-muted mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center py-16 lg:py-0 gap-4 px-8">
            <PhoneMockup src="/images/seatime/IMG_0595.PNG" alt="SeaTime Tracker - Logbook list view" />
            <PhoneMockup src="/images/seatime/IMG_0596.PNG" alt="SeaTime Tracker - Logbook calendar view" className="hidden sm:block mt-12" />
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* REPORTS */}
      <section className="bg-bg1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center py-16 lg:py-0 px-8 lg:order-1">
            <PhoneMockup src="/images/seatime/IMG_1660.PNG" alt="SeaTime Tracker - PDF and CSV reports" />
          </div>
          <div className="flex items-center px-8 py-20 lg:px-16 lg:py-24 lg:order-2">
            <div className="max-w-lg">
              <SectionLabel>MCA Compliant</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
                Report ready. Always.
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                Export MCA-compliant sea service testimonials as PDF or CSV in a single tap, ready for your RYA or MCA application. No manual tallying, no formatting required.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Reports break down your sea time by vessel and by service type: actual sea service, watchkeeping, standby, and yard. Exactly as the MCA requires.
              </p>
              <div className="bg-bg2 border border-white/8 p-5">
                <p className="text-xs text-muted/50 uppercase tracking-widest mb-4">Sea time by service type</p>
                <div className="space-y-3">
                  {[
                    { type: "Actual Sea Service", days: 6 },
                    { type: "Watchkeeping Service", days: 2 },
                    { type: "Stand-by Service", days: 0 },
                    { type: "Yard Service", days: 0 },
                  ].map((row) => (
                    <div key={row.type} className="flex items-center justify-between">
                      <span className="text-sm text-muted">{row.type}</span>
                      <span className={`text-sm font-semibold ${row.days > 0 ? "text-accent" : "text-muted/30"}`}>{row.days}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* REVIEW */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <SectionLabel>One-tap Review</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
                Confirm. Or reject.
              </h2>
              <p className="text-muted leading-relaxed mb-5 max-w-lg">
                Daily reminders keep your logbook accurate and MCA-ready. When AIS detects that your vessel has moved, a pending entry is created with the date, duration, start and end positions, and a description of the passage.
              </p>
              <p className="text-muted leading-relaxed mb-8 max-w-lg">
                Review the entry and approve or decline with a single tap. Notifications are sent at 18:00 local time, only when there are pending entries to review.
              </p>
              <div className="flex gap-4">
                <div className="bg-green/10 border border-green/20 px-5 py-3 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="text-green text-sm font-semibold">Confirm</span>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 px-5 py-3 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 4l6 6M10 4l-6 6" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" /></svg>
                  <span className="text-red-400 text-sm font-semibold">Reject</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 flex justify-center">
              <PhoneMockup src="/images/seatime/IMG_0598.PNG" alt="SeaTime Tracker - Review and confirm entries" />
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* PRICING */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="rgba(30,155,255,0.12)" size={600} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>Simple Pricing</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-light text-white mb-2 leading-tight">
                £4.99<span className="text-2xl font-medium text-muted">/month</span>
              </h2>
              <p className="text-muted leading-relaxed mb-10 max-w-md">
                Every feature included. No hidden fees. Cancel anytime.
              </p>
              <ButtonPrimary href="https://apps.apple.com" className="gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download on the App Store
              </ButtonPrimary>
            </div>
            <div className="bg-bg2 border border-white/8 p-8">
              <p className="text-xs text-muted/50 uppercase tracking-widest mb-6">Everything included</p>
              <div className="space-y-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green/15 border border-green/30 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-sm text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
