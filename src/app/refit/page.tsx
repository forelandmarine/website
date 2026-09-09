import Image from "next/image";
import Link from "next/link";
import { HorizonLine, ButtonPrimary, ServiceCard } from "@/components/ui";
import ParallaxHero from "@/components/ParallaxHero";

const services = [
  { title: "Planning & Specification", description: "Scope definition, design review, work specification, and budget development prior to the yard period. Thorough planning at this stage is fundamental to a well-executed refit." },
  { title: "On-Site Project Management", description: "A dedicated project manager present at the yard throughout the refit. Daily progress monitoring, contractor coordination, quality assurance, and structured owner reporting." },
  { title: "Yard Selection & Tendering", description: "Assessment of yards against capability, availability, track record, and commercial value. Management of the tendering process and contract negotiation on behalf of the owner." },
  { title: "Budget & Cost Control", description: "Detailed financial tracking from the outset, with monthly reporting, change order review, and supplier negotiation. Full transparency on expenditure at every stage." },
  { title: "Quality & Compliance", description: "Milestone inspections, coatings and paint survey, systems testing, and formal sign-off at each phase. Coordination of class surveys and flag state requirements as required." },
  { title: "Sea Trials & Handover", description: "Coordination of trials, snagging resolution, crew briefing, and a structured handover process to ensure the vessel departs the yard fully operational and to the agreed standard." },
];

export default function RefitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://www.forelandmarine.com/refit#service",
              name: "Yacht Refit Management",
              alternateName: [
                "Yacht Refit Project Management",
                "Superyacht Refit Management",
                "Independent Yacht Refit Management",
                "Sailing Yacht Refit Management",
                "Motor Yacht Refit Management",
              ],
              serviceType: "Yacht Refit Management",
              provider: {
                "@type": "Organization",
                name: "Foreland Marine Consultancy Ltd",
              },
              areaServed: "Worldwide",
              description:
                "Independent, owner-side yacht refit project management for motor and sailing yachts over 24 metres. Twenty-five large yacht refit projects across seven countries, from racing programmes to motor yacht rebuilds. YORR registered.",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is yacht refit project management?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yacht refit project management is the independent oversight of a refit on behalf of the owner. The project manager is present at the yard throughout the works, monitors progress, controls budget, manages change orders, coordinates classification and flag surveys, and reports to the owner. The role is separate from the yard's own project staff, who represent the yard's commercial interest.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How much does yacht refit project management cost?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Independent project management on a typical 30 to 50 metre refit ranges from 3 to 8 percent of total refit value, depending on scope, yacht complexity, and yard location. On a £2 million refit this represents £60,000 to £160,000. The cost is routinely outweighed by cost savings achieved through competitive tendering, supplier negotiation, and change order discipline, which commonly save 10 to 20 percent on the gross refit budget.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do you select the right refit yard?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yard selection is based on vessel type, scope of work, geographic preference, capabilities, and track record. We assess multiple yards against these criteria, manage the tendering process across northern European, Mediterranean, and lower-cost options, and recommend the option that best serves the owner's interests, not the option that pays the largest referral fee, because we do not accept referral fees from yards.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the typical scope of refit project management?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our involvement covers the full lifecycle: initial condition survey, scope and specification development, yard selection and tendering, contract negotiation, daily on-site oversight, budget and cost control, quality assurance, classification and flag coordination, sea trials, and formal handover. Owners can also engage us for individual stages if a refit is already in progress.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How long does a typical superyacht refit take?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A routine maintenance haul-out runs two to four weeks. A standard winter refit runs eight to sixteen weeks. A mid-life refit with paint and machinery work runs three to six months. A major refit with structural and interior scope runs six to twelve months. A full rebuild on a yacht over 50 metres can extend to eighteen to twenty-four months.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do you manage refit budgets and timelines?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Detailed cost tracking from day one, with monthly reporting to the owner, structured change order management, milestone-based payments, and proactive identification of schedule risks. We tender all variations to multiple suppliers where time allows. Full financial transparency is maintained throughout, with the owner able to see line-item expenditure at any time.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Should I refit or sell?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "For a yacht of twelve to fifteen years facing major work, the honest comparison is refit against sale and reacquisition. Where projected refit cost exceeds roughly 30 percent of pre-refit market value, and the yacht is not strategically irreplaceable for the intended use, sale is usually the better decision; below that threshold refit normally is. The threshold is a guide rather than a rule, and it moves with how specific the yacht is to the owner's use case. We run this assessment before scope development, because the answer sometimes makes the rest of the exercise unnecessary.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is a full-service yard or a service yard better for a refit?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "It depends on how much technical representation the owner has. Full-service yards such as MB92, Pendennis, Lusben, Astilleros de Mallorca, Amico and Co and Rybovich take the project as one contract, manage the trades in-house, carry the integration risk and price for carrying it. Service yards such as STP Palma and Lauderdale Marine Center provide the facility and haul-out while the owner contracts trades directly, at lower rates, with the integration risk moved to the owner. The second is materially cheaper where there is competent owner-side management to carry that risk and materially worse where there is not.",
                  },
                },
                {
                  "@type": "Question",
                  name: "When should a refit project manager be appointed?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Eight to twelve weeks before the yacht is due at the yard, and in any case before the specification is written. Most of what determines the final cost is settled in the condition survey, the specification, and the tender, all of which happen before a contract exists. A representative appointed after the contract is signed is managing a commercial position that somebody else negotiated, which is still useful and is considerably less valuable.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Why do refit budgets overrun by 30 to 50 percent?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Because a yard quote built on visual inspection cannot price what appears once the deck is up and the tanks are open. Most of that variance is genuine work that the original scope could not have anticipated, not a project management failure. What owner-side representation changes is the distribution: a well-managed refit at a competent yard typically lands within 10 to 20 percent of the original quote, while a poorly managed one lands at the extremes. Dockwalk has documented a sixfold overrun on a 1967 Camper and Nicholsons refit, from USD 1 million to USD 6 million.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can you manage a refit at any shipyard worldwide?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. We have delivered 25 large yacht refit projects across 7 countries, with established working relationships at yards across the Mediterranean (MB92 Barcelona, STP Palma, Monaco Marine, Lusben Viareggio), northern Europe (Pendennis, Lürssen Wadden, Vitters, Royal Huisman), the UK (Pendennis, Berthon), the Caribbean and the US. Our team deploys to any yard.",
                  },
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.forelandmarine.com" },
                { "@type": "ListItem", position: 2, name: "Refit", item: "https://www.forelandmarine.com/refit" },
              ],
            },
          ]),
        }}
      />

      {/* HERO */}
      <ParallaxHero imageSrc="/images/refit-yard.jpg" imageAlt="Sailing yacht in refit yard">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Yacht refit project<br />management, owner-side
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-2xl">
            Independent refit project management for motor and sailing yachts over 24 metres, from the condition survey through to sea trials and handover. We are appointed by the owner and paid by the owner. Our interests are directly aligned with the owner&apos;s by structure: no broker commissions, no referral fees.
          </p>
        </div>
      </ParallaxHero>

      {/* TRACK RECORD */}
      <section className="bg-bg1 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-animate="fade-up">
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">Classic to carbon</h2>
              <p className="text-muted leading-relaxed mb-5">
                Twenty-five large yacht refit projects delivered across seven countries. High-profile classic and modern racing yachts prepared for the grand prix circuit. Multiple sailing yachts exceeding 40 metres. Motor yachts in excess of 60 metres undergoing comprehensive rebuilds. Historic restorations of vessels dating from the 1920s alongside performance programmes on recently launched craft.
              </p>
              <p className="text-muted leading-relaxed">
                This breadth of experience means our team has encountered the specific challenges associated with each vessel type, from managing complex coatings schemes on pre-war hulls to commissioning carbon rigs on contemporary racing yachts, and overseeing in-depth mechanical and interior refits on large motor yachts.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8" data-animate-stagger>
              <div className="text-center" data-animate="fade-up">
                <p className="text-3xl sm:text-4xl font-light text-white mb-1">25</p>
                <p className="text-sm text-muted">Large yacht projects</p>
              </div>
              <div className="text-center" data-animate="fade-up">
                <p className="text-3xl sm:text-4xl font-light text-white mb-1">7</p>
                <p className="text-sm text-muted">Countries</p>
              </div>
              <div className="text-center" data-animate="fade-up">
                <p className="text-3xl sm:text-4xl font-light text-white mb-1">30-60m+</p>
                <p className="text-sm text-muted">Projects delivered</p>
              </div>
              <div className="text-center" data-animate="fade-up">
                <p className="text-3xl sm:text-4xl font-light text-white mb-1">100+</p>
                <p className="text-sm text-muted">Years of vessel heritage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* WHAT A REFIT COSTS */}
      <section className="py-20 bg-bg0">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-8 leading-tight" data-animate="fade-up">
            What a refit actually costs
          </h2>
          <div className="space-y-5 text-muted leading-relaxed" data-animate="fade-up">
            <p>
              A yacht&apos;s life divides into refit cycles. Every five years a class survey forces structural and systems work; every ten the cosmetic and major-systems condition demands a substantive overhaul. The global refit market ran to USD 2.9 billion in 2025 against roughly 6,000 active vessels, on Future Market Insights figures, and capacity has expanded more slowly than the fleet. Lead times at the reference yards are tightening accordingly.
            </p>
            <p>
              A five-year survey or major refit typically runs 5 to 15 percent of insured hull value. Expressed per metre, and drawn from the practitioner ranges published in{" "}
              <Link href="https://firstownersreference.com/06-refit" className="text-accent hover:text-white transition-colors underline underline-offset-2">chapter six of The First Owner&apos;s Reference</Link>,
              annual maintenance sits at EUR 2,000 to 8,000 per metre, a mid-life refit at EUR 10,000 to 30,000 per metre, and a major structural refit at EUR 40,000 to 100,000 and above. A 50 metre yacht taking major structural work therefore lands between EUR 2 million and EUR 5 million, with USD 5 million to 10 million typical where the scope extends to lengthening, re-engining, or wholesale systems renewal.
            </p>
            <p>
              Two further lines move the total more than owners expect. Berth fees during the yard period run EUR 400 to 800 a day for a 40 metre hull in the Mediterranean and EUR 600 to 1,200 in northern Europe. Skilled labour runs EUR 45 to 75 an hour in the Mediterranean, with specialist trades at EUR 80 to 120, and northern European rates sit 20 to 40 percent above that. None of the reference yards publishes a rate card, so these are working ranges that practitioners would recognise rather than quoted prices.
            </p>
            <p>
              The prior question is whether to refit at all. For a yacht of twelve to fifteen years facing major work, the alternative is sale and reacquisition, and the arithmetic turns on strategic fit rather than sentiment. Where projected refit cost exceeds about 30 percent of pre-refit market value and the yacht is not irreplaceable for the intended use, sale is usually the better decision. Below that threshold, refit normally is. The owner who commits on the wrong side of it takes on a project whose total cost runs above the finished yacht&apos;s market value.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* THE OVERRUN PATTERN */}
      <section className="bg-bg1 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-8 leading-tight" data-animate="fade-up">
            Where refits run over, and what changes it
          </h2>
          <div className="space-y-5 text-muted leading-relaxed" data-animate="fade-up">
            <p>
              Refit projects routinely finish 30 to 50 percent above the originally quoted scope. That is the industry pattern rather than the exception, and Dockwalk has documented a sixfold overrun on the refit of a 1967 Camper &amp; Nicholsons hull, from USD 1 million to USD 6 million.
            </p>
            <p>
              It is worth being precise about what that number is. A yard quote built on visual inspection cannot anticipate what appears when the deck comes up and the tanks are opened. Most of the 30 to 50 percent is genuine work that the initial scope could not have known about, priced against a specification written on imperfect information. Treating it as a failure of project management misreads it, and owners who go in expecting the quoted figure to hold are the ones who end up renegotiating from a weak position halfway through.
            </p>
            <p>
              What owner-side representation changes is the distribution, not the existence, of that variance. A well-managed refit at a competent yard, with experienced representation on the owner&apos;s side of the table, typically lands within 10 to 20 percent of the original quote. A poorly managed one lands at the extremes. The variance between a refit that holds its budget and one that runs hot is mostly explained by the quality of the representation, and most of that work happens before the yacht arrives, in the specification and the tender.
            </p>
            <p>
              The corollary matters for anyone comparing quotes. A yard quoting against a thin specification will quote low and recover the difference in variations, where the owner has no competitive tension and no time. A yard quoting against a detailed specification will quote higher and hold closer to it. The second number looks worse and is usually cheaper.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* YARD MODELS */}
      <section className="py-20 bg-bg0">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-8 leading-tight" data-animate="fade-up">
            Two yard models, and which one suits the project
          </h2>
          <div className="space-y-5 text-muted leading-relaxed" data-animate="fade-up">
            <p>
              Refit yards operate on one of two models, and the choice shapes cost, risk, and how much management the project needs. Owners are rarely walked through the distinction before they are asked to sign.
            </p>
            <p>
              Full-service yards take the project as a single contract, manage the trades in-house, and deliver against agreed milestones. They carry the integration risk and they price for carrying it. MB92 in Barcelona and La Ciotat, Pendennis in Falmouth, Lusben in Viareggio and Livorno, Astilleros de Mallorca, Amico &amp; Co in Genoa and Rybovich in West Palm Beach all work this way. For an owner without technical representation, or on a project where a single point of contractual responsibility is worth paying for, this is usually the right structure.
            </p>
            <p>
              Service yards, sometimes called marina yards, provide the facility, the haul-out, and the infrastructure, while the owner contracts paint, mechanical, electrical, and joinery directly with resident specialists. STP Palma is the best-known example and the largest facility of its kind in the western Mediterranean. Lauderdale Marine Center runs the same model at scale on the US east coast. The rates are lower because the integration risk has moved to the owner, which is an advantage where there is competent representation to carry it and a liability where there is not.
            </p>
            <p>
              We manage projects under both models and have no interest in which is chosen, because we are not paid by either. The assessment we run is against capability for the specific scope, realistic availability in the window required, and the commercial terms actually on offer, and it is normal for that to point at a yard the owner had not considered.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* SERVICES */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12" data-animate="fade-up">
            <h2 className="text-3xl sm:text-4xl font-light text-white">The full scope of a refit</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-animate-stagger>
            {services.map((s) => (
              <ServiceCard key={s.title} title={s.title} description={s.description} data-animate="fade-up" />
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* APPROACH */}
      <section className="bg-bg1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="px-8 py-16 lg:px-14 lg:py-20 flex flex-col justify-center" data-animate="slide-right">
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Independent oversight, aligned with the owner
            </h2>
            <p className="text-muted leading-relaxed mb-5">
              Our project leads are predominantly former captains and chief engineers who have managed complex yard periods from the operational side. Their practical experience enables them to identify quality issues early, manage contractor performance effectively, and maintain the standards the owner expects.
            </p>
            <p className="text-muted leading-relaxed mb-5">
              They are supported by in-house naval architects, vibration analysts, coatings and paint surveyors, and equipment specialists. Financial oversight is provided by qualified accountants within the team, with tax advisors and shipping brokers available for registration or commercial matters. The necessary expertise is readily accessible within the organisation.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Our interests are directly aligned with the owner&apos;s by structure: no broker commissions, no referral fees. Nobody in the supply chain pays us to be recommended, which is what makes a yard recommendation worth reading.
            </p>
          </div>
          <div className="relative h-64 sm:h-72 lg:h-auto lg:min-h-[460px]" data-animate="slide-left">
            <Image src="/images/welder-hull.jpg" alt="Welder working on a yacht hull in dry dock" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-bg0/10" />
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* THE FEE */}
      <section className="py-20 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-8 leading-tight" data-animate="fade-up">
            What the fee is, and what it buys
          </h2>
          <div className="space-y-5 text-muted leading-relaxed" data-animate="fade-up">
            <p>
              Independent project management on a 30 to 50 metre refit runs 3 to 8 percent of total refit value, varying with scope, the complexity of the yacht, and the yard&apos;s location. On a GBP 2 million refit that is GBP 60,000 to GBP 160,000. Where a refit is already under way and the owner wants a second pair of eyes rather than full management, individual stages can be taken on their own, and on a fixed-fee basis where the scope allows.
            </p>
            <p>
              The case for the fee is straightforward enough to test. Competitive tendering, supplier negotiation, and disciplined change-order control routinely take 10 to 20 percent off a gross refit budget, and the tightening of the 30 to 50 percent overrun band toward 10 to 20 percent is worth considerably more than that again on a project of any size. An owner is entitled to ask any prospective representative to show how those savings were achieved on a named past project, and to be sceptical of a firm that cannot.
            </p>
            <p>
              The one thing the fee does not buy is a shortcut. Most of the value is created in the eight to twelve weeks before the yacht reaches the yard, in the condition survey, the specification, and the tender. A representative engaged after the contract is signed is managing a position someone else negotiated.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* HERITAGE RESTORATION */}
      <section className="bg-bg0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 sm:h-72 lg:h-auto lg:min-h-[460px]" data-animate="slide-right">
            <Image src="/images/classic-restoration.jpg" alt="Craftsmen restoring traditional timber planking on a classic yacht" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-bg0/20" />
          </div>
          <div className="px-8 py-16 lg:px-14 lg:py-20 flex flex-col justify-center" data-animate="slide-left">
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Preserving heritage, faithfully
            </h2>
            <p className="text-muted leading-relaxed mb-5">
              Some projects demand more than technical competence. The restoration of a classic yacht carries a responsibility to honour the original design intent, the craftsmanship of a previous era, and the vessel&apos;s place in maritime history. We approach these projects with the respect they deserve.
            </p>
            <p className="text-muted leading-relaxed mb-5">
              Whether working with traditional timber construction, period-correct hardware, or sympathetic upgrades to mechanical and electrical systems, our team understands the balance between preservation and practical seaworthiness. The goal is always a vessel that sails as beautifully as she looks, faithful to her heritage but ready for the sea.
            </p>
            <p className="text-muted leading-relaxed">
              We work closely with specialist yards, skilled shipwrights and conservation-minded designers to ensure that every decision, from material selection to structural approach, is made with the vessel&apos;s legacy in mind.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* Common questions - editorial prose, not an accordion */}
      <section className="py-20 bg-bg0">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-10">Common questions about refit project management</h2>
          <div className="space-y-8">
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">What is yacht refit project management?</h3>
              <p className="text-sm text-muted leading-relaxed">Yacht refit project management is the independent oversight of a refit on behalf of the owner. The project manager is present at the yard throughout the works, monitors progress, controls budget, manages change orders, coordinates classification and flag surveys, and reports to the owner. The role is separate from the yard&apos;s own project staff, who represent the yard&apos;s commercial interest.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">How much does yacht refit project management cost?</h3>
              <p className="text-sm text-muted leading-relaxed">Independent project management on a typical 30 to 50 metre refit ranges from 3 to 8 percent of total refit value, depending on scope, yacht complexity, and yard location. On a £2 million refit this represents £60,000 to £160,000. The cost is routinely outweighed by cost savings achieved through competitive tendering, supplier negotiation, and change order discipline, which commonly save 10 to 20 percent on the gross refit budget. See our detailed guide to <Link href="/insights/how-much-does-a-superyacht-refit-cost" className="text-accent hover:text-white transition-colors underline underline-offset-2">superyacht refit cost</Link> for full ranges.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">How do you select the right refit yard?</h3>
              <p className="text-sm text-muted leading-relaxed">Yard selection is based on vessel type, scope of work, geographic preference, capabilities, and track record. We assess multiple yards against these criteria, manage the tendering process across northern European, Mediterranean, and lower-cost options, and recommend the option that best serves the owner&apos;s interests, not the option that pays the largest referral fee, because we do not accept referral fees from yards.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">What is the typical scope of refit project management?</h3>
              <p className="text-sm text-muted leading-relaxed">Our involvement covers the full lifecycle: initial condition survey, scope and specification development, yard selection and tendering, contract negotiation, daily on-site oversight, budget and cost control, quality assurance, classification and flag coordination, sea trials, and formal handover. Owners can also engage us for individual stages if a refit is already in progress.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">How long does a typical superyacht refit take?</h3>
              <p className="text-sm text-muted leading-relaxed">A routine maintenance haul-out runs two to four weeks. A standard winter refit runs eight to sixteen weeks. A mid-life refit with paint and machinery work runs three to six months. A major refit with structural and interior scope runs six to twelve months. A full rebuild on a yacht over 50 metres can extend to eighteen to twenty-four months.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">How do you manage refit budgets and timelines?</h3>
              <p className="text-sm text-muted leading-relaxed">Detailed cost tracking from day one, with monthly reporting to the owner, structured change order management, milestone-based payments, and proactive identification of schedule risks. We tender all variations to multiple suppliers where time allows. Full financial transparency is maintained throughout, with the owner able to see line-item expenditure at any time.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">Should I refit or sell?</h3>
              <p className="text-sm text-muted leading-relaxed">For a yacht of twelve to fifteen years facing major work, the honest comparison is refit against sale and reacquisition. Where projected refit cost exceeds roughly 30 percent of pre-refit market value, and the yacht is not strategically irreplaceable for the intended use, sale is usually the better decision; below that threshold refit normally is. The threshold is a guide rather than a rule, and it moves with how specific the yacht is to the owner&apos;s use case. We run this assessment before scope development, because the answer sometimes makes the rest of the exercise unnecessary.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">Is a full-service yard or a service yard better for a refit?</h3>
              <p className="text-sm text-muted leading-relaxed">It depends on how much technical representation the owner has. Full-service yards such as MB92, Pendennis, Lusben, Astilleros de Mallorca, Amico &amp; Co and Rybovich take the project as one contract, manage the trades in-house, carry the integration risk and price for carrying it. Service yards such as STP Palma and Lauderdale Marine Center provide the facility and haul-out while the owner contracts trades directly, at lower rates, with the integration risk moved to the owner. The second is materially cheaper where there is competent owner-side management to carry that risk and materially worse where there is not.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">When should a refit project manager be appointed?</h3>
              <p className="text-sm text-muted leading-relaxed">Eight to twelve weeks before the yacht is due at the yard, and in any case before the specification is written. Most of what determines the final cost is settled in the condition survey, the specification, and the tender, all of which happen before a contract exists. A representative appointed after the contract is signed is managing a commercial position that somebody else negotiated, which is still useful and is considerably less valuable.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">Why do refit budgets overrun by 30 to 50 percent?</h3>
              <p className="text-sm text-muted leading-relaxed">Because a yard quote built on visual inspection cannot price what appears once the deck is up and the tanks are open. Most of that variance is genuine work that the original scope could not have anticipated, not a project management failure. What owner-side representation changes is the distribution: a well-managed refit at a competent yard typically lands within 10 to 20 percent of the original quote, while a poorly managed one lands at the extremes. Dockwalk has documented a sixfold overrun on a 1967 Camper and Nicholsons refit, from USD 1 million to USD 6 million.</p>
            </div>
            <div className="border-l-2 border-accent/40 pl-6">
              <h3 className="text-base font-semibold text-white mb-3">Can you manage a refit at any shipyard worldwide?</h3>
              <p className="text-sm text-muted leading-relaxed">Yes. We have delivered 25 large yacht refit projects across 7 countries, with established working relationships at yards across the Mediterranean (MB92 Barcelona, STP Palma, Monaco Marine, Lusben Viareggio), northern Europe (Pendennis, Lürssen Wadden, Vitters, Royal Huisman), the UK (Pendennis, Berthon), the Caribbean and the US. Our team deploys to any yard.</p>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* CLASSIC RACING IMAGE */}
      <section className="py-20 bg-bg1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded overflow-hidden shadow-2xl shadow-black/40" data-animate="scale-in">
            <Image
              src="/images/classic-racing.jpg"
              alt="Classic yacht racing under full sail"
              width={1800}
              height={1200}
              className="w-full h-auto"
            />
          </div>
          <p className="text-center text-sm text-muted mt-6">
            Built to last. Built to race. Ready for whatever comes next.
          </p>
        </div>
      </section>

      <HorizonLine />

      {/* RELATED SERVICES & FURTHER READING */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-muted">
          Related: <Link href="/owners-representation" className="text-accent hover:text-white transition-colors">New Build</Link>, <Link href="/technical-consultancy" className="text-accent hover:text-white transition-colors">Technical Consultancy</Link>, <Link href="/yacht-management" className="text-accent hover:text-white transition-colors">Yacht Management</Link>
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <p className="text-xs text-muted/60 uppercase tracking-widest mb-3">Further Reading</p>
        <div className="flex flex-col gap-2">
          <Link href="/insights/refit-project-management-what-to-expect" className="text-sm text-accent hover:text-white transition-colors">Refit Project Management: What to Expect from Planning to Sea Trials</Link>
          <Link href="/insights/how-much-does-a-superyacht-refit-cost" className="text-sm text-accent hover:text-white transition-colors">How Much Does a Superyacht Refit Cost?</Link>
          <Link href="/insights/refit-for-performance-upgrading-a-racing-programme" className="text-sm text-accent hover:text-white transition-colors">Refit for Performance: Upgrading an Ageing Racing Programme</Link>
        </div>
      </div>

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/shipyard-2.jpg" alt="Shipyard with yachts in dry dock" fill sizes="100vw" className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-bg0/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-5">Talk to us before the specification is written</h2>
          <p className="text-muted leading-relaxed text-base mb-8 max-w-xl mx-auto">
            Most of what determines the final cost of a refit is settled before the yacht reaches the yard, in the specification and the tender. If a yard period is in prospect, that is the point at which a conversation is most useful.
          </p>
          <ButtonPrimary href="/contact">Get in touch</ButtonPrimary>
        </div>
      </section>
    </>
  );
}
