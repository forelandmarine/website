import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { isCurrency } from "@/lib/technical-support";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

type PayBody = {
  amount: number; // major units, e.g. 1250.50
  currency: string;
  payerName: string;
  payerEmail: string;
  reference?: string;
  note?: string;
};

// Stripe rejects charges below roughly the local equivalent of £0.30. Keep a
// sensible floor for a professional-services payment page.
const MIN_AMOUNT = 1;
const MAX_AMOUNT = 500000;

function requiredString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as PayBody | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isCurrency(body.currency)) {
    return NextResponse.json({ error: "Invalid currency." }, { status: 400 });
  }

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
    return NextResponse.json(
      { error: `Enter an amount between ${MIN_AMOUNT} and ${MAX_AMOUNT.toLocaleString()}.` },
      { status: 400 }
    );
  }

  if (!requiredString(body.payerName)) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }

  if (!requiredString(body.payerEmail)) {
    return NextResponse.json({ error: "Please enter an email for the receipt." }, { status: 400 });
  }

  // Round to whole minor units (pence / cents) to avoid float dust.
  const unitAmount = Math.round(amount * 100);

  const reference = body.reference?.trim() || null;
  const note = body.note?.trim() || null;

  // If the reference is a live invoice number, route this through the invoice
  // flow so the webhook records the payment against it and marks it paid.
  let invoiceId: string | null = null;
  if (reference) {
    const admin = getSupabaseAdmin();
    if (admin) {
      const { data: inv } = await admin
        .from("fm_invoices")
        .select("id, status")
        .eq("number", reference)
        .maybeSingle();
      if (inv && inv.status !== "void") invoiceId = inv.id;
    }
  }

  const paymentType = invoiceId ? "fm_invoice" : "generic";
  const sharedMeta: Record<string, string> = {
    payment_type: paymentType,
    payer_name: body.payerName.trim(),
    reference: reference ?? "",
    note: note ?? "",
    ...(invoiceId ? { invoice_id: invoiceId } : {}),
  };

  const productName = reference
    ? `Foreland Marine payment — ${reference}`
    : "Foreland Marine payment";

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL || req.headers.get("origin") || "https://www.forelandmarine.com";

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: body.payerEmail.trim().toLowerCase(),
      billing_address_collection: "required",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: body.currency,
            unit_amount: unitAmount,
            product_data: {
              name: productName,
              ...(note ? { description: note } : {}),
            },
          },
        },
      ],
      payment_intent_data: {
        description: productName,
        metadata: sharedMeta,
      },
      metadata: {
        ...sharedMeta,
        payer_email: body.payerEmail.trim().toLowerCase(),
      },
      success_url: `${origin}/pay/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pay?canceled=1`,
    });
  } catch (err) {
    console.error("Stripe payment session error:", err);
    return NextResponse.json(
      { error: "Could not start the payment flow. Please try again." },
      { status: 500 }
    );
  }

  if (!session.url) {
    return NextResponse.json(
      { error: "Stripe did not return a redirect URL." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: session.url });
}
