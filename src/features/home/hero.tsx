import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, LayoutGrid, Sprout, UsersRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-155 from-sage-900 via-sage-700 via-62% to-teal-900 text-white">
      <div className="pointer-events-none absolute -top-45 -right-35 size-155 rounded-full bg-[radial-gradient(circle,rgba(14,149,151,.55),rgba(14,149,151,0)_68%)]" />
      <div className="pointer-events-none absolute -bottom-55 -left-30 size-130 rounded-full bg-[radial-gradient(circle,rgba(196,87,58,.26),rgba(196,87,58,0)_70%)]" />
      <div className="relative mx-auto grid w-full max-w-310 grid-cols-[1.05fr_0.95fr] items-center gap-15 px-7 pt-21 pb-23">
        <div>
          <Badge className="bg-sage-100 text-leaf-600">
            <Sprout />
            {hero.badge}
          </Badge>
          <h1 className="mt-5.5 text-[62px] leading-[1.02] font-extrabold tracking-[-0.035em] text-pretty">
            {hero.headline[0]}
            <br />
            {hero.headline[1]}
          </h1>
          <p className="mt-5.5 max-w-125 text-[19px] leading-[1.58] text-pretty text-white/80">
            {hero.lede}
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button asChild className="h-13 px-6.5 text-[17px] font-semibold">
              <Link href="/campus">
                <Box className="size-5" />
                Walk the laboratories in 3D
                <ArrowRight className="size-5" />
              </Link>
            </Button>
            <Link
              href="/academics"
              className="inline-flex h-13 items-center gap-2.5 rounded-lg border-[1.5px] border-white/40 bg-white/5 px-6.5 text-[17px] font-semibold transition-colors hover:bg-white/15"
            >
              <LayoutGrid aria-hidden className="size-5" />
              See every class arm
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="relative h-107.5 overflow-hidden rounded-2xl border border-white/15 shadow-xl">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-lg bg-card px-4.5 py-3.5 shadow-lg">
            <span className="grid size-10 place-items-center rounded-full bg-sage-100">
              <UsersRound aria-hidden className="size-5 text-brand-ink" />
            </span>
            <span className="grid gap-0.5">
              <span className="font-mono text-[22px] leading-none font-bold tracking-[-0.02em] text-brand-ink">
                {hero.ratio.figure}
              </span>
              <span className="text-xs font-medium text-muted-foreground">{hero.ratio.label}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
