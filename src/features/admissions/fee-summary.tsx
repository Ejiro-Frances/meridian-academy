"use client";

import { Icon } from "@/components/icon";
import { feeDisclaimer } from "@/content/admissions";
import { busRoutes, tuition } from "@/content/fees";
import { levelById } from "@/content/levels";
import { useAdmissionsStore } from "@/features/admissions/store";
import { calculateTermFees } from "@/features/admissions/fee-math";
import { formatNaira } from "@/lib/format";
import { cn } from "@/lib/utils";

export function FeeSummary() {
  const { feeLevel, board, bus, kids } = useAdmissionsStore();
  const fees = calculateTermFees({ levelId: feeLevel, board, busId: bus, children: kids });
  const busRow = busRoutes.find((b) => b.id === bus) ?? busRoutes[0];

  const lines = [
    {
      k: `Tuition · ${levelById(feeLevel).label}`,
      v: formatNaira(tuition[feeLevel]),
      icon: "graduation-cap",
      cls: "",
    },
    {
      k: board === "board" ? "Boarding, meals & laundry" : "Day student (no boarding)",
      v: formatNaira(fees.boarding),
      icon: "bed-double",
      cls: "",
    },
    {
      k: board === "board" ? "Bus not applicable to boarders" : `School bus · ${busRow.label}`,
      v: formatNaira(fees.busFee),
      icon: "bus",
      cls: "",
    },
    {
      k:
        kids > 1
          ? `Sibling discount · ${Math.round(fees.discountRate * 100)}%`
          : "One child enrolling",
      v: fees.discount ? `−${formatNaira(fees.discount)}` : formatNaira(0),
      icon: "users",
      cls: fees.discount ? "text-leaf-600" : "text-subtle",
    },
  ];

  return (
    <>
      <div className="grid gap-2.75" aria-live="polite">
        {lines.map((l) => (
          <div key={l.icon} className="flex items-center justify-between gap-3">
            <span
              className={cn("inline-flex items-center gap-2.25 text-[15px] font-medium", l.cls)}
            >
              <Icon name={l.icon} className="size-4" />
              {l.k}
            </span>
            <span className={cn("font-mono text-[15px] font-bold", l.cls)}>{l.v}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-linear-150 from-sage-900 to-sage-700 px-5 py-5 shadow-brand max-lg:sticky max-lg:bottom-3 max-lg:z-10 sm:px-6.5 sm:py-6">
        <div className="grid gap-1">
          <span className="text-xs font-bold tracking-[0.13em] uppercase text-clay-200">
            Payable this term
          </span>
          <span className="text-[13.5px] text-white/75">
            {kids > 1
              ? `${kids} children · ${formatNaira(Math.round(fees.total / kids))} each on average`
              : "One child, one term"}
          </span>
        </div>
        <span className="font-mono text-[32px] font-bold tracking-[-0.03em] text-white">
          {formatNaira(fees.total)}
        </span>
      </div>
      <p className="text-[13px] leading-normal text-subtle">{feeDisclaimer}</p>
    </>
  );
}
