import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { cookieOptions, encodePass, grant, readPass } from "@/lib/access";
import { logEvent } from "@/lib/events";

export async function POST(req: Request) {
  const { sessionId } = await req.json().catch(() => ({ sessionId: "" }));
  const stripe = getStripe();
  if (!sessionId || !stripe) {
    return NextResponse.json({ error: "No session to claim. Use demo checkout or wait for Stripe." }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(String(sessionId));
  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Payment is not complete." }, { status: 400 });
  }

  const email = String(session.customer_email || session.metadata?.email || "");
  const slug = String(session.metadata?.slug || "");
  if (!email || !slug) {
    return NextResponse.json({ error: "Session missing email or kit." }, { status: 400 });
  }

  const prev = await readPass();
  const pass = grant(email, slug, prev);
  const jar = await cookies();
  jar.set("ember_pass", encodePass(pass), cookieOptions());
  logEvent("claim.paid", `${email} ${slug}`);
  if (session.metadata?.ref) logEvent("referral.paid", session.metadata.ref);
  return NextResponse.json({ ok: true });
}
