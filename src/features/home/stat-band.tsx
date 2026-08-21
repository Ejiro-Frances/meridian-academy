import { Icon } from "@/components/icon";
import { heroStats } from "@/content/home";

export function StatBand() {
  return (
    <section className="border-b bg-card">
      <div className="mx-auto grid w-full max-w-310 grid-cols-2 px-4 sm:px-7 lg:grid-cols-4">
        {heroStats.map((s) => (
          <div
            key={s.l}
            className="grid gap-1.5 border-r border-b border-slate-100 px-4 py-5 nth-last-[-n+2]:border-b-0 even:border-r-0 sm:px-6.5 sm:py-7 lg:border-b-0 lg:even:border-r lg:last:border-r-0"
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
