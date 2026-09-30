import { store } from "./config";
import type { Pass } from "./access";

export function rewardReady(pass: Pass | null) {
  if (!pass) return false;
  return pass.stamps >= store.stampsForReward && !pass.slugs.includes("starter");
}

export function clubCopy(pass: Pass | null) {
  const have = pass?.stamps || 0;
  const need = Math.max(0, store.stampsForReward - have);
  return {
    have,
    need,
    ready: rewardReady(pass),
    code: pass?.code || "",
  };
}
