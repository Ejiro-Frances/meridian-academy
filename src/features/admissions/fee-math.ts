import {
  boardingFee,
  busRoutes,
  maxChildren,
  siblingDiscountRate,
  tuition,
  type BusRouteId,
} from "@/content/fees";
import type { LevelId } from "@/content/levels";

export type Boarding = "day" | "board";

export type FeeBreakdown = {
  tuition: number;
  boarding: number;
  busFee: number;
  gross: number;
  discountRate: number;
  discount: number;
  total: number;
};

/** Per-term fee calculation. Boarders never pay bus; the sibling discount is
 * 7.5% per child after the first, applied to the whole gross. */
export function calculateTermFees(input: {
  levelId: LevelId;
  board: Boarding;
  busId: BusRouteId;
  children: number;
}): FeeBreakdown {
  const children = Math.min(Math.max(input.children, 1), maxChildren);
  const t = tuition[input.levelId];
  const boarding = input.board === "board" ? boardingFee : 0;
  const busRow = busRoutes.find((b) => b.id === input.busId) ?? busRoutes[0];
  const busFee = input.board === "board" ? 0 : busRow.fee;
  const gross = (t + boarding + busFee) * children;
  const discountRate = children > 1 ? siblingDiscountRate * (children - 1) : 0;
  const discount = Math.round(gross * discountRate);
  return { tuition: t, boarding, busFee, gross, discountRate, discount, total: gross - discount };
}
