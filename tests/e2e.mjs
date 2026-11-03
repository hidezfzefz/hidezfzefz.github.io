import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:8099";
const exe =
  process.env.CHROME_PATH ??
  "/home/user/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";

const browser = await chromium.launch({
  executablePath: exe,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const errors = [];
let failures = 0;

function check(name, condition, extra = "") {
  if (condition) {
    console.log(`PASS  ${name}`);
  } else {
    failures += 1;
    console.log(`FAIL  ${name}${extra ? ` — ${extra}` : ""}`);
  }
}

const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.on("console", (m) => {
  if (m.type() !== "error") return;
  // Next.js cancels in-flight prefetches on navigation; the browser logs those as
  // "Failed to load resource" even though nothing is actually broken.
  if (/Failed to load resource: net::ERR_(FAILED|ABORTED)/.test(m.text())) return;
  errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));
page.on("response", (res) => {
  if (res.status() >= 400) errors.push(`HTTP ${res.status()} ${res.url()}`);
});

// 1. Landing: sample question answers and explains.
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
check("home has the hero", (await page.locator("h1").innerText()).includes("2BAC STE"));
await page.getByRole("button", { name: /^A\s/ }).first().click();
check(
  "sample answer shows feedback and an explanation",
  /Correct|Not quite/.test(await page.locator("main").innerText()),
);

// 2. Practice: answer one question, see feedback, move on.
await page.goto(`${BASE}/practice/`, { waitUntil: "networkidle" });
check(
  "practice lists questions",
  (await page.locator("section button[aria-pressed]").count()) === 4,
);
const q1 = await page.locator("section h2").innerText();
await page.locator("section button[aria-pressed]").first().click();
check(
  "practice shows correct or not-quite feedback",
  /Correct|Not quite/.test(await page.locator("section").innerText()),
);
await page.getByRole("button", { name: "Next question" }).click();
const q2 = await page.locator("section h2").innerText();
check("next question changes the prompt", q1 !== q2);

// 2b. French mode: a French maths prompt, kept when moving to the next page.
await page.goto(`${BASE}/practice/?subject=maths&lang=fr`, { waitUntil: "networkidle" });
const frPrompt = await page.locator("section h2").innerText();
check(
  "French link shows a French maths prompt",
  /[àâçéèêëîïôùûü]|quel|calculez|résolvez|soit|une suite|on lance|que vaut/i.test(
    frPrompt,
  ),
  frPrompt,
);
check(
  "French mode translates the interface",
  (await page.locator("main").innerText()).includes("Une question à la fois"),
);
await page.locator("section button[aria-pressed]").first().click();
check(
  "French mode translates the feedback",
  /Bonne réponse|Pas tout à fait/.test(await page.locator("section").innerText()),
);
await page.getByRole("button", { name: "Question suivante" }).click();
const frToggle = page.getByRole("group", { name: "Langue" }).getByRole("button", { name: "FR" });
check(
  "French mode survives the next question",
  (await frToggle.getAttribute("aria-pressed")) === "true",
);
check(
  "next French question is still in French",
  /[àâçéèêëîïôùûü]|quel|calculez|résolvez|soit|une suite|on lance|que vaut/i.test(
    await page.locator("section h2").innerText(),
  ),
);
await page.goto(`${BASE}/worksheets/?lang=fr`, { waitUntil: "networkidle" });
check(
  "French worksheet prints a French heading",
  (await page.locator("main").innerText()).includes("Exercices de maths"),
);
check(
  "French worksheet keeps a French answer key",
  (await page.getByRole("heading", { name: "Corrigé" }).count()) === 1,
);

// 3. Tutor search.
await page.goto(`${BASE}/tutor/`, { waitUntil: "networkidle" });
await page.getByLabel("What are you stuck on?").fill("derivative");
check(
  "tutor returns a matching explanation",
  (await page.locator("article").first().innerText()).toLowerCase().includes("derivative"),
);

// 4. Guides: read a guide, then jump into practice on the same topic.
await page.goto(`${BASE}/guides/`, { waitUntil: "networkidle" });
check("guides index lists eight guides", (await page.locator("article").count()) === 8);
await page.goto(`${BASE}/guides/limits/`, { waitUntil: "networkidle" });
check(
  "guide renders its sections and key points",
  (await page.getByRole("heading", { name: "Key points" }).count()) === 1 &&
    (await page.locator("main").innerText()).includes("sin(x)/x"),
);
const share = page.getByRole("link", { name: "Share on WhatsApp" });
check(
  "guide has a WhatsApp share link",
  (await share.getAttribute("href"))?.startsWith("https://wa.me/?text="),
);
await page.getByRole("link", { name: /Practise limits and continuity/i }).click();
await page.locator("section").first().getByText("Limits and continuity").waitFor();
check(
  "guide deep-links into its practice topic",
  (await page.locator("section").first().innerText()).includes("Limits and continuity"),
);

// 5. Premium demo unlock persists across pages.
await page.goto(`${BASE}/pricing/`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Preview Premium (demo)" }).click();
check(
  "premium demo unlocks",
  (await page.getByText("Premium is active on this device").count()) === 1,
);
await page.goto(`${BASE}/practice/`, { waitUntil: "networkidle" });
check("premium state persists", (await page.getByText("Premium active").count()) === 1);

// 5. Progress shows the attempt.
await page.goto(`${BASE}/progress/`, { waitUntil: "networkidle" });
check("progress shows accuracy", (await page.locator("main").innerText()).includes("accuracy"));

// 6. Worksheet builder: generates questions and can hide the answer key.
await page.goto(`${BASE}/worksheets/`, { waitUntil: "networkidle" });
check("worksheet builds twelve questions", (await page.locator("li.print-question").count()) === 12);
await page.getByLabel("Sheet title (optional)").fill("Contrôle — Limites");
check(
  "a custom sheet title is printed",
  (await page.getByRole("heading", { name: "Contrôle — Limites" }).count()) === 1,
);
await page.getByLabel("Question mix").selectOption("balanced");
check(
  "balanced mix still fills the sheet",
  (await page.locator("li.print-question").count()) === 12,
);
check("worksheet shows the answer key", (await page.getByRole("heading", { name: "Answer key" }).count()) === 1);
await page.getByLabel("Include answer key").uncheck();
check("answer key can be hidden", (await page.getByRole("heading", { name: "Answer key" }).count()) === 0);
check("worksheet has a print button", (await page.getByRole("button", { name: "Print worksheet" }).count()) === 1);

// 7. Schools page offers the pilot by email.
await page.goto(`${BASE}/schools/`, { waitUntil: "networkidle" });
const pilot = page.getByRole("link", { name: "Request the pilot" });
check("schools page has a pilot email link", (await pilot.getAttribute("href"))?.startsWith("mailto:"));

// 8. French and Arabic landing pages, and the subject deep link they use.
await page.goto(`${BASE}/fr/`, { waitUntil: "networkidle" });
check(
  "French page is in French",
  (await page.locator("main").innerText()).includes("Réussis ton 2BAC STE"),
);
check(
  "French page links to the Arabic version",
  (await page.locator('a[href="/ar/"]').count()) >= 1,
);
await page.goto(`${BASE}/ar/`, { waitUntil: "networkidle" });
check("Arabic page is right to left", (await page.locator('[dir="rtl"]').count()) >= 1);
await page.goto(`${BASE}/fr/ecoles/`, { waitUntil: "networkidle" });
check(
  "French teacher page has a pilot email link",
  (await page
    .getByRole("link", { name: "Demander l’essai" })
    .getAttribute("href"))?.startsWith("mailto:"),
);
await page.goto(`${BASE}/practice/?subject=english`, { waitUntil: "networkidle" });
await page.getByRole("tab", { name: "English" }).waitFor();
check(
  "subject deep link selects English",
  (await page.getByRole("tab", { name: "English" }).getAttribute("aria-selected")) === "true",
);

// 9. Exam simulation: answer all ten, finish, and see the review.
await page.goto(`${BASE}/exam/`, { waitUntil: "networkidle" });
check("exam page offers a start", (await page.getByRole("button", { name: "Start exam" }).count()) === 1);
await page.getByRole("button", { name: "Start exam" }).click();
for (let i = 0; i < 10; i++) {
  const options = page.locator("section button[aria-pressed]");
  check(`exam question ${i + 1} has options`, (await options.count()) === 4);
  await options.first().click();
  const last = i === 9;
  await page.getByRole("button", { name: last ? "Finish exam" : "Next question" }).click();
}
check(
  "exam shows a score and a review",
  /Exam finished/.test(await page.locator("main").innerText()) &&
    (await page.locator("article").count()) === 10,
);

// 7. PWA: manifest is linked and the service worker registers.
check(
  "manifest is linked",
  (await page.locator('link[rel="manifest"]').count()) === 1,
);
const manifestStatus = await page.evaluate(async () => {
  const res = await fetch("/manifest.webmanifest");
  return res.status;
});
check("manifest is served", manifestStatus === 200, `status ${manifestStatus}`);
const registrations = await page.evaluate(async () => {
  if (!("serviceWorker" in navigator)) return -1;
  return (await navigator.serviceWorker.getRegistrations()).length;
});
check("service worker registers", registrations >= 1, `registrations ${registrations}`);

// 8. Mobile layout has no horizontal overflow.
const mobile = await context.newPage();
await mobile.setViewportSize({ width: 390, height: 844 });
for (const path of ["/", "/fr/", "/fr/ecoles/", "/ar/", "/practice/", "/exam/", "/tutor/", "/progress/", "/pricing/", "/guides/", "/guides/limits/", "/worksheets/", "/schools/"]) {
  await mobile.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
  const overflow = await mobile.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  check(`no horizontal overflow at 390px on ${path}`, overflow <= 1, `overflow ${overflow}px`);
}

check("no console or page errors", errors.length === 0, errors.join(" | ").slice(0, 300));

await browser.close();
console.log(failures === 0 ? "\nAll e2e checks passed." : `\n${failures} e2e checks failed.`);
process.exit(failures === 0 ? 0 : 1);
