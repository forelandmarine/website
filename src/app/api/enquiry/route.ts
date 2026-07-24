import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { resend, FROM_EMAIL, INTERNAL_NOTIFY_EMAIL } from "@/lib/resend";

type EnquiryBody = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  vesselName?: string;
  message?: string;
  source?: string;
};

// Public endpoint: inserts a website enquiry into fm_enquiries via the service
// role (RLS blocks anon reads/writes), and sends an internal notification.
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as EnquiryBody | null;
  if (!body || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const admin = getSupabaseAdmin();
  if (admin) {
    const { error } = await admin.from("fm_enquiries").insert({
      name: body.name?.trim() || null,
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      service: body.service?.trim() || null,
      vessel_name: body.vesselName?.trim() || null,
      message: body.message.trim(),
      source: body.source?.trim() || "website",
    });
    if (error) {
      console.error("Failed to insert enquiry:", error);
      // Fall through — still try to email so nothing is lost.
    }
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: INTERNAL_NOTIFY_EMAIL,
      replyTo: body.email,
      subject: `Website enquiry: ${body.name || body.email}`,
      text: [
        `Name: ${body.name || "—"}`,
        `Email: ${body.email}`,
        `Phone: ${body.phone || "—"}`,
        `Service: ${body.service || "—"}`,
        `Vessel: ${body.vesselName || "—"}`,
        ``,
        body.message,
      ].join("\n"),
    });
  } catch (err) {
    console.error("Failed to send enquiry notification:", err);
  }

  return NextResponse.json({ ok: true });
}
