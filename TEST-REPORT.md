# Test report — BAC STE Tutor v1

Date: 2026-11-02
Build tested: static export from commit on `master` after the practice-filter fix.
Live: <https://bacste-tutor.netlify.app>

## Summary

| Suite | Result |
| --- | --- |
| TypeScript | `tsc --noEmit` — 0 errors |
| Production build | `next build` — 10 static routes exported, 0 warnings blocking |
| Unit tests | **14 passed / 14** |
| E2E (Chromium) | **15 passed / 15** |
| Production browser check | 6 routes, 0 console errors, 0 failed requests |
| Responsive | 360–1440px checked; no horizontal overflow at 390px on all five pages |
| Dependency audit | `npm audit --omit=dev` — 0 vulnerabilities |

## Bugs found and fixed during testing

1. **Mobile nav overflow.** The brand name wrapped and pushed "Pricing" off-screen at
   390px. Fixed by shortening the brand and tightening link padding; re-screenshotted.
2. **React hydration error #418 on `/practice/`.** Questions were shuffled during the
   server render and again on the client, so the text differed. Fixed by shuffling after
   mount and resetting the order when the subject or topic changes.
3. **Free users could land on a locked question.** The shuffled pool could start on a
   premium question, showing a paywall before any practice. Fixed by filtering the pool to
   free questions when Premium is off.
4. **404 on the favicon.** Added `app/icon.svg`; the browser check now reports no failed
   requests.

## E2E output (Chromium)

```
PASS  home has the hero
PASS  sample answer shows feedback and an explanation
PASS  practice lists questions
PASS  practice shows correct or not-quite feedback
PASS  next question changes the prompt
PASS  tutor returns a matching explanation
PASS  premium demo unlocks
PASS  premium state persists
PASS  progress shows accuracy
PASS  no horizontal overflow at 390px on /
PASS  no horizontal overflow at 390px on /practice/
PASS  no horizontal overflow at 390px on /tutor/
PASS  no horizontal overflow at 390px on /progress/
PASS  no horizontal overflow at 390px on /pricing/
PASS  no console or page errors
```

## Production browser check

| Route | HTTP | Console errors | LCP | CLS |
| --- | --- | --- | --- | --- |
| `/` | 200 | 0 | 0.7s | 0.00 |
| `/practice/` | 200 | 0 | 0.7s | 0.00 |
| `/tutor/` | 200 | 0 | 0.6s | 0.00 |
| `/progress/` | 200 | 0 | 0.6s | 0.01 |
| `/pricing/` | 200 | 0 | 0.4s | 0.00 |
| `/thanks/` | 200 | 0 | 0.4s | 0.00 |

Weight: ~0.17 MB over ~19 requests.

## Open items

- Firefox/WebKit and axe/Lighthouse are not installed in this environment; run them in CI.
- Premium is a demo until Stripe and server-side gating land (see `SECURITY-REVIEW.md`).
- The email waitlist form is submitted to Netlify Forms; no submission was created during
  testing to avoid polluting the owner's list.
