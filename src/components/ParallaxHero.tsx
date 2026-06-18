"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Image from "next/image";

type Props = {
  /** Optional background image. Omit if the hero uses non-image background content via `background`. */
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  /** Tailwind classes for the gradient overlay sitting on top of the image. */
  gradientClassName?: string;
  /** Tailwind classes for the outer <section>. */
  sectionClassName?: string;
  /** Extra elements rendered inside the parallax-shifted background layer (e.g. DotGrid, Glow). */
  background?: ReactNode;
  /** Decorations rendered after the background but before the content (e.g. Glow). No parallax shift. */
  decorations?: ReactNode;
  /** Hero content (eyebrow + h1 + supporting copy + CTAs). */
  children: ReactNode;
  /** Absolutely positioned bottom-edge element (e.g. HorizonLine). */
  bottomEdge?: ReactNode;
  /** Override the inner content wrapper className. */
  contentClassName?: string;
};

export default function ParallaxHero({
  imageSrc,
  imageAlt = "",
  imageClassName = "object-cover opacity-55 saturate-[1.15] scale-110",
  gradientClassName = "bg-gradient-to-b from-bg0/35 via-bg0/15 to-bg0",
  sectionClassName = "relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-bg0",
  background,
  decorations,
  children,
  bottomEdge,
  contentClassName = "relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform",
}: Props) {
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
    <section ref={heroRef} className={sectionClassName}>
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        {imageSrc && (
          <Image src={imageSrc} alt={imageAlt} fill sizes="100vw" className={imageClassName} priority />
        )}
        {imageSrc && gradientClassName && (
          <div className={`absolute inset-0 ${gradientClassName}`} />
        )}
        {background}
      </div>
      {decorations}
      <div
        className={contentClassName}
        style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
      >
        {children}
      </div>
      {bottomEdge}
    </section>
  );
}
