# Security review — BAC STE Tutor v1

Date: 2026-11-02
Scope: the static Next.js export deployed to Netlify (`bacste-tutor.netlify.app`).

## What the app does with data

- No accounts, no server database, no cookies.
- Practice progress and the Premium preview flag are stored in `localStorage` under
  `bacste.attempts.v1` and `bacste.premium.v1`.
- The only optional personal data is an email submitted to the Netlify Forms waitlist.

## Checks

| Area | Result |
| --- | --- |
| Secrets in the client bundle | None. The only env var is `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`, which is public by design. Grep of `out/_next/static` for `sk_`, `DATABASE_URL` and `SECRET` found nothing. |
| HTML injection | No `dangerouslySetInnerHTML`, `innerHTML` or `eval`. All user-entered text is rendered through React, which escapes it. |
| External links | None in v1 except the optional Stripe Payment Link, opened with `rel="noreferrer"`. |
| Transport | Netlify serves HTTPS and redirects HTTP. |
| Headers | CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` set in `public/_headers`. |
| Form abuse | Waitlist form has a honeypot field (`bot-field`) and Netlify's own spam filtering. |
| Dependency risk | `npm audit` reviewed; no runtime secrets or server code. Re-run before each release. |
| PII of minors | No names, birth dates or school data are collected. Only an optional email for the waitlist. |

## Accepted risk for v1

- **Premium is not enforced.** The paywall is a local demo until Stripe and server-side
  gating are connected. This is intentional: no payment is taken, so nothing can be
  bypassed for financial gain. Marked in the UI as a demo.
- **Progress is per-device.** Clearing browser storage loses it. Acceptable for v1; v2
  moves progress to an account.
- **Static content is public.** Once real premium content exists, it must be served from a
  server route after an entitlement check, not shipped in the JS bundle.

## Before charging money

1. Add a server runtime (Netlify Functions or a small API) with Stripe Checkout and a
   webhook that writes entitlements to a database.
2. Gate premium routes on the server, never in client state.
3. Add privacy policy and terms, and a data-deletion path.
4. Re-run this review and the test suite.
