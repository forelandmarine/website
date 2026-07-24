import { redirect } from "next/navigation";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card } from "@/components/admin/ui";
import { PendingButton } from "@/components/admin/PendingButton";
import { importStatement } from "../actions";

export const dynamic = "force-dynamic";

const ERRORS: Record<string, string> = {
  nofile: "Please choose a file to upload.",
  toobig: "That file is too large (max 5 MB).",
  parse: "Could not read that file. Export a CSV or OFX statement and try again.",
  empty: "No transactions were found in that file.",
};

export default async function ImportPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const profile = await getCurrentProfile();
  if (!profile || !["owner", "bookkeeper"].includes(profile.role)) redirect("/admin");

  const supabase = await getSupabaseServer();
  const { data: manualAccounts } = await supabase
    .from("fm_bank_accounts")
    .select("id, name, fm_bank_connections!inner(provider)")
    .eq("fm_bank_connections.provider", "manual");

  return (
    <>
      <PageHeader title="Import a statement" subtitle="Upload a CSV or OFX file from your bank" />
      <div className="p-6 lg:p-8">
        <Card className="max-w-xl p-6">
          {error && <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-2.5 text-sm text-red-700">{ERRORS[error] || "Something went wrong."}</div>}
          <form action={importStatement} className="space-y-4">
            <label className="block">
              <span className="fm-label">Statement file (.csv or .ofx)</span>
              <input type="file" name="file" accept=".csv,.ofx,.qfx,text/csv" required className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-navy-700" />
            </label>

            <label className="block">
              <span className="fm-label">Import into</span>
              <select name="account_id" className="fm-fld" defaultValue="">
                <option value="">New account</option>
                {(manualAccounts ?? []).map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="fm-label">New account name</span>
                <input name="account_name" className="fm-fld" placeholder="e.g. Starling current" />
              </label>
              <label className="block">
                <span className="fm-label">Currency</span>
                <select name="currency" className="fm-fld" defaultValue="GBP">
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </label>
            </div>

            <PendingButton pendingLabel="Importing…">Import transactions</PendingButton>
          </form>
          <p className="mt-4 text-xs text-slate-400">
            Most banks offer a CSV or OFX export in online banking. Re-importing an overlapping period is safe:
            duplicate transactions are skipped. OFX dedupes exactly; CSV dedupes on date, amount and description.
          </p>
        </Card>
      </div>
    </>
  );
}
