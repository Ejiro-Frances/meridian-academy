import Image from "next/image";

import { Icon } from "@/components/icon";
import { clubs } from "@/content/clubs";

export function Clubs() {
  return (
    <div className="mt-19.5">
      <h2 className="mb-2 text-[34px] font-extrabold tracking-[-0.03em] text-strong">
        Beyond the timetable
      </h2>
      <p className="mb-6.5 text-[17.5px] text-muted-foreground">
        Every student joins one club and one house. Wednesdays after 2:10 pm belong to them.
      </p>
      <div className="grid grid-cols-4 gap-4.5">
        {clubs.map((c) => (
          <div key={c.name} className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="relative mb-4 h-37.5 overflow-hidden rounded-md">
              <Image src={c.img} alt={c.alt} fill className="object-cover" />
            </div>
            <span className="inline-flex items-center gap-2 text-[17px] font-bold tracking-[-0.02em] text-strong">
              <Icon name={c.icon} className="size-5 text-teal-500" />
              {c.name}
            </span>
            <p className="mt-2 text-sm leading-normal text-muted-foreground">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
