# Test plan — BAC STE Tutor v1

## Scope

A static revision app with no accounts and no payments. The risky logic is scoring,
progress aggregation, premium filtering and the practice state machine.

## Unit (Vitest)

| Area | Cases |
| --- | --- |
| Question bank | unique ids; exactly four options; answer index in range; explanation present; every subject has free **and** premium questions |
| Progress | counts only the selected subject; accuracy rounding; topics ordered weakest first; zeroed empty state |
| Static export | every route renders its heading (including `/exam/`); `robots.txt` points at the sitemap; sitemap contains every public route; manifest lists both icons; service worker caches the shell |

Run: `npm test` (17 tests).

## End-to-end (Chromium via Playwright)

Run: `npm run build && node tests/e2e.mjs` against `out/`.

| Journey | Expected |
| --- | --- |
| Home → sample question | choosing an option reveals "Correct"/"Not quite" and an explanation |
| Practice → answer | four options, feedback appears, "Next question" changes the prompt |
| Tutor → search "derivative" | at least one matching explanation |
| Exam → start | ten questions with four options; answering all ten shows a score and a ten-item review |
| Pricing → demo unlock | premium state appears and persists on `/practice/` |
| Progress | accuracy is shown after an attempt |
| PWA | manifest is linked and served; service worker registers |
| Every page at 390px | no horizontal overflow (including `/exam/`) |
| All pages | no console errors, no page errors, no HTTP ≥ 400 |

## Browser checks (production)

Convio browser `check` on `/`, `/practice/`, `/tutor/`, `/progress/`, `/pricing/`,
`/thanks/` at 1440px, and on `/practice/`, `/progress/` at 390px. Screenshots reviewed
for `/` (1440 and 390) and `/practice/` (1440).

## Accessibility

- Every interactive control is a real `<button>`, `<a>` or `<input>` with a label.
- Skip link, one `<h1>` per page, `aria-current` on the active nav item, `aria-pressed` on
  options, `aria-live="polite"` on the practice card.
- Focus ring: 2px white at 60% with 2px offset, visible on every control.
- Reduced-motion media query disables animations.
- Token contrast: `--cv-text` and `--cv-text-75` on black pass AA; `--cv-text-50` is used
  at 14px or larger only.

## Not covered in v1

- Firefox and WebKit runs: only the Chromium binary is available in this environment.
- axe/Lighthouse CLI: not installed. The manual checks above cover the same ground at v1
  size; run both when CI is set up.
- Real payments, auth, database and multi-user isolation: out of scope until v2.
