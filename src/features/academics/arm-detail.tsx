import Link from "next/link";
import { ArrowRight, BookOpen, Clock, DoorOpen } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { Arm } from "@/content/levels";
import { floorPlans } from "@/content/plans";
import { streamKeyFor, subjectsFor, wednesday } from "@/content/subjects";
import { honorific } from "@/lib/hash";
import { cn } from "@/lib/utils";

function initials(name: string): string {
  const parts = name.split(" ").filter((p) => !/^(Mr|Mrs|Dr)$/.test(p));
  return (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "");
}

export function ArmDetail({ arm }: { arm: Arm }) {
  const staff = [
    { name: honorific(arm.form), role: "Form teacher", subject: arm.formSubject },
    { name: honorific(arm.assist), role: "Assistant form teacher", subject: arm.assistSubject },
  ];
  const day = wednesday[streamKeyFor(arm.code)];
  const floor = floorPlans.find((p) => p.rooms.some((r) => r.code === arm.room));

  return (
    <div
      aria-live="polite"
      className="overflow-hidden rounded-2xl border bg-card shadow-lg lg:sticky lg:top-23"
    >
      <div className="bg-linear-150 from-sage-900 to-sage-700 px-6.5 pt-6.5 pb-6 text-white">
        <p className="text-xs font-bold tracking-[0.14em] uppercase text-clay-200">
          {arm.stream} · {arm.sub}
        </p>
        <h2 className="mt-2 mb-1.5 text-[30px] font-extrabold tracking-[-0.03em]">{arm.code}</h2>
        <span className="inline-flex items-center gap-2 text-sm text-white/80">
          <DoorOpen aria-hidden className="size-4 text-sage-200" />
          {arm.room} · {arm.size} students
        </span>
      </div>
      <div className="grid gap-5.5 px-6.5 pt-6 pb-7">
        <div className="grid gap-3">
          {staff.map((s) => (
            <div key={s.role} className="flex items-center gap-3.25">
              <Avatar className="size-10">
                <AvatarFallback>{initials(s.name)}</AvatarFallback>
              </Avatar>
              <span className="grid gap-0.5">
                <span className="text-[15px] font-bold text-strong">{s.name}</span>
                <span className="text-[13px] font-medium text-muted-foreground">
                  {s.role} · {s.subject}
                </span>
              </span>
            </div>
          ))}
        </div>
        <div className="h-px bg-slate-100" />
        <div>
          <span className="inline-flex items-center gap-1.75 text-xs font-bold tracking-[0.14em] uppercase text-subtle">
            <BookOpen aria-hidden className="size-3.5" />
            Subjects this year
          </span>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {subjectsFor(arm.code).map((s) => (
              <Badge key={s} variant="outline">
                {s}
              </Badge>
            ))}
          </div>
        </div>
        <div className="h-px bg-slate-100" />
        <div>
          <span className="inline-flex items-center gap-1.75 text-xs font-bold tracking-[0.14em] uppercase text-subtle">
            <Clock aria-hidden className="size-3.5" />A Wednesday in {arm.code}
          </span>
          <div className="mt-3 grid gap-1.75">
            {day.map(([t, s]) => (
              <div key={t} className="flex items-baseline gap-3.5">
                <span className="min-w-15.5 font-mono text-[12.5px] text-teal-500">{t}</span>
                <span className="text-sm font-medium">{s}</span>
              </div>
            ))}
          </div>
        </div>
        <Link
          href={`/campus?tab=plan${floor ? `&floor=${floor.id}` : ""}&room=${arm.room}`}
          className={cn(buttonVariants({ variant: "ghost" }), "w-full")}
        >
          Find {arm.room} on the floor plan
          <ArrowRight aria-hidden />
        </Link>
      </div>
    </div>
  );
}
