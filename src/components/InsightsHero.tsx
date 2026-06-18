"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Glow, HorizonLine, SectionLabel } from "@/components/ui";

export default function InsightsHero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative py-28 overflow-hidden bg-bg1">
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <Image
          src="/images/ocean-aerial.jpg"
          alt="Aerial view of ocean"
          fill
          className="object-cover opacity-50 saturate-[1.15] scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg0/30 via-bg1/15 to-bg1" />
      </div>
      <Glow className="-top-40 left-1/2 -translate-x-1/2" color="rgba(30,155,255,0.15)" size={700} />
      <div
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
        style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
      >
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
  );
}
