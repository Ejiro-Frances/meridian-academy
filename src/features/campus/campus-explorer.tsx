"use client";

import { Icon } from "@/components/icon";
import { CampusMap } from "@/features/campus/campus-map";
import { FloorPlanExplorer } from "@/features/campus/floor-plan";
import { LabsPanel } from "@/features/campus/labs-panel";
import { useParamState } from "@/lib/use-param-state";
import { cn } from "@/lib/utils";

const tabs = [
  { value: "labs", label: "3D laboratories", icon: "box", count: 3 },
  { value: "plan", label: "Classroom floor plans", icon: "layers", count: 5 },
  { value: "map", label: "Campus map", icon: "map-pinned", count: 9 },
] as const;

export function CampusExplorer() {
  const [tab, setTab] = useParamState("tab", "labs");

  return (
    <div>
      <div role="tablist" aria-label="Campus tour sections" className="flex gap-1 border-b">
        {tabs.map((t) => {
          const on = t.value === tab;
          return (
            <button
              key={t.value}
              role="tab"
              aria-selected={on}
              type="button"
              onClick={() => setTab(t.value)}
              className={cn(
                "-mb-px inline-flex cursor-pointer items-center gap-2 border-b-2 px-3.5 py-3 text-[15px] font-semibold transition-colors",
                on
                  ? "border-sage-700 text-sage-700"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon name={t.icon} className="size-4" />
              {t.label}
              <span
                className={cn(
                  "rounded-full px-1.5 font-mono text-xs font-bold",
                  on ? "bg-sage-100 text-sage-700" : "bg-muted text-muted-foreground",
                )}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>
      <div className="h-7" />
      {tab === "labs" && <LabsPanel />}
      {tab === "plan" && <FloorPlanExplorer />}
      {tab === "map" && <CampusMap />}
    </div>
  );
}
