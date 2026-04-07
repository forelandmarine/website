import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.role) {
    return NextResponse.json({ error: "Name, email and role are required." }, { status: 400 });
  }

  if (!["captain", "owner"].includes(body.role)) {
    return NextResponse.json({ error: "Invalid role." }, { status: 400 });
  }

  const { error } = await supabase.from("interest_submissions").insert({
    name: body.name,
    email: body.email,
    role: body.role,
    message: body.message || null,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
