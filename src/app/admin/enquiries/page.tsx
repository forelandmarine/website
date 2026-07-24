import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, EmptyState, fmtDate, titleCase } from "@/components/admin/ui";
import { PendingButton } from "@/components/admin/PendingButton";
import { setEnquiryStatus, convertEnquiryToClient } from "./actions";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "contacted", "quoting", "won", "lost", "archived"];

export default async function EnquiriesPage() {
  const supabase = await getSupabaseServer();
  const { data: enquiries } = await supabase
    .from("fm_enquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <>
      <PageHeader title="Enquiries" subtitle="Website contact and quote requests" />
      <div className="p-6 lg:p-8">
        {enquiries && enquiries.length > 0 ? (
          <div className="space-y-4">
            {enquiries.map((e) => (
              <Card key={e.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-slate-900">{e.name || "—"}</h3>
                      <Badge>{e.status}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {e.email}
                      {e.phone ? ` · ${e.phone}` : ""}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {titleCase(e.service) !== "—" ? `${titleCase(e.service)} · ` : ""}
                      {e.vessel_name ? `${e.vessel_name} · ` : ""}
                      {e.source} · {fmtDate(e.created_at)}
                    </p>
                    {e.message && <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{e.message}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <form action={setEnquiryStatus} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={e.id} />
                      <select
                        name="status"
                        defaultValue={e.status}
                        className="fm-fld !w-auto !py-1.5 text-xs"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <PendingButton variant="outline" className="!px-3 !py-1.5 text-xs">
                        Update
                      </PendingButton>
                    </form>
                    {!e.client_id && (
                      <form action={convertEnquiryToClient}>
                        <input type="hidden" name="id" value={e.id} />
                        <PendingButton className="!px-3 !py-1.5 text-xs">Convert to client</PendingButton>
                      </form>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No enquiries yet"
            hint="Submissions from the website contact form appear here."
          />
        )}
      </div>
    </>
  );
}
