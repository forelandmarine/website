import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/server";
import { PageHeader, Card } from "@/components/admin/ui";
import { PlaidConnect } from "@/components/admin/PlaidConnect";
import { plaidEnabled, plaidEnv } from "@/lib/plaid";

export const dynamic = "force-dynamic";

export default async function ConnectBankPage() {
  const profile = await getCurrentProfile();
  if (!profile || !["owner", "bookkeeper"].includes(profile.role)) redirect("/admin");
  if (!plaidEnabled()) redirect("/admin/banking");

  const sandbox = plaidEnv() !== "production";

  return (
    <>
      <PageHeader title="Connect a bank" subtitle="Authorise a read-only feed via Plaid" />
      <div className="p-6 lg:p-8">
        <Card className="max-w-xl p-6">
          <p className="text-sm text-slate-600">
            Click below to open Plaid and choose your bank. You approve a read-only connection at your bank,
            and Plaid returns balances and transactions here. Foreland never sees your bank login.
          </p>
          {sandbox && (
            <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Sandbox mode. Pick any test bank and sign in with <span className="font-medium">user_good</span> /{" "}
              <span className="font-medium">pass_good</span> to try the flow end to end.
            </div>
          )}
          <div className="mt-5">
            <PlaidConnect />
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Consent is read-only. In production, bank consent lasts up to 90 days before a quick reconnect.
          </p>
        </Card>
      </div>
    </>
  );
}
