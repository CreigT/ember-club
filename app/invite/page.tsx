import { readPass } from "@/lib/access";
import { store } from "@/lib/config";
import Link from "next/link";

export default async function InvitePage() {
  const pass = await readPass();
  const link = pass ? `${store.url}/shop?ref=${pass.code}` : "";

  return (
    <>
      <h1>Invite a friend</h1>
      <p className="lede">
        Share a plain link. When they buy, the shop records the code. This is
        not a secret coupon and it does not change the printed price.
      </p>
      {pass ? (
        <div className="card">
          <p>
            Your code is <code>{pass.code}</code>
          </p>
          <p>
            Link: <code>{link}</code>
          </p>
          <p className="note">Copy it into a note. No tracking pixels.</p>
        </div>
      ) : (
        <p>
          Buy a kit first so the shop can print your code. <Link href="/shop">Go to shop</Link>
        </p>
      )}
    </>
  );
}
