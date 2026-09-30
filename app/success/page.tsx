"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SuccessPage() {
  const [msg, setMsg] = useState("Opening your library…");

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id") || "";
    fetch("/api/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) window.location.href = "/library";
        else setMsg(data.error || "Could not claim. Open Help.");
      })
      .catch(() => setMsg("Could not claim. Open Help."));
  }, []);

  return (
    <>
      <h1>Thank you</h1>
      <p className="lede">{msg}</p>
      <Link href="/library">Go to library</Link>
    </>
  );
}
