import { Hero } from "@/features/home/hero";
import { Pathway } from "@/features/home/pathway";
import { Pillars } from "@/features/home/pillars";
import { StatBand } from "@/features/home/stat-band";
import { TermDiary } from "@/features/home/term-diary";

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />
      <StatBand />
      <section className="mx-auto w-full max-w-310 px-7 pt-19.5 pb-2.5">
        <p className="text-[13px] font-bold tracking-[0.12em] uppercase text-secondary">
          The six-year climb
        </p>
        <h2 className="mt-3 mb-1.5 text-[40px] font-extrabold tracking-[-0.03em] text-strong">
          One pathway, six years, no guessing
        </h2>
        <p className="max-w-165 text-lg leading-relaxed text-muted-foreground">
          Tap a year to see what changes — the arms, the streams and the exams that close it out.
        </p>
        <Pathway />
      </section>
      <Pillars />
      <TermDiary />
    </main>
  );
}
