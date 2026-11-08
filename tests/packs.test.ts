import { describe, it, expect } from "vitest";
import { PACKS, formatMad } from "../lib/packs";

describe("packs", () => {
  it("formats MAD prices", () => {
    expect(formatMad(39)).toBe("39 MAD");
    expect(formatMad(290)).toBe("290 MAD");
  });
  it("defines three priced packs", () => {
    expect(PACKS).toHaveLength(3);
    for (const p of PACKS) expect(p.priceMad).toBeGreaterThan(0);
  });
  it("env slots are public-prefixed", () => {
    for (const p of PACKS) for (const k of p.env) expect(k.startsWith("NEXT_PUBLIC_")).toBe(true);
  });
});
