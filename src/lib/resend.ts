import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  _resend = new Resend(key);
  return _resend;
}

export const resend = new Proxy({} as Resend, {
  get(_target, prop, receiver) {
    return Reflect.get(getResend(), prop, receiver);
  },
});

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Foreland Marine <info@forelandmarine.com>";

export const SUPPORT_EMAIL = "info@forelandmarine.com";
export const SUPPORT_PHONE = "+44 7921 528 168";
export const SUPPORT_PHONE_TEL = "+447921528168";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.forelandmarine.com";

// All internal notifications go to Jack until info@ routing is reliable. He is
// also BCC'd on customer-facing welcome / confirmation emails.
export const INTERNAL_NOTIFY_EMAIL = "jack@forelandmarine.com";

const TERMS_URL = `${SITE_URL}/technical-support/terms`;

type WelcomeArgs = {
  to: string;
  yachtName: string;
  captainName: string;
  tierName: string;
  priceDisplay: string;
};

export async function sendWelcomeEmail(args: WelcomeArgs) {
  const { to, yachtName, captainName, tierName, priceDisplay } = args;
  const subject = `Welcome to Foreland Technical Support, ${yachtName}`;

  const html = `
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#040D1A;font-family:'Nunito Sans',Helvetica,Arial,sans-serif;color:#FFFFFF;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#040D1A;">
    <tr><td align="center" style="padding:40px 20px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background:#081630;border:1px solid rgba(255,255,255,0.08);">
        <tr><td align="center" style="padding:32px 40px 28px 40px;background:#FFFFFF;border-bottom:1px solid rgba(255,255,255,0.08);">
          <a href="${SITE_URL}" style="display:inline-block;text-decoration:none;">
            <img src="${SITE_URL}/logos/foreland-marine-color.png" alt="Foreland Marine Consultancy" width="280" style="display:block;width:280px;max-width:280px;height:auto;border:0;" />
          </a>
        </td></tr>
        <tr><td style="padding:40px 40px 0 40px;">
          <p style="margin:0 0 6px 0;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#5386B6;">Technical Support</p>
          <h1 style="margin:0 0 24px 0;font-size:24px;font-weight:300;color:#FFFFFF;line-height:1.3;">Welcome aboard, ${captainName}.</h1>
        </td></tr>
        <tr><td style="padding:0 40px 24px 40px;color:#7BA8C8;font-size:15px;line-height:1.6;">
          <p style="margin:0 0 16px 0;">${yachtName} is now signed up for the <strong style="color:#FFFFFF;">${tierName}</strong> programme at ${priceDisplay}.</p>
          <p style="margin:0 0 16px 0;">From here, the workflow is simple. Email <a href="mailto:${SUPPORT_EMAIL}" style="color:#5386B6;text-decoration:none;">${SUPPORT_EMAIL}</a> or call <a href="tel:${SUPPORT_PHONE_TEL}" style="color:#5386B6;text-decoration:none;">${SUPPORT_PHONE}</a> with the issue, the part, or the question. The same team responds every time.</p>
          <p style="margin:0;">In the next few working days a senior engineer will be in touch to schedule the annual planned maintenance system check, agree the delivery date for the emergency repair kit, and exchange direct mobile numbers.</p>
        </td></tr>
        <tr><td style="padding:0 40px 32px 40px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#0C1E42;border:1px solid rgba(83,134,182,0.30);">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#5386B6;">Emergency line &middot; 24/7</p>
              <p style="margin:0;font-size:22px;font-weight:400;color:#FFFFFF;line-height:1.2;">
                <a href="tel:${SUPPORT_PHONE_TEL}" style="color:#FFFFFF;text-decoration:none;">${SUPPORT_PHONE}</a>
              </p>
              <p style="margin:8px 0 0 0;font-size:13px;color:#7BA8C8;line-height:1.5;">If anything is wrong, call this number. The line is open day and night.</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 40px 32px 40px;border-top:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0 0 8px 0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#5386B6;">What happens next</p>
          <p style="margin:0 0 12px 0;color:#7BA8C8;font-size:14px;line-height:1.6;">Card billing renews automatically. Annual term, thirty days&rsquo; notice to leave. Reply to this email any time.</p>
          <p style="margin:0;color:#7BA8C8;font-size:13px;line-height:1.6;">Your subscription is governed by our <a href="${TERMS_URL}" style="color:#5386B6;text-decoration:none;">Technical Support Terms &amp; Conditions</a>.</p>
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:rgba(255,255,255,0.4);">
          Foreland Marine Consultancy Ltd &middot; 7 Bell Yard, London WC2A 2JR &middot; ${SUPPORT_PHONE} &middot; forelandmarine.com
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    bcc: INTERNAL_NOTIFY_EMAIL,
    subject,
    html,
  });
}

type InternalNotificationArgs = {
  yachtName: string;
  captainName: string;
  captainEmail: string;
  engineerName: string | null;
  engineerEmail: string | null;
  tierName: string;
  priceDisplay: string;
  billingName: string;
};

export async function sendInternalSignupNotification(args: InternalNotificationArgs) {
  const subject = `New TS signup (card): ${args.yachtName} (${args.tierName})`;
  const lines = [
    `Yacht: ${args.yachtName}`,
    `Tier: ${args.tierName} (${args.priceDisplay})`,
    `Billing entity: ${args.billingName}`,
    `Captain: ${args.captainName} <${args.captainEmail}>`,
    args.engineerName
      ? `Chief Engineer: ${args.engineerName} <${args.engineerEmail ?? "—"}>`
      : `Chief Engineer: not provided`,
  ];

  return resend.emails.send({
    from: FROM_EMAIL,
    to: INTERNAL_NOTIFY_EMAIL,
    subject,
    text: lines.join("\n"),
  });
}

type InvoiceRequestInternalArgs = {
  yachtName: string;
  yachtImo: string | null;
  yachtMmsi: string | null;
  yachtLengthM: number | null;
  yachtFlag: string | null;
  yachtHomePort: string | null;
  tierName: string;
  priceDisplay: string;
  billingCycle: string;
  currency: string;
  billingName: string;
  billingEmail: string;
  billingAddress: string;
  billingVatNumber: string | null;
  captainName: string;
  captainEmail: string;
  captainPhone: string | null;
  engineerName: string | null;
  engineerEmail: string | null;
  engineerPhone: string | null;
  subscriptionRowId: string;
};

export async function sendInvoiceRequestInternalEmail(args: InvoiceRequestInternalArgs) {
  const subject = `INVOICE REQUEST: ${args.yachtName} — ${args.tierName} (${args.priceDisplay})`;

  const lines = [
    `A new Technical Support invoice request has been submitted.`,
    ``,
    `— SUBSCRIPTION —`,
    `Tier: ${args.tierName}`,
    `Price: ${args.priceDisplay}`,
    `Billing cycle: ${args.billingCycle}`,
    `Currency: ${args.currency.toUpperCase()}`,
    ``,
    `— VESSEL —`,
    `Yacht: ${args.yachtName}`,
    `Home port: ${args.yachtHomePort ?? "—"}`,
    `Length (m): ${args.yachtLengthM ?? "—"}`,
    `Flag state: ${args.yachtFlag ?? "—"}`,
    `IMO: ${args.yachtImo ?? "—"}`,
    `MMSI: ${args.yachtMmsi ?? "—"}`,
    ``,
    `— BILLING —`,
    `Entity: ${args.billingName}`,
    `Email: ${args.billingEmail}`,
    `Address:`,
    args.billingAddress,
    `VAT number: ${args.billingVatNumber ?? "—"}`,
    ``,
    `— CAPTAIN —`,
    `Name: ${args.captainName}`,
    `Email: ${args.captainEmail}`,
    `Phone: ${args.captainPhone ?? "—"}`,
    ``,
    `— CHIEF ENGINEER —`,
    args.engineerName
      ? `Name: ${args.engineerName}\nEmail: ${args.engineerEmail ?? "—"}\nPhone: ${args.engineerPhone ?? "—"}`
      : `Not provided.`,
    ``,
    `— ACTION —`,
    `Raise an invoice payable on receipt and send to the billing email above.`,
    `Mark the subscription as active in Supabase once the funds have cleared.`,
    `Supabase row id: ${args.subscriptionRowId}`,
  ];

  return resend.emails.send({
    from: FROM_EMAIL,
    to: INTERNAL_NOTIFY_EMAIL,
    subject,
    text: lines.join("\n"),
  });
}

type InvoiceRequestCustomerArgs = {
  to: string;
  yachtName: string;
  contactName: string;
  tierName: string;
  priceDisplay: string;
};

export async function sendInvoiceRequestCustomerEmail(args: InvoiceRequestCustomerArgs) {
  const { to, yachtName, contactName, tierName, priceDisplay } = args;
  const subject = `Invoice request received — Foreland Technical Support (${yachtName})`;

  const html = `
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#040D1A;font-family:'Nunito Sans',Helvetica,Arial,sans-serif;color:#FFFFFF;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#040D1A;">
    <tr><td align="center" style="padding:40px 20px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background:#081630;border:1px solid rgba(255,255,255,0.08);">
        <tr><td align="center" style="padding:32px 40px 28px 40px;background:#FFFFFF;border-bottom:1px solid rgba(255,255,255,0.08);">
          <a href="${SITE_URL}" style="display:inline-block;text-decoration:none;">
            <img src="${SITE_URL}/logos/foreland-marine-color.png" alt="Foreland Marine Consultancy" width="280" style="display:block;width:280px;max-width:280px;height:auto;border:0;" />
          </a>
        </td></tr>
        <tr><td style="padding:40px 40px 0 40px;">
          <p style="margin:0 0 6px 0;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#5386B6;">Technical Support</p>
          <h1 style="margin:0 0 24px 0;font-size:24px;font-weight:300;color:#FFFFFF;line-height:1.3;">Invoice request received.</h1>
        </td></tr>
        <tr><td style="padding:0 40px 24px 40px;color:#7BA8C8;font-size:15px;line-height:1.6;">
          <p style="margin:0 0 16px 0;">Thank you, ${contactName}. We have received your request for an invoice for ${yachtName} on the <strong style="color:#FFFFFF;">${tierName}</strong> programme at ${priceDisplay}.</p>
          <p style="margin:0 0 16px 0;">A VAT invoice will be issued to the billing address you provided within one working day, payable on receipt by bank transfer to the account stated on the invoice. The subscription becomes active as soon as the funds clear.</p>
          <p style="margin:0;">If anything on the invoice needs correcting, reply to this email and we will reissue it.</p>
        </td></tr>
        <tr><td style="padding:0 40px 32px 40px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#0C1E42;border:1px solid rgba(83,134,182,0.30);">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#5386B6;">Emergency line &middot; 24/7</p>
              <p style="margin:0;font-size:22px;font-weight:400;color:#FFFFFF;line-height:1.2;">
                <a href="tel:${SUPPORT_PHONE_TEL}" style="color:#FFFFFF;text-decoration:none;">${SUPPORT_PHONE}</a>
              </p>
              <p style="margin:8px 0 0 0;font-size:13px;color:#7BA8C8;line-height:1.5;">Cover begins once your first invoice is paid. Until then, call us in an emergency and we will still pick up.</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 40px 32px 40px;border-top:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0 0 8px 0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#5386B6;">Terms</p>
          <p style="margin:0;color:#7BA8C8;font-size:13px;line-height:1.6;">Your subscription is governed by our <a href="${TERMS_URL}" style="color:#5386B6;text-decoration:none;">Technical Support Terms &amp; Conditions</a>, which you accepted at sign-up.</p>
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:rgba(255,255,255,0.4);">
          Foreland Marine Consultancy Ltd &middot; 7 Bell Yard, London WC2A 2JR &middot; ${SUPPORT_PHONE} &middot; forelandmarine.com
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    bcc: INTERNAL_NOTIFY_EMAIL,
    subject,
    html,
  });
}
