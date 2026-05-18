import type { Metadata } from "next";
import Link from "next/link";
import { HorizonLine } from "@/components/ui";

export const metadata: Metadata = {
  title: "Technical Support Terms & Conditions",
  description:
    "Terms and Conditions of Foreland Marine Consultancy Ltd's Technical Support programme.",
};

export default function TechnicalSupportTermsPage() {
  return (
    <>
      <section className="relative py-20 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Technical Support
          </p>
          <h1 className="text-4xl font-light text-white mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="text-muted text-sm mb-8">Version 1.0 &middot; In force from 18 May 2026</p>
          <HorizonLine />
        </div>
      </section>

      <section className="py-16 bg-bg1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 text-muted leading-relaxed">

            <div>
              <h2 className="text-xl font-light text-white mb-4">1. Parties &amp; interpretation</h2>
              <p>
                These Terms and Conditions (the &ldquo;<strong className="text-white">Terms</strong>&rdquo;) are between Foreland Marine Consultancy Ltd, a company incorporated in England and Wales whose registered office is at 7 Bell Yard, London WC2A 2JR (the &ldquo;<strong className="text-white">Company</strong>&rdquo;, &ldquo;<strong className="text-white">we</strong>&rdquo; or &ldquo;<strong className="text-white">us</strong>&rdquo;) and the person or entity named on the sign-up form or invoice (the &ldquo;<strong className="text-white">Client</strong>&rdquo; or &ldquo;<strong className="text-white">you</strong>&rdquo;). Together we are the &ldquo;<strong className="text-white">parties</strong>&rdquo;.
              </p>
              <p className="mt-3">
                These Terms, together with the tier, currency, billing cycle and vessel particulars selected at sign-up and any written variation signed by both parties, form the entire agreement between the parties for the supply of Technical Support services (the &ldquo;<strong className="text-white">Agreement</strong>&rdquo;).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">2. The Services</h2>
              <p>
                We shall use reasonable skill and care to provide remote and on-call technical support, parts sourcing, freight coordination and planned-maintenance services to the vessel named at sign-up (the &ldquo;<strong className="text-white">Vessel</strong>&rdquo;) in accordance with the inclusions of the tier elected by the Client (Standby, Direct or Captive) as published on our website at the date of sign-up (the &ldquo;<strong className="text-white">Services</strong>&rdquo;).
              </p>
              <p className="mt-3">
                Included engineer hours are calculated per calendar month and do not carry over. Hours used in excess of the monthly allowance are chargeable at our standard day rate, notified in advance. Travel, accommodation, freight, customs duties, third-party labour and the cost of parts are not included and are passed through at cost plus our standard handling fee.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">3. Emergency response</h2>
              <p>
                We operate a 24-hour emergency line. We shall use reasonable endeavours to respond to emergency calls promptly, but the Client acknowledges that response times depend on engineer availability, vessel location, communications infrastructure and other factors outside our control. Nothing in this Agreement constitutes a guarantee of any specific response time, attendance time, or repair outcome.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">4. Term &amp; renewal</h2>
              <p>
                The initial term of the Agreement is twelve (12) months from the date of activation (the &ldquo;<strong className="text-white">Initial Term</strong>&rdquo;). After the Initial Term the Agreement continues on a rolling basis under the same billing cycle until terminated by either party on not less than thirty (30) days&rsquo; prior written notice, such notice not to expire before the end of the Initial Term.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">5. Fees &amp; payment</h2>
              <p>
                Fees are payable in advance in the currency and cycle selected at sign-up. All fees are exclusive of value added tax, which shall be charged in addition where applicable.
              </p>
              <p className="mt-3">
                <strong className="text-white">Card payments.</strong> Where the Client elects card payment, the chosen payment method will be charged automatically at the start of each billing period via our payment processor, Stripe. Receipts are issued by Stripe.
              </p>
              <p className="mt-3">
                <strong className="text-white">Invoice / bank transfer.</strong> Where the Client elects payment by invoice, we shall issue an invoice to the billing address provided. Invoices are <strong className="text-white">payable on receipt</strong> by bank transfer to the account stated on the invoice. The Services shall not become active until the first invoice is paid in cleared funds. Subsequent renewals are invoiced at least fourteen (14) days before the next billing period.
              </p>
              <p className="mt-3">
                <strong className="text-white">Late payment.</strong> We reserve the right to charge interest on overdue sums at the rate of 4% per annum above the Bank of England base rate from time to time, accruing daily from the due date until payment in full, whether before or after judgment, and to suspend the Services until payment is received. We may also recover reasonable costs of collection.
              </p>
              <p className="mt-3">
                Fees are non-refundable save where required by law or expressly stated in these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">6. Client&rsquo;s responsibilities</h2>
              <p>
                The Client shall (a) provide accurate and complete vessel and contact information and update us promptly of any changes; (b) procure that the Master and Chief Engineer cooperate reasonably with our personnel; (c) maintain valid insurance over the Vessel; (d) ensure safe and lawful access to the Vessel for any agreed attendance; and (e) settle invoiced sums on time.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">7. Limitation of liability</h2>
              <p>
                Nothing in this Agreement excludes or limits either party&rsquo;s liability for (a) death or personal injury caused by negligence; (b) fraud or fraudulent misrepresentation; or (c) any other liability that cannot lawfully be excluded or limited.
              </p>
              <p className="mt-3">
                Subject to the paragraph above, our total aggregate liability to the Client arising out of or in connection with this Agreement, whether in contract, tort (including negligence), breach of statutory duty or otherwise, shall not exceed an amount equal to the fees paid by the Client to us in the twelve (12) months immediately preceding the event giving rise to the claim.
              </p>
              <p className="mt-3">
                We shall not be liable for any loss of profit, loss of revenue, loss of business opportunity, loss of charter, loss of use of the Vessel, loss of data, or any indirect or consequential loss whatsoever, howsoever arising.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">8. Confidentiality &amp; data protection</h2>
              <p>
                Each party shall keep confidential all non-public information received from the other in connection with the Agreement and use it solely for the purpose of performing the Agreement. We process personal data in accordance with our <Link href="/privacy-policy" className="text-accent hover:text-white transition-colors">Privacy Policy</Link>, which is incorporated by reference into these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">9. Termination</h2>
              <p>
                Either party may terminate the Agreement immediately by written notice if the other (a) commits a material breach which is not capable of remedy, or which, if capable of remedy, is not remedied within thirty (30) days of written notice; or (b) becomes insolvent, enters into liquidation, has a receiver or administrator appointed, or ceases to carry on business.
              </p>
              <p className="mt-3">
                On termination, any sums due to us up to and including the effective date of termination shall become immediately payable. Termination shall not affect any rights, remedies, obligations or liabilities that have accrued up to the date of termination.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">10. Force majeure</h2>
              <p>
                Neither party shall be in breach of the Agreement nor liable for any delay in performing, or failure to perform, any of its obligations under the Agreement to the extent that such delay or failure results from events, circumstances or causes beyond its reasonable control, including (without limitation) acts of God, war, terrorism, civil disorder, governmental action, sanctions, pandemic, severe weather, fire, flood, port closures, or failure of communications or transport networks.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">11. General</h2>
              <p>
                <strong className="text-white">Variation.</strong> No variation of these Terms shall be effective unless in writing and signed by an authorised representative of each party.
              </p>
              <p className="mt-3">
                <strong className="text-white">Assignment.</strong> The Client shall not assign, transfer or subcontract any of its rights or obligations under the Agreement without our prior written consent.
              </p>
              <p className="mt-3">
                <strong className="text-white">Notices.</strong> Notices shall be in writing and sent to the address most recently notified by the recipient party, or by email to <a className="text-accent hover:text-white transition-colors" href="mailto:info@forelandmarine.com">info@forelandmarine.com</a> (for the Company) or to the billing email recorded at sign-up (for the Client).
              </p>
              <p className="mt-3">
                <strong className="text-white">Third-party rights.</strong> A person who is not a party to the Agreement has no rights under the Contracts (Rights of Third Parties) Act 1999 to enforce any term of it.
              </p>
              <p className="mt-3">
                <strong className="text-white">Severance.</strong> If any provision of the Agreement is or becomes invalid, illegal or unenforceable, it shall be deemed modified to the minimum extent necessary to make it valid, legal and enforceable; if such modification is not possible, the relevant provision shall be deemed deleted. Any such modification or deletion shall not affect the validity and enforceability of the rest of the Agreement.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-white mb-4">12. Governing law &amp; jurisdiction</h2>
              <p>
                The Agreement and any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with it or its subject matter or formation shall be governed by and construed in accordance with the laws of England and Wales. The parties irrevocably submit to the exclusive jurisdiction of the courts of England and Wales in respect of any such dispute or claim.
              </p>
            </div>

            <div className="border-t border-white/10 pt-8 mt-12">
              <p className="text-xs text-muted/70 leading-relaxed">
                Foreland Marine Consultancy Ltd &middot; 7 Bell Yard, London WC2A 2JR &middot; <a className="text-accent hover:text-white transition-colors" href="mailto:info@forelandmarine.com">info@forelandmarine.com</a> &middot; +44 7921 528 168
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
