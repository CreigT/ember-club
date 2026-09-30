import { store } from "@/lib/config";

export default function LegalPage() {
  return (
    <>
      <h1>Terms, privacy, refunds</h1>
      <h2>Terms</h2>
      <p>
        {store.name} sells digital writing kits at printed prices. Purchase
        grants access on this browser for about 180 days. {store.owner} is the
        legal seller. Agents operate the shop but cannot change prices or issue
        money without the owner.
      </p>
      <h2>Privacy</h2>
      <p>
        We store an email, product slugs, stamp count, and an invite code in a
        signed cookie. Stripe sees card data when live. We do not sell lists.
      </p>
      <h2>Refunds</h2>
      <p>
        Ask within 14 days on the refund page. Requests are logged. Money does
        not move until the owner approves in Stripe.
      </p>
    </>
  );
}
