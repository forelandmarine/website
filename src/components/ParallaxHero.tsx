"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ParallaxHeroProps {
  imageSrc: string;
  imageAlt?: string;
  imagePosition?: string;
  children: React.ReactNode;
}

export default function ParallaxHero({
  imageSrc,
  imageAlt = "",
  imagePosition = "center",
  children,
}: ParallaxHeroProps) {
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
    <section ref={heroRef} className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-bg0">
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className={`object-cover object-[${imagePosition}] opacity-55 saturate-[1.15] scale-110`}
          style={{ objectPosition: imagePosition }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg0/35 via-bg0/15 to-bg0" />
      </div>
      <div
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
        style={{
          transform: `translateY(${scrollY * -0.15}px)`,
          opacity: Math.max(0, 1 - scrollY / 600),
        }}
      >
        {children}
      </div>
    </section>
  );
}
