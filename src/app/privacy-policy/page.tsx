import type { Metadata } from "next";
import { HorizonLine } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Foreland Marine Consultancy Ltd.",
  alternates: { canonical: "https://www.forelandmarine.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative py-20 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-light text-white mb-3">Privacy Policy</h1>
          <p className="text-muted text-sm mb-8">Last updated: 2 November 2026</p>
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
                  "App data: for SeaTime Tracker users, AIS position data, voyage records, vessel information, and account credentials necessary to provide the service.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted leading-relaxed mt-6 mb-3">For users of the SeaTime Tracker mobile application, the following also applies:</p>
              <p className="text-muted leading-relaxed mb-3">
                <strong className="text-white">Account.</strong> To create an account we collect your name and email address and a password, or you can sign in with Apple. If you sign in with Apple you can choose to hide your email address, in which case Apple gives us a private relay address. You can also tell us the department and sector you work in, the certificate you are working towards and the authority that issues it (for example the MCA, USCG, AMSA, MNZ or SAMSA). We use this to show the right sea time rules and pathways. If you want them on your sea time reports, you can also add your address, phone number, date of birth, nationality, discharge book number, PYA membership number and a signature. All of these are optional.
              </p>
              <p className="text-muted leading-relaxed mb-3">
                <strong className="text-white">Vessels and sea time.</strong> You tell us which vessels you serve on, such as their name, MMSI, IMO number, flag, type, length, engine power and how the vessel is operated (for example whether it runs a two-watch system or a sole watchkeeper). We use public AIS data for those vessels to work out when they are underway and to build your sea time record. Your sea time entries, notes, shift times, certificates and the dates you are on or off board are stored with your account.
              </p>
              <p className="text-muted leading-relaxed mb-3">
                <strong className="text-white">Find my vessel.</strong> When you add a vessel by name and length, we send the vessel name and length (not your name or email) to our AIS data provider to find the matching MMSI. You confirm the match before it is saved.
              </p>
              <p className="text-muted leading-relaxed mb-3">
                <strong className="text-white">AIS history import.</strong> If you buy a history import, we request past AIS positions for the vessel and dates you choose from our AIS data provider and turn them into sea time entries for you to review.
              </p>
              <p className="text-muted leading-relaxed mb-3">
                <strong className="text-white">Location.</strong> With your permission, SeaTime Tracker uses your phone&apos;s location only while the app is open. We use it to check whether you are near your vessel so we can remind you to clock in or out of a shift, to record your position when you log sea time manually, and to show how far training providers are from you in Find a course. Your sea time is calculated from your vessel&apos;s AIS position, not from your phone. The app does not track your location in the background.
              </p>
              <p className="text-muted leading-relaxed mb-3">
                <strong className="text-white">Profile photos.</strong> If you choose to add a profile photo, the app asks permission to use your camera or photo library. The photo you pick is resized on your phone and uploaded to private storage linked to your account. It is used only to personalise your profile. When you replace a photo, the old one is deleted. We do not use your camera or photos for any other purpose.
              </p>
              <p className="text-muted leading-relaxed mb-3">
                <strong className="text-white">Notifications.</strong> If you allow notifications, we store a push token for your device so we can send you reminders, for example about entries waiting for review or a shift that is still clocked in. Notifications are delivered through Expo and through Apple&apos;s or Google&apos;s push service. You can turn them off in your phone&apos;s settings at any time.
              </p>
              <p className="text-muted leading-relaxed mb-3">
                <strong className="text-white">Emails.</strong> We send account emails (such as a welcome email and password resets) to the address on your account. We only send news and offers if you opt in, either when you sign up or later in Settings. Every marketing email has an unsubscribe link, and you can change your choice in Settings at any time.
              </p>
              <p className="text-muted leading-relaxed mb-3">
                <strong className="text-white">Anonymous sign-up events.</strong> To understand where new users get stuck, the app records a few first-run steps (for example opening the app, reaching the account screen, creating an account and adding a vessel). These events carry a random install code, the platform (iOS or Android) and the app version. They contain no name, email, user ID or IP address, and we cannot link them to you.
              </p>
              <p className="text-muted leading-relaxed mb-3">
                <strong className="text-white">Subscriptions and purchases.</strong> SeaTime
                Tracker offers an optional paid &ldquo;Pro&rdquo; subscription and one-off purchases
                such as AIS history import. Payments are processed by the relevant app store
                (Apple App Store or Google Play) and by RevenueCat, Inc., which manages
                subscription entitlements on our behalf. We do not collect or store your full
                payment-card details. RevenueCat processes purchase information such as
                transaction identifiers and subscription status to enable and restore your
                purchases. See RevenueCat&apos;s privacy policy:{" "}
                <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">revenuecat.com/privacy</a>.
              </p>
              <p className="text-muted leading-relaxed">
                <strong className="text-white">Crash reporting and diagnostics.</strong> To keep
                the app stable and fix problems, we use Sentry (Functional Software, Inc.) to
                collect diagnostic and crash data. This may include device information, app
                version, and technical details about errors. It is used only to diagnose and
                resolve technical issues. See Sentry&apos;s privacy policy:{" "}
                <a href="https://sentry.io/privacy/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">sentry.io/privacy</a>.
              </p>
              <p className="text-muted leading-relaxed mt-3">
                <strong className="text-white">Deleting your account.</strong> You can delete
                your account at any time from your profile in the app. See section 7 for what
                this removes.
              </p>
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
                  { title: "Consent", desc: "Where you have given your explicit consent to processing for a specific purpose, such as receiving marketing emails or allowing the app to use your location, camera or photos." },
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
                  "Service providers who assist us in operating our website, applications, and business, bound by contractual obligations to protect your data. These include Formspree (website contact forms); Supabase (database hosting for SeaTime Tracker); Railway Corporation (application hosting and profile photo storage); Datalastic and MyShipTracking (AIS vessel data: they receive vessel names, MMSI numbers and date ranges, not your personal details); RevenueCat, Apple and Google (subscriptions and in-app purchases); Resend (sending account and marketing emails); Expo, Apple and Google (delivering push notifications); Sentry (crash reporting); and hosting and analytics providers for our website.",
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
              <p className="text-muted leading-relaxed mt-3">
                We do not share your sea time records with any maritime authority or employer. If you export a report from the app and send it to someone, that is your choice.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">6. International Transfers</h2>
              <p className="text-muted leading-relaxed">
                We operate with team members in multiple countries including the UK, France, Spain, USA, Antigua, the Netherlands, Germany, and Italy. SeaTime Tracker account data is held in a database in Ireland and profile photos are stored in the Netherlands. Some of our service providers (including RevenueCat, Sentry, Resend, Expo and Railway) are based in the USA. Where we transfer personal data outside the UK or European Economic Area, we ensure appropriate safeguards are in place in accordance with applicable data protection law, including Standard Contractual Clauses, the UK International Data Transfer Agreement or adequacy decisions where applicable.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">7. Data Retention</h2>
              <p className="text-muted leading-relaxed">
                We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, including satisfying any legal, accounting, or reporting obligations. Contact enquiry data is typically retained for three years. App user data is retained while your account is open and a reasonable period thereafter, unless you request deletion.
              </p>
              <p className="text-muted leading-relaxed mt-3">
                If you delete your SeaTime Tracker account in the app, we delete your account, profile details, vessels, sea time entries, AIS checks linked to your vessels, notifications, sessions and profile photo. Records of purchases are kept by Apple, Google and RevenueCat under their own policies, and we may keep limited records where the law requires us to (for example for accounting). Anonymous sign-up events cannot be linked to you and are not affected.
              </p>
              <p className="text-muted leading-relaxed mt-3">
                We will delete or anonymise your data upon your request, subject to any overriding legal obligations.
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
              <p className="text-muted leading-relaxed mt-3">
                The SeaTime Tracker app does not use advertising identifiers and does not track you across other companies&apos; apps or websites.
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
                Our website and apps may contain links to third-party websites, including social media platforms, app stores and training providers listed in Find a course. We are not responsible for the privacy practices of those websites and encourage you to review their respective privacy policies.
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
