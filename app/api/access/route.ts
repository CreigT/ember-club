import { NextResponse } from "next/server";
import { readPass } from "@/lib/access";
import { clubCopy } from "@/lib/loyalty";

export async function GET() {
  const pass = await readPass();
  if (!pass) return NextResponse.json({ signedIn: false });
  return NextResponse.json({
    signedIn: true,
    email: pass.email,
    slugs: pass.slugs,
    club: clubCopy(pass),
  });
}
