# Launch checklist — BAC STE Tutor v1

Reviewed: 2026-11-08 (money layer)
Live: <https://hidezfzefz.github.io>
Host: GitHub Pages primary (deploy workflow on `master` push); Netlify mirror `bacste-tutor` (`c3ce496b-4b0d-46e2-bcaf-a86b33460bd0`)

## Deploy

| Item | Status | Evidence |
| --- | --- | --- |
| Production build passes | **Done** | `next build` exports 10 routes; `tsc --noEmit` clean |
| Live deploy smoke-tested | **Done** | 6 routes HTTP 200, 0 console errors (Convio browser) |
| Headers set | **Done** | CSP, HSTS, `nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` |
| Custom 404 | **Done** | `/this-does-not-exist/` returns 404 with the app shell |
| Installable PWA | **Done** | `/manifest.webmanifest`, icons 192/512, service worker at `/sw.js` |
| Secrets on host, not in client | **Done** | No secrets in the app; only public `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` |
| Database migrations / backups | **N/A** | No database in v1 |
| Rollback path | **Done** | Netlify keeps every deploy; README documents republishing |

## Search and sharing

| Item | Status | Evidence |
| --- | --- | --- |
| Unique titles and descriptions | **Done** | Per-route metadata incl. `/shop/`, `/thanks/` (noindex) |
| Canonical URL and `lang` | **Done** | `alternates.canonical`, `<html lang="en">` |
| Open Graph / Twitter cards | **Done** | Metadata set; no image yet (text card) |
| `robots.txt` and sitemap | **Done** | `/robots.txt` and `/sitemap.xml` live (incl. `/shop/`); re-submit after deploy |
| Search engines notified | **Partial** | IndexNow accepted (202) for Bing/Yandex. Google Search Console needs the owner's account. |

## Commerce

| Item | Status | Evidence |
| --- | --- | --- |
| Live payments | **Open** | Shop/pricing wired (env slots in `lib/packs.ts`); owner creates Stripe + Ko-fi/PayPal links, see `MONETIZATION.md`. No link → mailto order works today. |
| Prices come from the server | **Done** | Display prices only; checkout total is set in Stripe/Ko-fi product, not client input |
| Webhooks verified and idempotent | **N/A** | No webhooks in v1; required before server-side gating (v2) |
| Tax, receipts, returns | **Open** | Stripe handles receipts; add tax settings when the account exists; fulfilment by email |

## Email

| Item | Status | Evidence |
| --- | --- | --- |
| Transactional mail | **N/A** | No mail sent by the app |
| Waitlist delivery | **Done** | Pricing page opens a prefilled email to the owner; nothing is stored |

## Legal and privacy

| Item | Status | Evidence |
| --- | --- | --- |
| Privacy policy | **Done** | `/privacy/` |
| Cookies | **N/A** | No cookies |
| Terms | **N/A** | Free app, no purchases yet; add before charging |
| Contact | **Partial** | GitHub issues on the owner's account |

## Observability

| Item | Status | Evidence |
| --- | --- | --- |
| Error tracking | **Open** | Static app with no analytics by design; add Sentry when the app grows |
| Uptime check | **Open** | Netlify status page only; add a free uptime monitor |
| Analytics respects consent | **N/A** | No analytics installed |

## Handover

| Item | Status | Evidence |
| --- | --- | --- |
| README: run, deploy, env, rollback | **Done** | `README.md` |
| Security review linked | **Done** | `SECURITY-REVIEW.md` |
| Test plan and report linked | **Done** | `TEST-PLAN.md`, `TEST-REPORT.md` |
| Monetisation steps | **Done** | `MONETIZATION.md` |
| Owner knows what is open | **Done** | Stripe account, Google Search Console, uptime monitor |

## Open at launch

1. **Stripe**: create the account and a monthly Payment Link, set
   `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`, rebuild, redeploy. Until then the Premium button
   says it is a demo.
2. **Google Search Console**: verify the domain and submit `/sitemap.xml`.
3. **Uptime monitor**: point a free monitor at `https://hidezfzefz.github.io/`.
4. **Distribution**: one link from the existing 2BAC maths site and the LingoEnglish
   README, then one honest post in two student communities.
