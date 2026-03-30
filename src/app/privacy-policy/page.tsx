import type { Metadata } from "next";
import { HorizonLine } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Foreland Marine Consultancy Ltd.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative py-20 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-light text-white mb-3">Privacy Policy</h1>
          <p className="text-muted text-sm mb-8">Last updated: 1 January 2025</p>
          <HorizonLine />
        </div>
      </section>

      <section className="py-16 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-invert prose-headings:text-white prose-p:text-muted prose-li:text-muted prose-strong:text-white max-w-none">
          <div className="space-y-10">

            <div>
              <h2 className="text-xl font-light text-white mb-4">1. Who We Are</h2>
              <p className="text-muted leading-relaxed">
                Foreland Marine Consultancy Ltd (&ldquo;Foreland Marine&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is a company registered in England and Wales. Our registered office is at 7 Bell Yard, London, WC2A 2JR. We provide yacht management, new build representation, refit project management, and technical consultancy services.
              </p>
              <p className="text-muted leading-relaxed mt-3">
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at forelandmarine.com or engage with our services. Please read this policy carefully.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">2. Information We Collect</h2>
              <p className="text-muted leading-relaxed mb-3">We may collect the following categories of personal information:</p>
              <ul className="space-y-2 text-muted list-none pl-0">
                {[
                  "Contact information: name, email address, phone number, and postal address when you submit an enquiry via our contact form or email.",
                  "Professional information: vessel details, company name, role, and project requirements provided during consultancy enquiries.",
                  "Technical data: IP address, browser type, device type, operating system, pages visited, time spent on site, and referring URLs collected automatically when you use our website.",
                  "Communication data: records of correspondence with us by email, phone, or through our contact forms.",
                  "App data: for SeaTime Tracker users: AIS position data, voyage records, vessel information, and account credentials necessary to provide the service.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-muted leading-relaxed mb-3">We use your personal information for the following purposes:</p>
              <ul className="space-y-2 text-muted list-none pl-0">
                {[
                  "To respond to your enquiries and provide our consultancy and management services.",
                  "To administer and improve our website and digital tools.",
                  "To send service-related communications and, where you have consented, marketing information.",
                  "To comply with our legal and regulatory obligations.",
                  "To protect the security and integrity of our business and systems.",
                  "To provide and improve the SeaTime Tracker and Lightship ISM applications.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">4. Legal Basis for Processing</h2>
              <p className="text-muted leading-relaxed mb-3">
                We process your personal data on the following legal bases under UK GDPR and the Data Protection Act 2018:
              </p>
              <ul className="space-y-3 text-muted list-none pl-0">
                {[
                  { title: "Contractual necessity", desc: "Processing necessary for the performance of a contract with you or to take steps at your request before entering a contract." },
                  { title: "Legitimate interests", desc: "Processing necessary for our legitimate business interests, such as improving our services, marketing, and maintaining security, provided these interests are not overridden by your rights." },
                  { title: "Legal obligation", desc: "Processing necessary to comply with a legal obligation to which we are subject." },
                  { title: "Consent", desc: "Where you have given your explicit consent to processing for a specific purpose, such as receiving marketing emails." },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span><strong className="text-white">{item.title}:</strong> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">5. Data Sharing and Disclosure</h2>
              <p className="text-muted leading-relaxed mb-3">
                We do not sell or rent your personal information to third parties. We may share your data with:
              </p>
              <ul className="space-y-2 text-muted list-none pl-0">
                {[
                  "Service providers who assist us in operating our website, applications, and business (such as Formspree for contact form processing, hosting providers, and analytics services), bound by contractual obligations to protect your data.",
                  "Professional advisors including lawyers, accountants, and insurers where necessary.",
                  "Regulatory authorities, courts, or law enforcement agencies where required by law or to protect our legal rights.",
                  "Successors in the event of a merger, acquisition, or sale of assets, subject to confidentiality obligations.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">6. International Transfers</h2>
              <p className="text-muted leading-relaxed">
                We operate with team members in multiple countries including the UK, France, Spain, USA, Antigua, the Netherlands, Germany, and Italy. Where we transfer personal data outside the UK or European Economic Area, we ensure appropriate safeguards are in place in accordance with applicable data protection law, including Standard Contractual Clauses or adequacy decisions where applicable.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">7. Data Retention</h2>
              <p className="text-muted leading-relaxed">
                We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, including satisfying any legal, accounting, or reporting obligations. Contact enquiry data is typically retained for three years. App user data is retained for the duration of your subscription and a reasonable period thereafter, unless you request deletion. We will delete or anonymise your data upon your request, subject to any overriding legal obligations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">8. Your Rights</h2>
              <p className="text-muted leading-relaxed mb-3">
                Under UK GDPR, you have the following rights in relation to your personal data:
              </p>
              <ul className="space-y-2 text-muted list-none pl-0">
                {[
                  "Right of access: to obtain a copy of the personal data we hold about you.",
                  "Right to rectification: to have inaccurate or incomplete data corrected.",
                  "Right to erasure: to request deletion of your data in certain circumstances.",
                  "Right to restriction: to restrict how we process your data in certain circumstances.",
                  "Right to data portability: to receive your data in a structured, machine-readable format.",
                  "Right to object: to object to processing based on legitimate interests or for direct marketing.",
                  "Right to withdraw consent: where processing is based on consent, to withdraw that consent at any time.",
                  "Right to lodge a complaint: with the Information Commissioner's Office (ICO) at ico.org.uk.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted leading-relaxed mt-4">
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:info@forelandmarine.com" className="text-accent hover:underline">
                  info@forelandmarine.com
                </a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">9. Cookies and Tracking</h2>
              <p className="text-muted leading-relaxed">
                Our website uses cookies and similar tracking technologies to improve user experience and analyse site usage. Essential cookies are required for the site to function correctly. Analytics cookies help us understand how visitors use our site. You may disable cookies through your browser settings, though this may affect functionality. By continuing to use our website, you consent to our use of cookies in accordance with this policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">10. Security</h2>
              <p className="text-muted leading-relaxed">
                We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security. We will notify you and any relevant regulators of a data breach where required by law.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">11. Third-Party Links</h2>
              <p className="text-muted leading-relaxed">
                Our website may contain links to third-party websites, including social media platforms and app stores. We are not responsible for the privacy practices of those websites and encourage you to review their respective privacy policies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">12. Children&apos;s Privacy</h2>
              <p className="text-muted leading-relaxed">
                Our services are not directed at children under the age of 16. We do not knowingly collect personal data from children. If you believe we have inadvertently collected data from a child, please contact us immediately and we will delete it.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">13. Changes to This Policy</h2>
              <p className="text-muted leading-relaxed">
                We may update this Privacy Policy from time to time. The date at the top of this page indicates when it was last revised. We encourage you to review this policy periodically. Continued use of our website or services after changes become effective constitutes acceptance of the revised policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">14. Contact Us</h2>
              <p className="text-muted leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-4 bg-bg2 border border-white/8 rounded p-6">
                <p className="text-white font-semibold mb-1">Foreland Marine Consultancy Ltd</p>
                <p className="text-muted text-sm">7 Bell Yard, London, WC2A 2JR</p>
                <a href="mailto:info@forelandmarine.com" className="text-accent text-sm hover:underline">
                  info@forelandmarine.com
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
