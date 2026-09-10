"""Build docs/sales/bay-area-first-owner-prospects.xlsx
Source basis: public profiles (Forbes, Bloomberg Billionaires, IPO filings, press) to mid-2026.
Web verification was unavailable at build time (10 Sep 2026); every row carries a verify flag.
No private contact details are held. Route-in column names public vehicles only.
"""
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

NAVY = "033269"
STONE = "7A756D"

# Columns:
# tier, name, role, company/sector, base, est. net worth (USD, public estimate), liquidity/timing,
# yacht status (public), boating/sailing affinity, likely route in, angle for Foreland, verify before outreach
rows = [
# ---- Tier 1: recent liquidity, no known yacht, plausible 30-60m buyer within 24 months ----
("1","Dylan Field","Co-founder and CEO","Figma (design software)","San Francisco","$3-6bn","Figma IPO Jul 2025; lock-up long expired; ongoing sales via 10b5-1","No yacht on public record","None known","Personal office / Figma exec team; Iconiq-type manager likely","First owner archetype: young, design-literate, will care about the build process. Sail or motor open.","Residence; whether a family office has been formed"),
("1","Alexandr Wang","Co-founder (Scale AI); Chief AI Officer, Meta","AI data / Meta Superintelligence","San Francisco","$3-4bn","Meta's $14bn Scale stake Jun 2025 gave direct liquidity","No yacht on public record","None known","Personal office not public; Scale AI investor circle (Accel, Index)","Cash liquid, mid-20s, high public profile. Time-poor; management plus OR bundle.","Current residence (LA vs SF reported); appetite"),
("1","Tony Xu","Co-founder and CEO","DoorDash","San Francisco","$2-3bn","DoorDash public since 2020; steady 10b5-1 sales","No yacht on public record","None known","Personal office not public","Operator profile; likely motor 40-50m explorer if anything.","Family office name"),
("1","Vlad Tenev","Co-founder and CEO","Robinhood","Menlo Park","$3-5bn","HOOD re-rated 2025-26; large 10b5-1 sales","No yacht on public record","None known","Personal office not public","Recent crypto-cycle liquidity; Bulgarian-born, Med affinity plausible.","Residence; any yacht charter history"),
("1","Baiju Bhatt","Co-founder (Robinhood); founder Aetherflux","Robinhood / space solar","San Francisco","$2-3bn","Robinhood stock; sold down since 2024","No yacht on public record","None known","Personal office not public","Lower profile than Tenev; engineering mindset suits new-build oversight pitch.","Current holdings"),
("1","Steve Huffman","Co-founder and CEO","Reddit","San Francisco","$1-1.5bn","Reddit IPO Mar 2024; ongoing stock sales","No yacht on public record","None known","Personal office not public","First liquidity of scale in 2024-25. Realistic 30-40m brokerage entry.","Net worth after 2026 stock moves"),
("1","Chris Britt","Co-founder and CEO","Chime (fintech)","San Francisco","$800m-1.5bn","Chime IPO Jun 2025","No yacht on public record","None known","Personal office not public","Fresh post-IPO; typical 12-30 month lag to first large asset purchase.","Post-lock-up sales; residence"),
("1","Ryan King","Co-founder","Chime (fintech)","San Francisco","$500m-1bn","Chime IPO Jun 2025","No yacht on public record","None known","Personal office not public","As above; lower profile, easier warm intro.","Net worth range"),
("1","Ariel Cohen","Co-founder and CEO","Navan (travel and expense)","Palo Alto","$300-700m","Navan IPO Oct 2025","No yacht on public record","None known","Personal office not public","Israeli-born; travel-industry founder, likely Med charter familiarity.","Net worth after IPO performance; residence"),
("1","Sanjay Beri","Founder and CEO","Netskope (security)","Santa Clara","$400-800m","Netskope IPO Sep 2025","No yacht on public record","None known","Personal office not public","Second-time founder (Juniper alumnus), understands vendor management.","Net worth; lock-up status"),
("1","Bipul Sinha","Co-founder and CEO","Rubrik (data security)","Palo Alto","$500m-1bn","Rubrik IPO Apr 2024; RBRK strong 2025-26","No yacht on public record","None known","Personal office not public","Ex-Lightspeed VC turned founder; fits owner-side advisory framing.","Net worth"),
("1","Jitendra Mohan","Co-founder and CEO","Astera Labs (AI connectivity)","Santa Clara","$1-2bn","Astera Labs IPO Mar 2024; AI-cycle re-rating","No yacht on public record","None known","Personal office not public","Quiet semiconductor wealth; typical late-adopter buyer needing guidance.","Net worth; residence"),
("1","Andrew Feldman","Co-founder and CEO","Cerebras Systems (AI chips)","Sunnyvale","$500m-1.5bn","Cerebras IPO (2025-26); secondaries 2025","No yacht on public record","None known","Personal office not public","Serial founder (SeaMicro exit to AMD). Liquidity newly real.","IPO completion and lock-up; net worth"),
("1","Ali Ghodsi","Co-founder and CEO","Databricks","Berkeley / SF","$2-4bn","Databricks tenders 2024-26 at $60-100bn+; IPO expected","No yacht on public record","None known","Personal office not public; Databricks co-founder group","Swedish-Iranian; Scandinavian sailing culture is a natural hook for a sail pitch.","Tender proceeds; residence"),
("1","Ion Stoica","Co-founder (Databricks, Anyscale); Professor","Databricks / UC Berkeley","Berkeley","$1-3bn","Databricks tenders","No yacht on public record","None known","UC Berkeley; personal office not public","Academic profile; would value technical independence and documentation.","Liquidity actually taken"),
("1","Parker Conrad","Co-founder and CEO","Rippling (HR software)","San Francisco","$2-4bn","Rippling tenders 2025-26 ($16bn+ valuation)","No yacht on public record","None known","Personal office not public","Second exit (Zenefits then Rippling); combative, will want an owner-side adversary to the yard.","Secondary sales; net worth"),
("1","Aravind Srinivas","Co-founder and CEO","Perplexity (AI search)","San Francisco","$1-2bn (paper)","Perplexity secondaries 2025-26","No yacht on public record","None known","Personal office not public","Paper wealth; lower priority until a real tender. Watch list.","Whether any cash taken off the table"),
("1","Noam Shazeer","Co-founder Character.AI; Google DeepMind","AI","Palo Alto","$1-1.5bn","Google $2.7bn Character.AI licence deal Aug 2024 gave cash","No yacht on public record","None known","Personal office not public","Cash-rich, private, family-oriented; a family explorer yacht brief would suit.","Residence; appetite"),
("1","Mike Krieger","Co-founder Instagram; Chief Product Officer, Anthropic","Instagram / Anthropic","San Francisco","$1-2bn","Instagram sale 2012; Anthropic equity re-rated 2025-26","No yacht on public record","None known","Personal office not public","Brazilian-born; Med and Brazil cruising both plausible. Design-literate.","Anthropic secondary participation"),
("1","Kevin Systrom","Co-founder Instagram; founder Artifact","Instagram","San Francisco","$2-3bn","Long-liquid since 2012 Facebook sale","No yacht on public record","Known cyclist; no boating record","Personal office not public","Comfortable wealth, long-settled; classic 'why not now' first owner.","Any charter history"),
# ---- Tier 2: established, liquid, no known yacht; slower burn ----
("2","Patrick Collison","Co-founder and CEO","Stripe","San Francisco","$9-12bn","Stripe tenders 2024-26 ($90bn+); no IPO","No yacht on public record","Irish; no boating record","Personal office not public","Long-horizon, intellectual; would read The First Owner's Reference cover to cover. Send the book, not a pitch.","Residence (SF vs elsewhere)"),
("2","Brian Chesky","Co-founder and CEO","Airbnb","San Francisco","$10-12bn","Airbnb public since 2020","No yacht on public record","None known","Personal office not public","Designer (RISD). Would engage on a design-led new build. Long shot but high value.","Any existing yacht charter or ownership"),
("2","Nathan Blecharczyk","Co-founder","Airbnb","San Francisco","$8-10bn","Airbnb public since 2020","No yacht on public record","None known","Personal office not public","Lower profile than Chesky; engineer; family with young children, explorer brief.","Residence"),
("2","Jack Dorsey","Co-founder Twitter; CEO Block","Block","San Francisco","$4-6bn","Block stock; ongoing","No yacht on public record","None known","Iconiq Capital (reported client)","Minimalist; unlikely buyer but a sail-only, low-impact brief could land. Low priority.","Appetite"),
("2","Marc Benioff","Co-founder and CEO","Salesforce","San Francisco","$9-11bn","Salesforce; ongoing 10b5-1","Charters reported; no owned yacht on public record","Hawaii-based leisure; ocean affinity","Time Ventures / personal office","Has chartered; conversion from charter to ownership is the classic OR entry point.","Whether any yacht purchased 2025-26"),
("2","Reed Hastings","Co-founder and Chairman","Netflix","Santa Cruz","$5-7bn","Netflix; stepped back 2023; Powder Mountain investment","No yacht on public record","Santa Cruz coastal lifestyle","Personal office not public","Post-CEO life, philanthropy-heavy; possible sail purchase. Medium priority.","Appetite"),
("2","Jerry Yang","Co-founder Yahoo; founder AME Cloud Ventures","Yahoo / VC","Palo Alto","$2-3bn","Long-liquid","No yacht on public record","None known","AME Cloud Ventures","Quiet, collector (Asian art). Classic older first-owner brief at 40-50m.","Appetite"),
("2","David Filo","Co-founder","Yahoo","Palo Alto","$3-4bn","Long-liquid","No yacht on public record","None known","Personal office not public","Very private; approach only via a trusted intermediary.","Any intermediary link"),
("2","Jayshree Ullal","President and CEO","Arista Networks","Saratoga","$5-8bn","Arista; ongoing 10b5-1","No yacht on public record","None known","Personal office not public","One of the wealthiest self-made women in tech; no known large-asset purchases.","Appetite"),
("2","Jay Chaudhry","Founder and CEO","Zscaler","San Jose","$10-15bn","Zscaler; ongoing","No yacht on public record","None known","Personal office not public","Frugal reputation; low probability, very high value.","Appetite"),
("2","Ken Xie","Founder and CEO","Fortinet","Sunnyvale","$6-9bn","Fortinet; ongoing","No yacht on public record","None known","Personal office not public","Same profile as Chaudhry. Brother Michael Xie (Fortinet CTO) is a second name in the same household.","Appetite"),
("2","Aneel Bhusri","Co-founder and Executive Chair","Workday","Pleasanton","$2-3bn","Workday; stepped back from CEO 2024","No yacht on public record","None known","Personal office not public","Post-CEO transition is a classic trigger. Good timing.","Residence; appetite"),
("2","Nikesh Arora","Chairman and CEO","Palo Alto Networks","Santa Clara","$1.5-2.5bn","PANW; large stock sales 2024-26","No yacht on public record","None known","Personal office not public","Ex-SoftBank, globally mobile. Likely Med charter exposure.","Charter history"),
("2","Hock Tan","President and CEO","Broadcom","Palo Alto","$2-4bn","Broadcom; AI re-rating 2025-26","No yacht on public record","None known","Personal office not public","Malaysian-born; Southeast Asia cruising angle. Low probability.","Appetite"),
("2","Jensen Huang","Co-founder and CEO","Nvidia","Los Altos Hills","$100bn+","Nvidia; 10b5-1 sales 2024-26","No yacht on public record","None known","Personal office not public","Only worth an approach through a trusted intermediary; never cold.","Any yacht purchase (would be reported)"),
("2","Tim Cook","CEO","Apple","Palo Alto","$2-3bn","Apple; ongoing","No yacht on public record","Cyclist, outdoors","Personal office not public","Private, philanthropic; low probability.","Appetite"),
("2","Sir Jony Ive","Founder","LoveFrom; io (OpenAI)","San Francisco","$500m-1bn+","Apple; OpenAI acquired io for $6.5bn May 2025","No yacht on public record","British; Cornwall links; sailing plausible","LoveFrom","Strongest design-led new-build brief on the list. British; Foreland's London base and J Class niche resonate.","io proceeds; appetite"),
("2","Brian Armstrong","Co-founder and CEO","Coinbase","San Francisco / LA","$8-12bn","Coinbase; ongoing sales","No yacht on public record","None known","Personal office not public","Crypto-cycle liquidity; bought LA estate 2022. Reported LA move needs checking.","Residence"),
("2","Fred Ehrsam","Co-founder Coinbase; co-founder Paradigm","Crypto / VC","San Francisco","$2-3bn","Coinbase; Paradigm","No yacht on public record","None known","Paradigm","Younger crypto wealth; adventure-explorer brief.","Residence"),
("2","Chris Larsen","Co-founder and Executive Chair","Ripple","San Francisco","$3-6bn (XRP-linked)","XRP re-rated 2025","No yacht on public record","None known","Personal office not public","SF civic donor; XRP volatility makes timing sensitive.","Net worth at approach"),
("2","Garrett Camp","Co-founder Uber; founder Expa","Uber / Expa","San Francisco","$3-4bn","Uber; long-liquid","No yacht on public record","None known","Expa","Art and design collector; would engage with a design-led build.","Residence (reported LA time)"),
("2","Evan Williams","Co-founder Twitter, Medium; Obvious Ventures","Twitter","San Francisco","$1.5-2.5bn","Twitter; long-liquid","No yacht on public record","Ranch owner; outdoors","Obvious Ventures","Sustainability-minded; hybrid or sail brief. Medium priority.","Appetite"),
("2","Ben Silbermann","Co-founder and Executive Chair","Pinterest","San Francisco","$1-2bn","Pinterest; stepped back 2022","No yacht on public record","None known","Personal office not public","Post-CEO trigger; family-focused.","Residence"),
("2","Jeff Lawson","Co-founder Twilio; owner The Onion","Twilio","San Francisco","$500m-1bn","Twilio; left 2024","No yacht on public record","None known","Personal office not public","Post-exit, buying eclectic assets (The Onion). Fits 'first big toy' pattern.","Net worth"),
("2","Ivan Zhao","Co-founder and CEO","Notion","San Francisco","$1-2bn (paper)","Notion secondaries","No yacht on public record","None known","Personal office not public","Paper-heavy; watch list.","Cash taken"),
("2","Max Levchin","Co-founder and CEO","Affirm; PayPal co-founder","San Francisco","$1-2bn","Affirm; PayPal long-liquid","No yacht on public record","Competitive cyclist","Personal office not public","Ukrainian-born; performance-minded. Racing-sail angle possible.","Appetite"),
("2","Mark Pincus","Founder","Zynga","San Francisco","$1.5-2bn","Zynga sold to Take-Two 2022","No yacht on public record","Surfer, kitesurfer; ocean affinity","Personal office not public","Ocean sports without a yacht is the best first-owner tell on the list.","Appetite"),
("2","Diane Greene","Co-founder VMware; former Google Cloud CEO","VMware / Google","Palo Alto","$1.5-2bn","Long-liquid","No superyacht on public record","Former competitive sailor and windsurfer; naval architecture degree","Personal office not public (with Mendel Rosenblum)","The most credible sailing-yacht buyer here; she would scrutinise the naval architecture herself. J Class or performance cruiser brief.","Any current sailing yacht ownership"),
("2","Scott Cook","Co-founder","Intuit","Woodside","$5-7bn","Long-liquid","No yacht on public record","None known","Personal office not public","Older, philanthropic; low probability.","Appetite"),
("2","Tom Siebel","Founder and CEO","C3.ai; Siebel Systems","Woodside / Montana","$3-4bn","Long-liquid; C3.ai","No yacht on public record","Ranch and outdoors","Siebel family office","Owns ranches, not boats. Low probability, high value.","Appetite"),
# ---- Tier 3: VC and investor wealth, and watch-list ----
("3","Vinod Khosla","Founder","Khosla Ventures","Portola Valley","$6-8bn","Long-liquid","No yacht on public record","Coastal property (Martins Beach dispute)","Khosla Ventures","Litigious about coast access; unlikely yacht buyer.","Appetite"),
("3","John Doerr","Chairman","Kleiner Perkins","Woodside","$12-14bn","Long-liquid","No yacht on public record","None known","Kleiner Perkins","Climate-focused; a hybrid or sail brief only.","Appetite"),
("3","Sir Michael Moritz","Partner emeritus","Sequoia Capital","San Francisco","$5-6bn","Long-liquid","No yacht on public record","Welsh-born; British links","Crankstart (foundation)","British; Foreland London base resonates. Philanthropy-heavy.","Appetite"),
("3","Doug Leone","Partner emeritus","Sequoia Capital","Atherton","$6-8bn","Long-liquid","No yacht on public record","Italian-born","Personal office not public","Italian-born, Med affinity; Italian yard familiarity helps.","Any yacht ownership"),
("3","Marc Andreessen","Co-founder","Andreessen Horowitz","Atherton / Malibu","$2-3bn","Long-liquid","No yacht on public record","Malibu coastal property","a16z","Coastal property collector; ownership possible but unrecorded.","Residence"),
("3","David Sacks","Co-founder Craft Ventures; White House AI and crypto adviser","VC","San Francisco","$1-2bn","PayPal, Yammer; long-liquid","No yacht on public record","None known","Craft Ventures","Public role until at least 2026 limits large purchases; watch list.","Role status"),
("3","Chamath Palihapitiya","Founder","Social Capital","Palo Alto","$1-1.5bn","SPAC-era liquidity","No yacht on public record","None known","Social Capital","Public poker, private jets; yacht is the obvious next asset.","Appetite"),
("3","Tim Draper","Founder","Draper Associates / DFJ","Atherton","$1-2bn","Long-liquid; bitcoin holdings","No yacht on public record","None known","Draper Associates","Extrovert; would enjoy a public first-owner story.","Appetite"),
("3","Ron Conway","Founder","SV Angel","San Francisco","$1-2bn","Long-liquid","No yacht on public record","None known","SV Angel","Highly networked; more valuable as a referrer than a buyer.","Appetite"),
("3","Ram Shriram","Founder","Sherpalo Ventures; early Google investor","Menlo Park","$3-4bn","Long-liquid","No yacht on public record","None known","Sherpalo","Private; approach only through intermediary.","Appetite"),
("3","Joe Lacob","Owner Golden State Warriors; partner emeritus Kleiner","Sports / VC","Atherton","$2-3bn","Warriors valuation; long-liquid","No yacht on public record","None known","Personal office not public","Sports-owner peer group already yacht-heavy; social pull.","Appetite"),
("3","Sheryl Sandberg","Former COO","Meta","Menlo Park","$2-3bn","Long-liquid","No yacht on public record","None known","Personal office not public","Post-Meta; philanthropy-heavy. Low probability.","Appetite"),
("3","Reid Hoffman","Co-founder LinkedIn; partner Greylock","LinkedIn / VC","Palo Alto / Seattle","$2.5-3bn","Long-liquid","No yacht on public record","None known","Iconiq Capital (reported client)","Public intellectual; low probability.","Residence"),
("3","Elad Gil","Solo investor","VC","San Francisco","$1-2bn","Long-liquid; AI-cycle gains","No yacht on public record","None known","Personal office not public","Quiet; intermediary only.","Net worth"),
("3","Dario Amodei","Co-founder and CEO","Anthropic","San Francisco","$1-3bn (paper)","Anthropic tenders 2025-26","No yacht on public record","None known","Personal office not public","Paper wealth; safety-focused public image; watch list only.","Cash taken"),
("3","Sam Altman","CEO","OpenAI","San Francisco","$1-2bn (non-OpenAI)","Long-liquid via investments","No yacht on public record","None known","Hydrazine Capital","Very public; low probability, watch list.","Appetite"),
]

assert len(rows) >= 50, len(rows)

wb = Workbook()
ws = wb.active
ws.title = "Prospects"
hdr = ["Tier","Name","Role","Company / sector","Base","Est. net worth (public)","Liquidity / timing","Yacht status (public record)","Boating or sailing affinity","Likely route in","Angle for Foreland","Verify before outreach"]
ws.append(hdr)
for r in rows:
    ws.append(list(r))

thin = Side(style="thin", color="D9D9D9")
for c in ws[1]:
    c.font = Font(name="Aptos", bold=True, color="FFFFFF", size=11)
    c.fill = PatternFill("solid", fgColor=NAVY)
    c.alignment = Alignment(vertical="center", wrap_text=True)
widths = [6,24,30,30,18,18,34,26,28,30,52,30]
for i,w in enumerate(widths,1):
    ws.column_dimensions[get_column_letter(i)].width = w
for row in ws.iter_rows(min_row=2):
    for c in row:
        c.font = Font(name="Aptos", size=10)
        c.alignment = Alignment(vertical="top", wrap_text=True)
        c.border = Border(bottom=thin)
ws.freeze_panes = "C2"
ws.auto_filter.ref = ws.dimensions

# Excluded sheet
ex = wb.create_sheet("Excluded")
ex.append(["Name","Reason excluded"])
for n,rsn in [
 ("Larry Ellison","Owns Musashi and others; Oracle Team USA"),
 ("Larry Page","Owns Senses (reported)"),
 ("Sergey Brin","Owns Dragonfly"),
 ("Eric Schmidt","Owns Whisper; bought and sold several"),
 ("Mark Zuckerberg","Launchpad and Wingman, 2024"),
 ("Jan Koum","Moonrise"),
 ("Laurene Powell Jobs","Venus"),
 ("Jim Clark","Athena, Hyperion, Comanche; serial owner"),
 ("Frank Slootman","Serial racing-yacht owner (Invisible Hand); no longer Bay Area"),
 ("Philippe Kahn","Pegasus Racing; long-standing sailor"),
 ("Jim Swartz","Vesper racing programme; Utah-based"),
 ("Jeff Bezos","Koru; Seattle / Miami"),
 ("Mike Cannon-Brookes","Owns yachts; Sydney"),
 ("Peter Thiel","LA / Miami"),
 ("Palmer Luckey","Orange County"),
 ("Dustin Moskovitz","Effective-altruism commitments make purchase implausible"),
 ("Brian Acton","Same; Signal Foundation"),
 ("David Cheriton","Publicly frugal"),
 ("Andy Bechtolsheim","Publicly frugal; extremely private"),
 ("Ben Horowitz","Las Vegas"),
 ("Keith Rabois","Miami"),
 ("Jason Calacanis","Austin"),
 ("Bill Gurley","Austin"),
 ("Travis Kalanick","Los Angeles"),
 ("Evan Spiegel","Los Angeles"),
]:
    ex.append([n,rsn])
ex.column_dimensions["A"].width = 26; ex.column_dimensions["B"].width = 70
for c in ex[1]:
    c.font = Font(name="Aptos", bold=True, color="FFFFFF"); c.fill = PatternFill("solid", fgColor=NAVY)

# Routes sheet
rt = wb.create_sheet("Routes in")
rt.append(["Channel","Names","Why"])
for r in [
 ("Multi-family offices","Iconiq Capital (SF), Jordan Park Group (SF), Hall Capital Partners (SF), Bessemer Trust SF, Goldman Sachs PWM SF, Morgan Stanley Private Wealth Menlo Park, J.P. Morgan Private Bank SF (ex-First Republic book)","Most Tier 1 and 2 principals have no public family office; the wealth manager is the gate. Pitch the adviser, not the principal."),
 ("Yacht clubs","St. Francis Yacht Club, San Francisco Yacht Club (Belvedere), Corinthian Yacht Club (Tiburon)","StFYC membership overlaps heavily with Tier 2 and 3; Rolex Big Boat Series (Sept) is the annual gathering."),
 ("Lawyers and CPAs","Cooley, Wilson Sonsini, Fenwick, Gunderson private-client groups; Frank Rimerman, Seiler LLP","Post-IPO founders use their company counsel's private-client arm for the first big purchase."),
 ("Brokers (referral, not affiliation)","Fraser SF office, Northrop and Johnson West Coast, Denison Sausalito","Independence positioning: Foreland takes no commission, so brokers gain a technical partner rather than a competitor."),
 ("Publication","The First Owner's Reference, 1st Edition Q4 2026","Send numbered copies to the Tier 1 and 2 principals and their advisers; the book is the outreach."),
 ("Events","Monaco Yacht Show (Sept), Fort Lauderdale (Oct), Palm Beach (Mar); TED Vancouver, Sun Valley (Allen and Co)","Tech principals attend Sun Valley and TED, not boat shows. Advisers attend both."),
]:
    rt.append(list(r))
for i,w in enumerate([26,70,80],1):
    rt.column_dimensions[get_column_letter(i)].width = w
for c in rt[1]:
    c.font = Font(name="Aptos", bold=True, color="FFFFFF"); c.fill = PatternFill("solid", fgColor=NAVY)
for sh in (ex, rt):
    for row in sh.iter_rows(min_row=2):
        for c in row:
            c.font = Font(name="Aptos", size=10); c.alignment = Alignment(vertical="top", wrap_text=True)

# Notes sheet
nt = wb.create_sheet("Notes")
for line in [
 "Bay Area tech first-owner prospect list, built 10 September 2026.",
 "Basis: public profiles (Forbes, Bloomberg, IPO filings, press) to mid-2026. Live web verification was unavailable when the list was built, so net worth and residence entries are estimates and must be checked before any approach.",
 "'No yacht on public record' means no ownership has been reported in the trade press or on the usual registries as far as known; it is not proof of non-ownership.",
 "No private contact details are held here. Route in via the public vehicles listed and the Routes in sheet.",
 "Tier 1: recent liquidity, no known yacht, plausible purchase within 24 months. Tier 2: established liquid wealth, slower. Tier 3: investor wealth and watch list.",
 "Excluded sheet lists Bay Area tech figures removed because they already own, have left the region, or are implausible buyers.",
]:
    nt.append([line])
nt.column_dimensions["A"].width = 140
for row in nt.iter_rows():
    for c in row:
        c.font = Font(name="Aptos", size=10); c.alignment = Alignment(wrap_text=True, vertical="top")

out = "/Users/jack/foreland-marine-v2/docs/sales/bay-area-first-owner-prospects.xlsx"
wb.save(out)
print(out, len(rows))
