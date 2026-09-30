export type Product = {
  slug: string;
  name: string;
  priceCents: number;
  blurb: string;
  who: string;
  files: { title: string; body: string }[];
};

export const products: Product[] = [
  {
    slug: "starter",
    name: "Starter Kit",
    priceCents: 900,
    blurb: "One page plan, a 7-day checklist, and a price sheet you can copy.",
    who: "First sale. Most people start here.",
    files: [
      {
        title: "7-day checklist",
        body: "Day 1 pick one offer. Day 2 write the landing in plain words. Day 3 print three prices. Day 4 collect one email. Day 5 sell once. Day 6 ask for a review. Day 7 keep what worked.",
      },
      {
        title: "Price sheet",
        body: "Starter $9. Playbook $19. Desk $29. No hidden fees. Refund request window is 14 days.",
      },
    ],
  },
  {
    slug: "playbook",
    name: "Weekly Playbook",
    priceCents: 1900,
    blurb: "A simple weekly loop: find a buyer, send one note, close one $9–$29 sale.",
    who: "If the starter kit already made sense.",
    files: [
      {
        title: "Weekly loop",
        body: "Monday pick a person. Tuesday send a useful note. Wednesday publish one page. Thursday ask for the sale. Friday deliver. Weekend rest.",
      },
      {
        title: "Note template",
        body: "I made a short kit that does X. It costs $19. If it does not help in 14 days, ask for a refund. Here is the page: [link].",
      },
    ],
  },
  {
    slug: "desk",
    name: "Owner Desk",
    priceCents: 2900,
    blurb: "Scripts for help, refunds, loyalty stamps, and a one-page owner override.",
    who: "When you already have buyers and need a calm desk.",
    files: [
      {
        title: "Help script",
        body: "Thank you. Your files live on /library after checkout. If the page is blank, use the same browser and email. Write us if that fails.",
      },
      {
        title: "Owner override",
        body: "The owner may pause live checkout by setting NEXT_PUBLIC_DEMO_MODE=true. Agents do not move money above printed prices.",
      },
    ],
  },
];

export function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(0)}`;
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
