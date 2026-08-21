import { z } from "zod";

import { allArms } from "@/content/levels";

export const roomKinds = ["class", "lab", "staff", "other"] as const;
export type RoomKind = (typeof roomKinds)[number];

const pct = z.number().min(0).max(100);

const roomSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  kind: z.enum(roomKinds),
  x: pct,
  y: pct,
  w: pct,
  h: pct,
});

const planSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  corridor: z.string().min(1),
  rooms: z.array(roomSchema).min(1),
});

export type PlanRoom = z.infer<typeof roomSchema>;
export type FloorPlan = z.infer<typeof planSchema>;

export const floorPlans: FloorPlan[] = z
  .array(planSchema)
  .length(5)
  .parse([
    {
      id: "bg",
      label: "Block B · Ground floor",
      corridor: "north side, opens to the quad",
      rooms: [
        { code: "B-101", name: "JSS 1A", kind: "class", x: 2, y: 4, w: 17, h: 40 },
        { code: "B-102", name: "JSS 1B", kind: "class", x: 20, y: 4, w: 17, h: 40 },
        { code: "B-103", name: "JSS 1C", kind: "class", x: 38, y: 4, w: 17, h: 40 },
        { code: "B-104", name: "JSS 2A", kind: "class", x: 56, y: 4, w: 17, h: 40 },
        { code: "B-1L", name: "Physics laboratory", kind: "lab", x: 74, y: 4, w: 24, h: 58 },
        { code: "B-1S", name: "Ìrókò staff room", kind: "staff", x: 2, y: 46, w: 26, h: 32 },
        { code: "B-1P", name: "Print & resources", kind: "other", x: 29, y: 46, w: 18, h: 32 },
        { code: "B-1W", name: "Washrooms", kind: "other", x: 48, y: 46, w: 12, h: 32 },
        { code: "B-1T", name: "Technician store", kind: "other", x: 61, y: 46, w: 12, h: 32 },
      ],
    },
    {
      id: "b1",
      label: "Block B · First floor",
      corridor: "north side, stair at both ends",
      rooms: [
        { code: "B-201", name: "JSS 2B", kind: "class", x: 2, y: 4, w: 17, h: 40 },
        { code: "B-202", name: "JSS 2C", kind: "class", x: 20, y: 4, w: 17, h: 40 },
        { code: "B-203", name: "JSS 3A", kind: "class", x: 38, y: 4, w: 17, h: 40 },
        { code: "B-204", name: "JSS 3B", kind: "class", x: 56, y: 4, w: 17, h: 40 },
        { code: "B-2L", name: "Chemistry laboratory", kind: "lab", x: 74, y: 4, w: 24, h: 58 },
        { code: "B-2S", name: "Grove staff room", kind: "staff", x: 2, y: 46, w: 26, h: 32 },
        { code: "B-2R", name: "Reagent store", kind: "other", x: 29, y: 46, w: 15, h: 32 },
        { code: "B-2M", name: "Maths clinic", kind: "other", x: 45, y: 46, w: 28, h: 32 },
      ],
    },
    {
      id: "cg",
      label: "Block C · Ground floor",
      corridor: "south side, faces the field",
      rooms: [
        { code: "C-101", name: "JSS 3C", kind: "class", x: 2, y: 4, w: 17, h: 40 },
        { code: "C-102", name: "JSS 3D", kind: "class", x: 20, y: 4, w: 17, h: 40 },
        { code: "C-103", name: "SS 1 Science A", kind: "class", x: 38, y: 4, w: 17, h: 40 },
        { code: "C-104", name: "SS 1 Science B", kind: "class", x: 56, y: 4, w: 17, h: 40 },
        { code: "C-1L", name: "Biology laboratory", kind: "lab", x: 74, y: 4, w: 24, h: 58 },
        { code: "C-105", name: "SS 1 Arts", kind: "class", x: 2, y: 46, w: 20, h: 32 },
        { code: "C-1P", name: "Lab prep room", kind: "other", x: 23, y: 46, w: 18, h: 32 },
        { code: "C-1G", name: "Greenhouse annexe", kind: "other", x: 42, y: 46, w: 31, h: 32 },
      ],
    },
    {
      id: "c1",
      label: "Block C · First floor",
      corridor: "south side, senior wing",
      rooms: [
        { code: "C-201", name: "SS 1 Commercial", kind: "class", x: 2, y: 4, w: 18, h: 40 },
        { code: "C-202", name: "SS 2 Science A", kind: "class", x: 21, y: 4, w: 18, h: 40 },
        { code: "C-203", name: "SS 2 Science B", kind: "class", x: 40, y: 4, w: 18, h: 40 },
        { code: "C-204", name: "SS 2 Arts", kind: "class", x: 59, y: 4, w: 18, h: 40 },
        { code: "C-205", name: "SS 2 Commercial", kind: "class", x: 78, y: 4, w: 20, h: 40 },
        { code: "C-2S", name: "Ridge staff room", kind: "staff", x: 2, y: 46, w: 26, h: 32 },
        { code: "C-2E", name: "Exams office", kind: "other", x: 29, y: 46, w: 18, h: 32 },
        { code: "C-2C", name: "Counselling suite", kind: "other", x: 48, y: 46, w: 22, h: 32 },
        { code: "C-2Q", name: "Quiet study", kind: "other", x: 71, y: 46, w: 27, h: 32 },
      ],
    },
    {
      id: "dg",
      label: "Block D · Senior wing",
      corridor: "central spine, library at the end",
      rooms: [
        { code: "D-101", name: "SS 3 Science A", kind: "class", x: 2, y: 4, w: 18, h: 40 },
        { code: "D-102", name: "SS 3 Science B", kind: "class", x: 21, y: 4, w: 18, h: 40 },
        { code: "D-103", name: "SS 3 Arts", kind: "class", x: 40, y: 4, w: 18, h: 40 },
        { code: "D-104", name: "SS 3 Commercial", kind: "class", x: 59, y: 4, w: 18, h: 40 },
        { code: "D-1I", name: "ICT suite", kind: "lab", x: 78, y: 4, w: 20, h: 40 },
        { code: "D-1B", name: "Library & reading room", kind: "other", x: 2, y: 46, w: 40, h: 32 },
        { code: "D-1U", name: "UTME lab", kind: "lab", x: 43, y: 46, w: 24, h: 32 },
        {
          code: "D-1A",
          name: "Careers & alumni office",
          kind: "other",
          x: 68,
          y: 46,
          w: 30,
          h: 32,
        },
      ],
    },
  ]);

export const roomNotes: Record<Exclude<RoomKind, "class">, string> = {
  lab: "Specialist teaching space with its own technician, safety kit and lockable store. Booked by period across all six years.",
  staff:
    "A desk for every teacher assigned here, a marking table, and the pigeonholes parents drop notes into.",
  other: "Support space — no timetabled class, but in use most of the school day.",
};

// The arm → home-room join is load-bearing: every arm's room code must exist
// in exactly one floor plan, or detail panels silently degrade.
const planRoomCodes = new Set(floorPlans.flatMap((p) => p.rooms.map((r) => r.code)));
for (const arm of allArms) {
  if (!planRoomCodes.has(arm.room)) {
    throw new Error(`Arm ${arm.code} points at room ${arm.room}, which is not on any floor plan`);
  }
}

export function planById(id: string): FloorPlan {
  return floorPlans.find((p) => p.id === id) ?? floorPlans[0];
}
