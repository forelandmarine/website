import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HorizonLine, SectionLabel, ButtonPrimary, ServiceCard } from "@/components/ui";
import ParallaxHero from "@/components/ParallaxHero";

export const metadata: Metadata = {
  title: "Yacht Owner's Representation",
  description:
    "Independent yacht owner's representative for new builds and refits. Accredited by SYBAss and registered on the Yacht Owner's Representative Register. No yard affiliations, no commissions. Foreland Marine Consultancy.",
  keywords: [
    "yacht owner's representative",
    "owner's representation",
    "yacht owner representative",
    "new build owner's rep",
    "independent owner's representative",
    "superyacht owner's representative",
    "yacht new build representation",
    "yacht refit owner's rep",
    "SYBAss accredited",
    "YORR registered",
  ],
  alternates: {
    canonical: "https://forelandmarine.com/owners-representation",
  },
  openGraph: {
    title: "Yacht Owner's Representation | Foreland Marine",
    description:
      "Independent yacht owner's representative for new builds and refits. Accredited by SYBAss. No yard affiliations, no commissions.",
    url: "https://forelandmarine.com/owners-representation",
  },
};

const services = [
  {
    title: "Contract Review & Negotiation",
    description:
      "Detailed review of shipyard contracts, specifications, and payment schedules to ensure the owner's position is properly protected. Identification of ambiguous clauses, missing provisions, and terms that disproportionately favour the yard.",
  },
  {
    title: "Yard Selection & Evaluation",
    description:
      "Systematic assessment of shipyards based on capability, track record, capacity, financial stability, and suitability for the project. Site visits, reference checks, and structured comparison to support an informed decision.",
  },
  {
    title: "Design & Specification Review",
    description:
      "Independent review of general arrangement, technical specifications, and equipment selections. Ensuring the design intent aligns with the owner's brief and that specifications are sufficiently detailed to hold the yard accountable.",
  },
  {
    title: "Build Oversight & Quality Control",
    description:
      "Regular on-site inspections throughout the build or refit period. Monitoring hull construction, systems installation, paintwork, and outfitting quality against the agreed specification and classification standards.",
  },
  {
    title: "Budget & Schedule Management",
    description:
      "Continuous tracking of expenditure against budget, verification of milestone payment claims, change order review, and schedule monitoring. Early identification of cost risks and programme delays before they escalate.",
  },
  {
    title: "Commissioning & Sea Trials",
    description:
      "Coordination and oversight of systems commissioning, attendance at sea trials, compilation of snagging lists, and management of the formal acceptance process on behalf of the owner.",
  },
  {
    title: "Warranty Management",
    description:
      "Post-delivery oversight including defect tracking, warranty claims management, and continued liaison with the shipyard throughout the guarantee period to ensure all obligations are met.",
  },
  {
    title: "Flag State & Class Compliance",
    description:
      "Coordination with classification societies and flag state authorities to ensure the vessel meets all regulatory requirements. Management of survey schedules, documentation, and statutory compliance throughout the project.",
  },
];

export default function OwnersRepresentationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "Owner's Representation",
              provider: {
                "@type": "Organization",
                name: "Foreland Marine Consultancy Ltd",
                url: "https://forelandmarine.com",
              },
              areaServed: "Worldwide",
              description:
                "Independent yacht owner's representation for new build and refit projects. Accredited by SYBAss and registered on the Yacht Owner's Representative Register. Foreland Marine Consultancy.",
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://forelandmarine.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Owner's Representation",
                  item: "https://forelandmarine.com/owners-representation",
                },
              ],
            },
          ]),
        }}
      />

      {/* HERO */}
      <ParallaxHero imageSrc="/images/j-class-racing.jpg" imagePosition="center">
        <div className="flex items-start justify-between gap-8">
          <div className="max-w-3xl">
            <SectionLabel>Owner&apos;s Representation</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Independent Owner&apos;s<br />Representation for Yacht<br />New Builds and Refits
            </h1>
            <p className="text-lg text-[#8FBAD4] leading-relaxed max-w-2xl">
              Foreland Marine provides independent owner&apos;s representation for yacht new build and refit projects worldwide. Accredited by SYBAss and registered on the Yacht Owner&apos;s Representative Register, we act solely in the owner&apos;s interest at every stage of the project.
            </p>
          </div>
          <div className="hidden lg:flex flex-col items-center gap-6 flex-shrink-0 mt-[50px] relative z-20">
            <Image src="/logos/sybass-white.png" alt="SYBAss accredited" width={240} height={73} />
            <Image src="/logos/yacht-owners-register-white.png" alt="Yacht Owner&apos;s Representative Register" width={240} height={96} />
          </div>
        </div>
      </ParallaxHero>

      {/* WHAT IS AN OWNER'S REPRESENTATIVE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl" data-animate="fade-up">
            <SectionLabel>The Role</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">
              What is a yacht owner&apos;s representative?
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12" data-animate="fade-up">
            <div className="space-y-5">
              <p className="text-muted leading-relaxed">
                A yacht owner&apos;s representative is an independent professional who acts on behalf of the owner throughout a new build or major refit project. Their primary function is to protect the owner&apos;s interests in dealings with the shipyard, designers, subcontractors, and classification societies. This is not a passive advisory role. The owner&apos;s representative is actively involved in decision-making, quality control, financial oversight, and contractual enforcement from the earliest stages of the project through to delivery and beyond.
              </p>
              <p className="text-muted leading-relaxed">
                The need for an owner&apos;s representative arises from a fundamental imbalance. Shipyards are experienced commercial enterprises that build yachts for a living. Most yacht owners, by contrast, will undertake a new build or significant refit only once or twice in their lifetime. The knowledge gap between the two parties is substantial, and without professional representation, the owner is at a significant disadvantage when it comes to contract negotiation, specification detail, cost control, and quality enforcement. A yacht owner representative bridges that gap, bringing the technical expertise and project management discipline needed to hold the yard accountable.
              </p>
            </div>
            <div className="space-y-5">
              <p className="text-muted leading-relaxed">
                In practical terms, the owner&apos;s representative reviews and negotiates the build contract, evaluates candidate shipyards, monitors construction progress through regular site inspections, tracks expenditure against budget, attends production meetings, coordinates with the design team, and manages the commissioning and sea trial process. They maintain structured reporting to keep the owner informed without requiring the owner to be present at the yard on a daily basis. Where disputes or delays arise, the representative acts as the owner&apos;s advocate, pursuing resolution through established contractual mechanisms.
              </p>
              <p className="text-muted leading-relaxed">
                The scope of owner&apos;s representation extends well beyond the build period itself. Pre-project, the representative contributes to concept development, helps define the technical specification, and supports yard selection. Post-delivery, they oversee warranty claims, defect rectification, and the transition to operational management. Throughout, their objective is consistent: to deliver a vessel that meets the agreed specification, on time and within budget, while protecting the owner from unnecessary risk and cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* WHY INDEPENDENCE MATTERS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div data-animate="slide-right">
              <SectionLabel>Independence</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">
                Why choosing an independent owner&apos;s representative matters
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                Not all owner&apos;s representatives operate independently. Some are affiliated with shipyards, brokers, or management companies that receive commissions, referral fees, or other financial incentives from the parties they are supposed to be overseeing. This creates an inherent conflict of interest. When the person representing the owner has a financial relationship with the yard or a supplier, their advice cannot be considered impartial, regardless of their intentions.
              </p>
              <p className="text-muted leading-relaxed mb-5">
                An independent yacht owner&apos;s representative has no such entanglements. Their income comes solely from the owner they serve, and their recommendations are based entirely on what is best for the project. This independence is particularly important during yard selection, where the choice of shipyard has a decisive impact on cost, quality, and timeline. It is equally important during the build itself, when difficult conversations about defects, delays, or cost overruns require the representative to challenge the yard without fear of damaging a commercial relationship.
              </p>
              <p className="text-muted leading-relaxed">
                Foreland Marine Consultancy is entirely independent. We hold no yard affiliations, receive no commissions from shipyards or suppliers, and accept no referral fees from any third party. Every recommendation we make is driven by one consideration alone: the owner&apos;s best interest. This is not a marketing position. It is a fundamental principle of how we operate, and it is reflected in our adherence to the Yacht Owner&apos;s Representative Register Code of Conduct, which requires full disclosure of any potential conflicts of interest.
              </p>
            </div>
            <div data-animate="slide-left">
              <div className="bg-bg1 border border-white/8 p-8">
                <h3 className="text-lg font-light text-white mb-6">Our commitment to independence</h3>
                <div className="space-y-5">
                  <div className="border-l-2 border-accent/40 pl-5">
                    <h4 className="text-sm font-semibold text-white mb-1">No yard affiliations</h4>
                    <p className="text-sm text-muted leading-relaxed">We are not aligned with any shipyard, builder, or refit facility. Yard recommendations are based solely on capability and suitability.</p>
                  </div>
                  <div className="border-l-2 border-accent/40 pl-5">
                    <h4 className="text-sm font-semibold text-white mb-1">No commissions</h4>
                    <p className="text-sm text-muted leading-relaxed">We do not accept commissions, kickbacks, or referral fees from yards, suppliers, or subcontractors.</p>
                  </div>
                  <div className="border-l-2 border-accent/40 pl-5">
                    <h4 className="text-sm font-semibold text-white mb-1">No broker relationships</h4>
                    <p className="text-sm text-muted leading-relaxed">We have no financial relationship with brokers or sales agents. Our advice on purchasing decisions is unbiased.</p>
                  </div>
                  <div className="border-l-2 border-accent/40 pl-5">
                    <h4 className="text-sm font-semibold text-white mb-1">Full transparency</h4>
                    <p className="text-sm text-muted leading-relaxed">All fees, costs, and financial arrangements are disclosed to the owner. No hidden incentives influence our guidance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* WHAT WE COVER */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12" data-animate="fade-up">
            <SectionLabel>What We Cover</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
              Scope of owner&apos;s representation services
            </h2>
            <p className="text-muted leading-relaxed max-w-2xl">
              Our owner&apos;s representation covers the full lifecycle of a yacht project, from initial concept through to warranty management. Each engagement is tailored to the project, but the core areas of involvement are consistent.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-animate-stagger>
            {services.map((s) => (
              <ServiceCard key={s.title} title={s.title} description={s.description} data-animate="fade-up" />
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* WHEN TO APPOINT */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center" data-animate="fade-up">
            <SectionLabel>Timing</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">
              When to appoint a yacht owner&apos;s representative
            </h2>
            <p className="text-muted leading-relaxed mb-5">
              The most effective time to engage an owner&apos;s representative is as early as possible, ideally before signing a Letter of Intent or selecting a shipyard. Early involvement allows the representative to contribute to yard evaluation, contract negotiation, and specification development, ensuring the owner&apos;s position is properly protected from the outset.
            </p>
            <p className="text-muted leading-relaxed mb-5">
              That said, it is never too late. If construction is already underway and the owner feels they lack adequate oversight, an experienced representative can integrate at any stage. They will review existing contracts and documentation, assess the current state of the build, and establish a structured monitoring and reporting framework going forward.
            </p>
            <p className="text-muted leading-relaxed">
              The same principle applies to refit projects. Whether the work is still in the planning phase or the vessel is already in the yard, an independent owner&apos;s representative provides the technical scrutiny and project discipline that protects the owner&apos;s investment and holds all parties accountable to the agreed scope.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* ACCREDITATIONS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12" data-animate="fade-up">
            <SectionLabel>Accreditation</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-4 leading-tight">
              Recognised qualifications for owner&apos;s representation
            </h2>
            <p className="text-muted leading-relaxed max-w-2xl">
              Professional accreditation provides assurance that an owner&apos;s representative meets established standards of competence, conduct, and independence. Foreland Marine holds the following industry-recognised credentials.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start" data-animate-stagger>
            <div className="flex gap-6 items-start" data-animate="fade-up">
              <div className="flex-shrink-0 w-[120px]">
                <Image src="/logos/sybass-white.png" alt="SYBAss accredited" width={120} height={37} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-2">SYBAss Accreditation</h3>
                <p className="text-sm text-muted leading-relaxed">
                  The Superyacht Builders Association (SYBAss) sets the professional standard for owner&apos;s representation in the superyacht industry. SYBAss accreditation is recognised by member shipyards worldwide as confirmation that a representative has the technical knowledge, professional conduct, and operational experience required to oversee new build projects effectively. Foreland Marine is a SYBAss accredited company.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start" data-animate="fade-up">
              <div className="flex-shrink-0 w-[120px]">
                <Image src="/logos/yacht-owners-register-white.png" alt="Yacht Owner's Representative Register" width={120} height={48} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-2">Yacht Owner&apos;s Representative Register (YORR)</h3>
                <p className="text-sm text-muted leading-relaxed">
                  The YORR maintains a register of qualified owner&apos;s representatives who have demonstrated the requisite competence, experience, and commitment to professional standards. Registration requires adherence to a formal Code of Conduct covering integrity, transparency, conflict of interest disclosure, and respectful collaboration with all project parties. Our team members hold the YORR qualification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* RELATED SERVICES & FURTHER READING */}
      <section className="py-12 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8" data-animate="fade-up">
            <SectionLabel>Related Services</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">Explore our other services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10" data-animate-stagger>
            <ServiceCard
              title="New Build"
              description="Full new build management from concept and yard selection through to sea trials and delivery."
              href="/new-build"
              data-animate="fade-up"
            />
            <ServiceCard
              title="Refit Project Management"
              description="Planning, oversight, and project management for motor and sailing yacht refits worldwide."
              href="/refit"
              data-animate="fade-up"
            />
            <ServiceCard
              title="Technical Consultancy"
              description="Naval architecture, engineering, survey, and technical advisory services for yacht owners and operators."
              href="/technical-consultancy"
              data-animate="fade-up"
            />
          </div>
          <div data-animate="fade-up">
            <p className="text-xs text-muted/60 uppercase tracking-widest mb-3">Further Reading</p>
            <div className="flex flex-col gap-2">
              <Link href="/insights/the-role-of-an-owners-representative" className="text-sm text-accent hover:text-white transition-colors">
                The Role of an Owner&apos;s Representative in a New Build Project
              </Link>
              <Link href="/insights/owner-representation-during-yard-selection" className="text-sm text-accent hover:text-white transition-colors">
                Owner&apos;s Representation During Yard Selection: Getting It Right from Day One
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/j-class-racing.jpg" alt="" fill sizes="100vw" className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-bg0/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Get Started</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-5">Discuss your project</h2>
          <p className="text-muted leading-relaxed text-base mb-8 max-w-xl mx-auto">
            Whether you are planning a new build, managing a refit, or seeking independent oversight on a project already underway, our team is ready to help. Contact us to discuss how owner&apos;s representation can protect your investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonPrimary href="/contact">Discuss your project</ButtonPrimary>
          </div>
        </div>
      </section>
    </>
  );
}
