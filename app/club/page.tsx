import { readPass } from "@/lib/access";
import { clubCopy } from "@/lib/loyalty";
import { store } from "@/lib/config";
import Link from "next/link";
import ClaimReward from "@/components/ClaimReward";

export default async function ClubPage() {
  const pass = await readPass();
  const club = clubCopy(pass);

  return (
    <>
      <h1>Loyalty club</h1>
      <p className="lede">
        Every paid kit adds one stamp. {store.stampsForReward} stamps unlock the
        Starter Kit if you do not already own it. No points math.
      </p>
      <div className="card">
        <p>
          {Array.from({ length: store.stampsForReward }).map((_, i) => (
            <span key={i} className={`stamp ${i < club.have ? "on" : ""}`} />
          ))}
        </p>
        <p>
          You have <strong>{club.have}</strong> stamp{club.have === 1 ? "" : "s"}.
          {club.need > 0 ? ` ${club.need} more to a reward.` : " Reward is ready."}
        </p>
        {pass ? <p className="note">Signed in as {pass.email}</p> : <p className="note">Buy any kit to start the card.</p>}
        {club.ready ? <ClaimReward /> : null}
      </div>
      <p>
        <Link href="/invite">Share your invite code</Link> to help a friend find the shop.
      </p>
    </>
  );
}
