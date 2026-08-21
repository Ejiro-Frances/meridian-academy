import { z } from "zod";

import type { LevelId } from "@/content/levels";

// Per-term tuition by entry class — 2026/27 session placeholder figures.
// These change every session: keep them here, never in components.
export const tuition: Record<LevelId, number> = z
  .record(z.string(), z.number().int().positive())
  .parse({
    JSS1: 520_000,
    JSS2: 520_000,
    JSS3: 545_000,
    SS1: 610_000,
    SS2: 610_000,
    SS3: 640_000,
  }) as Record<LevelId, number>;

const busRouteSchema = z.object({
  id: z.enum(["none", "inner", "mid", "outer"]),
  label: z.string().min(1),
  fee: z.number().int().min(0),
});

export type BusRoute = z.infer<typeof busRouteSchema>;
export type BusRouteId = BusRoute["id"];

export const busRoutes: BusRoute[] = z
  .array(busRouteSchema)
  .length(4)
  .parse([
    { id: "none", label: "No bus", fee: 0 },
    { id: "inner", label: "Akinyele / Moniya", fee: 95_000 },
    { id: "mid", label: "Bodija / Jericho", fee: 110_000 },
    { id: "outer", label: "Ring Road / Challenge", fee: 140_000 },
  ]);

export const boardingFee = 380_000;
export const siblingDiscountRate = 0.075; // per child after the first
export const maxChildren = 4;
export const newStudentLevy = 180_000; // one-off, first term only

/** Open-day Saturday slots. */
export const openDaySlots: string[] = ["12 Sep", "26 Sep", "10 Oct"];
