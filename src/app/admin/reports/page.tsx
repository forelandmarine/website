import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, StatCard, money } from "@/components/admin/ui";
import { financialYear, currentFinancialYearEnd, vatQuarter, corporationTax } from "@/lib/admin/accounting";

export const dynamic = "force-dynamic";

async function sumInvoices(period: { from: string; to: string }) {
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("fm_invoices")
    .select("subtotal, vat_total, total")
    .gte("issue_date", period.from)
    .lte("issue_date", period.to)
    .in("status", ["sent", "part_paid", "paid", "overdue"]);
  return (data ?? []).reduce(
    (a, i) => ({ net: a.net + Number(i.subtotal), vat: a.vat + Number(i.vat_total), gross: a.gross + Number(i.total) }),
    { net: 0, vat: 0, gross: 0 },
  );
}

async function sumExpenses(period: { from: string; to: string }) {
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("fm_expenses")
    .select("net, vat, gross")
    .gte("spent_on", period.from)
    .lte("spent_on", period.to);
  return (data ?? []).reduce(
    (a, e) => ({ net: a.net + Number(e.net), vat: a.vat + Number(e.vat), gross: a.gross + Number(e.gross) }),
    { net: 0, vat: 0, gross: 0 },
  );
}

async function sumPayments(period: { from: string; to: string }) {
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("fm_payments")
    .select("amount, paid_at")
    .eq("status", "succeeded")
    .gte("paid_at", period.from)
    .lte("paid_at", `${period.to}T23:59:59`);
  return (data ?? []).reduce((a, p) => a + Number(p.amount), 0);
}

export default async function ReportsPage({ searchParams }: { searchParams: Promise<{ fy?: string; vq?: string }> }) {
  const { fy, vq } = await searchParams;
  const today = new Date();
  const fyEnd = fy ? Number(fy) : currentFinancialYearEnd(today);
  const q = vq ? Number(vq) : 1;

  const year = financialYear(fyEnd);
  const quarter = vatQuarter(fyEnd, q);

  const supabase = await getSupabaseServer();
  const [income, expenses, received, vatSales, vatPurch, { count: tsActive }] = await Promise.all([
    sumInvoices(year),
    sumExpenses(year),
    sumPayments(year),
    sumInvoices(quarter),
    sumExpenses(quarter),
    supabase.from("technical_support_subscriptions").select("*", { count: "exact", head: true }).eq("status", "active"),
  ]);

  const profit = income.net - expenses.net;
  const ct = corporationTax(profit);

  const box1 = vatSales.vat;
  const box4 = vatPurch.vat;
  const box5 = box1 - box4;

  const fyOptions = [fyEnd + 1, fyEnd, fyEnd - 1, fyEnd - 2];

  return (
    <>
      <PageHeader
        title="Accounting & Tax"
        subtitle="Profit & loss, VAT returns and Corporation Tax"
        action={
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Financial year</span>
            <div className="flex gap-1">
              {fyOptions.map((y) => (
                <Link
                  key={y}
                  href={`/admin/reports?fy=${y}&vq=${q}`}
                  className={`rounded-md border px-3 py-1.5 text-sm ${y === fyEnd ? "border-navy bg-navy text-white" : "border-slate-300 hover:bg-slate-50"}`}
                >
                  {y}
                </Link>
              ))}
            </div>
          </div>
        }
      />
      <div className="space-y-8 p-6 lg:p-8">
        {/* P&L */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Profit &amp; loss — {year.label}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Income (invoiced, ex-VAT)" value={money(income.net)} hint={`${money(income.gross)} incl VAT`} />
            <StatCard label="Expenses (ex-VAT)" value={money(expenses.net)} />
            <StatCard label="Net profit" value={money(profit)} />
            <StatCard label="Cash received" value={money(received)} hint="payments in period" />
          </div>
          <Card className="mt-4 p-6">
            <table className="w-full max-w-md text-sm">
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-2 text-slate-600">Turnover (ex-VAT)</td><td className="py-2 text-right">{money(income.net)}</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 text-slate-600">Less allowable expenses</td><td className="py-2 text-right">-{money(expenses.net)}</td></tr>
                <tr className="border-b border-slate-200"><td className="py-2 font-semibold text-slate-800">Profit before tax</td><td className="py-2 text-right font-semibold">{money(profit)}</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 text-slate-600">Corporation Tax ({ct.band})</td><td className="py-2 text-right">-{money(ct.tax)}</td></tr>
                <tr><td className="py-2 font-semibold text-slate-800">Retained profit</td><td className="py-2 text-right font-semibold">{money(profit - ct.tax)}</td></tr>
              </tbody>
            </table>
            <p className="mt-3 text-xs text-slate-400">
              Effective CT rate {(ct.effectiveRate * 100).toFixed(1)}%. Estimate on a 12-month basis with one
              associated company; capital allowances and adjustments not applied.
            </p>
          </Card>
        </section>

        {/* VAT return */}
        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">VAT return — {quarter.label}</h2>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((n) => (
                <Link key={n} href={`/admin/reports?fy=${fyEnd}&vq=${n}`} className={`rounded-md border px-3 py-1.5 text-sm ${n === q ? "border-navy bg-navy text-white" : "border-slate-300 hover:bg-slate-50"}`}>
                  Q{n}
                </Link>
              ))}
            </div>
          </div>
          <Card className="overflow-x-auto p-0">
            <table className="w-full text-sm">
              <tbody>
                <VatRow box="1" label="VAT due on sales and other outputs" value={money(box1)} />
                <VatRow box="2" label="VAT due on acquisitions (NI/EU)" value={money(0)} />
                <VatRow box="3" label="Total VAT due (boxes 1 + 2)" value={money(box1)} bold />
                <VatRow box="4" label="VAT reclaimed on purchases" value={money(box4)} />
                <VatRow box="5" label="Net VAT to pay HMRC (or reclaim)" value={money(box5)} bold />
                <VatRow box="6" label="Total value of sales ex-VAT" value={money(vatSales.net)} />
                <VatRow box="7" label="Total value of purchases ex-VAT" value={money(vatPurch.net)} />
                <VatRow box="8" label="Value of goods supplied (NI/EU)" value={money(0)} />
                <VatRow box="9" label="Value of acquisitions (NI/EU)" value={money(0)} />
              </tbody>
            </table>
          </Card>
          <p className="mt-2 text-xs text-slate-400">
            Figures on an accruals basis from issued invoices and recorded expenses. Confirm your VAT scheme
            (standard vs flat rate) before filing.
          </p>
        </section>

        {/* Exports + recurring */}
        <section className="grid gap-4 sm:grid-cols-3">
          <Card className="p-5">
            <h3 className="mb-2 text-sm font-semibold text-slate-900">Recurring revenue</h3>
            <p className="text-2xl font-semibold text-slate-900">{tsActive ?? 0}</p>
            <p className="text-xs text-slate-400">Active Technical Support subscriptions</p>
          </Card>
          <Card className="p-5">
            <h3 className="mb-2 text-sm font-semibold text-slate-900">Export invoices</h3>
            <a className="text-sm text-navy hover:underline" href={`/api/reports/export?type=invoices&from=${year.from}&to=${year.to}`}>Download CSV ({fyEnd})</a>
          </Card>
          <Card className="p-5">
            <h3 className="mb-2 text-sm font-semibold text-slate-900">Export expenses</h3>
            <a className="text-sm text-navy hover:underline" href={`/api/reports/export?type=expenses&from=${year.from}&to=${year.to}`}>Download CSV ({fyEnd})</a>
          </Card>
        </section>
      </div>
    </>
  );
}

function VatRow({ box, label, value, bold }: { box: string; label: string; value: string; bold?: boolean }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="fm-td w-16 text-slate-400">Box {box}</td>
      <td className={`fm-td ${bold ? "font-semibold text-slate-800" : "text-slate-600"}`}>{label}</td>
      <td className={`fm-td text-right ${bold ? "font-semibold" : ""}`}>{value}</td>
    </tr>
  );
}
