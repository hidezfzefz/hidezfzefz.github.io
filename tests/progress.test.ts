import { describe, expect, it } from "vitest";
import { statsFor } from "../lib/progress";
import type { Attempt } from "../lib/progress";

const attempts: Attempt[] = [
  { questionId: "m-lim-1", correct: true, at: 1 },
  { questionId: "m-lim-1", correct: false, at: 2 },
  { questionId: "m-der-1", correct: true, at: 3 },
  { questionId: "e-cond-1", correct: false, at: 4 },
];

describe("statsFor", () => {
  it("counts only attempts for the chosen subject", () => {
    const maths = statsFor("maths", attempts);
    expect(maths.answered).toBe(3);
    expect(maths.correct).toBe(2);
    expect(maths.accuracy).toBe(67);
  });

  it("orders topics weakest first", () => {
    const maths = statsFor("maths", attempts);
    expect(maths.weakest).toBe("Limits and continuity");
  });

  it("returns zeroed stats with no attempts", () => {
    const english = statsFor("english", []);
    expect(english.answered).toBe(0);
    expect(english.accuracy).toBe(0);
    expect(english.weakest).toBeNull();
  });
});
