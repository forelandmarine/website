# SEO and AEO audit, 21 October 2026

Follows the September audit (`seo-aeo-audit-2026-09.md`). Live crawl of all 60 sitemap URLs by curl, Vercel logs for the last seven days, Vercel Web Analytics for 90 days, and spot checks of AI-style answers for the core queries.

## Summary

Nothing is blocking. All 60 sitemap URLs return 200 with a self-referencing www canonical, JSON-LD parses on every page, and the 12 metre widening is fully reverted on the served HTML. Production has had one error cluster in seven days, which is scanner traffic. The work is in three places: the October newsletter page, freshness signals (llms files and sitemap lastmod), and entity recognition for the brand name.

## Vercel logs, 14 to 21 October

- One runtime error group: "Failed to find Server Action", 21 events from a single client, all `POST /` at 04:58 UTC on 16 October and occasionally since 4 September. These are bot POSTs probing for Next.js server actions. No visitor impact. No action needed.
- 4xx in the last 24 hours: five requests. Four are the Spirit articles returning 404 at 10:19 and 10:20 BST, while the deploys of c98a00d and f5b0901 were still building. They now return 200. The fifth is `/insights/sailing-yacht-hydrau`, a truncated link pasted somewhere. No 5xx.
- All page requests sampled are static cache HITs. TTFB is 0.06 to 0.20 s on the homepage and the three main service pages, and brotli HTML is 15 to 23 KB.
- Request logs carry no user agent, so AI crawler traffic (GPTBot, ClaudeBot, PerplexityBot) cannot be counted. Visits referred by AI tools are counted below.

## Vercel Web Analytics, 22 July to 21 October

Web Analytics is on, but the Vercel MCP connector returns "Web Analytics not found" for this project. Query it through `vercel api /v1/query/web-analytics/visits/aggregate` instead.

**Totals.** 4,310 visitors and 6,238 pageviews over 90 days. About 1,600 of those visitors come from Singapore (958) and China (651) at about one pageview each, which is bot traffic. Real human traffic is about 200 to 300 visitors a week. Desktop accounts for 66%.

**Two one-off spikes.** Google referrals jumped to 675 visitors in the week of 22 June and 2,158 in the week of 13 July. The 13 July spike was 1,732 visitors landing on `/insights` and 435 on `refit-project-management-what-to-expect`, mostly from the US. Traffic went back to normal within a week, and the cause is not visible in this data. A spike landing on the listing page looks more like a Discover or sitelink event than ordinary search. Leave both weeks out of any trend.

**The 9 September metadata fix, read from Google referrals.** The two windows are the same length, 43 days each.

| Measure | 28 Jul to 8 Sep | 9 Sep to 21 Oct | Change |
|---|---|---|---|
| Google-referred visitors | 302 | 396 | +31% |
| Weekly average (whole weeks) | 49 | 65 | +32% |
| Google to `/owners-representation` | 4 | 13 | x3 |
| Google to `/contact` | 2 | 4 | |
| Google to crew salary guide | 35 | 75 | x2 |
| Google to refit cost article | 62 | 50 | -19% |
| Bing-referred visitors | 45 | 47 | flat |

This is consistent with the fix improving click-through, and the gain reaches the commercial pages. Search Console impressions are still needed to separate higher CTR from higher visibility.

**AI referrals.**

| Source | Visitors, 90 days | Pre-fix window | Post-fix window |
|---|---|---|---|
| chatgpt.com | 48 | 28 | 19 |
| perplexity.ai | 3 | 0 | 3 |
| gemini.google.com | 3 | 0 | 3 |
| claude.ai | 2 | 2 | 0 |
| copilot.microsoft.com | 1 | 1 | 0 |

AI tools send about 1% of real visitors, and ChatGPT referrals fell after September. Since June, AI visitors have landed on:

- the homepage, 18
- the refit cost article, 14
- `/owners-representation`, 11
- the 10 percent rule article, 7
- the owner's rep articles, 9

So when ChatGPT cites Foreland, it is for the owner's rep service and refit cost.

**Other referrers.**

- LinkedIn rose from 7 to 53 visitors, almost all to the shipyard insolvency article (the TSR piece).
- Instagram sent 39 visitors over 90 days.
- `nauticaldirectory.com` and `yachtinginternationalradio.com` each sent one visitor.

**Top pages over 90 days.**

| Page | Visitors |
|---|---|
| Homepage | 999 |
| Crew salary guide | 430 |
| `/insights` | 382 |
| Refit cost article | 261 |
| 10 percent rule article | 217 |
| SeaTime Tracker | 201 |
| `/owners-representation` | 175 |
| `/contact` | 141 |
| Large Yacht Code article | 141 |

`/refit` had 108 visitors and `/yacht-management` 102.

## Important

1. **The October newsletter page has no headings.** `/newsletters/october-2026` has no h1 to h6, no `<main>` and no twitter:card. The May issue was given an h1 in September. The page has one inbound link, from `/newsletters`, and links out to `/foreland-group`, which is noindex, nofollow. Its JSON-LD description contains a double-escaped apostrophe: `The First Owner&amp;#x27;s Reference`.
2. **No article has `image` in its Article JSON-LD.** This covers all 39 articles, including the four Spirit pieces. Each article serves a working og:image, but Google's Article structured data guidance asks for one. The two newsletter Articles do carry an image. This is a one-line fix in the shared article schema builder.
3. **The llms files are out of date.**
   - `llms.txt` (lines 3, 103 and 104) and `llms-full.txt` (line 3) say "24 to 60+ metres". The site says "24 to 60". `llms-full.txt` route.ts lines 18 and 299 say "24 to over 60 metres".
   - Neither file lists the newsletters.
   - `llms-full.txt` (454 KB) is not referenced from `robots.txt`, `llms.txt` or the head.
4. **Sitemap lastmod is hardcoded at 2026-08-04 on static pages.** `/`, `/about` and `/owners-representation` changed today, `/newsletters` changed 16 October and `/tools` 8 October. Article dates are accurate. A stale lastmod across the static pages teaches Google to ignore the field.
5. **Internal linking is thin in places.**
   - One inbound link only: `owners-representative-vs-project-manager-vs-broker` (from `/insights`) and both newsletter issues.
   - Two inbound links: eleven articles, including `the-role-of-an-owners-representative`, `classic-sailing-yacht-refit` and `refit-project-management`.
   - "Refitting a Spirit yacht" links to no other Spirit page, and `/refit` does not link to it.

## Minor

6. `http://forelandmarine.com/` takes two 308 hops to reach `https://www.forelandmarine.com/`. The other three variants take one hop.
7. Six descriptions are back over 160 characters (161 to 165):
   - `/tools/lightship-ism`
   - `/tools/seatime-tracker`
   - `sailing-vs-motor-yacht-management-differences`
   - `choosing-a-yacht-owners-representative`
   - `yacht-new-build-contract-what-to-negotiate`
   - `what-does-sybass-accreditation-mean-for-a-yacht-owner`

   Four titles are at 61 characters. `/privacy-policy` has a 51-character description.
8. `/insights/press` (new since September) has no og:image.
9. Middots remain in visible text: 15 in the plan feature lists on `/technical-support` and 4 in the May newsletter footer address.
10. "No yard affiliations" is still served in three places:
    - homepage FAQ (`src/app/page.tsx:66`)
    - `/owners-representation` (`page.tsx:203`)
    - the why-independent-yacht-management-matters article

    Two more instances are in `llms-full.txt`. This phrasing was dropped from canonical copy in May 2026.

## AEO spot checks (web search answers, 21 October)

| Query | Foreland in the answer? |
|---|---|
| independent yacht owner's representative new build superyacht | Yes. Cited via the Forward Watch podcast episode on audioboom, not via forelandmarine.com |
| what is a yacht owner's representative and how much do they cost | No. The answer states no fee figures could be found |
| superyacht refit project management company UK | No. Hampshire Marine, TLC, Solent Refit named |
| Spirit Yachts owner's representative build | No. Answered entirely from spirityachts.com |
| yacht build manager what do they do | No. Job postings and Fraser |
| cost of yacht interior refit per metre | No. The answer states no per-metre figure is published and does its own arithmetic |
| 10 percent rule yacht running costs | No. Kubera, Business Insider, YachtBuyer |
| Foreland Marine | No. Every result is Foreland Shipping, a Devon headland or a conservation zone |

What this shows:

- **Entity recognition is the largest AEO gap.** A search engine does not connect the name "Foreland Marine" to this company.
  - Fixes in order:
    1. merge the second LinkedIn company page
    2. add the YORR register entry and the podcast and press appearances to the Organization schema (`sameAs` already has Instagram, LinkedIn and Companies House)
    3. create a Wikidata item for Foreland Marine Consultancy Ltd
    4. use "Foreland Marine Consultancy" in full in press and podcast bylines
  - The podcast citation shows that third-party mentions are getting through, but they are not being attributed to the domain.
- **Answer engines report two gaps in their own words**: a per-metre interior refit figure, and owner's representative fees. Both match the content gaps measured in September (interior refit 1,299 impressions, zero clicks). The interior refit question can be answered in the existing `/refit` cost bands or in a new insights article. A stated fee basis would be the most citable sentence on `/owners-representation`. Whether to publish one is a commercial decision.
- **The Spirit articles are one day old** and not yet indexed for "Spirit Yachts owner's representative". Recheck in two weeks.
- These checks were run through a US search index, so they indicate what is happening rather than measure it.

## Recommended order

1. Newsletter page: give it an h1 and `<main>`, fix the escaped apostrophe, and link it from the May issue and from `/insights`. (Small)
2. Add `image` to Article JSON-LD. (Small)
3. Update the llms files: 24 to 60, add the newsletters, remove "no yard affiliations", and reference `llms-full.txt` from `llms.txt`. (Small)
4. Derive sitemap lastmod for static pages from git or a per-page constant. (Small)
5. Tidy items 6 to 10. (Small)
6. Entity work: LinkedIn merge (Jack only), `sameAs` additions, Wikidata. (Medium, mostly off-site)
7. Pull a Search Console export for 9 September to 21 October to confirm the CTR gain shown in Web Analytics before building any new pages.

## Fixed 21 October (865b7a9, 9104b94)

- October newsletter: h1, h2 section heads, `<main>`, twitter:card, a plain apostrophe in the JSON-LD, and footer links to the archive, insights and service pages. The May issue now links to October, and its middots are gone.
- Article JSON-LD carries `image` (the 1200x630 OG card) on all articles.
- `llms.txt`, `/llms-full.txt` and `/about/llms-full.txt` say 24 to 60 metres and no longer say "no yard affiliations". `llms.txt` has a "Name and identity" section and points to `llms-full.txt`. Both main files list the newsletters.
- Sitemap lastmod is set per static page from its last real revision. Update the `revised` map in `src/app/sitemap.ts` when a page changes.
- Six descriptions trimmed under 160. `/insights/press` has an OG card.
- Internal links: "Refitting a Spirit yacht" links to the pre-owned guide, and `/owners-representation` links to the owner's rep vs project manager vs broker article.
- Brand query "Foreland Marine":
  - Homepage title is now "Foreland Marine | Independent Superyacht Consultancy". It was "Independent Superyacht Consultancy | Foreland Marine", and the og:title had no brand at all. The og:title was the title the AI search index stored for the homepage.
  - og:site_name is "Foreland Marine".
  - The Organization schema has name "Foreland Marine", legalName, alternateName, a Companies House identifier, and a disambiguatingDescription separating the company from Foreland Shipping.
- IndexNow is set up: the key file is in `public/`, and `node scripts/indexnow.mjs` submits the whole sitemap. It was first run 21 October, 60 URLs, 202 Accepted. Run it after significant deploys.

### Brand search baseline, 21 October

The search index used by AI assistants for web lookups returned no forelandmarine.com result for "Foreland Marine", "Foreland Marine Consultancy" (exact) or `site:forelandmarine.com`. Only the bare query "forelandmarine.com" found the homepage. Recheck all four in two to three weeks.

### Remaining, needs Jack

1. Bing Webmaster Tools: confirm the site is verified, submit the sitemap and check URL coverage. Bing feeds ChatGPT search, Copilot and DuckDuckGo.
2. Google Search Console: request indexing of the homepage so the new title is picked up, and check the "foreland marine" query in Performance.
3. Google Business Profile for 7 Bell Yard, if not already live. It is the strongest single signal for a brand query on Google.
4. Merge or close the second LinkedIn company page (/company/foreland-marine-consulting-ltd).
5. Wikidata item for Foreland Marine Consultancy Ltd. It needs a Wikidata account and cites Companies House. Once it exists, add its URL to `sameAs`.
6. Homepage H1 is "Smooth sailing. Every time." and does not name the company. A visible line naming Foreland Marine near the top of the homepage would help the brand query. This is a copy decision.
