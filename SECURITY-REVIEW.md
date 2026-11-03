# Security review — BAC STE Tutor

Date: 2026-11-02
Deployment: <https://hidezfzefz.github.io>
Scope: the owner's own static Next.js site and its Netlify configuration.

## Attack surface

| Reachable | Notes |
| --- | --- |
| Static pages | `/`, `/practice/`, `/tutor/`, `/progress/`, `/pricing/`, `/thanks/` |
| Netlify form | `premium-waitlist` (email only) |
| Browser storage | `bacste.attempts.v1`, `bacste.premium.v1` (local to each visitor) |
| Server/API routes | None. Static export; no functions, no database, no auth endpoints. |
| Secrets | None in the app. Optional public `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`. |

## Scanners

| Check | Command | Result |
| --- | --- | --- |
| Production dependencies | `npm audit --omit=dev` | **0 vulnerabilities** after upgrading Next.js to 16.4.4 (was 1 high + 1 moderate in Next's bundled PostCSS). |
| Static analysis | `semgrep scan --config auto --severity ERROR` | 0 error-level findings. |
| Secret sweep | grep of source and `out/_next/static` for `sk_`, `DATABASE_URL`, `SECRET` | 0 findings. |
| Dangerous sinks | grep for `dangerouslySetInnerHTML`, `innerHTML`, `eval` | 0 findings. |
| Headers | `curl -I` on production | CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` present. |

## Findings

| # | Finding | Severity | Where | Fix | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Next.js 15 bundled a vulnerable PostCSS (source-map file disclosure / XSS in CSS stringify) | High (tooling) | `node_modules/next` | Upgraded to Next.js 16.4.4; `npm audit` now clean | **Fixed** |
| 2 | CSP allows `'unsafe-inline'` for scripts | Medium | `public/_headers` | Next's static export injects inline hydration data. The site has no user-controlled script and no third-party scripts. A nonce-based CSP needs a server runtime; revisit when the app moves to SSR. | **Accepted** |
| 3 | Premium unlock is client-side (`localStorage`) | Low today, high before charging | `lib/progress.ts` | No payment is taken, so there is nothing to steal. Before any real charge, gate premium content on a server after a Stripe webhook. Documented in `MONETIZATION.md` and `SECURITY.md`. | **Open, by design** |
| 4 | Waitlist form could receive spam | Low | `components/WaitlistForm.tsx` | Honeypot `bot-field` plus Netlify's built-in spam filtering. No other input is stored. | **Mitigated** |
| 5 | No accounts, so no auth, session, CSRF or IDOR surface | — | — | Not applicable to v1. Re-review when Better Auth and Postgres land. | **N/A** |

## Privacy

- No cookies, no analytics, no third-party scripts, no fonts fetched from a CDN.
- Practice data stays in the visitor's browser.
- The only optional personal data is an email for the Premium waitlist.
- No minors' names, schools or birth dates are collected.

## Before the first real payment

1. Move premium content behind a server route with an entitlement check.
2. Verify Stripe webhook signatures and make the handler idempotent.
3. Add rate limits to checkout and any auth endpoint.
4. Add a privacy policy and a deletion path.
5. Re-run `npm audit`, `semgrep`, and this review.
