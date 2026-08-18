"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navIcons } from "@/components/layout/nav-icons";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="ml-auto flex items-center gap-1">
      {site.nav.map(({ label, href }) => {
        const Icon = navIcons[href];
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "group inline-flex items-center gap-1.75 rounded-md px-3.5 py-2.5 text-[15px] font-semibold tracking-[-0.01em] transition-colors",
              active
                ? "bg-accent text-brand-ink"
                : "text-foreground hover:bg-accent hover:text-brand-ink",
            )}
          >
            {Icon && (
              <Icon
                aria-hidden
                className={cn(
                  "size-4",
                  active ? "text-brand-ink" : "text-subtle group-hover:text-brand-ink",
                )}
              />
            )}
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
