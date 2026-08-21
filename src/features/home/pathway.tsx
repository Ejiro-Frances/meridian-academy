"use client";

import { useState } from "react";

import { PathwayNode } from "@/features/home/pathway-node";
import { YearCard } from "@/features/home/year-card";
import { levelById, levels, type LevelId } from "@/content/levels";
import { cn } from "@/lib/utils";

// The design system's signature motif. Horizontal on desktop; on phones it
// turns vertical — nodes down the left, rail between them, labels right —
// rather than shrinking. Rails stop at the first and last node centers.
export function Pathway() {
  const [year, setYear] = useState<LevelId>("JSS3");
  const yearIdx = levels.findIndex((l) => l.id === year);

  return (
    <div>
      {/* vertical (phones) */}
      <div className="mt-8 md:hidden">
        {levels.map((level, i) => {
          const active = level.id === year;
          const done = yearIdx > i;
          return (
            <div key={level.id} className="relative flex items-center gap-4 py-2.5">
              <div
                className={cn(
                  "absolute left-[20.5px] w-0.75",
                  done || active ? "bg-clay-300" : "bg-border",
                  i === 0 ? "top-1/2" : "top-0",
                  i === levels.length - 1 ? "bottom-1/2" : "bottom-0",
                )}
              />
              <PathwayNode
                level={level}
                active={active}
                done={done}
                onSelect={() => setYear(level.id)}
              />
              <button
                type="button"
                onClick={() => setYear(level.id)}
                className="grid cursor-pointer gap-0.5 text-left"
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

      {/* horizontal (md and up) */}
      <div className="mt-11 hidden items-start pb-2 md:flex">
        {levels.map((level, i) => {
          const active = level.id === year;
          const done = yearIdx > i;
          return (
            <div
              key={level.id}
              className="relative grid min-w-25 flex-1 justify-items-center gap-3.5"
            >
              <div
                className={cn(
                  "absolute top-5.25 h-0.75",
                  done || active ? "bg-clay-300" : "bg-border",
                  i === 0 ? "left-1/2" : "left-0",
                  i === levels.length - 1 ? "right-1/2" : "right-0",
                )}
              />
              <PathwayNode
                level={level}
                active={active}
                done={done}
                onSelect={() => setYear(level.id)}
              />
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
