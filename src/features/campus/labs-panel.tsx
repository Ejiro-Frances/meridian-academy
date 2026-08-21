"use client";

import { useRef } from "react";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { LabViewer } from "@/features/campus/lab-viewer";
import { labById, labs } from "@/content/labs";
import { useParamState } from "@/lib/use-param-state";
import { cn } from "@/lib/utils";

export function LabsPanel() {
  const [labId, setLabId] = useParamState("lab", "physics");
  const lab = labById(labId);
  const resetRef = useRef<(() => void) | null>(null);

  return (
    <div className="grid grid-cols-[268px_1fr] items-start gap-6">
      <div className="grid gap-2.5">
        {labs.map((l) => {
          const on = l.id === lab.id;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => setLabId(l.id)}
              aria-pressed={on}
              className={cn(
                "flex cursor-pointer items-center gap-3.25 rounded-lg border-[1.5px] px-4.5 py-4 text-left transition-colors",
                on ? "border-sage-900 bg-sage-900" : "border-border bg-card",
              )}
            >
              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-md",
                  on ? "bg-white/14" : "bg-teal-50",
                )}
              >
                <Icon
                  name={l.icon}
                  className={cn("size-5", on ? "text-teal-200" : "text-teal-500")}
                />
              </span>
              <span className="grid gap-0.75">
                <span
                  className={cn("font-bold tracking-[-0.02em]", on ? "text-white" : "text-strong")}
                >
                  {l.name}
                </span>
                <span
                  className={cn(
                    "text-[13px] font-medium",
                    on ? "text-white/70" : "text-muted-foreground",
                  )}
                >
                  {l.room}
                </span>
              </span>
            </button>
          );
        })}
        <div
          className="mt-1.5 grid gap-3.5 rounded-lg border bg-card p-4.5 shadow-sm"
          aria-live="polite"
        >
          {lab.stats.map(([n, l]) => (
            <div key={l} className="grid gap-0.5">
              <span className="font-mono text-[19px] font-bold text-strong">{n}</span>
              <span className="text-[13px] font-medium text-muted-foreground">{l}</span>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full" onClick={() => resetRef.current?.()}>
          <RotateCcw />
          Reset the view
        </Button>
      </div>

      <div>
        <LabViewer lab={lab.id} resetRef={resetRef} />
        <div className="mt-5 rounded-xl border bg-card px-6.5 py-6 shadow-sm" aria-live="polite">
          <h2 className="mb-2 text-2xl font-extrabold tracking-[-0.03em] text-strong">
            {lab.name}
          </h2>
          <p className="max-w-190 text-[16.5px] leading-relaxed text-pretty text-muted-foreground">
            {lab.blurb}
          </p>
          <dl className="mt-4 grid gap-2 border-t pt-4">
            {lab.hotspots.map((h, i) => (
              <div key={h.t} className="text-sm leading-normal">
                <dt className="inline font-bold text-strong">
                  {i + 1}. {h.t} —{" "}
                </dt>
                <dd className="inline text-muted-foreground">{h.b}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
