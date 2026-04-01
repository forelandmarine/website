import type { Metadata } from "next";
import Image from "next/image";
import { HorizonLine, SectionLabel, ButtonPrimary, Glow } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Foreland Marine Consultancy — independent yacht consultancy built on blue water experience. SYBAss accredited, specialising in performance sailing yachts from 24 to 60 metres.",
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
        <div className="absolute inset-0">
          <Image
            src="/images/sailing-dramatic.jpg"
            alt=""
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/60 via-bg0/30 to-bg0" />
        </div>
        <Glow className="-top-40 -right-40 opacity-30" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>About</SectionLabel>
            <h1 className="text-5xl sm:text-6xl font-light text-white mb-6 leading-tight">
              Built on blue water<br />experience
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              Foreland Marine was founded by professionals who have spent
              careers at sea and in shipyards — not behind desks. That
              hands-on background in sailing, engineering and project
              delivery shapes everything we do: practical advice, honest
              assessment, and consultancy grounded in real-world experience.
            </p>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY / APPROACH — 2 column */}
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
                That independence is not a marketing position — it is a
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
          <div className="relative h-72 lg:h-auto min-h-[460px]">
            <Image
              src="/images/sailing-yacht-deck.jpg"
              alt="On deck of a sailing yacht at sea"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-bg0/10" />
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
                  alt="SYBAss — Superyacht Builders Association"
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
            src="/images/sailing-dramatic.jpg"
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
