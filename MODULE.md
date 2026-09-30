# Day 3 Module — Loyalty Club + Referral Desk

## 1. Module Name
Ember Club — Loyalty stamps, invite codes, and a complete readable shop.

## 2. Purpose
Give buyers a card they can understand: three purchases unlock the $9 Starter Kit if they do not already own it. Friends arrive through a plain invite link. The rest of the shop still sells, delivers, helps, and files refunds without a human operator.

## 3. Business Value
Repeat buyers and word of mouth beat paid ads at $9–$29. A visible stamp card raises second-purchase rate. Printed prices stay honest because referrals never discount the wall.

## 4. Agent Responsibilities
- Sales Agent: start checkout at $9 / $19 / $29
- Loyalty Agent: count stamps, grant Starter Kit at 3
- Affiliate Agent: record `ref` codes, never change price
- Customer Support Agent: log help notes
- Refund Agent: log requests, never call Stripe refunds
- CRM Agent: bind email to the signed cookie
- Governance Agent: owner freeze via `NEXT_PUBLIC_DEMO_MODE`
- Ethics Agent: no dark patterns, no hidden fees

## 5. Inputs
Buyer email, product slug, optional `ref` query, ticket text, refund reason, Stripe session id, env vars.

## 6. Outputs
Checkout URL or demo unlock, signed `ember_pass` cookie, library HTML, stamp count, invite code, ticket event, refund-pending event, health JSON.

## 7. APIs Required
`/api/checkout` `/api/claim` `/api/webhook` `/api/reward` `/api/ticket` `/api/refund` `/api/access` `/api/health` `/api/agent/status`

## 8. MCP Tools Required
None on the live path. GitHub + Vercel for deploy. Optional later: email send.

## 9. Databases Required
None to launch. Cookie is the member record. In-memory event log on the serverless instance. Add Postgres when two instances must share tickets.

## 10. Memory Requirements
HMAC cookie: email, slugs, stamps, invite code, expiry (~180 days).

## 11. Security Controls
httpOnly cookie, HMAC signature, webhook signature when live, secrets only on the server, demo mode default, refunds cannot move money.

## 12. Failure Recovery Strategy
Demo checkout works with empty Stripe keys. Health probe for Vercel. Owner freezes live mode with one env flag. Cookie can be re-issued by buying again in demo.

## 13. Agent-to-Agent Communications
`logEvent` is the bus. Loyalty reads stamps. Affiliate reads `referral.*`. Support reads tickets. Refund reads requests. Finance only sees Stripe in live mode.

## 14. Workflow Diagram (text)
Buyer → Shop → Product → Checkout (demo cookie or Stripe)
→ Success → Claim → Library
Each new kit → +1 stamp
3 stamps and no starter → Reward API → Starter in library
Friend uses /shop?ref=CODE → checkout metadata → referral event
Help → ticket event
Refund form → pending-owner event (no payout)

## 15. Data Flow
Env → catalog → checkout → entitlement cookie → library and club pages. Side paths write events only.

## 16. Decision Logic
If demo or no Stripe key → unlock immediately.
If live → Stripe Checkout, claim on success.
If stamps >= 3 and starter missing → allow reward.
If refund posted → log only, `moneyMoved: false`.
Invite codes never alter `priceCents`.

## 17. Escalation Rules
Refunds, chargebacks, legal claims, and any price outside $9 / $19 / $29 go to `SUPPORT_EMAIL`. Agents do not invent discounts.

## 18. KPIs
Checkout starts, demo vs live mix, library unlocks, stamps per buyer, rewards claimed, referral-attributed pays, tickets per 10 sales, refund requests, health uptime.

## 19. Logging Requirements
checkout.start, checkout.demo, claim.paid, loyalty.reward, referral.seen, referral.paid, ticket, refund.request, stripe event type.

## 20. Audit Trail Requirements
Event fields: id, time, kind, detail. Cookie payload is the member ledger.

## 21. Compliance Requirements
Printed prices. 14-day refund *request* window. Owner approval for money. Privacy text on /legal. Stripe handles cards.

## 22. Future Expansion Ideas
Postgres member table, Resend receipt mailer, owner one-click refund token, paid affiliate payouts under a cap, monthly membership at $29.

## 23. Risks
In-memory logs vanish on cold start. Access is browser-bound. Demo mode on a public URL looks like a free store. Invite codes are not anti-fraud strong.

## 24. Testing Strategy
`npm run build`. Hit `/api/health`. Demo-buy Starter and Playbook. Confirm stamps on /club. Third purchase path or two extra demo buys, claim reward. Submit help and refund. Confirm `moneyMoved: false`.

## 25. Production Readiness Checklist
- [ ] Env vars set on Vercel
- [ ] STORE_SECRET is long and random
- [ ] STORE_URL matches the live domain
- [ ] Demo mode understood
- [ ] Stripe webhook only when live
- [ ] Support email is a real inbox
- [ ] Legal page names the owner

## 26. Suggested Technology Stack
Next.js 15, React 19, TypeScript, Stripe, Vercel, HMAC cookies.

## 27. Cost Estimate
Hobby Vercel $0. Stripe 2.9% + $0.30 live only. Domain ~$12/year. No LLM cost in this module.

## 28. Deployment Plan
GitHub repo exists → Import in Vercel → paste env → deploy → set STORE_URL → redeploy → open /api/health.

## 29. Maintenance Strategy
Edit copy in `lib/products.ts`. Change stamp threshold in `lib/config.ts` (`stampsForReward`). Rotate STORE_SECRET only if you can re-issue access.

## 30. Opportunities for Additional AI Automation
Draft ticket replies, remind a buyer they are one stamp away, summarize referral sources weekly for the owner.

---

Completed today: Ember Club — full simple shop + loyalty + referrals.
Depends on: aurea-commerce / cove-shop storefront, quay-fulfillment locker idea.
Tomorrow: Receipt & welcome mailer (plain email + one $9 launch-note paywall).
Remaining platform: about 30%.
