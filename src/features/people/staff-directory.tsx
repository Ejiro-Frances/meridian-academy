"use client";

import { useState } from "react";
import { BookOpen, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/icon";
import { staffFor } from "@/features/people/roster";
import { staffRooms, type StaffRoomId } from "@/content/staff";
import { useParamState } from "@/lib/use-param-state";
import { cn } from "@/lib/utils";

function initials(name: string): string {
  const parts = name.split(" ").filter((p) => !/^(Mr|Mrs|Dr)$/.test(p));
  return (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "");
}

export function StaffDirectory() {
  const [roomId, setRoomId] = useParamState("room", "iroko");
  const [query, setQuery] = useState("");

  const room = staffRooms.find((r) => r.id === roomId) ?? staffRooms[0];
  const all = staffFor(room.id as StaffRoomId);
  const q = query.trim().toLowerCase();
  const filtered = q
    ? all.filter((t) => `${t.name} ${t.subject} ${t.duty}`.toLowerCase().includes(q))
    : all;
  const shown = filtered.slice(0, 18);

  return (
    <div>
      <div className="mb-6.5 grid grid-cols-3 gap-3.5">
        {staffRooms.map((r) => {
          const on = r.id === room.id;
          return (
            <button
              key={r.id}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setRoomId(r.id);
                setQuery("");
              }}
              className={cn(
                "grid cursor-pointer gap-1.75 rounded-xl border-[1.5px] px-6 py-5.5 text-left transition-[colors,transform] hover:-translate-y-0.5",
                on ? "border-sage-900 bg-sage-900 shadow-lg" : "border-border bg-card shadow-xs",
              )}
            >
              <span
                className={cn(
                  "inline-flex items-center gap-2.25 text-[19px] font-extrabold tracking-tight",
                  on ? "text-white" : "text-strong",
                )}
              >
                <Icon
                  name={r.icon}
                  className={cn("size-5", on ? "text-clay-200" : "text-brand-ink")}
                />
                {r.name}
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  on ? "text-white/66" : "text-muted-foreground",
                )}
              >
                {r.where}
              </span>
              <span className="mt-1.5 flex gap-4.5">
                {[
                  [r.count, "staff"],
                  [r.arms, "arms served"],
                ].map(([n, l]) => (
                  <span key={l} className="grid">
                    <span
                      className={cn(
                        "font-mono text-[17px] font-bold",
                        on ? "text-clay-200" : "text-brand-ink",
                      )}
                    >
                      {n}
                    </span>
                    <span
                      className={cn(
                        "text-[11px] font-semibold tracking-widest uppercase",
                        on ? "text-white/66" : "text-muted-foreground",
                      )}
                    >
                      {l}
                    </span>
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="flex flex-wrap items-center gap-4.5 border-b border-slate-100 px-6.5 py-5.5">
          <div className="grid gap-0.75">
            <span className="text-[17px] font-extrabold tracking-tight text-strong">
              {room.name}
            </span>
            <span className="text-[13.5px] text-muted-foreground">
              Coordinated by {room.coordinator} · {room.where}
            </span>
          </div>
          <div className="relative ml-auto w-75">
            <Search
              aria-hidden
              className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a name or subject"
              aria-label="Search staff by name or subject"
              className="h-11 pl-9"
            />
          </div>
        </div>
        <div className="grid grid-cols-3" aria-live="polite">
          {shown.map((t) => (
            <div
              key={t.name + t.subject}
              className="flex items-center gap-3.25 border-r border-b border-slate-100 px-5.5 py-4.5"
            >
              <Avatar className="size-10">
                <AvatarFallback>{initials(t.name)}</AvatarFallback>
              </Avatar>
              <span className="grid min-w-0 gap-0.75">
                <span className="truncate text-[15px] font-bold text-strong">{t.name}</span>
                <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-muted-foreground">
                  <BookOpen aria-hidden className="size-3.5 shrink-0 text-subtle" />
                  {t.subject} · {t.duty}
                </span>
              </span>
            </div>
          ))}
        </div>
        <div className="px-6.5 py-4 text-[13.5px] font-medium text-subtle">
          {q
            ? `${filtered.length} of ${all.length} matching “${query.trim()}”`
            : `Showing ${shown.length} of ${all.length} staff in this room — search to narrow it down.`}
        </div>
      </div>
    </div>
  );
}
