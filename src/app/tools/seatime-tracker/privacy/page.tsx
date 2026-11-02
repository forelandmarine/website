import type { Metadata } from "next";
import { HorizonLine } from "@/components/ui";

export const metadata: Metadata = {
  title: "AIS SeaTime Tracker - Privacy Policy",
  description: "Privacy Policy for the AIS SeaTime Tracker mobile application.",
  robots: { index: false, follow: false },
};

export default function SeatimePrivacyPage() {
  return (
    <>
      <section className="relative py-20 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">AIS SeaTime Tracker</p>
          <h1 className="text-4xl font-light text-white mb-3">Privacy Policy</h1>
          <p className="text-muted text-sm mb-8">Last updated: 2 November 2026</p>
          <HorizonLine />
        </div>
      </section>

      <section className="py-16 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">

            <div>
              <p className="text-muted leading-relaxed">
                This Privacy Policy describes how Foreland Marine Consultancy Ltd
                (&ldquo;Foreland Marine&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses
                and protects information when you use the AIS SeaTime Tracker
                mobile application (the &ldquo;App&rdquo;). By downloading or using the
                App, you agree to the practices described in this policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">1. Data Controller</h2>
              <p className="text-muted leading-relaxed">
                Foreland Marine Consultancy Ltd, a company registered in England
                and Wales (registered office: 7 Bell Yard, London, WC2A 2JR), is
                the data controller responsible for your personal data in
                connection with the App.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">2. Information We Collect</h2>
              <p className="text-muted leading-relaxed mb-3">When you use the App, we may collect the following categories of information:</p>
              <ul className="space-y-2 text-muted list-none pl-0">
                {[
                  "Account information: name, email address and password used to create and manage your account, or the details Apple shares if you sign in with Apple (you can choose to hide your email, in which case Apple gives us a private relay address).",
                  "Profile and career details: the department and sector you work in, the certificate you are working towards and the authority that issues it (for example the MCA, USCG, AMSA, MNZ or SAMSA). If you want them on your sea time reports, you can also add your address, phone number, date of birth, nationality, discharge book number, PYA membership number and a signature. All of these are optional.",
                  "Vessel information: vessel name, MMSI number, IMO number, flag, vessel type, length, engine power, sector and how the vessel is operated (for example a two-watch system or a sole watchkeeper).",
                  "Voyage and position data: AIS-derived position records, dates, times, ports of call and voyage history associated with the vessels you track.",
                  "Sea time records: logged sea time entries, watch records, shift times, on and off board dates, certificates and any annotations you choose to add.",
                  "Profile photo: an optional photo you choose to add to your account, selected from your device camera or photo library.",
                  "Purchase information: transaction identifiers and subscription status for the optional Pro subscription and one-off purchases such as AIS history import, processed by the app stores and RevenueCat.",
                  "Notification tokens: if you allow notifications, a push token for your device so we can send reminders, for example about entries waiting for review or a shift that is still clocked in.",
                  "Email preferences: whether you have opted in to news and offers, and when.",
                  "Anonymous sign-up events: a few first-run steps (for example opening the App, reaching the account screen, creating an account and adding a vessel) with a random install code, the platform and the App version. These contain no name, email, user ID or IP address and cannot be linked to you.",
                  "Device and usage data: device type, operating system version, App version, crash logs, diagnostic data and aggregated usage statistics.",
                  "Communications: any correspondence you send to us, including support requests and feedback.",
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
              <p className="text-muted leading-relaxed mb-3">We use the information we collect for the following purposes:</p>
              <ul className="space-y-2 text-muted list-none pl-0">
                {[
                  "To provide, operate and maintain the App and its core features.",
                  "To create and manage your user account and authenticate access.",
                  "To retrieve, store and display vessel position data and voyage history.",
                  "To compile and present sea time records for your professional use.",
                  "To find a vessel's MMSI from its name and length when you use Find my vessel, and to fetch past AIS positions when you buy a history import.",
                  "To show the right sea time rules, certificate pathways and training courses for your authority and target certificate.",
                  "To send account emails (such as a welcome email and password resets), reminders by push notification, and, only if you opt in, news and offers. Every marketing email has an unsubscribe link, and you can change your choice in Settings at any time.",
                  "To communicate with you regarding updates, security notices and support requests.",
                  "To understand, using anonymous events, where new users get stuck during sign-up.",
                  "To improve the App, diagnose technical issues and develop new features.",
                  "To comply with legal obligations and enforce our Terms of Use.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">4. Location Data</h2>
              <p className="text-muted leading-relaxed">
                The App displays vessel position data sourced from public AIS
                (Automatic Identification System) feeds. Vessel position data
                relates to vessels and is derived from public AIS broadcasts,
                not from your phone&apos;s GPS.
              </p>
              <p className="text-muted leading-relaxed mt-3">
                With your permission, the App also uses your phone&apos;s
                location, but only while the App is open. We use it to check
                whether you are near your vessel so we can remind you to clock
                in or out of a shift, to record your position when you log sea
                time manually, and to show how far training providers are from
                you in Find a course. Your sea time is calculated from your
                vessel&apos;s AIS position, not from your phone. The App does not
                track your location in the background.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">5. Profile Photos</h2>
              <p className="text-muted leading-relaxed">
                If you choose to add a profile photo to your SeaTime Tracker
                account, the App will ask permission to access your device
                camera and/or photo library. The photo you select is resized on
                your phone and uploaded to private storage linked to your
                account. It is used solely to personalise your profile. When you
                replace a photo, the old one is deleted, and your photo is
                deleted when you delete your account. We do not access your
                camera or photos for any other purpose.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">6. Subscriptions and Purchases</h2>
              <p className="text-muted leading-relaxed">
                SeaTime Tracker offers an optional paid &ldquo;Pro&rdquo; subscription.
                Payments are processed by the relevant app store (Apple App
                Store or Google Play) and by RevenueCat, Inc., which manages
                subscription entitlements on our behalf. We do not collect or
                store your full payment-card details. RevenueCat processes
                purchase information such as transaction identifiers and
                subscription status to enable and restore your purchases. See
                RevenueCat&apos;s privacy policy:{" "}
                <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition-colors">revenuecat.com/privacy</a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">7. Crash Reporting and Diagnostics</h2>
              <p className="text-muted leading-relaxed">
                To keep the App stable and fix problems, we use Sentry
                (Functional Software, Inc.) to collect diagnostic and crash
                data. This may include device information, App version, and
                technical details about errors. It is used only to diagnose and
                resolve technical issues. See Sentry&apos;s privacy policy:{" "}
                <a href="https://sentry.io/privacy/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition-colors">sentry.io/privacy</a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">8. Legal Basis for Processing</h2>
              <p className="text-muted leading-relaxed">
                Where required by the UK GDPR or EU GDPR, we process your
                personal data on the following legal bases: (a) performance of
                a contract with you to provide the App; (b) our legitimate
                interests in operating and improving the App; (c) compliance
                with legal obligations; and (d) your consent, where applicable.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">9. Sharing and Disclosure</h2>
              <p className="text-muted leading-relaxed mb-3">We do not sell your personal information. We may share information with the following categories of recipients:</p>
              <ul className="space-y-2 text-muted list-none pl-0">
                {[
                  "Hosting and storage: Supabase (database, held in Ireland) and Railway Corporation (application hosting and profile photo storage in the Netherlands).",
                  "AIS data providers: Datalastic and MyShipTracking receive vessel names, MMSI numbers and date ranges to supply vessel positions. They do not receive your name or email.",
                  "Email and notifications: Resend sends account and marketing emails; Expo, Apple and Google deliver push notifications.",
                  "App stores: limited diagnostic, crash and purchase data may be shared via the Apple App Store, TestFlight and Google Play in accordance with Apple's and Google's policies.",
                  "RevenueCat, Inc.: purchase and subscription entitlement data, as described in section 6.",
                  "Sentry (Functional Software, Inc.): crash and diagnostic data, as described in section 7.",
                  "We do not share your sea time records with any maritime authority or employer. If you export a report from the App and send it to someone, that is your choice.",
                  "Legal authorities: where disclosure is required to comply with a legal obligation, court order or government request.",
                  "Successors: in connection with any merger, acquisition or sale of assets, subject to standard confidentiality protections.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">10. Data Retention</h2>
              <p className="text-muted leading-relaxed">
                We retain your account and voyage data for as long as your
                account remains active. If you delete your account, we will
                delete or anonymise your personal data within 30 days, except
                where retention is required by law or for legitimate business
                purposes such as fraud prevention. Records of purchases are kept
                by Apple, Google and RevenueCat under their own policies.
                Anonymous sign-up events cannot be linked to you and are not
                affected.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">11. Data Security</h2>
              <p className="text-muted leading-relaxed">
                We implement appropriate technical and organisational measures
                to protect your information against unauthorised access,
                alteration, disclosure or destruction. These include encryption
                in transit, secure authentication, access controls and regular
                security reviews. No method of transmission or storage is 100%
                secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">12. Your Rights</h2>
              <p className="text-muted leading-relaxed mb-3">Depending on your location, you may have the following rights regarding your personal data:</p>
              <ul className="space-y-2 text-muted list-none pl-0">
                {[
                  "Access: request a copy of the personal data we hold about you.",
                  "Correction: request that we correct inaccurate or incomplete data.",
                  "Deletion: request that we delete your personal data.",
                  "Restriction: request that we restrict the processing of your data.",
                  "Portability: request a copy of your data in a structured, machine-readable format.",
                  "Objection: object to certain types of processing, including direct marketing.",
                  "Withdraw consent: where processing is based on consent, withdraw it at any time.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted leading-relaxed mt-3">
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:info@forelandmarine.com" className="text-accent hover:text-white transition-colors">info@forelandmarine.com</a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">13. Account Deletion</h2>
              <p className="text-muted leading-relaxed">
                You may delete your account at any time from within the App
                settings, or by emailing{" "}
                <a href="mailto:info@forelandmarine.com" className="text-accent hover:text-white transition-colors">info@forelandmarine.com</a>{" "}
                with your account details. Deleting your account in the App
                removes your account, profile details, vessels, sea time
                entries, AIS checks linked to your vessels, notifications,
                sessions and profile photo straight away. A request by email is
                completed within 30 days.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">14. Children&apos;s Privacy</h2>
              <p className="text-muted leading-relaxed">
                The App is intended for use by professional mariners and is not
                directed at children under 13. We do not knowingly collect
                personal data from children under 13. If you believe a child
                has provided us with personal information, please contact us
                and we will take steps to delete it.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">15. International Transfers</h2>
              <p className="text-muted leading-relaxed">
                Your information may be processed and stored in countries
                outside your country of residence, including the United Kingdom
                and the European Union. Your account data is held in a database
                in Ireland and profile photos are stored in the Netherlands.
                Some of our service providers (including RevenueCat, Sentry,
                Resend, Expo and Railway) are based in the USA. Where data is
                transferred outside the UK or EEA, we rely on appropriate
                safeguards such as Standard Contractual Clauses or the UK
                International Data Transfer Agreement to protect your data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">16. Third Party Services</h2>
              <p className="text-muted leading-relaxed">
                The App may rely on third party services for hosting,
                authentication, analytics and AIS data. These third parties
                process data in accordance with their own privacy policies and
                contractual commitments to us. We do not share more information
                with them than is necessary to provide the App.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">17. Changes to This Policy</h2>
              <p className="text-muted leading-relaxed">
                We may update this Privacy Policy from time to time. The
                &ldquo;Last updated&rdquo; date at the top of this page indicates when the
                policy was last revised. Significant changes will be notified
                via the App or by email where appropriate.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">18. Contact Us</h2>
              <p className="text-muted leading-relaxed">
                If you have any questions about this Privacy Policy or our
                handling of your data, please contact us at{" "}
                <a href="mailto:info@forelandmarine.com" className="text-accent hover:text-white transition-colors">info@forelandmarine.com</a>{" "}
                or write to us at: Foreland Marine Consultancy Ltd, 7 Bell Yard,
                London, WC2A 2JR, United Kingdom.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
