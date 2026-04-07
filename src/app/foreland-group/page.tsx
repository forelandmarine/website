"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { HorizonLine, SectionLabel, ButtonPrimary, Glow } from "@/components/ui";

type View = "code-entry" | "investor-portal";

const documents = [
  { id: "pitch-deck", title: "Pitch Deck", description: "High-level overview of the Foreland Shipyard Group opportunity for venture and institutional investors.", ext: "pdf" },
  { id: "seed-deck", title: "Seed Deck", description: "Detailed seed-stage presentation covering market opportunity, team and initial milestones.", ext: "pdf" },
  { id: "key-points", title: "Key Points", description: "Summary of the key investment highlights and strategic rationale.", ext: "pdf" },
  { id: "investment-proposal", title: "Investment Proposal", description: "Full investment proposal document with terms, structure and strategic rationale.", ext: "pdf" },
  { id: "financial-model", title: "Financial Model", description: "Financial projections including revenue forecasts, cost structures and return scenarios.", ext: "xlsx" },
  { id: "use-of-proceeds", title: "Use of Proceeds", description: "Breakdown of how investment capital will be allocated across the project.", ext: "xlsx" },
  { id: "subscription-agreement", title: "Subscription Agreement (Draft)", description: "Draft subscription agreement for prospective investors.", ext: "pdf" },
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

  // Download state
  const [downloading, setDownloading] = useState<string | null>(null);
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

  async function handleDownload(docId: string) {
    setDownloading(docId);
    try {
      const res = await fetch(`/api/foreland-group/download?doc=${docId}&token=${token}`);
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          setView("code-entry");
          setCode(["", "", "", ""]);
          setCodeError("Session expired. Please re-enter your code.");
          return;
        }
        return;
      }
      window.open(data.url, "_blank");
    } catch {
      // silent fail
    } finally {
      setDownloading(null);
    }
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
            alt=""
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
            </div>
          )}

          {/* INVESTOR PORTAL */}
          {view === "investor-portal" && (
            <div style={{ animation: "fade-in 0.6s ease-out both" }}>
              <div className="text-center mb-12">
                <SectionLabel>Document Portal</SectionLabel>
                <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
                  Welcome, {investorName}
                </h2>
                <p className="text-muted">Access the Foreland Shipyard Group investment materials below.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.map((doc) => (
                  <div key={doc.id} className="bg-bg2 border border-white/10 p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded bg-accent/15 border border-accent/25 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                          <polyline points="14,2 14,8 20,8" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{doc.title}</h3>
                        <p className="text-sm text-muted leading-relaxed">{doc.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <ButtonPrimary
                        onClick={() => handleDownload(doc.id)}
                        className={`text-sm flex-1 ${downloading === doc.id ? "opacity-50 pointer-events-none" : ""}`}
                      >
                        {downloading === doc.id ? "Loading..." : "View Document"}
                      </ButtonPrimary>
                    </div>
                  </div>
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
