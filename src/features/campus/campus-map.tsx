"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/icon";
import { mapPins } from "@/content/map-pins";
import { useParamState } from "@/lib/use-param-state";
import { cn } from "@/lib/utils";

export function CampusMap() {
  const [pinParam, setPin] = useParamState("pin", "1");
  const pin = mapPins.find((p) => p.n === Number(pinParam)) ?? mapPins[0];

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_330px]">
      <div className="relative aspect-10/7 w-full overflow-hidden rounded-2xl border bg-linear-160 from-green-50 to-teal-50 lg:aspect-auto lg:h-140">
        <Image
          src="/img/ir-map.png"
          alt="Schematic site plan of the campus, with numbered pins marking each landmark"
          fill
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0">
          {mapPins.map((m) => (
            <button
              key={m.n}
              type="button"
              aria-label={`Pin ${m.n}: ${m.name}`}
              aria-pressed={m.n === pin.n}
              onClick={() => setPin(String(m.n))}
              className={cn(
                "pointer-events-auto absolute grid size-7 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-2 border-white text-white shadow-lg transition-transform hover:scale-[1.16] sm:size-9",
                m.n === pin.n ? "bg-clay-500" : "bg-sage-600",
              )}
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
            >
              <Icon name={m.icon} className="size-4" />
            </button>
          ))}
        </div>
        <div
          aria-live="polite"
          className="absolute inset-x-3 bottom-3 rounded-xl bg-white/94 px-4 py-3.5 shadow-xl backdrop-blur-sm sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-87.5 sm:px-5 sm:py-4"
        >
          <Badge>
            <MapPin />
            Pin {pin.n}
          </Badge>
          <h3 className="mt-2.25 mb-1.25 text-[19px] font-extrabold tracking-tight text-strong">
            {pin.name}
          </h3>
          <p className="text-sm leading-normal text-muted-foreground">{pin.body}</p>
        </div>
      </div>
      <div className="grid gap-2">
        {mapPins.map((m) => (
          <button
            key={m.n}
            type="button"
            onClick={() => setPin(String(m.n))}
            aria-pressed={m.n === pin.n}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-md border-[1.5px] px-3.5 py-3 text-left transition-colors hover:border-sage-500",
              m.n === pin.n ? "border-sage-500 bg-sage-100" : "border-border bg-card",
            )}
          >
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-full text-white",
                m.n === pin.n ? "bg-clay-500" : "bg-sage-600",
              )}
            >
              <Icon name={m.icon} className="size-3.5" />
            </span>
            <span className="text-[14.5px] font-semibold text-strong">{m.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
