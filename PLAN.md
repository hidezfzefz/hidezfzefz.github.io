# BAC STE Tutor — build plan

Goal: ship a live, monetizable revision app in small vertical slices. Each milestone runs end to end (thin version of every layer), gets tested and committed before the next starts.

## Milestone 0 — Foundation ✅
- [x] Scaffold Next.js + TS + Tailwind + Convio tokens. Verified: `npm run build` exports 8 routes.
- [x] Design tokens declared once in `app/globals.css`.
- [x] Content model + 24 maths/English questions in `lib/questions.ts`. Verified: schema test.
- [x] Landing page. Verified: 1440px and 390px screenshots, no overflow.

## Milestone 1 — Practice vertical slice ✅
- [x] Practice page: subject/topic, MCQ, instant feedback + explanation.
- [x] Progress stored locally. Verified: reload keeps progress.
- [x] Tutor search over the revision bank.

## Milestone 2 — Accounts and data ⏸ deferred to v2
- [ ] Postgres + Drizzle schema (users, attempts, subscriptions).
- [ ] Better Auth email/password.
- [ ] Persist attempts per user.
- Decision: v1 ships account-free to avoid collecting minors' data and to launch now.

## Milestone 3 — Monetisation 🟡 partial
- [x] Pricing page, free vs Premium.
- [x] Premium Payment Link slot (`NEXT_PUBLIC_STRIPE_PAYMENT_LINK`).
- [ ] Real Stripe checkout + webhook + server-side gating (needs owner's Stripe account).
- [ ] Gate premium content on the server.

## Milestone 4 — Launch ✅
- [x] Security review ([SECURITY.md](SECURITY.md)).
- [x] Unit tests: 6 passing.
- [x] Deploy to Netlify; live at <https://bacste-tutor.netlify.app>.
- [x] `robots.txt`, `sitemap.xml`, IndexNow submission.
- [ ] Owner: create Stripe account and Payment Link; submit sitemap in Search Console.

## Checkpoints (call `next_stage`)
- [x] Design
- [x] Scaffold
- [x] Data and auth (deliberately scoped out for v1)
- [x] Build features
- [x] Security review
- [x] Test thoroughly
- [x] Ship
