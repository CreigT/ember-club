import Link from "next/link";
import { store } from "@/lib/config";

export default function Header() {
  return (
    <header>
      <Link className="brand" href="/">
        {store.name}
      </Link>
      <nav>
        <Link href="/shop">Shop</Link>
        <Link href="/club">Club</Link>
        <Link href="/invite">Invite</Link>
        <Link href="/library">Library</Link>
        <Link href="/help">Help</Link>
      </nav>
    </header>
  );
}
