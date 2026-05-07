import Link from "next/link";
import Image from "next/image";

const services = [
  { label: "Yacht Management", href: "/yacht-management" },
  { label: "New Build", href: "/owners-representation" },
  { label: "Refit", href: "/refit" },
  { label: "Technical Consultancy", href: "/technical-consultancy" },
];

const tools = [
  { label: "Lightship ISM", href: "/tools/lightship-ism" },
  { label: "SeaTime Tracker", href: "/tools/seatime-tracker" },
  { label: "Planned Maintenance", href: "/tools/pms-database" },
  { label: "Race Intelligence", href: "/tools/debrief" },
  { label: "Weather Routing", href: "/tools/weather-routing" },
  { label: "Running Cost Calculator", href: "/tools/running-cost-calculator" },
];

export default function Footer() {
  return (
    <footer className="bg-bg0 border-t border-white/8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image src="/logos/foreland-marine-white.svg" alt="Foreland Marine Consultancy" width={220} height={74} />
            </Link>
            <p className="text-sm font-light text-muted leading-relaxed mb-5">
              Your guiding light through the storm. Expert yacht management and marine consultancy services worldwide.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/forelandmarine"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-9 w-9 border border-white/10 text-muted hover:text-white hover:border-white/30 transition-colors"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/forelandmarine"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-9 w-9 border border-white/10 text-muted hover:text-white hover:border-white/30 transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">Services</h3>
            <ul className="space-y-2.5">
              {services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm font-light text-muted hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">Tools</h3>
            <ul className="space-y-2.5">
              {tools.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm font-light text-muted hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@forelandmarine.com" className="text-sm font-light text-muted hover:text-white transition-colors">
                  info@forelandmarine.com
                </a>
              </li>
              <li className="text-sm font-light text-muted">
                7 Bell Yard, London<br />WC2A 2JR
              </li>
              <li className="text-sm font-light text-muted leading-relaxed">
                London · Antibes · Palma<br />
                Fort Lauderdale · Antigua<br />
                Netherlands · Germany · Italy
              </li>
            </ul>
          </div>
        </div>

        {/* Memberships */}
        <div className="mt-10 pt-8 border-t border-white/8 flex flex-wrap items-center gap-6">
          <span className="text-xs font-light text-muted uppercase tracking-widest">Proud member of</span>
          <a href="https://www.britishmarine.co.uk" target="_blank" rel="noopener noreferrer" title="British Marine - trade association for the UK marine industry" className="hover:opacity-80 transition-opacity px-3 py-2">
            <Image src="/logos/british-marine-white.svg" alt="Foreland Marine is a proud member of British Marine" width={100} height={40} className="h-10 w-auto" />
          </a>
          <a href="https://www.superyachtuk.com" target="_blank" rel="noopener noreferrer" title="Superyacht UK - representing the British superyacht industry" className="hover:opacity-80 transition-opacity px-3 py-2">
            <Image src="/logos/superyacht-uk-white.png" alt="Foreland Marine is a member of Superyacht UK" width={100} height={40} className="h-10 w-auto" />
          </a>
          <a href="https://www.sybass.org" target="_blank" rel="noopener noreferrer" title="SYBAss - Superyacht Builders Association, accrediting owner's representatives" className="hover:opacity-80 transition-opacity px-3 py-2">
            <Image src="/logos/sybass-white.png" alt="SYBAss accredited owner's representative" width={120} height={40} className="h-10 w-auto" />
          </a>
          <a href="https://superyachtalliance.org/register/register-table/" target="_blank" rel="noopener noreferrer" title="YORR - Yacht Owner's Representative Register" className="hover:opacity-80 transition-opacity px-3 py-2">
            <Image src="/logos/yacht-owners-register-white.png" alt="Registered on the Yacht Owner's Representative Register (YORR)" width={170} height={68} className="h-12 w-auto" />
          </a>
          <a href="https://superyachtalliance.org" target="_blank" rel="noopener noreferrer" title="Superyacht Alliance - global network of superyacht industry professionals" className="hover:opacity-80 transition-opacity px-3 py-2">
            <Image src="/logos/superyacht-alliance-white.png" alt="Foreland Marine is a member of the Superyacht Alliance" width={192} height={71} className="h-12 w-auto" />
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-light text-muted/70">
            © {new Date().getFullYear()} Foreland Marine Consultancy Ltd. All rights reserved.
          </p>
          <Link href="/privacy-policy" className="text-sm font-light text-muted/70 hover:text-muted transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
