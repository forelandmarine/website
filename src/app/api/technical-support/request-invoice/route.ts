import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  isTier,
  isCurrency,
  isCycle,
  TIER_NAMES,
  formatPrice,
  cycleSuffix,
} from "@/lib/technical-support";
import {
  sendInvoiceRequestInternalEmail,
  sendInvoiceRequestCustomerEmail,
} from "@/lib/resend";

type RequestInvoiceBody = {
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
  billingAddressLine1: string;
  billingAddressLine2?: string;
  billingCity: string;
  billingPostcode: string;
  billingCountry: string;
  billingVatNumber?: string;

  captainName: string;
  captainEmail: string;
  captainPhone?: string;

  engineerName?: string;
  engineerEmail?: string;
  engineerPhone?: string;

  termsAccepted: boolean;
};

function requiredString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as RequestInvoiceBody | null;

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

  if (body.termsAccepted !== true) {
    return NextResponse.json(
      { error: "You must accept the Terms & Conditions to continue." },
      { status: 400 }
    );
  }

  const requiredFields: Record<string, unknown> = {
    yachtName: body.yachtName,
    billingName: body.billingName,
    billingEmail: body.billingEmail,
    billingAddressLine1: body.billingAddressLine1,
    billingCity: body.billingCity,
    billingPostcode: body.billingPostcode,
    billingCountry: body.billingCountry,
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

  const billingAddress = [
    body.billingAddressLine1.trim(),
    body.billingAddressLine2?.trim() || null,
    body.billingCity.trim(),
    body.billingPostcode.trim(),
    body.billingCountry.trim(),
  ]
    .filter((s): s is string => Boolean(s && s.length > 0))
    .join("\n");

  const nowIso = new Date().toISOString();

  const { data: insertData, error: insertError } = await supabase
    .from("technical_support_subscriptions")
    .insert({
      tier: body.tier,
      currency: body.currency,
      billing_cycle: body.billingCycle,
      payment_method: "invoice",
      status: "invoice_pending",
      yacht_name: body.yachtName.trim(),
      yacht_imo: body.yachtImo?.trim() || null,
      yacht_mmsi: body.yachtMmsi?.trim() || null,
      yacht_length_m: body.yachtLengthM ?? null,
      yacht_flag: body.yachtFlag?.trim() || null,
      yacht_home_port: body.yachtHomePort?.trim() || null,
      billing_name: body.billingName.trim(),
      billing_email: body.billingEmail.trim().toLowerCase(),
      billing_address: billingAddress,
      captain_name: body.captainName.trim(),
      captain_email: body.captainEmail.trim().toLowerCase(),
      captain_phone: body.captainPhone?.trim() || null,
      engineer_name: body.engineerName?.trim() || null,
      engineer_email: body.engineerEmail?.trim().toLowerCase() || null,
      engineer_phone: body.engineerPhone?.trim() || null,
      terms_accepted_at: nowIso,
      invoice_requested_at: nowIso,
    })
    .select("id")
    .single();

  if (insertError || !insertData) {
    console.error("Failed to insert TS invoice-request row:", insertError);
    return NextResponse.json(
      { error: "Could not save your details. Please try again." },
      { status: 500 }
    );
  }

  const subscriptionRowId = insertData.id;
  const tierName = TIER_NAMES[body.tier];
  const priceDisplay = `${formatPrice(body.tier, body.currency, body.billingCycle)} ${cycleSuffix(body.billingCycle)}`;

  try {
    await sendInvoiceRequestInternalEmail({
      yachtName: body.yachtName.trim(),
      yachtImo: body.yachtImo?.trim() || null,
      yachtMmsi: body.yachtMmsi?.trim() || null,
      yachtLengthM: body.yachtLengthM ?? null,
      yachtFlag: body.yachtFlag?.trim() || null,
      yachtHomePort: body.yachtHomePort?.trim() || null,
      tierName,
      priceDisplay,
      billingCycle: body.billingCycle,
      currency: body.currency,
      billingName: body.billingName.trim(),
      billingEmail: body.billingEmail.trim().toLowerCase(),
      billingAddress,
      billingVatNumber: body.billingVatNumber?.trim() || null,
      captainName: body.captainName.trim(),
      captainEmail: body.captainEmail.trim().toLowerCase(),
      captainPhone: body.captainPhone?.trim() || null,
      engineerName: body.engineerName?.trim() || null,
      engineerEmail: body.engineerEmail?.trim().toLowerCase() || null,
      engineerPhone: body.engineerPhone?.trim() || null,
      subscriptionRowId,
    });
  } catch (err) {
    console.error("Failed to send internal invoice-request email:", err);
  }

  const customerRecipients = Array.from(
    new Set([
      body.billingEmail.trim().toLowerCase(),
      body.captainEmail.trim().toLowerCase(),
    ])
  );
  for (const to of customerRecipients) {
    try {
      await sendInvoiceRequestCustomerEmail({
        to,
        yachtName: body.yachtName.trim(),
        contactName: body.captainName.trim().split(" ")[0] || body.captainName.trim(),
        tierName,
        priceDisplay,
      });
    } catch (err) {
      console.error("Failed to send invoice-request confirmation to", to, err);
    }
  }

  return NextResponse.json({ ok: true });
}
