"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Glow, HorizonLine, SectionLabel, ButtonPrimary } from "@/components/ui";

const services = [
  {
    title: "Race Weather Routing",
    description: "Pre-race forecasting, daily weather briefings and live routing support for inshore and offshore racing programmes. Tailored to TP52, Cape 31, IRC, ORC and Maxi fleets.",
    items: [
      "Strategic pre-race forecast and routing options",
      "Daily morning briefings tailored to course and fleet",
      "Live routing updates during the race",
      "Post-race weather review and analysis",
    ],
  },
  {
    title: "Offshore & Ocean Crossings",
    description: "Strategic routing and continuous monitoring for transatlantic, transpacific and global passages on yachts of all types. From rallies to record attempts.",
    items: [
      "Departure window analysis and weather risk assessment",
      "Optimal route generation using GFS, ECMWF and proprietary models",
      "Daily routing emails throughout the passage",
      "24/7 emergency contact for severe weather",
    ],
  },
  {
    title: "Delivery Routing",
    description: "Practical, efficient routing for yacht deliveries, owner trips and seasonal repositioning. Cost-effective support to keep schedules on track and crews safe.",
    items: [
      "Route planning with weather windows identified",
      "Periodic updates as conditions evolve",
      "Port arrival and departure briefings",
      "Coordination with captain and shore team",
    ],
  },
  {
    title: "Performance Analysis",
    description: "Data-driven post-event review combining weather, polars and routing decisions. Identifies where time was gained and lost relative to optimum routing.",
    items: [
      "Reconstructed weather and current conditions",
      "Polar performance vs target analysis",
      "Routing decision review with hindsight overlay",
      "Structured report for owner, captain and crew",
    ],
  },
];

const fleets = [
  "TP52 racing fleet",
  "Cape 31 racing fleet",
  "Maxi and supermaxi programmes",
  "IRC and ORC offshore campaigns",
  "Performance cruising yachts",
  "Superyacht offshore passages",
];

export default function WeatherRoutingPage() {
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
              "@type": "Service",
              serviceType: "Marine Weather Routing and Forecasting",
              provider: {
                "@type": "Organization",
                name: "Foreland Marine Consultancy Ltd",
              },
              areaServed: "Worldwide",
              description:
                "Professional marine weather routing and forecasting services for racing yachts, offshore crossings and superyacht passages, in partnership with OrcaMet.",
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://forelandmarine.com" },
                { "@type": "ListItem", position: 2, name: "Tools", item: "https://forelandmarine.com/tools" },
                { "@type": "ListItem", position: 3, name: "Weather Routing", item: "https://forelandmarine.com/tools/weather-routing" },
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
          <Image
            src="/images/yacht-management.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-40 saturate-[1.15] scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/40 via-bg0/20 to-bg0" />
        </div>
        <Glow className="-top-40 -right-40 opacity-30" />
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <SectionLabel>Tools & Services</SectionLabel>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent border border-accent/40 px-2 py-0.5 rounded">In Partnership with OrcaMet</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Weather routing<br />for races and crossings
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              Professional marine meteorology and weather routing for racing campaigns, offshore passages and superyacht deliveries. Provided in partnership with OrcaMet, founded by Steve Carver, our resident meteorologist and weather routing specialist.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* OVERVIEW */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg1 overflow-hidden">
        <Glow className="top-20 right-0 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14" data-animate="fade-up">
            <SectionLabel>Why Weather Routing</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Better decisions, faster passages, safer voyages
            </h2>
            <p className="text-muted leading-relaxed mb-5">
              Weather is the single biggest variable in any offshore voyage or
              race. The difference between a good forecast and a great one
              measured against polars and routing software can be hours saved
              on a delivery, places gained in a race, or a serious weather
              system avoided altogether.
            </p>
            <p className="text-muted leading-relaxed">
              Our service combines academic meteorology, hands-on yacht
              performance experience and proven routing tools. Steve Carver
              works directly with captains and navigators on TP52 and Cape 31
              fleets, alongside offshore campaigns and ocean crossings,
              providing the kind of personal, responsive service that
              automated routing platforms cannot match.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* SERVICES */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14" data-animate="fade-up">
            <SectionLabel>Services</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Tailored to the programme
            </h2>
            <p className="text-muted leading-relaxed">
              Every yacht and every passage is different. We work directly with
              captains, navigators and owners to scope the right level of
              support for the campaign or voyage at hand.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-animate-stagger>
            {services.map((service) => (
              <div key={service.title} className="bg-bg2 border border-white/8 p-8" data-animate="fade-up">
                <h3 className="text-base font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-5">{service.description}</p>
                <ul className="space-y-2.5">
                  {service.items.map((item) => (
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

      {/* WHO WE WORK WITH */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg1 overflow-hidden">
        <Glow className="-bottom-40 -left-40 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div data-animate="slide-right">
              <SectionLabel>Who We Work With</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
                From grand prix racing to global voyages
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                Our weather routing service is built around the realities of
                competitive sailing and serious offshore work. Steve Carver
                provides forecasting and routing across a range of programmes,
                from one-design fleets to bluewater superyacht passages.
              </p>
              <p className="text-muted leading-relaxed">
                Whether you need a one-off pre-departure briefing or ongoing
                support across an entire racing season, we scope the engagement
                to suit.
              </p>
            </div>
            <div data-animate="slide-left">
              <ul className="space-y-4">
                {fleets.map((fleet) => (
                  <li key={fleet} className="flex items-start gap-4 border-l-2 border-accent/40 pl-5">
                    <span className="text-sm text-white">{fleet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* MEET STEVE */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <Glow className="top-20 right-0 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div data-animate="fade-up">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-white/10">
                <Image
                  src="/images/team-steve.jpg"
                  alt="Steve Carver"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-2" data-animate="fade-up">
              <SectionLabel>Meet Steve Carver</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
                Meteorologist, sailor, founder of OrcaMet
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Steve is a marine meteorologist and data performance engineer.
                He is the founder of{" "}
                <a href="https://orcamet.co.uk" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition-colors underline">OrcaMet</a>{" "}
                and works with{" "}
                <a href="https://mlctechnologies.co.uk" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition-colors underline">MLC Technologies</a>{" "}
                as a data performance engineer. He provides weather routing and
                performance analysis services to TP52 and Cape 31 racing fleets
                as well as vessels on offshore passages.
              </p>
              <p className="text-muted leading-relaxed">
                Steve holds a BSc in Marine Science from the University of East
                Anglia and an FdSc in Operational Yacht Science from UKSA,
                combining academic rigour with practical experience at sea.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg1 overflow-hidden">
        <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" size={600} />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center" data-animate="fade-up">
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-5">
            Plan your next voyage
          </h2>
          <p className="text-muted leading-relaxed text-base mb-8 max-w-xl mx-auto">
            Whether you have a race coming up, an ocean crossing on the
            horizon, or a delivery on the schedule, we would be glad to discuss
            how we can support you.
          </p>
          <ButtonPrimary href="/contact">Get in touch</ButtonPrimary>
        </div>
      </section>
    </>
  );
}
