// Survey type data. Types and helpers are in survey-templates.ts.
// Items marked e: true are essential for the template's gate, where it has one.

import type { SurveyTemplate, TemplateItem } from "./survey-templates";

export const PASSAGE_OUTCOMES = [
  { value: "fit_single_passage", label: "Fit for single passage" },
  { value: "fit_conditions", label: "Fit subject to conditions" },
  { value: "not_fit", label: "Not fit" },
];

export const CONDITION_OUTCOMES = [
  { value: "satisfactory", label: "Satisfactory" },
  { value: "satisfactory_recommendations", label: "Satisfactory subject to recommendations" },
  { value: "unsatisfactory", label: "Unsatisfactory as found" },
];

export const RETURN_TO_SERVICE_OUTCOMES = [
  { value: "fit_service", label: "Fit to return to service" },
  { value: "fit_single_passage", label: "Fit for a single passage to the repair yard" },
  { value: "fit_conditions", label: "Fit subject to conditions" },
  { value: "not_fit", label: "Not fit to move or return to service" },
];

export const STAGE_OUTCOMES = [
  { value: "accepted", label: "Stage accepted" },
  { value: "accepted_conditions", label: "Accepted subject to conditions" },
  { value: "not_accepted", label: "Not accepted" },
];

export const ACCEPTANCE_OUTCOMES = [
  { value: "accepted", label: "Work accepted" },
  { value: "accepted_snags", label: "Accepted subject to snag list" },
  { value: "not_accepted", label: "Not accepted" },
];

export const WARRANTY_OUTCOMES = [
  { value: "no_claims", label: "No warranty items found" },
  { value: "claims", label: "Warranty items to be notified to the yard" },
];

export const READINESS_OUTCOMES = [
  { value: "ready", label: "Ready for inspection" },
  { value: "ready_items", label: "Ready subject to the items listed" },
  { value: "not_ready", label: "Not ready" },
];

// Shorthand for item lists: x() for ordinary items, e() for essential items.
const x = (...labels: string[]): TemplateItem[] => labels.map((label) => ({ label }));
const e = (...labels: string[]): TemplateItem[] => labels.map((label) => ({ label, e: true }));

export const TEMPLATES: SurveyTemplate[] = [
  {
    key: "bulkhead-chainplates",
    title: "Structural inspection: bulkhead and chainplates",
    group: "Specialist",
    summary: "Cracked bulkhead or chainplate defect, assessed for a single passage under motor to the repair yard.",
    reportTitle: "Structural Inspection Report",
    style: "condition",
    intro:
      "This report records a structural inspection of the bulkhead and chainplate area of {vessel}, carried out at {location} on {date}. The purpose of the inspection was to establish whether the vessel is fit to make a single passage under motor to the repair yard, and to define the extent of the structural survey to follow once she is at the yard. The inspection was visual and non-destructive, limited to areas that could be accessed without dismantling, except where stated.",
    gate: { label: "Before the passage", explain: "Items marked E must be completed before the vessel moves under motor to the repair yard." },
    outcomes: PASSAGE_OUTCOMES,
    fields: [
      { key: "passage", label: "Passage from / to" },
      { key: "exposure", label: "Distance and exposure" },
    ],
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
  // ── Condition ────────────────────────────────────────────────────────────
  {
    key: "pre-purchase",
    title: "Pre-purchase condition survey",
    group: "Condition",
    summary: "Full condition survey for a prospective buyer: structure, deck, rig, systems and equipment, with valuation if requested.",
    reportTitle: "Survey Report",
    style: "condition",
    valuation: true,
    scope:
      "Record what was inspected, what could not be accessed and why. Note whether the vessel was afloat or ashore, and whether a sea trial was carried out. Every limitation belongs in the report introduction.",
    intro:
      "This report details the findings of a condition survey carried out on {vessel} at {location} on {date}. The purpose of the survey was to provide an independent and objective assessment of the vessel's overall condition for the benefit of the prospective purchaser, with particular attention to structural integrity, the operation of her systems and her maintenance history, as far as could be determined by visual and non-destructive means.\n\nThe inspection was limited to accessible areas and components, without dismantling or intrusive testing. Areas that could not be inspected, and any parts of the survey not carried out, such as a haul-out or sea trial, are noted in the relevant sections.\n\nThis report reflects the vessel's condition as observed on the day of inspection. It is not a guarantee of future performance, but a record intended to help the client make an informed purchase decision. Recommendations for further investigation are made where appropriate.",
    outcomes: CONDITION_OUTCOMES,
    fields: [
      { key: "purpose", label: "Purpose of survey" },
      { key: "broker", label: "Broker" },
      { key: "haul_out", label: "Haul-out" },
      { key: "sea_trial", label: "Sea trial" },
    ],
    sections: [
      {
        name: "Documentation and history",
        items: x(
          "Registration, flag and ownership documents sighted",
          "Builder's plate, hull identification number and build year confirmed",
          "Class status and outstanding conditions of class, if classed",
          "Previous surveys, rig inspections and repair records",
          "Maintenance records and service history",
          "Incident history: grounding, collision, dismasting, flooding",
          "Owner's manuals, drawings and wiring diagrams aboard",
          "Equipment inventory checked against the listing",
        ),
      },
      {
        name: "Hull and structure",
        items: x(
          "Topsides: paint or gelcoat condition, impact damage, fairness",
          "Bow stem and transom",
          "Underwater hull: blistering, previous repairs, antifouling",
          "Moisture readings, topsides and underwater hull",
          "Percussion sounding for voids or delamination",
          "Keel attachment: keel joint, keel bolts and floors",
          "Keel and bulb condition",
          "Rudder: blade, stock, bearings and play",
          "Skeg, if fitted",
          "Stern gear: shaft, P-bracket or stern tube, cutless bearing",
          "Propeller and anodes",
          "Through-hull fittings and seacocks, operation and condition",
          "Internal structure: floors, stringers, frames and bulkhead bonds",
          "Steering system mounting structure",
          "Evidence of previous structural repair",
          "Hull to deck joint",
        ),
      },
      {
        name: "Deck and fittings",
        items: x(
          "Teak deck: thickness, caulking, fastenings, lifting",
          "Deck laminate and core condition around fittings",
          "Hatches: frames, lenses, hinges, seals",
          "Ports and windows: crazing, seals, frames",
          "Winches: condition and service history",
          "Sheet tracks, blocks and clutches",
          "Mooring cleats and fairleads",
          "Guardrails, stanchions, pulpit and pushpit",
          "Anchor, chain, windlass and chain locker",
          "Exterior brightwork and varnish",
          "Cockpit drains and lockers",
          "Passerelle, swim platform and boarding ladder",
        ),
      },
      {
        name: "Rig and sails",
        only: "sail",
        items: x(
          "Mast and boom: finish, distortion, mechanical damage",
          "Spreaders, as far as visible",
          "Standing rigging: material, age and replacement records",
          "Rigging terminals and toggles",
          "Chainplates and deck penetrations",
          "Running rigging: sheets and halyards",
          "Hydraulic vang, backstay and rams",
          "Headsail furler",
          "Mast track and sail cars",
          "Sail inventory and condition",
          "Aloft inspection carried out, or recommended",
        ),
      },
      {
        name: "Stabilisers and thrusters",
        only: "motor",
        items: x(
          "Stabiliser fins, actuators and seals",
          "Stabiliser hydraulic power pack",
          "Bow and stern thrusters: tunnels, propellers, drive",
          "Thruster controls and battery supply",
        ),
      },
      {
        name: "Interior",
        items: x(
          "Joinery and finishes",
          "Upholstery and soft furnishings",
          "Evidence of water ingress, mould or damp",
          "Headlinings and soles",
          "Galley equipment",
          "Heads and showers",
          "Air conditioning, heating and ventilation",
          "Interior lighting and fittings",
          "Crew accommodation",
        ),
      },
      {
        name: "Mechanical systems",
        items: x(
          "Main engine(s): make, model, hours, installation",
          "Engine mounts, coupling and alignment",
          "Gearbox and controls",
          "Cooling system: raw water, heat exchanger, impeller",
          "Exhaust system and hoses",
          "Fuel system: tanks, filters, lines",
          "Generator(s): make, model, hours, installation",
          "Hydraulic systems and power take-off",
          "Steering gear and emergency steering",
          "Watermaker",
          "Engine room ventilation and fire suppression",
          "Leaks, corrosion and evidence of deferred maintenance",
        ),
      },
      {
        name: "Electrical systems",
        items: x(
          "DC system: voltage, distribution, circuit protection",
          "Batteries: type, age, installation, terminals",
          "Charging: alternators, chargers, battery management",
          "AC system and shore power inlet",
          "Main distribution panels and breakers",
          "Cable routing, support and terminations",
          "Inverter and isolation transformer",
          "Bonding and galvanic protection",
          "Thermal imaging of distribution, carried out or recommended",
        ),
      },
      {
        name: "Plumbing systems",
        items: x(
          "Fresh water: tanks, pumps, pipework",
          "Hot water system",
          "Black and grey water: tanks, pipework, discharge",
          "Fuel lines and valves",
          "Bilge pumps, manual and electric, and high water alarm",
          "Hoses and clamps below the waterline",
        ),
      },
      {
        name: "Electronics and navigation",
        items: x(
          "Instrument system and processor",
          "Chart plotters and displays",
          "Radar",
          "Autopilot",
          "AIS",
          "VHF and long-range communications",
          "Navigation lights",
          "Age, support and parts availability of navigation equipment",
        ),
      },
      {
        name: "Safety equipment",
        items: x(
          "Liferaft: capacity and service date",
          "Lifejackets and harnesses",
          "EPIRB and personal locator beacons: registration and battery dates",
          "Flares: type and expiry",
          "Fire extinguishers: number, type and service dates",
          "Fixed fire suppression and fire detection",
          "Gas installation and gas detection",
          "Man overboard equipment",
          "First aid kit",
        ),
      },
      {
        name: "Sea trial",
        note: "Complete only if a sea trial was carried out. Otherwise mark items N/A and recommend one in the report.",
        items: x(
          "Engine start, idle and full load",
          "Temperatures and pressures under load",
          "Gearbox engagement ahead and astern",
          "Vibration and shaft noise",
          "Steering response and autopilot",
          "Sails set and handling, if tested",
          "Stabilisers and thrusters in operation",
          "Bilges after trial",
        ),
      },
    ],
  },
  {
    key: "insurance",
    title: "Insurance condition and valuation survey",
    group: "Condition",
    summary: "Condition survey for underwriting at purchase or renewal, with an estimate of fair market value.",
    reportTitle: "Insurance Condition Survey Report",
    style: "insurance",
    valuation: true,
    scope:
      "Insurers read this report for structure, safety equipment, gas, electrical and through-hull fittings. Record expiry and service dates, and give each defect a recommendation and priority.",
    intro:
      "This insurance condition survey of {vessel} was carried out at {location} on {date} to document the vessel's condition for insurance underwriting purposes.\n\nThe survey covered a visual and tactile inspection of the hull, deck, superstructure, rigging, machinery and equipment, moisture meter readings and percussion sounding of the hull, operational testing of systems and electronics, and a check of documentation and safety equipment. No destructive testing was carried out, and machinery and systems were not dismantled.",
    outcomes: CONDITION_OUTCOMES,
    fields: [
      { key: "insurer", label: "Insurer" },
      { key: "policy", label: "Policy or renewal date" },
      { key: "use", label: "Intended use and cruising area" },
    ],
    sections: [
      {
        name: "Hull and structural condition",
        items: x(
          "Hull exterior: osmosis, blistering, impact damage",
          "Moisture meter readings",
          "Percussion sounding for voids or delamination",
          "Keel attachment and keel bolts",
          "Rudder and steering",
          "Internal structure and bulkhead bonds",
          "Deck condition and caulking",
          "Last antifouling date",
        ),
      },
      {
        name: "Rigging and spars",
        only: "sail",
        items: x(
          "Rig configuration",
          "Standing rigging: age and renewal records",
          "Chainplates: security and corrosion",
          "Spars, as far as visible",
          "Running rigging",
          "Sails",
        ),
      },
      {
        name: "Machinery and propulsion",
        items: x(
          "Engine start and running",
          "Engine mounts, exhaust, belts and hoses",
          "Fuel system: tanks, hoses and clamps",
          "Propeller and shaft",
          "Generator, if fitted",
        ),
      },
      {
        name: "Electrical systems",
        items: x(
          "DC system and battery charger",
          "Batteries: age and installation",
          "AC shore power, outlets and breakers",
          "Electronics: GPS, radar, autopilot, VHF",
        ),
      },
      {
        name: "Plumbing and through-hulls",
        items: x(
          "Through-hull fittings and seacocks exercised",
          "Hoses and clamps below the waterline",
          "Fuel and water tanks",
          "Pressurised and hot water systems",
          "Heads",
          "Bilge pumps and alarm",
        ),
      },
      {
        name: "Gas installation",
        items: x(
          "Gas locker: drained overboard and sealed from the interior",
          "Regulator, hose and hose expiry date",
          "Solenoid valve and gas detector",
          "Appliances: flame failure devices",
        ),
      },
      {
        name: "Safety equipment",
        items: x(
          "Liferaft: service date",
          "Lifejackets",
          "Fire extinguishers: service dates",
          "Flares: expiry",
          "EPIRB: registration and battery date",
          "Navigation lights and horn",
          "Bilge alarms",
        ),
      },
      {
        name: "Documentation",
        items: x(
          "Registration and validity",
          "Design category and maximum persons",
          "Owner's records of maintenance",
        ),
      },
    ],
  },

  // ── Specialist ───────────────────────────────────────────────────────────
  {
    key: "damage",
    title: "Damage survey",
    group: "Specialist",
    summary: "After grounding, collision, heavy weather or flooding: extent of damage, fitness to move and repair scope.",
    reportTitle: "Damage Survey Report",
    style: "condition",
    scope:
      "Record the circumstances as reported and by whom. Items marked E must be resolved before the vessel is moved or returned to service. Photograph damage with a scale and note what could not be seen.",
    intro:
      "This report records a damage survey of {vessel}, carried out at {location} on {date} following the incident described below. The purpose of the survey was to establish the nature and extent of the damage, whether the vessel can safely be moved or returned to service, and the scope of repair required.\n\nThe inspection was visual and non-destructive and limited to the areas that could be accessed at the time. The circumstances of the incident are as reported to the surveyor and have not been independently verified.",
    gate: { label: "Before the vessel is moved or returned to service", explain: "Items marked E must be resolved before the vessel is moved or returned to service." },
    outcomes: RETURN_TO_SERVICE_OUTCOMES,
    fields: [
      { key: "incident_date", label: "Date of incident", type: "date" },
      { key: "incident", label: "Nature of incident", type: "textarea" },
      { key: "insurer", label: "Insurer" },
      { key: "claim_ref", label: "Claim reference" },
      { key: "attending", label: "Others attending" },
    ],
    sections: [
      {
        name: "Incident and circumstances",
        items: [
          ...e("Account of the incident recorded, with source"),
          ...x("Position, conditions and speed at the time", "Crew statements and log entries", "Actions taken after the incident"),
        ],
      },
      {
        name: "Initial safety",
        items: e(
          "No water ingress, bilges dry and pumps working",
          "Watertight integrity of hull openings",
          "Fuel, oil or gas leaks",
          "Electrical system safe to energise",
        ),
      },
      {
        name: "Hull and structure in way of damage",
        items: [
          ...e("Extent of external damage: location, size, depth", "Internal structure in way: floors, frames, stringers, bulkheads"),
          ...x("Percussion sounding and moisture readings around the damage", "Hull to deck joint in way", "Comparison with undamaged side"),
        ],
      },
      {
        name: "Keel and rudder",
        items: [
          ...e("Keel joint and keel bolts", "Keel floors and matrix: cracking or movement", "Rudder stock, bearings and blade"),
          ...x("Keel and bulb leading edge damage"),
        ],
      },
      {
        name: "Stern gear",
        items: [...e("Shaft alignment and bearing condition"), ...x("Propeller damage", "P-bracket or stern tube", "Stern gland")],
      },
      {
        name: "Deck and rig",
        only: "sail",
        items: [
          ...e("Chainplates and mast step", "Rig tension and spar condition"),
          ...x("Deck fittings, guardrails and stanchions", "Sails and running rigging"),
        ],
      },
      {
        name: "Machinery",
        items: [...e("Main engine mounts and alignment", "Engine run test"), ...x("Generator and auxiliaries", "Evidence of water in machinery")],
      },
      {
        name: "Systems",
        items: [...e("Steering system"), ...x("Electrical system and electronics", "Plumbing and through-hull fittings", "Hydraulic systems")],
      },
      {
        name: "Interior",
        items: x("Joinery and linings in way of damage", "Water damage to interior and equipment"),
      },
      {
        name: "Repair scope and costs",
        items: x(
          "Repair method proposed",
          "Areas to be opened up for further inspection",
          "Repair yard and estimate",
          "Betterment or pre-existing wear noted",
        ),
      },
    ],
  },
  {
    key: "rig",
    title: "Rig survey",
    group: "Specialist",
    summary: "Spars, standing and running rigging, aloft inspection, furling and hydraulics, and sails.",
    reportTitle: "Rig Survey Report",
    style: "condition",
    scope:
      "State whether the inspection was from deck level or aloft, and whether the rig was stepped. Record wire and rod ages from documentation where available.",
    intro:
      "This report records a rig survey of {vessel}, carried out at {location} on {date}. The purpose of the survey was to assess the condition of the spars, standing and running rigging, rig hardware and sails, and to identify work required before further use.\n\nThe inspection was visual and non-destructive. The extent of the aloft inspection and any areas that could not be reached are stated in the relevant sections.",
    outcomes: CONDITION_OUTCOMES,
    fields: [
      { key: "spar_maker", label: "Spar maker" },
      { key: "rig_age", label: "Rig and standing rigging age" },
      { key: "last_inspection", label: "Last rig inspection" },
    ],
    sections: [
      {
        name: "Documentation",
        items: x("Rig plan and specification", "Standing rigging renewal records", "Previous rig inspection reports", "Tuning records"),
      },
      {
        name: "Mast step, partners and chainplates",
        items: x(
          "Mast step and heel fitting",
          "Mast partners and wedging",
          "Chainplates and deck penetrations",
          "Chainplate attachment below deck",
          "Compression post or bulkhead under the mast",
        ),
      },
      {
        name: "Spar at deck level",
        items: x(
          "Mast tube: finish, corrosion, distortion",
          "Mast in column and rake",
          "Gooseneck and boom",
          "Vang fitting",
          "Winch and cleat mountings on the mast",
        ),
      },
      {
        name: "Aloft inspection",
        items: x(
          "Masthead fittings and sheaves",
          "Spreaders: roots, tips and angles",
          "Tangs and rigging attachments",
          "Halyard sheaves and exits",
          "Masthead lights, antennas and instruments",
          "Track and track fastenings",
        ),
      },
      {
        name: "Standing rigging and terminals",
        items: x(
          "Wire or rod condition",
          "Swage and terminal cracking",
          "Turnbuckles and toggles",
          "Split pins and locking",
          "Forestay and backstay",
          "Rig tension as found",
        ),
      },
      {
        name: "Running rigging",
        items: x("Halyards", "Sheets", "Control lines", "Blocks and shackles"),
      },
      {
        name: "Furling and hydraulics",
        items: x(
          "Headsail furler: drum, foil, swivel",
          "In-mast or in-boom furling, if fitted",
          "Hydraulic rams: vang, backstay, cylinders",
          "Hydraulic pump, lines and leaks",
        ),
      },
      {
        name: "Sails",
        items: x("Mainsail", "Headsails", "Downwind sails", "Battens, cars and slides", "Sail covers and stowage"),
      },
    ],
  },
  {
    key: "moisture-osmosis",
    title: "Moisture and osmosis survey",
    group: "Specialist",
    summary: "Moisture mapping of GRP and composite hulls and decks, with osmosis investigation and treatment advice.",
    reportTitle: "Moisture and Osmosis Survey Report",
    style: "condition",
    scope:
      "Readings depend on how long the hull has been ashore and on the weather. Record the meter, scale, time ashore and conditions, and keep the reading grid consistent if the survey is to be repeated.",
    intro:
      "This report records a moisture and osmosis survey of {vessel}, carried out at {location} on {date}. The purpose of the survey was to measure moisture levels in the hull and deck laminate, to investigate any blistering, and to advise on treatment where required.\n\nMoisture meter readings are comparative and depend on the time the hull has been ashore, the ambient conditions and the laminate. The readings in this report should be read with the conditions of survey recorded below.",
    outcomes: CONDITION_OUTCOMES,
    fields: [
      { key: "meter", label: "Moisture meter, make and model" },
      { key: "ashore_since", label: "Ashore since", type: "date" },
      { key: "conditions", label: "Ambient temperature and humidity" },
    ],
    sections: [
      {
        name: "Conditions of survey",
        items: x(
          "Time ashore before the survey",
          "Hull washed and dry",
          "Ambient temperature and humidity",
          "Meter scale and calibration",
          "Hull construction and laminate type",
        ),
      },
      {
        name: "Hull exterior",
        items: x(
          "Blistering: size, density and location",
          "Blister contents and odour, where opened",
          "Gelcoat condition: crazing, star cracks",
          "Previous osmosis treatment or barrier coat",
          "Antifouling build-up",
        ),
      },
      {
        name: "Moisture readings",
        items: x(
          "Reading grid recorded, port and starboard",
          "Waterline and boot top",
          "Keel joint and keel stub",
          "Rudder blade",
          "Topsides reference readings",
          "Through-hull fittings and transducers",
        ),
      },
      {
        name: "Deck and core",
        items: x(
          "Deck moisture readings",
          "Core condition around fittings and penetrations",
          "Percussion sounding of deck and coachroof",
        ),
      },
      {
        name: "Findings and treatment advice",
        items: x(
          "Assessment of moisture levels",
          "Treatment recommended: monitoring, drying, gelcoat removal",
          "Drying period and re-survey before coating",
        ),
      },
    ],
  },

  // ── Build and refit ──────────────────────────────────────────────────────
  {
    key: "new-build-stage",
    title: "New build stage inspection",
    group: "Build and refit",
    summary: "Owner's representative site visit during construction: records, laminating, structure and hold points.",
    reportTitle: "Site Visit",
    style: "site_visit",
    confidential: true,
    scope:
      "Check work against the specification and drawings at the stated revision. Items marked E are hold points. Ask for the record before the evidence window closes, not after.",
    intro:
      "Foreland Marine Consultancy Ltd attended {location} on {date} to inspect the construction of {vessel} on the owner's behalf. The purpose of this visit was to review progress since the previous attendance, to check the work against the build specification and drawings, and to record the documents and hold points that remain outstanding.",
    gate: { label: "Hold point", explain: "Items marked E are hold points: they must be witnessed or accepted before the yard proceeds past this stage." },
    outcomes: STAGE_OUTCOMES,
    fields: [
      { key: "yard", label: "Yard" },
      { key: "hull", label: "Hull or build number" },
      { key: "stage", label: "Build stage" },
      { key: "spec_ref", label: "Specification and drawing revision" },
    ],
    sections: [
      {
        name: "Documents and records",
        items: [
          ...e("Lamination plan or layup drawing received and checked against the specification"),
          ...x(
            "Builder Book lamination record completed and signed",
            "Yard quality control records and checklists",
            "Material certificates and delivery notes",
            "Resin identity and batch numbers checked against drums",
            "Technical documentation released, NDA in place if required",
          ),
        ],
      },
      {
        name: "Laminating and infusion",
        items: [
          ...e("Dry stack checked against the layup schedule before bagging", "Vacuum drop test logged to the agreed pass criteria"),
          ...x(
            "Resin, mould, reinforcement and ambient temperatures recorded",
            "Humidity through infusion and cure",
            "Resin batch recorded against delivery note",
            "Test coupons and resin witness samples retained",
            "Infusion start and finish times",
          ),
        ],
      },
      {
        name: "Moulding condition after infusion",
        items: [
          ...e("Stem, keel and chainplate reinforcement checked against the schedule before being covered"),
          ...x(
            "Wet-out and consolidation",
            "Dry spots, porosity or resin starvation",
            "Bridging in tight radii",
            "Resin-rich areas and whitening",
            "Exposed core or voids",
            "Gelcoat and hull exterior at de-moulding",
          ),
        ],
      },
      {
        name: "Structure",
        items: [
          ...e("Ballast encapsulation witnessed, lead mass documented against the drawing", "Hull weight recorded at de-moulding"),
          ...x(
            "Stringers and longitudinals positioned and bonded",
            "Bulkheads positioned against datum and bonded",
            "Secondary bond preparation",
            "Engine girders against the correct drawing revision",
          ),
        ],
      },
      {
        name: "Deck and inserts",
        items: [
          ...e("Mould inserts fitted and sealed before deck lay-up is closed"),
          ...x("Deck laminate condition", "Hardware backing and insert positions", "Hull to deck joint preparation"),
        ],
      },
      {
        name: "Installation and outfit",
        items: x(
          "Engine installation and alignment",
          "Cable glands at bulkhead penetrations",
          "Hose routing and chafe protection",
          "Electrical labelling and documentation",
          "Deck hardware fastening and marking",
          "Protection of finished surfaces",
        ),
      },
      {
        name: "Programme and records outstanding",
        items: x(
          "Progress against the yard programme",
          "Revised programme requested where dates have moved",
          "Next hold points and notice period agreed",
          "Records requested from the yard",
        ),
      },
    ],
  },
  {
    key: "warranty",
    title: "Warranty inspection",
    group: "Build and refit",
    summary: "Inspection before the builder's warranty expires, so defects are recorded while the yard remains responsible.",
    reportTitle: "Warranty Inspection Report",
    style: "site_visit",
    confidential: true,
    scope:
      "Record every defect that may fall under the builder's warranty, with photographs and location. Note the date each defect was first reported to the yard, if known.",
    intro:
      "Foreland Marine Consultancy Ltd attended {location} on {date} to inspect {vessel} before the expiry of the builder's warranty. The purpose of this inspection was to identify and record defects that may fall within the warranty, so that they can be notified to the yard while it remains responsible for them.",
    outcomes: WARRANTY_OUTCOMES,
    fields: [
      { key: "yard", label: "Yard" },
      { key: "delivery_date", label: "Delivery date", type: "date" },
      { key: "warranty_expiry", label: "Warranty expiry", type: "date" },
    ],
    sections: [
      {
        name: "Hull",
        items: x("Hull exterior and gelcoat or paint", "Underwater hull, keel and rudder", "Internal structure and bonds", "Through-hull fittings"),
      },
      {
        name: "Deck",
        items: x("Deck surface and caulking", "Hatches and ports: leaks and seals", "Deck hardware fastenings", "Leaks into the interior"),
      },
      {
        name: "Rig",
        only: "sail",
        items: x("Spars and fittings", "Standing rigging tension and terminals", "Chainplates", "Furling and hydraulics"),
      },
      {
        name: "Machinery",
        items: x("Main engine installation and service record", "Generator", "Shaft and alignment", "Steering", "Leaks and vibration"),
      },
      {
        name: "Electrical",
        items: x("Distribution and circuit protection", "Batteries and charging", "Shore power", "Faults reported by the crew"),
      },
      {
        name: "Plumbing",
        items: x("Fresh water system", "Black and grey water", "Bilge pumping", "Hoses and clamps"),
      },
      {
        name: "Interior",
        items: x("Joinery: movement, cracking, finish", "Soles and headlinings", "Upholstery", "Doors and catches"),
      },
      {
        name: "Systems",
        items: x("Air conditioning and heating", "Navigation and electronics", "Galley appliances", "Watermaker"),
      },
      {
        name: "Documentation and as-fitted records",
        items: x(
          "As-fitted drawings and wiring diagrams",
          "Equipment manuals and warranty cards",
          "Defects previously reported to the yard and their status",
        ),
      },
    ],
  },
  {
    key: "refit-acceptance",
    title: "Refit completion and acceptance",
    group: "Build and refit",
    summary: "Inspection of completed refit work against the agreed work list before acceptance and final payment.",
    reportTitle: "Refit Inspection Report",
    style: "site_visit",
    confidential: true,
    scope:
      "Inspect each work list item against its specification. Items marked E must be cleared before acceptance. Anything left open goes on the snag list with an agreed completion date.",
    intro:
      "Foreland Marine Consultancy Ltd attended {location} on {date} to inspect the refit works completed on {vessel}. The purpose of this inspection was to check the completed work against the agreed work list and specification, to record any items not yet complete or not to the required standard, and to advise whether the work can be accepted.",
    gate: { label: "Before acceptance", explain: "Items marked E must be cleared before the work is accepted and final payment released." },
    outcomes: ACCEPTANCE_OUTCOMES,
    fields: [
      { key: "yard", label: "Yard" },
      { key: "worklist", label: "Refit work list reference" },
      { key: "completion", label: "Planned completion", type: "date" },
    ],
    sections: [
      {
        name: "Work list and records",
        items: [
          ...e("Each work list item inspected and signed off"),
          ...x("Variations agreed in writing", "Material certificates and test records", "As-fitted drawings updated"),
        ],
      },
      {
        name: "Hull and structure",
        items: [...e("Structural repairs completed to specification"), ...x("Paint or gelcoat finish", "Antifouling and anodes", "Through-hull fittings renewed or serviced")],
      },
      {
        name: "Deck and rig",
        items: [...e("Deck penetrations watertight"), ...x("Deck hardware refitted and sealed", "Rig restepped and tuned, if applicable")],
      },
      {
        name: "Machinery",
        items: [...e("Engine and generator run under load"), ...x("Alignment after launch", "Service records completed")],
      },
      {
        name: "Electrical and systems",
        items: [...e("Systems commissioned and tested"), ...x("Labelling and documentation", "Navigation equipment tested")],
      },
      {
        name: "Interior and finish",
        items: x("Joinery and finishes", "Protection removed and surfaces cleaned", "Damage during the refit"),
      },
      {
        name: "Sea trial and handover",
        items: [...e("Sea trial carried out and results recorded"), ...x("Snag list agreed with completion dates", "Retention or final payment terms")],
      },
    ],
  },

  // ── Compliance ───────────────────────────────────────────────────────────
  {
    key: "scv-coding",
    title: "Small commercial vessel coding pre-inspection",
    group: "Compliance",
    summary: "Readiness check for a yacht under 24m ahead of small commercial vessel coding for charter or commercial use.",
    reportTitle: "Coding Pre-Inspection Report",
    style: "insurance",
    scope:
      "This is a pre-inspection against the applicable small commercial vessel code for the intended area category. The coding examination itself is carried out by a Certifying Authority. Note each item the Certifying Authority is likely to raise.",
    intro:
      "This pre-inspection of {vessel} was carried out at {location} on {date} to assess her readiness for coding under the applicable small commercial vessel code, for the area category and use stated below.\n\nThe pre-inspection covered documentation and stability, construction and watertight integrity, machinery and electrical installations, life-saving and fire safety equipment, navigation and radio equipment, and manning. It does not replace the coding examination, which is carried out by a Certifying Authority.",
    outcomes: READINESS_OUTCOMES,
    fields: [
      { key: "authority", label: "Certifying Authority" },
      { key: "area", label: "Intended area category" },
      { key: "use", label: "Intended use and persons carried" },
    ],
    sections: [
      {
        name: "Documentation and stability",
        items: x(
          "Registration",
          "Stability information appropriate to the area category",
          "Builder's documentation and drawings",
          "Previous coding certificates and records",
        ),
      },
      {
        name: "Construction and watertight integrity",
        items: x(
          "Hull construction and condition",
          "Watertight bulkheads, if required",
          "Through-hull fittings and seacocks",
          "Cockpit drainage",
        ),
      },
      {
        name: "Freeboard and weathertight openings",
        items: x("Freeboard marks or records", "Hatches and doors: weathertight", "Ventilators and closures", "Companionway washboards secured"),
      },
      {
        name: "Machinery",
        items: x("Main engine installation", "Fuel system and shut-offs", "Exhaust system", "Engine space ventilation"),
      },
      {
        name: "Electrical",
        items: x("Battery installation and isolation", "Circuit protection", "Cable condition and support", "Emergency lighting"),
      },
      {
        name: "Steering",
        items: x("Main steering", "Emergency steering"),
      },
      {
        name: "Bilge pumping",
        items: x("Number and capacity of bilge pumps", "Manual pump operable with hatches closed", "Bilge alarm"),
      },
      {
        name: "Life-saving appliances",
        items: x(
          "Liferaft: capacity and service",
          "Lifejackets: number and lights",
          "Lifebuoys, lights and lines",
          "Flares",
          "EPIRB",
          "Man overboard recovery",
        ),
      },
      {
        name: "Fire safety",
        items: x("Portable extinguishers: number, type, service", "Fire blanket", "Engine space fire suppression", "Gas installation and detection"),
      },
      {
        name: "Navigation lights, shapes and sound signals",
        items: x("Navigation lights", "Day shapes", "Sound signals"),
      },
      {
        name: "Radio and navigation equipment",
        items: x("VHF DSC and licence", "Handheld VHF", "Compass and deviation card", "Charts and publications", "Radar reflector"),
      },
      {
        name: "Medical stores and manning",
        items: x("Medical stores for the area category", "Skipper qualification", "Crew qualifications and safety training"),
      },
      {
        name: "Anchoring and towing",
        items: x("Anchors and cable: size and length", "Windlass", "Towline and strong points"),
      },
    ],
  },
  {
    key: "flag-class-readiness",
    title: "Flag and class inspection readiness",
    group: "Compliance",
    summary: "Readiness check for a yacht over 24m ahead of flag state or class inspection.",
    reportTitle: "Inspection Readiness Report",
    style: "insurance",
    scope:
      "Check certificates and records first, then equipment. Record expiry and service dates. The inspection itself is carried out by the flag state or classification society surveyor.",
    intro:
      "This readiness inspection of {vessel} was carried out at {location} on {date} ahead of the flag state or class inspection stated below. The purpose was to identify items likely to be raised at the inspection, so that they can be addressed beforehand.\n\nThe inspection covered statutory certificates, crew certification, life-saving and fire safety equipment, machinery and emergency systems, pollution prevention, navigation and radio, and safety management records. It does not replace the inspection by the flag state or classification society.",
    outcomes: READINESS_OUTCOMES,
    fields: [
      { key: "flag", label: "Flag" },
      { key: "class_society", label: "Classification society" },
      { key: "inspection", label: "Inspection type" },
      { key: "inspection_date", label: "Inspection date", type: "date" },
    ],
    sections: [
      {
        name: "Statutory certificates",
        items: x(
          "Certificate of registry",
          "Tonnage certificate",
          "Load line certificate",
          "Safety equipment certificate",
          "Radio certificate and licence",
          "IOPP certificate, where applicable",
          "ISPP certificate, where applicable",
          "IAPP certificate, where applicable",
          "MLC certification and crew accommodation",
          "ISM DOC and SMC, where applicable",
          "ISPS certification, where applicable",
          "Minimum safe manning document",
          "Class certificates and conditions of class",
        ),
      },
      {
        name: "Crew certification",
        items: x(
          "Certificates of competency and endorsements",
          "Flag state endorsements",
          "Medical certificates",
          "Basic safety training and refreshers",
          "Crew list matches safe manning",
        ),
      },
      {
        name: "Life-saving appliances",
        items: x(
          "Liferafts: capacity and service dates",
          "Hydrostatic releases",
          "Rescue boat or tender and launching arrangements",
          "Lifejackets and immersion suits",
          "Lifebuoys, lights and smoke signals",
          "Pyrotechnics: expiry",
          "EPIRB and SART",
        ),
      },
      {
        name: "Fire safety",
        items: x(
          "Fire detection system tested",
          "Fixed firefighting systems and service records",
          "Fire dampers and remote closures",
          "Portable extinguishers: service dates",
          "Fireman's outfits and breathing apparatus",
          "Fire control plans posted and current",
          "Emergency fuel shut-offs",
        ),
      },
      {
        name: "Machinery and emergency systems",
        items: x(
          "Emergency generator or emergency power source tested",
          "Steering gear and emergency steering test",
          "Emergency lighting",
          "Bilge pumping and alarms",
          "Quick-closing valves",
        ),
      },
      {
        name: "Pollution prevention",
        items: x(
          "Oily water separator and oil record book",
          "Garbage management plan and record",
          "Sewage system and discharge arrangements",
          "Ballast water management, where applicable",
        ),
      },
      {
        name: "Navigation and radio",
        items: x(
          "Navigation equipment and charts corrected",
          "GMDSS equipment and log",
          "AIS and VDR, where fitted",
          "Navigation lights, shapes and sound signals",
        ),
      },
      {
        name: "ISM records and drills",
        items: x(
          "Safety management system aboard and current",
          "Drill records: fire, abandon ship, man overboard",
          "Non-conformities closed out",
          "Planned maintenance records",
        ),
      },
      {
        name: "Accommodation and safety signage",
        items: x("Escape routes clear and marked", "Safety signage and muster lists", "Accommodation standards", "Galley safety"),
      },
    ],
  },

  // ── Passage ──────────────────────────────────────────────────────────────
  {
    key: "pre-passage",
    title: "Pre-passage seaworthiness inspection",
    group: "Passage",
    summary: "Seaworthiness check before a delivery or offshore passage: watertight integrity, machinery, safety and planning.",
    reportTitle: "Pre-Passage Inspection Report",
    style: "insurance",
    scope:
      "Items marked E must be satisfactory before the vessel departs. Set the passage limits in writing and brief the crew on any defect being carried.",
    intro:
      "This pre-passage inspection of {vessel} was carried out at {location} on {date} ahead of the passage stated below. The purpose was to assess whether the vessel, her equipment and her crew are fit for the intended passage, and to set any conditions that apply.\n\nThe inspection covered watertight integrity, rig, machinery, steering, electrical and navigation systems, safety equipment, and the passage plan. It reflects the condition of the vessel on the day of inspection only.",
    gate: { label: "Before departure", explain: "Items marked E must be satisfactory before the vessel departs." },
    outcomes: PASSAGE_OUTCOMES,
    fields: [
      { key: "departure", label: "Departure" },
      { key: "destination", label: "Destination" },
      { key: "crew", label: "Crew and experience" },
      { key: "window", label: "Weather window" },
    ],
    sections: [
      {
        name: "Hull and watertight integrity",
        items: e(
          "Seacocks, skin fittings and hoses",
          "Hatches, ports and washboards secure",
          "Bilges dry, no ingress",
          "Stern gland and rudder bearings",
        ),
      },
      {
        name: "Rig",
        only: "sail",
        items: [...e("Standing rigging and terminals", "Chainplates", "Rig tension"), ...x("Sails and reefing", "Running rigging")],
      },
      {
        name: "Machinery and fuel",
        items: e(
          "Main engine: start, run under load, cooling, oil, belts",
          "Fuel: quantity for passage plus reserve, clean, spare filters aboard",
          "Spares and tools for likely failures",
        ),
      },
      {
        name: "Steering",
        items: e("Steering lock to lock", "Emergency tiller aboard and fits", "Autopilot"),
      },
      {
        name: "Electrical and charging",
        items: e("Batteries and charging", "Navigation lights"),
      },
      {
        name: "Navigation and communications",
        items: [...e("Position fixing and charts for the route", "VHF and DSC"), ...x("Long-range communications", "Weather routing arranged")],
      },
      {
        name: "Safety equipment",
        items: e(
          "Liferaft: capacity and service date",
          "Lifejackets and harnesses, jacklines rigged",
          "EPIRB and personal locator beacons",
          "Flares in date",
          "Fire extinguishers",
          "Bilge pumps, electric and manual, and high water alarm",
          "Man overboard recovery",
        ),
      },
      {
        name: "Passage planning and crew",
        items: e(
          "Passage plan: route, distance, ports of refuge",
          "Passage limits set: wind, sea state, daylight",
          "Crew numbers and experience for the passage",
          "Crew safety briefing",
          "Shore contact and reporting schedule",
          "Insurer notified where required",
        ),
      },
    ],
  },
];
