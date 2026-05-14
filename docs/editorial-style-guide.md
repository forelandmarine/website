# Foreland Marine Editorial Style Guide

**Purpose:** Define the voice, tone, vocabulary, and structural patterns used across forelandmarine.com so future copy reads as if written by the same hand. Use this when drafting new pages, expanding services, writing insights articles, or briefing freelancers.

This guide complements `brand-identity-kit.md` (visual identity, colour, typography). It deepens the "Voice and Tone" section of that document into a working manual with examples from live site copy.

---

## 1. The voice in one paragraph

Foreland Marine writes like a senior consultant briefing a sophisticated owner over a quiet table. Calm, technically literate, and direct. We assume the reader is intelligent, time-poor, and capable of evaluating evidence. We make declarative claims, support them with specifics, and never oversell. The reader should feel respected, not pitched to.

---

## 2. Voice attributes

### Calm authority
We sound like people who have seen the job done many times. We do not raise our voice. Statements are measured even when the underlying point is strong.

- Yes: "Every recommendation we make serves one interest: the owner's."
- No: "We are 100% committed to putting owners first, always."

### Independent and direct
Independence is the central commercial story. We say what others will not. We are transparent about costs, risks, conflicts, and what we do not do.

- Yes: "We do not sell yachts, broker charter, or earn commissions from suppliers."
- No: "We work closely with a trusted network of yards and brokers."

### Technical without jargon overload
We use the precise word when it is the right word (ISM, MLC, classification society, hydraulic, carbon rig, GT). We do not invent technical-sounding language to look credible. If a sentence would land for both a Chief Engineer and an owner, it is right.

- Yes: "Survey schedules, statutory inspections, certification renewals, and flag state correspondence coordinated centrally to minimise disruption to the vessel programme."
- No: "We provide best-in-class regulatory synergies across the marine compliance landscape."

### Restrained confidence
We avoid superlatives. Specifics earn trust; adjectives do not. Where a number, a vessel, a process, or a qualification can replace a boast, use it.

- Yes: "Over 100,000 nautical miles in his logbook. Chief Engineer on J Class Lionheart."
- No: "World-class engineer with unmatched experience."

### Quietly British
British English throughout. Restrained, slightly formal register. Comfortable with longer sentences when they earn their length. No Americanisms (no "leverage", "reach out", "circle back", "deep dive", "best in class").

---

## 3. The reader

Write to one of three personas:

1. **The yacht owner.** Time-poor, financially literate, may be new to the build or refit world. Wants confidence that no one is taking advantage. Values clarity, independence, and the absence of upsell.
2. **The captain or build engineer.** Technically deep. Will notice imprecise language immediately. Wants to know we understand the actual work.
3. **The introducer (broker-adjacent, lawyer, family office advisor).** Wants to know we are credible, reliable, and will not embarrass them.

Default tone: written to (1), with enough specificity that (2) and (3) trust it.

---

## 4. Spelling and mechanics

| Rule | Notes |
|------|-------|
| British English | colour, specialise, programme, metre, organisation, optimisation, harbour, manoeuvre. |
| No em-dashes or en-dashes | Use commas, full stops, colons, or rephrase. This rule is non-negotiable across all copy and code. |
| No exclamation marks | In editorial copy. Permitted only in confirmation microcopy ("Message sent!") and only when absolutely natural. |
| Oxford comma | Use it when it aids clarity, especially in lists of services or qualifications. |
| Numbers | Spell out one to nine; numerals for 10 and above. Always numerals for measurements, currency, GT figures, vessel sizes, dates, and percentages. |
| Vessel sizes | Always metres. "24m", "60m", "a 36m performance sailing yacht". Never feet, never LOA suffix unless technical context demands it. |
| Currency | EUR for international, GBP for UK-specific. Use ISO codes followed by figures: "EUR 500,000", "GBP 30m". |
| Yacht names | Italicised on first and subsequent reference: *Lionheart*, *Shamrock V*, *Antoinette*, *Balthasar*. Use the JSX `<i>` tag in TSX content. |
| "Yacht" vs "boat" | Always "yacht" for vessels over 24m. Never "boat". |
| Capitalisation | Title case for headings and section labels. Sentence case for sub-headings within service cards is acceptable. Roles are capitalised when paired with a name (Chief Engineer, Captain, Naval Architect). |
| Quotation marks | Curly typographer's quotes in prose. Apostrophes encoded as `&apos;` in JSX strings. |
| Acronyms | First mention spelled out with acronym in parentheses: "International Safety Management (ISM)". Subsequent mentions use the acronym alone. ISM, MLC, P&I, GT, SYBAss, YORR are considered known after first use on the page. |

---

## 5. Vocabulary

### Use

- Independent, independence
- Owner, owner's interests, on the owner's side
- Oversight, supervision, representation
- Programme, project, build, refit, campaign
- Discipline, rigour, precision
- Technical, mechanical, hydraulic, electrical, systems
- Quietly, measured, considered, practical, detail driven
- Worldwide, global reach, local insight
- Vessel, yacht (never "boat")
- Performance sailing, race winning, race course
- Specification, scope, brief, contract, milestone
- Class, flag, classification society, survey
- Crew, Captain, Chief Engineer, Naval Architect

### Avoid

- World-class, best-in-class, unparalleled, premier, leading, top-tier (when generic), unmatched
- Bespoke, curated, tailored (over-used in luxury writing; only when literally true)
- Synergy, ecosystem, end-to-end (unless precisely accurate), holistic, journey
- "We pride ourselves on", "passionate about", "dedicated team"
- "Reach out", "touch base", "circle back", "deep dive", "double down"
- "Boutique", "concierge", "white glove" (these are tells of generic luxury copy)
- "Excited to", "thrilled to", "delighted to"
- Empty intensifiers: very, really, truly (often), absolutely, incredibly
- "Solutions" as a noun for services. We provide services, oversight, management, consultancy. Not "solutions".

### Used carefully

- "Race winning" is permitted because it describes literal outcomes the team has delivered. Use it where the supporting evidence exists, not as a flourish.
- "Trusted" is permitted but never as self-description. "A trusted expert" is fine; "we are trusted" is not.

---

## 6. Headlines and hero copy

### Pattern: two-clause, full-stopped, line-broken

The signature headline form is two short clauses, each ending in a full stop, broken across two lines.

Examples from live copy:

- "Smooth sailing. / Every time."
- "On the owner's side, / by the captain's side"
- "Engineering excellence, / on every ocean."
- "Your guiding light through the storm."

### Headline rules

- Light weight typography (`font-light`) does the lifting. The words can be plain because the type is restrained.
- No questions in headlines.
- No verbs in the imperative ("Discover...", "Experience...", "Unlock...").
- Lyric is allowed. "Your guiding light through the storm" is the brand at its most romantic, anchored by the lighthouse heritage. Use lyric sparingly and never twice on the same page.
- Sub-headlines in section blocks use sentence-case statements: "Comprehensive management services", "What sets us apart", "The engineering beneath the waterline".

### Hero sub-paragraph

One paragraph, two to three sentences, follows the hero headline. It must:

1. State the offer plainly in the first sentence.
2. Add scope and specificity (services, vessel range, geography) in the second.
3. Stop. No third claim.

Reference example:

> "Independent superyacht consultancy. Project management, owner's representation and yacht management for sailing and motor yachts from 24 to 60 metres, worldwide."

---

## 7. Body copy

### Paragraph shape

- One idea per paragraph.
- Lead sentence states the claim. Following sentences support with specifics: process steps, numbers, named systems, named qualifications.
- Three to five sentences is typical. Four is the sweet spot. Avoid one-sentence paragraphs in body sections; reserve them for hero areas.

### Sentence shape

- Mix lengths. Longer sentences are allowed when they list legitimate detail. Follow them with a short sentence to land the point.
- Active voice by default. Passive is acceptable when the actor is genuinely unimportant or when the construction reads more naturally in British register.
- Lists inside sentences should be comma-separated and use the Oxford comma: "specification, procurement oversight, installation supervision, and commissioning".

### Concrete over abstract

Every paragraph should earn a concrete: a system, vessel, qualification, location, timeframe, regulation, or named process.

- Concrete: "Continuous on-site presence throughout the construction period. Attendance at production meetings, milestone inspections, financial tracking, and structured reporting to the owner."
- Abstract: "We provide ongoing support and partnership throughout your journey."

### Service card body

Service cards follow a tight three-beat structure:

1. **What it is** in plain terms.
2. **What is included**, listed inside one or two sentences.
3. **Why it matters** to the owner, or a proprietary edge.

Reference:

> "Full ISM Code implementation for 500 GT+ vessels, including Safety Management System development, internal audits, corrective action tracking, and incident management. For vessels below 500 GT, we develop voluntary safety management systems aligned with ISM principles, giving owners the same rigorous safety framework regardless of vessel size. Our proprietary Lightship ISM platform provides real-time compliance visibility across the fleet."

### Bios

Bios are written in the third person, present tense for the active period, past tense for completed appointments. They lead with the strongest single credential, follow with named vessels and programmes, and close with a humanising note (a personal yacht, a discipline, a qualification outside the obvious).

- Lead with credentials and named vessels in italics.
- Use "and" naturally; do not list everything the person has ever done.
- One closing personal detail is welcome. It signals confidence, not lightness.

Reference:

> "A lifelong sailor with over 100,000 nautical miles in his logbook, Jack is a highly experienced racing yacht systems engineer and yachtsman. He has served as Chief Engineer on J Class *Lionheart* and Chief Build Engineer on the landmark restoration of *Shamrock V*... He also campaigns his own yacht, the 1936 Teal class *Antoinette* in the Solent."

---

## 8. Microcopy

### Buttons

- Primary CTA on the homepage: "Get in touch" (not "Contact us", not "Reach out"). On service pages: "Our Services", "Get in touch".
- Forms: "Send Message" while idle, "Sending..." while loading.
- Section labels (the small uppercase eyebrow text): "Our Services", "Why Foreland", "What We Offer", "About Us". Title case, two to three words, no full stop.

### Form states

- Idle placeholder: "Tell us about your project..." (lower case, ellipsis).
- Success: "Message sent! We'll be in touch shortly."
- Error: "Something went wrong. Please try again or email us directly."

### Loading and empty states

- Honest, not coy. "Sending...", not "Working our magic...".

---

## 9. Structural patterns

### The "What sets us apart" / "Why Foreland" block

Three cards, each with:

- A short capitalised noun phrase title: "Truly Independent", "Technical Depth", "Transparent Reporting".
- Two paragraphs of body.
- Paragraph 1 makes the claim. Paragraph 2 explains the mechanism or the operational consequence.

### The process block (new build, refit)

Five numbered steps. Each step has:

- Two-digit number ("01", "02"...).
- Three-to-four-word title in title case.
- A timeframe range expressed as "X to Y months".
- A single descriptive sentence or short paragraph.

### The FAQ block (for JSON-LD and on-page)

Answers are written for both human readers and AI extraction. They:

- Begin with a direct answer to the question, not a preamble.
- State the scope and specifics in the same paragraph.
- Are between two and four sentences.
- Reuse the same vocabulary the rest of the site uses (ISM, MLC, classification society, owner's interest, independence).

---

## 10. Things we always say (and how)

### Independence

The independence claim appears on most service pages. It is always specific, never generic.

- The canonical form: "No yard affiliations, no broker commissions, no referral fees."
- The expanded form: "We do not sell yachts, broker charter, or earn commissions from suppliers. There is no adjacent business that profits when you spend more, change yacht, or enter the charter market."
- The closing form: "Every recommendation we make serves one interest: the owner's."

### Vessel range

"Sailing and motor yachts from 24 to 60 metres" or "yachts over 24m". Always include the lower bound. Performance sailing focus is named separately when relevant.

### Geography

"Worldwide" is the default. The expanded form names the network: "Based in London, with a network of experienced professionals in Antibes, Palma de Mallorca, Fort Lauderdale, Antigua, the Netherlands, Germany, Italy and other key maritime centres."

### The lighthouse heritage

Used once per page maximum, and only on pages where the brand story is welcome (homepage, about). The canonical phrasing:

> "The company takes its name from the South Foreland Lighthouse in Kent, a historic navigational landmark that has guided vessels into the Thames Estuary since the 17th century..."

Never overplay this. The lighthouse is a metaphor, not a recurring motif.

---

## 11. SEO copy

For search-driven sections (meta descriptions, structured data answers, hidden FAQs), apply the same voice with two adjustments:

1. Front-load the keyword phrase in the first sentence without contorting the sentence.
2. Prefer the explicit naming of services, vessel size ranges, and qualifications, since these are the strings users and engines match against.

Meta description target: 150 to 160 characters. Open with the service category, name the differentiator, end with vessel range or geography.

Reference:

> "Independent superyacht consultancy. New build owner's representation, yacht refit project management and yacht management for vessels 24 to 60m, worldwide."

---

## 12. What we do not write

- Marketing platitudes ("We turn dreams into reality").
- Origin myths beyond the lighthouse line.
- Founder quotes inside body copy (use them sparingly on social, never on service pages).
- Customer testimonials without named provenance.
- "Our story" narratives that lean on personality over evidence.
- Anything that would not survive being read aloud to a Chief Engineer.

---

## 13. Self-check before publishing

Read the draft against this list. If any answer is "no" or "unclear", revise.

1. Could a generic luxury consultancy have written this paragraph? If yes, add specifics or cut.
2. Does every claim have evidence somewhere on the page (process, qualification, vessel, system, regulation)?
3. Are there any em-dashes or en-dashes? Remove and rephrase.
4. Are there any superlatives ("best", "world-class", "premier")? Replace with specifics.
5. Does the headline follow the two-clause or single-sentence pattern? Does it avoid imperatives?
6. Is the independence claim stated where appropriate, in the canonical form?
7. Does the page name at least one specific vessel, qualification, regulation, or process?
8. Read aloud. Does it sound like a senior consultant briefing an owner? If it sounds like an agency, rewrite.
