"use client";

import { useState } from "react";

export default function ClaimReward() {
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function claim() {
    setBusy(true);
    const res = await fetch("/api/reward", { method: "POST" });
    const data = await res.json();
    setMsg(data.error || data.message || "Done");
    setBusy(false);
    if (res.ok) window.location.href = "/library";
  }

  return (
    <div>
      <button className="btn" disabled={busy} onClick={claim} type="button">
        {busy ? "Claiming…" : "Claim Starter Kit"}
      </button>
      {msg ? <p className="note">{msg}</p> : null}
    </div>
  );
}
