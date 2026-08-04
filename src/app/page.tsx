/*
            ###
            ###
            ###
    #################
    #################
            ###
            ###
            ###
            ###
            ###
            ###
            ###

  For God so loved the world that he gave his one and only Son,
  that whoever believes in him shall not perish but have eternal life.
                                                      John 3:16 (NIV)

  And the peace of God, which transcends all understanding,
  will guard your hearts and your minds in Christ Jesus.
                                          Philippians 4:7 (NIV)
*/

import Image from "next/image";
import Link from "next/link";
import { HorizonLine, ButtonPrimary, ServiceCard } from "@/components/ui";
import NewsletterSignup from "@/components/NewsletterSignup";
import HomeHero from "@/components/HomeHero";
import HomeContactForm from "@/components/HomeContactForm";

const featuredInsights = [
  {
    slug: "how-to-buy-your-first-superyacht",
    category: "New Build",
    title: "How to Buy Your First Superyacht",
    description: "A practical guide for first-time owners covering budgeting, new build vs pre-owned, team selection and the mistakes that cost the most.",
  },
  {
    slug: "j-class-yacht-management",
    category: "Yacht Management",
    title: "J Class Yacht Management",
    description: "What managing a J Class involves: rig, sails, race logistics and the operational rhythms unique to these vessels.",
  },
  {
    slug: "what-is-a-yacht-owners-representative",
    category: "New Build",
    title: "What is a Yacht Owner's Representative?",
    description: "The role of an independent owner's representative during a new build, and why early appointment matters.",
  },
];

const faqs = [
  {
    question: "What services does Foreland Marine offer?",
    answer:
      "We provide new build owner's representation, yacht refit project management, technical consultancy, independent yacht management, ISM compliance, and performance sailing yacht engineering. We operate worldwide from our base in London.",
  },
  {
    question: "What is an owner's representative in a yacht new build?",
    answer:
      "An owner's representative acts independently on behalf of the yacht owner throughout the new build process. They provide oversight of the shipyard, manage budgets, review technical specifications, monitor build quality and ensure the owner's interests are protected from contract through to delivery.",
  },
  {
    question: "Are you independent from shipyards and brokers?",
    answer:
      "Yes. Foreland Marine is entirely independent. We hold no yard affiliations, receive no broker commissions and accept no referral fees from suppliers. Every recommendation we make serves one interest alone: the owner.",
  },
  {
    question: "What size yachts do you work with?",
    answer:
      "We specialise in sailing and motor yachts from 24 to 60 metres, with particular depth in performance sailing yachts. Our team has extensive experience with J Class yachts, maxi racers, fast carbon composite yachts and large motor yachts.",
  },
  {
    question: "What qualifications does the Foreland Marine team hold?",
    answer:
      "Our team includes Captains, unlimited Chief Engineers, Naval Architects, Fleet Managers and Surveyors. Foreland Marine is SYBAss accredited and registered on the Yacht Owner's Representative Register (YORR).",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* SERVICES */}
      <section id="services" className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" data-animate="fade-up">
            <h2 className="text-3xl sm:text-4xl font-light text-white">Independent superyacht refit, new build and yacht management consultancy.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-animate-stagger>
            <ServiceCard
              data-animate="fade-up"
              title="Refit Project Management"
              description="We manage every aspect of your yacht refit from beginning to end, from planning and design to project management and crew services. Our team ensures timely delivery, quality workmanship, and effective budgeting for sailing and motor yachts over 24m+."
              href="/refit"
            />
            <ServiceCard
              data-animate="fade-up"
              title="Performance & Technical Consultancy"
              description="Independent technical guidance for performance sailing yachts, from rig and sail systems to naval architecture and race preparation. Engineering support focused on reliability and speed on the water."
              href="/technical-consultancy"
            />
            <ServiceCard
              data-animate="fade-up"
              title="New Build Owner's Representation"
              description="Accredited by the Superyacht Builders Association (SYBAss), Foreland Marine provides expert leadership, management and representation on behalf of yacht owners for new build projects."
              href="/owners-representation"
            />
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* ABOUT - image left, text right */}
      <section className="py-0 bg-bg0 overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-0 sm:px-0 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 items-center">
            <div className="relative h-64 sm:h-80 md:h-[500px] lg:h-[720px] rounded-none lg:rounded overflow-hidden" data-animate="slide-right">
              <Image src="/images/balthasar-racing.jpg" alt="Maxi yacht Balthasar racing under sail" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-bg0/40" />
            </div>
            <div className="px-8 py-20 lg:px-0 lg:py-24" data-animate="slide-left">
              <div className="max-w-lg">
                <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 leading-tight">
                  Your guiding light through the storm.
                </h2>
                <p className="text-muted leading-relaxed mb-5">
                  At Foreland Marine, we provide yacht management and marine engineering consultancy across the full lifecycle of a superyacht project, from acquisition and new build through to refit, optimisation and ongoing management. Based in London, with a network of experienced professionals in Antibes, Palma de Mallorca, Fort Lauderdale, Antigua, the Netherlands, Germany, Italy and other key maritime centres, we operate with both global reach and local insight.
                </p>
                <p className="text-muted leading-relaxed mb-5">
                  Our team works closely with owners, captains and project stakeholders to ensure each vessel is delivered, maintained and operated to the highest standard. Whether overseeing complex refit programmes, supporting new build development, advising on vessel purchase, or refining performance on the race course, our approach is measured, practical and detail driven. The focus remains on protecting the owner&apos;s interests while enabling efficient, well coordinated project execution.
                </p>
                <p className="text-muted leading-relaxed mb-8">
                  The company takes its name from the South Foreland Lighthouse in Kent, a historic navigational landmark that has guided vessels into the Thames Estuary since the 17th century and later played a role in the first ship to shore wireless communication. That heritage underpins our ethos: to provide clear direction, dependable oversight and steady guidance through the complexities of modern yacht ownership and operation.
                </p>
                <ButtonPrimary href="/contact">Get in touch</ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* FAQ - JSON-LD for SEO, visible details for users */}
      <section className="sr-only">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            }),
          }}
        />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div data-animate="fade-up">
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-10">
              Common questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.question} className="group border border-white/10 bg-bg0" data-animate="fade-up">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-white font-medium select-none">
                  {f.question}
                  <span aria-hidden="true" className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <div className="px-6 pb-5 text-muted leading-relaxed text-sm">
                  {f.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* INSIGHTS TEASER */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4" data-animate="fade-up">
            <div>
              <h2 className="text-3xl sm:text-4xl font-light text-white">Industry knowledge, openly shared.</h2>
            </div>
            <Link href="/insights" className="text-sm text-accent hover:text-white transition-colors self-start sm:self-end">
              All articles &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-animate-stagger>
            {featuredInsights.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="group block border border-white/8 rounded bg-bg0/40 hover:bg-bg0/70 hover:border-accent/30 transition-all duration-300 p-6 sm:p-8"
                data-animate="fade-up"
              >
                <span className="text-[11px] font-semibold uppercase tracking-widest text-accent mb-4 block">
                  {post.category}
                </span>
                <h3 className="text-lg font-light text-white group-hover:text-accent transition-colors mb-3 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{post.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* NEWSLETTER SIGNUP */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10" data-animate="fade-up">
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">The Foreland Quarter</h2>
              <p className="text-muted leading-relaxed">
                A short letter from London, four times a year. The work of the quarter, what we are seeing in the industry, and what comes next. <Link href="/newsletters" className="text-accent hover:text-white transition-colors">Browse past issues</Link>.
              </p>
            </div>
            <div className="bg-bg2/80 border border-white/5 rounded p-4 sm:p-6 lg:p-8" data-animate="fade-up">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* CONTACT CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/racing-marina.jpg" alt="Racing yachts moored in marina at sunset" fill sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-bg0/75" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12" data-animate="fade-up">
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">Got a project coming up?</h2>
              <p className="text-muted leading-relaxed">
                A large project, maintenance period or big race coming up? We&apos;d love to hear from you.
              </p>
            </div>
            <div className="bg-bg2/80 border border-white/5 rounded p-4 sm:p-6 lg:p-8">
              <HomeContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
