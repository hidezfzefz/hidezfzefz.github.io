# Monetisation plan — BAC STE Tutor

The product is live at <https://hidezfzefz.github.io>. This file is the shortest path
from "live" to "first dirham", plus the fallbacks if subscriptions do not fit.

## 1. Connect payments (the one missing account)

### Fastest path — Ko-fi / PayPal.me (no Stripe needed, ~5 minutes)

1. Create a Ko-fi page ([ko-fi.com](https://ko-fi.com)) and add a Shop item for the Cram Pack (49 MAD) + Worksheet bundle (29 MAD). PayPal payouts to Morocco.
2. Copy your Ko-fi URL, set it as a build variable, rebuild and push:

   ```bash
   export NEXT_PUBLIC_KOFI_URL="https://ko-fi.com/yourname"
   npm run build && git push origin master
   ```

   The Shop "Buy" buttons now open Ko-fi. Email-delivered packs: upload `public/packs/*.pdf` to Ko-fi and Ko-fi emails them after payment. **This is the path to the first sale** — Stripe needs ID verification and a card-accepting business profile; Ko-fi takes PayPal (which students in Morocco already have).

### Full path — Stripe (10 minutes, better for subscriptions)

1. Create a Stripe account and finish identity verification.
2. Create a **Payment Link** for a recurring monthly price (**39 MAD/month**) + annual (**290 MAD/year**) + one per pack (`NEXT_PUBLIC_STRIPE_PACK_CRAM` 49, `..._WORKSHEETS` 29, `..._CUSTOM` 199).
3. Copy links — see [`.env.example`](.env.example) — rebuild and push:

   ```bash
   NEXT_PUBLIC_STRIPE_PAYMENT_LINK="https://buy.stripe.com/..." npm run build && git push origin master
   ```

   The Premium button now opens real checkout instead of the demo unlock.

> Stripe Payment Links alone do **not** unlock content. They take the money and show a
> receipt. For v1 that is acceptable if Premium is sold as a *support + early access*
> tier; for a real paywall, do step 2 below.

## 2. Real paywall (v2, ~1–2 days)

- Add Netlify Functions (or a tiny API) with `/api/checkout` and `/api/stripe-webhook`.
- Store `customer_id`, `subscription_status` and `current_period_end` in Postgres.
- Move premium questions to a server route and check entitlement before returning them.
- Keep the static app for free content; it stays fast and cheap.

Do this before charging for content that is currently in the JS bundle.

## 3. Revenue model

| Tier | Price | What it includes |
| --- | --- | --- |
| Free | 0 MAD | Core questions, explanations, tutor core, progress |
| Premium monthly | 39 MAD | Full bank, exam-style walkthroughs, new questions |
| Premium annual | 290 MAD | Same, two months free |
| Cram Pack (PDF, one-time) | 49 MAD | 62 questions + explanations + 8 guides, printable (`public/packs/bac-cram-pack.pdf`) |
| Worksheet bundle (PDF, one-time) | 29 MAD | 20 printable sheets + keys (`public/packs/worksheet-bundle.pdf`) |
| Custom topic pack | 199 MAD / plain | New exam-style pack for your class, 48h |
| School licence | 1,500 MAD / class / year | Teacher dashboard, class progress (v3) |

Math: 100 paying students × 39 MAD ≈ **3,900 MAD/month**. 500 ≈ **19,500 MAD/month**.
One-time first sales: 10 Cram Packs ≈ 490 MAD — reachable with zero cards on file at Ko-fi/PayPal.
The free tier is the funnel; it is deliberately generous because trust is the bottleneck.

Regenerate packs after adding questions: `npx tsx scripts/gen-packs.mjs`, commit `public/packs/`.

## 4. Distribution (no ad budget)

1. **Search**: the site already has `robots.txt`, `sitemap.xml` and was submitted through
   IndexNow (Bing/Yandex). Submit the sitemap in Google Search Console when the owner has
   access.
2. **Communities**: Moroccan baccalaureate groups on Facebook, WhatsApp and Reddit
   (`r/Morocco`, student servers). Post the free tool, not an ad. One useful post per
   community, not repeated spam.
3. **Teachers**: offer a free class code to two maths and two English teachers. Their
   recommendation converts better than any ad.
4. **Content**: turn each explanation into a short TikTok/Instagram carousel ("Why is
   sin(x)/x → 1?"). Link the free practice page. This is the cheapest long-term channel.
5. **Existing assets**: the owner already runs `2bac-ste-maths.netlify.app` and the
   `LingoEnglish` Android app. Add a small "Practice English/Maths" link between them —
   cross-promotion costs nothing and both audiences overlap.

## 5. What was intentionally not done

- No fake testimonials, user counts or "trusted by" logos.
- No ads: they need an AdSense account and would slow the site for students on mobile data.
- No crypto, scraping or reselling of copyrighted material.

## 6. Next three actions

- [ ] Owner creates the Stripe account and monthly Payment Link.
- [ ] Set `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`, redeploy, test one real purchase end to end.
- [ ] Add one link from the 2BAC maths site and the LingoEnglish README to the free app.
