"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Layers, MousePointerClick } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { RoomDetail } from "@/features/campus/room-detail";
import { floorPlans, planById, type PlanRoom } from "@/content/plans";
import { cn } from "@/lib/utils";

const kindStyles: Record<PlanRoom["kind"], { box: string; code: string; icon: string }> = {
  class: { box: "bg-green-50 border-green-200", code: "text-green-700", icon: "door-open" },
  lab: { box: "bg-teal-50 border-teal-200", code: "text-teal-700", icon: "flask-conical" },
  staff: { box: "bg-gold-50 border-gold-200", code: "text-gold-700", icon: "coffee" },
  other: { box: "bg-slate-100 border-slate-300", code: "text-muted-foreground", icon: "package" },
};

const legend = [
  { c: "text-brand-ink", icon: "door-open", l: "Classroom" },
  { c: "text-teal-500", icon: "flask-conical", l: "Laboratory / ICT" },
  { c: "text-clay-500", icon: "coffee", l: "Staff room" },
  { c: "text-muted-foreground", icon: "package", l: "Support space" },
];

export function FloorPlanExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const plan = planById(searchParams.get("floor") ?? "bg");
  const roomCode = searchParams.get("room") ?? plan.rooms[0].code;
  const room = plan.rooms.find((r) => r.code === roomCode) ?? plan.rooms[0];

  const update = (patch: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    for (const [k, v] of Object.entries(patch)) params.set(k, v);
    router.replace(`${pathname}?${params}`, { scroll: false });
  };

  return (
    <div>
      <div className="mb-5.5 flex flex-wrap gap-2">
        {floorPlans.map((p) => (
          <Button
            key={p.id}
            size="sm"
            variant={p.id === plan.id ? "default" : "ghost"}
            onClick={() => update({ floor: p.id, room: planById(p.id).rooms[0].code })}
          >
            <Layers />
            {p.label}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_344px] items-start gap-6">
        <div className="rounded-2xl border bg-card p-6.5 shadow-sm">
          <div className="mb-4.5 flex items-center justify-between">
            <span className="text-[19px] font-extrabold tracking-tight text-strong">
              {plan.label}
            </span>
            <span className="inline-flex items-center gap-1.75 text-xs font-semibold tracking-widest uppercase text-subtle">
              <MousePointerClick aria-hidden className="size-3.5" />
              Click any room
            </span>
          </div>
          <div className="relative h-107.5 w-full rounded-md border-2 border-input bg-background">
            {plan.rooms.map((r) => {
              const on = r.code === room.code;
              const s = kindStyles[r.kind];
              return (
                <button
                  key={r.code}
                  type="button"
                  aria-label={`${r.code} — ${r.name}`}
                  aria-pressed={on}
                  onClick={() => update({ room: r.code })}
                  className={cn(
                    "absolute grid cursor-pointer content-start gap-1 overflow-hidden rounded-lg border-[1.5px] p-2 text-left transition-[colors,transform] hover:scale-[1.02]",
                    on ? "border-sage-600 bg-card" : s.box,
                  )}
                  style={{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%` }}
                >
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.25 font-mono text-[11px] font-bold",
                      s.code,
                    )}
                  >
                    <Icon name={s.icon} className="size-3.5" />
                    {r.code}
                  </span>
                  <span className="text-[12.5px] leading-tight font-semibold tracking-[-0.01em] text-strong">
                    {r.name}
                  </span>
                </button>
              );
            })}
            <div className="absolute inset-x-0 bottom-0 grid h-8.5 place-items-center rounded-b-md border-t-[1.5px] border-dashed border-input bg-[repeating-linear-gradient(90deg,var(--color-slate-200)_0_14px,var(--background)_14px_28px)]">
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-subtle">
                Corridor · {plan.corridor}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-5">
            {legend.map((k) => (
              <span
                key={k.l}
                className="inline-flex items-center gap-1.75 text-[13px] font-medium text-muted-foreground"
              >
                <Icon name={k.icon} className={cn("size-4", k.c)} />
                {k.l}
              </span>
            ))}
          </div>
        </div>
        <RoomDetail plan={plan} room={room} />
      </div>
    </div>
  );
}
