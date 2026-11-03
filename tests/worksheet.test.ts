import { describe, expect, it } from "vitest";
import { QUESTIONS } from "../lib/questions";
import { pickQuestions } from "../lib/worksheet";

const maths = QUESTIONS.filter((q) => q.subject === "maths");

describe("worksheet question picking", () => {
  it("returns the requested number without duplicates", () => {
    for (const mix of ["random", "balanced"] as const) {
      const picked = pickQuestions(maths, 12, mix);
      expect(picked).toHaveLength(12);
      expect(new Set(picked.map((q) => q.id)).size).toBe(12);
    }
  });

  it("never asks for more than the pool contains", () => {
    expect(pickQuestions(maths, 100, "random")).toHaveLength(maths.length);
    expect(pickQuestions(maths, 100, "balanced")).toHaveLength(maths.length);
  });

  it("covers every topic first in balanced mode", () => {
    const topics = new Set(maths.map((q) => q.topic));
    const picked = pickQuestions(maths, topics.size, "balanced");
    expect(new Set(picked.map((q) => q.topic)).size).toBe(topics.size);
  });

  it("starts with one question per topic before repeating", () => {
    const topics = new Set(maths.map((q) => q.topic));
    const picked = pickQuestions(maths, topics.size + 3, "balanced");
    const firstRound = picked.slice(0, topics.size);
    expect(new Set(firstRound.map((q) => q.topic)).size).toBe(topics.size);
    expect(new Set(picked.map((q) => q.id)).size).toBe(picked.length);
  });

  it("fills every sheet size the builder offers", () => {
    for (const count of [8, 12, 16, 20]) {
      expect(pickQuestions(maths, count, "balanced"), String(count)).toHaveLength(count);
      expect(pickQuestions(maths, count, "random"), String(count)).toHaveLength(count);
    }
  });

  it("handles an empty pool", () => {
    expect(pickQuestions([], 12, "balanced")).toEqual([]);
    expect(pickQuestions([], 12, "random")).toEqual([]);
  });
});
