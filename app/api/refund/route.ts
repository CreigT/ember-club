import { NextResponse } from "next/server";
import { logEvent } from "@/lib/events";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "");
  const reason = String(body.reason || "").slice(0, 2000);
  if (!email.includes("@") || reason.length < 4) {
    return NextResponse.json({ error: "Need the checkout email and a reason." }, { status: 400 });
  }
  logEvent("refund.request", `${email}: ${reason.slice(0, 80)}`);
  return NextResponse.json({
    message: "Request filed. No money moved. The owner reviews refunds.",
    moneyMoved: false,
  });
}
