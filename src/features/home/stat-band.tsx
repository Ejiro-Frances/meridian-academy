import { Icon } from "@/components/icon";
import { heroStats } from "@/content/home";

export function StatBand() {
  return (
    <section className="border-b bg-card">
      <div className="mx-auto grid w-full max-w-310 grid-cols-4 px-7">
        {heroStats.map((s) => (
          <div
            key={s.l}
            className="grid gap-1.5 border-r border-slate-100 px-6.5 py-7 last:border-r-0"
          >
            <Icon name={s.icon} className="size-5 text-teal-500" />
            <span className="font-mono text-3xl font-bold tracking-[-0.03em] text-strong">
              {s.n}
            </span>
            <span className="text-sm font-medium text-muted-foreground">{s.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
