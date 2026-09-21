import type { Metadata } from "next";
import Link from "next/link";
import { Glow, HorizonLine, ButtonPrimary } from "@/components/ui";

export const metadata: Metadata = {
  title: { absolute: "Press and Published Work | Foreland Marine" },
  description:
    "Bylined writing and industry commentary from Foreland Marine, including The unsecured owner in The Superyacht Report, Issue 230.",
  alternates: {
    canonical: "https://www.forelandmarine.com/insights/press",
  },
  openGraph: {
    title: "Press and Published Work | Foreland Marine",
    description:
      "Bylined writing and industry commentary from Foreland Marine, including The unsecured owner in The Superyacht Report, Issue 230.",
    type: "website",
    url: "https://www.forelandmarine.com/insights/press",
  },
};

/**
 * Trade press placements, newest first. Each entry is rendered and also
 * emitted as a citation node in schema, so the byline is machine-readable
 * for answer engines rather than only readable on the page.
 */
const placements = [
  {
    articleTitle: "The unsecured owner",
    periodical: "The Superyacht Report",
    issue: "Issue 230, Owners Focus",
    pages: "6-13",
    year: "2026",
    author: "Jack MacNally",
    standfirst:
      "Shipyard failure is not a rare event in yacht building, and most build contracts leave the owner badly placed should the worst happen. The proceedings running through the Court of Florence show the machinery in motion.",
    summary:
      "An account of how stage payments, refund guarantees and title to a hull under construction actually behave when a builder files for protection. The piece works through the 2026 Italian Sea Group proceedings, sets out Foreland Marine's review of some 25 yard failures since 2000, and names the measures a buyer can take before signature. It closes on a second inefficiency of the same kind: the 500gt line, and the design and refit distortion it creates.",
    externalUrl: "https://www.superyachtnews.com/reports/thesuperyachtreport",
    companionSlug: "shipyard-insolvency-what-happens-to-the-owner",
    companionLabel: "Shipyard insolvency: what happens to the owner",
  },
];

export default function PressPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.forelandmarine.com" },
        { "@type": "ListItem", position: 2, name: "Insights", item: "https://www.forelandmarine.com/insights" },
        { "@type": "ListItem", position: 3, name: "Press", item: "https://www.forelandmarine.com/insights/press" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://www.forelandmarine.com/insights/press",
      name: "Press and published work",
      description:
        "Bylined writing and industry commentary from Foreland Marine in the superyacht trade press.",
      inLanguage: "en-GB",
      isPartOf: { "@id": "https://www.forelandmarine.com/#organization" },
      about: { "@id": "https://www.forelandmarine.com/#organization" },
      hasPart: placements.map((p) => ({
        "@type": "Article",
        headline: p.articleTitle,
        abstract: p.standfirst,
        inLanguage: "en-GB",
        pagination: p.pages,
        url: p.externalUrl,
        author: { "@id": "https://www.forelandmarine.com/#jack-macnally" },
        publisher: {
          "@type": "Organization",
          name: "The Superyacht Group",
          url: "https://www.superyachtnews.com",
        },
        isPartOf: {
          "@type": "PublicationIssue",
          issueNumber: p.issue,
          isPartOf: {
            "@type": "Periodical",
            name: p.periodical,
            publisher: {
              "@type": "Organization",
              name: "The Superyacht Group",
              url: "https://www.superyachtnews.com",
            },
          },
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative py-20 sm:py-24 lg:py-28 bg-bg0 overflow-hidden">
        <Glow className="-top-40 -right-40 opacity-40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-10"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 12L6 8l4-4" />
            </svg>
            Back to Insights
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
              Press and published work
            </h1>
            <p className="article-summary text-lg text-muted leading-relaxed">
              Foreland Marine writes for the superyacht trade press on the subjects
              it works in: new build security, refit management and the regulation
              that shapes both. The work below is bylined, independent and written
              from the owner&apos;s side of the table.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* PLACEMENTS */}
      <section className="py-20 bg-bg1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {placements.map((p) => (
              <article
                key={p.articleTitle}
                className="border border-white/8 rounded bg-bg0/40 p-8 sm:p-10"
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest text-accent mb-5">
                  {p.periodical}, {p.issue}
                </p>
                <h2 className="text-2xl sm:text-3xl font-light text-white mb-4 leading-snug">
                  {p.articleTitle}
                </h2>
                <p className="text-muted leading-relaxed mb-6">{p.standfirst}</p>
                <p className="text-sm text-muted/80 leading-relaxed mb-8">{p.summary}</p>

                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/8 pt-6 mb-8">
                  <div>
                    <dt className="text-[10px] uppercase tracking-widest text-muted/60 mb-1">Author</dt>
                    <dd className="text-xs text-muted">{p.author}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-widest text-muted/60 mb-1">Publication</dt>
                    <dd className="text-xs text-muted">{p.periodical}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-widest text-muted/60 mb-1">Issue</dt>
                    <dd className="text-xs text-muted">{p.issue}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-widest text-muted/60 mb-1">Pages</dt>
                    <dd className="text-xs text-muted">{p.pages}</dd>
                  </div>
                </dl>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Link
                    href={`/insights/${p.companionSlug}`}
                    className="text-sm text-accent hover:text-white transition-colors"
                  >
                    Read the companion article: {p.companionLabel} &rarr;
                  </Link>
                  <a
                    href={p.externalUrl}
                    target="_blank"
                    rel="noopener"
                    className="text-sm text-muted hover:text-white transition-colors"
                  >
                    The Superyacht Report library &rarr;
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Own publishing */}
          <div className="mt-16 pt-10 border-t border-white/8">
            <h2 className="text-2xl font-light text-white mb-4">Published by Foreland Marine</h2>
            <p className="text-muted leading-relaxed mb-6">
              Alongside bylined trade press work, Foreland Marine publishes its own
              research. <a href="https://firstownersreference.com" className="text-accent underline underline-offset-2 hover:text-white transition-colors">The First Owner&apos;s Reference</a> is
              an independent annual field manual for first-time buyers, sourced and free to read.
              The <Link href="/insights" className="text-accent underline underline-offset-2 hover:text-white transition-colors">Insights</Link> library
              carries the firm&apos;s working notes on new build, refit, management and compliance.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* CTA */}
      <section className="relative py-16 sm:py-20 bg-bg0 overflow-hidden">
        <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="rgba(30,155,255,0.1)" size={600} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">Media enquiries</h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            For comment, contributed writing or background on new build security,
            refit management or sub-500gt regulation, contact Jack MacNally.
          </p>
          <ButtonPrimary href="/contact">Contact Us</ButtonPrimary>
        </div>
      </section>
    </>
  );
}
