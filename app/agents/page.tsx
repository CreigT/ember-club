import { listEvents } from "@/lib/events";
import { store } from "@/lib/config";

export default function AgentsPage() {
  const events = listEvents();
  return (
    <>
      <h1>Agent status</h1>
      <p className="lede">
        Public heartbeat for the shop agents. Demo mode is {String(store.demo)}.
      </p>
      <div className="card">
        <p>Sales Agent — checkout</p>
        <p>Loyalty Agent — stamps and starter reward</p>
        <p>Affiliate Agent — records invite codes, never changes price</p>
        <p>Support Agent — tickets</p>
        <p>Refund Agent — requests only</p>
        <p>Governance Agent — owner override via env vars</p>
      </div>
      <h2>Recent events</h2>
      {events.length === 0 ? <p className="note">Quiet so far. Cold starts clear this list.</p> : null}
      {events.map((e) => (
        <p key={e.id} className="note">
          {e.time} · {e.kind} · {e.detail}
        </p>
      ))}
    </>
  );
}
