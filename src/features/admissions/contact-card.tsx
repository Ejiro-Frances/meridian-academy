import { Icon } from "@/components/icon";
import { officeContacts } from "@/content/admissions";

export function ContactCard() {
  return (
    <div className="grid gap-4.5 rounded-2xl bg-teal-900 p-7 text-white">
      <h3 className="text-xl font-extrabold tracking-tight">Reach the office</h3>
      {officeContacts.map((c) => (
        <div key={c.k} className="flex items-start gap-3.25">
          <span className="grid size-8.5 shrink-0 place-items-center rounded-md bg-white/10">
            <Icon name={c.icon} className="size-4 text-teal-200" />
          </span>
          <span className="grid gap-0.75">
            <span className="text-[11.5px] font-bold tracking-[0.13em] uppercase text-teal-200">
              {c.k}
            </span>
            <span className="text-[15px] font-medium text-white/92">{c.v}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
