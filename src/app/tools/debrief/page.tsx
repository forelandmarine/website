import type { Metadata } from "next";
import Image from "next/image";
import { Glow, HorizonLine, SectionLabel, ButtonPrimary } from "@/components/ui";

export const metadata: Metadata = {
  title: "Debrief: Race Intelligence Dashboard",
  description:
    "AI-powered race analysis and crew debrief platform. Combines telemetry, video, weather, AIS tracking, crew positioning and comms into a unified timeline for post-race performance review.",
  robots: { index: true, follow: true },
};

const dataInputs = [
  {
    title: "Telemetry & Performance",
    items: [
      "B&G WTP telemetry and data dumps",
      "Expedition / TimeZero data capture",
      "Polar targets and VMG analysis",
      "Loadcell and rigging data",
      "Sail sensor data",
    ],
  },
  {
    title: "Positioning & Tracking",
    items: [
      "GPS and AIS vessel tracking",
      "YellowBrick race tracking integration",
      "Crew deck positioning via wearable trackers",
      "Fleet position and competitor analysis",
    ],
  },
  {
    title: "Weather Intelligence",
    items: [
      "Windy and local observation feeds",
      "Onboard weather station data",
      "GRIB file import and overlay",
      "Synoptic chart integration",
    ],
  },
  {
    title: "Audio, Video & Comms",
    items: [
      "Multi-camera video capture (bow, helm, mast, stern)",
      "Nav station audio recording",
      "Deck and onboard comms capture",
      "Manoeuvre calls and sail change orders tracked",
    ],
  },
];

export default function DebriefPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Debrief",
            applicationCategory: "Sports Analysis Software",
            description: metadata.description,
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/PreOrder",
              description: "Currently in alpha. Register interest for early access.",
            },
            provider: {
              "@type": "Organization",
              name: "Foreland Marine Consultancy Ltd",
            },
          }),
        }}
      />

      {/* HERO */}
      <section className="relative py-36 overflow-hidden bg-bg0">
        <Glow className="-top-20 -right-20 opacity-40" size={700} />
        <Glow className="bottom-0 -left-40 opacity-20" color="rgba(30,100,180,0.2)" size={600} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <SectionLabel>Tools</SectionLabel>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-bg0 bg-accent/80 px-2 py-0.5 rounded">Alpha</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-light text-white mb-6 leading-tight">
              Race intelligence,<br />frame by frame.
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              Debrief is an AI-powered race analysis platform that unifies every data source on board into a single, synchronised timeline. Telemetry, video, weather, crew positioning, comms and competitor tracking, all analysed together to find the competitive edge that raw data alone cannot reveal.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* DASHBOARD SCREENSHOT */}
      <section className="py-20 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[16px] border-[6px] border-[#2a2a2e] bg-[#1a1a1e] p-1 shadow-2xl shadow-black/40 overflow-hidden">
            <div className="overflow-hidden rounded-[10px]">
              <Image
                src="/images/debrief-dashboard.png"
                alt="Debrief race intelligence dashboard showing telemetry, video feeds, course map, crew positions and race analysis"
                width={2880}
                height={1600}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
          <p className="text-center text-xs text-muted/50 mt-4">Debrief dashboard with sample race data</p>
        </div>
      </section>

      <HorizonLine />

      {/* CONCEPT */}
      <section className="relative py-24 bg-bg0 overflow-hidden">
        <Glow className="top-20 right-0 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <SectionLabel>The Concept</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Every moment of the race, connected
            </h2>
            <p className="text-muted leading-relaxed mb-5">
              Top-level sport has long used multi-source data analysis to find marginal gains. Formula 1 teams review thousands of data channels synchronised to video. Premier League clubs analyse player positioning frame by frame. Debrief brings that same approach to competitive sailing.
            </p>
            <p className="text-muted leading-relaxed">
              Instead of reviewing telemetry in one tool, video in another, and relying on memory for everything in between, Debrief synchronises every data source to a single race timeline. Our LLM analysis engine then identifies patterns, flags anomalies and surfaces insights that would take hours to find manually. The result is a movie-style playback of the entire race, with every data point linked to every moment.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* DATA INPUTS */}
      <section className="py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <SectionLabel>Data Sources</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Every sensor, every signal, one timeline
            </h2>
            <p className="text-muted leading-relaxed">
              Debrief ingests data from every system on board and ashore, synchronising it to a single race clock. Nothing is siloed, nothing is missed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dataInputs.map((group) => (
              <div key={group.title} className="bg-bg0 border border-white/8 p-8">
                <h3 className="text-base font-semibold text-white mb-4">{group.title}</h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* AI ANALYSIS */}
      <section className="relative py-24 bg-bg0 overflow-hidden">
        <Glow className="-bottom-40 -left-40 opacity-20" color="rgba(30,100,180,0.15)" size={500} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionLabel>AI Analysis</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
                LLM-powered race review
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                Debrief uses large language model analysis to process the full race dataset and generate structured, actionable insights. The system identifies correlations across data sources that manual review would miss.
              </p>
              <div className="space-y-4">
                <div className="border-l-2 border-accent/40 pl-5">
                  <h3 className="text-sm font-semibold text-white mb-1">Manoeuvre Analysis</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    Every tack, gybe, mark rounding and sail change is identified, timed and scored. Comms audio is transcribed and linked to the manoeuvre, so you can review what was called, when it was executed, and what the data shows.
                  </p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h3 className="text-sm font-semibold text-white mb-1">Crew Performance</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    Deck positioning data is overlaid with manoeuvre timing to assess crew choreography and identify bottlenecks. Who was where, when, and how did it affect execution speed.
                  </p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h3 className="text-sm font-semibold text-white mb-1">Competitive Edge</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    Fleet position data is cross-referenced with your own telemetry and weather to pinpoint where gains and losses occurred relative to competitors. Leg by leg, manoeuvre by manoeuvre.
                  </p>
                </div>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h3 className="text-sm font-semibold text-white mb-1">Structured Debrief Reports</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    AI-generated debrief summaries with key moments, decision points and recommendations. Designed for crew briefings, campaign review, and coaching sessions.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-bg1 border border-white/8 p-8 rounded">
              <h3 className="text-sm font-semibold text-accent uppercase tracking-widest mb-6">Sample Analysis Output</h3>
              <div className="space-y-4 font-mono text-xs">
                <div className="text-muted/70">
                  <span className="text-accent">00:14:32</span> Tack #3 (port to stbd)
                </div>
                <div className="text-muted/50 pl-4 border-l border-white/5">
                  Duration: 8.0s &middot; Tack loss: 1.2 boatlengths<br />
                  Polar recovery: 4.8s to target<br />
                  Helm call at 00:14:28, sheet release at 00:14:31<br />
                  3s delay between call and execution<br />
                  Crew positions: pit late to loaded sheet by 1.5s<br />
                  <span className="text-accent/80">Recommendation: pre-load during approach</span>
                </div>
                <div className="text-muted/70">
                  <span className="text-accent">00:22:15</span> Gybe #1 at WM2
                </div>
                <div className="text-muted/50 pl-4 border-l border-white/5">
                  Duration: 5.5s &middot; Gybe loss: 0.8 boatlengths<br />
                  Clean execution, within target range<br />
                  Gained 12s on RIVAL 3 through mark<br />
                  <span className="text-accent/80">No action required</span>
                </div>
                <div className="text-muted/70">
                  <span className="text-accent">00:35:40</span> Sail change: J3 to J2
                </div>
                <div className="text-muted/50 pl-4 border-l border-white/5">
                  TWS increased 11.2 to 14.8 kts over 8 min<br />
                  Change initiated 3 min after optimal window<br />
                  Lost est. 45s to fleet during transition<br />
                  <span className="text-accent/80">Recommendation: trigger at 13.5 kts TWS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* EARLY ACCESS CTA */}
      <section className="relative py-24 bg-bg1 overflow-hidden">
        <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" size={600} />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block text-[10px] font-semibold uppercase tracking-widest text-bg0 bg-accent/80 px-2 py-0.5 rounded mb-5">
            Alpha
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-5">
            Currently in development
          </h2>
          <p className="text-muted leading-relaxed text-base mb-8 max-w-xl mx-auto">
            Debrief is in active alpha development with a select group of racing programmes. If you run a competitive sailing campaign and want to explore how AI-powered race analysis could sharpen your performance, get in touch.
          </p>
          <ButtonPrimary href="/contact">Register interest</ButtonPrimary>
        </div>
      </section>
    </>
  );
}
