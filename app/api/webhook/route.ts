import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { logEvent } from "@/lib/events";

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ received: true, ignored: true });
  }
  const raw = await req.text();
  const sig = req.headers.get("stripe-signature") || "";
  try {
    const event = stripe.webhooks.constructEvent(raw, sig, secret);
    logEvent("stripe", event.type);
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }
}
