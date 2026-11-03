# BAC STE Tutor

A small, fast revision web app for Moroccan **2BAC STE** students: maths and English
questions with instant feedback, a written explanation for every answer, a searchable
tutor, and progress tracking.

Live: <https://hidezfzefz.github.io>

## What is in v1

- 62 questions across maths and English, each with a written explanation.
- Practice by subject and topic, with session accuracy.
- Timed exam simulation: 10 mixed questions, 15 minutes, review with explanations.
- Tutor search over the same revision bank.
- Progress per subject and per topic, weakest topic first, plus your best exam score.
- Eight study guides with formulas, key points and practice deep links.
- Printable worksheet builder with an optional answer key, a balanced all-topics mix,
  a custom sheet title, French headers, and shareable links that keep a teacher's settings.
- French (`/fr/`) and Arabic (`/ar/`) entry pages with hreflang.
- French mode for maths: an EN/FR toggle on practice, exam and worksheets translates
  maths prompts and explanations. English exercises stay in English, because the English
  sentence is the exercise.
- Free tier plus a Premium preview. Progress is stored locally in the browser.
- Installable PWA with an offline app shell (manifest + service worker).
- Email link to join the Premium waitlist (no form backend).
- Teacher page with a free 30-day class pilot offer.

Accounts, a Postgres database and real Stripe subscriptions are the v2 milestone; see
[PLAN.md](PLAN.md) and [MONETIZATION.md](MONETIZATION.md).

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # 38 unit tests
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
`explanation`. Add questions there and the practice, tutor, worksheet and progress screens
pick them up automatically.

Guides live in [`lib/guides.ts`](lib/guides.ts). Each has a slug, sections, a formula slot,
key points and the practice topic it links to.

## Launch and money

- [`LAUNCH-KIT.md`](LAUNCH-KIT.md): ready-to-post messages in French, Moroccan Arabic and
  English, a seven-day plan and the teacher email.
- [`MONETIZATION.md`](MONETIZATION.md): the Stripe steps and the revenue model.
- [`LAUNCH-CHECKLIST.md`](LAUNCH-CHECKLIST.md): what is done and what still needs the owner.
