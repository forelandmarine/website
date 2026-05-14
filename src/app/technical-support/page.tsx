"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HorizonLine, SectionLabel, ButtonPrimary, ServiceCard } from "@/components/ui";
import {
  TIER_NAMES,
  TIER_PRICES_MONTHLY,
  TIER_PRICES_ANNUAL,
  type TierSlug,
  type BillingCycle,
} from "@/lib/technical-support";

type TierMeta = {
  slug: TierSlug;
  lines: string[];
  highlight?: boolean;
};

const tiers: TierMeta[] = [
  {
    slug: "standby",
    lines: [
      "Four on-call engineer hours per month.",
      "Worldwide parts sourcing and freight coordination.",
      "Annual planned maintenance system check.",
      "Emergency repair kit fitted onboard.",
    ],
  },
  {
    slug: "direct",
    highlight: true,
    lines: [
      "Twelve on-call engineer hours per month.",
      "Three hand-carries in Europe per year.",
      "One international hand-carry per year.",
      "Quarterly check-in.",
      "Everything in Standby.",
    ],
  },
  {
    slug: "captive",
    lines: [
      "Thirty on-call engineer hours per month.",
      "Five hand-carries in Europe per year.",
      "Two international hand-carries per year.",
      "Assigned lead engineer.",
      "Pre-passage audit.",
      "Everything in Direct.",
    ],
  },
];

const pmsItems = [
  {
    title: "Equipment, system by system.",
    body: "We walk the yacht with the engineering crew. Equipment hierarchy, running hours, manufacturer data, and serial numbers verified and brought current in the PMS.",
  },
  {
    title: "Compliance, ready for survey.",
    body: "LSA, FFE, and ISM critical equipment reviewed against class dates. Survey day arrives with the paperwork organised, the evidence ready, and the crew confident.",
  },
  {
    title: "Spares, ready for the season.",
    body: "Critical spares inventoried against the catalogue. The season starts with a clear picture of what is onboard, and a top-up list agreed in advance.",
  },
];

export default function TechnicalSupportPage() {
  const [scrollY, setScrollY] = useState(0);
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
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
              "@id": "https://forelandmarine.com/technical-support#service",
              name: "Yacht Technical Support",
              alternateName: [
                "Superyacht Technical Support",
                "Yacht Engineering Support",
                "Yacht Remote Support",
                "Yacht On Call Engineer",
              ],
              serviceType: "Yacht Technical Support",
              provider: {
                "@type": "Organization",
                name: "Foreland Marine Consultancy Ltd",
              },
              areaServed: "Worldwide",
              description:
                "An annual technical support programme for sailing and motor yachts over 24 metres. Senior engineers on call day and night, hand-carried parts, annual planned maintenance system check, emergency repair kit onboard.",
              offers: tiers.map((t) => ({
                "@type": "Offer",
                name: `${TIER_NAMES[t.slug]} programme`,
                priceCurrency: "GBP",
                price: TIER_PRICES_MONTHLY[t.slug].gbp,
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  price: TIER_PRICES_MONTHLY[t.slug].gbp,
                  priceCurrency: "GBP",
                  unitText: "MONTH",
                },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is included in the Foreland technical support programme?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Every tier includes the annual planned maintenance system check onboard, the emergency repair kit fitted to the engine room, and a single number reaching the same engineering team day and night. Higher tiers add monthly on-call engineer hours, hand-carried parts in Europe and internationally, an assigned lead engineer, and a pre-passage audit.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What size yachts is this for?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sailing and motor yachts over 24 metres. There is no upper length ceiling. The programme is built for yachts where the onboard crew is competent but isolated, and where the owner wants a standing technical team rather than relying on ad-hoc broker hours.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How does hand-carry work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "For parts under 23 kg, an engineer flies with the part as airline cabin baggage, meeting the yacht at the marina and handing the part over directly. Door-to-berth time is typically two days, instead of five to ten through commercial freight. For larger items, we coordinate sea or air freight with customs cleared in advance.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does Foreland fit the part once it arrives?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Standard delivery is to the engine room for the onboard crew to fit. Fitting by a Foreland engineer is available on request at our standard engineer rate.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How is the programme billed?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Monthly billing, GBP by default with EUR and USD available at indicative cross-rates. Annual term with thirty days' notice to leave. Parts billed at supplier cost plus a fixed handling fee. Hand-carry flights reimbursed by the owner. Overage on engineer hours billed at £125 per hour.",
                  },
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://forelandmarine.com" },
                { "@type": "ListItem", position: 2, name: "Technical Support", item: "https://forelandmarine.com/technical-support" },
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
            src="/images/ts-hero-yacht-night.jpg"
            alt="Sailing yacht at anchor in a moonlit cove"
            fill
            sizes="100vw"
            className="object-cover opacity-60 scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/70 via-bg0/40 to-bg0" />
        </div>
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              The team behind<br />your engineering team.
            </h1>
            <p className="text-lg text-[#8FBAD4] leading-relaxed max-w-2xl mb-8">
              An annual programme for sailing and motor yachts over 24 metres. A leading technical team on standby, ready to assist day or night. Your crew has the spares, tools and support they need to guarantee smooth sailing, no matter where you are in the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ButtonPrimary href="#programmes">See programmes</ButtonPrimary>
              <Link
                href="/technical-support/sign-up"
                className="inline-flex items-center justify-center border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded hover:bg-white/10 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMMES (pricing tiers) */}
      <section id="programmes" className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12" data-animate="fade-up">
            <SectionLabel>Programmes</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
              Three levels of cover
            </h2>
            <p className="text-muted leading-relaxed">
              Choose the level of cover the yacht needs. Monthly billing in GBP by default, with EUR and USD at indicative cross-rates. Annual term, thirty days&apos; notice to leave. Pay annually for the equivalent of two months free.
            </p>
          </div>

          {/* Billing cycle toggle */}
          <div className="flex justify-start mb-8">
            <div className="inline-flex border border-white/15">
              {(["monthly", "annual"] as BillingCycle[]).map((c) => {
                const active = cycle === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCycle(c)}
                    className={`px-5 py-2.5 text-sm font-semibold capitalize transition-colors ${
                      active
                        ? "bg-accent text-white"
                        : "text-muted hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {c}
                    {c === "annual" && (
                      <span className={`ml-2 text-[10px] uppercase tracking-widest ${active ? "text-white/80" : "text-accent"}`}>
                        2 months free
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-animate-stagger>
            {tiers.map((tier) => {
              const monthly = TIER_PRICES_MONTHLY[tier.slug];
              const annual = TIER_PRICES_ANNUAL[tier.slug];
              const isAnnual = cycle === "annual";
              return (
                <div
                  key={tier.slug}
                  data-animate="fade-up"
                  className={`relative bg-bg2 border border-white/8 flex flex-col p-8 ${
                    tier.highlight ? "ring-1 ring-accent/40" : ""
                  }`}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-70" />
                  {tier.highlight && (
                    <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-accent font-semibold">
                      Most chosen
                    </span>
                  )}
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                    {TIER_NAMES[tier.slug]}
                  </p>
                  <div className="mb-1">
                    <span className="text-4xl font-light text-white">
                      £{(isAnnual ? annual.gbp : monthly.gbp).toLocaleString()}
                    </span>
                    <span className="text-sm text-muted ml-2">
                      {isAnnual ? "per year" : "per month"}
                    </span>
                  </div>
                  <p className="text-sm text-muted/80 mb-1">
                    {isAnnual
                      ? `€${annual.eur.toLocaleString()} · $${annual.usd.toLocaleString()}`
                      : `€${monthly.eur.toLocaleString()} · $${monthly.usd.toLocaleString()}`}
                  </p>
                  {isAnnual && (
                    <p className="text-xs text-muted/60 mb-4">
                      vs £{(monthly.gbp * 12).toLocaleString()} on monthly billing
                    </p>
                  )}
                  {!isAnnual && <div className="mb-4" />}
                  <div className="h-px bg-white/10 mb-5" />
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {tier.lines.map((line, i) => (
                      <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
                        <span className="text-accent flex-shrink-0">·</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/technical-support/sign-up?tier=${tier.slug}&cycle=${cycle}`}
                    className="inline-flex items-center justify-center bg-accent text-white font-semibold text-sm px-6 py-3 rounded hover:bg-accent/90 transition-colors"
                  >
                    Sign up to {TIER_NAMES[tier.slug]}
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-muted/70 mt-6 leading-relaxed">
            EUR and USD shown at indicative cross-rates. Billed in GBP unless agreed otherwise. Parts billed at supplier cost plus a fixed handling fee. Hand-carry flights reimbursed by the owner. Overage on engineer hours billed at £125 per hour.
          </p>
        </div>
      </section>

      <HorizonLine />

      {/* INCLUDED IN EVERY TIER */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12" data-animate="fade-up">
            <SectionLabel>Included in every tier</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white">
              The same backbone, regardless of programme
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-animate-stagger>
            <ServiceCard
              data-animate="fade-up"
              title="Annual audit, onboard."
              description="One day onboard with the crew. Manuals, procedures, running hours, class dates, and spares verified and brought current. Findings in writing."
            />
            <ServiceCard
              data-animate="fade-up"
              title="Emergency repair kit."
              description="A small box of essentials, with everything you need to get home. Epoxy pipe repair, leak seal foam, fuel polish. The kit that buys you four hours. On us."
            />
            <ServiceCard
              data-animate="fade-up"
              title="One number, one team."
              description="From the first call you speak to the same people every time. No call centre, no three-way relay."
            />
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* CHARTER OPERATIONS */}
      <section className="bg-bg1">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-72 sm:h-96 lg:h-auto lg:min-h-[520px]">
            <Image
              src="/images/ts-engine-room.jpg"
              alt="Modern yacht engine room"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg1/40 lg:to-bg1/0" />
          </div>
          <div className="px-6 py-14 sm:px-10 sm:py-18 lg:px-14 lg:py-24 flex flex-col justify-center">
            <SectionLabel>Charter Operations</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">
              Ready when the owner is.
            </h2>
            <p className="text-muted leading-relaxed mb-5">
              A standing technical team for the yacht. We are on call around the clock, with the captain&apos;s number saved and the engine room already audited. The onboard crew always has a peer to call. The owner gets decisions, not delays.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Every vessel we support begins the season with a full audit of manuals, procedures, and spares. The yacht is prepared, the crew is confident. Through the season we are the technical line the engineers rely on, and the people the captain calls to source, freight, or sign for parts anywhere in the world.
            </p>

            <div className="border-t border-white/10 pt-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-5">
                Annual Planned Maintenance System Check
              </p>
              <div className="space-y-5">
                {pmsItems.map((item) => (
                  <div key={item.title} className="border-l-2 border-accent/40 pl-5">
                    <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* PARTS, ANYWHERE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12" data-animate="fade-up">
            <SectionLabel>Parts, anywhere</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
              Yachts do not break in convenient places.
            </h2>
            <p className="text-muted leading-relaxed">
              Hours matter when a yacht is down. We choose the route case by case: cabin baggage for parts under 23 kg, expedited air or sea freight for everything else. The people who source the part are the people who hand it over at the marina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-animate-stagger>
            {/* Hand-carry */}
            <div className="bg-bg1 border border-white/8 overflow-hidden" data-animate="fade-up">
              <div className="relative h-56 sm:h-64">
                <Image
                  src="/images/ts-parts-hand-carry.jpg"
                  alt="Aircraft at jet bridge, night"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-white mb-1">Hand-carry.</h3>
                <div className="w-10 h-0.5 bg-accent mb-5" />
                <p className="text-sm text-muted leading-relaxed">
                  Under 23 kg. Airline cabin baggage, met at the marina, signed and handed over. Two days door-to-berth on most routes, instead of five to ten through commercial freight.
                </p>
              </div>
            </div>

            {/* Full freight */}
            <div className="bg-bg1 border border-white/8 overflow-hidden" data-animate="fade-up">
              <div className="relative h-56 sm:h-64">
                <Image
                  src="/images/ts-parts-freight.jpg"
                  alt="Yard worker with heavy marine parts on pallets"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-white mb-1">Full freight.</h3>
                <div className="w-10 h-0.5 bg-accent mb-5" />
                <p className="text-sm text-muted leading-relaxed">
                  Anything larger: engines, pumps, generators. Sea or air freight, customs cleared in advance, delivered to the dock by the same team you called.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              From phone call to passerelle
            </p>
            <p className="text-sm text-muted leading-relaxed mb-2">
              Routine destinations: Palma, Antibes, Antigua, Auckland, Fort Lauderdale, Cape Town.
            </p>
            <p className="text-xs text-muted/70 leading-relaxed">
              Fitting on request, at our standard engineer rate. Otherwise delivered to the engine room for the onboard crew.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* FAQ - sr-only for SEO */}
      <section className="sr-only">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2>Frequently Asked Questions</h2>
          <details>
            <summary>What is included in the Foreland technical support programme?</summary>
            <p>Every tier includes the annual planned maintenance system check onboard, the emergency repair kit fitted to the engine room, and a single number reaching the same engineering team day and night. Higher tiers add monthly on-call engineer hours, hand-carried parts in Europe and internationally, an assigned lead engineer, and a pre-passage audit.</p>
          </details>
          <details>
            <summary>What size yachts is this for?</summary>
            <p>Sailing and motor yachts over 24 metres. There is no upper length ceiling.</p>
          </details>
          <details>
            <summary>How does hand-carry work?</summary>
            <p>For parts under 23 kg, an engineer flies with the part as airline cabin baggage, meeting the yacht at the marina and handing the part over directly. Door-to-berth time is typically two days.</p>
          </details>
          <details>
            <summary>Does Foreland fit the part once it arrives?</summary>
            <p>Standard delivery is to the engine room for the onboard crew to fit. Fitting by a Foreland engineer is available on request at our standard engineer rate.</p>
          </details>
          <details>
            <summary>How is the programme billed?</summary>
            <p>Monthly billing, GBP by default with EUR and USD available at indicative cross-rates. Annual term with thirty days&apos; notice to leave.</p>
          </details>
        </div>
      </section>

      <HorizonLine />

      {/* RELATED */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-muted">
          Related: <Link href="/yacht-management" className="text-accent hover:text-white transition-colors">Yacht Management</Link> · <Link href="/refit" className="text-accent hover:text-white transition-colors">Refit Project Management</Link> · <Link href="/tools/pms-database" className="text-accent hover:text-white transition-colors">PMS Database</Link>
        </p>
      </div>

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/ts-hero-yacht-night.jpg"
            alt="Yacht at anchor"
            fill
            sizes="100vw"
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-bg0/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Sign up</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-5">
            One phone number, day or night.
          </h2>
          <p className="text-muted leading-relaxed text-base mb-8 max-w-xl mx-auto">
            Five minutes of paperwork sets up the programme. After that, email the team with the issue or the part, and the response goes from there.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonPrimary href="/technical-support/sign-up">Sign up</ButtonPrimary>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded hover:bg-white/10 transition-colors"
            >
              Talk to us first
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
