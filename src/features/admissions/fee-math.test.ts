import { describe, expect, it } from "vitest";

import { calculateTermFees } from "@/features/admissions/fee-math";

describe("calculateTermFees", () => {
  it("computes a day student with a bus route", () => {
    const f = calculateTermFees({ levelId: "JSS1", board: "day", busId: "inner", children: 1 });
    expect(f.tuition).toBe(520_000);
    expect(f.busFee).toBe(95_000);
    expect(f.boarding).toBe(0);
    expect(f.discount).toBe(0);
    expect(f.total).toBe(615_000);
  });

  it("boarders pay boarding but never bus", () => {
    const f = calculateTermFees({ levelId: "SS3", board: "board", busId: "outer", children: 1 });
    expect(f.boarding).toBe(380_000);
    expect(f.busFee).toBe(0);
    expect(f.total).toBe(640_000 + 380_000);
  });

  it("applies 7.5% per sibling after the first, on the whole gross", () => {
    const f = calculateTermFees({ levelId: "JSS2", board: "day", busId: "none", children: 3 });
    const gross = 520_000 * 3;
    const discount = Math.round(gross * 0.15);
    expect(f.gross).toBe(gross);
    expect(f.discount).toBe(discount);
    expect(f.total).toBe(gross - discount);
  });

  it("clamps children to 1–4", () => {
    expect(
      calculateTermFees({ levelId: "JSS1", board: "day", busId: "none", children: 0 }).gross,
    ).toBe(520_000);
    expect(
      calculateTermFees({ levelId: "JSS1", board: "day", busId: "none", children: 9 }).gross,
    ).toBe(520_000 * 4);
  });
});
