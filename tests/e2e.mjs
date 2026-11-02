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
  if (m.type() === "error") errors.push(m.text());
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
check("practice lists questions", (await page.locator("button[aria-pressed]").count()) === 4);
const q1 = await page.locator("section h2").innerText();
await page.locator("button[aria-pressed]").first().click();
check(
  "practice shows correct or not-quite feedback",
  /Correct|Not quite/.test(await page.locator("section").innerText()),
);
await page.getByRole("button", { name: "Next question" }).click();
const q2 = await page.locator("section h2").innerText();
check("next question changes the prompt", q1 !== q2);

// 3. Tutor search.
await page.goto(`${BASE}/tutor/`, { waitUntil: "networkidle" });
await page.getByLabel("What are you stuck on?").fill("derivative");
check(
  "tutor returns a matching explanation",
  (await page.locator("article").first().innerText()).toLowerCase().includes("derivative"),
);

// 4. Premium demo unlock persists across pages.
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

// 6. Exam simulation: answer all ten, finish, and see the review.
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
for (const path of ["/", "/practice/", "/exam/", "/tutor/", "/progress/", "/pricing/"]) {
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
