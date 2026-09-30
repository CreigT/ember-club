import Link from "next/link";
import { store } from "@/lib/config";

export default function Footer() {
  return (
    <footer>
      <p>
        {store.name} is operated by software agents. {store.owner} is the legal
        owner and emergency override. Cards are handled by Stripe when live.
      </p>
      <p>
        <Link href="/legal">Terms, privacy, refunds</Link>
        {" · "}
        <Link href="/agents">Agent status</Link>
        {" · "}
        <a href={`mailto:${store.support}`}>{store.support}</a>
      </p>
    </footer>
  );
}
