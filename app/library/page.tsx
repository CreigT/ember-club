import { readPass } from "@/lib/access";
import { getProduct } from "@/lib/products";
import Link from "next/link";

export default async function LibraryPage() {
  const pass = await readPass();
  if (!pass) {
    return (
      <>
        <h1>Library</h1>
        <p className="lede">Nothing is unlocked on this browser yet.</p>
        <Link className="btn" href="/shop">
          Buy a kit
        </Link>
      </>
    );
  }

  const owned = pass.slugs.map((s) => getProduct(s)).filter(Boolean);

  return (
    <>
      <h1>Your library</h1>
      <p className="note">{pass.email} · {pass.stamps} stamp{pass.stamps === 1 ? "" : "s"}</p>
      {owned.length === 0 ? <p>No files yet.</p> : null}
      {owned.map((p) => (
        <article className="card" key={p!.slug} style={{ marginBottom: 16 }}>
          <h2 style={{ marginTop: 0 }}>{p!.name}</h2>
          {p!.files.map((f) => (
            <div key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </article>
      ))}
    </>
  );
}
