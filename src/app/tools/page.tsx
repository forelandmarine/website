"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/ui";

export default function ToolsPage() {
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
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.forelandmarine.com" },
              { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.forelandmarine.com/tools" },
            ],
          }),
        }}
      />

      <section ref={heroRef} className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-bg0">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Image src="/images/yacht-management.jpg" alt="Sailing yacht under way at sea" fill sizes="100vw" className="object-cover opacity-45 saturate-[1.15] scale-110" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/45 via-bg0/25 to-bg0" />
        </div>
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionLabel>Digital Products</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6">
              Tools built for the marine industry.
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              Purpose-built digital products designed for yacht crews, owners, and managers. Saving time and ensuring compliance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Link href="/tools/seatime-tracker" className="group block">
              <div className="bg-bg2/80 border border-white/10 overflow-hidden h-full hover:border-accent/40 transition-colors">
                <div className="p-8">
                  <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-4">AIS Powered</p>
                  <h2 className="text-2xl font-light text-white mb-3 group-hover:text-accent transition-colors">SeaTime Tracker</h2>
                  <p className="text-muted leading-relaxed mb-6">
                    The last logbook you&apos;ll fill in by hand. Automatically detects and logs your sea time via AIS. No manual entry, no paperwork, fully MCA-compliant.
                  </p>
                  <div className="flex items-center gap-1.5 text-sm text-accent font-medium">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/tools/lightship-ism" className="group block">
              <div className="bg-bg2/80 border border-white/10 overflow-hidden h-full hover:border-accent/40 transition-colors">
                <div className="p-8">
                  <p className="text-xs text-muted font-semibold uppercase tracking-widest mb-4">Fleet Management</p>
                  <h2 className="text-2xl font-light text-white mb-3 group-hover:text-accent transition-colors">Lightship ISM</h2>
                  <p className="text-muted leading-relaxed mb-6">
                    Yacht administration, but a bit clever. Streamline your workflow with ISM compliance, incident reporting, and AIS sea service records in one clear interface.
                  </p>
                  <div className="flex items-center gap-1.5 text-sm text-accent font-medium">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/tools/pms-database" className="group block">
              <div className="bg-bg2/80 border border-white/10 overflow-hidden h-full hover:border-accent/40 transition-colors">
                <div className="p-8">
                  <p className="text-xs text-muted font-semibold uppercase tracking-widest mb-4">Maintenance</p>
                  <h2 className="text-2xl font-light text-white mb-3 group-hover:text-accent transition-colors">PMS Database</h2>
                  <p className="text-muted leading-relaxed mb-6">
                    Expert PMS database setup, licensing, and on-site population. Authorised DeepBlue agents, with experience across IDEA, SeaHub, Aquator and more.
                  </p>
                  <div className="flex items-center gap-1.5 text-sm text-accent font-medium">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/tools/debrief" className="group block">
              <div className="bg-bg2/80 border border-white/10 overflow-hidden h-full hover:border-accent/40 transition-colors">
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-xs text-accent font-semibold uppercase tracking-widest">Race Intelligence</p>
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-bg0 bg-accent/80 px-1.5 py-0.5 rounded">Alpha</span>
                  </div>
                  <h2 className="text-2xl font-light text-white mb-3 group-hover:text-accent transition-colors">Debrief</h2>
                  <p className="text-muted leading-relaxed mb-6">
                    AI-powered race analysis. Telemetry, video, weather, crew positioning and comms unified on a single timeline for post-race performance review and crew debriefs.
                  </p>
                  <div className="flex items-center gap-1.5 text-sm text-accent font-medium">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/tools/weather-routing" className="group block">
              <div className="bg-bg2/80 border border-white/10 overflow-hidden h-full hover:border-accent/40 transition-colors">
                <div className="p-8">
                  <p className="text-xs text-muted font-semibold uppercase tracking-widest mb-4">Weather Routing</p>
                  <h2 className="text-2xl font-light text-white mb-3 group-hover:text-accent transition-colors">Meteorology & Routing</h2>
                  <p className="text-muted leading-relaxed mb-6">
                    Marine meteorology and weather routing for races, ocean crossings and superyacht deliveries. In partnership with OrcaMet, founded by Steve Carver.
                  </p>
                  <div className="flex items-center gap-1.5 text-sm text-accent font-medium">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/tools/running-cost-calculator" className="group block">
              <div className="bg-bg2/80 border border-white/10 overflow-hidden h-full hover:border-accent/40 transition-colors">
                <div className="p-8">
                  <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-4">Ownership Planning</p>
                  <h2 className="text-2xl font-light text-white mb-3 group-hover:text-accent transition-colors">Running Cost Calculator</h2>
                  <p className="text-muted leading-relaxed mb-6">
                    Estimate the annual operating costs of a superyacht. Enter yacht length, type, and cruising area for a detailed breakdown of crew, insurance, fuel, marina fees and more.
                  </p>
                  <div className="flex items-center gap-1.5 text-sm text-accent font-medium">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
