"use client";

import { useState } from "react";

export default function CheckoutForm({
  slug,
  label,
}: {
  slug: string;
  label: string;
}) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function buy(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const ref = new URLSearchParams(window.location.search).get("ref") || "";
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, email, ref }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={buy}>
      <label htmlFor="email">Email for your library</label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <button className="btn" disabled={busy} type="submit">
        {busy ? "Working…" : label}
      </button>
      {error ? <p className="note">{error}</p> : null}
    </form>
  );
}
