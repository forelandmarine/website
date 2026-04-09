import type { Metadata } from "next";
import { HorizonLine } from "@/components/ui";

export const metadata: Metadata = {
  title: "AIS SeaTime Tracker - Terms of Use",
  description: "Terms of Use (EULA) for the AIS SeaTime Tracker mobile application.",
  robots: { index: false, follow: false },
};

export default function SeatimeTermsPage() {
  return (
    <>
      <section className="relative py-20 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">AIS SeaTime Tracker</p>
          <h1 className="text-4xl font-light text-white mb-3">Terms of Use</h1>
          <p className="text-muted text-sm mb-8">Last updated: 9 April 2026</p>
          <HorizonLine />
        </div>
      </section>

      <section className="py-16 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">

            <div>
              <p className="text-muted leading-relaxed">
                These Terms of Use (&ldquo;Terms&rdquo;) govern your use of the AIS
                SeaTime Tracker mobile application (the &ldquo;App&rdquo;) provided by
                Foreland Marine Consultancy Ltd (&ldquo;Foreland Marine&rdquo;,
                &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By
                downloading, installing or using the App, you agree to be bound
                by these Terms. If you do not agree, do not use the App.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">1. Licence Grant</h2>
              <p className="text-muted leading-relaxed">
                Subject to your compliance with these Terms, Foreland Marine
                grants you a limited, non-exclusive, non-transferable,
                revocable licence to download and use the App on any
                Apple-branded products that you own or control, and as
                permitted by the Apple Media Services Terms and Conditions.
                This licence does not allow you to use the App on any device
                that you do not own or control.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">2. Permitted Use</h2>
              <p className="text-muted leading-relaxed mb-3">You may use the App only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="space-y-2 text-muted list-none pl-0">
                {[
                  "Copy, modify, distribute, sell or lease any part of the App.",
                  "Reverse engineer, decompile or attempt to extract the source code of the App, except where permitted by applicable law.",
                  "Use the App in any way that could damage, disable, overburden or impair our servers or networks.",
                  "Use the App to transmit any harmful code, viruses or malicious software.",
                  "Use the App for any unlawful purpose or in violation of any applicable laws or regulations.",
                  "Attempt to gain unauthorised access to any part of the App or its related systems.",
                  "Falsify or misrepresent vessel data, sea time records or other information submitted through the App.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">3. Account Registration</h2>
              <p className="text-muted leading-relaxed">
                Certain features of the App require you to create an account.
                You agree to provide accurate, current and complete information
                during registration and to keep that information up to date.
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activity that occurs under your
                account. You must notify us immediately of any unauthorised use
                of your account.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">4. Sea Time Records</h2>
              <p className="text-muted leading-relaxed">
                The App provides tools to log and present sea time records for
                personal and professional use. You are solely responsible for
                the accuracy of any sea time records you create, edit or
                submit. The App is provided as an aid to record keeping and
                does not constitute an official log or substitute for any
                statutory record required by flag states, classification
                societies, the MCA or any other regulatory body. Foreland
                Marine accepts no liability for the use of sea time records in
                regulatory or certification contexts.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">5. AIS and Position Data</h2>
              <p className="text-muted leading-relaxed">
                Vessel position data displayed in the App is sourced from
                third-party AIS feeds and public broadcasting infrastructure.
                Position data may be delayed, incomplete or inaccurate.
                The App must not be used as a primary means of navigation,
                collision avoidance or safety-of-life decision making. Always
                rely on certified navigation equipment and competent
                seamanship.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">6. Intellectual Property</h2>
              <p className="text-muted leading-relaxed">
                The App, including all content, features, branding, code,
                designs and trademarks, is owned by Foreland Marine or its
                licensors and is protected by intellectual property laws. No
                rights are granted to you other than the limited licence
                expressly set out in these Terms. You retain ownership of any
                content or data you submit to the App, and grant us a limited
                licence to host, store and process it for the purpose of
                providing the App.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">7. Privacy</h2>
              <p className="text-muted leading-relaxed">
                Your use of the App is subject to our{" "}
                <a href="/tools/seatime-tracker/privacy" className="text-accent hover:text-white transition-colors">Privacy Policy</a>,
                which describes how we collect, use and protect your
                information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">8. Disclaimers</h2>
              <p className="text-muted leading-relaxed">
                THE APP IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS,
                WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. TO THE
                MAXIMUM EXTENT PERMITTED BY LAW, FORELAND MARINE DISCLAIMS ALL
                WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, RELIABILITY AND
                NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE APP WILL BE
                UNINTERRUPTED, ERROR-FREE OR FREE OF HARMFUL COMPONENTS, OR
                THAT VESSEL POSITION OR AIS DATA WILL BE ACCURATE OR COMPLETE.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">9. Limitation of Liability</h2>
              <p className="text-muted leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, FORELAND
                MARINE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS OF
                PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY,
                OR ANY LOSS OF DATA, USE, GOODWILL OR OTHER INTANGIBLE LOSSES,
                RESULTING FROM YOUR USE OR INABILITY TO USE THE APP. OUR TOTAL
                LIABILITY FOR ANY CLAIM ARISING FROM OR RELATED TO THE APP
                SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO US
                FOR THE APP IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR (B)
                FIFTY POUNDS STERLING (GBP 50).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">10. Indemnification</h2>
              <p className="text-muted leading-relaxed">
                You agree to indemnify and hold harmless Foreland Marine, its
                officers, directors, employees and agents from and against any
                claims, liabilities, damages, losses and expenses arising out
                of your use of the App, your violation of these Terms or your
                violation of any rights of a third party.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">11. Termination</h2>
              <p className="text-muted leading-relaxed">
                These Terms remain in effect until terminated by you or by us.
                You may terminate by deleting your account and removing the
                App from your devices. We may suspend or terminate your access
                to the App at any time, with or without notice, for any
                reason, including breach of these Terms. Upon termination, the
                rights and licences granted to you will cease.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">12. Apple Specific Terms</h2>
              <p className="text-muted leading-relaxed mb-3">If you obtained the App from the Apple App Store, the following additional terms apply:</p>
              <ul className="space-y-2 text-muted list-none pl-0">
                {[
                  "These Terms are concluded between you and Foreland Marine, not with Apple. Apple is not responsible for the App or its content.",
                  "Your licence to use the App is limited to use on Apple-branded devices that you own or control, as permitted by the Apple Media Services Terms and Conditions.",
                  "Apple has no obligation to furnish maintenance or support services for the App.",
                  "In the event of any failure of the App to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price (if any) to you. To the maximum extent permitted by law, Apple has no other warranty obligation in respect of the App.",
                  "Foreland Marine, not Apple, is responsible for addressing any product or user claims relating to the App.",
                  "Foreland Marine, not Apple, is responsible for the investigation, defence, settlement and discharge of any third party intellectual property infringement claim.",
                  "You represent that you are not located in a country subject to a US Government embargo or designated as a 'terrorist supporting' country, and that you are not listed on any US Government list of prohibited or restricted parties.",
                  "Apple and Apple's subsidiaries are third party beneficiaries of these Terms and, upon your acceptance, will have the right to enforce these Terms against you.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">13. Governing Law</h2>
              <p className="text-muted leading-relaxed">
                These Terms are governed by the laws of England and Wales.
                Any dispute arising from or relating to these Terms or the
                App shall be subject to the exclusive jurisdiction of the
                courts of England and Wales, except where prohibited by
                mandatory consumer protection laws in your country of
                residence.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">14. Changes to These Terms</h2>
              <p className="text-muted leading-relaxed">
                We may update these Terms from time to time. The &ldquo;Last
                updated&rdquo; date at the top of this page indicates when these
                Terms were last revised. Continued use of the App after any
                changes constitutes acceptance of the revised Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">15. Contact</h2>
              <p className="text-muted leading-relaxed">
                If you have any questions about these Terms, please contact us at{" "}
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
