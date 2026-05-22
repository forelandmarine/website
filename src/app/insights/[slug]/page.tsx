import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: `${post.title} | Foreland Marine`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Foreland Marine Consultancy"],
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const SERVICE_LINKS: Record<string, { href: string; label: string }> = {
  "New Build": { href: "/owners-representation", label: "New Build Owner's Representation" },
  "Refit": { href: "/refit", label: "Refit Project Management" },
  "Yacht Management": { href: "/yacht-management", label: "Yacht Management" },
  "Technical": { href: "/technical-consultancy", label: "Technical Consultancy" },
  "Compliance": { href: "/yacht-management", label: "Yacht Management" },
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const fallbackRelated =
    relatedPosts.length < 3
      ? posts.filter((p) => p.slug !== post.slug && p.category !== post.category).slice(0, 3 - relatedPosts.length)
      : [];
  const allRelated = [...relatedPosts, ...fallbackRelated];
  const serviceLink = SERVICE_LINKS[post.category];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-GB",
    keywords: post.keywords?.join(", "),
    articleSection: post.category,
    author: {
      "@type": "Person",
      "@id": "https://www.forelandmarine.com/#jack-macnally",
      name: "Jack MacNally",
      jobTitle: "Director, Foreland Marine",
      url: "https://www.forelandmarine.com/about",
      sameAs: ["https://www.linkedin.com/in/jmacnally/"],
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.forelandmarine.com/#organization",
      name: "Foreland Marine Consultancy Ltd",
      url: "https://www.forelandmarine.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.forelandmarine.com/logos/foreland-marine-white.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.forelandmarine.com/insights/${post.slug}`,
    },
  };

  const faqJsonLd = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <section className="py-16 sm:py-20 lg:py-24 bg-bg1 min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-10"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 12L6 8l4-4" />
            </svg>
            Back to Insights
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
              {post.category}
            </span>
            <span className="text-muted/40">|</span>
            <time className="text-xs text-muted/60" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <span className="text-muted/40">|</span>
            <span className="text-xs text-muted/60">{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-muted leading-relaxed mb-8">
            {post.description}
          </p>

          {/* Author byline */}
          <div className="flex items-center gap-3 mb-12 pb-8 border-b border-white/8">
            <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">
              JM
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-white">
                By <Link href="/about" className="hover:text-accent transition-colors">Jack MacNally</Link>
              </span>
              <span className="text-xs text-muted/60">Director, Foreland Marine</span>
            </div>
          </div>

          {/* Article content */}
          <div
            className="prose prose-invert prose-lg max-w-none
              [&>p]:text-muted [&>p]:leading-relaxed [&>p]:mb-6
              [&>h2]:text-white [&>h2]:text-2xl [&>h2]:font-light [&>h2]:mt-12 [&>h2]:mb-4
              [&>h3]:text-white [&>h3]:text-xl [&>h3]:font-light [&>h3]:mt-8 [&>h3]:mb-3
              [&>ul]:text-muted [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-2
              [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-white
              [&>blockquote]:border-l-2 [&>blockquote]:border-accent [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-muted/80"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FAQs */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-16 pt-10 border-t border-white/8">
              <h2 className="text-2xl font-light text-white mb-8">Frequently asked questions</h2>
              <div className="space-y-6">
                {post.faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-white/8 pb-6 last:border-b-0">
                    <h3 className="text-lg font-light text-white mb-3 leading-snug">
                      {faq.question}
                    </h3>
                    <p className="text-muted leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related service */}
          {serviceLink && (
            <div className="mt-16 pt-8 border-t border-white/8">
              <p className="text-xs text-muted/60 uppercase tracking-widest mb-3">Related service</p>
              <Link
                href={serviceLink.href}
                className="text-base text-accent hover:text-white transition-colors"
              >
                {serviceLink.label} &rarr;
              </Link>
            </div>
          )}

          {/* Related articles */}
          {allRelated.length > 0 && (
            <div className="mt-12">
              <p className="text-xs text-muted/60 uppercase tracking-widest mb-4">Continue reading</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {allRelated.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/insights/${rp.slug}`}
                    className="group block border border-white/8 rounded bg-bg0/40 hover:bg-bg0/70 hover:border-accent/30 transition-all duration-300 p-5"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-accent mb-2 block">
                      {rp.category}
                    </span>
                    <h3 className="text-sm font-light text-white group-hover:text-accent transition-colors leading-snug">
                      {rp.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="border border-white/10 rounded-lg p-8 sm:p-10 mt-16 text-center">
            <h2 className="text-xl font-light text-white mb-3">
              Need expert advice?
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-6 max-w-lg mx-auto">
              Whether you have a specific question or want to discuss how we can
              support your vessel, our team is here to help.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg0 text-sm font-medium rounded hover:bg-accent/90 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
