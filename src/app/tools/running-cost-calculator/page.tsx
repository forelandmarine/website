"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Glow, HorizonLine, SectionLabel, ButtonPrimary } from "@/components/ui";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type YachtType = "sailing" | "motor";
type Currency = "EUR" | "USD" | "GBP";
type CruisingArea =
  | "west_med"
  | "east_med"
  | "caribbean"
  | "us_east_coast"
  | "southeast_asia"
  | "northern_europe"
  | "arabian_gulf"
  | "south_pacific"
  | "global";
type UseType = "private" | "charter";
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

const currencyRates: Record<Currency, number> = {
  EUR: 1,
  USD: 1.09,
  GBP: 0.86,
};

const currencyLocales: Record<Currency, string> = {
  EUR: "en-GB",
  USD: "en-US",
  GBP: "en-GB",
};

function fmt(n: number, currency: Currency = "EUR"): string {
  const converted = n * currencyRates[currency];
  return new Intl.NumberFormat(currencyLocales[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(converted);
}

/* ------------------------------------------------------------------ */
/*  Cost model                                                         */
/* ------------------------------------------------------------------ */

function calculateCosts(
  length: number,
  yachtType: YachtType,
  area: CruisingArea,
  usage: UsageIntensity,
  useType: UseType,
): CostBreakdown {
  const t = (length - 24) / (60 - 24); // 0..1
  const isCharter = useType === "charter";

  // Crew
  const crewBase =
    yachtType === "motor" ? lerp(350_000, 900_000, t) : lerp(300_000, 750_000, t);
  const usageMult = usage === "heavy" ? 1.15 : usage === "moderate" ? 1.05 : 1.0;
  const crew = crewBase * usageMult * (isCharter ? 1.25 : 1.0);

  // Insurance
  const valueMotor = lerp(3_000_000, 35_000_000, t);
  const value = yachtType === "motor" ? valueMotor : valueMotor * 0.85;
  const insuranceRate = yachtType === "motor" ? 0.015 : 0.012;
  const charterInsuranceMult = isCharter ? 1.4 : 1.0;
  const areaInsuranceMult: Record<CruisingArea, number> = {
    west_med: 1.0,
    east_med: 1.05,
    caribbean: 1.15,
    us_east_coast: 1.1,
    southeast_asia: 1.1,
    northern_europe: 0.95,
    arabian_gulf: 1.05,
    south_pacific: 1.15,
    global: 1.25,
  };
  const insurance = value * insuranceRate * areaInsuranceMult[area] * charterInsuranceMult;

  // Maintenance & repair
  const maintBase =
    yachtType === "motor"
      ? lerp(180_000, 720_000, t)
      : lerp(150_000, 600_000, t);
  const maintenance = maintBase * (isCharter ? 1.2 : 1.0);

  // Berths & marina fees
  const berthMultiplier: Record<CruisingArea, number> = {
    west_med: 1.0,
    east_med: 0.8,
    caribbean: 0.7,
    us_east_coast: 0.9,
    southeast_asia: 0.5,
    northern_europe: 0.6,
    arabian_gulf: 0.75,
    south_pacific: 0.55,
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
  const fuel = fuelBase * fuelUsageMult * (isCharter ? 1.3 : 1.0);

  // Management fees
  const mgmtMonthly = lerp(3_000, 8_000, t);
  const management = mgmtMonthly * 12 * (isCharter ? 1.5 : 1.0);

  // Regulatory & compliance
  const regulatory = lerp(15_000, 50_000, t) * (isCharter ? 1.6 : 1.0);

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
          className={`px-4 py-2 text-sm rounded transition-colors duration-150 ${
            value === o.value
              ? "bg-white/[0.14] text-white border border-white/20"
              : "text-muted border border-white/[0.06] hover:text-white hover:border-white/15"
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
  total,
  currency,
}: {
  label: string;
  amount: number;
  total: number;
  currency: Currency;
}) {
  const pct = (amount / total) * 100;
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-sm text-muted">{label}</span>
        <div className="flex items-baseline gap-3">
          <span className="text-xs text-muted/60 tabular-nums">{pct.toFixed(0)}%</span>
          <span className="text-sm text-white font-light tabular-nums">{fmt(amount, currency)}</span>
        </div>
      </div>
      <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-white/30 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const areaLabels: Record<CruisingArea, string> = {
  west_med: "Western Mediterranean",
  east_med: "Eastern Mediterranean",
  caribbean: "Caribbean",
  us_east_coast: "US East Coast",
  southeast_asia: "Southeast Asia",
  northern_europe: "Northern Europe",
  arabian_gulf: "Arabian Gulf",
  south_pacific: "South Pacific",
  global: "Global",
};

export default function RunningCostCalculatorPage() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const [length, setLength] = useState(35);
  const [yachtType, setYachtType] = useState<YachtType>("motor");
  const [area, setArea] = useState<CruisingArea>("west_med");
  const [useType, setUseType] = useState<UseType>("private");
  const [usage, setUsage] = useState<UsageIntensity>("moderate");
  const [currency, setCurrency] = useState<Currency>("EUR");

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

  const costs = calculateCosts(length, yachtType, area, usage, useType);

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
            src="/images/calculator-hero.jpg"
            alt="Superyacht berthed in a Mediterranean marina"
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
            <div className="bg-bg2/60 border border-white/[0.08] rounded-lg p-6 sm:p-8 space-y-8">
              <div>
                <SectionLabel>Your Yacht</SectionLabel>
                <h2 className="text-2xl sm:text-3xl font-light text-white">
                  Configure the basics.
                </h2>
              </div>

              {/* Length slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-sm text-muted">Yacht Length</label>
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
                  className="w-full cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgba(255,255,255,0.4) ${((length - 24) / 36) * 100}%, rgba(255,255,255,0.1) ${((length - 24) / 36) * 100}%)`,
                    height: "4px",
                    borderRadius: "2px",
                    WebkitAppearance: "none",
                    accentColor: "#ffffff",
                  }}
                />
                <div className="flex justify-between text-xs text-muted/50">
                  <span>24m</span>
                  <span>60m</span>
                </div>
              </div>

              {/* Yacht type */}
              <div className="space-y-2.5">
                <label className="text-sm text-muted block">Yacht Type</label>
                <ToggleGroup
                  options={[
                    { value: "sailing" as YachtType, label: "Sailing" },
                    { value: "motor" as YachtType, label: "Motor" },
                  ]}
                  value={yachtType}
                  onChange={setYachtType}
                />
              </div>

              {/* Use type */}
              <div className="space-y-2.5">
                <label className="text-sm text-muted block">Use</label>
                <ToggleGroup
                  options={[
                    { value: "private" as UseType, label: "Private" },
                    { value: "charter" as UseType, label: "Charter" },
                  ]}
                  value={useType}
                  onChange={setUseType}
                />
                {useType === "charter" && (
                  <p className="text-xs text-muted/70 leading-relaxed pt-1">
                    Charter yachts require commercial insurance, larger crews, LY3/PYC compliance, and dedicated charter management.
                  </p>
                )}
              </div>

              {/* Currency */}
              <div className="space-y-2.5">
                <label className="text-sm text-muted block">Currency</label>
                <ToggleGroup
                  options={[
                    { value: "EUR" as Currency, label: "EUR" },
                    { value: "USD" as Currency, label: "USD" },
                    { value: "GBP" as Currency, label: "GBP" },
                  ]}
                  value={currency}
                  onChange={setCurrency}
                />
              </div>

              {/* Cruising area */}
              <div className="space-y-2.5">
                <label className="text-sm text-muted block">Primary Operating Area</label>
                <ToggleGroup
                  options={[
                    { value: "west_med" as CruisingArea, label: "West Med" },
                    { value: "east_med" as CruisingArea, label: "East Med" },
                    { value: "caribbean" as CruisingArea, label: "Caribbean" },
                    { value: "us_east_coast" as CruisingArea, label: "US East Coast" },
                    { value: "southeast_asia" as CruisingArea, label: "SE Asia" },
                    { value: "northern_europe" as CruisingArea, label: "Northern Europe" },
                    { value: "arabian_gulf" as CruisingArea, label: "Arabian Gulf" },
                    { value: "south_pacific" as CruisingArea, label: "South Pacific" },
                    { value: "global" as CruisingArea, label: "Global" },
                  ]}
                  value={area}
                  onChange={setArea}
                />
              </div>

              {/* Usage intensity */}
              <div className="space-y-2.5">
                <label className="text-sm text-muted block">Usage Intensity</label>
                <ToggleGroup
                  options={[
                    { value: "light" as UsageIntensity, label: "Light (<6 wks)" },
                    { value: "moderate" as UsageIntensity, label: "Moderate (6-12 wks)" },
                    { value: "heavy" as UsageIntensity, label: "Heavy (12+ wks)" },
                  ]}
                  value={usage}
                  onChange={setUsage}
                />
              </div>
            </div>

            {/* RESULTS */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Total card */}
              <div className="relative bg-bg2/60 border border-white/[0.08] rounded-lg p-6 sm:p-8 overflow-hidden">
                <Glow
                  className="-top-32 -right-32"
                  color="rgba(255,255,255,0.04)"
                  size={350}
                />
                <div className="relative z-10">
                  <p className="text-xs text-muted/70 uppercase tracking-widest mb-3">
                    Estimated Annual Cost
                  </p>
                  <p className="text-4xl sm:text-5xl font-light text-white tabular-nums tracking-tight">
                    {fmt(costs.total, currency)}
                  </p>
                  <p className="text-sm text-muted mt-2">
                    {length}m {yachtType === "motor" ? "motor yacht" : "sailing yacht"},{" "}
                    {useType === "charter" ? "charter" : "private"},{" "}
                    {areaLabels[area]},{" "}
                    {usage} use
                  </p>
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-bg2/60 border border-white/[0.08] rounded-lg p-6 sm:p-8 space-y-4">
                <p className="text-xs text-muted/70 uppercase tracking-widest mb-2">
                  Cost Breakdown
                </p>
                {breakdown.map((item) => (
                  <CostRow
                    key={item.label}
                    label={item.label}
                    amount={item.amount}
                    total={costs.total}
                    currency={currency}
                  />
                ))}
                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-sm text-white">Total</span>
                  <span className="text-base text-white font-light tabular-nums">{fmt(costs.total, currency)}</span>
                </div>
              </div>

              {/* Disclaimer + CTA */}
              <div className="bg-bg2/60 border border-white/[0.08] rounded-lg p-6 sm:p-8">
                <p className="text-sm text-muted/60 leading-relaxed mb-5">
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

      <HorizonLine />

      {/* SOURCES */}
      <section className="py-16 sm:py-20 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>Sources</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">
            Where do these numbers come from?
          </h2>
          <p className="text-muted leading-relaxed mb-8">
            The cost model behind this calculator is based on published industry data, supplemented by
            Foreland Marine&apos;s direct experience managing yachts in the 24 to 60 metre range.
          </p>
          <ul className="space-y-4">
            {[
              {
                title: "Superyacht Times Intelligence",
                detail: "Fleet size, build trends, and market valuations used to calibrate estimated yacht values.",
                href: "https://www.superyachttimes.com/intelligence",
              },
              {
                title: "MYBA Charter Market Report",
                detail: "Charter fleet operating costs, commercial insurance premium ranges, and crew benchmarks.",
                href: "https://www.myba-association.com",
              },
              {
                title: "Dockwalk / OnboardOnline Crew Salary Survey",
                detail: "Captain, officer, and crew salary ranges by vessel size and type.",
                href: "https://www.onboardonline.com/resources/crew-salary-survey",
              },
              {
                title: "Pantaenius Yacht Insurance",
                detail: "Hull and machinery insurance rates, P&I cover premiums, and regional risk factors.",
                href: "https://www.pantaenius.com",
              },
              {
                title: "IGY Marinas",
                detail: "Annual berth rates by vessel length across Mediterranean, Caribbean, and US locations.",
                href: "https://www.igymarinas.com",
              },
              {
                title: "MCA Large Yacht Code (LY3)",
                detail: "Commercial compliance survey costs, manning requirements, and flag state fee schedules.",
                href: "https://www.gov.uk/government/collections/large-commercial-yacht-code",
              },
              {
                title: "Foreland Marine operational data",
                detail: "Real-world budget data from yachts under our management, anonymised and aggregated.",
              },
            ].map((source) => (
              <li key={source.title} className="border-l border-white/10 pl-4 py-1">
                {source.href ? (
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-accent transition-colors"
                  >
                    {source.title}
                    <span className="text-muted/50 ml-1.5 text-xs">&nearr;</span>
                  </a>
                ) : (
                  <p className="text-sm text-white">{source.title}</p>
                )}
                <p className="text-sm text-muted/70 leading-relaxed">{source.detail}</p>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted/60 mt-8 leading-relaxed">
            Regional multipliers and charter adjustments are derived from a combination of these
            sources and internal benchmarks. Verify against current market conditions before making
            financial decisions.
          </p>
        </div>
      </section>
    </>
  );
}
