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

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Foreland Marine Consultancy Ltd",
      url: "https://forelandmarine.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Foreland Marine Consultancy Ltd",
      url: "https://forelandmarine.com",
      logo: {
        "@type": "ImageObject",
        url: "https://forelandmarine.com/logos/foreland-marine-white.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://forelandmarine.com/insights/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="py-24 bg-bg1 min-h-screen">
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
          <p className="text-lg text-muted leading-relaxed mb-12">
            {post.description}
          </p>

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
