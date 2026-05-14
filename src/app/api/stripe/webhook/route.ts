import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import {
  TIER_NAMES,
  formatPrice,
  cycleSuffix,
  isTier,
  isCurrency,
  isCycle,
  type TierSlug,
  type Currency,
  type BillingCycle,
} from "@/lib/technical-support";

function normaliseTier(value: unknown): TierSlug | null {
  return isTier(value) ? value : null;
}

function normaliseCurrency(value: unknown): Currency | null {
  return isCurrency(value) ? value : null;
}

function normaliseCycle(value: unknown): BillingCycle {
  return isCycle(value) ? value : "monthly";
}
import { sendWelcomeEmail, sendInternalSignupNotification } from "@/lib/resend";

export const runtime = "nodejs";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(sub);
        break;
      }
      default:
        // Acknowledge but do nothing.
        break;
    }
  } catch (err) {
    console.error(`Error handling ${event.type}:`, err);
    return NextResponse.json({ error: "Handler error." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const rowId = session.metadata?.subscription_row_id;
  if (!rowId) {
    console.warn("checkout.session.completed without subscription_row_id metadata");
    return;
  }

  // Update the Supabase row with the Stripe IDs we now know.
  const { data: row, error: fetchError } = await supabase
    .from("technical_support_subscriptions")
    .select("*")
    .eq("id", rowId)
    .single();

  if (fetchError || !row) {
    console.error("Could not load TS subscription row for session:", session.id, fetchError);
    return;
  }

  // Pull the structured billing address Stripe collected and store it as a
  // formatted multi-line string for the welcome email and the internal record.
  const addr = session.customer_details?.address ?? null;
  const billingAddress = addr
    ? [addr.line1, addr.line2, addr.city, addr.state, addr.postal_code, addr.country]
        .filter((s) => s && s.trim().length > 0)
        .join(", ")
    : null;

  await supabase
    .from("technical_support_subscriptions")
    .update({
      stripe_customer_id:
        typeof session.customer === "string" ? session.customer : null,
      stripe_subscription_id:
        typeof session.subscription === "string" ? session.subscription : null,
      status: "active",
      activated_at: new Date().toISOString(),
      billing_address: billingAddress,
    })
    .eq("id", rowId);

  const tier: ReturnType<typeof normaliseTier> = normaliseTier(row.tier);
  const currency: ReturnType<typeof normaliseCurrency> = normaliseCurrency(row.currency);
  const cycle: BillingCycle = normaliseCycle(row.billing_cycle);
  if (!tier || !currency) return;

  const tierName = TIER_NAMES[tier];
  const priceDisplay = `${formatPrice(tier, currency, cycle)} ${cycleSuffix(cycle)}`;

  // Welcome email to captain and billing contact.
  const recipients = Array.from(
    new Set([row.captain_email, row.billing_email].filter(Boolean))
  );
  for (const to of recipients) {
    try {
      await sendWelcomeEmail({
        to,
        yachtName: row.yacht_name,
        captainName: row.captain_name,
        tierName,
        priceDisplay,
      });
    } catch (err) {
      console.error("Failed to send welcome email to", to, err);
    }
  }

  // Internal notification.
  try {
    await sendInternalSignupNotification({
      yachtName: row.yacht_name,
      captainName: row.captain_name,
      captainEmail: row.captain_email,
      engineerName: row.engineer_name,
      engineerEmail: row.engineer_email,
      tierName,
      priceDisplay,
      billingName: row.billing_name,
    });
  } catch (err) {
    console.error("Failed to send internal notification:", err);
  }
}

async function handleSubscriptionChange(sub: Stripe.Subscription) {
  const periodEnd = (sub as unknown as { current_period_end?: number }).current_period_end;
  const status = sub.status === "active" || sub.status === "trialing"
    ? "active"
    : sub.status === "past_due"
      ? "past_due"
      : "canceled";
  await supabase
    .from("technical_support_subscriptions")
    .update({
      status,
      cancel_at_period_end: sub.cancel_at_period_end,
      current_period_end: periodEnd
        ? new Date(periodEnd * 1000).toISOString()
        : null,
      canceled_at: status === "canceled" ? new Date().toISOString() : null,
    })
    .eq("stripe_subscription_id", sub.id);
}
