import Link from "next/link";
import { CalendarCheck } from "lucide-react";

import { Icon } from "@/components/icon";
import { termDiary } from "@/content/home";

export function TermDiary() {
  return (
    <section className="bg-teal-900 text-white">
      <div className="mx-auto grid w-full max-w-310 grid-cols-1 items-center gap-10 px-4 py-12 sm:px-7 lg:grid-cols-[1fr_1.15fr] lg:gap-14 lg:py-18.5">
        <div>
          <p className="text-[13px] font-bold tracking-[0.12em] uppercase text-teal-200">
            {termDiary.eyebrow}
          </p>
          <h2 className="mt-3.5 mb-3 text-3xl font-extrabold tracking-[-0.03em] lg:text-[38px]">
            {termDiary.heading}
          </h2>
          <p className="mb-6.5 text-[17.5px] leading-relaxed text-white/78">{termDiary.lede}</p>
          <Link
            href="/admissions"
            className="inline-flex h-12 items-center gap-2 rounded-lg border-[1.5px] border-white/40 px-6 font-semibold transition-colors hover:bg-white/15"
          >
            <CalendarCheck aria-hidden className="size-5" />
            {termDiary.cta}
          </Link>
        </div>
        <div className="grid gap-3">
          {termDiary.events.map((e) => (
            <div
              key={e.t}
              className="flex items-center gap-5 rounded-lg border border-white/13 bg-white/5 px-5.5 py-4.5 transition-colors hover:bg-white/10"
            >
              <div className="grid min-w-13.5 justify-items-center">
                <span className="font-mono text-[22px] font-bold text-clay-200">{e.d}</span>
                <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/60">
                  {e.m}
                </span>
              </div>
              <div className="w-px self-stretch bg-white/15" />
              <div className="grid gap-1">
                <span className="inline-flex items-center gap-2 text-[16.5px] font-bold tracking-[-0.02em]">
                  <Icon name={e.icon} className="size-4 text-teal-200" />
                  {e.t}
                </span>
                <span className="text-sm text-white/70">{e.b}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
