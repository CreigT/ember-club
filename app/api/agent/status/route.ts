import { NextResponse } from "next/server";
import { listEvents } from "@/lib/events";
import { store } from "@/lib/config";

export function GET() {
  return NextResponse.json({
    module: "loyalty-referral-desk",
    agents: ["sales", "loyalty", "affiliate", "support", "refund", "governance"],
    demo: store.demo,
    events: listEvents().slice(0, 20),
  });
}
