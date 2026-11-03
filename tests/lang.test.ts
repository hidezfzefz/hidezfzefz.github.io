import { describe, expect, it } from "vitest";
import { QUESTIONS } from "../lib/questions";
import { MATHS_FR, TOPIC_FR } from "../lib/questions-fr";
import { langFromSearch, localizeQuestion, topicLabel, tr } from "../lib/lang";

describe("French maths mode", () => {
  const maths = QUESTIONS.filter((q) => q.subject === "maths");

  it("translates every maths question", () => {
    const missing = maths.filter((q) => !MATHS_FR[q.id]).map((q) => q.id);
    expect(missing).toEqual([]);
  });

  it("keeps the same four options and the same answer index", () => {
    const normalize = (text: string) => text.replace(/,/g, ".");
    for (const q of maths) {
      const shown = localizeQuestion(q, "fr");
      expect(shown.options.length, q.id).toBe(4);
      expect(normalize(shown.options[shown.answer]), q.id).toBe(
        normalize(q.options[q.answer]),
      );
    }
  });

  it("localizes prompts and explanations but not ids", () => {
    for (const q of maths) {
      const shown = localizeQuestion(q, "fr");
      expect(shown.id).toBe(q.id);
      expect(shown.answer).toBe(q.answer);
      expect(shown.premium).toBe(q.premium);
      expect(shown.prompt, q.id).not.toBe(q.prompt);
      expect(shown.explanation, q.id).not.toBe(q.explanation);
    }
  });

  it("leaves English exercises and English mode untouched", () => {
    for (const q of QUESTIONS) {
      expect(localizeQuestion(q, "en")).toBe(q);
      if (q.subject === "english") expect(localizeQuestion(q, "fr")).toBe(q);
    }
  });

  it("has a French label for every topic", () => {
    const missing = Array.from(new Set(QUESTIONS.map((q) => q.topic))).filter(
      (topic) => !TOPIC_FR[topic],
    );
    expect(missing).toEqual([]);
    expect(topicLabel("Derivatives", "fr")).toBe("Dérivées");
    expect(topicLabel("Derivatives", "en")).toBe("Derivatives");
  });

  it("reads the language from a link and ignores unknown values", () => {
    expect(langFromSearch("?lang=fr")).toBe("fr");
    expect(langFromSearch("?subject=maths&lang=en")).toBe("en");
    expect(langFromSearch("?lang=de")).toBeNull();
    expect(langFromSearch("")).toBeNull();
    expect(tr("fr", "Hello", "Bonjour")).toBe("Bonjour");
    expect(tr("en", "Hello", "Bonjour")).toBe("Hello");
  });
});
