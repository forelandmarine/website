import { NextRequest, NextResponse } from "next/server";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { getRequisition, getAccountMeta, getBalance } from "@/lib/gocardless";

// GoCardless redirects here after the user consents at their bank, with
// ?ref=<our connection id>. We fetch the linked accounts and store them.
export async function GET(req: NextRequest) {
  const profile = await getCurrentProfile();
  if (!profile) return NextResponse.redirect(new URL("/login", req.url));

  const ref = req.nextUrl.searchParams.get("ref");
  const errored = req.nextUrl.searchParams.get("error");
  if (!ref) return NextResponse.redirect(new URL("/admin/banking?error=noref", req.url));

  const supabase = await getSupabaseServer();
  const { data: conn } = await supabase.from("fm_bank_connections").select("*").eq("id", ref).single();
  if (!conn) return NextResponse.redirect(new URL("/admin/banking?error=noconn", req.url));

  if (errored) {
    await supabase.from("fm_bank_connections").update({ status: "error" }).eq("id", conn.id);
    return NextResponse.redirect(new URL("/admin/banking?error=denied", req.url));
  }

  try {
    const requisition = await getRequisition(conn.requisition_id as string);
    for (const gcAccountId of requisition.accounts ?? []) {
      const meta = await getAccountMeta(gcAccountId).catch(() => null);
      const bal = await getBalance(gcAccountId).catch(() => null);
      await supabase.from("fm_bank_accounts").upsert(
        {
          connection_id: conn.id,
          gc_account_id: gcAccountId,
          iban: meta?.iban ?? null,
          owner_name: meta?.owner_name ?? null,
          currency: meta?.currency || bal?.currency || "GBP",
          name: conn.institution_name || meta?.institution_id || "Account",
          balance: bal?.amount ?? null,
          balance_at: bal ? new Date().toISOString() : null,
        },
        { onConflict: "gc_account_id", ignoreDuplicates: false },
      );
    }
    const expires = new Date();
    expires.setDate(expires.getDate() + 90);
    await supabase
      .from("fm_bank_connections")
      .update({ status: "linked", linked_at: new Date().toISOString(), expires_at: expires.toISOString() })
      .eq("id", conn.id);
  } catch (err) {
    console.error("Bank callback failed:", err);
    await supabase.from("fm_bank_connections").update({ status: "error" }).eq("id", conn.id);
    return NextResponse.redirect(new URL("/admin/banking?error=sync", req.url));
  }

  return NextResponse.redirect(new URL("/admin/banking?connected=1", req.url));
}
