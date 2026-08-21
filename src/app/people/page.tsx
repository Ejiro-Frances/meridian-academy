import type { Metadata } from "next";
import { Suspense } from "react";

import { Leadership } from "@/features/people/leadership";
import { StaffDirectory } from "@/features/people/staff-directory";

export const metadata: Metadata = { title: "People" };

export default function PeoplePage() {
  return (
    <main className="flex-1">
      <Leadership />
      <section className="mx-auto w-full max-w-310 px-4 pt-10 pb-14 sm:px-7 lg:pt-15.5 lg:pb-22.5">
        <h2 className="mb-2 text-3xl font-extrabold lg:text-[34px] tracking-[-0.03em] text-strong">
          Three staff rooms
        </h2>
        <p className="mb-6.5 text-[17.5px] text-muted-foreground">
          Junior, senior and science. Pick a room, then search for a teacher or a subject.
        </p>
        <Suspense>
          <StaffDirectory />
        </Suspense>
      </section>
    </main>
  );
}
