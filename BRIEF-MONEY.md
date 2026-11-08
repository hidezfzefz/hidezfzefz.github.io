# BAC STE Tutor — Money brief (build on live)

**What it is:** The live, static BAC STE Tutor at <https://hidezfzefz.github.io> (62 maths/English questions, exam sim, worksheets, 8 guides, FR/AR entries) plus a monetisation layer that can take the first dirham without ruining existing work.
**For:** 2BAC STE students revising for the national exam, and their teachers. First action: practise free, then upgrade or buy a pack; teachers: request the free pilot, then buy the class pack.
**Success:** Live site with working free tier + paid paths that actually collect money (Stripe Payment Links + Ko-fi/PayPal fallback), and the first paying students/teachers within month one.

## Scope (v1)
- Pages: existing landing, practice, exam, tutor, worksheets, guides, progress, schools, pricing (keep all). Add: `/shop/` (one-time digital packs), checkout/waitlist states, thanks page.
- Features: 
  1. Keep free funnel (practice, exam, worksheets, tutor) account-free.
  2. Premium: full bank + walkthroughs via Stripe Payment Links (39 MAD/mo, 290 MAD/yr slot) + one-time packs: "BAC Cram Pack PDF" (49 MAD), "Printable worksheet bundle" (29 MAD), teacher "Custom topic pack" (199 MAD / plain, 1,500 MAD / class / yr). Each pack = generated PDF from the existing `lib/questions.ts` + `lib/guides.ts` (no new content authoring).
  3. Teacher funnel: keep free 30-day pilot (mailto) → paid custom pack via PayPal/Ko-fi link.
  4. Support: Ko-fi donation button + PayPal.me fallback for students who cannot use Stripe (Morocco, no card).
  5. Distribution: SEO guides (exists), sitemap/robots, WhatsApp/Facebook share, TikTok carousels linking to practice.
- Not in v1: Postgres/Better Auth (deferred, PLAN.md Milestone 2), server-side paywall/webhooks (v2), native app, live classes, ads/Crypto.

## Design
- Direction: Convio Design (dark, calm, minimal) — keep existing tokens in `app/globals.css` (`:root` once, no literals). WCAG 2.2 AA, 16px+ body, `overflow-x: clip`, 1280×800 hero one headline + 1–2 actions.
- No eyebrows, no gradients/glows, no invented metrics/testimonials, no card-in-card, no emoji icons (Lucide style only).

## Stack
- Framework: Next.js 16 App Router + TypeScript, static export (`output: "export"`, `trailingSlash: true`) — already scaffolded; zero JS cost, SEO landing.
- Styling: Tailwind CSS v4 + Convio tokens — consistent with existing.
- Components: Existing hand-built pills/cards (shadcn-style) — keep, don't add heavy libs.
- Backend: None in v1 — static, localStorage progress (`lib/progress.ts`). No minors data. Postgres (Neon) + Drizzle + Better Auth deferred to v2.
- Payments: Stripe Billing / Payment Links (test-mode slot `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`, sandbox per Stripe best practices; restricted keys `rk_`, webhooks required for subscriptions in v2) + Ko-fi Shop / PayPal.me fallback (no Stripe account needed to start).
- Hosting: Existing GitHub Pages primary (`hidezfzefz.github.io`) + Netlify mirror (`netlify.toml`) — keep, do not migrate. Cloudflare noted as future only.
- PDF/shop: Generate packs from existing questions/guides with a local script (printable HTML → PDF), deliver via Stripe/Ko-fi/Gumroad email; no inventory.

## Content and integrations
- Content: reuse `lib/questions.ts` (62 Qs), `lib/guides.ts` (8 guides), `lib/guides-fr.ts` / `lib/questions-fr.ts`. New packs are repackaged, not new syllabus writing.
- Integrations: Stripe Payment Links (owner creates account, ~10 min), Ko-fi/PayPal.me (optional, 5 min), no analytics in v1 (privacy), no form backend (mailto/waitlist).

## Constraints and risks
- No Stripe account/keys yet: ship with demo + waitlist; owner creates Stripe + Payment Links, sets env, redeploys.
- Stripe only is not a paywall (links take money/receipt). Real gating needs v2 webhook + server (Netlify Functions) — do not charge for JS-bundled premium until gated.
- Minors: no accounts, no phone capture, no fake social proof.
- Budget: free tiers only. Deadline: money layer in days, no rewrite.

## Assumptions (please check)
- Keep tuning the live repo (no fresh scaffold). Netlify free credits out; GitHub Pages is primary until they return.
- Prices: Premium 39 MAD/mo, 290 MAD/yr; Cram Pack 49 MAD one-time; Worksheet bundle 29 MAD; Teacher custom pack 199 MAD/topic, 1,500 MAD/class/yr. Math: 100 × 39 MAD ≈ 3,900 MAD/mo.
- Owner is Bilal (`bilal6087xx@gmail.com`), already runs `2bac-ste-maths.netlify.app` + `LingoEnglish` — cross-link them.
- Change anything: prices, pack names, PayPal/Ko-fi handles, or say "go Cloudflare" and hosting moves.
