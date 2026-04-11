"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Glow, HorizonLine, SectionLabel, ButtonPrimary } from "@/components/ui";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type YachtType = "sailing" | "motor";
type CruisingArea = "mediterranean" | "caribbean" | "northern_europe" | "global";
type UsageIntensity = "light" | "moderate" | "heavy";

interface CostBreakdown {
  crew: number;
  insurance: number;
  maintenance: number;
  berths: number;
  fuel: number;
  management: number;
  regulatory: number;
  contingency: number;
  total: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function fmt(n: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

/* ------------------------------------------------------------------ */
/*  Cost model                                                         */
/* ------------------------------------------------------------------ */

function calculateCosts(
  length: number,
  yachtType: YachtType,
  area: CruisingArea,
  usage: UsageIntensity,
): CostBreakdown {
  const t = (length - 24) / (60 - 24); // 0..1

  // Crew
  const crewBase =
    yachtType === "motor" ? lerp(350_000, 900_000, t) : lerp(300_000, 750_000, t);
  const usageMult = usage === "heavy" ? 1.15 : usage === "moderate" ? 1.05 : 1.0;
  const crew = crewBase * usageMult;

  // Insurance (hull + P&I, 1-2% of estimated value)
  const valueMotor = lerp(3_000_000, 35_000_000, t);
  const value = yachtType === "motor" ? valueMotor : valueMotor * 0.85;
  const insuranceRate = yachtType === "motor" ? 0.015 : 0.012;
  const areaInsuranceMult =
    area === "global" ? 1.25 : area === "caribbean" ? 1.1 : 1.0;
  const insurance = value * insuranceRate * areaInsuranceMult;

  // Maintenance & repair
  const maintBase =
    yachtType === "motor"
      ? lerp(180_000, 720_000, t)
      : lerp(150_000, 600_000, t);
  const maintenance = maintBase;

  // Berths & marina fees
  const berthMultiplier: Record<CruisingArea, number> = {
    mediterranean: 1.0,
    caribbean: 0.7,
    northern_europe: 0.6,
    global: 0.85,
  };
  const berthBase = lerp(80_000, 350_000, t);
  const berths = berthBase * berthMultiplier[area];

  // Fuel & consumables
  const fuelBase =
    yachtType === "motor"
      ? lerp(80_000, 400_000, t)
      : lerp(30_000, 120_000, t);
  const fuelUsageMult =
    usage === "heavy" ? 1.5 : usage === "moderate" ? 1.0 : 0.7;
  const fuel = fuelBase * fuelUsageMult;

  // Management fees (monthly)
  const mgmtMonthly = lerp(3_000, 8_000, t);
  const management = mgmtMonthly * 12;

  // Regulatory & compliance
  const regulatory = lerp(15_000, 50_000, t);

  // Subtotal and contingency
  const subtotal = crew + insurance + maintenance + berths + fuel + management + regulatory;
  const contingency = subtotal * 0.08;
  const total = subtotal + contingency;

  return { crew, insurance, maintenance, berths, fuel, management, regulatory, contingency, total };
}

/* ------------------------------------------------------------------ */
/*  Small UI pieces                                                    */
/* ------------------------------------------------------------------ */

function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`px-4 py-2.5 text-sm font-medium rounded transition-all duration-200 ${
            value === o.value
              ? "bg-accent text-white shadow-lg shadow-accent/20"
              : "bg-bg2 text-muted border border-white/10 hover:border-white/25 hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function CostRow({
  label,
  amount,
  pct,
  color,
}: {
  label: string;
  amount: number;
  pct: number;
  color: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-sm text-muted">{label}</span>
        <span className="text-sm text-white font-medium tabular-nums">{fmt(amount)}</span>
      </div>
      <div className="w-full h-2 bg-bg2 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const barColors = [
  "#5386B6",
  "#6BA3D4",
  "#4A7AA8",
  "#7AB5E0",
  "#3D6D9A",
  "#8EC4EA",
  "#2F5F8C",
  "#A0D0F0",
];

export default function RunningCostCalculatorPage() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const [length, setLength] = useState(35);
  const [yachtType, setYachtType] = useState<YachtType>("motor");
  const [area, setArea] = useState<CruisingArea>("mediterranean");
  const [usage, setUsage] = useState<UsageIntensity>("moderate");

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

  const costs = calculateCosts(length, yachtType, area, usage);

  const breakdown = [
    { label: "Crew", amount: costs.crew },
    { label: "Insurance", amount: costs.insurance },
    { label: "Maintenance & Repair", amount: costs.maintenance },
    { label: "Berths & Marina Fees", amount: costs.berths },
    { label: "Fuel & Consumables", amount: costs.fuel },
    { label: "Management Fees", amount: costs.management },
    { label: "Regulatory & Compliance", amount: costs.regulatory },
    { label: "Contingency (8%)", amount: costs.contingency },
  ];

  const maxAmount = Math.max(...breakdown.map((b) => b.amount));

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(Number(e.target.value));
  }, []);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-bg0">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Image
            src="/images/yacht-management.jpg"
            alt="Superyacht at anchor"
            fill
            sizes="100vw"
            className="object-cover opacity-45 saturate-[1.15] scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg0/45 via-bg0/25 to-bg0" />
        </div>
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 will-change-transform"
          style={{
            transform: `translateY(${scrollY * -0.15}px)`,
            opacity: Math.max(0, 1 - scrollY / 600),
          }}
        >
          <div className="text-center max-w-3xl mx-auto">
            <SectionLabel>Running Cost Calculator</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
              What does it actually cost<br />to run a superyacht?
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">
              Ownership is more than the purchase price. Use this calculator to get a realistic
              estimate of annual operating costs, broken down by category, so you can plan
              with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* INPUTS */}
            <div className="bg-bg2/80 border border-white/10 rounded-lg p-6 sm:p-8 space-y-8">
              <div>
                <SectionLabel>Your Yacht</SectionLabel>
                <h2 className="text-2xl sm:text-3xl font-light text-white">
                  Configure the basics.
                </h2>
              </div>

              {/* Length slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-sm text-muted font-medium">Yacht Length</label>
                  <span className="text-lg text-white font-light tabular-nums">
                    {length}m
                  </span>
                </div>
                <input
                  type="range"
                  min={24}
                  max={60}
                  step={1}
                  value={length}
                  onChange={handleSlider}
                  className="w-full accent-[#5386B6] cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #5386B6 ${((length - 24) / 36) * 100}%, rgba(255,255,255,0.1) ${((length - 24) / 36) * 100}%)`,
                    height: "6px",
                    borderRadius: "3px",
                    WebkitAppearance: "none",
                  }}
                />
                <div className="flex justify-between text-xs text-muted/50">
                  <span>24m</span>
                  <span>60m</span>
                </div>
              </div>

              {/* Yacht type */}
              <div className="space-y-3">
                <label className="text-sm text-muted font-medium block">Yacht Type</label>
                <ToggleGroup
                  options={[
                    { value: "sailing" as YachtType, label: "Sailing" },
                    { value: "motor" as YachtType, label: "Motor" },
                  ]}
                  value={yachtType}
                  onChange={setYachtType}
                />
              </div>

              {/* Cruising area */}
              <div className="space-y-3">
                <label className="text-sm text-muted font-medium block">Cruising Area</label>
                <ToggleGroup
                  options={[
                    { value: "mediterranean" as CruisingArea, label: "Mediterranean" },
                    { value: "caribbean" as CruisingArea, label: "Caribbean" },
                    { value: "northern_europe" as CruisingArea, label: "Northern Europe" },
                    { value: "global" as CruisingArea, label: "Global" },
                  ]}
                  value={area}
                  onChange={setArea}
                />
              </div>

              {/* Usage intensity */}
              <div className="space-y-3">
                <label className="text-sm text-muted font-medium block">Usage Intensity</label>
                <ToggleGroup
                  options={[
                    { value: "light" as UsageIntensity, label: "Light (<6 weeks)" },
                    { value: "moderate" as UsageIntensity, label: "Moderate (6-12 weeks)" },
                    { value: "heavy" as UsageIntensity, label: "Heavy (12+ weeks)" },
                  ]}
                  value={usage}
                  onChange={setUsage}
                />
              </div>
            </div>

            {/* RESULTS */}
            <div className="space-y-6">
              {/* Total card */}
              <div className="relative bg-bg2/80 border border-white/10 rounded-lg p-6 sm:p-8 overflow-hidden">
                <Glow
                  className="-top-20 -right-20"
                  color="rgba(83,134,182,0.15)"
                  size={300}
                />
                <div className="relative z-10">
                  <p className="text-xs text-muted/60 uppercase tracking-widest mb-2">
                    Estimated Annual Cost
                  </p>
                  <p className="text-4xl sm:text-5xl font-light text-white tabular-nums mb-1">
                    {fmt(costs.total)}
                  </p>
                  <p className="text-sm text-muted">
                    {length}m {yachtType === "motor" ? "motor yacht" : "sailing yacht"},{" "}
                    {area.replace("_", " ")},{" "}
                    {usage} use
                  </p>
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-bg2/80 border border-white/10 rounded-lg p-6 sm:p-8 space-y-5">
                <p className="text-xs text-muted/60 uppercase tracking-widest">
                  Cost Breakdown
                </p>
                {breakdown.map((item, i) => (
                  <CostRow
                    key={item.label}
                    label={item.label}
                    amount={item.amount}
                    pct={(item.amount / maxAmount) * 100}
                    color={barColors[i]}
                  />
                ))}
              </div>

              {/* Disclaimer + CTA */}
              <div className="bg-bg2/80 border border-white/10 rounded-lg p-6 sm:p-8">
                <p className="text-sm text-muted leading-relaxed mb-5">
                  These are indicative estimates. Every yacht is different. Get in touch for a
                  detailed budget tailored to your vessel.
                </p>
                <ButtonPrimary href="/contact">
                  Get a tailored estimate
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* EDITORIAL SECTION */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>Understanding the Numbers</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-8">
            What actually drives the cost of running a superyacht?
          </h2>

          <div className="space-y-6 text-muted leading-relaxed">
            <p>
              Crew is almost always the single largest line item in your annual budget. A 40m motor
              yacht might carry a crew of seven or eight, each with salary, insurance, travel, and
              training costs. As the yacht grows, crew numbers increase and so do the qualifications
              required. A captain on a 60m vessel commands a very different salary to one on a 24m
              sailing yacht.
            </p>

            <p>
              Insurance and maintenance are the two categories that catch first-time owners off guard.
              Hull and P&amp;I premiums are driven by yacht value, cruising range, and claims history.
              Maintenance is not optional. Even a well-built yacht needs continuous attention, and
              deferred maintenance always costs more in the long run. If you are buying a yacht that
              is more than a few years old, factor in a higher maintenance budget from day one.
            </p>

            <p>
              Fuel costs vary dramatically between sailing and motor yachts. A 50m motor yacht
              burning 300 litres per hour at cruising speed will spend more on fuel in a single
              Mediterranean season than a similar-sized sailing yacht spends in a year. Usage
              intensity matters too. An owner who uses the yacht for four weeks a year will have
              a very different fuel bill from one who lives aboard for three months.
            </p>

            <p>
              The best way to avoid budget surprises is to work with an experienced management
              company that provides transparent monthly reporting. A good manager will not just pay
              the bills. They will help you plan ahead, negotiate contracts, and make informed
              decisions about where to spend and where to save.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/insights/understanding-yacht-management-costs-10-percent-rule"
              className="text-sm text-accent hover:text-white transition-colors flex items-center gap-1.5"
            >
              Read: Understanding the 10% rule
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 6h7M6.5 3l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/insights/choosing-yacht-management-company"
              className="text-sm text-accent hover:text-white transition-colors flex items-center gap-1.5"
            >
              Read: Choosing a management company
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 6h7M6.5 3l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
