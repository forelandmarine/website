# GSC, Bing, GA4 onboarding checklist

One-time setup to unlock the day-30, day-60, day-90 measurement gates in `seo-worklist.md`. Allow 30 minutes start to finish.

## Pre-flight

- Decide which Google account will own search data long-term. The same account should hold GSC, GA4, and Google Business Profile. Personal jack@forelandmarine.com is fine if you do not want a separate ops mailbox.
- Have access to the Vercel domain DNS for forelandmarine.com (verification by DNS TXT is the cleanest method and survives hosting changes).

## 1. Google Search Console

1. Open https://search.google.com/search-console and add a Domain property for `forelandmarine.com` (not the URL-prefix variant, so it covers apex, www, http, https in one).
2. Verify by DNS TXT record. Google will give you a string like `google-site-verification=...`. Add it as a TXT record on the apex domain in your DNS provider. Verification usually completes inside two minutes.
3. Once verified, Settings → Ownership verification → leave DNS verification in place permanently. Do not delete the TXT record.
4. Sitemaps → submit `https://www.forelandmarine.com/sitemap.xml`. It should read 47 URLs discovered within an hour.
5. Settings → Crawl stats → confirm Googlebot is reaching the site. Expect 50-150 requests/day baseline.
6. URL Inspection → run on the homepage and on `/owners-representation`. Confirm both report "URL is on Google" or "URL is known to Google" and that the rendered HTML shows the JSON-LD blocks. If a page is "discovered, not indexed", request indexing manually.

## 2. Bing Webmaster Tools

1. Open https://www.bing.com/webmasters and add `forelandmarine.com`.
2. Choose "Import from Google Search Console" once GSC is verified. This is the fastest path; it copies verification and sitemap in one step.
3. Confirm the sitemap is listed.
4. Bing has a much smaller crawl budget. Expect indexation to lag GSC by 2-4 weeks.

## 3. Google Analytics 4

1. Open https://analytics.google.com and create a new property: "Foreland Marine forelandmarine.com", reporting time zone Europe/London, currency GBP.
2. Create a Web data stream for `https://www.forelandmarine.com`.
3. Copy the Measurement ID (`G-XXXXXXXX`). You will need to add a `@next/third-parties/google` GoogleAnalytics tag in `src/app/layout.tsx`, or wire it via Vercel Analytics. Tell me when you have the ID and I will do the code change.
4. In GA4 Admin → Property → Product Links → Search Console links → link the GSC property created in step 1. This is what surfaces query data inside GA4 reports.

## 4. Google Business Profile

1. Open https://business.google.com and create a profile for the 7 Bell Yard address.
2. Category: "Marine Consultant" (primary). Secondary: "Project Management Company".
3. Service area: leave empty. The 7 Bell Yard address is a serviced office; do not claim physical retail.
4. Add only Antibes, Palma, Fort Lauderdale, Antigua as separate profiles if there is a verifiable physical presence. There currently is not, so do not create them. Listing presence you do not have is a GBP suspension risk.
5. Verification will likely be by postcard to 7 Bell Yard. Allow 5-10 working days.

## 5. Baseline capture (day-30 gate)

Once GSC has accumulated 28 days of data:

1. Performance → Search results → export top queries and top pages to a CSV. Save as `docs/gsc-baseline-2026-06.csv`.
2. Note the impression and click totals for each of the eight Tier 1 keywords in `seo-worklist.md`.
3. This is the baseline against which day-60 and day-90 progress is measured. Without it the rest of the strategy cannot be evaluated.

## What I cannot do for you

All five steps above require either Google account auth or DNS access, both of which sit with you. I can:

- Add the GA4 measurement tag to the code once you have the ID
- Add or amend any GSC verification meta tag if you prefer that over DNS
- Generate a CSV-cleaning script for the day-30 baseline export when the data lands
