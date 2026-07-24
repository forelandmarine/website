import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, StatCard, Badge, EmptyState, LinkButton, money, fmtDate, fmtDateTime } from "@/components/admin/ui";
import { PendingButton } from "@/components/admin/PendingButton";
import { plaidEnabled } from "@/lib/plaid";
import { syncAccount } from "./actions";

export const dynamic = "force-dynamic";

export default async function BankingPage({ searchParams }: { searchParams: Promise<{ connected?: string; error?: string }> }) {
  const { connected, error } = await searchParams;
  const profile = await getCurrentProfile();
  if (!profile || !["owner", "bookkeeper"].includes(profile.role)) redirect("/admin");

  if (!plaidEnabled()) {
    return (
      <>
        <PageHeader title="Banking" subtitle="Open Banking via Plaid" />
        <div className="p-6 lg:p-8">
          <Card className="max-w-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-900">Connect your bank</h2>
            <p className="mt-2 text-sm text-slate-600">Bank feeds use Plaid. To switch it on:</p>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-slate-600">
              <li>Create an account at <span className="font-medium">dashboard.plaid.com</span>.</li>
              <li>Copy your <span className="font-medium">client_id</span> and a <span className="font-medium">Sandbox secret</span> (Team Settings → Keys).</li>
              <li>Add <code className="rounded bg-slate-100 px-1">PLAID_CLIENT_ID</code>, <code className="rounded bg-slate-100 px-1">PLAID_SECRET</code> and <code className="rounded bg-slate-100 px-1">PLAID_ENV=sandbox</code> to the site environment.</li>
              <li>Reload this page and connect your bank (sandbox login: user_good / pass_good).</li>
            </ol>
          </Card>
        </div>
      </>
    );
  }

  const supabase = await getSupabaseServer();
  const { data: accounts } = await supabase
    .from("fm_bank_accounts")
    .select("*, fm_bank_connections(institution_name, status, expires_at)")
    .order("created_at");

  // Unreconciled counts per account.
  const counts = new Map<string, number>();
  if (accounts?.length) {
    const { data: unrec } = await supabase.from("fm_bank_transactions").select("account_id").eq("reconciled", false);
    (unrec ?? []).forEach((t) => counts.set(t.account_id, (counts.get(t.account_id) ?? 0) + 1));
  }

  const totalBalance = (accounts ?? []).reduce((s, a) => s + (Number(a.balance) || 0), 0);
  const totalUnrec = Array.from(counts.values()).reduce((s, n) => s + n, 0);

  return (
    <>
      <PageHeader
        title="Banking"
        subtitle="Balances and reconciliation"
        action={<LinkButton href="/admin/banking/connect">Connect a bank</LinkButton>}
      />
      <div className="p-6 lg:p-8">
        {connected && (
          <div className="mb-4 rounded-md border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">
            Bank connected. Sync an account to pull in transactions.
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-2.5 text-sm text-red-700">
            {error === "denied" ? "The bank connection was cancelled." : "Something went wrong finishing the connection. Try again."}
          </div>
        )}

        {accounts && accounts.length > 0 ? (
          <>
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <StatCard label="Total balance" value={money(totalBalance)} />
              <StatCard label="Accounts" value={String(accounts.length)} />
              <StatCard label="To reconcile" value={String(totalUnrec)} />
            </div>
            <div className="space-y-3">
              {accounts.map((a) => {
                const conn = Array.isArray(a.fm_bank_connections) ? a.fm_bank_connections[0] : a.fm_bank_connections;
                const unrec = counts.get(a.id) ?? 0;
                return (
                  <Card key={a.id} className="flex flex-wrap items-center justify-between gap-4 p-5">
                    <div>
                      <div className="flex items-center gap-3">
                        <Link href={`/admin/banking/${a.id}`} className="font-medium text-navy hover:underline">
                          {a.name || "Account"}
                        </Link>
                        {conn?.status && <Badge>{conn.status}</Badge>}
                        {unrec > 0 && <Badge tone="amber">{unrec} to reconcile</Badge>}
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        {a.iban ? `${a.iban} · ` : ""}
                        {a.last_synced_at ? `synced ${fmtDateTime(a.last_synced_at)}` : "never synced"}
                        {conn?.expires_at ? ` · consent to ${fmtDate(conn.expires_at)}` : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-semibold text-slate-900">{a.balance != null ? money(a.balance, a.currency) : "—"}</div>
                        <div className="text-xs text-slate-400">balance</div>
                      </div>
                      <form action={syncAccount.bind(null, a.id)}>
                        <PendingButton variant="outline" pendingLabel="Syncing…" className="!px-3 !py-2 text-xs">Sync</PendingButton>
                      </form>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          <EmptyState title="No bank connected yet" hint="Connect a bank to pull balances and transactions automatically." />
        )}
      </div>
    </>
  );
}
