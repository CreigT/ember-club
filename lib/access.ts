import { createHmac } from "crypto";
import { cookies } from "next/headers";
import { store } from "./config";

export type Pass = {
  email: string;
  slugs: string[];
  stamps: number;
  code: string;
  exp: number;
};

function sign(payload: string) {
  return createHmac("sha256", store.secret).update(payload).digest("hex");
}

export function encodePass(pass: Pass) {
  const body = Buffer.from(JSON.stringify(pass)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function decodePass(token?: string | null): Pass | null {
  if (!token || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  if (sign(body) !== sig) return null;
  try {
    const pass = JSON.parse(Buffer.from(body, "base64url").toString()) as Pass;
    if (!pass.email || pass.exp < Date.now()) return null;
    return {
      email: pass.email,
      slugs: pass.slugs || [],
      stamps: pass.stamps || 0,
      code: pass.code || makeCode(pass.email),
      exp: pass.exp,
    };
  } catch {
    return null;
  }
}

export function makeCode(email: string) {
  return createHmac("sha256", store.secret)
    .update(email.toLowerCase())
    .digest("hex")
    .slice(0, 8);
}

export async function readPass() {
  const jar = await cookies();
  return decodePass(jar.get("ember_pass")?.value);
}

export function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  };
}

export function grant(email: string, slug: string, previous?: Pass | null): Pass {
  const slugs = Array.from(new Set([...(previous?.slugs || []), slug]));
  const already = previous?.slugs?.includes(slug);
  const stamps = (previous?.stamps || 0) + (already ? 0 : 1);
  return {
    email: email.toLowerCase().trim(),
    slugs,
    stamps,
    code: previous?.code || makeCode(email),
    exp: Date.now() + 1000 * 60 * 60 * 24 * 180,
  };
}
