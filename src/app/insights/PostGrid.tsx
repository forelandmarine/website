"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { Post } from "./posts";

const CATEGORIES = ["All", "New Build", "Compliance", "Refit", "Yacht Management"];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function PostCard({ post }: { post: Post }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-fade-up-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={`/insights/${post.slug}`}
      className="group block border border-white/8 rounded bg-bg0/40 hover:bg-bg0/70 hover:border-accent/30 hover:scale-[1.02] transition-all duration-300 opacity-0 translate-y-6"
    >
      <div className="p-6 sm:p-8 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
            {post.category}
          </span>
          <span className="text-muted/40">|</span>
          <span className="text-xs text-muted/60">{post.readTime}</span>
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
  );
}

export default function PostGrid({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-3 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              active === cat
                ? "bg-accent text-white border-accent"
                : "bg-transparent text-muted border-white/15 hover:border-accent/40 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post grid */}
      {filtered.length === 0 ? (
        <p className="text-muted text-center py-16">No posts in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
