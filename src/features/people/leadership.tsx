import Image from "next/image";
import { Mail } from "lucide-react";

import { Icon } from "@/components/icon";
import { leaders } from "@/content/leadership";

export function Leadership() {
  return (
    <section className="bg-linear-155 from-sage-900 via-sage-700 via-70% to-teal-900 text-white">
      <div className="mx-auto w-full max-w-310 px-7 pt-14.5 pb-16.5">
        <p className="text-[13px] font-bold tracking-[0.12em] uppercase text-clay-200">People</p>
        <h1 className="mt-3 mb-2.5 text-[46px] font-extrabold tracking-[-0.035em]">
          Who runs the school
        </h1>
        <p className="mb-10 max-w-165 text-lg leading-relaxed text-white/80">
          A principal, two vice principals and sixty-four teaching staff across three staff rooms.
          Every one of them is reachable in a school week.
        </p>
        <div className="grid grid-cols-3 gap-5">
          {leaders.map((p) => (
            <div
              key={p.name}
              className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm"
            >
              <div className="relative h-53.5">
                <Image src={p.img} alt={p.alt} fill className="object-cover" />
              </div>
              <div className="px-5.5 pt-5.5 pb-6">
                <span
                  className="inline-flex items-center gap-1.75 text-xs font-bold tracking-[0.14em] uppercase"
                  style={{ color: p.hue }}
                >
                  <Icon name={p.icon} className="size-3.5" />
                  {p.role}
                </span>
                <h3 className="mt-2.25 mb-1.5 text-[21px] font-extrabold tracking-tight">
                  {p.name}
                </h3>
                <p className="mb-3.5 text-[14.5px] leading-normal text-white/75">{p.bio}</p>
                <span className="inline-flex items-center gap-2 font-mono text-xs text-teal-200">
                  <Mail aria-hidden className="size-3.5" />
                  {p.contact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
