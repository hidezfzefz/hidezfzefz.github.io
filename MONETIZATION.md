# Monetisation plan — BAC STE Tutor

The product is live at <https://hidezfzefz.github.io>. This file is the shortest path
from "live" to "first dirham", plus the fallbacks if subscriptions do not fit.

## 1. Connect payments (the one missing account)

Stripe is the only blocker that needs the owner. It takes about 10 minutes.

1. Create a Stripe account and finish identity verification.
2. Create a **Payment Link** for a recurring monthly price (start at **39 MAD/month**; add
   an annual link at **290 MAD/year** later).
3. Copy the link, set it as a build variable, rebuild and deploy:

   ```bash
   NEXT_PUBLIC_STRIPE_PAYMENT_LINK="https://buy.stripe.com/..." npm run build
   python3 /tmp/opencode/deploy_bacste.py
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
| School licence | 1,500 MAD / class / year | Teacher dashboard, class progress (v3) |

Math: 100 paying students × 39 MAD ≈ **3,900 MAD/month**. 500 ≈ **19,500 MAD/month**.
The free tier is the funnel; it is deliberately generous because trust is the bottleneck.

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
