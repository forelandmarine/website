import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/lib/supabase/server";
import { plaidEnabled, createLinkToken } from "@/lib/plaid";

// Returns a short-lived Plaid Link token for the signed-in finance user.
export async function POST() {
  const profile = await getCurrentProfile();
  if (!profile || !["owner", "bookkeeper"].includes(profile.role)) {
    return NextResponse.json({ error: "Not authorised." }, { status: 403 });
  }
  if (!plaidEnabled()) {
    return NextResponse.json({ error: "Plaid is not configured." }, { status: 400 });
  }
  try {
    const linkToken = await createLinkToken(profile.id);
    return NextResponse.json({ link_token: linkToken });
  } catch (err) {
    console.error("Plaid link-token error:", err);
    return NextResponse.json({ error: "Could not start Plaid." }, { status: 500 });
  }
}
