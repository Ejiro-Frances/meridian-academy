import { describe, expect, it } from "vitest";

import { allArms, levels, totalArms, totalStudents } from "@/content/levels";
import { floorPlans } from "@/content/plans";
import { totalTeachingStaff } from "@/content/staff";

describe("school data integrity", () => {
  it("has the expected arm distribution (3+3+4+4+4+4 = 22)", () => {
    expect(levels.map((l) => l.arms.length)).toEqual([3, 3, 4, 4, 4, 4]);
    expect(totalArms).toBe(22);
  });

  it("keeps every arm between 25 and 31 students, capped at 27 in SS 3", () => {
    for (const a of allArms) {
      expect(a.size).toBeGreaterThanOrEqual(25);
      expect(a.size).toBeLessThanOrEqual(a.levelId === "SS3" ? 27 : 31);
    }
  });

  it("gives every arm one form teacher and one distinct assistant", () => {
    for (const a of allArms) {
      expect(a.form).toBeTruthy();
      expect(a.assist).toBeTruthy();
      expect(a.form).not.toBe(a.assist);
    }
  });

  it("keeps the arm → floor-plan room join intact", () => {
    const codes = new Set(floorPlans.flatMap((p) => p.rooms.map((r) => r.code)));
    for (const a of allArms) expect(codes.has(a.room)).toBe(true);
  });

  it("derives the stat-band figures the site advertises", () => {
    expect(totalStudents).toBe(607);
    expect(totalTeachingStaff).toBe(64);
  });
});
