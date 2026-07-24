import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/server";
import { PageHeader, Card } from "@/components/admin/ui";
import { PendingButton } from "@/components/admin/PendingButton";
import { gcEnabled, listInstitutions, type Institution } from "@/lib/gocardless";
import { startConnect } from "../actions";

export const dynamic = "force-dynamic";

export default async function ConnectBankPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const profile = await getCurrentProfile();
  if (!profile || !["owner", "bookkeeper"].includes(profile.role)) redirect("/admin");
  if (!gcEnabled()) redirect("/admin/banking");

  let institutions: Institution[] = [];
  let loadError = false;
  try {
    institutions = await listInstitutions("gb");
    institutions.sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    loadError = true;
  }

  return (
    <>
      <PageHeader title="Connect a bank" subtitle="Choose your bank to authorise a read-only feed" />
      <div className="p-6 lg:p-8">
        {error && (
          <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-2.5 text-sm text-red-700">
            {error === "api" ? "Could not reach GoCardless. Check the API keys and try again." : "Please choose a bank."}
          </div>
        )}
        {loadError ? (
          <Card className="max-w-xl p-6">
            <p className="text-sm text-slate-600">
              Could not load the bank list. Check that GC_SECRET_ID and GC_SECRET_KEY are set correctly.
            </p>
          </Card>
        ) : (
          <Card className="p-2">
            <div className="max-h-[70vh] divide-y divide-slate-100 overflow-y-auto">
              {institutions.map((inst) => (
                <form key={inst.id} action={startConnect} className="flex items-center justify-between px-3 py-2.5">
                  <input type="hidden" name="institution_id" value={inst.id} />
                  <input type="hidden" name="institution_name" value={inst.name} />
                  <span className="text-sm text-slate-700">{inst.name}</span>
                  <PendingButton variant="outline" pendingLabel="Redirecting…" className="!px-3 !py-1.5 text-xs">
                    Connect
                  </PendingButton>
                </form>
              ))}
            </div>
          </Card>
        )}
        <p className="mt-4 text-xs text-slate-400">
          You will be sent to your bank to approve a read-only connection. Consent lasts 90 days, after which
          you reconnect here. Foreland never sees your bank login.
        </p>
      </div>
    </>
  );
}
