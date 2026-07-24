import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, EmptyState, LinkButton, fmtDate, titleCase } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const supabase = await getSupabaseServer();
  const { data: clients } = await supabase
    .from("fm_clients")
    .select("id, name, type, company, email, created_at, fm_vessels(count)")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageHeader
        title="Clients"
        subtitle="Owners, captains and management companies"
        action={<LinkButton href="/admin/clients/new">New client</LinkButton>}
      />
      <div className="p-6 lg:p-8">
        {clients && clients.length > 0 ? (
          <Card className="overflow-x-auto p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="fm-th">Name</th>
                  <th className="fm-th">Type</th>
                  <th className="fm-th">Company</th>
                  <th className="fm-th">Vessels</th>
                  <th className="fm-th">Added</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => {
                  const vessels = Array.isArray(c.fm_vessels) ? (c.fm_vessels[0]?.count ?? 0) : 0;
                  return (
                    <tr key={c.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="fm-td">
                        <Link href={`/admin/clients/${c.id}`} className="font-medium text-navy hover:underline">
                          {c.name}
                        </Link>
                        {c.email && <div className="text-xs text-slate-400">{c.email}</div>}
                      </td>
                      <td className="fm-td"><Badge tone="slate">{titleCase(c.type)}</Badge></td>
                      <td className="fm-td">{c.company || "—"}</td>
                      <td className="fm-td">{vessels}</td>
                      <td className="fm-td text-slate-500">{fmtDate(c.created_at)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        ) : (
          <EmptyState title="No clients yet" hint="Add a client, or convert an enquiry into one." />
        )}
      </div>
    </>
  );
}
