import type { Metadata } from "next";
import { Suspense } from "react";

import { ArmsExplorer } from "@/features/academics/arms-explorer";
import { Clubs } from "@/features/academics/clubs";

export const metadata: Metadata = { title: "Academics" };

export default function AcademicsPage() {
  return (
    <main className="mx-auto w-full max-w-310 flex-1 px-7 pt-13.5 pb-22.5">
      <p className="text-[13px] font-bold tracking-[0.12em] uppercase text-secondary">Academics</p>
      <h1 className="mt-3 mb-2 text-[46px] font-extrabold tracking-[-0.035em] text-strong">
        Twenty-two arms. Forty-four form teachers. Every name here.
      </h1>
      <p className="max-w-175 text-lg leading-relaxed text-pretty text-muted-foreground">
        Junior school runs a common core; senior school splits into Science, Arts and Commercial
        from SS 1. No arm goes above 31 students, and each one has a form teacher and an assistant
        who stay with it for the year.
      </p>
      <Suspense>
        <ArmsExplorer />
      </Suspense>
      <Clubs />
    </main>
  );
}
