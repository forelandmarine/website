import { NextRequest, NextResponse } from "next/server";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";

function csvCell(v: unknown): string {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(rows: Record<string, unknown>[], columns: string[]): string {
  const header = columns.join(",");
  const body = rows.map((r) => columns.map((c) => csvCell(r[c])).join(",")).join("\n");
  return `${header}\n${body}`;
}

export async function GET(req: NextRequest) {
  // Gated: only signed-in finance users can export.
  const profile = await getCurrentProfile();
  if (!profile || !["owner", "bookkeeper"].includes(profile.role)) {
    return NextResponse.json({ error: "Not authorised." }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "invoices";
  const from = searchParams.get("from") || "2000-01-01";
  const to = searchParams.get("to") || "2100-01-01";
  const supabase = await getSupabaseServer();

  let csv = "";
  let filename = "export.csv";

  if (type === "expenses") {
    const { data } = await supabase
      .from("fm_expenses")
      .select("spent_on, supplier, category, description, currency, net, vat, gross, status")
      .gte("spent_on", from)
      .lte("spent_on", to)
      .order("spent_on");
    csv = toCsv(data ?? [], ["spent_on", "supplier", "category", "description", "currency", "net", "vat", "gross", "status"]);
    filename = `foreland-expenses-${from}_${to}.csv`;
  } else {
    const { data } = await supabase
      .from("fm_invoices")
      .select("number, issue_date, due_date, status, currency, subtotal, vat_total, total, amount_paid, fm_clients(name)")
      .gte("issue_date", from)
      .lte("issue_date", to)
      .order("issue_date");
    const rows = (data ?? []).map((i) => {
      const client = Array.isArray(i.fm_clients) ? i.fm_clients[0] : i.fm_clients;
      return {
        number: i.number,
        issue_date: i.issue_date,
        due_date: i.due_date,
        client: client?.name ?? "",
        status: i.status,
        currency: i.currency,
        subtotal: i.subtotal,
        vat_total: i.vat_total,
        total: i.total,
        amount_paid: i.amount_paid,
      };
    });
    csv = toCsv(rows, ["number", "issue_date", "due_date", "client", "status", "currency", "subtotal", "vat_total", "total", "amount_paid"]);
    filename = `foreland-invoices-${from}_${to}.csv`;
  }

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
