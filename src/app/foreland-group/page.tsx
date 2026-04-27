"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { HorizonLine, SectionLabel, Glow, ButtonPrimary } from "@/components/ui";

type View = "code-entry" | "investor-portal";

const documents = [
  { id: "seed-deck", title: "Seed Deck", description: "Detailed seed-stage presentation covering market opportunity, team and initial milestones.", ext: "pdf" },
  { id: "key-points", title: "Key Points", description: "Summary of the key investment highlights and strategic rationale.", ext: "pdf" },
  { id: "investment-proposal", title: "Investment Proposal", description: "Full investment proposal document with terms, structure and strategic rationale.", ext: "pdf" },
  { id: "pitch-deck", title: "Pitch Deck", description: "High-level overview of the Foreland Shipyard Group opportunity for venture and institutional investors.", ext: "pdf" },
  { id: "financial-model", title: "Financial Model", description: "Financial projections including revenue forecasts, cost structures and return scenarios.", ext: "xlsx" },
  { id: "use-of-proceeds", title: "Use of Proceeds", description: "Breakdown of how investment capital will be allocated across the project.", ext: "xlsx" },
  { id: "subscription-agreement", title: "Subscription Agreement (Draft)", description: "Draft subscription agreement for prospective investors.", ext: "pdf" },
  { id: "technical-plan", title: "Tipner Technical Plan", description: "2D top-down site plan of the Tipner West superyacht refit facility, including pontoon spine, paint sheds, warehouses and yard boundaries.", ext: "png" },
];

export default function ForelandGroupPage() {
  const [view, setView] = useState<View>("code-entry");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Investor code state
  const [code, setCode] = useState(["", "", "", ""]);
  const [codeError, setCodeError] = useState("");
  const [codeLoading, setCodeLoading] = useState(false);
  const [token, setToken] = useState("");
  const [investorName, setInvestorName] = useState("");
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) setScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleCodeInput(index: number, value: string) {
    const char = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(-1);
    const next = [...code];
    next[index] = char;
    setCode(next);
    setCodeError("");
    if (char && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  }

  function handleCodeKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  }

  async function verifyCode() {
    const full = code.join("");
    if (full.length !== 4) {
      setCodeError("Please enter all 4 characters.");
      return;
    }
    setCodeLoading(true);
    setCodeError("");
    try {
      const res = await fetch("/api/foreland-group/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: full }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCodeError(data.error || "Invalid code.");
        return;
      }
      setToken(data.token);
      setInvestorName(data.investor_name);
      setView("investor-portal");
    } catch {
      setCodeError("Connection error. Please try again.");
    } finally {
      setCodeLoading(false);
    }
  }

  function getDocUrl(docId: string) {
    return `/api/foreland-group/download?doc=${docId}&token=${token}`;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://forelandmarine.com" },
              { "@type": "ListItem", position: 2, name: "Foreland Group", item: "https://forelandmarine.com/foreland-group" },
            ],
          }),
        }}
      />

      {/* HERO */}
      <section ref={heroRef} className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-bg0">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Image
            src="/images/foreland-group-hero.jpg"
            alt="Aerial render of Tipner West shipyard facility"
            fill
            className="object-cover opacity-55 saturate-[1.15] scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/30 via-bg0/10 to-bg0" />
        </div>
        <Glow className="-top-40 -right-40 opacity-30" />
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Foreland Shipyard Group
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              A proposal to establish a network of world-class shipyard facilities for the construction, refit and maintenance of high-performance sailing yachts and superyachts, where the market needs them most.
            </p>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* MAIN CONTENT */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-bg1 overflow-hidden min-h-[60vh]">
        <Glow className="top-20 right-0 opacity-15" />
        <Glow className="-bottom-40 -left-40 opacity-10" />
        <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.07]" size={800} />
        <div ref={contentRef} className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* CODE ENTRY */}
          {view === "code-entry" && (
            <div className="max-w-md mx-auto text-center">
              <SectionLabel>Access Portal</SectionLabel>
              <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">Enter your access code</h2>
              <p className="text-muted mb-8">Please enter the 4-character code provided to you.</p>

              <div className="flex justify-center gap-3 mb-6">
                {code.map((char, i) => (
                  <input
                    key={i}
                    ref={inputRefs[i]}
                    type="text"
                    maxLength={1}
                    value={char}
                    onChange={(e) => handleCodeInput(i, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(i, e)}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pasted = e.clipboardData.getData("text").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
                      const next = [...code];
                      for (let j = 0; j < 4; j++) next[j] = pasted[j] || "";
                      setCode(next);
                      const focusIdx = Math.min(pasted.length, 3);
                      inputRefs[focusIdx].current?.focus();
                    }}
                    className="w-16 h-20 bg-bg2 border border-white/15 rounded text-center text-2xl font-semibold text-white uppercase focus:outline-none focus:border-accent/60 transition-colors"
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              {codeError && (
                <p className="text-red-400 text-sm mb-4">{codeError}</p>
              )}

              <ButtonPrimary
                onClick={verifyCode}
                className={codeLoading ? "opacity-50 pointer-events-none" : ""}
              >
                {codeLoading ? "Verifying..." : "Access Documents"}
              </ButtonPrimary>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-muted mb-3">Don&apos;t have a code?</p>
                <a
                  href="mailto:info@forelandmarine.com?subject=Foreland%20Group%20Access%20Request&body=Hello%2C%0A%0AI%20would%20like%20to%20request%20access%20to%20the%20Foreland%20Shipyard%20Group%20investor%20materials.%0A%0AName%3A%20%0ACompany%2FRole%3A%20%0A%0AThank%20you."
                  className="inline-flex items-center gap-2 text-sm text-accent hover:text-white transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Email for access
                </a>
              </div>
            </div>
          )}

          {/* INVESTOR PORTAL */}
          {view === "investor-portal" && (
            <div style={{ animation: "fade-in 0.6s ease-out both" }}>
              <div className="text-center mb-12">
                <SectionLabel>Document Portal</SectionLabel>
                <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
                  {investorName === "Guest" ? "Welcome Aboard" : `Welcome, ${investorName}`}
                </h2>
                <p className="text-muted">Access the Foreland Shipyard Group investment materials below.</p>
              </div>

              <a
                href="https://tipner-viewer.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block mb-8 overflow-hidden border border-accent/30 hover:border-accent/60 bg-gradient-to-br from-accent/10 via-bg2 to-bg2 transition-all duration-300"
              >
                <div className="relative z-10 flex items-center gap-5 p-6 sm:p-7">
                  <div className="shrink-0 w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center group-hover:bg-accent/25 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">Interactive</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-light text-white mb-1 group-hover:text-accent transition-colors">
                      Tipner West 3D Render Viewer
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      Explore the proposed facility in a fully navigable 3D environment.
                    </p>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-accent group-hover:translate-x-1 transition-transform">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </div>
              </a>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.map((doc) => (
                  <a
                    key={doc.id}
                    href={getDocUrl(doc.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-bg2 border border-white/10 hover:border-accent/30 p-6 transition-all duration-300 block"
                  >
                    <div className="flex items-start gap-4">
                      {/* File type icon */}
                      <div className="relative shrink-0">
                        {(() => {
                          const palette = doc.ext === "pdf"
                            ? { bg: "bg-red-500/10", border: "border-red-500/25", text: "text-red-400" }
                            : doc.ext === "xlsx"
                            ? { bg: "bg-green-500/10", border: "border-green-500/25", text: "text-green-400" }
                            : { bg: "bg-blue-500/10", border: "border-blue-500/25", text: "text-blue-400" };
                          return (
                            <div className={`w-14 h-16 rounded flex flex-col items-center justify-center border ${palette.bg} ${palette.border}`}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={palette.text}>
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                <polyline points="14,2 14,8 20,8" />
                                {doc.ext === "xlsx" && <path d="M8 13l3 3 3-3M8 17l3-3 3 3" strokeWidth="1.5" />}
                                {doc.ext === "png" && <circle cx="10" cy="13" r="1.2" />}
                                {doc.ext === "png" && <path d="M8 18l3-3 2 2 3-3 2 2" strokeWidth="1.5" />}
                              </svg>
                              <span className={`text-[9px] font-bold uppercase mt-0.5 ${palette.text}`}>{doc.ext}</span>
                            </div>
                          );
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold mb-1 group-hover:text-accent transition-colors">{doc.title}</h3>
                        <p className="text-sm text-muted leading-relaxed">{doc.description}</p>
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-accent font-medium">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                          </svg>
                          Open document
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-xs text-muted/60">
                  Document access is logged and tracked. These materials are confidential and intended for the named recipient only.
                </p>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
