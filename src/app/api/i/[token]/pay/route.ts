import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

// Public: creates a Stripe Checkout session for the outstanding balance of an
// invoice identified by its public token. The webhook records the payment.
export async function POST(req: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  const admin = getSupabaseAdmin();
  if (!admin) return NextResponse.json({ error: "Not configured." }, { status: 500 });

  const { data: inv } = await admin
    .from("fm_invoices")
    .select("id, number, total, amount_paid, currency, status")
    .eq("public_token", token)
    .single();

  if (!inv) return NextResponse.json({ error: "Invoice not found." }, { status: 404 });
  if (inv.status === "void") return NextResponse.json({ error: "This invoice is void." }, { status: 400 });

  const balance = Number(inv.total) - Number(inv.amount_paid);
  if (balance <= 0) return NextResponse.json({ error: "This invoice is already paid." }, { status: 400 });

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL || req.headers.get("origin") || "https://www.forelandmarine.com";

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "required",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: (inv.currency || "gbp").toLowerCase(),
            unit_amount: Math.round(balance * 100),
            product_data: { name: `Foreland Marine invoice ${inv.number}` },
          },
        },
      ],
      payment_intent_data: {
        description: `Invoice ${inv.number}`,
        metadata: { payment_type: "fm_invoice", invoice_id: inv.id },
      },
      metadata: { payment_type: "fm_invoice", invoice_id: inv.id },
      success_url: `${origin}/i/${token}?paid=1`,
      cancel_url: `${origin}/i/${token}`,
    });
  } catch (err) {
    console.error("Stripe invoice pay error:", err);
    return NextResponse.json({ error: "Could not start payment." }, { status: 500 });
  }

  if (!session.url) return NextResponse.json({ error: "No redirect URL." }, { status: 500 });
  return NextResponse.json({ url: session.url });
}
