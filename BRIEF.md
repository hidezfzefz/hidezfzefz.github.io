# BAC STE Tutor — brief

**What it is:** A subscription web app that helps Moroccan baccalaureate (2BAC STE) students revise maths and English with practice exercises, clear explanations, an AI-style tutor, and progress tracking.
**For:** 2BAC STE students preparing for the national exam. First action: start a practice session or ask the tutor for an explanation.
**Success:** A live site with a working free tier, a paid "Premium" upgrade path, and the first paying subscribers within month one.

## Scope (v1)
- Pages: landing, practice (maths + English), tutor, progress, pricing, account.
- Features: exercise bank with instant feedback, worked explanations, weak-topic tracking, free vs premium gating, Stripe checkout.
- Not in v1: native mobile app, teacher CMS, live classes, offline mode.

## Design
- Direction: Convio Design (dark, calm, minimal). Dark + light. WCAG 2.2 AA.

## Stack
- Next.js (App Router, static-first) + TypeScript — SEO landing + fast app.
- Tailwind CSS v4 + shadcn/ui — consistent, accessible components.
- Postgres (Neon, via Convio) + Drizzle — progress and subscriptions.
- Better Auth — email/password sessions.
- Stripe Billing / Payment Links — subscriptions; test mode first.
- Netlify — hosting (account available in this environment).

## Content and integrations
- Exercise content seeded from the existing `math-for-blue/2BAC-STE-Maths` and `LingoEnglish` material where reusable.
- No analytics or invented metrics until real users exist.

## Constraints and risks
- No Stripe account/keys yet: build with test-mode keys and a `STRIPE_SECRET_KEY` env slot.
- Minors' data: collect only email + progress; no real names required.
- Budget: free tiers only.
- Deadline: ship a usable vertical slice fast, then iterate.

## Assumptions (please check)
- The user wants a new project; existing repos stay untouched.
- Content is authored in JSON/MD for v1.
- Netlify + a free Postgres are acceptable hosts.
