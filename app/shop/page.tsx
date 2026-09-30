import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
  return (
    <>
      <h1>Shop</h1>
      <p className="lede">Three prices. No upsells on the button. Paywalls stay inside this range.</p>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}
