// Parse bank statement files (OFX and CSV) into normalised transactions.
// Convention: amount is signed, + for money in, - for money out.

export type ParsedTxn = {
  externalId: string;
  date: string | null; // YYYY-MM-DD
  amount: number;
  description: string;
  counterparty: string | null;
};

// Small stable hash for CSV rows (which lack transaction ids), used to dedupe.
function hashId(parts: string[]): string {
  const s = parts.join("|");
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return "csv-" + h.toString(16);
}

function parseAmount(raw: string): number {
  if (!raw) return 0;
  let s = raw.trim().replace(/[£$€,\s]/g, "");
  let sign = 1;
  if (/^\(.*\)$/.test(s)) { sign = -1; s = s.replace(/[()]/g, ""); }
  if (/cr$/i.test(s)) { s = s.replace(/cr$/i, ""); }
  if (/dr$/i.test(s)) { sign = -1; s = s.replace(/dr$/i, ""); }
  const n = Number(s);
  return Number.isFinite(n) ? sign * n : 0;
}

function normaliseDate(raw: string): string | null {
  if (!raw) return null;
  const s = raw.trim();
  // YYYY-MM-DD or YYYY/MM/DD
  let m = s.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (m) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
  // DD/MM/YYYY or DD-MM-YYYY (UK default)
  m = s.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})/);
  if (m) {
    const yr = m[3].length === 2 ? `20${m[3]}` : m[3];
    return `${yr}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  }
  // DD MMM YYYY
  m = s.match(/^(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{4})/);
  if (m) {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const mi = months.indexOf(m[2].slice(0, 3).toLowerCase());
    if (mi >= 0) return `${m[3]}-${String(mi + 1).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  }
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

// ── OFX ──────────────────────────────────────────────────────────────────────
function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}>([^<\\r\\n]*)`, "i"));
  return m ? m[1].trim() : "";
}

function parseOfx(text: string): ParsedTxn[] {
  const rows: ParsedTxn[] = [];
  const blocks = text.match(/<STMTTRN>[\s\S]*?<\/STMTTRN>/gi) || [];
  for (const b of blocks) {
    const amount = parseAmount(tag(b, "TRNAMT"));
    const dt = tag(b, "DTPOSTED").slice(0, 8);
    const date = dt.length === 8 ? `${dt.slice(0, 4)}-${dt.slice(4, 6)}-${dt.slice(6, 8)}` : null;
    const name = tag(b, "NAME") || tag(b, "PAYEE");
    const memo = tag(b, "MEMO");
    const fitid = tag(b, "FITID") || hashId([date || "", String(amount), name || memo]);
    rows.push({
      externalId: `ofx-${fitid}`,
      date,
      amount,
      description: [name, memo].filter(Boolean).join(" — ") || "Transaction",
      counterparty: name || null,
    });
  }
  return rows;
}

// ── CSV ──────────────────────────────────────────────────────────────────────
function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; } else inQ = !inQ;
    } else if (c === "," && !inQ) { out.push(cur); cur = ""; } else cur += c;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

function findCol(headers: string[], keywords: string[]): number {
  return headers.findIndex((h) => keywords.some((k) => h.toLowerCase().includes(k)));
}

function parseCsv(text: string): { rows: ParsedTxn[]; error?: string } {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length);
  if (lines.length < 2) return { rows: [], error: "The file has no data rows." };
  const headers = splitCsvLine(lines[0]);

  const dateCol = findCol(headers, ["date"]);
  const descCol = findCol(headers, ["description", "reference", "narrative", "details", "memo", "payee", "counter party", "name"]);
  const amountCol = findCol(headers, ["amount", "value"]);
  const inCol = findCol(headers, ["money in", "paid in", "credit", "deposit"]);
  const outCol = findCol(headers, ["money out", "paid out", "debit", "withdraw"]);

  if (dateCol < 0 || (amountCol < 0 && inCol < 0 && outCol < 0)) {
    return { rows: [], error: "Could not find date and amount columns. Expected headers like Date, Amount (or Money In / Money Out)." };
  }

  const rows: ParsedTxn[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = splitCsvLine(lines[i]);
    if (cells.length < headers.length) continue;
    const date = normaliseDate(cells[dateCol] || "");
    let amount = 0;
    if (amountCol >= 0 && cells[amountCol]) amount = parseAmount(cells[amountCol]);
    else {
      const inc = inCol >= 0 ? Math.abs(parseAmount(cells[inCol] || "")) : 0;
      const out = outCol >= 0 ? Math.abs(parseAmount(cells[outCol] || "")) : 0;
      amount = inc - out;
    }
    if (!amount && !date) continue;
    const description = descCol >= 0 ? cells[descCol] || "Transaction" : "Transaction";
    rows.push({
      externalId: hashId([date || "", String(amount), description]),
      date,
      amount,
      description,
      counterparty: descCol >= 0 ? cells[descCol] || null : null,
    });
  }
  return { rows };
}

export function parseStatement(filename: string, text: string): { rows: ParsedTxn[]; format: string; error?: string } {
  const lower = filename.toLowerCase();
  const looksOfx = lower.endsWith(".ofx") || lower.endsWith(".qfx") || /<OFX>|<STMTTRN>/i.test(text);
  if (looksOfx) {
    return { rows: parseOfx(text), format: "ofx" };
  }
  const { rows, error } = parseCsv(text);
  return { rows, format: "csv", error };
}
