# Foreland Marine Consultancy - Brand Identity Kit

**Version:** 1.0
**Date:** April 2026

---

## Brand Overview

Foreland Marine Consultancy is an independent superyacht consultancy specialising in yacht management, new build owner's representation, refit project management, and technical consultancy for sailing and motor yachts between 24 and 60 metres. Named after the South Foreland Lighthouse in Kent, the brand conveys guidance, safety, and expertise.

**Tagline:** Smooth sailing. Every time.

**Secondary tagline:** Your guiding light through the storm.

**Positioning:** Independent. No yard affiliations, no broker commissions, no referral fees. Expert advice with no conflicts of interest.

---

## Logo

### Primary Logo
- **File:** `foreland-marine-white.svg`
- **Format:** SVG (vector, infinitely scalable)
- **Colour:** White on dark backgrounds
- **Minimum width:** 204px digital, 50mm print
- **Clear space:** Maintain a margin equal to the height of the lighthouse icon on all sides

### Icon Mark
- **File:** `foreland-icon-white.svg`
- **Use:** Favicon, app icons, social media profile images, small-format applications
- **Description:** Lighthouse icon with signal beam

### Logo Variants
| Variant | File | Use Case |
|---------|------|----------|
| Full logo (white) | `foreland-marine-white.svg` | Dark backgrounds, website, presentations |
| Full logo (colour) | `foreland-marine.png` | Light backgrounds, print, documents |
| Icon only (white) | `foreland-icon-white.svg` | Social media avatars, favicons |

### Logo Don'ts
- Do not place the white logo on light backgrounds
- Do not alter the proportions or spacing between the icon and wordmark
- Do not add effects (drop shadows, gradients, outlines)
- Do not rotate or skew the logo
- Do not use the logo at sizes below 204px / 50mm width

---

## Colour Palette

### Primary Colours

| Name | Hex | RGB | Use |
|------|-----|-----|-----|
| **Deep Navy** (bg0) | `#040D1A` | 4, 13, 26 | Deepest backgrounds, footer |
| **Navy** (bg1) | `#081630` | 8, 22, 48 | Primary page background |
| **Dark Blue** (bg2) | `#0C1E42` | 12, 30, 66 | Cards, elevated surfaces |
| **Ocean Blue** (accent) | `#5386B6` | 83, 134, 182 | Buttons, links, interactive elements, accent bars |
| **White** | `#FFFFFF` | 255, 255, 255 | Primary text, headings |

### Secondary Colours

| Name | Hex | RGB | Use |
|------|-----|-----|-----|
| **Muted Blue** (muted) | `#7BA8C8` | 123, 168, 200 | Secondary text, descriptions, body copy |
| **Green** | `#22C55E` | 34, 197, 94 | Success states, positive indicators |

### Opacity System

The brand uses white at various opacities to create depth and hierarchy on dark backgrounds. This is central to the visual language.

| Opacity | Value | Use |
|---------|-------|-----|
| `white/5` | 5% | Hover backgrounds |
| `white/8` | 8% | Subtle borders, dividers |
| `white/10` | 10% | Card borders, section dividers |
| `white/20` | 20% | Active borders, outline buttons |
| `white/30` | 30% | Prominent borders, outline button default |

### Colour Rules
- Always use the dark palette as the base. Foreland Marine does not use light/white page backgrounds.
- The accent colour (`#5386B6`) should be used sparingly for interactive elements and emphasis. It should never dominate a layout.
- Body text uses the muted blue (`#7BA8C8`), not white. White is reserved for headings and emphasis.
- Never use saturated or bright colours outside the defined palette.

---

## Typography

### Font Family
**Nunito Sans** (Google Fonts)

A geometric sans-serif with a warm, approachable character. Chosen for legibility at all sizes and its range of weights from light to bold.

### Weights

| Weight | Value | Use |
|--------|-------|-----|
| **Light** | 300 | Page headings (H1, H2), large display text. This is the signature weight. |
| **Regular** | 400 | Body copy, paragraphs |
| **Semi-Bold** | 600 | Buttons, labels, section markers, emphasis |
| **Bold** | 700 | Rare. Strong emphasis only. |

### Font Stack
```
"Nunito Sans", "Aptos", system-ui, sans-serif
```

### Type Scale

| Element | Size | Weight | Colour | Tracking |
|---------|------|--------|--------|----------|
| H1 | text-3xl to text-5xl (responsive) | Light (300) | White | Normal |
| H2 | text-2xl to text-3xl (responsive) | Light (300) | White | Normal |
| H3 | text-base | Semi-Bold (600) | White | Normal |
| Body | text-sm to text-base | Regular (400) | Muted (#7BA8C8) | Normal |
| Section Label | text-xs | Semi-Bold (600) | Accent (#5386B6) | tracking-widest (0.15em) |
| Button | text-sm | Semi-Bold (600) | White | Normal |
| Caption | text-xs | Regular (400) | Muted at 50-70% opacity | Normal |

### Typography Rules
- Headings are always **font-light (300)**. This is the most distinctive typographic choice in the brand. Never use bold for page headings.
- Section labels (e.g. "Our Services", "Running Cost Calculator") use uppercase, widest tracking, accent colour, and semi-bold weight.
- Body text is kept at text-sm or text-base, never larger.
- Line height should be relaxed for body text (`leading-relaxed`).

---

## Iconography

The brand does not use an icon library. All icons are inline SVGs with the following properties:

| Property | Value |
|----------|-------|
| Stroke width | 1.5 - 1.8px |
| Stroke linecap | Round |
| Stroke linejoin | Round |
| Default size | 16-22px |
| Default colour | `currentColor` (inherits from text) |

Arrow icons for links and navigation use a consistent pattern:
```html
<svg width="14" height="14" viewBox="0 0 12 12" fill="none">
  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" />
</svg>
```

---

## UI Components

### Buttons

**Primary Button**
- Background: `#5386B6` (accent)
- Text: White, semi-bold, text-sm
- Padding: 24px horizontal, 12px vertical
- Border radius: 4px
- Hover: accent at 90% opacity
- Transition: colours, 150ms

**Outline Button**
- Border: white at 30% opacity
- Text: White, semi-bold, text-sm
- Padding: 24px horizontal, 12px vertical
- Border radius: 4px
- Hover: white background at 10% opacity
- Transition: colours, 150ms

### Cards

**Service Card**
- Background: `#0C1E42` (bg2)
- Border: white at 8% opacity
- Left accent bar: 4px wide, accent colour at 70% opacity
- Hover: border transitions to accent at 30% opacity
- Padding: 32px (with 36px left to accommodate accent bar)

**Content Card (tools, results)**
- Background: `#0C1E42` at 60-80% opacity
- Border: white at 8-10% opacity
- Border radius: 4px (rounded) or 8px (rounded-lg)
- Hover: border transitions to accent at 40% opacity

### Navigation

**Desktop**
- Sticky header, 80px height
- Background: `#081630` at 95% opacity with backdrop blur
- Bottom border: white at 8% opacity
- Links: muted text, hover to white with 5% white background
- Dropdown menus: bg1 with 10% white border, dark shadow

**Mobile**
- Full-screen overlay below header
- Background: `#081630` (solid)
- Body scroll locked when open
- Rendered outside header element (to avoid backdrop-blur containing block issue)

---

## Animation

### Scroll Animations

All scroll-triggered animations use Intersection Observer with:
- **Threshold:** 0.15
- **Root margin:** 0px 0px -40px 0px
- **Duration:** 0.7s
- **Easing:** ease-out
- **Fill mode:** forwards

| Animation | Effect |
|-----------|--------|
| `fade-up` | Opacity 0 to 1, translateY 32px to 0 |
| `fade-in` | Opacity 0 to 1 |
| `slide-left` | Opacity 0 to 1, translateX 48px to 0 |
| `slide-right` | Opacity 0 to 1, translateX -48px to 0 |
| `scale-in` | Opacity 0 to 1, scale 0.95 to 1 |

**Stagger:** Child elements within a `[data-animate-stagger]` container animate sequentially with 100ms delays.

### Parallax

Hero sections use scroll-driven parallax:
- Background image: `translateY(scrollY * 0.3)`
- Foreground text: `translateY(scrollY * -0.15)`
- Text opacity: `max(0, 1 - scrollY / 600)`

### Transitions

All interactive elements use `transition-colors` (150ms default). No spring or bounce animations. The motion language is smooth, restrained, and professional.

---

## Photography

### Style
- Desaturated, high-contrast imagery with a maritime colour temperature
- Hero images use reduced opacity (40-50%) overlaid on dark backgrounds
- Gradient overlays: `bg-gradient-to-b from-bg0/45 via-bg0/25 to-bg0`

### Subject Matter
| Category | Examples |
|----------|----------|
| Racing yachts | J Class under sail, maxi yacht racing, fleet starts |
| Craftsmanship | Welders in dry dock, timber planking restoration, rig work |
| Superyachts | Motor yachts at anchor, sailing yachts at sea, marina shots |
| Technical | Engine rooms, rigging details, hull construction |

### Image Treatment
- Always overlaid on dark backgrounds, never shown full-brightness
- Typical opacity: 15-45% depending on context
- `saturate-[1.15]` applied to hero images for slight colour boost
- `scale-110` applied for parallax overflow

---

## Decorative Elements

### Glow
A radial gradient blur used sparingly for ambient lighting effects on hero sections and feature cards.
- Default colour: `rgba(30, 155, 255, 0.15)`
- Default size: 600px
- Filter: `blur(60px)`
- Always decorative (`aria-hidden="true"`)

### Horizon Line
A full-width 1px divider at `white/10` opacity, used between major page sections.

### Section Label
A small, uppercase, widest-tracking text element in accent colour, placed above section headings:
```
RUNNING COST CALCULATOR
```
Properties: text-xs, font-semibold, uppercase, tracking-widest, text-accent, margin-bottom 12px.

---

## Voice and Tone

### Brand Voice
- **Professional but approachable.** Not stuffy, not casual. The kind of honest, direct advice a trusted expert gives.
- **Technical confidence without jargon overload.** Demonstrate expertise through specifics (real numbers, real processes), not through complexity.
- **Independent and direct.** Say what others in the industry won't. Be transparent about costs, risks, and conflicts of interest.

### Writing Rules
- British English spelling throughout (colour, specialise, programme, metre)
- No em-dashes. Use commas, periods, or rephrase.
- No exclamation marks in professional copy
- Numbers: spell out one to nine, use numerals for 10+. Always use numerals for measurements (24m, EUR 500,000)
- Currency: EUR for international contexts, GBP for UK-specific
- Yacht sizes always in metres, not feet
- "Yacht" not "boat" for vessels over 24m
- Avoid superlatives ("the best", "world-class", "unparalleled"). Let the work speak.

---

## Digital Assets

### Open Graph Image
- **Dimensions:** 1200 x 630px
- **File:** `og-default.png`
- **Design:** Dark navy background with centred lighthouse icon in blue rounded square

### Favicon
- **Status:** Apple icon present at `/app/apple-icon.png` and `/app/icon.png`
- **Design:** Lighthouse icon mark

### Social Media Handles
| Platform | Handle |
|----------|--------|
| Instagram | @forelandmarine |
| LinkedIn | /company/forelandmarine |

---

## Membership Badges

The following membership logos may be used in marketing materials, always with proper attribution:

| Organisation | Logo File | Link |
|-------------|-----------|------|
| British Marine | `british-marine-white.svg` | britishmarine.co.uk |
| Superyacht UK | `superyacht-uk-white.png` | superyachtuk.com |
| SYBAss | `sybass-white.png` | sybass.org |
| YORR | `yacht-owners-register-white.png` | yachtownersregister.com |
| Superyacht Alliance | `superyacht-alliance-white.png` | superyachtalliance.com |

---

## Contact Information

| Field | Value |
|-------|-------|
| Website | forelandmarine.com |
| Email | info@forelandmarine.com |
| Address | 7 Bell Yard, London WC2A 2JR |
| Locations | London, Antibes, Palma, Fort Lauderdale, Antigua, Netherlands, Germany, Italy |

---

*This document defines the visual and verbal identity of Foreland Marine Consultancy. All digital and print materials should adhere to these guidelines to maintain brand consistency.*
