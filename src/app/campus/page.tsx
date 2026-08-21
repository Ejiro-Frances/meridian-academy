import type { Metadata } from "next";
import { Suspense } from "react";

import { CampusExplorer } from "@/features/campus/campus-explorer";

export const metadata: Metadata = { title: "Campus tour" };

export default function CampusPage() {
  return (
    <main className="mx-auto w-full max-w-310 flex-1 px-4 pt-8 pb-14 sm:px-7 lg:pt-13.5 lg:pb-22.5">
      <p className="text-[13px] font-bold tracking-[0.12em] uppercase text-secondary">
        Campus tour
      </p>
      <h1 className="mt-3 mb-2 text-4xl font-extrabold lg:text-[46px] tracking-[-0.035em] text-strong">
        Look inside before you visit
      </h1>
      <p className="mb-7 max-w-180 text-lg leading-relaxed text-pretty text-muted-foreground">
        Three laboratories rendered in 3D — drag to look around, scroll to zoom, tap a marker. Then
        walk the floor plans to find any classroom, staff room or lab by name.
      </p>
      <Suspense>
        <CampusExplorer />
      </Suspense>
    </main>
  );
}
