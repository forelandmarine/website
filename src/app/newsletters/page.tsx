import type { Metadata } from "next";
import Image from "next/image";
import { Glow, HorizonLine, SectionLabel } from "@/components/ui";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "The Foreland Quarter — Newsletter",
  description:
    "The Foreland Quarter is the quarterly newsletter of Foreland Marine Consultancy. A short letter from London on yacht management, refit, new build and the wider superyacht industry.",
  alternates: { canonical: "https://www.forelandmarine.com/newsletters" },
};

type Issue = {
  slug: string;
  title: string;
  date: string;
  href: string;
  summary: string;
};

const issues: Issue[] = [
  {
    slug: "may-2026",
    title: "Two years in",
    date: "May 2026",
    href: "/newsletters/may-2026",
    summary:
      "Our first letter to clients and friends. The work this quarter — Palma, a transatlantic season, ISM compliance, a new build in Poland — and what comes next.",
  },
];

function IssueRow({ issue }: { issue: Issue }) {
  return (
    <a
      href={issue.href}
      className="group block border border-white/8 rounded bg-bg0/40 hover:bg-bg0/70 hover:border-accent/30 transition-all duration-300 p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-4 sm:gap-8 items-start">
        <div>
          <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
            {issue.date}
          </span>
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-light text-white group-hover:text-accent transition-colors mb-3 leading-snug">
            The Foreland Quarter — {issue.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed mb-5">{issue.summary}</p>
          <div className="flex items-center gap-2 text-sm text-accent font-medium group-hover:gap-3 transition-all">
            Read the issue
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function NewslettersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.forelandmarine.com" },
              { "@type": "ListItem", position: 2, name: "Newsletters", item: "https://www.forelandmarine.com/newsletters" },
            ],
          }),
        }}
      />

      {/* HERO */}
      <section className="relative py-24 overflow-hidden bg-bg1">
        <div className="absolute inset-0">
          <Image
            src="/images/ocean-aerial.jpg"
            alt="Aerial view of ocean"
            fill
            className="object-cover opacity-40 saturate-[1.15] scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/40 via-bg1/20 to-bg1" />
        </div>
        <Glow className="-top-40 left-1/2 -translate-x-1/2" color="rgba(30,155,255,0.15)" size={700} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>Newsletter</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight mb-6 leading-[1.05]">
              The Foreland Quarter
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              A short letter from London, four times a year. The work of the quarter, what we are seeing in the industry, and what comes next. Written by the Directors, read by clients and friends of the firm.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <HorizonLine />
        </div>
      </section>

      {/* SIGN UP */}
      <section className="py-16 sm:py-20 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <SectionLabel>Subscribe</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-3">Get the next issue by email</h2>
            <p className="text-muted leading-relaxed">
              One quarterly letter direct from the Directors. Nothing else.
            </p>
          </div>
          <div className="bg-bg2/80 border border-white/5 rounded p-4 sm:p-6 lg:p-8">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* ARCHIVE */}
      <section className="py-16 sm:py-20 bg-bg1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <SectionLabel>Archive</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-light text-white">Previous issues</h2>
          </div>
          <div className="space-y-4">
            {issues.map((issue) => (
              <IssueRow key={issue.slug} issue={issue} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
