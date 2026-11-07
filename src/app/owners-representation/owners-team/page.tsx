import Image from "next/image";
import Link from "next/link";
import { HorizonLine, ButtonPrimary } from "@/components/ui";
import ParallaxHero from "@/components/ParallaxHero";

const stages = ["Concept and specification", "Yard selection and contract", "Build", "Sea trials and delivery", "Warranty"];

const timeline: [string, string, string, string, string, string][] = [
  ["Owner's representative", "Leads the brief", "Leads evaluation", "Leads on site", "Leads acceptance", "Manages claims"],
  ["Family office", "Sets the budget", "Yard due diligence", "Releases payments", "Final payment", "Tracks retentions"],
  ["Shipbuilding lawyer", "Early advice", "Leads contract", "As required", "Delivery documents", "Disputes"],
  ["Tax, structuring, insurance", "Structure, flag, VAT", "Reviews terms", "As required", "Registration, cover", ""],
  ["Mechanical and systems", "Technical brief", "Specification review", "Design review, factory tests", "Commissioning", "Defects"],
  ["Paint and coatings", "", "Paint specification", "Hold-point inspection", "Final inspection", "Claims"],
  ["Noise and vibration", "Targets", "Contract limits", "Modelling, mounts", "Measurement", ""],
  ["Interior", "Brief with designer", "Scope allocation", "Mock-ups, samples", "Snagging", "Defects"],
  ["Naval architect", "Concept review", "Specification review", "Weight tracking", "Stability, trials", ""],
  ["Class and flag compliance", "Class notation, flag", "Specification review", "Plan approval, surveys", "Certification", "Annual surveys"],
  ["Owner's designers", "Concept, general arrangement", "Specification drawings", "Design development, approvals", "Final inspection", ""],
  ["Captain and chief engineer", "Operational input", "Specification review", "On site", "Trials and acceptance", "Defect log"],
  ["Yacht manager", "", "", "Operational set-up", "Assumes management", "Manages the yacht"],
];

const scale = [
  { project: "24 to 35 metres, semi-custom", structure: "Representative also acting as the owner's project manager, with regular yard attendance. Lawyer and adviser input at contract. Paint and systems specialists engaged at set points." },
  { project: "35 to 50 metres, custom", structure: "Resident representative. Captain or chief engineer on site during the build. Planned specialist visits across all technical disciplines." },
  { project: "50 to 60 metres and above", structure: "Representative supported by a resident project manager and site team with discipline leads. Specialists retained through the build. Dedicated cost control, working with the family office." },
];

const faqs = [
  { q: "Who should I appoint first?", a: "The owner's representative, ideally before a Letter of Intent or yard selection, followed by a shipbuilding lawyer before any heads of terms are signed." },
  { q: "To whom do the specialist consultants owe their duty?", a: "To the owner. They report through us so that the yard hears one voice and the owner receives one report, but they are contracted by the owning company wherever possible and their duty runs to the owner. Our interests are directly aligned with the owner's by structure: no broker commissions, no referral fees." },
  { q: "Can my family office or captain act as owner's representative?", a: "A family office should control the money and a captain brings operational judgement the build needs, but neither is the same as having managed a build. The representative should be someone who has delivered a yacht from a yard before." },
  { q: "Does Foreland supply the whole team?", a: "Our bench covers engineering, command, naval architecture, survey, coatings and performance sailing. Legal, tax and other specialist advisers are appointed independently, and we can assist with their selection." },
  { q: "Can a team be put in place once the build has started?", a: "Yes, although some of the owner's leverage will already have been settled in the contract and specification. We can review the position at any stage and set out what can still be improved." },
];

const ink = "#FFFFFF";
const quiet = "#7BA8C8";
const edge = "rgba(195,217,232,0.45)";
const accent = "#5386B6";

function DiagramBox({ x, y, w, h, title, lines, dashed }: { x: number; y: number; w: number; h: number; title: string; lines: string[]; dashed?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={edge} strokeWidth="1.25" strokeDasharray={dashed ? "4 4" : undefined} />
      <text x={x + 12} y={y + 24} fontWeight="600" fill={ink}>{title}</text>
      {lines.map((line, i) => (
        <text key={line} x={x + 12} y={y + 40 + i * 16} fontSize="11.5" fill={quiet}>{line}</text>
      ))}
    </g>
  );
}

function TeamDiagram() {
  return (
    <svg viewBox="0 40 760 690" role="img" aria-label="The owner's team: specialists report through one representative, who alone instructs the yard" fontSize="13" className="w-full h-auto">
      <defs>
        <marker id="team-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={edge} />
        </marker>
        <marker id="yard-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={accent} />
        </marker>
      </defs>
      <g fill="none" stroke={edge} strokeWidth="1.25">
        <path d="M380 104V148" markerEnd="url(#team-arrow)" />
        <path d="M134 148V126H626V148" markerEnd="url(#team-arrow)" />
        <path d="M134 126V148" markerEnd="url(#team-arrow)" />
        <path d="M380 236V264" />
        <path d="M186 292V264H574V292" markerEnd="url(#team-arrow)" />
        <path d="M186 264V292" markerEnd="url(#team-arrow)" />
        <path d="M574 264H750V520H738" markerEnd="url(#team-arrow)" />
      </g>
      <path d="M380 264V652H412" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#yard-arrow)" />

      <rect x="250" y="48" width="260" height="56" fill="none" stroke={edge} strokeWidth="1.25" />
      <text x="380" y="72" textAnchor="middle" fontWeight="600" fill={ink}>Owner</text>
      <text x="380" y="88" textAnchor="middle" fontSize="11.5" fill={quiet}>Sets brief, budget and authority</text>

      <DiagramBox x={24} y={148} w={220} h={88} title="Family office" lines={["Financial controller. Holds", "funds, releases certified", "stage payments."]} />

      <rect x="270" y="148" width="220" height="88" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="2" />
      <text x="282" y="172" fontWeight="600" fill={ink}>Owner&apos;s representative</text>
      <text x="282" y="188" fontSize="11.5" fill={ink}>Leads the team. Runs the</text>
      <text x="282" y="204" fontSize="11.5" fill={ink}>programme. Certifies</text>
      <text x="282" y="220" fontSize="11.5" fill={ink}>milestones and changes.</text>

      <DiagramBox x={516} y={148} w={220} h={88} title="Legal and tax advisers" lines={["Shipbuilding lawyer. Tax,", "structuring and insurance", "advisers."]} />

      <rect x="24" y="292" width="324" height="424" fill="rgba(83,134,182,0.06)" stroke={edge} strokeWidth="1.25" />
      <text x="40" y="314" fontWeight="600" fill={ink}>Technical specialists</text>
      <DiagramBox x={40} y={324} w={292} h={56} title="Mechanical and systems" lines={["Propulsion, power, HVAC, commissioning"]} />
      <DiagramBox x={40} y={388} w={292} h={56} title="Paint and coatings" lines={["Paint specification, hold-point inspection"]} />
      <DiagramBox x={40} y={452} w={292} h={56} title="Noise and vibration" lines={["Contract limits, modelling, measurement"]} />
      <DiagramBox x={40} y={516} w={292} h={56} title="Interior" lines={["Design intent, mock-ups, joinery"]} />
      <DiagramBox x={40} y={580} w={292} h={56} title="Naval architect" lines={["Structure, stability, weight control"]} />
      <DiagramBox x={40} y={644} w={292} h={56} title="Class and flag compliance" lines={["Plan approval, surveys, certification"]} />

      <rect x="412" y="292" width="324" height="168" fill="rgba(83,134,182,0.06)" stroke={edge} strokeWidth="1.25" />
      <text x="428" y="314" fontWeight="600" fill={ink}>Future operators</text>
      <DiagramBox x={428} y={324} w={292} h={56} title="Captain and chief engineer" lines={["Operational input, trials, acceptance"]} />
      <DiagramBox x={428} y={388} w={292} h={56} title="Yacht manager" lines={["Safety management, crew, budgets, handover"]} />

      <DiagramBox x={412} y={484} w={324} h={72} title="Owner's designers" lines={["Exterior and interior designers, naval", "architect of record. Contracted by the owner."]} />

      <text x="412" y="604" fontSize="11.5" fontWeight="600" fill={ink}>Sole channel of instruction</text>
      <DiagramBox x={412} y={616} w={324} h={72} dashed title="Shipyard" lines={["Outside the owner's team. Takes instructions", "through the representative only."]} />
    </svg>
  );
}

function TeamDiagramMobile() {
  const node = "border border-white/20 px-4 py-3";
  return (
    <div className="space-y-3 text-sm">
      <div className={node}>
        <p className="font-semibold text-white">Owner</p>
        <p className="text-muted text-xs mt-1">Sets brief, budget and authority</p>
      </div>
      <div className="ml-4 space-y-3 border-l border-white/20 pl-4">
        <div className={node}>
          <p className="font-semibold text-white">Family office</p>
          <p className="text-muted text-xs mt-1">Financial controller. Holds funds, releases certified stage payments.</p>
        </div>
        <div className={node}>
          <p className="font-semibold text-white">Legal and tax advisers</p>
          <p className="text-muted text-xs mt-1">Shipbuilding lawyer. Tax, structuring and insurance advisers.</p>
        </div>
        <div className="border-2 border-accent bg-accent/15 px-4 py-3">
          <p className="font-semibold text-white">Owner&apos;s representative</p>
          <p className="text-white/90 text-xs mt-1">Leads the team. Runs the programme. Certifies milestones and changes.</p>
        </div>
        <div className="ml-4 space-y-3 border-l border-white/20 pl-4">
          <div className={node}>
            <p className="font-semibold text-white">Technical specialists</p>
            <p className="text-muted text-xs mt-1">Mechanical and systems, paint and coatings, noise and vibration, interior, naval architect, class and flag compliance.</p>
          </div>
          <div className={node}>
            <p className="font-semibold text-white">Future operators</p>
            <p className="text-muted text-xs mt-1">Captain and chief engineer, yacht manager.</p>
          </div>
          <div className={node}>
            <p className="font-semibold text-white">Owner&apos;s designers</p>
            <p className="text-muted text-xs mt-1">Exterior and interior designers, naval architect of record. Contracted by the owner.</p>
          </div>
          <div className="border border-dashed border-accent px-4 py-3">
            <p className="font-semibold text-white">Shipyard</p>
            <p className="text-muted text-xs mt-1">Outside the owner&apos;s team. Takes instructions through the representative only.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OwnersTeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": "https://www.forelandmarine.com/owners-representation/owners-team#webpage",
              name: "The Owner's Team on a Yacht New Build",
              description:
                "The owner's team for a superyacht new build: owner's representative, lawyers, technical specialists, family office and crew, with reporting lines and appointment by stage.",
              url: "https://www.forelandmarine.com/owners-representation/owners-team",
              isPartOf: { "@type": "WebSite", url: "https://www.forelandmarine.com" },
              about: { "@id": "https://www.forelandmarine.com/owners-representation#service" },
              publisher: { "@type": "Organization", name: "Foreland Marine Consultancy Ltd" },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.forelandmarine.com" },
                { "@type": "ListItem", position: 2, name: "New Build", item: "https://www.forelandmarine.com/owners-representation" },
                { "@type": "ListItem", position: 3, name: "The Owner's Team", item: "https://www.forelandmarine.com/owners-representation/owners-team" },
              ],
            },
          ]),
        }}
      />

      {/* HERO */}
      <ParallaxHero
        imageSrc="/images/new-build-yard.jpg"
        imageAlt="Yacht new build in a shipyard hall"
        imageClassName="object-cover opacity-45 scale-110"
        gradientClassName="bg-gradient-to-b from-bg0/70 via-bg0/40 to-bg0"
      >
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            The owner&apos;s team for a yacht new build
          </h1>
          <p className="text-lg text-[#8FBAD4] leading-relaxed max-w-2xl">
            A shipyard comes to a new build contract with its own project managers, naval architects and lawyers. The owner&apos;s equivalent has to be assembled, usually before the yard is selected, since the contract and specification determine most of the owner&apos;s position for the remainder of the build. This page describes the composition of that team, the reporting line of each member and the stage at which each is appointed.
          </p>
        </div>
      </ParallaxHero>

      {/* STRUCTURE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-10 leading-tight" data-animate="fade-up">
            Structure and reporting lines
          </h2>
          <figure>
            <div className="hidden md:block">
              <TeamDiagram />
            </div>
            <div className="md:hidden">
              <TeamDiagramMobile />
            </div>
            <figcaption className="mt-8 max-w-3xl text-muted leading-relaxed">
              The family office and the lawyers report to the owner directly. The technical specialists, the owner&apos;s designers, the captain and chief engineer, and the yacht manager report through the owner&apos;s representative, who alone issues instructions to the yard.
            </figcaption>
          </figure>
        </div>
      </section>

      <HorizonLine />

      {/* WHO DOES WHAT */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-8 leading-tight">Roles and responsibilities</h2>
          <p className="text-muted leading-relaxed mb-5">
            The owner sets the brief, the budget and how much the representative may approve without referring back. The family office holds the funds; it pays stage instalments once the representative has certified them, keeps the refund guarantees and insurance certificates in date, and tracks the costs outside the yard contract, such as owner&apos;s supply items and crew. Certification and payment stay with different people, a control set out more fully on our <Link href="/owners-representation" className="text-accent hover:text-white transition-colors">owner&apos;s representation</Link> page.
          </p>
          <p className="text-muted leading-relaxed mb-5">
            A shipbuilding lawyer negotiates the contract and the refund guarantees, and settles how the specification is incorporated into the contract; a corporate lawyer or family solicitor is not usually suited to the work. Tax and structuring advisers settle the ownership company, flag and VAT position before signature, since an intention to charter, for example, can change the specification. An insurance broker reviews the yard&apos;s builder&apos;s risk cover and arranges the owner&apos;s cover from delivery.
          </p>
          <p className="text-muted leading-relaxed mb-5">
            The owner&apos;s representative runs the programme and the reporting, reviews the specification, checks milestone claims and change orders, and is the single channel to the yard. On a smaller or series-built yacht the representative usually also acts as the owner&apos;s project manager; on a larger yacht the two roles are separated, with a resident project manager and site team reporting to the representative. Technical specialists are engaged for defined scopes of work and report through the representative: a mechanical and systems consultant for propulsion, power, HVAC and the factory acceptance tests; a paint inspector at the agreed hold points; an independent naval architect on structure, stability and the weight budget; and a class and flag specialist for plan approval, surveys and the statutory certificates.
          </p>
          <p className="text-muted leading-relaxed mb-5">
            Noise and vibration limits are written into the contract and modelled early in design, because they are only measured at sea trials, when structural changes are rarely practical. An interior consultant acts between the designer and the joiners on mock-ups, samples and owner&apos;s supply items. Sailing yachts add rig, sail plan and deck hardware specialists.
          </p>
          <p className="text-muted leading-relaxed mb-5">
            On a custom build the exterior and interior designers, and often the naval architect of record, are usually contracted by the owning company. They are then members of the owner&apos;s team, and the representative co-ordinates their drawings and approvals with the yard. Where the yard engages the designer instead, the owner should establish before signature what the designer is obliged to do for the owner.
          </p>
          <p className="text-muted leading-relaxed">
            The captain and chief engineer should be appointed during the build, so that those who will operate the yacht can review the specification and are familiar with her systems before handover. The yacht manager is appointed later in the build to establish the safety management system, crew contracts, the planned maintenance system and the flag and class documentation, so that no certificate or contract lapses at delivery.
          </p>
        </div>
      </section>

      <HorizonLine />

      {/* WHO JOINS WHEN */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">Appointment by project stage</h2>
            <p className="text-muted leading-relaxed">
              Most specialists are engaged for short periods at particular stages rather than for the duration of the build.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm border-collapse">
              <thead>
                <tr className="border-b border-accent/40">
                  <th scope="col" className="text-left font-semibold text-white py-3 pr-4 align-bottom">Role</th>
                  {stages.map((s) => (
                    <th key={s} scope="col" className="text-left font-semibold text-white py-3 px-4 align-bottom">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeline.map(([role, ...cells]) => (
                  <tr key={role} className="border-b border-white/8">
                    <th scope="row" className="text-left font-normal text-white py-3 pr-4 align-top">{role}</th>
                    {cells.map((c, i) => (
                      <td key={i} className="text-muted py-3 px-4 align-top">{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* WORKING ARRANGEMENTS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-8 leading-tight">Working arrangements</h2>
          <p className="text-muted leading-relaxed mb-5">
            Several parties close to the project have obligations of their own. The yard works to its contract; the classification society checks the yacht against its rules, not against the owner&apos;s specification; the flag state is concerned with statutory compliance; and a broker is usually paid on commission. Each is valuable to the project, though none of them acts for the owner.
          </p>
          <p className="text-muted leading-relaxed">
            We would normally establish the team on the following terms. All instructions to the yard pass through the representative, since an informal request from the owner or from a consultant on site may otherwise be treated as a change order. The representative&apos;s authority is set out at the start in a letter of authority or power of attorney, stating what may be approved without reference to the owner and when the authority expires, since approvals of variations and milestones can bind the owner. Specialists are contracted by the owning company wherever possible, so that their duty runs to the owner, with the representative managing their scope and budget. The owner receives a single regular report on programme, cost, quality and the decisions needed, with the specialists&apos; findings included rather than forwarded separately.
          </p>
        </div>
      </section>

      <HorizonLine />

      {/* SCALE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">Team composition by size of yacht</h2>
            <p className="text-muted leading-relaxed">
              The roles are the same at each size of yacht; what varies is the number held full time.
            </p>
          </div>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-accent/40">
                <th scope="col" className="text-left font-semibold text-white py-3 pr-6 w-1/3">Project</th>
                <th scope="col" className="text-left font-semibold text-white py-3">Typical structure</th>
              </tr>
            </thead>
            <tbody>
              {scale.map((s) => (
                <tr key={s.project} className="border-b border-white/8">
                  <th scope="row" className="text-left font-normal text-white py-4 pr-6 align-top">{s.project}</th>
                  <td className="text-muted leading-relaxed py-4 align-top">{s.structure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ (read by search engines, hidden on screen) */}
      <section className="sr-only">
        <h2>Common questions</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </section>

      <HorizonLine />

      {/* RELATED */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-muted">
          Related: <Link href="/owners-representation" className="text-accent hover:text-white transition-colors">New Build Owner&apos;s Representation</Link>, <Link href="/technical-consultancy" className="text-accent hover:text-white transition-colors">Technical Consultancy</Link>, <Link href="/yacht-management" className="text-accent hover:text-white transition-colors">Yacht Management</Link>, <Link href="/insights/how-to-buy-your-first-superyacht" className="text-accent hover:text-white transition-colors">How to Buy Your First Superyacht</Link>
        </p>
      </div>

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/j-class-finish.jpg" alt="J Class yacht racing, built with independent owner's representation" fill sizes="100vw" className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-bg0/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-5">Discuss your project</h2>
          <p className="text-muted leading-relaxed text-base mb-8 max-w-xl mx-auto">
            We should be glad to set out the team a project needs, whether it is at concept stage or already in build.
          </p>
          <ButtonPrimary href="/contact">Get in touch</ButtonPrimary>
        </div>
      </section>
    </>
  );
}
