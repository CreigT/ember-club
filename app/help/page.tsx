"use client";

import { useState } from "react";

export default function HelpPage() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState("");

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, note }),
    });
    const data = await res.json();
    setDone(data.message || data.error);
  }

  return (
    <>
      <h1>Help</h1>
      <p className="lede">
        Most answers: files live on the Library page after you pay, in the same
        browser. Refund requests go on the refund page. Agents read this desk.
      </p>
      <form onSubmit={send} className="card" style={{ maxWidth: 480 }}>
        <label>Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>What happened</label>
        <textarea rows={5} required value={note} onChange={(e) => setNote(e.target.value)} />
        <button className="btn" type="submit">
          Send to the desk
        </button>
        {done ? <p className="note">{done}</p> : null}
      </form>
      <p className="note">High-impact money moves stay with the owner.</p>
    </>
  );
}
