# Ember Club

Day 3 of the autonomous AI commerce system.

A complete, simple shop ordinary people can read:

- Landing page
- Three kits at **$9 / $19 / $29**
- Library after checkout
- Loyalty card (3 stamps → Starter Kit)
- Invite link that does not change the price
- Help desk and refund *request* (no silent money movement)
- Agent status page

Agents run the desk. You are the legal owner and emergency override.

## What you do

1. Import this repo into Vercel: https://github.com/CreigT/ember-club
2. Copy `.env.example` into Vercel → Settings → Environment Variables.
3. Set `STORE_URL` to your Vercel URL after the first deploy, then redeploy.
4. Leave `NEXT_PUBLIC_DEMO_MODE=true` until you add Stripe keys.

That is the whole owner loop.

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Live Stripe (optional)

Set `NEXT_PUBLIC_DEMO_MODE=false` and add:

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET` (endpoint: `/api/webhook`)

Refunds still do **not** call Stripe. They only log a request.

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Landing |
| `/shop` | Catalog |
| `/product/starter` | $9 paywall |
| `/product/playbook` | $19 paywall |
| `/product/desk` | $29 paywall |
| `/library` | Unlocked files |
| `/club` | Stamps |
| `/invite` | Referral code |
| `/help` | Ticket |
| `/refund` | Refund request |
| `/legal` | Terms |
| `/agents` | Agent heartbeat |

## Previous modules this sits on

- Storefront + paywall: `aurea-commerce`, `cove-shop`, `ai-commerce`
- Fulfillment locker: `quay-fulfillment`
- Care desk: `cove-shop`
