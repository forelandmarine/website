import type { Metadata } from "next";
import { HorizonLine } from "@/components/ui";

export const metadata: Metadata = {
  title: "Account & Data Deletion — SeaTime Tracker",
  description:
    "How to permanently delete your SeaTime Tracker account and associated data, in the app or by email.",
  alternates: { canonical: "https://www.forelandmarine.com/delete-account" },
};

export default function DeleteAccountPage() {
  return (
    <>
      <section className="relative py-20 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-accent text-sm uppercase tracking-wider mb-3">SeaTime Tracker</p>
          <h1 className="text-4xl font-light text-white mb-3">Delete your account</h1>
          <p className="text-muted text-sm mb-8">
            You can permanently delete your SeaTime Tracker account and its associated data at any time.
          </p>
          <HorizonLine />
        </div>
      </section>

      <section className="py-16 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">

            <div>
              <h2 className="text-xl font-light text-white mb-4">Option 1 — In the app (fastest)</h2>
              <ol className="space-y-2 text-muted list-none pl-0">
                {[
                  <>Open <strong className="text-white">SeaTime Tracker</strong> and sign in.</>,
                  <>Go to <strong className="text-white">Profile → Account / Personal details</strong>.</>,
                  <>Tap <strong className="text-white">Delete Account</strong> and confirm.</>,
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-accent/15 text-accent text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <p className="text-muted leading-relaxed mt-4">
                Your account and data are removed immediately and permanently.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">Option 2 — By email (no app needed)</h2>
              <p className="text-muted leading-relaxed">
                If you can no longer access the app, email{" "}
                <a href="mailto:dan@forelandmarine.com?subject=Delete%20my%20SeaTime%20Tracker%20account" className="text-accent hover:underline">
                  dan@forelandmarine.com
                </a>{" "}
                from the address registered to your account, with the subject{" "}
                <strong className="text-white">&ldquo;Delete my SeaTime Tracker account&rdquo;</strong>.
                We will verify the request and delete your account within{" "}
                <strong className="text-white">30 days</strong>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">What gets deleted</h2>
              <p className="text-muted leading-relaxed mb-3">Deleting your account permanently removes:</p>
              <ul className="space-y-2 text-muted list-none pl-0">
                {[
                  "Your account and login credentials (name, email address, profile photo)",
                  "Your tracked vessels and their details",
                  "Your sea-time records and voyage entries",
                  "Your certificates and expiry data",
                  "Your notification and app settings",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted leading-relaxed mt-4">
                This action is <strong className="text-white">irreversible</strong> — deleted data cannot be recovered.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">What we may retain, and for how long</h2>
              <p className="text-muted leading-relaxed">
                We do not retain personal account data after deletion, except where we are legally
                required to (for example, minimal transaction records related to any subscription
                purchase, held only as long as tax and accounting law requires, then deleted).
                Subscription billing is handled by the Apple App Store or Google Play; to stop a
                subscription, cancel it in your app-store account before deleting.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">Questions</h2>
              <p className="text-muted leading-relaxed">
                Contact{" "}
                <a href="mailto:dan@forelandmarine.com" className="text-accent hover:underline">
                  dan@forelandmarine.com
                </a>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
