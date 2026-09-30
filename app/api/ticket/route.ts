import { NextResponse } from "next/server";
import { logEvent } from "@/lib/events";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "");
  const note = String(body.note || "").slice(0, 2000);
  if (!email.includes("@") || note.length < 4) {
    return NextResponse.json({ error: "Need an email and a short note." }, { status: 400 });
  }
  logEvent("ticket", `${email}: ${note.slice(0, 80)}`);
  return NextResponse.json({ message: "The support agent has the note. Check your library first." });
}
