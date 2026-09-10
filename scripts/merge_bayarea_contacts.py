"""Merge agent contact-route JSON files into a Contacts sheet in the prospects workbook.
Usage: python3 scripts/merge_bayarea_contacts.py <json files...>
Only published business channels are held: vehicle site, published inbox, publicly named staff, office address.
"""
import json, sys
from openpyxl import load_workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

NAVY="033269"
path="/Users/jack/foreland-marine-v2/docs/sales/bay-area-first-owner-prospects.xlsx"
wb=load_workbook(path)
prospects={r[1].value:(r[0].value,r[2].value,r[3].value) for r in wb["Prospects"].iter_rows(min_row=2)}

recs=[]
for f in sys.argv[1:]:
    txt=open(f).read()
    start=txt.find("["); end=txt.rfind("]")
    recs+=json.loads(txt[start:end+1])
by={r["name"].strip():r for r in recs}

if "Contacts" in wb.sheetnames:
    del wb["Contacts"]
ws=wb.create_sheet("Contacts",1)
hdr=["Tier","Name","Vehicle to write to","Vehicle URL","Published email","Email source","Named staff (public)","Staff source","Email pattern (unverified)","Pattern source","Office address (published)","Best route in","Confidence"]
ws.append(hdr)
missing=[]
for name,(tier,role,co) in prospects.items():
    r=by.get(name)
    if not r:
        missing.append(name); r={}
    g=lambda k: (r.get(k) or "none published") if r else "not researched"
    ws.append([tier,name,g("vehicle"),g("vehicle_url"),g("published_email"),g("email_source"),g("named_staff"),g("staff_source"),g("email_pattern"),g("pattern_source"),g("office_address"),g("best_route"),g("confidence")])

thin=Side(style="thin",color="D9D9D9")
for c in ws[1]:
    c.font=Font(name="Aptos",bold=True,color="FFFFFF",size=11); c.fill=PatternFill("solid",fgColor=NAVY); c.alignment=Alignment(vertical="center",wrap_text=True)
for i,w in enumerate([6,24,30,34,30,30,30,30,28,28,36,44,11],1):
    ws.column_dimensions[get_column_letter(i)].width=w
for row in ws.iter_rows(min_row=2):
    for c in row:
        c.font=Font(name="Aptos",size=10); c.alignment=Alignment(vertical="top",wrap_text=True); c.border=Border(bottom=thin)
ws.freeze_panes="C2"; ws.auto_filter.ref=ws.dimensions
wb.save(path)
print("merged",len(recs),"records; missing:",missing)
