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
  { q: "Who is on the owner's team for a superyacht new build?", a: "The owner's team is led by the owner's representative and includes the owner's family office, a shipbuilding lawyer, tax, structuring and insurance advisers, technical specialists (mechanical and systems, paint and coatings, noise and vibration, interior, an independent naval architect, and class and flag compliance), the owner's designers, and the future captain, chief engineer and yacht manager. The shipyard, classification society and flag state sit outside the owner's team." },
  { q: "What does an owner's representative do on a yacht new build?", a: "The owner's representative holds the owner's authority on the project. They run the programme and reporting, review the specification, certify milestones and change orders, co-ordinate the specialists and designers, and are the sole channel of instruction to the shipyard." },
  { q: "What is the difference between an owner's representative and a project manager on a new build?", a: "The owner's representative acts for the owner and holds their authority; the project manager runs the day-to-day work on site. On a smaller or series-built yacht one person usually fills both roles. On a larger yacht a resident project manager and site team report to the representative." },
  { q: "When should the owner's team be appointed?", a: "Before the yard is selected. The owner's representative should be appointed first, ideally before a Letter of Intent, followed by a shipbuilding lawyer before any heads of terms are signed, since the contract and specification set what the yard must deliver and what rights the owner has if it does not. Specialists are then engaged at particular stages, and the captain, chief engineer and yacht manager during the build." },
  { q: "Who gives instructions to the shipyard during a new build?", a: "Only the owner's representative. Instructions from the owner, the family office or a consultant on site pass through the representative, since an informal request may otherwise be treated as a change order. The representative's authority is set out in a letter of authority or power of attorney." },
  { q: "To whom do the specialist consultants owe their duty?", a: "To the owner. They report through the representative so that the yard hears one voice and the owner receives one report, but they are contracted by the owning company wherever possible and their duty runs to the owner. We take no commission or referral fee from anyone we introduce." },
  { q: "Can my family office or captain act as owner's representative?", a: "A family office should control the money and a captain brings operational judgement the build needs, but neither role provides experience of managing a build. The representative should be someone who has delivered a yacht from a yard before." },
  { q: "Does Foreland supply the whole team?", a: "Our bench covers engineering, command, naval architecture, survey, coatings and performance sailing. Legal, tax and other specialist advisers are appointed independently, and we can assist with their selection." },
  { q: "Can a team be put in place once the build has started?", a: "Yes, although the contract and specification will already have been signed, which limits the owner's leverage. We can review the position at any stage and set out what can still be improved." },
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
    <svg viewBox="0 0 920 500" role="img" aria-label="The owner instructs the owner's representative, who alone instructs the shipyard; the family office and legal and tax advisers advise the owner; specialists, designers and future operators report to the representative" fontSize="13" className="w-full h-auto">
      <defs>
        <marker id="team-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={edge} />
        </marker>
        <marker id="yard-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={accent} />
        </marker>
      </defs>

      <text x="20" y="22" fontSize="11.5" fill={quiet}>Owner&apos;s team</text>
      <path d="M20 382H900" stroke={edge} strokeWidth="1" strokeDasharray="3 5" />
      <text x="20" y="404" fontSize="11.5" fill={quiet}>Outside the owner&apos;s team</text>

      <g fill="none" stroke={edge} strokeWidth="1.25" strokeDasharray="4 4">
        <path d="M330 60H150V110" />
        <path d="M590 60H770V110" />
      </g>

      <g fill="none" stroke={accent} strokeWidth="2">
        <path d="M460 90V228" markerEnd="url(#yard-arrow)" />
        <path d="M460 320V418" markerEnd="url(#yard-arrow)" />
      </g>

      <g fill="none" stroke={edge} strokeWidth="1.25">
        <path d="M280 275H328" markerEnd="url(#team-arrow)" />
        <path d="M640 234H615V316H640" />
        <path d="M615 275H592" markerEnd="url(#team-arrow)" />
      </g>

      <DiagramBox x={330} y={30} w={260} h={60} title="Owner" lines={["Sets brief, budget and authority"]} />

      <DiagramBox x={20} y={110} w={260} h={70} title="Family office" lines={["Holds funds, releases certified payments"]} />
      <DiagramBox x={640} y={110} w={260} h={70} title="Legal and tax advisers" lines={["Contract, structuring and insurance"]} />

      <rect x="330" y="230" width="260" height="90" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="2" />
      <text x="342" y="256" fontWeight="600" fill={ink}>Owner&apos;s representative</text>
      <text x="342" y="274" fontSize="11.5" fill={ink}>Leads the team, runs the programme,</text>
      <text x="342" y="290" fontSize="11.5" fill={ink}>certifies milestones and changes,</text>
      <text x="342" y="306" fontSize="11.5" fill={ink}>reports to the owner.</text>

      <DiagramBox x={20} y={200} w={260} h={150} title="Technical specialists" lines={["Mechanical and systems", "Paint and coatings", "Noise and vibration", "Interior", "Independent naval architect", "Class and flag compliance"]} />
      <DiagramBox x={640} y={200} w={260} h={68} title={"Owner's designers"} lines={["Exterior and interior designers,", "naval architect of record"]} />
      <DiagramBox x={640} y={282} w={260} h={68} title="Future operators" lines={["Captain and chief engineer,", "yacht manager"]} />

      <DiagramBox x={20} y={420} w={260} h={60} dashed title="Classification society" lines={["Checks against its rules"]} />
      <rect x="330" y="420" width="260" height="60" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="342" y="444" fontWeight="600" fill={ink}>Shipyard</text>
      <text x="342" y="460" fontSize="11.5" fill={quiet}>Receives instructions from the representative</text>
      <DiagramBox x={640} y={420} w={260} h={60} dashed title="Flag state" lines={["Statutory compliance"]} />
    </svg>
  );
}

function TeamDiagramMobile() {
  const node = "border border-white/20 px-4 py-3";
  const arrow = <div className="text-center text-accent leading-none" aria-hidden="true">&darr;</div>;
  return (
    <div className="space-y-2 text-sm">
      <p className="text-xs text-muted">Owner&apos;s team</p>
      <div className={node}>
        <p className="font-semibold text-white">Owner</p>
        <p className="text-muted text-xs mt-1">Sets brief, budget and authority.</p>
      </div>
      <div className="grid grid-cols-2 gap-2 pl-4 border-l border-dashed border-white/30 ml-4">
        <div className="border border-dashed border-white/20 px-3 py-2">
          <p className="font-semibold text-white text-xs">Family office</p>
          <p className="text-muted text-xs mt-1">Advises the owner; holds funds.</p>
        </div>
        <div className="border border-dashed border-white/20 px-3 py-2">
          <p className="font-semibold text-white text-xs">Legal and tax advisers</p>
          <p className="text-muted text-xs mt-1">Advise the owner.</p>
        </div>
      </div>
      <p className="text-center text-accent leading-none" aria-hidden="true">&darr;</p>
      <div className="border-2 border-accent bg-accent/15 px-4 py-3">
        <p className="font-semibold text-white">Owner&apos;s representative</p>
        <p className="text-white/90 text-xs mt-1">Holds the owner&apos;s authority. Leads the team, runs the programme, certifies milestones and reports to the owner.</p>
        <p className="text-white/90 text-xs mt-2">Reporting to the representative: technical specialists, the owner&apos;s designers, the captain and chief engineer, and the yacht manager.</p>
      </div>
      {arrow}
      <p className="pt-2 text-xs text-muted">Outside the owner&apos;s team</p>
      <div className="border border-dashed border-accent px-4 py-3">
        <p className="font-semibold text-white">Shipyard</p>
        <p className="text-muted text-xs mt-1">Receives instructions from the representative.</p>
      </div>
      <div className="border border-dashed border-white/20 px-4 py-3">
        <p className="font-semibold text-white">Classification society and flag state</p>
        <p className="text-muted text-xs mt-1">Check the yacht against their rules and statutory requirements.</p>
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
              name: "Superyacht New Build Owner's Team",
              headline: "New Build - Owner's Team",
              description:
                "The owner's team for a superyacht new build, 24 to 60 metres: owner's representative, shipbuilding lawyer, family office, technical specialists and crew, and when each is appointed.",
              url: "https://www.forelandmarine.com/owners-representation/owners-team",
              inLanguage: "en-GB",
              dateModified: "2026-11-08",
              isPartOf: { "@type": "WebSite", url: "https://www.forelandmarine.com" },
              about: { "@id": "https://www.forelandmarine.com/owners-representation#service" },
              publisher: { "@type": "Organization", name: "Foreland Marine Consultancy Ltd", url: "https://www.forelandmarine.com" },
              keywords: "superyacht new build team, owner's team, owner's representative, new build yacht consultant, new build yacht management, shipbuilding lawyer, new build project management",
              mainEntity: {
                "@type": "ItemList",
                name: "The owner's team on a superyacht new build",
                itemListElement: [
                  ["Owner's representative", "Holds the owner's authority, leads the team, runs the programme, certifies milestones and change orders, and is the sole channel of instruction to the shipyard."],
                  ["Family office", "Advises the owner, holds the funds and releases stage payments once certified by the representative."],
                  ["Shipbuilding lawyer", "Negotiates the build contract and refund guarantees, and settles which document prevails if the contract and specification conflict."],
                  ["Tax, structuring and insurance advisers", "Settle the ownership company, flag and VAT position before signature; the insurance broker reviews builder's risk cover."],
                  ["Technical specialists", "Mechanical and systems, paint and coatings, noise and vibration, interior, independent naval architect, and class and flag compliance, engaged at particular stages and reporting to the representative."],
                  ["Owner's designers", "Exterior and interior designers and the naval architect of record, contracted by the owning company and co-ordinated by the representative."],
                  ["Captain, chief engineer and yacht manager", "Appointed during the build to review the specification and prepare the yacht for operation."],
                ].map(([name, description], i) => ({ "@type": "ListItem", position: i + 1, name, description })),
              },
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
            New Build - Owner&apos;s Team
          </h1>
          <p className="text-lg text-[#8FBAD4] leading-relaxed max-w-2xl">
            A shipyard provides the contract for a superyacht new build, drafted by its own lawyers, and has its own naval architects and project managers on the project from the outset. We assemble and lead the equivalent team for the owner, ideally before a yard is selected, because the contract and specification set what the yard must deliver and what rights the owner has if it does not.
          </p>
        </div>
      </ParallaxHero>

      {/* STRUCTURE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight" data-animate="fade-up">
            Structure and reporting lines
          </h2>
          <p className="max-w-3xl text-muted leading-relaxed mb-12">
            As owner&apos;s representative we sit at the centre of the team, so the owner deals with one point of contact and receives one report. Our consultancy bench provides the engineering, naval architecture, survey and coatings expertise most builds require. The owner&apos;s lawyers, family office and captain keep their direct line to the owner, and we work alongside them.
          </p>
          <figure>
            <div className="hidden md:block">
              <TeamDiagram />
            </div>
            <div className="md:hidden">
              <TeamDiagramMobile />
            </div>
            <figcaption className="mt-8 max-w-3xl text-muted leading-relaxed">
              Authority runs from the owner to the owner&apos;s representative, who is the sole channel of instruction to the shipyard. The family office and the legal and tax advisers advise the owner directly. The technical specialists, the owner&apos;s designers and the future operators report to the representative.
            </figcaption>
          </figure>
        </div>
      </section>

      <HorizonLine />

      {/* APPOINTMENT AND RESPONSIBILITIES */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-10 leading-tight">Appointment and responsibilities</h2>
          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-light text-white mb-3">Before yard selection</h3>
              <p className="text-muted leading-relaxed">
                We are usually appointed first, and help the owner select a shipbuilding lawyer and tax and structuring advisers suited to the project before the yard is chosen. The contract and refund guarantees are negotiated at that stage, along with which document prevails if the contract and specification conflict, and the ownership company, flag and VAT position can alter the specification itself. The insurance broker reviews the builder&apos;s risk cover held by the yard at the same time. On a custom build the exterior and interior designers, and often the naval architect of record, are contracted by the owning company. Where the yard engages them instead, their obligations to the owner should be established before signature.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-light text-white mb-3">During the build</h3>
              <p className="text-muted leading-relaxed">
                Technical specialists are engaged at particular stages rather than for the duration of the build. The paint inspector attends the agreed hold points, the mechanical and systems consultant attends factory acceptance tests and commissioning, and the class and flag specialist covers plan approval and surveys. Noise and vibration is the exception: the limits are written into the contract and the levels modelled early in design, but they can only be measured at sea trials. On a smaller or series-built yacht we usually act as the owner&apos;s project manager as well; on a larger yacht we place a resident project manager and site team at the yard.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-light text-white mb-3">Before delivery</h3>
              <p className="text-muted leading-relaxed">
                The captain and chief engineer should be appointed during the build, so that those who will operate the yacht can review the specification and are familiar with her systems before handover. The yacht manager follows to establish the safety management system, crew contracts, planned maintenance and the flag and class documentation, so that no certificate or contract lapses at delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* WORKING ARRANGEMENTS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-8 leading-tight">Working arrangements</h2>
          <p className="text-muted leading-relaxed mb-5">
            We would normally establish the team on the following terms. The representative&apos;s authority is set out at the start in a letter of authority or power of attorney, stating what may be approved without reference to the owner and when it expires. Approvals of variations and milestones given by the representative can bind the owner. All instructions to the yard pass through the representative, as an informal request from the owner or a consultant on site may otherwise be treated as a change order. The representative certifies milestones and the family office releases the funds, so that no one both approves and pays. Specialists are contracted by the owning company wherever possible, so that their duty runs to the owner. The owner receives a single regular report on programme, cost, quality and the decisions needed. We take no broker commissions or referral fees.
          </p>
          <p className="text-muted leading-relaxed">
            The classification society checks the yacht against its rules rather than the owner&apos;s specification, and the yard, the flag state and the broker each have obligations of their own; none of them acts for the owner.
          </p>
        </div>
      </section>

      <HorizonLine />

      {/* SCALE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">Team composition by size of yacht</h2>
            <p className="text-muted leading-relaxed">
              We scale the team to the yacht. The roles are the same at each size; the number of full-time posts varies.
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

      {/* APPOINTMENT BY STAGE (read by search engines, hidden on screen) */}
      <section className="sr-only">
        <h2>Appointment by project stage</h2>
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
          Related: <Link href="/owners-representation" className="text-accent hover:text-white transition-colors">New Build Owner&apos;s Representation</Link>, <Link href="/technical-consultancy" className="text-accent hover:text-white transition-colors">Technical Consultancy</Link>, <Link href="/yacht-management" className="text-accent hover:text-white transition-colors">Yacht Management</Link>, <Link href="/insights/the-role-of-an-owners-representative" className="text-accent hover:text-white transition-colors">What the Owner&apos;s Rep Does at Each Stage</Link>, <Link href="/insights/owners-representative-vs-project-manager-vs-broker" className="text-accent hover:text-white transition-colors">Owner&apos;s Representative vs Project Manager vs Broker</Link>, <Link href="/insights/how-to-buy-your-first-superyacht" className="text-accent hover:text-white transition-colors">How to Buy Your First Superyacht</Link>
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
            We should be glad to set out the team your project needs and how we would resource it, whether it is at concept stage or already in build.
          </p>
          <ButtonPrimary href="/contact">Get in touch</ButtonPrimary>
        </div>
      </section>
    </>
  );
}
