import { Badge } from "@/components/ui/badge";
import { armsForLevel, type Level } from "@/content/levels";

export function YearCard({ level }: { level: Level }) {
  return (
    <div
      aria-live="polite"
      className="mt-8.5 overflow-hidden rounded-xl border border-t-[3px] border-t-primary bg-card shadow-sm"
    >
      <div className="grid grid-cols-[1.1fr_1fr] gap-10 px-8 py-7.5">
        <div>
          <h3 className="mb-2 text-[26px] font-extrabold tracking-[-0.03em] text-strong">
            {level.label} — {level.sub.toLowerCase()}
          </h3>
          <p className="mb-5 text-[16.5px] leading-relaxed text-pretty text-muted-foreground">
            {level.blurb}
          </p>
          <div className="flex flex-wrap gap-2">
            {level.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>
        <div className="grid content-start gap-2.5">
          {armsForLevel(level.id).map((a) => (
            <div
              key={a.code}
              className="flex items-center gap-3.5 rounded-md border border-slate-100 bg-background px-3.5 py-3"
            >
              <span className="min-w-21 font-mono text-[12.5px] font-bold text-teal-500">
                {a.code}
              </span>
              <span className="flex-1 text-sm font-medium">{a.form}</span>
              <span className="font-mono text-[12.5px] text-muted-foreground">
                {a.size} students
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
