"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HorizonLine, SectionLabel, ButtonPrimary, Glow } from "@/components/ui";

const team = [
  {
    name: "Jack MacNally",
    role: "Co-Founder",
    initials: "JM",
    photo: "/images/team-jack.jpg",
    bio: <>A lifelong sailor with over 100,000 nautical miles in his logbook, Jack is a highly experienced racing yacht systems engineer and yachtsman. He has served as Chief Engineer on J&nbsp;-&nbsp;Class <i>Lionheart</i> and Chief Build Engineer on the landmark restoration of <i>Shamrock V</i>, as well a plethora of racing programs and large motor yacht projects. His career spans multiple successful racing campaigns with deep expertise in the hydraulic, mechanical and electrical systems that give high-performance yachts their competitive edge. He also campaigns his own yacht, the 1936 Teal class <i>Antoinette</i> in the Solent. A serial entrepreneur and keen motorcycle rider, he brings the same precision and drive to business as he does to engineering.</>,
    linkedin: "https://www.linkedin.com/in/jmacnally/",
  },
  {
    name: "Daniel Marks",
    role: "Co-Founder",
    initials: "DM",
    photo: "/images/team-dan.jpg",
    bio: <>Seven years as Senior Chief Engineer on J&nbsp;-&nbsp;Class <i>Lionheart</i>, leading multiple refits across Northern European shipyards and managing all aspects of the engineering department. Dan holds an FdSc in Yacht Science and Marine Sciences, and lectures at Falmouth Marine School where he helped develop the HND/FdSc Professional Superyacht Engineer programme with the University of Plymouth. A qualified Captain and experienced Build Engineer, he has delivered yachts across the Atlantic and beyond. WSET Level 3 qualified sommelier.</>,
    linkedin: "https://www.linkedin.com/in/daniel-marks-0a0a4b6b/",
  },
  {
    name: "Henry Ebdell",
    role: "Commercial Director",
    initials: "HE",
    photo: "/images/team-henry.jpg",
    bio: <>A commercially driven perspective shaped by over a decade at the intersection of elite yachting and high-value London property. His maritime career spans America&apos;s Cup programmes, maxi yachts and classic superyachts, working closely with technical systems, refit projects and contractor teams. Ashore, he held senior roles at Berkeley Group and Grange London, advising private clients on high-value residential transactions and delivering over &pound;30m in property sales. He also founded Sterling Ward, through which he continues to advise on high-value residential assets, and is co-founder of Sojourn Collective, a boutique wellness retreat concept. Henry combines commercial acumen with firsthand operational insight, bringing a pragmatic and discreet approach to every engagement.</>,
    linkedin: "https://www.linkedin.com/in/henry-ebdell-b383a81b3/",
  },
  {
    name: "Nadir Balena",
    role: "Chief Naval Architect & Project Manager",
    initials: "NB",
    photo: "/images/team-nadir.jpg",
    bio: <>Nadir holds a BEng (Hons) in Yacht and Powercraft Design from Solent University and brings deep experience across both the design office and the dock. His racing credentials include programmes on J&nbsp;-&nbsp;Class <i>Lionheart</i>, <i>Maserati Mod70</i>, <i>FlyingNikka</i>, <i>Falcon</i> and The Ocean Race, while his project management work spans new build sailing yachts up to 56m. A competitive windsurfer and lifelong waterman, he combines naval architecture expertise with a hands-on understanding of what makes high-performance yachts work.</>,
    linkedin: "https://www.linkedin.com/in/nadir-balena-276143112/",
  },
  {
    name: "Sam Forbes",
    role: "Senior Consultant",
    initials: "SF",
    photo: "/images/team-sam.jpg",
    bio: <>A Senior Consultant with experience spanning since 2015, including over five years in command as Captain. His background covers private and charter operations, with strong expertise in commercial compliance and flag state management. Sam brings extensive experience from the superyacht racing circuit, offering a deep understanding of performance optimisation, sail systems and high-level deck operations. He also has hands-on technical expertise in refit management, specialising in deck-focused projects including gear installation, servicing and system upgrades. Sam provides practical, results-driven consultancy across operations, refits and performance programmes, with a focus on efficiency, safety, compliance and delivering a seamless owner and charter experience.</>,
    linkedin: "#",
  },
  {
    name: "Steve Carver",
    role: "Meteorologist & Weather Routing",
    initials: "SC",
    photo: "/images/team-steve.jpg",
    bio: <>A meteorologist and data performance engineer, Steve is the founder of <a href="https://orcamet.co.uk" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition-colors underline">OrcaMet</a> and works with <a href="https://mlctechnologies.co.uk" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition-colors underline">MLC Technologies</a> as a data performance engineer. He provides weather routing and performance analysis services to TP52 and Cape 31 racing fleets as well as vessels on offshore passages. Steve holds a BSc in Marine Science from the University of East Anglia and an FdSc in Operational Yacht Science from UKSA, combining academic rigour with practical experience at sea.</>,
    linkedin: "https://www.linkedin.com/in/steve-carver-3779ba2b7/",
  },
];

const projects = [
  {
    title: "J Class Racing Campaign",
    type: "Racing Programme",
    scope: "Full technical preparation, systems commissioning and shore team management across two competitive seasons in the Mediterranean and Caribbean. Covered hydraulic and mechanical systems overhaul, rig inspection coordination, and logistics for a racing calendar spanning six regattas.",
    specs: "40m performance sailing yacht",
    duration: "24 months",
    location: "Mediterranean, Caribbean",
  },
  {
    title: "Classic Yacht Restoration",
    type: "Refit & Restoration",
    scope: "Comprehensive structural and systems restoration of a heritage sailing yacht, working closely with the design office and classification society to balance period authenticity with modern safety and compliance requirements. Included complete rewiring, new mechanical systems, hull remediation, and rigging renewal.",
    specs: "28m classic sailing yacht",
    duration: "18 months",
    location: "Northern Europe",
  },
  {
    title: "Performance Sailing Yacht New Build",
    type: "New Build Oversight",
    scope: "Owner's representation from contract negotiation through to sea trials and delivery. Scope covered specification review, build supervision, subcontractor coordination, systems commissioning, and warranty management. Worked alongside the naval architect and design team throughout the build programme.",
    specs: "36m performance sailing yacht",
    duration: "30 months",
    location: "Northern Europe",
  },
  {
    title: "Maxi Yacht Offshore Racing Refit",
    type: "Refit & Racing",
    scope: "Targeted refit programme to prepare a maxi yacht for an offshore racing season. Work included keel and rudder inspection, rig servicing, safety equipment upgrades to World Sailing Offshore Special Regulations, electronics integration, and weight audit. Delivered on schedule ahead of the season opener.",
    specs: "24m maxi racing yacht",
    duration: "6 months",
    location: "Mediterranean",
  },
  {
    title: "Superyacht Systems Integration & Sea Trials",
    type: "Technical Consultancy",
    scope: "Independent oversight of the integration and commissioning of all onboard systems following a major refit, including propulsion, electrical generation, navigation, communications, and crew safety systems. Managed the full sea trial programme and coordinated class and flag state sign-off.",
    specs: "52m sailing superyacht",
    duration: "12 months",
    location: "Mediterranean",
  },
];

const expertise = [
  {
    title: "Performance Sailing Yachts",
    description:
      "Deep experience in the 24 to 60 metre performance sailing segment, from grand prix racers to fast cruising yachts requiring the same level of technical rigour.",
  },
  {
    title: "Racing Programmes",
    description:
      "Technical preparation, campaign logistics and shore-side management for competitive sailing programmes at the highest level.",
  },
  {
    title: "New Build Oversight",
    description:
      "Independent owner's representation throughout the build process, from yard selection and contract negotiation to delivery and warranty management.",
  },
  {
    title: "Refit Project Management",
    description:
      "End-to-end management of refit and repair projects, controlling scope, budget and schedule while protecting the owner's interests.",
  },
  {
    title: "ISM & Compliance",
    description:
      "Safety management systems, ISM Code compliance and flag state documentation through our Lightship ISM platform, purpose-built for the superyacht sector.",
  },
  {
    title: "Technical Systems",
    description:
      "Mechanical, electrical and hydraulic systems engineering, from specification and procurement through to commissioning and sea trials.",
  },
];

export default function AboutPage() {
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
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://forelandmarine.com" },
              { "@type": "ListItem", position: 2, name: "About", item: "https://forelandmarine.com/about" },
            ],
          }),
        }}
      />

      {/* HERO */}
      <section ref={heroRef} className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-bg0">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Image
            src="/images/about-hero.jpg"
            alt="Performance sailing yacht under sail"
            fill
            className="object-cover opacity-55 saturate-[1.15] scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/30 via-bg0/10 to-bg0" />
        </div>
        <Glow className="-top-40 -right-40 opacity-30" />
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <div className="max-w-3xl">
            <SectionLabel>About</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Built on blue water<br />experience
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl mb-5">
              Foreland Marine was founded by professionals who have spent
              careers at sea and in shipyards, not behind desks. That
              hands-on background in sailing, engineering and project
              delivery shapes everything we do: practical advice, honest
              assessment, and consultancy grounded in real-world experience.
            </p>
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              We work exclusively on behalf of yacht owners. No yard
              affiliations, no broker commissions, no referral fees.
              Based in London, with consultants across all major yachting hubs worldwide.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* MEET THE TEAM */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg1 overflow-hidden">
        <Glow className="top-20 right-0 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14" data-animate="fade-up">
            <SectionLabel>Meet the Team</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Leading by example
            </h2>
            <p className="text-muted leading-relaxed">
              Our team brings hands-on experience across new build projects,
              race-winning campaigns, remote sailing expeditions,
              industry-leading charter yachts, and major restorations of
              some stunning classics. We count Captains, unlimited Chief
              Engineers, Fleet Managers, Surveyors and Naval Architects
              amongst our ranks, all with hundreds of thousands of nautical
              miles and plenty of stories to tell.
            </p>
          </div>

          <div className="flex flex-col gap-14" data-animate-stagger>
            {team.map((member) => (
              <div key={member.name + member.role} className="flex gap-6 items-start" data-animate="fade-up">
                {/* Circular headshot */}
                {member.photo ? (
                  <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
                    <Image src={member.photo} alt={member.name} width={192} height={192} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full bg-accent/15 border-2 border-accent/25 flex items-center justify-center text-accent font-semibold text-xl sm:text-2xl md:text-3xl shrink-0">
                    {member.initials}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-semibold text-white">{member.name}</h3>
                    {member.linkedin !== "#" && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-white transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-accent uppercase tracking-widest mb-2">{member.role}</p>
                  <p className="text-sm text-muted leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <HorizonLine />

      {/* EXPERTISE */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <Glow className="-bottom-60 -left-60 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14" data-animate="fade-up">
            <SectionLabel>Expertise</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Specialist knowledge across the yacht lifecycle
            </h2>
            <p className="text-muted leading-relaxed">
              Our focus is the 24 to 60 metre segment, with a particular
              depth in performance sailing yachts. This specialisation
              allows us to offer a level of technical understanding that
              generalist consultancies cannot match.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-animate-stagger>
            {expertise.map((item) => (
              <div
                key={item.title}
                className="border-l-2 border-accent/40 pl-6"
                data-animate="fade-up"
              >
                <h3 className="text-base font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* REFERENCE LIST */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg1 overflow-hidden">
        <Glow className="top-20 right-0 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14" data-animate="fade-up">
            <SectionLabel>Reference List</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Selected experience
            </h2>
            <p className="text-muted leading-relaxed">
              A selection of the yachts and shipyards our team has worked with
              across new build, refit, racing campaigns and technical
              consultancy projects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Yachts */}
            <div data-animate="fade-up">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-accent mb-6">Yachts</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {[
                  "Anomaly",
                  "Antoinette",
                  "Falcon",
                  "FlyingNikka",
                  "Halekai",
                  "Heureka",
                  "Inukshuk",
                  "Jeddah 1 (VOR60)",
                  "Jeddah 2 (VOR60)",
                  "Kraken 50-012",
                  "Lionheart",
                  "Maserati Mod70",
                  "Onyx II",
                  "Sedna",
                  "Shamrock V",
                  "Sojana",
                  "Sonny",
                  "Tootega",
                  "Velsheda",
                  "Vijonara",
                  "Wildberry",
                ].map((yacht) => (
                  <div key={yacht} className="flex items-center gap-2 text-sm text-muted">
                    <span className="w-1 h-1 rounded-full bg-accent/60" />
                    <span><i>{yacht}</i></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipyards */}
            <div data-animate="fade-up">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-accent mb-6">Shipyards</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {[
                  "Pendennis Falmouth",
                  "Pendennis Vilanova",
                  "Royal Huisman",
                  "Newport Shipyard",
                  "Lyman Morse",
                  "Rockport Marine",
                  "Hinckley Yachts",
                  "Markos",
                ].map((yard) => (
                  <div key={yard} className="flex items-center gap-2 text-sm text-muted">
                    <span className="w-1 h-1 rounded-full bg-accent/60" />
                    <span>{yard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* SELECTED PROJECTS */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <Glow className="-bottom-40 -left-40 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14" data-animate="fade-up">
            <SectionLabel>Selected Projects</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Anonymised case studies
            </h2>
            <p className="text-muted leading-relaxed">
              A cross-section of projects our team has delivered across racing
              campaigns, new builds, refits and technical consultancy. Details
              are anonymised to respect client confidentiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-animate-stagger>
            {projects.map((project) => (
              <div
                key={project.title}
                className="bg-bg2 border border-white/8 p-6 flex flex-col"
                data-animate="fade-up"
              >
                <p className="text-xs text-accent uppercase tracking-widest mb-3">
                  {project.type}
                </p>
                <h3 className="text-base font-semibold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-5 flex-1">
                  {project.scope}
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-4 border-t border-white/8">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted/60 mb-0.5">Vessel</p>
                    <p className="text-xs text-muted">{project.specs}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted/60 mb-0.5">Duration</p>
                    <p className="text-xs text-muted">{project.duration}</p>
                  </div>
                  <div className="col-span-2 mt-1">
                    <p className="text-[10px] uppercase tracking-widest text-muted/60 mb-0.5">Location</p>
                    <p className="text-xs text-muted">{project.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* ACCREDITATIONS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" data-animate="fade-up">
            <SectionLabel>Accreditations</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5">
              Recognised industry credentials
            </h2>
            <p className="text-muted leading-relaxed max-w-2xl mx-auto">
              Our accreditations provide owners with assurance that their
              representative meets the professional standards expected by
              the world&apos;s leading shipyards and industry bodies.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto" data-animate-stagger>
            {/* SYBAss */}
            <div className="bg-bg2 border border-white/8 p-8 flex flex-col items-center text-center" data-animate="scale-in">
              <div className="mb-6 flex items-center justify-center h-20">
                <Image
                  src="/logos/sybass-white.png"
                  alt="SYBAss - Superyacht Builders Association"
                  width={200}
                  height={61}
                />
              </div>
              <h3 className="text-base font-semibold text-white mb-3">
                SYBAss Accredited
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                The Superyacht Builders Association accredits owner&apos;s
                representatives who demonstrate the technical competence,
                professional conduct and industry experience required to
                oversee new build projects at member shipyards. SYBAss
                accreditation is widely regarded as the benchmark for
                owner&apos;s representation in the superyacht sector.
              </p>
            </div>
            {/* YORR */}
            <div className="bg-bg2 border border-white/8 p-8 flex flex-col items-center text-center" data-animate="scale-in">
              <div className="mb-6 flex items-center justify-center h-20">
                <Image
                  src="/logos/yacht-owners-register-white.png"
                  alt="Yacht Owner's Representative Register"
                  width={200}
                  height={80}
                />
              </div>
              <h3 className="text-base font-semibold text-white mb-3">
                YORR Registered
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                The Yacht Owner&apos;s Representative Register is an
                independent record of qualified professionals who meet
                defined standards of competence and adhere to a strict code
                of conduct. Registration provides owners with confidence
                that their representative operates with integrity,
                transparency, and no conflicts of interest.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.jpg"
            alt=""
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-bg0/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center" data-animate="fade-up">
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-5">
            Start a conversation
          </h2>
          <p className="text-muted leading-relaxed text-base mb-8 max-w-xl mx-auto">
            Whether you have a project on the horizon or simply want to
            discuss how we might help, we would be glad to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonPrimary href="/contact">Get in touch</ButtonPrimary>
          </div>
        </div>
      </section>
    </>
  );
}
