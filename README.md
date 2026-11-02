# BAC STE Tutor

A small, fast revision web app for Moroccan **2BAC STE** students: maths and English
questions with instant feedback, a written explanation for every answer, a searchable
tutor, and progress tracking.

Live: <https://bacste-tutor.netlify.app>

## What is in v1

- 24 questions across maths and English (12 each), with explanations.
- Practice by subject and topic, with session accuracy.
- Tutor search over the same revision bank.
- Progress per subject and per topic, weakest topic first.
- Free tier plus a Premium preview. Progress is stored locally in the browser.
- Email waitlist for Premium (Netlify Forms).

Accounts, a Postgres database and real Stripe subscriptions are the v2 milestone; see
[PLAN.md](PLAN.md) and [MONETIZATION.md](MONETIZATION.md).

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # 6 unit tests
npm run typecheck
npm run build        # static export in out/
```

## Deploy

The site is a static Next.js export. `netlify.toml` describes the build, and
`public/_headers` sets the security headers.

```bash
npm run build
python3 /tmp/opencode/deploy_bacste.py   # or: npx netlify deploy --prod --dir=out
```

The host is Netlify site `bacste-tutor` (`c3ce496b-4b0d-46e2-bcaf-a86b33460bd0`).

## Environment

| Variable | Needed | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | optional | When set at build time, the Premium button opens this Stripe Payment Link instead of the local demo unlock. |

No secret keys belong in this static site. Anything prefixed `NEXT_PUBLIC_` is public.

## Rollback

Netlify keeps every deploy. Open **Deploys** in the Netlify dashboard and click
**Publish deploy** on the last good one, or re-run the deploy script from the matching
commit.

## Content

Questions live in [`lib/questions.ts`](lib/questions.ts). Each entry has `subject`,
`topic`, `difficulty`, `premium`, `prompt`, four `options`, the `answer` index and an
`explanation`. Add questions there and the practice, tutor and progress screens pick them
up automatically.
