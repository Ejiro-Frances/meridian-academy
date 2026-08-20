import type { Metadata } from "next";

export const metadata: Metadata = { title: "Campus tour" };

export default function CampusPage() {
  return (
    <main className="mx-auto w-full max-w-310 flex-1 px-7 py-14">
      <p className="text-[13px] font-bold tracking-[0.12em] uppercase text-secondary">
        Campus tour
      </p>
      <h1 className="mt-2 max-w-3xl text-5xl font-extrabold tracking-[-0.035em] text-strong">
        Look inside before you visit.
      </h1>
      <p className="mt-4 font-mono text-sm text-subtle">Page under construction.</p>
    </main>
  );
}
