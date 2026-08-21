"use client";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { busRoutes } from "@/content/fees";
import { levels } from "@/content/levels";
import { FeeSummary } from "@/features/admissions/fee-summary";
import { useAdmissionsStore } from "@/features/admissions/store";
import { formatNaira } from "@/lib/format";
import { cn } from "@/lib/utils";

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-bold tracking-[0.13em] uppercase text-subtle">{children}</span>
  );
}

const boardOpts = [
  { id: "day", label: "Day student", sub: "Home each evening", icon: "bus" },
  { id: "board", label: "Boarder", sub: "Meals, laundry, evening prep", icon: "bed-double" },
] as const;

export function FeeCalculator() {
  const s = useAdmissionsStore();

  return (
    <div className="rounded-2xl border bg-card px-5 pt-6 pb-6 shadow-lg sm:px-8 sm:pt-7.5 sm:pb-8">
      <h2 className="mb-1.5 text-[27px] font-extrabold tracking-[-0.03em] text-strong">
        What a term will cost you
      </h2>
      <p className="mb-6.5 text-[15.5px] text-muted-foreground">
        Per term, per child. Third-term figures, 2026/27 session.
      </p>
      <div className="grid gap-6">
        <div>
          <GroupLabel>Entry class</GroupLabel>
          <div className="mt-2.75 flex flex-wrap gap-2">
            {levels.map((l) => (
              <Button
                key={l.id}
                size="sm"
                variant={l.id === s.feeLevel ? "default" : "ghost"}
                onClick={() => s.setFeeLevel(l.id)}
              >
                {l.label}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <GroupLabel>Boarding</GroupLabel>
          <div className="mt-2.75 flex flex-col gap-2 sm:flex-row">
            {boardOpts.map((b) => {
              const on = s.board === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => s.setBoard(b.id)}
                  className={cn(
                    "flex flex-1 cursor-pointer items-center gap-2.75 rounded-md border-[1.5px] px-4 py-3.25 text-left text-[14.5px] transition-colors",
                    on ? "border-sage-500 bg-sage-100" : "border-border bg-card",
                  )}
                >
                  <Icon
                    name={b.icon}
                    className={cn("size-5", on ? "text-sage-700" : "text-foreground")}
                  />
                  <span className="grid gap-0.75">
                    <span className={cn("font-bold", on ? "text-sage-700" : "text-foreground")}>
                      {b.label}
                    </span>
                    <span
                      className={cn(
                        "text-[12.5px] font-medium",
                        on ? "text-sage-600" : "text-subtle",
                      )}
                    >
                      {b.sub}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        {s.board === "day" && (
          <div>
            <GroupLabel>School bus route</GroupLabel>
            <div className="mt-2.75 grid gap-2">
              {busRoutes.map((b) => {
                const on = s.bus === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => s.setBus(b.id)}
                    className={cn(
                      "flex cursor-pointer items-center gap-2.75 rounded-md border-[1.5px] px-4 py-3 text-[14.5px] font-semibold text-strong transition-colors",
                      on ? "border-sage-500 bg-sage-100" : "border-border bg-card",
                    )}
                  >
                    <Icon
                      name="bus"
                      className={cn("size-4", on ? "text-sage-700" : "text-muted-foreground")}
                    />
                    <span>{b.label}</span>
                    <span
                      className={cn(
                        "ml-auto font-mono text-[13px]",
                        on ? "text-sage-700" : "text-muted-foreground",
                      )}
                    >
                      {b.fee ? formatNaira(b.fee) : "No charge"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div>
          <GroupLabel>Children enrolling</GroupLabel>
          <div className="mt-2.75 flex items-center gap-3.5">
            <Button
              variant="outline"
              size="icon-lg"
              aria-label="One fewer child"
              onClick={s.decKids}
            >
              <Minus />
            </Button>
            <span className="min-w-7 text-center font-mono text-2xl font-bold text-strong">
              {s.kids}
            </span>
            <Button
              variant="outline"
              size="icon-lg"
              aria-label="One more child"
              onClick={s.incKids}
            >
              <Plus />
            </Button>
            <span className="text-[13.5px] font-medium text-muted-foreground">
              {s.kids > 1
                ? "7.5% off for each child after the first"
                : "Add a sibling to see the discount"}
            </span>
          </div>
        </div>
        <div className="h-px bg-slate-100" />
        <FeeSummary />
      </div>
    </div>
  );
}
