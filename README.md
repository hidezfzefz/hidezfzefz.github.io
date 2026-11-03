# BAC STE Tutor

A small, fast revision web app for Moroccan **2BAC STE** students: maths and English
questions with instant feedback, a written explanation for every answer, a searchable
tutor, and progress tracking.

Live: <https://hidezfzefz.github.io>

## What is in v1

- 24 questions across maths and English (12 each), with explanations.
- Practice by subject and topic, with session accuracy.
- Timed exam simulation: 10 mixed questions, 15 minutes, review with explanations.
- Tutor search over the same revision bank.
- Progress per subject and per topic, weakest topic first, plus your best exam score.
- Free tier plus a Premium preview. Progress is stored locally in the browser.
- Installable PWA with an offline app shell (manifest + service worker).
- Email waitlist for Premium (Netlify Forms).

Accounts, a Postgres database and real Stripe subscriptions are the v2 milestone; see
[PLAN.md](PLAN.md) and [MONETIZATION.md](MONETIZATION.md).

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # 17 unit tests
npm run typecheck
npm run build        # static export in out/
```

## Deploy

The site is a static Next.js export. Pushing `master` triggers
`.github/workflows/deploy.yml`, which builds `out/` and publishes it to **GitHub Pages**
at <https://hidezfzefz.github.io>.

```bash
npm run build
# GitHub Actions deploys on push; no manual upload needed.
```

A Netlify mirror is configured in `netlify.toml` (site `bacste-tutor`,
`c3ce496b-4b0d-46e2-bcaf-a86b33460bd0`). Netlify was the first host; its free deploy
credits ran out on 2026-11-03, so GitHub Pages is the primary host until credits return.

## Environment

| Variable | Needed | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | optional | When set at build time, the Premium button opens this Stripe Payment Link instead of the local demo unlock. |

No secret keys belong in this static site. Anything prefixed `NEXT_PUBLIC_` is public.

## Rollback

GitHub Pages keeps the last successful workflow artifact. Re-run an older run from the
**Actions** tab, or revert the commit and push. On Netlify, open **Deploys** and click
**Publish deploy** on the last good one.

## Content

Questions live in [`lib/questions.ts`](lib/questions.ts). Each entry has `subject`,
`topic`, `difficulty`, `premium`, `prompt`, four `options`, the `answer` index and an
`explanation`. Add questions there and the practice, tutor and progress screens pick them
up automatically.
