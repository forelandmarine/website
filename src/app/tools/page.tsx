import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/ui";
import ParallaxHero from "@/components/ParallaxHero";

export default function ToolsPage() {

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

      <ParallaxHero
        imageSrc="/images/yacht-management.jpg"
        imageAlt="Sailing yacht under way at sea"
        imageClassName="object-cover opacity-45 saturate-[1.15] scale-110"
        gradientClassName="bg-gradient-to-b from-bg0/45 via-bg0/25 to-bg0"
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
                  <p className="text-muted leading-relaxed">
                    The last logbook you&apos;ll fill in by hand. Automatically detects and logs your sea time via AIS. No manual entry, no paperwork, fully MCA-compliant.
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/tools/lightship-ism" className="group block">
              <div className="bg-bg2/80 border border-white/10 overflow-hidden h-full hover:border-accent/40 transition-colors">
                <div className="p-8">
                  <p className="text-xs text-muted font-semibold uppercase tracking-widest mb-4">Fleet Management</p>
                  <h2 className="text-2xl font-light text-white mb-3 group-hover:text-accent transition-colors">Lightship ISM</h2>
                  <p className="text-muted leading-relaxed">
                    Yacht administration, but a bit clever. Streamline your workflow with ISM compliance, incident reporting, and AIS sea service records in one clear interface.
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/tools/pms-database" className="group block">
              <div className="bg-bg2/80 border border-white/10 overflow-hidden h-full hover:border-accent/40 transition-colors">
                <div className="p-8">
                  <p className="text-xs text-muted font-semibold uppercase tracking-widest mb-4">Maintenance</p>
                  <h2 className="text-2xl font-light text-white mb-3 group-hover:text-accent transition-colors">PMS Database</h2>
                  <p className="text-muted leading-relaxed">
                    Expert PMS database setup, licensing, and on-site population. Authorised DeepBlue agents, with experience across IDEA, SeaHub, Aquator and more.
                  </p>
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
                  <p className="text-muted leading-relaxed">
                    AI-powered race analysis. Telemetry, video, weather, crew positioning and comms unified on a single timeline for post-race performance review and crew debriefs.
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/tools/weather-routing" className="group block">
              <div className="bg-bg2/80 border border-white/10 overflow-hidden h-full hover:border-accent/40 transition-colors">
                <div className="p-8">
                  <p className="text-xs text-muted font-semibold uppercase tracking-widest mb-4">Weather Routing</p>
                  <h2 className="text-2xl font-light text-white mb-3 group-hover:text-accent transition-colors">Meteorology & Routing</h2>
                  <p className="text-muted leading-relaxed">
                    Marine meteorology and weather routing for races, ocean crossings and superyacht deliveries. In partnership with OrcaMet, founded by Steve Carver.
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/tools/running-cost-calculator" className="group block">
              <div className="bg-bg2/80 border border-white/10 overflow-hidden h-full hover:border-accent/40 transition-colors">
                <div className="p-8">
                  <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-4">Ownership Planning</p>
                  <h2 className="text-2xl font-light text-white mb-3 group-hover:text-accent transition-colors">Running Cost Calculator</h2>
                  <p className="text-muted leading-relaxed">
                    Estimate the annual operating costs of a superyacht. Enter yacht length, type, and cruising area for a detailed breakdown of crew, insurance, fuel, marina fees and more.
                  </p>
                </div>
              </div>
            </Link>
          </div>
      </ParallaxHero>
    </>
  );
}
