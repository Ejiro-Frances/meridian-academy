"use client";

import { ArrowRight, BadgeCheck, Check, CalendarCheck, Phone, RotateCcw, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { openDaySlots } from "@/content/fees";
import { bookingReady, useAdmissionsStore } from "@/features/admissions/store";

export function BookingCard() {
  const s = useAdmissionsStore();
  const ready = bookingReady(s.name, s.phone);
  const firstName = s.name.trim().split(" ").pop() || "friend";

  return (
    <div className="overflow-hidden rounded-2xl border border-t-[3px] border-t-secondary bg-card shadow-lg">
      <div className="px-7 pt-7 pb-7.5">
        {s.booked ? (
          <div className="grid animate-in justify-items-start gap-3.5 duration-350 fade-in slide-in-from-bottom-3.5">
            <span className="grid size-13 place-items-center rounded-full bg-green-50">
              <BadgeCheck aria-hidden className="size-7 text-brand-ink" />
            </span>
            <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-strong">
              You&rsquo;re on the list, {firstName}
            </h2>
            <p className="text-[15.5px] leading-relaxed text-muted-foreground">
              We&rsquo;ve held two seats for you on Saturday {s.slot}, 9:00 am at the main gate. The
              admissions office will call {s.phone || "your number"} within two working days to
              confirm.
            </p>
            <Button variant="ghost" onClick={s.resetBooking}>
              <RotateCcw />
              Book another slot
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="mb-1.5 text-2xl font-extrabold tracking-[-0.03em] text-strong">
              Come and see it for yourself
            </h2>
            <p className="mb-5.5 text-[15.5px] leading-normal text-muted-foreground">
              Open mornings run 9:00–11:30. You&rsquo;ll sit in one lesson and meet a form teacher.
            </p>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="booking-name">Parent or guardian name</Label>
                <div className="relative">
                  <User
                    aria-hidden
                    className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle"
                  />
                  <Input
                    id="booking-name"
                    value={s.name}
                    onChange={(e) => s.setName(e.target.value)}
                    placeholder="e.g. Mrs Folake Adeyinka"
                    className="h-11 pl-9"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="booking-phone">Phone</Label>
                <div className="relative">
                  <Phone
                    aria-hidden
                    className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle"
                  />
                  <Input
                    id="booking-phone"
                    type="tel"
                    value={s.phone}
                    onChange={(e) => s.setPhone(e.target.value)}
                    placeholder="0803 000 0000"
                    className="h-11 pl-9"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <span className="text-[13.5px] font-semibold text-strong">Pick a morning</span>
                <div className="flex flex-wrap gap-2">
                  {openDaySlots.map((slot) => (
                    <Button
                      key={slot}
                      size="sm"
                      variant={s.slot === slot ? "default" : "ghost"}
                      onClick={() => s.setSlot(slot)}
                    >
                      {s.slot === slot ? <Check /> : <CalendarCheck />}
                      Sat {slot}
                    </Button>
                  ))}
                </div>
              </div>
              <Button size="lg" className="w-full" disabled={!ready} onClick={s.submit}>
                {ready ? `Reserve my place · ${s.slot}` : "Add your name and phone"}
                <ArrowRight />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
