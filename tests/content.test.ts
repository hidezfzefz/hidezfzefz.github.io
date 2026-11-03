import { describe, expect, it } from "vitest";
import { QUESTIONS, SUBJECTS, topicsFor } from "../lib/questions";

describe("question bank", () => {
  it("has unique ids", () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has four options and a valid answer for every question", () => {
    for (const q of QUESTIONS) {
      expect(q.options.length, q.id).toBe(4);
      expect(q.answer, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answer, q.id).toBeLessThan(4);
      expect(q.explanation.length, q.id).toBeGreaterThan(20);
      expect(q.prompt.length, q.id).toBeGreaterThan(5);
    }
  });

  it("does not repeat a prompt", () => {
    const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    const seen = new Map<string, string>();
    for (const q of QUESTIONS) {
      const key = normalize(q.prompt);
      expect(seen.has(key), `${q.id} repeats ${seen.get(key)}`).toBe(false);
      seen.set(key, q.id);
    }
  });

  it("offers free and premium questions for every subject", () => {
    for (const s of SUBJECTS) {
      const pool = QUESTIONS.filter((q) => q.subject === s.id);
      expect(pool.some((q) => !q.premium), s.id).toBe(true);
      expect(pool.some((q) => q.premium), s.id).toBe(true);
      expect(topicsFor(s.id).length, s.id).toBeGreaterThan(2);
    }
  });
});
