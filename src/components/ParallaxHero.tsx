"use client";

import { useEffect, useRef } from "react";

export default function ParallaxHero({
  bg,
  content,
  className = "",
  extra,
}: {
  bg: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  extra?: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches) return;

    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        if (!sectionRef.current || !bgRef.current || !contentRef.current) return;
        if (sectionRef.current.getBoundingClientRect().bottom < 0) return;

        const y = window.scrollY;
        bgRef.current.style.transform = `translateY(${y * 0.3}px)`;
        contentRef.current.style.transform = `translateY(${y * -0.15}px)`;
        contentRef.current.style.opacity = `${Math.max(0, 1 - y / 600)}`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className={className}>
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        {bg}
      </div>
      <div ref={contentRef} className="relative z-10 will-change-transform">
        {content}
      </div>
      {extra}
    </section>
  );
}
