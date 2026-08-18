import Link from "next/link";
import { CalendarCheck } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { MainNav } from "@/components/layout/main-nav";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-18.5 w-full max-w-310 items-center px-7">
        <Logo />
        <MainNav />
        <Button asChild className="ml-2.5">
          <Link href={site.cta.href}>
            {site.cta.label}
            <CalendarCheck aria-hidden />
          </Link>
        </Button>
      </div>
    </header>
  );
}
