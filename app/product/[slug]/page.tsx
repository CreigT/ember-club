import { notFound } from "next/navigation";
import { formatPrice, getProduct } from "@/lib/products";
import { store } from "@/lib/config";
import CheckoutForm from "@/components/CheckoutForm";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <p className="note">{store.demo ? "Demo mode — no card charge." : "Live checkout through Stripe."}</p>
      <h1>{product.name}</h1>
      <div className="price">{formatPrice(product.priceCents)}</div>
      <p className="lede">{product.blurb}</p>
      <p>{product.who}</p>
      <div className="card" style={{ maxWidth: 420, marginTop: 24 }}>
        <CheckoutForm slug={product.slug} label={`Pay ${formatPrice(product.priceCents)}`} />
        <p className="note">14-day refund request. Files open on this device after payment.</p>
      </div>
    </>
  );
}
