import { describe, expect, it } from "vitest";

import { staffRooms } from "@/content/staff";
import { staffFor } from "@/features/people/roster";

describe("staffFor", () => {
  it("returns exactly each room's advertised headcount", () => {
    for (const room of staffRooms) {
      expect(staffFor(room.id)).toHaveLength(room.count);
    }
  });

  it("is deterministic", () => {
    expect(staffFor("iroko")).toEqual(staffFor("iroko"));
  });

  it("gives every entry an honorific, a subject and a duty", () => {
    for (const t of staffFor("grove")) {
      expect(t.name).toMatch(/^(Mr|Mrs) /);
      expect(t.subject).toBeTruthy();
      expect(t.duty).toBeTruthy();
    }
  });
});
