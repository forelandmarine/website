"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HorizonLine, SectionLabel, ButtonPrimary, Glow } from "@/components/ui";

const disciplines = [
  {
    id: "racing",
    label: "Yacht Racing Performance",
    heading: "Built to win",
    intro:
      "Our racing consultants combine competitive sailing experience with engineering rigour to deliver measurable performance gains. Whether preparing for an offshore race, a grand prix circuit event, or a round-the-world campaign, we cover every detail.",
    image: { src: "/images/maxi-racing-ran.jpg", alt: "Maxi yacht Ran racing under full sail" },
    darkTint: true,
    items: [
      { title: "Performance Optimisation & CFD", body: "Vessel assessment covering sail trim, weight distribution, polar analysis, and speed targets. CFD-informed hydrodynamic analysis of hull, keel, and appendage design to identify drag sources and model improvements." },
      { title: "Rigging & Deck Hardware", body: "Rig tuning, load calculations, rod and wire rigging solutions, block and winch specification, running and standing rigging design for racing yachts." },
      { title: "Race Analysis & Data", body: "Post-race data review, competitor benchmarking, tactical debrief support, onboard instrumentation, sensor integration, and performance trend reporting across a season or campaign." },
      { title: "Race Logistics", body: "Campaign planning, freight and shipping coordination, entry management, on-site logistics, spare parts strategy, and crew travel." },
    ],
    imageRight: true,
  },
  {
    id: "hydraulic",
    label: "Hydraulic Design & PLC Control Systems",
    heading: "Precision control under load",
    intro:
      "We design, specify, and commission hydraulic systems and PLC control platforms for sailing and motor yachts. From deck machinery and sail handling to integrated control logic, we deliver systems built for reliability and performance.",
    image: { src: "/images/hydraulic-powerpack.png", alt: "Hydraulic power pack with valves and pressure gauges" },
    items: [
      { title: "Hydraulic Systems Design", body: "Hydraulic steering, sail handling, stabiliser systems, and deck machinery. Schematic design through to commissioning." },
      { title: "PLC Control Systems", body: "Programmable logic controller design, panel building, sensor integration, and control system commissioning for onboard hydraulic and mechanical systems." },
    ],
    imageRight: false,
  },
  {
    id: "nav-comms",
    label: "Navigation / Communication Systems",
    heading: "Connected and informed, wherever you are.",
    intro:
      "We specify, install, and commission navigation and communication systems for racing, cruising, and charter yachts. From coastal electronics to full offshore comms packages, we make sure the crew have the tools they need.",
    image: { src: "/images/nav-station-offshore.jpg", alt: "Navigator at the nav station aboard an offshore racing yacht" },
    items: [
      { title: "Navigation Systems", body: "ECDIS, chart plotter, AIS, radar, and sonar integration. System selection, wiring design, and crew training." },
      { title: "Communication Systems", body: "Satcom, SSB, VHF, and intercom systems. Offshore comms planning for racing and blue-water cruising." },
      { title: "Systems Integration", body: "NMEA 2000 / SeaTalk networks, B&G, Garmin, Furuno, Raymarine integration, and full system commissioning." },
    ],
    imageRight: true,
  },
  {
    id: "naval",
    label: "Naval Architecture",
    heading: "Design. Optimise. Build.",
    intro:
      "Our naval architecture services span the full design lifecycle, from concept drawings for new vessels to structural upgrades and performance optimisation of existing hulls. We work alongside established design offices or operate independently for owners seeking a single point of accountability.",
    image: { src: "/images/naval-3d-design.jpg", alt: "3D CAD renders of a schooner superyacht design" },
    vignette: true,
    items: [
      { title: "New Drawings", body: "Lines plans, general arrangement, structural drawings, stability documentation, and class submission packages for new build yachts." },
      { title: "Upgrades & Modifications", body: "Structural modifications, appendage redesign, keel changes, deck layout modifications, and post-refit drawing updates." },
      { title: "Performance Optimisation", body: "Hydrostatic and hydrodynamic analysis, resistance prediction, appendage optimisation, and stability assessment for existing vessels." },
    ],
    imageRight: false,
  },
  {
    id: "mechanical",
    label: "Mechanical Installation",
    heading: "The engineering beneath the waterline",
    intro:
      "From main engine installations to complex propulsion systems, our mechanical team manages specification, procurement oversight, installation supervision, and commissioning of all mechanical systems aboard motor and sailing yachts.",
    image: { src: "/images/yacht-engine-room.jpg", alt: "Twin engine installation aboard a Mangusta superyacht" },
    items: [
      { title: "Engines & Generators", body: "Main propulsion engine installation, generator sets, and exhaust system design for both new build and refit projects." },
      { title: "Watermakers", body: "Reverse osmosis system selection, installation, plumbing, and commissioning for offshore and coastal use." },
      { title: "Stabilisers", body: "Gyroscopic and fin stabiliser system specification, installation, and sea trial commissioning." },
      { title: "Propulsion Systems", body: "Shaft lines, CPP and FPP propellers, sail drives, pod drives, bow and stern thrusters, and gearbox selection." },
    ],
    imageRight: true,
  },
  {
    id: "av-it",
    label: "AV/IT & Automation",
    heading: "Intelligent integration",
    intro:
      "The modern superyacht is as much a technology platform as a vessel. We specify and oversee the integration of audio-visual, IT networking, and vessel automation systems to deliver seamless, reliable onboard experiences for owners and guests.",
    image: { src: "/images/patch-panel-blue-1.jpg", alt: "Blue ethernet cables plugged into a patch panel" },
    items: [
      { title: "Audio Visual", body: "Cinema rooms, multizone audio, outdoor entertainment, display systems, and sky lounge AV integration." },
      { title: "IT, Networking & Connectivity", body: "Structured cabling, managed switching, Wi-Fi planning, VLAN segmentation, firewalls, remote monitoring, Starlink, VSAT, 4G/5G bonding, and crew/guest network separation." },
      { title: "Automation", body: "Crestron, Lutron, Savant, and custom PLC-based systems for lighting, HVAC, blinds, access control, and bilge monitoring." },
    ],
    imageRight: false,
  },
];

export default function TechnicalConsultancyPage() {
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
              "@id": "https://www.forelandmarine.com/technical-consultancy#service",
              name: "Yacht Technical Consultancy",
              alternateName: [
                "Superyacht Technical Consultancy",
                "Yacht Racing Performance Consultancy",
                "Yacht Race Management",
                "Yacht Logistics",
                "Marine Technical Consultancy",
              ],
              serviceType: "Yacht Technical Consultancy",
              provider: {
                "@type": "Organization",
                name: "Foreland Marine Consultancy Ltd",
              },
              areaServed: "Worldwide",
              description:
                "Specialist yacht technical consultancy across yacht racing, race management, yacht logistics, hydraulic and PLC control systems, navigation and communication systems, naval architecture, mechanical installation, and AV/IT automation.",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What types of technical consultancy do you offer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We offer specialist consultancy across yacht racing performance, hydraulic and PLC control systems, navigation and communication systems, naval architecture, mechanical installation, and AV/IT automation. Each discipline is led by experienced engineers and technical specialists.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you provide consultancy for both sailing and motor yachts?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Our team has extensive experience with both sailing and motor yachts, from high-performance racing programmes and grand prix campaigns to explorer vessels and large motor yacht systems integration.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can you assist with regulatory compliance and surveys?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. We support owners and captains with MCA compliance, flag state requirements, classification society surveys, and statutory inspections. Our team can coordinate the full survey and certification process on your behalf.",
                  },
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.forelandmarine.com" },
                { "@type": "ListItem", position: 2, name: "Technical Consultancy", item: "https://www.forelandmarine.com/technical-consultancy" },
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
          <Glow className="-top-10 -right-10 opacity-80" color="rgba(8,22,48,0.9)" size={900} />
          <Glow className="bottom-0 -left-20 opacity-50" color="rgba(30,100,180,0.25)" size={800} />
          <Glow className="top-1/2 left-1/3 -translate-y-1/2 opacity-40" color="rgba(83,134,182,0.18)" size={600} />
        </div>
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <div className="max-w-3xl">
            <SectionLabel>Technical Consultancy</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Engineering excellence,<br />on every ocean.
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              From race-winning performance engineering to naval architecture and full vessel systems integration, our technical team brings deep expertise across every discipline of modern yacht design and operation.
            </p>
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      {disciplines.map((d, i) => (
        <div key={d.id} id={d.id}>
          {i > 0 && <HorizonLine />}
          <section className="bg-bg1">
            <div className={`grid grid-cols-1 lg:grid-cols-2`}>
              {/* Image */}
              <div className={`relative h-64 sm:h-72 lg:h-auto lg:min-h-[460px] ${d.imageRight ? "order-first lg:order-last" : ""} ${d.vignette ? "bg-bg0" : ""}`} data-animate={d.imageRight ? "slide-left" : "slide-right"}>
                <Image src={d.image.src} alt={d.image.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className={`object-cover ${d.vignette ? "opacity-80" : ""}`} />
                <div className={`absolute inset-0 ${d.darkTint ? "bg-bg0/10" : "bg-bg0/0"}`} />
                {d.vignette && <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, var(--bg0) 100%)" }} />}
              </div>

              {/* Content */}
              <div className="px-8 py-16 lg:px-14 lg:py-20 flex flex-col justify-center" data-animate={d.imageRight ? "slide-right" : "slide-left"}>
                <SectionLabel>{d.label}</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">{d.heading}</h2>
                <p className="text-muted leading-relaxed mb-8">{d.intro}</p>
                <div className="space-y-4">
                  {d.items.map((item) => (
                    <div key={item.title} className="border-l-2 border-accent/40 pl-4">
                      <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      ))}

      <HorizonLine />

      {/* FAQ - hidden visually, kept for JSON-LD SEO */}
      <section className="sr-only">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What types of technical consultancy do you offer?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                We offer specialist consultancy across yacht racing performance, hydraulic and PLC control systems, navigation and communication systems, naval architecture, mechanical installation, and AV/IT automation. Each discipline is led by experienced engineers and technical specialists.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                Do you provide consultancy for both sailing and motor yachts?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Yes. Our team has extensive experience with both sailing and motor yachts, from high-performance racing programmes and grand prix campaigns to explorer vessels and large motor yacht systems integration.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                Can you assist with regulatory compliance and surveys?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Yes. We support owners and captains with MCA compliance, flag state requirements, classification society surveys, and statutory inspections. Our team can coordinate the full survey and certification process on your behalf.
              </div>
            </details>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* RELATED SERVICES & FURTHER READING */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-muted">
          Related: <Link href="/owners-representation" className="text-accent hover:text-white transition-colors">New Build</Link> · <Link href="/refit" className="text-accent hover:text-white transition-colors">Refit Project Management</Link>
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <p className="text-xs text-muted/60 uppercase tracking-widest mb-3">Further Reading</p>
        <div className="flex flex-col gap-2">
          <Link href="/insights/carbon-composite-construction-what-owners-need-to-know" className="text-sm text-accent hover:text-white transition-colors">Carbon Composite Construction: What Owners Need to Know</Link>
        </div>
      </div>

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/j-class-finish.jpg" alt="J Class yacht crossing the finish line under full sail" fill sizes="100vw" className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-bg0/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Work With Us</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-5">Start a conversation.</h2>
          <p className="text-muted leading-relaxed text-base mb-8 max-w-xl mx-auto">
            Whether you need a single specialist or a full project team, we&apos;ll put the right expertise alongside you.
          </p>
          <ButtonPrimary href="/contact">Get in touch</ButtonPrimary>
        </div>
      </section>
    </>
  );
}
