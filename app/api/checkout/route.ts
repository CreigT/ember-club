import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { store, isLiveStripe } from "@/lib/config";
import { cookieOptions, encodePass, grant, decodePass } from "@/lib/access";
import { getStripe } from "@/lib/stripe";
import { logEvent } from "@/lib/events";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const slug = String(body.slug || "");
  const email = String(body.email || "").toLowerCase().trim();
  const ref = String(body.ref || "").slice(0, 16);
  const product = getProduct(slug);
  if (!product || !email.includes("@")) {
    return NextResponse.json({ error: "Need a kit and a real email." }, { status: 400 });
  }

  logEvent("checkout.start", `${email} ${slug} ref=${ref || "none"}`);

  if (!isLiveStripe()) {
    const prev = decodePass(req.headers.get("cookie")?.match(/ember_pass=([^;]+)/)?.[1] || "");
    const pass = grant(email, slug, prev);
    const res = NextResponse.json({ url: `${store.url}/library` });
    res.cookies.set("ember_pass", encodePass(pass), cookieOptions());
    if (ref) logEvent("referral.seen", ref);
    logEvent("checkout.demo", email);
    return res;
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    success_url: `${store.url}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${store.url}/product/${slug}`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: product.priceCents,
          product_data: { name: product.name },
        },
      },
    ],
    metadata: { slug, email, ref },
  });

  return NextResponse.json({ url: session.url });
}
