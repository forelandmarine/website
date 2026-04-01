import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Links",
  description: "Foreland Marine Consultancy. Smooth Sailing. Every Time.",
  robots: { index: false, follow: false },
};

const links = [
  {
    title: "Website",
    description: "forelandmarine.com",
    href: "https://forelandmarine.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: "AIS SeaTime Tracker",
    description: "Download on the App Store",
    href: "https://apps.apple.com/gb/app/ais-seatime-tracker/id6758010893",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  },
  {
    title: "Lightship",
    description: "Intelligent Yacht Management",
    href: "https://lightship-fleet.com/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "LinkedIn",
    description: "Follow us",
    href: "https://www.linkedin.com/company/forelandmarine/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    title: "Instagram",
    description: "@forelandmarine",
    href: "https://www.instagram.com/forelandmarine",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function LinkPage() {
  return (
    <div className="min-h-screen bg-bg0 flex flex-col items-center px-4 py-12 sm:py-16 [&~footer]:hidden">
      {/* Hide nav and footer */}
      <style dangerouslySetInnerHTML={{ __html: `header, footer { display: none !important; }` }} />
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/logos/foreland-marine-white.svg"
          alt="Foreland Marine Consultancy"
          width={200}
          height={35}
          priority
        />
      </div>

      {/* Tagline */}
      <p className="text-sm text-muted font-light tracking-wide mb-10">
        Smooth Sailing. Every Time.
      </p>

      {/* Links */}
      <div className="w-full max-w-sm flex flex-col gap-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 w-full border border-white/10 rounded bg-bg1 px-5 py-4 hover:border-accent/40 hover:bg-bg2/80 transition-colors"
          >
            <span className="text-accent shrink-0">{link.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                {link.title}
              </p>
              <p className="text-xs text-muted/70 truncate">{link.description}</p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted/30 group-hover:text-accent/60 transition-colors shrink-0"
            >
              <path d="M6 4l4 4-4 4" />
            </svg>
          </a>
        ))}
      </div>

      {/* Footer */}
      <p className="mt-12 text-xs text-muted/40 font-light">
        Foreland Marine Consultancy Ltd
      </p>
    </div>
  );
}
