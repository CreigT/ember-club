import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card">
      <h2 style={{ marginTop: 0 }}>{product.name}</h2>
      <div className="price">{formatPrice(product.priceCents)}</div>
      <p>{product.blurb}</p>
      <p className="note">{product.who}</p>
      <Link className="btn" href={`/product/${product.slug}`}>
        View
      </Link>
    </article>
  );
}
