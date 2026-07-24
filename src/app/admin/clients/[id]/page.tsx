import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, LinkButton, money, fmtDate, titleCase } from "@/components/admin/ui";
import { Field, TextArea, SelectField, FormGrid } from "@/components/admin/form";
import { PendingButton } from "@/components/admin/PendingButton";
import { addVessel, deleteVessel } from "../actions";

export const dynamic = "force-dynamic";

const VESSEL_TYPES = [
  { value: "sail", label: "Sailing yacht" },
  { value: "motor", label: "Motor yacht" },
  { value: "explorer", label: "Explorer" },
  { value: "other", label: "Other" },
];

export default async function ClientDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServer();

  const { data: client } = await supabase.from("fm_clients").select("*").eq("id", id).single();
  if (!client) notFound();

  const [{ data: vessels }, { data: quotes }, { data: jobs }, { data: invoices }] = await Promise.all([
    supabase.from("fm_vessels").select("*").eq("client_id", id).order("created_at"),
    supabase.from("fm_quotes").select("id, number, title, status, total, currency, created_at").eq("client_id", id).order("created_at", { ascending: false }),
    supabase.from("fm_jobs").select("id, number, title, status, created_at").eq("client_id", id).order("created_at", { ascending: false }),
    supabase.from("fm_invoices").select("id, number, status, total, amount_paid, currency, issue_date").eq("client_id", id).order("issue_date", { ascending: false }),
  ]);

  return (
    <>
      <PageHeader
        title={client.name}
        subtitle={`${titleCase(client.type)}${client.company ? ` · ${client.company}` : ""}`}
        action={
          <div className="flex gap-2">
            <LinkButton href={`/admin/quotes/new?client=${id}`} variant="outline">New proposal</LinkButton>
            <LinkButton href={`/admin/clients/${id}/edit`} variant="outline">Edit</LinkButton>
          </div>
        }
      />
      <div className="space-y-6 p-6 lg:p-8">
        {/* Contact */}
        <Card className="p-5">
          <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div><dt className="text-xs uppercase tracking-wide text-slate-400">Email</dt><dd className="mt-0.5 text-slate-700">{client.email || "—"}</dd></div>
            <div><dt className="text-xs uppercase tracking-wide text-slate-400">Phone</dt><dd className="mt-0.5 text-slate-700">{client.phone || "—"}</dd></div>
            <div><dt className="text-xs uppercase tracking-wide text-slate-400">Country</dt><dd className="mt-0.5 text-slate-700">{client.country || "—"}</dd></div>
            <div><dt className="text-xs uppercase tracking-wide text-slate-400">Added</dt><dd className="mt-0.5 text-slate-700">{fmtDate(client.created_at)}</dd></div>
          </dl>
          {client.notes && <p className="mt-4 whitespace-pre-wrap border-t border-slate-100 pt-4 text-sm text-slate-600">{client.notes}</p>}
        </Card>

        {/* Vessels */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Vessels</h2>
          <div className="space-y-3">
            {vessels && vessels.length > 0 ? (
              vessels.map((v) => (
                <Card key={v.id} className="flex flex-wrap items-start justify-between gap-4 p-5">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-slate-900">{v.name}</h3>
                      <Badge tone="slate">{titleCase(v.type)}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {[v.builder, v.year_built, v.length_m ? `${v.length_m} m` : null, v.gross_tonnage ? `${v.gross_tonnage} GT` : null, v.flag, v.home_port]
                        .filter(Boolean)
                        .join(" · ") || "No details"}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {[v.imo ? `IMO ${v.imo}` : null, v.mmsi ? `MMSI ${v.mmsi}` : null].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <form action={deleteVessel}>
                    <input type="hidden" name="id" value={v.id} />
                    <input type="hidden" name="client_id" value={id} />
                    <PendingButton variant="danger" pendingLabel="Removing…" className="!px-3 !py-1.5 text-xs">
                      Remove
                    </PendingButton>
                  </form>
                </Card>
              ))
            ) : (
              <p className="text-sm text-slate-500">No vessels recorded.</p>
            )}
          </div>

          <details className="mt-3">
            <summary className="cursor-pointer text-sm font-medium text-navy">+ Add a vessel</summary>
            <Card className="mt-3 p-5">
              <form action={addVessel} className="space-y-4">
                <input type="hidden" name="client_id" value={id} />
                <FormGrid cols={3}>
                  <Field label="Name" name="name" required />
                  <SelectField label="Type" name="type" options={VESSEL_TYPES} defaultValue="sail" />
                  <Field label="Builder" name="builder" />
                  <Field label="Year built" name="year_built" type="number" />
                  <Field label="Length (m)" name="length_m" type="number" step="0.01" />
                  <Field label="Gross tonnage" name="gross_tonnage" type="number" step="0.01" />
                  <Field label="Flag" name="flag" />
                  <Field label="Home port" name="home_port" />
                  <Field label="IMO" name="imo" />
                  <Field label="MMSI" name="mmsi" />
                </FormGrid>
                <TextArea label="Notes" name="notes" rows={2} />
                <PendingButton>Add vessel</PendingButton>
              </form>
            </Card>
          </details>
        </section>

        {/* Proposals + Engagements + Invoices */}
        <div className="grid gap-6 lg:grid-cols-3">
          <RelatedList
            title="Proposals"
            items={(quotes ?? []).map((q) => ({
              href: `/admin/quotes/${q.id}`,
              primary: q.number,
              secondary: q.title || titleCase(q.status),
              amount: money(q.total, q.currency),
              status: q.status,
            }))}
            emptyHint="No proposals yet."
            newHref={`/admin/quotes/new?client=${id}`}
          />
          <RelatedList
            title="Engagements"
            items={(jobs ?? []).map((j) => ({
              href: `/admin/jobs/${j.id}`,
              primary: j.number,
              secondary: j.title || titleCase(j.status),
              status: j.status,
            }))}
            emptyHint="No engagements yet."
            newHref={`/admin/jobs/new?client=${id}`}
          />
          <RelatedList
            title="Invoices"
            items={(invoices ?? []).map((i) => ({
              href: `/admin/invoices/${i.id}`,
              primary: i.number,
              secondary: fmtDate(i.issue_date),
              amount: money(i.total, i.currency),
              status: i.status,
            }))}
            emptyHint="No invoices yet."
            newHref={`/admin/invoices/new?client=${id}`}
          />
        </div>
      </div>
    </>
  );
}

function RelatedList({
  title,
  items,
  emptyHint,
  newHref,
}: {
  title: string;
  items: { href: string; primary: string; secondary: string; amount?: string; status?: string }[];
  emptyHint: string;
  newHref: string;
}) {
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <Link href={newHref} className="text-xs text-navy hover:underline">+ New</Link>
      </div>
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.href}>
              <Link href={it.href} className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-slate-50">
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-navy">{it.primary}</span>
                  <span className="block truncate text-xs text-slate-400">{it.secondary}</span>
                </span>
                <span className="ml-2 text-right">
                  {it.amount && <span className="block text-sm text-slate-700">{it.amount}</span>}
                  {it.status && <Badge>{it.status}</Badge>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-400">{emptyHint}</p>
      )}
    </Card>
  );
}
