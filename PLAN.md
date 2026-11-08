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
- [x] Timed exam simulation (10 questions, 15 minutes, review) with best score on Progress.
- [x] Installable PWA: manifest, icons, service worker and offline shell.

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
- [x] Deploy to Netlify; live at <https://hidezfzefz.github.io>.
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

---

# Money layer — this run (prj_efada2a557ad0492c96f)

Goal: keep the live app 100% intact and add the checkout/shop layer that takes the first dirham. No rewrite, no DB/auth v1, no cost.

## Stack confirmed (from BRIEF-MONEY.md + stack-catalog, docs checked)
- Framework: Next.js 16 App Router (`output: "export"`, `trailingSlash: true`) — https://nextjs.org/docs. Already scaffolded. Server Components for SEO, Client Components only for interactivity (per Next.js App Router Patterns).
- Styling: Tailwind CSS v4 — https://tailwindcss.com/docs. Tokens live once in `app/globals.css` (`:root` + `@theme`). No literals elsewhere.
- Components: Existing `pill`/`card`/`container-page` (shadcn-style) + `components/PremiumActions.tsx`, `WaitlistForm`, `ShareButtons`. No new heavy lib.
- Backend: None v1 — static export. No Postgres/Auth (PLAN.md Milestone 2 deferred for minors). Future v2: Neon + Drizzle + Better Auth.
- Payments: Stripe Billing / Payment Links — https://docs.stripe.com/payments/checkout · https://docs.stripe.com/billing. Sandbox/test-mode first (`rk_` restricted keys when API is added; webhooks required for subscriptions in v2). Fallback: Ko-fi Shop + PayPal.me links (env `NEXT_PUBLIC_KOFI_URL`, `NEXT_PUBLIC_PAYPAL_ME`).
- Hosting: Existing GitHub Pages primary + Netlify mirror. Build: `npm run build` → `out/` → GitHub Actions deploy. No migration.
- Perf (per Vercel React Best Practices): static-first, no waterfalls, direct imports, `next/dynamic` for heavy sheets, minimal localStorage schema versioned (`bacste.*.v1`).

## Data model + permissions (v1 static)
- No tables. All state is client-side:
  - `bacste.attempts.v1` (Attempt[]): readable/writable by the user on that device only. Written via `recordAttempt()`, cleared via `resetAttempts()`. Cap 1000 entries. No server sync.
  - `bacste.premium.v1` ("1"): demo flag only (`isPremium()`/`setPremium()`). Never trusted for paid access in prod — real entitlement comes from Stripe receipts (v2: `customer_id`, `subscription_status`, `current_period_end` in Postgres).
  - `bacste.exam.best.v1` (via `lib/exam.ts`): best timed score, same device only.
- Payments: Stripe hosted checkout is source of truth. Site stores no card data, no secrets beyond `NEXT_PUBLIC_*` (public).
- Content: `lib/questions.ts` (62 Qs, `premium` flag), `lib/guides.ts` (8 guides), `lib/guides-fr.ts` / `lib/questions-fr.ts`. Packs are generated from these — no new CMS.
- Permissions: everyone reads all static content. Write: only own browser. Owner (Bilal) reads Stripe Dashboard + Ko-fi/PayPal dashboards. No teacher/student write access in v1 (teacher pilot via mailto).

## Pages / screens / routes
- Keep (don't rebuild): `/` (hero + sample Q + guides), `/practice/`, `/exam/`, `/tutor/`, `/progress/`, `/guides/[slug]/`, `/worksheets/` (+ print), `/schools/` + `/fr/ecoles/`, `/pricing/`, `/privacy/`, `/fr/`, `/ar/`.
- Add this run:
  - `/shop/` — one-time packs (Cram Pack 49 MAD, Worksheet bundle 29 MAD) with "Buy" buttons → Stripe/Ko-fi links (env-driven, demo state when unset).
  - Shop pack detail generated PDFs: `public/packs/*.pdf` (generated locally from questions/guides, committed as static assets).
  - `/thanks/` — post-checkout landing (static, no verification in v1; v2 verifies via webhook redirect).
  - Update `/pricing/` — add one-time packs row + Ko-fi/PayPal fallback buttons. Update `/schools/` — add paid custom pack CTA (PayPal/Ko-fi) beside free pilot.
  - Update `app/sitemap.ts` (+ `/shop/`, `/thanks/` non-index), `app/robots.ts` (allow shop), `components/SiteNav.tsx` (add Shop).
- API routes: none in v1 (static export forbids them). v2 will add `/api/checkout` + `/api/stripe-webhook` via Netlify Functions (noted as deferred).

## Build milestones (vertical slices, in order)

### M0 — Shop foundation (thin)
- [ ] `lib/packs.ts`: pack definitions (id, title, price MAD, includes, env slots `NEXT_PUBLIC_STRIPE_PACK_*`, `NEXT_PUBLIC_KOFI_URL`, `NEXT_PUBLIC_PAYPAL_ME`). Verify: `npm run typecheck` passes; list renders in test.
- [ ] `/shop/` page (Server Component) reusing `card`/`pill` + Convio tokens, listing 3 packs with Buy buttons (demo → waitlist when no link). Verify: `npm run build` exports `/shop/`; 390px + 1440px no overflow (`overflow-x: clip`).
- [ ] Nav + sitemap: add Shop link, add `/shop/` to sitemap, add `/thanks/` noindex. Verify: sitemap includes `/shop/`, nav shows Shop on mobile.
- [ ] `scripts/gen-packs.mjs`: generate 2 PDFs from `lib/questions.ts`/`lib/guides.ts` (print CSS in `app/globals.css` `@media print`). Verify: PDFs open, < 5 MB, printable.

### M1 — Pricing + teacher money paths (end to end)
- [ ] `/pricing/` v2: keep Free/Premium, add "One-time packs" section (29/49 MAD) + Ko-fi/PayPal fallback. Verify: buttons show correct `href` when env set, demo text when unset.
- [ ] `/pricing/` Premium annual: add 290 MAD/yr slot (`NEXT_PUBLIC_STRIPE_PAYMENT_LINK_ANNUAL`). Verify: shows when set.
- [ ] `/schools/` v2: add paid CTA — Custom topic pack 199 MAD, Class licence 1,500 MAD/yr via PayPal/Ko-fi + mailto order. Verify: links correct, FR page mirror.
- [ ] `/thanks/` + Ko-fi donation footer button (`SiteFooter` or `pricing` footnote). Verify: no horizontal scroll, focus-visible 2px, contrast ≥ 4.5:1.

### M2 — Distribution + launch kit refresh
- [ ] SEO/social: `app/layout.tsx` absolute `alternates` + OG for `/shop/`; `robots.ts` + IndexNow resubmit; WhatsApp share on shop packs (`ShareButtons`). Verify: `npm run build` + `sitemap.xml` contains `/shop/`; no invented metrics/testimonials.
- [ ] Refresh `MONETIZATION.md` + `LAUNCH-KIT.md` with Ko-fi/PayPal steps (Stripe 10-min checklist stays). Verify: file links work, no broken internal links.
- [ ] Unit tests: pack price formatting MAD, env fallback. Verify: `npm test` (≥ existing 38) passing.

### M3 — Ship
- [ ] Build + deploy GitHub Pages on `master` push; verify live `/shop/` 200, checkout buttons behave (demo until owner sets links).
- [ ] Owner handover checklist (`LAUNCH-CHECKLIST.md` update): create Stripe account + 3 links, Ko-fi/PayPal handles, set build vars, redeploy, test one real 1 MAD purchase, submit sitemap in Search Console.
- [ ] Commit + evidence: `npm run build`, `npm test`, `npm run typecheck` outputs.

### Deferred to v2 (do not attempt here)
- Postgres (Neon) + Drizzle schema, Better Auth, `/api/checkout` + `/api/stripe-webhook`, server-side premium gating, teacher dashboard.

## Checkpoints (this run — call `next_stage`)
- [x] Discover (done prior to this plan)
- [x] Plan (this file) — proceed to `next_stage` for Design
- [ ] Design — settle look/feel for `/shop/`, `/pricing/` v2, teacher CTA before coding screens
- [ ] Scaffold — verify existing Next.js scaffold + tooling, env slots, pack script; do not re-scaffold
- [ ] Data and auth — confirm static localStorage model + no DB/auth for v1 (scoped out, matches old Milestone 2)
- [ ] Build features — build M0→M3 one task at a time, tested
- [ ] Security review — secrets, minors privacy, payment links, no fake claims
- [ ] Test thoroughly — Vitest + Playwright e2e, 390px/1440px, keyboard/focus, print
- [ ] Ship — GitHub Pages deploy + handover checklist with claim-ready links
