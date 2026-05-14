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
        <tr><td style="padding:40px 40px 0 40px;">
          <p style="margin:0 0 6px 0;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#5386B6;">Foreland Marine</p>
          <h1 style="margin:0 0 24px 0;font-size:24px;font-weight:300;color:#FFFFFF;line-height:1.3;">Welcome aboard, ${captainName}.</h1>
        </td></tr>
        <tr><td style="padding:0 40px 24px 40px;color:#7BA8C8;font-size:15px;line-height:1.6;">
          <p style="margin:0 0 16px 0;">${yachtName} is now signed up for the <strong style="color:#FFFFFF;">${tierName}</strong> programme at ${priceDisplay}.</p>
          <p style="margin:0 0 16px 0;">From here, the workflow is simple. Email <a href="mailto:${SUPPORT_EMAIL}" style="color:#5386B6;text-decoration:none;">${SUPPORT_EMAIL}</a> or call <a href="tel:${SUPPORT_PHONE.replace(/ /g, "")}" style="color:#5386B6;text-decoration:none;">${SUPPORT_PHONE}</a> with the issue, the part, or the question. The same team responds every time.</p>
          <p style="margin:0 0 16px 0;">In the next few working days a senior engineer will be in touch to schedule the annual planned maintenance system check, agree the delivery date for the emergency repair kit, and exchange direct mobile numbers.</p>
          <p style="margin:0 0 0 0;">If anything is wrong before then, call or write at any hour. The line is open day and night.</p>
        </td></tr>
        <tr><td style="padding:24px 40px 32px 40px;border-top:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0 0 8px 0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#5386B6;">What happens next</p>
          <p style="margin:0;color:#7BA8C8;font-size:14px;line-height:1.6;">Card billing renews monthly. Annual term, thirty days&rsquo; notice to leave. Reply to this email any time.</p>
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
  const subject = `New TS signup: ${args.yachtName} (${args.tierName})`;
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
    to: SUPPORT_EMAIL,
    subject,
    text: lines.join("\n"),
  });
}
