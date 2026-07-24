// Shared parsing + total computation for the quote/invoice line-item builder.
// Totals are always recomputed server-side from the parsed rows, never trusted
// from the client.

export type ParsedRow = {
  description: string;
  qty: number;
  unit: string | null;
  unit_price: number;
  vat_rate: number;
  service_code: string | null;
};

export type ParsedPayload = {
  id?: string;
  client_id: string | null;
  vessel_id: string | null;
  currency: string;
  vat_treatment: string;
  rows: ParsedRow[];
};

export function parsePayload(raw: unknown): ParsedPayload {
  let obj: Record<string, unknown> = {};
  try {
    obj = typeof raw === "string" ? JSON.parse(raw) : (raw as Record<string, unknown>);
  } catch {
    obj = {};
  }
  const rawRows = Array.isArray(obj.rows) ? obj.rows : [];
  const rows: ParsedRow[] = rawRows
    .map((r) => {
      const row = r as Record<string, unknown>;
      return {
        description: String(row.description ?? "").trim(),
        qty: Number(row.qty) || 0,
        unit: (String(row.unit ?? "").trim() || null) as string | null,
        unit_price: Number(row.unit_price) || 0,
        vat_rate: Number(row.vat_rate) || 0,
        service_code: (row.service_code ? String(row.service_code) : null) as string | null,
      };
    })
    .filter((r) => r.description || r.unit_price);

  return {
    id: obj.id ? String(obj.id) : undefined,
    client_id: obj.client_id ? String(obj.client_id) : null,
    vessel_id: obj.vessel_id ? String(obj.vessel_id) : null,
    currency: String(obj.currency ?? "gbp"),
    vat_treatment: String(obj.vat_treatment ?? "standard"),
    rows,
  };
}

export function computeTotals(rows: ParsedRow[]) {
  let subtotal = 0;
  let vat_total = 0;
  const items = rows.map((r, i) => {
    const line_total = r.qty * r.unit_price;
    subtotal += line_total;
    vat_total += line_total * (r.vat_rate / 100);
    return {
      description: r.description,
      qty: r.qty,
      unit: r.unit,
      unit_price: r.unit_price,
      vat_rate: r.vat_rate,
      line_total,
      service_code: r.service_code,
      sort: i,
    };
  });
  return { subtotal, vat_total, total: subtotal + vat_total, items };
}
