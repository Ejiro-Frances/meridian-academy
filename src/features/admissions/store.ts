import { create } from "zustand";

import { maxChildren, openDaySlots, type BusRouteId } from "@/content/fees";
import type { LevelId } from "@/content/levels";
import type { Boarding } from "@/features/admissions/fee-math";

type AdmissionsState = {
  // fee calculator
  feeLevel: LevelId;
  board: Boarding;
  bus: BusRouteId;
  kids: number;
  setFeeLevel: (l: LevelId) => void;
  setBoard: (b: Boarding) => void;
  setBus: (b: BusRouteId) => void;
  incKids: () => void;
  decKids: () => void;
  // open-day booking
  slot: string;
  name: string;
  phone: string;
  booked: boolean;
  setSlot: (s: string) => void;
  setName: (v: string) => void;
  setPhone: (v: string) => void;
  submit: () => void;
  resetBooking: () => void;
};

export const useAdmissionsStore = create<AdmissionsState>((set, get) => ({
  feeLevel: "JSS1",
  board: "day",
  bus: "inner",
  kids: 1,
  setFeeLevel: (feeLevel) => set({ feeLevel }),
  setBoard: (board) => set({ board }),
  setBus: (bus) => set({ bus }),
  incKids: () => set((s) => ({ kids: Math.min(maxChildren, s.kids + 1) })),
  decKids: () => set((s) => ({ kids: Math.max(1, s.kids - 1) })),

  slot: openDaySlots[1],
  name: "",
  phone: "",
  booked: false,
  setSlot: (slot) => set({ slot }),
  setName: (name) => set({ name }),
  setPhone: (phone) => set({ phone }),
  submit: () => {
    const { name, phone } = get();
    if (name.trim().length > 1 && phone.trim().length > 5) set({ booked: true });
  },
  resetBooking: () => set({ booked: false, name: "", phone: "" }),
}));

export function bookingReady(name: string, phone: string): boolean {
  return name.trim().length > 1 && phone.trim().length > 5;
}
