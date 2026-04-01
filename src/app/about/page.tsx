import type { Metadata } from "next";
import Image from "next/image";
import { HorizonLine, SectionLabel, ButtonPrimary, Glow } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Foreland Marine Consultancy. Independent yacht consultancy built on blue water experience. SYBAss accredited, specialising in performance sailing yachts from 24 to 60 metres.",
};

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
  return (
    <>
      {/* HERO */}
      <section className="relative py-36 overflow-hidden bg-bg0">
        <Glow className="-top-40 -right-40 opacity-30" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>About</SectionLabel>
            <h1 className="text-5xl sm:text-6xl font-light text-white mb-6 leading-tight">
              Built on blue water<br />experience
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              Foreland Marine was founded by professionals who have spent
              careers at sea and in shipyards, not behind desks. That
              hands-on background in sailing, engineering and project
              delivery shapes everything we do: practical advice, honest
              assessment, and consultancy grounded in real-world experience.
            </p>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY / APPROACH - 2 column */}
      <section className="py-0 bg-bg1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center px-8 py-20 lg:px-16 lg:py-24">
            <div className="max-w-lg">
              <SectionLabel>Our Approach</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">
                Independent. Owner-aligned.<br />No conflicts.
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                We work exclusively on behalf of yacht owners. We hold no
                yard affiliations, receive no broker commissions, and accept
                no referral fees from suppliers. Every recommendation we
                make is guided by a single interest: the owner&apos;s.
              </p>
              <p className="text-muted leading-relaxed mb-5">
                That independence is not a marketing position. It is a
                structural commitment. It means owners can rely on objective
                technical assessments, unbiased yard evaluations, and
                transparent cost reporting without questioning whose
                interests are being served.
              </p>
              <p className="text-muted leading-relaxed">
                Based in Antibes at the heart of the Mediterranean
                superyacht industry, we operate across the major maritime
                centres worldwide, deploying experienced professionals
                wherever the project demands.
              </p>
            </div>
          </div>
          <div className="relative h-72 lg:h-auto min-h-[460px] bg-bg0 flex items-center justify-center p-8 lg:p-16">
            <div className="relative w-full max-w-sm overflow-hidden rounded border border-white/10 shadow-2xl shadow-black/40">
              <Image
                src="/images/jack-macnally.jpg"
                alt="Jack Macnally working on yacht systems during a refit"
                width={600}
                height={800}
                className="object-cover object-top w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* EXPERTISE */}
      <section className="relative py-24 bg-bg0 overflow-hidden">
        <Glow className="-bottom-60 -left-60 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertise.map((item) => (
              <div
                key={item.title}
                className="border-l-2 border-accent/40 pl-6"
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

      {/* MEET THE TEAM */}
      <section className="relative py-24 bg-bg1 overflow-hidden">
        <Glow className="top-20 right-0 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <SectionLabel>Meet the Team</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-5 leading-tight">
              Engineers first, consultants second
            </h2>
            <p className="text-muted leading-relaxed">
              Foreland Marine was founded by two yacht engineers who have spent
              over a decade each working on some of the most demanding vessels
              afloat, from J Class campaigns to high-performance carbon racers
              and large motor yachts. With more than 200,000 nautical miles
              between them, our advice comes from lived experience, not
              textbooks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
            {/* Jack Macnally */}
            <div className="bg-bg0 border border-white/8 p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-semibold text-lg">
                  JM
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Jack Macnally</h3>
                  <p className="text-sm text-accent">Co-Founder</p>
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-4">
                Jack has spent over ten years as a yacht engineer on J Class
                yachts, fast carbon composite racers and large motor yachts,
                accumulating more than 100,000 nautical miles. Originally from
                Chichester and sailing from a young age, he brings deep
                mechanical and systems engineering experience to every project.
              </p>
              <p className="text-sm text-muted leading-relaxed mb-5">
                His career has been defined by working at the sharp end of the
                sport, maintaining and optimising complex racing yachts under
                the pressures of competitive campaigns, where technical
                decisions are made quickly and must be right first time. That
                rigour carries directly into his approach to new build
                oversight, refit management and technical consultancy.
              </p>
              <a
                href="https://www.linkedin.com/in/jmacnally/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-white transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>

            {/* Daniel Marks */}
            <div className="bg-bg0 border border-white/8 p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-semibold text-lg">
                  DM
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Daniel Marks</h3>
                  <p className="text-sm text-accent">Co-Founder</p>
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-4">
                Dan has over a decade of hands-on engineering experience across
                the J Class fleet, high-performance carbon racing yachts and
                large motor yachts, with more than 100,000 nautical miles
                under his belt. From Exeter and sailing since childhood, his
                engineering career has been shaped by the demands of keeping
                complex vessels performing at the highest level.
              </p>
              <p className="text-sm text-muted leading-relaxed mb-4">
                His background spans mechanical, hydraulic and electrical
                systems across some of the most technically advanced sailing
                yachts in the world. Dan combines that depth of technical
                knowledge with a rare attention to detail in project delivery
                whether managing a refit schedule, specifying systems for a
                new build, or advising on operational compliance.
              </p>
              <p className="text-sm text-muted leading-relaxed mb-5">
                A WSET Level 3 qualified sommelier, Dan also brings an
                understanding of the hospitality side of yacht ownership that
                complements his engineering expertise.
              </p>
              <a
                href="https://www.linkedin.com/in/daniel-marks-0a0a4b6b/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-white transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

        </div>
      </section>

      <HorizonLine />

      {/* ACCREDITATIONS */}
      <section className="py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* SYBAss */}
            <div className="bg-bg2 border border-white/8 p-8 flex flex-col items-center text-center">
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
            <div className="bg-bg2 border border-white/8 p-8 flex flex-col items-center text-center">
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
      <section className="relative py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.jpg"
            alt=""
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-bg0/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
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
