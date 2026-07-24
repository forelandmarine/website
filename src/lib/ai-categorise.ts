// AI transaction categorisation via the Claude API (Anthropic). Used to clear
// the long tail of bank/card transactions that no rule matches. Read-only key
// use; results are applied as reversible, flagged expenses/transfers.

const CATEGORIES = [
  "Travel", "Accommodation", "Subsistence", "Subcontractors", "Software", "Office",
  "Professional fees", "Insurance", "Marketing", "Equipment", "Bank charges", "Other",
];

export function aiEnabled(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export type AiItem = { i: number; text: string; amount: number };
export type AiResult = { i: number; category: string }; // category ∈ CATEGORIES ∪ {"transfer","skip"}

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("[");
  const end = raw.lastIndexOf("]");
  if (start === -1 || end === -1) return [];
  try {
    return JSON.parse(raw.slice(start, end + 1));
  } catch {
    return [];
  }
}

async function callClaude(items: AiItem[]): Promise<AiResult[]> {
  const lines = items.map((it) => `${it.i}: ${it.text} (${it.amount})`).join("\n");
  const prompt = `You are a UK bookkeeper categorising BUSINESS bank/card transactions for a superyacht consultancy. This is a company account, so treat every payment as a business expense and always assign a category.
For each transaction assign exactly ONE label:
- One of these expense categories: ${CATEGORIES.join(", ")}
- "transfer" only if it is money between the owner's own accounts, drawings/salary, a credit-card repayment, or a cash withdrawal.

Make your best guess from the merchant name, even for foreign or abbreviated names:
- restaurant, bar, café, bakery, catering, food, pub, bistro → Subsistence
- fuel/petrol (BP, Shell, Esso...), airline, rail, taxi/Uber, parking, ferry, car hire → Travel
- hotel, resort, B&B → Accommodation
- app, website, SaaS, hosting, AI/subscription → Software
- chandlery/marine/hardware → Equipment
If you genuinely cannot tell, use "Other". Never skip a transaction.

Amounts are negative for money out, positive for money in. Reply with ONLY a JSON array of {"i": <number>, "category": "<label>"}, one per transaction, no prose.

Transactions:
${lines}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY as string,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Anthropic API failed (${res.status})`);
  const data = await res.json();
  const text = data?.content?.[0]?.text ?? "[]";
  const parsed = extractJson(text) as { i: number; category: string }[];
  // "skip" is intentionally not allowed: anything unrecognised falls back to
  // "Other" so it still gets booked rather than left on the pile.
  const allowed = new Set([...CATEGORIES, "transfer"]);
  return (Array.isArray(parsed) ? parsed : [])
    .filter((r) => typeof r?.i === "number" && typeof r?.category === "string")
    .map((r) => ({ i: r.i, category: allowed.has(r.category) ? r.category : "Other" }));
}

// Categorises items in batches run concurrently; returns index -> label.
export async function categorise(items: AiItem[]): Promise<Map<number, string>> {
  const out = new Map<number, string>();
  const BATCH = 40;
  const chunks: AiItem[][] = [];
  for (let b = 0; b < items.length; b += BATCH) chunks.push(items.slice(b, b + BATCH));

  const results = await Promise.all(
    chunks.map((chunk) =>
      callClaude(chunk).catch((e) => {
        console.error("AI categorise batch failed:", e);
        return [] as AiResult[];
      }),
    ),
  );
  for (const batch of results) for (const r of batch) out.set(r.i, r.category);
  return out;
}
