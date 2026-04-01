"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useCallback } from "react";

const navLinks = [
  { label: "New Build", href: "/new-build" },
  { label: "Refit", href: "/refit" },
  { label: "Technical Consultancy", href: "/technical-consultancy" },
  { label: "Yacht Management", href: "/yacht-management" },
];

const aboutLinks = [
  { label: "About Us", href: "/about" },
  { label: "Insights", href: "/insights" },
];

const toolLinks = [
  { label: "Lightship ISM", href: "/tools/lightship-ism" },
  { label: "SeaTime Tracker", href: "/tools/seatime-tracker" },
  { label: "PMS Database", href: "/tools/pms-database" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aboutCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openTools = useCallback(() => {
    if (closeTimeout.current) { clearTimeout(closeTimeout.current); closeTimeout.current = null; }
    setToolsOpen(true);
  }, []);

  const closeTools = useCallback(() => {
    closeTimeout.current = setTimeout(() => setToolsOpen(false), 200);
  }, []);

  const openAbout = useCallback(() => {
    if (aboutCloseTimeout.current) { clearTimeout(aboutCloseTimeout.current); aboutCloseTimeout.current = null; }
    setAboutOpen(true);
  }, []);

  const closeAbout = useCallback(() => {
    aboutCloseTimeout.current = setTimeout(() => setAboutOpen(false), 200);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/8 bg-bg1/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logos/foreland-marine-white.svg"
              alt="Foreland Marine Consultancy"
              width={240}
              height={42}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-light text-muted hover:text-white transition-colors rounded hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}

            {/* Tools dropdown */}
            <div
              className="relative"
              onMouseEnter={openTools}
              onMouseLeave={closeTools}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-light text-muted hover:text-white transition-colors rounded hover:bg-white/5">
                Tools
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${toolsOpen ? "rotate-180" : ""}`}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {toolsOpen && (
                <div className="absolute top-full left-0 pt-2 w-48">
                <div className="border border-white/10 bg-bg1 shadow-xl shadow-black/40 py-1">
                  {toolLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm font-light text-muted hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                </div>
              )}
            </div>

            {/* About dropdown */}
            <div
              className="relative"
              onMouseEnter={openAbout}
              onMouseLeave={closeAbout}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-light text-muted hover:text-white transition-colors rounded hover:bg-white/5">
                About
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${aboutOpen ? "rotate-180" : ""}`}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {aboutOpen && (
                <div className="absolute top-full left-0 pt-2 w-48">
                <div className="border border-white/10 bg-bg1 shadow-xl shadow-black/40 py-1">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm font-light text-muted hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="px-3 py-2 text-sm font-light text-muted hover:text-white transition-colors rounded hover:bg-white/5"
            >
              Contact
            </Link>
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://instagram.com/forelandmarine"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="mailto:info@forelandmarine.com"
              className="border border-white/20 text-white text-sm font-light px-4 py-2 rounded hover:bg-white/10 transition-colors"
            >
              info@forelandmarine.com
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-muted hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/8 bg-bg1 pb-4">
          <div className="mx-auto max-w-7xl px-4 pt-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-light text-muted hover:text-white rounded hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 py-2 text-xs text-muted/50 tracking-widest">Tools</div>
            {toolLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-2.5 text-sm font-light text-muted hover:text-white rounded hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 py-2 text-xs text-muted/50 tracking-widest">About</div>
            {aboutLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-2.5 text-sm font-light text-muted hover:text-white rounded hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-light text-muted hover:text-white rounded hover:bg-white/5 transition-colors"
            >
              Contact
            </Link>
            <div className="mt-3 pt-3 border-t border-white/8 flex items-center gap-3 px-3">
              <a href="https://instagram.com/forelandmarine" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="mailto:info@forelandmarine.com" className="text-sm font-light text-muted hover:text-white transition-colors">
                info@forelandmarine.com
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
