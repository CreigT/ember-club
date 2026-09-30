"use client";

import { useState } from "react";

export default function RefundPage() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [done, setDone] = useState("");

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/refund", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, reason }),
    });
    const data = await res.json();
    setDone(data.message || data.error);
  }

  return (
    <>
      <h1>Ask for a refund</h1>
      <p className="lede">
        This form files a request. It does not move money. The owner reviews
        refunds. Window: 14 days from purchase.
      </p>
      <form onSubmit={send} className="card" style={{ maxWidth: 480 }}>
        <label>Email used at checkout</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Reason</label>
        <textarea rows={5} required value={reason} onChange={(e) => setReason(e.target.value)} />
        <button className="btn" type="submit">
          File request
        </button>
        {done ? <p className="note">{done}</p> : null}
      </form>
    </>
  );
}
