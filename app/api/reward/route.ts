import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { cookieOptions, encodePass, grant, readPass } from "@/lib/access";
import { rewardReady } from "@/lib/loyalty";
import { logEvent } from "@/lib/events";

export async function POST() {
  const pass = await readPass();
  if (!rewardReady(pass)) {
    return NextResponse.json({ error: "Need three stamps and no Starter Kit yet." }, { status: 400 });
  }
  const next = grant(pass!.email, "starter", pass);
  const jar = await cookies();
  jar.set("ember_pass", encodePass(next), cookieOptions());
  logEvent("loyalty.reward", pass!.email);
  return NextResponse.json({ ok: true, message: "Starter Kit is in your library." });
}
