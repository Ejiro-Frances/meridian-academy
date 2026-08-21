import Image from "next/image";

import { roomToArm } from "@/content/levels";
import { roomNotes, type FloorPlan, type PlanRoom } from "@/content/plans";

const accents: Record<PlanRoom["kind"], string> = {
  lab: "var(--color-teal-500)",
  staff: "var(--color-clay-500)",
  class: "var(--color-brand-ink)",
  other: "var(--input)",
};

export function RoomDetail({ plan, room }: { plan: FloorPlan; room: PlanRoom }) {
  const arm = roomToArm[room.code];
  const facts = arm
    ? [
        { k: "Class arm", v: arm.code },
        { k: "Students", v: String(arm.size) },
        { k: "Form teacher", v: arm.form },
        { k: "Assistant", v: arm.assist },
        { k: "Floor", v: plan.label },
      ]
    : [
        {
          k: "Type",
          v:
            room.kind === "lab"
              ? "Laboratory"
              : room.kind === "staff"
                ? "Staff room"
                : "Support space",
        },
        { k: "Floor", v: plan.label },
        { k: "Access", v: room.kind === "staff" ? "Staff & appointments" : "Timetabled" },
      ];
  const body = arm
    ? `Home room for ${arm.code}. ${arm.size} students, one form teacher and one assistant, on ${plan.label.toLowerCase()}.`
    : room.kind === "class"
      ? ""
      : roomNotes[room.kind];

  return (
    <div
      aria-live="polite"
      className="overflow-hidden rounded-2xl border border-t-[3px] bg-card shadow-lg lg:sticky lg:top-23"
      style={{ borderTopColor: accents[room.kind] }}
    >
      <div className="px-6 pt-6 pb-6.5">
        <span className="font-mono text-xs font-bold tracking-[0.08em] text-teal-500">
          {room.code}
        </span>
        <h3 className="mt-2 mb-1.5 text-2xl font-extrabold tracking-[-0.03em] text-strong">
          {room.name}
        </h3>
        <p className="mb-5 text-[15px] leading-relaxed text-pretty text-muted-foreground">{body}</p>
        <div className="grid gap-2.25">
          {facts.map((f) => (
            <div
              key={f.k}
              className="flex justify-between gap-3 rounded-md bg-background px-3 py-2.5"
            >
              <span className="text-[13px] font-medium text-muted-foreground">{f.k}</span>
              <span className="text-right text-[13px] font-bold text-strong">{f.v}</span>
            </div>
          ))}
        </div>
        <div className="relative mt-4.5 h-32.5 overflow-hidden rounded-md">
          <Image
            src="/img/ir-room.png"
            alt="Illustration of a classroom interior"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
