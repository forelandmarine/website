# SEO and AEO audit, 21 October 2026

Follows the September audit (`seo-aeo-audit-2026-09.md`). Live crawl of all 60 sitemap URLs by curl, Vercel logs for the last seven days, and spot checks of AI-style answers for the core queries.

## Summary

Nothing is blocking. All 60 sitemap URLs return 200 with a self-referencing www canonical, JSON-LD parses on every page, and the 12 metre widening is fully reverted on the served HTML. Production has had one error cluster in seven days, which is scanner traffic. The work is in three places: the October newsletter page, freshness signals (llms files and sitemap lastmod), and entity recognition for the brand name.

## Vercel logs, 14 to 21 October

- One runtime error group: "Failed to find Server Action", 21 events from a single client, all `POST /` at 04:58 UTC on 16 October and occasionally since 4 September. These are bot POSTs probing for Next.js server actions. No visitor impact. No action needed.
- 4xx in the last 24 hours: five requests. Four are the Spirit articles returning 404 at 10:19 and 10:20 BST, while the deploys of c98a00d and f5b0901 were still building. They now return 200. The fifth is `/insights/sailing-yacht-hydrau`, a truncated link pasted somewhere. No 5xx.
- All page requests sampled are static cache HITs. TTFB is 0.06 to 0.20 s on the homepage and the three main service pages, and brotli HTML is 15 to 23 KB.
- The logs cannot answer two questions:
  - Web Analytics and Observability are not enabled on the project, so there are no pageview, referrer or path counts.
  - Request logs carry no user agent, so AI crawler traffic (GPTBot, ClaudeBot, PerplexityBot) cannot be counted.
  - The 9 October metadata experiment can only be read from a Search Console export.

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
    2. add Companies House (15785851) and the YORR register entry to `sameAs` in the Organization schema
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
7. Pull a Search Console export for 9 September to 21 October to read the metadata experiment before building any new pages. Enable Vercel Web Analytics if path and referrer data are wanted here.
