import { describe, expect, it } from "vitest";
import { formatNaira, formatPhone } from "./format";

describe("formatNaira", () => {
  it("formats thousands with separators", () => {
    expect(formatNaira(485000)).toBe("₦485,000");
  });

  it("rounds fractional amounts", () => {
    expect(formatNaira(1234.6)).toBe("₦1,235");
  });

  it("handles zero", () => {
    expect(formatNaira(0)).toBe("₦0");
  });
});

describe("formatPhone", () => {
  it("groups an 11-digit local number", () => {
    expect(formatPhone("08030000000")).toBe("0803 000 0000");
  });

  it("normalizes a +234 prefix", () => {
    expect(formatPhone("+2348030000000")).toBe("0803 000 0000");
  });

  it("returns unexpected shapes untouched", () => {
    expect(formatPhone("12345")).toBe("12345");
  });
});
