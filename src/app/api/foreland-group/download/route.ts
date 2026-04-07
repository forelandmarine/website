import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

const VALID_DOCS: Record<string, string> = {
  "pitch-deck": "pitch-deck.pdf",
  "seed-deck": "seed-deck.pdf",
  "key-points": "key-points.pdf",
  "investment-proposal": "investment-proposal.pdf",
  "financial-model": "financial-model.xlsx",
  "use-of-proceeds": "use-of-proceeds.xlsx",
  "subscription-agreement": "subscription-agreement.pdf",
};

function verifyToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString();
    const [investorCodeId, expiresStr, hmac] = decoded.split(":");
    const payload = `${investorCodeId}:${expiresStr}`;
    const expected = crypto
      .createHmac("sha256", process.env.HMAC_SECRET!)
      .update(payload)
      .digest("hex");

    if (hmac !== expected) return null;
    if (Date.now() > Number(expiresStr)) return null;
    return investorCodeId;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const doc = searchParams.get("doc");
  const token = searchParams.get("token");

  if (!doc || !VALID_DOCS[doc]) {
    return NextResponse.json({ error: "Invalid document." }, { status: 400 });
  }

  if (!token) {
    return NextResponse.json({ error: "Missing token." }, { status: 401 });
  }

  const investorCodeId = verifyToken(token);
  if (!investorCodeId) {
    return NextResponse.json({ error: "Invalid or expired session. Please re-enter your code." }, { status: 401 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  await supabase.from("access_logs").insert({
    investor_code_id: investorCodeId,
    action: "document_downloaded",
    document_name: doc,
    ip,
    user_agent: req.headers.get("user-agent") || null,
  });

  const { data: signedUrl } = await supabase.storage
    .from("foreland-group-docs")
    .createSignedUrl(VALID_DOCS[doc], 60);

  if (!signedUrl?.signedUrl) {
    return NextResponse.json({ error: "Document not available." }, { status: 404 });
  }

  return NextResponse.redirect(signedUrl.signedUrl);
}
