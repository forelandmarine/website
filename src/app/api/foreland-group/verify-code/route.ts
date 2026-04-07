import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

const attempts = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  entry.count++;
  return entry.count <= 5;
}

function createToken(investorCodeId: string): string {
  const expires = Date.now() + 2 * 60 * 60 * 1000;
  const payload = `${investorCodeId}:${expires}`;
  const hmac = crypto
    .createHmac("sha256", process.env.HMAC_SECRET!)
    .update(payload)
    .digest("hex");
  return Buffer.from(`${payload}:${hmac}`).toString("base64url");
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again shortly." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const code = body?.code?.toUpperCase()?.trim();

  if (!code || code.length !== 4) {
    return NextResponse.json({ error: "Invalid code format." }, { status: 400 });
  }

  const { data: investor } = await supabase
    .from("investor_codes")
    .select("id, investor_name")
    .eq("code", code)
    .eq("is_active", true)
    .single();

  if (!investor) {
    return NextResponse.json({ error: "Invalid access code." }, { status: 401 });
  }

  await supabase.from("access_logs").insert({
    investor_code_id: investor.id,
    action: "code_verified",
    ip,
    user_agent: req.headers.get("user-agent") || null,
  });

  const token = createToken(investor.id);

  return NextResponse.json({ token, investor_name: investor.investor_name });
}
