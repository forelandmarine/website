import { NextRequest, NextResponse } from "next/server";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { plaidEnabled, exchangePublicToken, getAccounts, getInstitutionName } from "@/lib/plaid";
import { syncConnection } from "@/app/admin/banking/sync";

// Exchanges a Plaid public_token (from Link) for an access_token, stores the
// connection + accounts, and runs an initial transaction sync.
export async function POST(req: NextRequest) {
  const profile = await getCurrentProfile();
  if (!profile || !["owner", "bookkeeper"].includes(profile.role)) {
    return NextResponse.json({ error: "Not authorised." }, { status: 403 });
  }
  if (!plaidEnabled()) {
    return NextResponse.json({ error: "Plaid is not configured." }, { status: 400 });
  }

  const body = (await req.json().catch(() => null)) as { public_token?: string } | null;
  if (!body?.public_token) {
    return NextResponse.json({ error: "Missing public_token." }, { status: 400 });
  }

  const supabase = await getSupabaseServer();
  try {
    const { accessToken, itemId } = await exchangePublicToken(body.public_token);
    const { accounts, institutionId } = await getAccounts(accessToken);
    const institutionName = institutionId ? await getInstitutionName(institutionId) : null;

    const { data: conn } = await supabase
      .from("fm_bank_connections")
      .insert({
        provider: "plaid",
        plaid_item_id: itemId,
        access_token: accessToken,
        institution_id: institutionId ?? null,
        institution_name: institutionName,
        status: "linked",
        linked_at: new Date().toISOString(),
        created_by: profile.id,
      })
      .select("id")
      .single();
    if (!conn) throw new Error("Could not store connection.");

    for (const a of accounts) {
      await supabase.from("fm_bank_accounts").upsert(
        {
          connection_id: conn.id,
          external_account_id: a.account_id,
          name: [institutionName, a.name].filter(Boolean).join(" · ") || a.name,
          currency: a.balances.iso_currency_code || "GBP",
          balance: a.balances.current,
          balance_at: new Date().toISOString(),
        },
        { onConflict: "external_account_id", ignoreDuplicates: false },
      );
    }

    // Initial transaction pull so data shows immediately.
    await syncConnection(conn.id).catch((e) => console.error("Initial sync failed:", e));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Plaid exchange error:", err);
    return NextResponse.json({ error: "Could not connect the account." }, { status: 500 });
  }
}
