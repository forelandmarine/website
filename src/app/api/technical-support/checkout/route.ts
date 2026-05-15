import { NextRequest, NextResponse } from "next/server";
import { stripe, getPriceId } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import { isTier, isCurrency, isCycle, TIER_NAMES } from "@/lib/technical-support";

type CheckoutBody = {
  tier: string;
  currency: string;
  billingCycle: string;

  yachtName: string;
  yachtImo?: string;
  yachtMmsi?: string;
  yachtLengthM?: number;
  yachtFlag?: string;
  yachtHomePort?: string;

  billingName: string;
  billingEmail: string;

  captainName: string;
  captainEmail: string;
  captainPhone?: string;

  engineerName?: string;
  engineerEmail?: string;
  engineerPhone?: string;
};

function requiredString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as CheckoutBody | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isTier(body.tier)) {
    return NextResponse.json({ error: "Invalid tier." }, { status: 400 });
  }

  if (!isCurrency(body.currency)) {
    return NextResponse.json({ error: "Invalid currency." }, { status: 400 });
  }

  if (!isCycle(body.billingCycle)) {
    return NextResponse.json({ error: "Invalid billing cycle." }, { status: 400 });
  }

  const requiredFields: Record<string, unknown> = {
    yachtName: body.yachtName,
    billingName: body.billingName,
    billingEmail: body.billingEmail,
    captainName: body.captainName,
    captainEmail: body.captainEmail,
  };

  for (const [k, v] of Object.entries(requiredFields)) {
    if (!requiredString(v)) {
      return NextResponse.json(
        { error: `Missing required field: ${k}.` },
        { status: 400 }
      );
    }
  }

  // Persist the pre-checkout submission so we don't lose data if checkout is
  // abandoned. The Stripe IDs get filled in later by the webhook.
  const { data: insertData, error: insertError } = await supabase
    .from("technical_support_subscriptions")
    .insert({
      tier: body.tier,
      currency: body.currency,
      billing_cycle: body.billingCycle,
      yacht_name: body.yachtName.trim(),
      yacht_imo: body.yachtImo?.trim() || null,
      yacht_mmsi: body.yachtMmsi?.trim() || null,
      yacht_length_m: body.yachtLengthM ?? null,
      yacht_flag: body.yachtFlag?.trim() || null,
      yacht_home_port: body.yachtHomePort?.trim() || null,
      billing_name: body.billingName.trim(),
      billing_email: body.billingEmail.trim().toLowerCase(),
      captain_name: body.captainName.trim(),
      captain_email: body.captainEmail.trim().toLowerCase(),
      captain_phone: body.captainPhone?.trim() || null,
      engineer_name: body.engineerName?.trim() || null,
      engineer_email: body.engineerEmail?.trim().toLowerCase() || null,
      engineer_phone: body.engineerPhone?.trim() || null,
    })
    .select("id")
    .single();

  if (insertError || !insertData) {
    console.error("Failed to insert TS subscription draft:", insertError);
    return NextResponse.json(
      { error: "Could not save your details. Please try again." },
      { status: 500 }
    );
  }

  const subscriptionRowId = insertData.id;

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL || req.headers.get("origin") || "https://www.forelandmarine.com";

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: body.billingEmail.trim().toLowerCase(),
      line_items: [
        {
          price: getPriceId(body.tier, body.currency, body.billingCycle),
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      billing_address_collection: "required",
      subscription_data: {
        metadata: {
          subscription_row_id: subscriptionRowId,
          tier: body.tier,
          currency: body.currency,
          billing_cycle: body.billingCycle,
          yacht_name: body.yachtName.trim(),
        },
      },
      metadata: {
        subscription_row_id: subscriptionRowId,
        tier: body.tier,
        currency: body.currency,
        billing_cycle: body.billingCycle,
        yacht_name: body.yachtName.trim(),
        tier_name: TIER_NAMES[body.tier],
      },
      success_url: `${origin}/technical-support/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/technical-support/sign-up?tier=${body.tier}&canceled=1`,
    });
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    return NextResponse.json(
      { error: "Could not start the payment flow. Please try again." },
      { status: 500 }
    );
  }

  // Save the checkout session id so we can correlate webhook events.
  await supabase
    .from("technical_support_subscriptions")
    .update({ stripe_checkout_session_id: session.id })
    .eq("id", subscriptionRowId);

  if (!session.url) {
    return NextResponse.json(
      { error: "Stripe did not return a redirect URL." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: session.url });
}
