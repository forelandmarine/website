import { notFound, redirect } from "next/navigation";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, EmptyState, money, fmtDate } from "@/components/admin/ui";
import { PendingButton } from "@/components/admin/PendingButton";
import { syncAccount, matchInvoice, expenseFromTxn, dismissTxn, unreconcileTxn } from "../actions";

export const dynamic = "force-dynamic";

const CATEGORIES = ["Travel", "Accommodation", "Subsistence", "Subcontractors", "Software", "Office", "Professional fees", "Insurance", "Marketing", "Equipment", "Bank charges", "Other"];

export default async function BankAccountPage({ params }: { params: Promise<{ accountId: string }> }) {
  const { accountId } = await params;
  const profile = await getCurrentProfile();
  if (!profile || !["owner", "bookkeeper"].includes(profile.role)) redirect("/admin");

  const supabase = await getSupabaseServer();
  const { data: account } = await supabase.from("fm_bank_accounts").select("*").eq("id", accountId).single();
  if (!account) notFound();

  const [{ data: txns }, { data: openInvoices }] = await Promise.all([
    supabase.from("fm_bank_transactions").select("*").eq("account_id", accountId).order("booking_date", { ascending: false }).limit(300),
    supabase.from("fm_invoices").select("id, number, total, amount_paid, currency, fm_clients(name)").in("status", ["sent", "part_paid", "overdue"]).order("issue_date", { ascending: false }),
  ]);

  const invoiceOptions = (openInvoices ?? []).map((i) => {
    const client = Array.isArray(i.fm_clients) ? i.fm_clients[0] : i.fm_clients;
    const bal = Number(i.total) - Number(i.amount_paid);
    return { id: i.id, label: `${i.number} — ${client?.name || "—"} (${money(bal, i.currency)})` };
  });

  const unreconciled = (txns ?? []).filter((t) => !t.reconciled);
  const reconciled = (txns ?? []).filter((t) => t.reconciled);

  return (
    <>
      <PageHeader
        title={account.name || "Account"}
        subtitle={account.iban || undefined}
        action={
          <form action={syncAccount.bind(null, accountId)}>
            <PendingButton pendingLabel="Syncing…">Sync now</PendingButton>
          </form>
        }
      />
      <div className="space-y-8 p-6 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-5"><p className="text-xs uppercase tracking-wide text-slate-400">Balance</p><p className="mt-1 text-2xl font-semibold text-slate-900">{account.balance != null ? money(account.balance, account.currency) : "—"}</p></Card>
          <Card className="p-5"><p className="text-xs uppercase tracking-wide text-slate-400">To reconcile</p><p className="mt-1 text-2xl font-semibold text-slate-900">{unreconciled.length}</p></Card>
          <Card className="p-5"><p className="text-xs uppercase tracking-wide text-slate-400">Last synced</p><p className="mt-1 text-sm text-slate-700">{account.last_synced_at ? fmtDate(account.last_synced_at) : "never"}</p></Card>
        </div>

        {/* To reconcile */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">To reconcile</h2>
          {unreconciled.length > 0 ? (
            <div className="space-y-3">
              {unreconciled.map((t) => {
                const isIn = Number(t.amount) >= 0;
                return (
                  <Card key={t.id} className="p-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800">{t.counterparty || t.description || "Transaction"}</p>
                        <p className="text-xs text-slate-400">{fmtDate(t.booking_date)}{t.description && t.counterparty ? ` · ${t.description}` : ""}</p>
                      </div>
                      <div className={`text-right text-sm font-semibold ${isIn ? "text-emerald-600" : "text-slate-800"}`}>
                        {isIn ? "+" : ""}{money(t.amount, t.currency)}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-end gap-2 border-t border-slate-100 pt-3">
                      {isIn ? (
                        <form action={matchInvoice} className="flex flex-wrap items-end gap-2">
                          <input type="hidden" name="txn_id" value={t.id} />
                          <label className="block">
                            <span className="fm-label">Apply to invoice</span>
                            <select name="invoice_id" required className="fm-fld !py-1.5 text-sm" defaultValue="">
                              <option value="" disabled>Select invoice…</option>
                              {invoiceOptions.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                            </select>
                          </label>
                          <PendingButton className="!px-3 !py-1.5 text-xs">Record payment</PendingButton>
                        </form>
                      ) : (
                        <form action={expenseFromTxn} className="flex flex-wrap items-end gap-2">
                          <input type="hidden" name="txn_id" value={t.id} />
                          <label className="block">
                            <span className="fm-label">Category</span>
                            <select name="category" className="fm-fld !py-1.5 text-sm" defaultValue="Other">
                              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </label>
                          <PendingButton className="!px-3 !py-1.5 text-xs">Create expense</PendingButton>
                        </form>
                      )}
                      <form action={dismissTxn}>
                        <input type="hidden" name="txn_id" value={t.id} />
                        <PendingButton variant="outline" className="!px-3 !py-1.5 text-xs">Dismiss</PendingButton>
                      </form>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <EmptyState title="Nothing to reconcile" hint="Sync to pull the latest transactions." />
          )}
        </section>

        {/* Reconciled */}
        {reconciled.length > 0 && (
          <section>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Reconciled</h2>
            <Card className="overflow-x-auto p-0">
              <table className="w-full">
                <tbody>
                  {reconciled.map((t) => (
                    <tr key={t.id} className="border-b border-slate-100 last:border-0">
                      <td className="fm-td text-slate-500">{fmtDate(t.booking_date)}</td>
                      <td className="fm-td">{t.counterparty || t.description || "—"}</td>
                      <td className="fm-td">
                        {t.matched_invoice_id ? <Badge tone="green">invoice</Badge> : t.matched_expense_id ? <Badge tone="navy">expense</Badge> : <Badge tone="slate">dismissed</Badge>}
                      </td>
                      <td className={`fm-td text-right ${Number(t.amount) >= 0 ? "text-emerald-600" : "text-slate-700"}`}>{money(t.amount, t.currency)}</td>
                      <td className="fm-td text-right">
                        <form action={unreconcileTxn}>
                          <input type="hidden" name="txn_id" value={t.id} />
                          <button className="text-xs text-slate-400 hover:text-slate-700">undo</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>
        )}
      </div>
    </>
  );
}
