"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Glow, HorizonLine, SectionLabel, ButtonPrimary } from "@/components/ui";

const services = [
  {
    title: "Race Weather Routing",
    description: "Pre-race forecasting, daily strategic briefings and live routing support for inshore and offshore racing programmes. From windward-leeward fleets to multi-day offshore classics.",
    items: [
      "Strategic pre-race forecast and routing scenarios",
      "Daily morning briefings tailored to course and fleet",
      "Live routing updates during the race via satellite or shore comms",
      "Course-specific local effects analysis (sea breeze, gradient interaction, current)",
      "Post-race weather review and decision audit",
    ],
  },
  {
    title: "Offshore & Ocean Crossings",
    description: "Strategic routing and continuous monitoring for transatlantic, transpacific and global passages. From cruising yachts and superyachts to record attempts and rally fleets.",
    items: [
      "Departure window analysis and weather risk assessment",
      "Optimal route generation using GFS, ECMWF and high-resolution models",
      "Daily routing updates throughout the passage, sized for limited bandwidth",
      "Tropical system monitoring and avoidance routing",
      "24/7 contact for severe weather and significant routing changes",
    ],
  },
  {
    title: "Delivery & Repositioning",
    description: "Practical, efficient routing for yacht deliveries, owner trips and seasonal repositioning. Schedule-driven support that keeps captain and shore team aligned.",
    items: [
      "Departure window planning and route optimisation",
      "Periodic updates as conditions evolve",
      "Port arrival and departure timing briefings",
      "Coordination with captain, shore team and management",
      "Concise, actionable formats designed for at-sea use",
    ],
  },
  {
    title: "Performance Analysis & Debrief",
    description: "Data-driven post-event review combining weather, polars and actual routing decisions. Identifies where time was gained and lost relative to optimum routing.",
    items: [
      "Reconstructed weather and current conditions across the course",
      "Polar performance vs target analysis",
      "Routing decision review with hindsight overlay",
      "Manoeuvre and sail-change timing assessment",
      "Structured report for owner, captain, navigator and crew",
    ],
  },
];

const fleets = [
  "IMOCA offshore campaigns",
  "Superseries grand prix fleet",
  "Maxi and supermaxi racing programmes",
  "IRC and ORC offshore campaigns",
  "Performance cruising yachts",
  "Superyacht offshore passages",
  "Record attempts and ocean crossings",
];

const methodology = [
  {
    title: "Accurate Polars",
    description: "A weather forecast is only as useful as the boat performance data it is applied to. We work with your team to build, validate and tune your polars so routing reflects your boat's actual capability, not theoretical assumptions. This is the single biggest determinant of routing accuracy.",
  },
  {
    title: "High-Resolution Forecasting",
    description: "Standard global models (GFS, ECMWF) offer broad strokes at coarse grid scales. We supplement these with high-resolution mesoscale models, sea breeze modelling and local observation feeds to deliver forecasting that captures the small-scale features which decide races and shape passages.",
  },
  {
    title: "Multi-Model Comparison",
    description: "No single model is right all the time. We run side-by-side comparison of GFS, ECMWF, ICON and proprietary feeds, weighting them based on regional skill scores and recent performance. The result is a more robust picture than any single source can provide.",
  },
  {
    title: "Sailor's Interpretation",
    description: "Numerical models cannot replace experience at sea. Steve has campaigned at the front of competitive fleets and brings the navigator's perspective to every briefing, translating model output into clear, actionable routing decisions.",
  },
];

const faqs = [
  {
    q: "When should we engage a weather router?",
    a: "For races, ideally one to two weeks before the start so we can familiarise ourselves with the boat, polars and crew. For ocean crossings, three to four weeks ahead allows time for departure window analysis. For deliveries, a few days notice is usually enough. The earlier we are involved, the better the outcome.",
  },
  {
    q: "Do you work with our existing navigator and team?",
    a: "Yes. Our role is to support your navigator, captain and crew, not replace them. We work as part of your shore team, integrating with your existing tools and decision-making process.",
  },
  {
    q: "What software and data sources do you use?",
    a: "We use industry-standard routing software including Expedition and Adrena, drawing on GFS, ECMWF, ICON, AROME and high-resolution mesoscale models. We also run proprietary tooling developed for performance analysis.",
  },
  {
    q: "Can you support a one-off race or do you only offer season-long packages?",
    a: "Both. We support one-off events, multi-race series, full racing seasons, individual ocean crossings and ongoing offshore programmes. Engagements are scoped to suit.",
  },
  {
    q: "Do you provide briefings in formats suitable for limited bandwidth at sea?",
    a: "Yes. We deliver condensed text briefings sized for satellite email, alongside richer formats for shore-side review. Format and frequency are agreed at the start of every engagement.",
  },
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
                "Professional marine weather routing and forecasting services for racing yachts, offshore crossings and superyacht passages.",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
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
            src="/images/weather-routing-hero.jpg"
            alt="Maxi yacht fleet departing Malta for offshore race"
            fill
            sizes="100vw"
            className="object-cover object-[center_70%] opacity-55 saturate-[1.1] scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/40 via-bg0/30 to-bg0" />
        </div>
        <Glow className="-top-40 -right-40 opacity-30" />
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent">Tools & Services</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Marine meteorology and<br />weather routing
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              Professional weather forecasting and routing for racing campaigns, offshore passages and superyacht deliveries worldwide. Led by Steve Carver, our resident meteorologist and weather routing specialist.
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
              Weather is the single biggest variable in any race or offshore
              voyage. The difference between a good forecast and a great one,
              measured against polars and routing software, can be hours
              saved on a delivery, places gained in a race, or a serious
              weather system avoided altogether.
            </p>
            <p className="text-muted leading-relaxed mb-5">
              Modern routing software is only as good as the inputs it
              receives. The forecasts, the polar data, and the human
              interpretation of both. Get any of those wrong and the routing
              output is no better than guesswork. Get them right and the
              advantage is consistent and significant.
            </p>
            <p className="text-muted leading-relaxed">
              Our service combines trained meteorology, offshore sailing
              experience and proven routing tools. Steve Carver works directly
              with skippers and navigators across IMOCA campaigns, the
              Superseries and Maxi Regattas, alongside offshore passages and
              ocean crossings, providing the kind of personal, responsive
              service that automated routing platforms cannot match.
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

      {/* METHODOLOGY */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg1 overflow-hidden">
        <Glow className="-bottom-40 -left-40 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14" data-animate="fade-up">
            <SectionLabel>Methodology</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              The four pillars of accurate routing
            </h2>
            <p className="text-muted leading-relaxed">
              Reliable weather routing depends on getting four things right.
              Drop any one of them and the output suffers. Our approach
              addresses all four with equal rigour.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-animate-stagger>
            {methodology.map((item, i) => (
              <div key={item.title} className="bg-bg2 border border-white/8 p-8" data-animate="fade-up">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-xs font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* WHO WE WORK WITH */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
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
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg1 overflow-hidden">
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
                Offshore sailor and trained meteorologist
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Steve has worked with multiple IMOCAs in the past (Ari Huusela
                Ocean Racing, Rosalba (ex Artemis), and short term work on a
                few others). He works with cruising and racing yachts in
                circuits such as the Superseries and Maxi Regattas.
              </p>
              <p className="text-muted leading-relaxed">
                He does a lot of historical weather routing and climatology
                studies to aid skippers and navigators as well as forecasting
                and routing, bringing in educational aspects to build knowledge
                of practical yachting meteorology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12" data-animate="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-6" data-animate-stagger>
            {faqs.map((faq) => (
              <div key={faq.q} className="border-l-2 border-accent/40 pl-6" data-animate="fade-up">
                <h3 className="text-base font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
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
