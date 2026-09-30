export const store = {
  name: process.env.STORE_NAME || "Ember Club",
  url: (process.env.STORE_URL || "http://localhost:3000").replace(/\/$/, ""),
  support: process.env.SUPPORT_EMAIL || "owner@example.com",
  owner: process.env.OWNER_NAME || "Legal Owner",
  secret: process.env.STORE_SECRET || "dev-only-secret-change-me",
  demo: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",
  stampsForReward: 3,
};

export function isLiveStripe() {
  return !store.demo && Boolean(process.env.STRIPE_SECRET_KEY);
}
