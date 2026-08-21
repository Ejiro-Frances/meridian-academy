import { ChevronRight, DoorOpen, Users } from "lucide-react";

import type { Arm } from "@/content/levels";
import { cn } from "@/lib/utils";

function shortCode(code: string): string {
  return code
    .replace("JSS ", "")
    .replace("SS ", "")
    .split(" ")
    .map((w) => (isNaN(Number(w[0])) ? w[0] : w))
    .join("");
}

export function ArmRow({
  arm,
  selected,
  onSelect,
}: {
  arm: Arm;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "grid cursor-pointer grid-cols-[auto_1fr_auto_auto] items-center gap-3 rounded-xl border-[1.5px] bg-card px-4 py-4 sm:gap-5 sm:px-5.5 sm:py-5 text-left transition-[colors,transform] hover:translate-x-[3px]",
        selected ? "border-sage-500 shadow-lg" : "border-border shadow-xs",
      )}
    >
      <span
        className={cn(
          "grid size-11 place-items-center sm:size-13 rounded-lg text-[15px] font-extrabold tracking-[-0.02em]",
          selected ? "bg-sage-50 text-sage-700" : "bg-background text-muted-foreground",
        )}
      >
        {shortCode(arm.code)}
      </span>
      <span className="grid gap-1">
        <span className="text-lg font-extrabold tracking-tight text-strong">{arm.code}</span>
        <span className="text-sm text-muted-foreground">
          {arm.form} · assisted by {arm.assist}
        </span>
      </span>
      <span className="grid justify-items-end gap-1">
        <span className="inline-flex items-center gap-1.5 font-mono font-bold text-brand-ink">
          <Users aria-hidden className="size-4" />
          {arm.size}
        </span>
        <span className="inline-flex items-center gap-1.25 text-xs font-semibold tracking-[0.08em] uppercase text-subtle">
          <DoorOpen aria-hidden className="size-3.5" />
          {arm.room}
        </span>
      </span>
      <ChevronRight
        aria-hidden
        className={cn("size-5", selected ? "text-brand-ink" : "text-subtle")}
      />
    </button>
  );
}
