import { NextResponse } from "next/server";
import { store, isLiveStripe } from "@/lib/config";

export function GET() {
  return NextResponse.json({
    ok: true,
    module: "ember-club",
    day: 3,
    store: store.name,
    demo: store.demo,
    liveStripe: isLiveStripe(),
  });
}
