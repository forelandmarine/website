import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "./posts";

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
  return (
    <section className="py-24 bg-bg1 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-5">
            Insights
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-white mb-4">
            Industry insights &amp; expertise
          </h1>
          <p className="text-muted leading-relaxed max-w-2xl">
            Practical guidance on yacht management, new build projects, refit
            planning, regulatory compliance and the marine industry from the
            Foreland Marine team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="group block border border-white/8 rounded bg-bg0/40 hover:bg-bg0/70 transition-colors"
            >
              <div className="p-6 sm:p-8 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                    {post.category}
                  </span>
                  <span className="text-muted/40">|</span>
                  <span className="text-xs text-muted/60">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-lg font-light text-white group-hover:text-accent transition-colors mb-3 leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <time className="text-xs text-muted/50" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                  <span className="text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
