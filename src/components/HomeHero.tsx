"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ButtonPrimary, ButtonOutline } from "@/components/ui";
import ScrollHint from "@/components/ScrollHint";

export default function HomeHero() {
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
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-bg0">
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <Image
          src="/images/j-class-racing.jpg"
          alt="J Class yachts racing under full sail"
          fill
          sizes="100vw"
          className="object-cover opacity-65 scale-110 saturate-[1.15]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg0/30 via-bg0/15 to-bg0" />
      </div>
      <div
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 -mt-[12vh] will-change-transform"
        style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
      >
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-white mb-6 leading-[1.1]">
            Smooth sailing.<br />Every time.
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-10">
            Independent superyacht consultancy. Project management, owner&apos;s representation and yacht management for sailing and motor yachts from 24 to 60 metres, worldwide.
          </p>
          <div className="hidden sm:flex flex-col sm:flex-row gap-4">
            <ButtonPrimary href="#services">Our Services</ButtonPrimary>
            <ButtonOutline href="/contact">Get in touch</ButtonOutline>
          </div>
        </div>
      </div>
      <ScrollHint />
    </section>
  );
}
