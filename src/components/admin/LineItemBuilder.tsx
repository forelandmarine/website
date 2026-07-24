"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { money } from "@/lib/admin/format";

export type Service = { code: string; name: string; unit: string; rate: number };
export type ClientOpt = { id: string; name: string };
export type VesselOpt = { id: string; client_id: string; name: string };

export type Row = {
  description: string;
  qty: number;
  unit: string;
  unit_price: number;
  vat_rate: number;
  service_code?: string | null;
};

export type BuilderDefaults = {
  id?: string;
  client_id?: string | null;
  vessel_id?: string | null;
  title?: string | null;
  currency?: string | null;
  notes?: string | null;
  deposit_percent?: number | null;
  vat_treatment?: string | null;
  valid_until?: string | null;
  issue_date?: string | null;
  due_date?: string | null;
  items?: Row[];
};

const CURRENCIES = ["gbp", "eur", "usd"];

export function LineItemBuilder({
  mode,
  action,
  services,
  clients,
  vessels,
  defaults,
  defaultVatRate,
  submitLabel,
  cancelHref,
}: {
  mode: "quote" | "invoice";
  action: (formData: FormData) => void;
  services: Service[];
  clients: ClientOpt[];
  vessels: VesselOpt[];
  defaults?: BuilderDefaults;
  defaultVatRate: number;
  submitLabel: string;
  cancelHref: string;
}) {
  const [clientId, setClientId] = useState(defaults?.client_id ?? "");
  const [vesselId, setVesselId] = useState(defaults?.vessel_id ?? "");
  const [currency, setCurrency] = useState(defaults?.currency ?? "gbp");
  const [vatTreatment, setVatTreatment] = useState(defaults?.vat_treatment ?? "standard");
  const vatApplies = vatTreatment === "standard";
  const [rows, setRows] = useState<Row[]>(
    defaults?.items?.length
      ? defaults.items
      : [{ description: "", qty: 1, unit: "day", unit_price: 0, vat_rate: defaultVatRate }],
  );

  const clientVessels = useMemo(
    () => vessels.filter((v) => v.client_id === clientId),
    [vessels, clientId],
  );

  const totals = useMemo(() => {
    let subtotal = 0;
    let vat = 0;
    for (const r of rows) {
      const line = (Number(r.qty) || 0) * (Number(r.unit_price) || 0);
      subtotal += line;
      if (vatApplies) vat += line * ((Number(r.vat_rate) || 0) / 100);
    }
    return { subtotal, vat, total: subtotal + vat };
  }, [rows, vatApplies]);

  function updateRow(i: number, patch: Partial<Row>) {
    setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }
  function addRow() {
    setRows((rs) => [...rs, { description: "", qty: 1, unit: "day", unit_price: 0, vat_rate: defaultVatRate }]);
  }
  function removeRow(i: number) {
    setRows((rs) => (rs.length > 1 ? rs.filter((_, idx) => idx !== i) : rs));
  }
  function addFromService(code: string) {
    const svc = services.find((s) => s.code === code);
    if (!svc) return;
    setRows((rs) => [
      ...rs.filter((r) => r.description || r.unit_price),
      { description: svc.name, qty: 1, unit: svc.unit, unit_price: svc.rate, vat_rate: defaultVatRate, service_code: svc.code },
    ]);
  }

  const payload = JSON.stringify({
    id: defaults?.id,
    client_id: clientId || null,
    vessel_id: vesselId || null,
    currency,
    vat_treatment: vatTreatment,
    rows: rows.map((r) => ({
      description: r.description,
      qty: Number(r.qty) || 0,
      unit: r.unit,
      unit_price: Number(r.unit_price) || 0,
      vat_rate: vatApplies ? Number(r.vat_rate) || 0 : 0,
      service_code: r.service_code ?? null,
    })),
  });

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="payload" value={payload} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="fm-label">Client</span>
          <select
            className="fm-fld"
            value={clientId}
            onChange={(e) => {
              setClientId(e.target.value);
              setVesselId("");
            }}
          >
            <option value="">— Select client —</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="fm-label">Vessel</span>
          <select className="fm-fld" value={vesselId} onChange={(e) => setVesselId(e.target.value)} disabled={!clientId}>
            <option value="">— None —</option>
            {clientVessels.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="fm-label">Title</span>
          <input className="fm-fld" name="title" defaultValue={defaults?.title ?? ""} placeholder={mode === "quote" ? "e.g. Refit project management proposal" : "e.g. May retainer"} />
        </label>
        <label className="block">
          <span className="fm-label">Currency</span>
          <select className="fm-fld" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="fm-label">VAT treatment</span>
          <select className="fm-fld" value={vatTreatment} onChange={(e) => setVatTreatment(e.target.value)}>
            <option value="standard">Standard VAT</option>
            <option value="zero">Zero-rated</option>
            <option value="exempt">Exempt</option>
            <option value="outside">Outside scope (offshore B2B)</option>
          </select>
        </label>
        {mode === "quote" ? (
          <>
            <label className="block">
              <span className="fm-label">Deposit %</span>
              <input className="fm-fld" name="deposit_percent" type="number" step="0.5" defaultValue={defaults?.deposit_percent ?? 0} />
            </label>
            <label className="block">
              <span className="fm-label">Valid until</span>
              <input className="fm-fld" name="valid_until" type="date" defaultValue={defaults?.valid_until ?? ""} />
            </label>
          </>
        ) : (
          <>
            <label className="block">
              <span className="fm-label">Issue date</span>
              <input className="fm-fld" name="issue_date" type="date" defaultValue={defaults?.issue_date ?? ""} />
            </label>
            <label className="block">
              <span className="fm-label">Due date</span>
              <input className="fm-fld" name="due_date" type="date" defaultValue={defaults?.due_date ?? ""} />
            </label>
          </>
        )}
      </div>

      {/* Line items */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="fm-label !mb-0">Line items</span>
          <select
            className="fm-fld !w-auto !py-1.5 text-xs"
            value=""
            onChange={(e) => {
              if (e.target.value) addFromService(e.target.value);
              e.target.value = "";
            }}
          >
            <option value="">+ Add from rate card…</option>
            {services.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name} ({money(s.rate, "gbp")}/{s.unit})
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="fm-th">Description</th>
                <th className="fm-th w-20">Qty</th>
                <th className="fm-th w-24">Unit</th>
                <th className="fm-th w-32">Unit price</th>
                <th className="fm-th w-20">VAT %</th>
                <th className="fm-th w-28 text-right">Line</th>
                <th className="fm-th w-10"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const line = (Number(r.qty) || 0) * (Number(r.unit_price) || 0);
                return (
                  <tr key={i} className="border-b border-slate-100 last:border-0">
                    <td className="px-2 py-1.5">
                      <input className="fm-fld !py-1.5" value={r.description} onChange={(e) => updateRow(i, { description: e.target.value })} placeholder="Description" />
                    </td>
                    <td className="px-2 py-1.5">
                      <input className="fm-fld !py-1.5" type="number" step="0.25" value={r.qty} onChange={(e) => updateRow(i, { qty: Number(e.target.value) })} />
                    </td>
                    <td className="px-2 py-1.5">
                      <input className="fm-fld !py-1.5" value={r.unit} onChange={(e) => updateRow(i, { unit: e.target.value })} />
                    </td>
                    <td className="px-2 py-1.5">
                      <input className="fm-fld !py-1.5" type="number" step="0.01" value={r.unit_price} onChange={(e) => updateRow(i, { unit_price: Number(e.target.value) })} />
                    </td>
                    <td className="px-2 py-1.5">
                      <input className="fm-fld !py-1.5" type="number" step="1" value={r.vat_rate} onChange={(e) => updateRow(i, { vat_rate: Number(e.target.value) })} />
                    </td>
                    <td className="px-3 py-1.5 text-right text-sm text-slate-700">{money(line, currency)}</td>
                    <td className="px-2 py-1.5 text-center">
                      <button type="button" onClick={() => removeRow(i)} className="text-slate-400 hover:text-red-600" aria-label="Remove row">
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button type="button" onClick={addRow} className="mt-2 text-sm font-medium text-navy hover:underline">
          + Add line
        </button>
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-full max-w-xs space-y-1 text-sm">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span>{money(totals.subtotal, currency)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>VAT{!vatApplies ? " (not charged)" : ""}</span>
            <span>{money(totals.vat, currency)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-1 text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>{money(totals.total, currency)}</span>
          </div>
          {!vatApplies && (
            <p className="pt-1 text-right text-xs text-slate-400">
              VAT not charged (per-line VAT ignored under this treatment)
            </p>
          )}
        </div>
      </div>

      <label className="block">
        <span className="fm-label">Notes</span>
        <textarea className="fm-fld resize-y" name="notes" rows={3} defaultValue={defaults?.notes ?? ""} />
      </label>

      <div className="flex items-center gap-3">
        <button type="submit" className="rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-700">
          {submitLabel}
        </button>
        <Link href={cancelHref} className="text-sm text-slate-500 hover:text-slate-800">
          Cancel
        </Link>
      </div>
    </form>
  );
}
