import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Icon } from "@/components/icon";
import { pillars } from "@/content/home";

const hues = ["text-teal-500", "text-brand-ink", "text-clay-500"];

export function Pillars() {
  return (
    <section className="mx-auto w-full max-w-310 px-7 py-19">
      <div className="grid grid-cols-3 gap-6">
        {pillars.map((p, i) => (
          <Link
            key={p.title}
            href={p.href}
            className="block rounded-xl border bg-card p-6 shadow-sm transition-[transform,box-shadow] hover:-translate-y-[3px] hover:shadow-md"
          >
            <div className="relative mb-5 h-44 overflow-hidden rounded-lg">
              <Image src={p.img} alt={p.alt} fill className="object-cover" />
            </div>
            <span className="mb-4 inline-flex size-13 items-center justify-center rounded-lg bg-sage-50">
              <Icon name={p.icon} className={`size-6.5 ${hues[i]}`} />
            </span>
            <h3 className="text-[21px] font-bold tracking-tight text-strong">{p.title}</h3>
            <p className="mt-2 mb-4 leading-normal text-pretty text-muted-foreground">{p.body}</p>
            <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand-ink">
              {p.cta}
              <ArrowRight aria-hidden className="size-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
