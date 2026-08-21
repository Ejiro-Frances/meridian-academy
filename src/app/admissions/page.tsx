import type { Metadata } from "next";

import { AdmissionStepsRow } from "@/features/admissions/steps";
import { BookingCard } from "@/features/admissions/booking-card";
import { ContactCard } from "@/features/admissions/contact-card";
import { FeeCalculator } from "@/features/admissions/fee-calculator";

export const metadata: Metadata = { title: "Admissions" };

export default function AdmissionsPage() {
  return (
    <main className="mx-auto w-full max-w-310 flex-1 px-4 pt-8 pb-14 sm:px-7 lg:pt-13.5 lg:pb-22.5">
      <p className="text-[13px] font-bold tracking-[0.12em] uppercase text-secondary">Admissions</p>
      <h1 className="mt-3 mb-2 text-4xl font-extrabold lg:text-[46px] tracking-[-0.035em] text-strong">
        Five steps, and we tell you the cost up front
      </h1>
      <p className="max-w-175 text-lg leading-relaxed text-pretty text-muted-foreground">
        Entry into JSS 1 and SS 1 is by assessment each February. Mid-year transfers are considered
        where an arm has space — currently three of twenty-two do.
      </p>
      <AdmissionStepsRow />
      <div className="grid grid-cols-1 items-start gap-6.5 lg:grid-cols-[1.15fr_1fr]">
        <FeeCalculator />
        <div className="grid gap-5">
          <BookingCard />
          <ContactCard />
        </div>
      </div>
    </main>
  );
}
