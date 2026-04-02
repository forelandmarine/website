import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Glow, HorizonLine, SectionLabel, ButtonPrimary } from "@/components/ui";
import { posts } from "./posts";
import PostGrid from "./PostGrid";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Expert insights on yacht management, new build oversight, refit project management, ISM compliance and marine industry best practices from Foreland Marine.",
  openGraph: {
    title: "Insights | Foreland Marine",
    description:
      "Expert insights on yacht management, new build oversight, refit project management, ISM compliance and marine industry best practices.",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function InsightsPage() {
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <>
      {/* HERO */}
      <section className="relative py-28 overflow-hidden bg-bg1">
        <div className="absolute inset-0">
          <Image
            src="/images/ocean-aerial.jpg"
            alt=""
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/60 via-bg1/40 to-bg1" />
        </div>
        <Glow className="-top-40 left-1/2 -translate-x-1/2" color="rgba(30,155,255,0.15)" size={700} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>Insights</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight mb-6 leading-[1.05]">
              Industry knowledge,<br />openly shared
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              Practical guidance on yacht management, new build projects, refit
              planning, regulatory compliance and the marine industry from the
              Foreland Marine team.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <HorizonLine />
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="py-20 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/insights/${featuredPost.slug}`}
            className="group block border border-white/8 rounded bg-bg0/40 hover:bg-bg0/70 hover:border-accent/30 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Left accent panel */}
              <div className="relative lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/8">
                <Glow className="-top-20 -left-20" color="rgba(30,155,255,0.08)" size={400} />
                <div className="relative z-10">
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full mb-6">
                    {featuredPost.category}
                  </span>
                  <p className="text-xs text-muted/50 mb-3">
                    {formatDate(featuredPost.date)} &middot; {featuredPost.readTime}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-light text-white group-hover:text-accent transition-colors leading-snug">
                    {featuredPost.title}
                  </h2>
                </div>
              </div>
              {/* Right content panel */}
              <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
                <p className="text-muted leading-relaxed mb-8">
                  {featuredPost.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-accent font-medium group-hover:gap-3 transition-all">
                  Read article
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <HorizonLine />

      {/* FILTERED POST GRID */}
      <section className="py-20 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <SectionLabel>All Articles</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white">
              Browse by topic
            </h2>
          </div>
          <PostGrid posts={remainingPosts} />
        </div>
      </section>

      <HorizonLine />

      {/* CTA SECTION */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg0 overflow-hidden">
        <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="rgba(30,155,255,0.1)" size={600} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Get in touch</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
            Want to discuss a project?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            Whether you have a question about one of our articles or a project you would like to discuss, we are always happy to talk.
          </p>
          <ButtonPrimary href="/contact">Contact Us</ButtonPrimary>
        </div>
      </section>
    </>
  );
}
