"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { navIcons } from "@/components/layout/nav-icons";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="grid size-10 cursor-pointer place-items-center rounded-md transition-colors hover:bg-accent hover:text-brand-ink"
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-full border-b bg-card shadow-lg">
          <div className="mx-auto grid w-full max-w-310 gap-1 px-4 py-3">
            {site.nav.map(({ label, href }) => {
              const Icon = navIcons[href];
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-3 text-[15px] font-semibold transition-colors",
                    active
                      ? "bg-accent text-brand-ink"
                      : "text-foreground hover:bg-accent hover:text-brand-ink",
                  )}
                >
                  {Icon && (
                    <Icon
                      aria-hidden
                      className={cn("size-4", active ? "text-brand-ink" : "text-subtle")}
                    />
                  )}
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
