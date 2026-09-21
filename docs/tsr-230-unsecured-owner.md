# The unsecured owner, TSR 230: site and distribution plan

Jack MacNally's article "The unsecured owner" was published in The Superyacht Report, Issue 230 (Owners Focus), 17 September 2026, pages 6 to 13. It is Foreland's first tier-1 trade press byline and closes item 9 on the SEO worklist.

The issue is free to read in full: https://issuu.com/the-superyacht-group/docs/the_superyacht_report_owners_focus_issue_230

The article covers shipyard insolvency and the buyer's security position: stage payment structures, the practical limits of refund guarantees in yachting, title to a hull under construction, the 2026 Italian Sea Group proceedings in the Court of Florence, Foreland's review of some 25 yard failures since 2000, and the 500gt threshold as a design and refit distortion.

## What is live on the site

The print article is not reproduced. The Superyacht Group holds the published version, so the site carries an original companion piece and cites the print original rather than duplicating it.

| Change | Location |
|---|---|
| Companion article, 2,900 words, six FAQs, failure table | `/insights/shipyard-insolvency-what-happens-to-the-owner` |
| Press and published work index, linking the free Issuu edition | `/insights/press` |
| Citation panel and `citation` node in Article schema | `src/app/insights/[slug]/page.tsx`, driven by `originalPublication` on the post |
| `subjectOf` on Jack's Person schema, naming the Periodical and PublicationIssue | `src/app/layout.tsx` |
| Featured article slot and byline line in the insights teaser | Homepage |
| Publication line in Jack's bio | `/about` |
| Published Work and Trade Press sections | `public/llms.txt`, `/llms-full.txt`, `/about/llms-full.txt` |
| Press link | Footer, insights index, sitemap |
| Further reading link | `/owners-representation` |

The `originalPublication` field on `Post` is reusable. Any future placement sets it and the citation panel and schema follow.

## Outstanding

- Ask The Superyacht Group whether they will link the byline to forelandmarine.com. This is the backlink that carries the most weight and it is usually granted on request.
- Add the placement to Jack's LinkedIn profile under Publications, which feeds the Person entity through `sameAs`.

Closed: the cover date is confirmed as 17 September 2026, and the Issuu edition is now the linked source across the site, the schema and the llms files.

## Distribution

### LinkedIn, week one

Post from Jack, not the company page, with the company page reposting the same day.

> Shipyard failure is not a rare event in yacht building. I counted around 25 across the custom and semi-custom fleet since 2000, in three clusters: 2009 to 2012, 2015 to 2018, and 2020 to now.
>
> What struck me writing this up for The Superyacht Report is how little the outcome turns on the contract. It turns on structure. Buyers holding an enforceable refund guarantee or title registered in the country where the hull was being built generally kept their boat or their money. Buyers holding neither queued with the other creditors.
>
> The Italian Sea Group proceedings this summer made the point twice over. Five owners won the right to terminate on 10 June. By 6 July the court had suspended it again, along with their right to call the guarantees they held.
>
> The uncomfortable part is that none of the protections are exotic. Commercial shipowners take refund guarantees as standard. The Italian and German registers are open and registration costs a rounding error on the contract price. An independent milestone survey costs less per instalment than the owner will spend on crew uniforms.
>
> What is missing below roughly 500gt is the habit of using them, and any professional function that owns the security position between signature and delivery. Lawyers are released once the contract is signed. Brokers are paid at signature. Responsibility for the file sits with no one.
>
> "The unsecured owner" is in The Superyacht Report, Issue 230, from page 6, and the issue is free to read: https://issuu.com/the-superyacht-group/docs/the_superyacht_report_owners_focus_issue_230
>
> I have written up the new build part of it here: forelandmarine.com/insights/shipyard-insolvency-what-happens-to-the-owner

### LinkedIn, week three

> A question worth asking before the next instalment goes out: who owns the hull you are paying for?
>
> It is decided by the law of the country where the yacht is being built, whatever law governs your contract. In Italy the yard owns it during construction unless you have agreed otherwise in writing, and that agreement only protects you in an insolvency once it is transcribed in the registro navi in costruzione. Germany keeps a shipbuilding register for the same purpose.
>
> A vesting clause in an English law contract is not the same thing as registered title. It leaves you proving ownership to a foreign trustee with a document the trustee is not bound to recognise.
>
> More on this in The Superyacht Report, Issue 230, from page 6, and in the write-up here: forelandmarine.com/insights/shipyard-insolvency-what-happens-to-the-owner

### LinkedIn, week five

> Yards do not fail suddenly.
>
> Prices get cut to win deposits, because new deposits are the cheapest funding available to a yard in trouble. Senior technical staff leave. Suppliers start ringing the owner's representative to ask, carefully, whether the last instalment has been paid, because it has not reached them.
>
> We have watched that sequence more than once and it is recognisable a year or more before any court is involved. The contract is no help during that year, because termination clauses are triggered by formal events and yards file late, when the cash is gone.
>
> Financial due diligence on a yard is normally done once, before signature, if at all. On a three-year build it should be an annual item.
>
> forelandmarine.com/insights/shipyard-insolvency-what-happens-to-the-owner

### Other channels

- **The Foreland Quarter.** Lead the next issue with the placement. One paragraph, the companion article link, and the offer of a PDF of the print piece to anyone who asks.
- **First Owner's Reference.** Chapter 05 covers new build versus brokerage. Cite the TSR article there and link back to the companion piece. Shared Person schema already links Jack across both sites, so the citation reinforces the entity.
- **Direct outreach.** The Bay Area prospect list and the family office contacts are the right audience for this specific subject. Route through advisers as agreed, sending the print piece rather than a pitch.
- **Yacht finance and insurance contacts.** The Build Assurance and NDI work sits directly on this subject. The article is the natural introduction to those conversations.
- **Wikipedia.** The Italian Sea Group and Perini Navi entries both cover the insolvency proceedings. A citation to the TSR article is defensible on notability grounds and citations of that kind feed model training and retrieval.

## Measurement

Baseline is the GSC capture of 10 September 2026 in `docs/gsc-baseline-2026-09-10`.

- Day 30: companion article indexed; impressions appearing for "shipyard insolvency", "yacht refund guarantee" and "title to a yacht under construction". Press page indexed.
- Day 60: check whether ChatGPT, Claude, Gemini and Google AI Overviews cite Foreland when asked what happens to an owner when a shipyard fails. Record which name the citation uses.
- Day 90: one referring domain from the placement. Target position for the head term "shipyard insolvency" in the top 10.
