import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, StatCard, Badge, money, fmtDate } from "@/components/admin/ui";
import { Field, SelectField, FormGrid } from "@/components/admin/form";
import { PendingButton } from "@/components/admin/PendingButton";
import { addExpense, deleteExpense } from "./actions";

export const dynamic = "force-dynamic";

const CATEGORIES = [
  "Travel", "Accommodation", "Subsistence", "Subcontractors", "Software", "Office",
  "Professional fees", "Insurance", "Marketing", "Equipment", "Bank charges", "Other",
];
const CURRENCIES = [{ value: "gbp", label: "GBP" }, { value: "eur", label: "EUR" }, { value: "usd", label: "USD" }];
const STATUSES = [{ value: "paid", label: "Paid" }, { value: "unpaid", label: "Unpaid" }];

function currentTaxYearStart(): string {
  const now = new Date();
  const y = now.getMonth() + 1 >= 4 ? now.getFullYear() : now.getFullYear() - 1;
  return `${y}-04-06`;
}

export default async function ExpensesPage() {
  const supabase = await getSupabaseServer();
  const { data: expenses } = await supabase
    .from("fm_expenses")
    .select("*")
    .order("spent_on", { ascending: false })
    .limit(300);

  const yearStart = currentTaxYearStart();
  const ytd = (expenses ?? []).filter((e) => e.spent_on >= yearStart);
  const ytdNet = ytd.reduce((s, e) => s + Number(e.net), 0);
  const ytdVat = ytd.reduce((s, e) => s + Number(e.vat), 0);

  return (
    <>
      <PageHeader title="Expenses" subtitle="Costs and reclaimable VAT" />
      <div className="p-6 lg:p-8">
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <StatCard label="Net (this tax year)" value={money(ytdNet)} />
          <StatCard label="VAT (this tax year)" value={money(ytdVat)} />
          <StatCard label="Entries" value={String(expenses?.length ?? 0)} />
        </div>

        <Card className="mb-6 p-5">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Add expense</h3>
          <form action={addExpense} className="space-y-3">
            <FormGrid cols={3}>
              <Field label="Supplier" name="supplier" />
              <SelectField label="Category" name="category" options={CATEGORIES.map((c) => ({ value: c, label: c }))} defaultValue="Travel" />
              <Field label="Date" name="spent_on" type="date" />
              <Field label="Net" name="net" type="number" step="0.01" required />
              <Field label="VAT" name="vat" type="number" step="0.01" />
              <SelectField label="Currency" name="currency" options={CURRENCIES} defaultValue="gbp" />
              <Field label="Description" name="description" className="sm:col-span-2" />
              <SelectField label="Status" name="status" options={STATUSES} defaultValue="paid" />
            </FormGrid>
            <PendingButton>Add expense</PendingButton>
          </form>
        </Card>

        {expenses && expenses.length > 0 && (
          <Card className="overflow-x-auto p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="fm-th">Date</th>
                  <th className="fm-th">Supplier</th>
                  <th className="fm-th">Category</th>
                  <th className="fm-th">Status</th>
                  <th className="fm-th text-right">Net</th>
                  <th className="fm-th text-right">VAT</th>
                  <th className="fm-th text-right">Gross</th>
                  <th className="fm-th"></th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e) => (
                  <tr key={e.id} className="border-b border-slate-100 last:border-0">
                    <td className="fm-td text-slate-500">{fmtDate(e.spent_on)}</td>
                    <td className="fm-td">{e.supplier || "—"}<div className="text-xs text-slate-400">{e.description || ""}</div></td>
                    <td className="fm-td">{e.category || "—"}</td>
                    <td className="fm-td"><Badge>{e.status}</Badge></td>
                    <td className="fm-td text-right">{money(e.net, e.currency)}</td>
                    <td className="fm-td text-right">{money(e.vat, e.currency)}</td>
                    <td className="fm-td text-right">{money(e.gross, e.currency)}</td>
                    <td className="fm-td text-right">
                      <form action={deleteExpense}>
                        <input type="hidden" name="id" value={e.id} />
                        <button className="text-slate-300 hover:text-red-600" aria-label="Delete">✕</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </>
  );
}
