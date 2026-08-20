import Link from "next/link";

import { site } from "@/content/site";
import { cn } from "@/lib/utils";

// The asymmetric corner radius is the design system's "pathway marker" shape —
// intentional, keep the 3px corner.
export function Logo({ compact = false, onDark = false }: { compact?: boolean; onDark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-[12px_12px_12px_3px] bg-linear-150 from-clay-500 to-clay-700 font-extrabold tracking-[-0.02em] text-white shadow-sm",
          compact ? "size-9 text-sm" : "size-10.5 text-base",
        )}
      >
        {site.name.monogram}
      </span>
      <span className="grid gap-0.5">
        <span
          className={cn(
            "text-[17px] leading-[1.1] font-extrabold tracking-[-0.03em] whitespace-nowrap",
            onDark ? "text-white" : "text-strong",
          )}
        >
          {site.name.first}{" "}
          <span className={onDark ? "text-sage-200" : "text-brand-ink"}>{site.name.second}</span>
        </span>
        <span
          className={cn(
            "text-[10px] font-medium tracking-[0.14em] uppercase",
            onDark ? "text-slate-400" : "text-subtle",
          )}
        >
          {site.locationLine}
        </span>
      </span>
    </Link>
  );
}
