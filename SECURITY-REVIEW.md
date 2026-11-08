# Security review — BAC STE Tutor

Date: 2026-11-03
Deployment: <https://hidezfzefz.github.io>
Scope: the owner's own static Next.js site and its GitHub Pages hosting.

## Attack surface

| Reachable | Notes |
| --- | --- |
| Static pages | `/`, `/practice/`, `/exam/`, `/tutor/`, `/progress/`, `/guides/`, `/guides/[slug]/`, `/pricing/`, `/privacy/`, `/shop/`, `/thanks/`, `/schools/` |
| Email link | `mailto:` to the owner from pricing/shop/screens (nothing stored) |
| Browser storage | `bacste.attempts.v1`, `bacste.premium.v1` (local to each visitor) |
| External payments | Stripe Payment Links / Ko-fi / PayPal.me (hosted checkout; no card data on site). Env slots `NEXT_PUBLIC_STRIPE_*`, `NEXT_PUBLIC_KOFI_URL`, `NEXT_PUBLIC_PAYPAL_ME` (public). |
| Static PDFs | `public/packs/*.pdf` (generated from `lib/questions.ts` + `lib/guides.ts`; no user input) |
| Server/API routes | None. Static export; no functions, no database, no auth endpoints. |
| Secrets | None in the app. Only public `NEXT_PUBLIC_*`. |

## Re-review 2026-11-08 (money layer)

- Scope: `/shop/`, `/thanks/`, `lib/packs.ts`, `components/PackBuyButton.tsx`, pricing/schools v2, `public/packs/*.pdf`.
- `npm audit --omit=dev` → **0 vulnerabilities**. `semgrep scan --config auto` → **0 findings**. No `.env` files in repo, no `sk_`/`SECRET` in source, no `dangerouslySetInnerHTML`/`innerHTML`.
- Prices are display-only; checkout total comes from the Stripe/Ko-fi product (never from client input). No webhook to verify in v1 (no server). Pack fulfilment is by email after payment; `/thanks/` makes no unlock claim.
- Headers unchanged: Netlify `_headers` sets `nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`; GitHub Pages host limitation persists (accepted, see #6).

## Scanners

| Check | Command | Result |
| --- | --- | --- |
| Production dependencies | `npm audit --omit=dev` | **0 vulnerabilities** after upgrading Next.js to 16.4.4 (was 1 high + 1 moderate in Next's bundled PostCSS). |
| Static analysis | `semgrep scan --config auto --severity ERROR` | 0 error-level findings. |
| Secret sweep | grep of source and `out/_next/static` for `sk_`, `DATABASE_URL`, `SECRET` | 0 findings. |
| Dangerous sinks | grep for `dangerouslySetInnerHTML`, `innerHTML`, `eval` | 0 findings. |
| Headers | `curl -I` on production | HSTS present (GitHub-managed) and `<meta name="referrer" content="strict-origin-when-cross-origin">`. GitHub Pages does not allow custom response headers, so CSP, `X-Content-Type-Options`, `X-Frame-Options` and `Permissions-Policy` are not sent; see finding 6. |

## Findings

| # | Finding | Severity | Where | Fix | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Next.js 15 bundled a vulnerable PostCSS (source-map file disclosure / XSS in CSS stringify) | High (tooling) | `node_modules/next` | Upgraded to Next.js 16.4.4; `npm audit` now clean | **Fixed** |
| 2 | CSP allows `'unsafe-inline'` for scripts | Medium | `public/_headers` | Next's static export injects inline hydration data. The site has no user-controlled script and no third-party scripts. A nonce-based CSP needs a server runtime; revisit when the app moves to SSR. | **Accepted** |
| 3 | Premium unlock is client-side (`localStorage`) | Low today, high before charging | `lib/progress.ts` | No payment is taken, so there is nothing to steal. Before any real charge, gate premium content on a server after a Stripe webhook. Documented in `MONETIZATION.md` and `SECURITY.md`. | **Open, by design** |
| 4 | Waitlist email could receive spam | Low | `components/WaitlistForm.tsx` | No form backend; the page opens the visitor's mail app with a prefilled message. The owner's address is already public on GitHub. | **Accepted** |
| 5 | No accounts, so no auth, session, CSRF or IDOR surface | — | — | Not applicable to v1. Re-review when Better Auth and Postgres land. | **N/A** |
| 6 | GitHub Pages does not send CSP, `nosniff`, `X-Frame-Options` or `Permissions-Policy` | Low | Hosting | The site is static, has no login, cookies, user-generated content, third-party scripts or dangerous sinks. `powered by` and framing risk is low. `public/_headers` is kept so a Netlify deploy restores all headers when credits return. | **Accepted, host limitation** |

## Privacy

- No cookies, no analytics, no third-party scripts, no fonts fetched from a CDN.
- Practice data stays in the visitor's browser.
- The only optional personal data is an email the visitor chooses to send to the owner.
- No minors' names, schools or birth dates are collected.

## Before the first real payment

1. Move premium content behind a server route with an entitlement check.
2. Verify Stripe webhook signatures and make the handler idempotent.
3. Add rate limits to checkout and any auth endpoint.
4. Add a privacy policy and a deletion path.
5. Re-run `npm audit`, `semgrep`, and this review.
