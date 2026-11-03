import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const out = join(process.cwd(), "out");
const hasBuild = existsSync(join(out, "index.html"));

describe.skipIf(!hasBuild)("static export", () => {
  const routes: [string, string][] = [
    ["index.html", "Pass the 2BAC STE"],
    ["practice/index.html", "Practice, one question at a time."],
    ["exam/index.html", "Exam simulation."],
    ["tutor/index.html", "Ask the revision tutor."],
    ["progress/index.html", "Your progress."],
    ["pricing/index.html", "Simple pricing."],
    ["worksheets/index.html", "Printable worksheets."],
    ["schools/index.html", "Bring it to your class."],
    ["thanks/index.html", "You are on the list."],
    ["fr/index.html", "Réussis ton 2BAC STE"],
    ["fr/ecoles/index.html", "Utilisez-le avec votre classe."],
    ["ar/index.html", "راجع للباك 2BAC STE"],
  ];

  for (const [file, marker] of routes) {
    it(`renders ${file} with its heading`, () => {
      const html = readFileSync(join(out, file), "utf8");
      expect(html).toContain(marker);
      expect(html).toContain("BAC STE Tutor");
    });
  }

  it("ships robots.txt pointing at the sitemap", () => {
    const robots = readFileSync(join(out, "robots.txt"), "utf8");
    expect(robots).toContain("Sitemap: https://hidezfzefz.github.io/sitemap.xml");
  });

  it("ships a sitemap with every public route", () => {
    const map = readFileSync(join(out, "sitemap.xml"), "utf8");
    for (const path of ["/fr/", "/fr/ecoles/", "/ar/", "/practice/", "/exam/", "/tutor/", "/progress/", "/pricing/", "/guides/limits/", "/worksheets/", "/schools/"]) {
      expect(map).toContain(`https://hidezfzefz.github.io${path}`);
    }
  });

  it("ships a web app manifest with both icons", () => {
    const manifest = readFileSync(join(out, "manifest.webmanifest"), "utf8");
    expect(manifest).toContain("/icons/icon-192.png");
    expect(manifest).toContain("/icons/icon-512.png");
    expect(manifest).toContain("\"display\":\"standalone\"");
  });

  it("ships the service worker and its shell", () => {
    const sw = readFileSync(join(out, "sw.js"), "utf8");
    expect(sw).toContain("bacste-v5");
    expect(sw).toContain("/exam/");
    expect(sw).toContain("/guides/limits/");
  });

  it("ships a social preview image and meta tags", () => {
    expect(existsSync(join(out, "og.png"))).toBe(true);
    const html = readFileSync(join(out, "index.html"), "utf8");
    expect(html).toContain('property="og:image"');
    expect(html).toContain("https://hidezfzefz.github.io/og.png");
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
  });

  it("links the French and Arabic versions with hreflang", () => {
    const html = readFileSync(join(out, "index.html"), "utf8");
    expect(html).toMatch(/hreflang="fr"/i);
    expect(html).toMatch(/hreflang="ar"/i);
    const ar = readFileSync(join(out, "ar", "index.html"), "utf8");
    expect(ar).toContain('dir="rtl"');
    expect(ar).toContain('lang="ar"');
  });

  it("renders every guide with key points", () => {
    for (const slug of [
      "limits",
      "derivatives",
      "integrals",
      "complex-numbers",
      "tenses",
      "conditionals",
      "passive-voice",
      "reported-speech",
    ]) {
      const html = readFileSync(join(out, "guides", slug, "index.html"), "utf8");
      expect(html, slug).toContain("Key points");
      expect(html, slug).toContain("Practise");
    }
  });
});
