# BAC STE Tutor — build plan

Goal: ship a live, monetizable revision app in small vertical slices. Each milestone runs end to end (thin version of every layer), gets tested and committed before the next starts.

## Milestone 0 — Foundation (this slice)
- [ ] Scaffold Next.js + TS + Tailwind + shadcn/ui. Verify: `npm run build` succeeds.
- [ ] Add design tokens from Convio Design. Verify: tokens declared once in `globals.css`, no literal colours elsewhere.
- [ ] Create content model + 20 maths / 20 English questions in `content/`. Verify: schema validation script passes.
- [ ] Build landing page. Verify: lighthouse-ish manual check, 360px–1920px, no overflow.

## Milestone 1 — Practice vertical slice
- [ ] Practice page: pick subject/topic, answer MCQ, instant feedback + explanation. Verify: play through in browser.
- [ ] Progress stored locally (and DB later). Verify: reload keeps progress.
- [ ] Tutor page: explanation lookup + step-by-step hints from content. Verify: answers render.

## Milestone 2 — Accounts and data
- [ ] Postgres (Convio Neon) + Drizzle schema: users, attempts, subscriptions.
- [ ] Better Auth email/password. Verify: sign up, sign in, sign out.
- [ ] Persist attempts per user. Verify: two users see separate progress.

## Milestone 3 — Monetisation
- [ ] Pricing page with Free vs Premium tiers.
- [ ] Stripe checkout (test mode) + webhook to mark subscription active.
- [ ] Gate premium topics/explanations. Verify: free user blocked, premium user allowed.

## Milestone 4 — Launch
- [ ] Security review (Convio stage): authz on every route, input validation, secrets not in client.
- [ ] Tests: unit for scoring/gating, e2e for signup → practice → upgrade.
- [ ] Deploy to Netlify, set env vars, smoke-test production.

## Checkpoints (call `next_stage`)
- Design
- Scaffold
- Data and auth
- Build features
- Security review
- Test thoroughly
- Ship
