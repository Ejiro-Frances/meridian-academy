"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { YearCard } from "@/features/home/year-card";
import { levelById, levels, type LevelId } from "@/content/levels";
import { cn } from "@/lib/utils";

// The design system's signature motif: done (clay + check) / now (sage +
// glow) / next (dashed). Rails stop at the first and last node centers.
export function Pathway() {
  const [year, setYear] = useState<LevelId>("JSS3");
  const yearIdx = levels.findIndex((l) => l.id === year);

  return (
    <div>
      <div className="mt-11 flex items-start pb-2">
        {levels.map((level, i) => {
          const active = level.id === year;
          const done = yearIdx > i;
          const mark = level.id[0] + level.id.slice(-1);
          return (
            <div
              key={level.id}
              className="relative grid min-w-37.5 flex-1 justify-items-center gap-3.5"
            >
              <div
                className={cn(
                  "absolute top-5.25 h-[3px]",
                  done || active ? "bg-clay-300" : "bg-border",
                  i === 0 ? "left-1/2" : "left-0",
                  i === levels.length - 1 ? "right-1/2" : "right-0",
                )}
              />
              <button
                type="button"
                onClick={() => setYear(level.id)}
                aria-pressed={active}
                aria-label={`${level.label} — ${level.sub}`}
                className={cn(
                  "relative z-2 grid size-11 cursor-pointer place-items-center rounded-full text-[13px] font-extrabold transition-transform hover:scale-110",
                  done && "border-2 border-clay-500 bg-clay-500 text-white",
                  active && "border-2 border-sage-500 bg-sage-200 text-sage-900 shadow-brand",
                  !done && !active && "border-2 border-dashed border-input bg-card text-subtle",
                )}
              >
                {done ? <Check aria-hidden className="size-5" /> : mark}
              </button>
              <button
                type="button"
                onClick={() => setYear(level.id)}
                className="grid cursor-pointer justify-items-center gap-1"
              >
                <span
                  className={cn(
                    "text-[15px] font-extrabold tracking-[-0.02em]",
                    active ? "text-strong" : "text-foreground",
                  )}
                >
                  {level.label}
                </span>
                <span className="text-[13px] font-medium text-subtle">{level.sub}</span>
              </button>
            </div>
          );
        })}
      </div>
      <YearCard level={levelById(year)} />
    </div>
  );
}
