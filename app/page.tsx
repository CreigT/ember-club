import Link from "next/link";
import { store } from "@/lib/config";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  return (
    <>
      <p className="note">A quiet digital shop. No account maze.</p>
      <h1>Buy a small kit. Keep a loyalty card. Invite a friend.</h1>
      <p className="lede">
        {store.name} sells three written kits at $9, $19, and $29. After three
        purchases you may claim the Starter Kit if you do not already have it.
        Agents run the desk. You only set variables and deploy.
      </p>
      <div className="row" style={{ marginTop: 20 }}>
        <Link className="btn" href="/shop">
          See the three kits
        </Link>
        <Link className="btn ghost" href="/club">
          How the club works
        </Link>
      </div>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}
