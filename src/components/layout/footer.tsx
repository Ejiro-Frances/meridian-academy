import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { navIcons } from "@/components/layout/nav-icons";
import { site } from "@/content/site";

function FooterEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-slate-400">{children}</p>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto w-full max-w-310 px-7 pt-13 pb-10">
        <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-11">
          <div className="space-y-4">
            <Logo compact onDark />
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">{site.positioning}</p>
          </div>
          <div className="space-y-3">
            <FooterEyebrow>Explore</FooterEyebrow>
            <nav className="grid justify-items-start gap-1">
              {site.nav.map(({ label, href }) => {
                const Icon = navIcons[href];
                return (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex items-center gap-2 rounded-md py-1 text-sm font-medium transition-colors hover:text-white"
                  >
                    {Icon && <Icon aria-hidden className="size-4 text-slate-500" />}
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="space-y-3">
            <FooterEyebrow>Visit</FooterEyebrow>
            <p className="flex items-start gap-2 text-sm leading-relaxed">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-slate-500" />
              {site.visit.address}
            </p>
            <p className="flex items-center gap-2 font-mono text-sm text-sage-200">
              <Phone aria-hidden className="size-4 shrink-0 text-slate-500" />
              {site.visit.phone}
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-[13px] text-slate-500">
          © {new Date().getFullYear()} {site.name.first} {site.name.second}. {site.imageNote}
        </p>
      </div>
    </footer>
  );
}
