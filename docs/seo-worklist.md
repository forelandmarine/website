# Foreland Marine SEO Worklist

Status as of 2026-05-04. Items below need human action or domain content that cannot be drafted without Jack's input.

## Completed (in this session)

- Schema markup enhanced. Added Person schema for Jack MacNally, linked as Author on Article schema across all insight pages. Added inLanguage, founder, hasCredential to Organization schema.
- Article schema now includes dateModified, keywords, articleSection.
- Homepage hero copy reworked with primary keywords (independent superyacht consultancy, 24 to 60 metres, sailing and motor).
- Homepage Services H2 rewritten as keyword-bearing: "Independent superyacht refit, new build and yacht management consultancy".
- Insights promoted to top-level navigation (was buried under About).
- Homepage Insights teaser section added with 3 featured articles linking to /insights.
- Visible author byline added to every insight article (Jack MacNally, Director).
- Related Articles + Related Service section added to every insight page. Pulls 3 same-category siblings then falls back to other articles.

## Already in place (verified, no action needed)

- Sitemap.xml and robots.txt configured.
- Per-page metadata (title, description, keywords, OG, canonical) on all four service pages via layout.tsx.
- FAQPage schema on home, refit, new-build, yacht-management, technical-consultancy.
- Service + BreadcrumbList schema on all service pages.
- Article schema on all insight pages.
- Service pages link down to relevant insights via Further Reading sections.

## Pending: needs Jack's input or external action

### Content gaps (need domain knowledge)

1. **Cornerstone article expansion.** Existing pieces on J Class management, owner's rep, refit cost, independent management, performance refit are 1500-2500 words. To rank for competitive head terms, target 2,500-4,000 words with original data, named case examples, and named industry references. Adding evidence panels (statistics with sources, named industry standards) would lift AEO citation rate significantly.

2. **New articles to commission.**
   - "J Class refit checklist" (currently no Foreland article on this)
   - "Owner's representative vs project manager: what's the difference" (high-intent comparison query, no Foreland article)
   - Consider also: "Carbon mast vs aluminium for performance sailing yachts", "Refit budgeting: contingency rules of thumb", "When to engage an owner's representative on a new build"

3. **Case studies section.** /case-studies route to be added with 3-4 anonymised projects. Need: vessel type, scope, duration, budget delivered against, owner outcome quote. Even with names withheld this builds enormous trust signal. Schema: `Article` + `CreativeWork` per case.

4. **Evidence panels for AEO.** Add a sidebar/callout component on cornerstones with named statistics and sources (e.g. "Rule of thumb: 8-12% of purchase price annually for running costs. Source: industry consensus, Foreland Marine cost analysis 2024-2026"). LLMs cite these structured facts directly.

### External actions (Jack must do these)

5. **Google Search Console** verified for forelandmarine.com. Submit sitemap. Capture current impression/click baseline per query and per page.

6. **Bing Webmaster Tools** account created and sitemap submitted.

7. **Google Analytics 4** linked to Search Console.

8. **Google Business Profile** for the London office at 7 Bell Yard. Separate listings for Antibes, Palma, Fort Lauderdale, Antigua only if there is verifiable physical presence.

9. **Backlink campaign.** Bylined article pitches to:
   - Boat International
   - SuperyachtNews
   - Yachting World
   - Seahorse Magazine
   - The Superyacht Report
   Angle: independent perspective on a current industry topic. Target one placement per quarter.

10. **Industry directory submissions.** Yachting Pages, SuperyachtAPI, YachtBuyer project managers list, ACREW, Dockwalk supplier directory.

11. **LinkedIn content plan.** Each new insight article gets a LinkedIn post from Jack on publish day. Author authority compounds page authority.

12. **Client testimonials.** 3-5 with named owner or captain attribution where permitted. Add to homepage and service pages with `Review` schema.

13. **Wikipedia citation pitches.** Foreland-authored articles cited on Wikipedia entries for: superyacht, yacht management, J Class (yacht), owner's representative. Citations from Wikipedia drive AI model citations directly.

14. **First Owner's Reference cross-linking.** Plan mutual links between forelandmarine.com and firstownersreference.com on launch (Sept 2026). Shared Person schema linking Jack as author on both. This is a high-value entity signal play once both sites are live.

## Measurement gates

- Day 30: GSC baseline captured. All in-session changes deployed and crawled. Confirm Person schema validates in Rich Results Test.
- Day 60: Tier 1 keyword impressions climbing in GSC. If flat, on-page issue, revisit.
- Day 90: at least one cornerstone article on page 1 for its primary keyword. First backlink from a tier-1 publication secured.

## Tier 1 target keywords (winnable in 3-6 months)

- J Class yacht management
- J Class refit
- independent yacht management
- independent owner's representative
- performance sailing yacht refit
- racing yacht project management
- classic yacht restoration consultancy
- yacht owner's representative (qualified by "independent")

## Tier 2 (winnable 6-12 months with content depth)

- superyacht refit cost
- yacht owner's representative (head term)
- ISM compliance yachts under 500GT
- MCA Large Yacht Code
- carbon composite yacht construction

## Tier 3 (long game, do not chase yet)

- superyacht project management
- yacht management company
- superyacht refit
