import { money, fmtDate } from "@/lib/admin/format";
import { PrintButton } from "@/components/PrintButton";

type Item = { description: string; qty: number; unit: string | null; unit_price: number; line_total: number };
type Party = { name?: string | null; email?: string | null; company?: string | null } | null;
type Vessel = { name?: string | null } | null;
type Settings = {
  company_name?: string;
  company_number?: string | null;
  vat_number?: string | null;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
};

export function DocView({
  kind,
  number,
  title,
  status,
  currency,
  issueDate,
  dueDate,
  validUntil,
  client,
  vessel,
  items,
  subtotal,
  vatTotal,
  total,
  depositPercent,
  amountPaid,
  notes,
  settings,
}: {
  kind: "Proposal" | "Invoice";
  number: string;
  title?: string | null;
  status?: string;
  currency: string;
  issueDate?: string | null;
  dueDate?: string | null;
  validUntil?: string | null;
  client: Party;
  vessel: Vessel;
  items: Item[];
  subtotal: number;
  vatTotal: number;
  total: number;
  depositPercent?: number;
  amountPaid?: number;
  notes?: string | null;
  settings: Settings;
}) {
  const deposit = depositPercent ? (total * depositPercent) / 100 : 0;
  const balance = total - (amountPaid ?? 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 print:p-0">
      <div>
        <div className="mb-4 flex items-center justify-between print:hidden">
          <a href="https://www.forelandmarine.com" className="text-sm text-slate-500 hover:text-slate-800">
            forelandmarine.com
          </a>
          <PrintButton />
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm print:border-0 print:shadow-none sm:p-12">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-6">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/foreland-marine-color.png" alt="Foreland Marine Consultancy" className="h-12 w-auto" />
              <p className="mt-2 text-xs text-slate-400">{settings.company_name}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">{kind}</div>
              <div className="text-lg font-semibold text-slate-900">{number}</div>
            </div>
          </div>

          {/* Meta */}
          <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">To</p>
              <p className="mt-1 font-medium text-slate-800">{client?.name || "—"}</p>
              {client?.company && <p className="text-slate-500">{client.company}</p>}
              {client?.email && <p className="text-slate-500">{client.email}</p>}
              {vessel?.name && <p className="mt-1 text-slate-500">Vessel: {vessel.name}</p>}
            </div>
            <div className="text-right">
              {title && <p className="font-medium text-slate-800">{title}</p>}
              {issueDate && <p className="text-slate-500">Issued {fmtDate(issueDate)}</p>}
              {dueDate && <p className="text-slate-500">Due {fmtDate(dueDate)}</p>}
              {validUntil && <p className="text-slate-500">Valid until {fmtDate(validUntil)}</p>}
              {status && <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{status}</p>}
            </div>
          </div>

          {/* Items */}
          <table className="mt-8 w-full text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="py-2">Description</th>
                <th className="py-2 text-right">Qty</th>
                <th className="py-2 text-right">Unit price</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-2.5 text-slate-700">{it.description}</td>
                  <td className="py-2.5 text-right text-slate-500">{Number(it.qty)} {it.unit || ""}</td>
                  <td className="py-2.5 text-right text-slate-500">{money(it.unit_price, currency)}</td>
                  <td className="py-2.5 text-right text-slate-700">{money(it.line_total, currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="mt-4 flex justify-end">
            <div className="w-64 space-y-1 text-sm">
              <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>{money(subtotal, currency)}</span></div>
              <div className="flex justify-between text-slate-500"><span>VAT</span><span>{money(vatTotal, currency)}</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-1 text-base font-semibold text-slate-900"><span>Total</span><span>{money(total, currency)}</span></div>
              {deposit > 0 && <div className="flex justify-between text-slate-500"><span>Deposit ({depositPercent}%)</span><span>{money(deposit, currency)}</span></div>}
              {typeof amountPaid === "number" && amountPaid > 0 && <div className="flex justify-between text-emerald-600"><span>Paid</span><span>-{money(amountPaid, currency)}</span></div>}
              {kind === "Invoice" && <div className="flex justify-between border-t border-slate-200 pt-1 font-semibold text-slate-900"><span>Balance due</span><span>{money(balance, currency)}</span></div>}
            </div>
          </div>

          {notes && (
            <div className="mt-8 border-t border-slate-200 pt-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Notes</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-10 border-t border-slate-200 pt-4 text-xs text-slate-400">
            {settings.company_name}
            {settings.company_number ? `, company ${settings.company_number}` : ""}
            {settings.vat_number ? `, VAT ${settings.vat_number}` : ""}
            {". "}
            {settings.address}
            {settings.email ? `. ${settings.email}` : ""}
            {settings.phone ? `, ${settings.phone}` : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
