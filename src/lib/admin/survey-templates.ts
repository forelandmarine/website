// Survey checklist templates. A new survey copies its template's items into
// fm_survey_items, so editing a template here only affects surveys created
// afterwards. `e: true` marks an essential item (E): one that must be cleared
// before the vessel moves.

export type TemplateItem = { label: string; e?: boolean };
export type TemplateSection = { name: string; note?: string; items: TemplateItem[] };
export type SurveyTemplate = { key: string; title: string; scope: string; sections: TemplateSection[] };

export const RESULTS = [
  { value: "ok", label: "OK" },
  { value: "defect", label: "Defect" },
  { value: "monitor", label: "Monitor" },
  { value: "no_access", label: "No access" },
] as const;

export type Result = (typeof RESULTS)[number]["value"];

export const OUTCOMES = [
  { value: "fit_single_passage", label: "Fit for single passage" },
  { value: "fit_conditions", label: "Fit subject to conditions" },
  { value: "not_fit", label: "Not fit" },
] as const;

export const TEMPLATES: SurveyTemplate[] = [
  {
    key: "bulkhead-chainplates",
    title: "Structural inspection: bulkhead and chainplates",
    scope:
      "Items marked E must be completed before the vessel moves under motor to the repair yard. All other items form the full structural survey once she is at the yard. The passage is assumed to be under engine only, with no sail set.",
    sections: [
      {
        name: "Before boarding",
        items: [
          { label: "Incident history: grounding, collision, rig failure, re-rig", e: true },
          { label: "Rig tension as found, all shrouds and stays (gauge readings)", e: true },
          { label: "Passage plan: route, distance, ports of refuge, forecast window", e: true },
          { label: "Insurer and flag state notified, consent to move held", e: true },
          { label: "Build drawings, laminate schedule, chainplate detail" },
          { label: "Previous surveys and repair records" },
        ],
      },
      {
        name: "Access",
        items: [
          { label: "Cracked area and adjacent bond lines exposed and visible, both faces of bulkhead", e: true },
          { label: "Chainplate fastenings and backing plates visible, port and starboard", e: true },
          { label: "All linings, headlining and joinery removed in way of chainplates" },
          { label: "Borescope inspection of blind areas" },
        ],
      },
      {
        name: "Bulkhead",
        items: [
          { label: "Crack location, length, width, orientation (sketch and photo with scale)", e: true },
          { label: "Crack tips marked and dated, telltales fitted", e: true },
          { label: "Depth by visual assessment: surface finish only, or into laminate or ply", e: true },
          { label: "Bulkhead plumb and fair, no buckling or crushing", e: true },
          { label: "Door frames and joinery square, no binding", e: true },
          { label: "Comparison with opposite side", e: true },
          { label: "Stress whitening or crushing around fastenings" },
          { label: "Depth confirmed by opening up or coring" },
        ],
      },
      {
        name: "Tabbing and bonds",
        items: [
          { label: "Bulkhead to hull bond: peel, gaps, cracking along tabbing edge", e: true },
          { label: "Bulkhead to deck bond: peel, gaps, cracking", e: true },
          { label: "Tap test of full tabbing perimeter, dull areas mapped and marked", e: true },
          { label: "Adjacent stringers, frames and knees intact", e: true },
          { label: "Feeler gauge in any open bond line, depth recorded" },
          { label: "Evidence of surface preparation on secondary bond" },
        ],
      },
      {
        name: "Chainplates",
        items: [
          { label: "Fastenings tight, no movement, no elongated holes", e: true },
          { label: "Backing plates: size, bedding, no distortion or pull-through", e: true },
          { label: "Visible corrosion or cracking, especially at deck level", e: true },
          { label: "Tie rods and turnbuckles secure, if fitted", e: true },
          { label: "Type and load path confirmed against drawings" },
          { label: "Chainplates pulled, hidden faces inspected" },
          { label: "Dye penetrant on metallic parts" },
        ],
      },
      {
        name: "Deck",
        items: [
          { label: "Deck lifting or deflection around chainplate (straight edge)", e: true },
          { label: "Seal at chainplate penetration watertight, or temporarily sealed for passage", e: true },
          { label: "Hull to deck joint intact in way of chainplates", e: true },
          { label: "Gelcoat cracks radiating from chainplate, mapped" },
          { label: "Moisture readings and core condition around penetration" },
        ],
      },
      {
        name: "Hull exterior",
        items: [
          { label: "Cracking in topsides in way of bulkhead and chainplates", e: true },
          { label: "No water ingress internally in way of defect, bilges dry", e: true },
          { label: "Print-through or hard spot at bulkhead line" },
          { label: "Fairness check both sides" },
        ],
      },
      {
        name: "Rig",
        note: "A standing mast still loads the affected chainplate in a seaway, so the stepped or unstepped decision is the key call in this section.",
        items: [
          { label: "Decision recorded: mast to remain stepped, or be unstepped before passage", e: true },
          { label: "Rig loads eased to the minimum consistent with mast stability, settings recorded", e: true },
          { label: "Supplementary support rigged to sound strong points clear of the affected structure", e: true },
          { label: "Mast step and partners sound", e: true },
          { label: "Sails removed or lashed, boom and running rigging secured, no sail to be set", e: true },
          { label: "Mast in column, rake and pre-bend" },
          { label: "Shroud and stay terminals" },
          { label: "Loaded versus slack comparison at crack and bond line" },
        ],
      },
      {
        name: "Moisture and NDT",
        note: "None of these is needed before the passage. They define the repair scope at the yard.",
        items: [
          { label: "Moisture meter grid around affected area" },
          { label: "Ultrasound or thermography to map disbond" },
          { label: "Core samples if disbond confirmed" },
        ],
      },
      {
        name: "Passage under motor",
        note: "With no sail as a fallback, the engine, steering and pumps carry the whole passage. Every item here is essential.",
        items: [
          { label: "Main engine: start, run under load, cooling, oil, belts, mounts", e: true },
          { label: "Fuel: quantity for passage plus reserve, clean, spare filters aboard", e: true },
          { label: "Shaft, stern gland and propeller", e: true },
          { label: "Steering lock to lock, emergency tiller aboard and fits", e: true },
          { label: "Seacocks, skin fittings and hoses", e: true },
          { label: "Bilge pumps tested, electric and manual, high water alarm working", e: true },
          { label: "Batteries and charging", e: true },
          { label: "Navigation lights, VHF and position fixing", e: true },
          { label: "Anchor and windlass ready for immediate use", e: true },
          { label: "Liferaft, lifejackets, flares, EPIRB and extinguishers in date", e: true },
          { label: "Contingency for engine failure: tow or escort arranged", e: true },
          { label: "Passage limits set: maximum wind, sea state, daylight only, distance from refuge", e: true },
          { label: "Crew briefed on defect, telltales checked at set intervals under way", e: true },
        ],
      },
      {
        name: "Records and sign-off",
        items: [
          { label: "Photo log with locations", e: true },
          { label: "Marked-up sketch of defects, crack tip positions and dates", e: true },
          { label: "Limitations and areas not accessed stated", e: true },
          { label: "Crack tips and telltales rechecked immediately before departure", e: true },
          { label: "Arrival inspection at yard: crack tips re-measured against departure marks" },
        ],
      },
    ],
  },
];

export function getTemplate(key: string): SurveyTemplate | undefined {
  return TEMPLATES.find((t) => t.key === key);
}

export function sectionNote(templateKey: string, section: string): string | undefined {
  return getTemplate(templateKey)?.sections.find((s) => s.name === section)?.note;
}

export function resultLabel(r: string | null | undefined): string {
  return RESULTS.find((x) => x.value === r)?.label ?? "Not checked";
}

export function outcomeLabel(o: string | null | undefined): string {
  return OUTCOMES.find((x) => x.value === o)?.label ?? "—";
}

// Counts used by the dashboard, the survey header and the report.
export type ItemLite = { essential: boolean; result: string | null };

export function summarise(items: ItemLite[]) {
  const ess = items.filter((i) => i.essential);
  return {
    total: items.length,
    answered: items.filter((i) => i.result).length,
    essential: ess.length,
    essentialAnswered: ess.filter((i) => i.result).length,
    // An essential item blocks the passage while it is unchecked, a defect, or not accessed.
    essentialBlocking: ess.filter((i) => !i.result || i.result === "defect" || i.result === "no_access").length,
    defects: items.filter((i) => i.result === "defect").length,
    monitor: items.filter((i) => i.result === "monitor").length,
    noAccess: items.filter((i) => i.result === "no_access").length,
  };
}
