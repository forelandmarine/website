import Image from "next/image";
import Link from "next/link";
import { HorizonLine, SectionLabel, ButtonPrimary, Glow } from "@/components/ui";
import ParallaxHero from "@/components/ParallaxHero";

const classes = [
  {
    id: "under-24m",
    label: "Yachts Under 24 Metres",
    heading: "Sailing and motor yachts, surveyed in full.",
    intro:
      "For yachts below 24 metres load line length, we carry out independent surveys that give owners, buyers, and insurers a clear and honest picture of a vessel's condition. Whether the boat is a cruising yacht, a raceboat, or a small motor yacht, every survey is tailored to how she is built and how she is used.",
    image: { src: "/images/sailing-yacht-deck.jpg", alt: "Deck of a sailing yacht at sea" },
    items: [
      { title: "Pre-Purchase Condition Survey", body: "A full inspection of hull, deck, structure, rig, systems, and equipment before you buy, with a written report and a clear assessment of condition and any defects found." },
      { title: "Insurance & Renewal Survey", body: "Condition surveys to satisfy underwriters at purchase or renewal, covering structure, safety equipment, gas, electrical, and through-hull fittings." },
      { title: "Small Commercial Vessel Coding", body: "Inspection and guidance for MCA Small Commercial Vessel and Workboat coding, so a yacht under 24 metres can be certified for charter or commercial use." },
      { title: "Rig, Moisture & Osmosis Checks", body: "Standing and running rigging assessment, moisture mapping of GRP and composite hulls, and osmosis investigation where blistering or water ingress is suspected." },
    ],
    imageRight: false,
  },
  {
    id: "over-24m",
    label: "Yachts Over 24 Metres",
    heading: "Superyacht surveys, held to class and flag.",
    intro:
      "For yachts above 24 metres, surveys sit alongside classification and flag state requirements. We work with owners, captains, and management to assess condition against the standards that apply to the vessel, from pre-purchase due diligence to the inspections that keep a yacht in class and in certificate.",
    image: { src: "/images/superyacht-harbour.jpg", alt: "Superyacht moored in harbour" },
    darkTint: true,
    items: [
      { title: "Pre-Purchase Condition Survey", body: "Detailed condition assessment for larger sailing and motor yachts, coordinated with sea trials, engine and machinery surveys, and a full defect and valuation summary." },
      { title: "Class & Flag State Compliance", body: "Liaison with classification societies and flag administrations, including Large Yacht Code surveys, statutory inspections, and periodic and renewal survey coordination." },
      { title: "New Build & Warranty Inspection", body: "Independent inspection during construction and through the warranty period, so defects are found and recorded while the yard remains responsible for them." },
      { title: "Refit & Damage Survey", body: "Condition surveys before and after refit, and damage surveys following grounding, collision, or heavy weather, with reporting suited to owners, managers, and insurers." },
    ],
    imageRight: true,
  },
  {
    id: "scope",
    label: "What A Survey Covers",
    heading: "One report you can act on.",
    intro:
      "Every survey follows the same principle, whatever the size of the yacht. We inspect thoroughly, record clearly, and set out what we find in a report you can put in front of a broker, an underwriter, or a shipyard. Nothing is glossed over, and every recommendation is explained.",
    image: { src: "/images/hull-structure.jpg", alt: "Yacht hull structure under inspection" },
    vignette: true,
    items: [
      { title: "Hull, Structure & Deck", body: "Laminate and moisture condition, structural integrity, keel and rudder attachment, deck fittings, and signs of previous repair." },
      { title: "Machinery & Systems", body: "Engines, generators, steering, electrical, plumbing, bilge, and fuel systems, with sea trial observations where a trial is carried out." },
      { title: "Safety & Compliance", body: "Life-saving and firefighting equipment, gas installations, navigation lights, and the certification the vessel is required to hold." },
      { title: "Report & Valuation", body: "A written report with photographs, a prioritised list of defects, and, where requested, an independent valuation for insurance or sale." },
    ],
    imageRight: false,
  },
];

export default function SurveysPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://www.forelandmarine.com/technical-consultancy/surveys#service",
              name: "Yacht Surveys",
              alternateName: [
                "Yacht Survey",
                "Superyacht Survey",
                "Pre-Purchase Yacht Survey",
                "Yacht Condition Survey",
                "Yacht Insurance Survey",
                "Marine Survey",
              ],
              serviceType: "Yacht Survey",
              provider: {
                "@type": "Organization",
                name: "Foreland Marine Consultancy Ltd",
              },
              areaServed: "Worldwide",
              description:
                "Independent yacht surveys for vessels under and over 24 metres, including pre-purchase, insurance, condition, small commercial vessel coding, and classification and flag state surveys for sailing and motor yachts.",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Do you survey yachts under and over 24 metres?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. We survey sailing and motor yachts both below and above 24 metres load line length. Yachts under 24 metres are assessed against small craft and small commercial vessel standards, while yachts over 24 metres are surveyed alongside classification and flag state requirements such as the Large Yacht Code.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What types of yacht survey do you offer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We carry out pre-purchase condition surveys, insurance and renewal surveys, small commercial vessel coding inspections, new build and warranty inspections, refit and damage surveys, and classification and flag state compliance surveys.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What does a yacht survey report include?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Each survey produces a written report with photographs covering hull and structure, machinery and systems, safety and compliance, and a prioritised list of defects. An independent valuation can be included where required for insurance or sale.",
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
                { "@type": "ListItem", position: 3, name: "Yacht Surveys", item: "https://www.forelandmarine.com/technical-consultancy/surveys" },
              ],
            },
          ]),
        }}
      />

      {/* HERO */}
      <ParallaxHero
        background={
          <>
            <Glow className="-top-10 -right-10 opacity-80" color="rgba(8,22,48,0.9)" size={900} />
            <Glow className="bottom-0 -left-20 opacity-50" color="rgba(30,100,180,0.25)" size={800} />
            <Glow className="top-1/2 left-1/3 -translate-y-1/2 opacity-40" color="rgba(83,134,182,0.18)" size={600} />
          </>
        }
      >
        <div className="max-w-3xl">
          <SectionLabel>Yacht Surveys</SectionLabel>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            An independent eye,<br />over every inch.
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-2xl">
            Pre-purchase, insurance, condition, and class surveys for sailing and motor yachts, both under and over 24 metres. Thorough inspection, plain reporting, and advice you can act on.
          </p>
        </div>
      </ParallaxHero>

      {/* CLASSES */}
      {classes.map((d, i) => (
        <div key={d.id} id={d.id}>
          {i > 0 && <HorizonLine />}
          <section className="bg-bg1">
            <div className="grid grid-cols-1 lg:grid-cols-2">
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
                Do you survey yachts under and over 24 metres?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Yes. We survey sailing and motor yachts both below and above 24 metres load line length. Yachts under 24 metres are assessed against small craft and small commercial vessel standards, while yachts over 24 metres are surveyed alongside classification and flag state requirements such as the Large Yacht Code.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What types of yacht survey do you offer?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                We carry out pre-purchase condition surveys, insurance and renewal surveys, small commercial vessel coding inspections, new build and warranty inspections, refit and damage surveys, and classification and flag state compliance surveys.
              </div>
            </details>
            <details className="group border border-white/10 bg-bg1">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                What does a yacht survey report include?
                <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed">
                Each survey produces a written report with photographs covering hull and structure, machinery and systems, safety and compliance, and a prioritised list of defects. An independent valuation can be included where required for insurance or sale.
              </div>
            </details>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* RELATED SERVICES */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-muted">
          Related: <Link href="/technical-consultancy" className="text-accent hover:text-white transition-colors">Technical Consultancy</Link>, <Link href="/refit" className="text-accent hover:text-white transition-colors">Refit Project Management</Link>, <Link href="/owners-representation" className="text-accent hover:text-white transition-colors">New Build</Link>
        </p>
      </div>

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/superyacht-bow.jpg" alt="Bow of a yacht at anchor" fill sizes="100vw" className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-bg0/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Arrange A Survey</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-5">Book an independent survey.</h2>
          <p className="text-muted leading-relaxed text-base mb-8 max-w-xl mx-auto">
            Tell us about the yacht and what the survey is for, and we&apos;ll set out the right scope, timing, and cost.
          </p>
          <ButtonPrimary href="/contact">Get in touch</ButtonPrimary>
        </div>
      </section>
    </>
  );
}
