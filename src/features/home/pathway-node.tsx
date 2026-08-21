import { Check } from "lucide-react";

import type { Level } from "@/content/levels";
import { cn } from "@/lib/utils";

/** One pathway stepper node: done (clay + check) / now (sage + glow) /
 * next (dashed). Shared by the horizontal and vertical stepper layouts. */
export function PathwayNode({
  level,
  active,
  done,
  onSelect,
}: {
  level: Level;
  active: boolean;
  done: boolean;
  onSelect: () => void;
}) {
  const mark = level.id[0] + level.id.slice(-1);
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`${level.label} — ${level.sub}`}
      className={cn(
        "relative z-2 grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-[13px] font-extrabold transition-transform hover:scale-110",
        done && "border-2 border-clay-500 bg-clay-500 text-white",
        active && "border-2 border-sage-500 bg-sage-200 text-sage-900 shadow-brand",
        !done && !active && "border-2 border-dashed border-input bg-card text-subtle",
      )}
    >
      {done ? <Check aria-hidden className="size-5" /> : mark}
    </button>
  );
}
