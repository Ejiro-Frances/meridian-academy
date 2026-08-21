import { Icon } from "@/components/icon";
import { admissionSteps } from "@/content/admissions";
import { cn } from "@/lib/utils";

export function AdmissionStepsRow() {
  return (
    <ol className="mt-8 mb-10 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:mt-10 lg:mb-16.5 lg:grid-cols-5">
      {admissionSteps.map((s, i) => (
        <li
          key={s.n}
          className={cn(
            "grid content-start gap-3 rounded-xl border-[1.5px] bg-card px-5 py-5.5",
            i === 0 ? "border-sage-500 shadow-brand" : "border-border shadow-xs",
          )}
        >
          <span
            className={cn(
              "grid size-10 place-items-center rounded-full",
              i === 0 && "bg-sage-600 text-white",
              i === 1 && "bg-clay-500 text-white",
              i > 1 && "bg-background text-subtle",
            )}
          >
            <Icon name={s.icon} className="size-5" />
          </span>
          <span className="text-[16.5px] font-extrabold tracking-[-0.02em] text-strong">
            {s.n}. {s.t}
          </span>
          <span className="text-sm leading-normal text-muted-foreground">{s.b}</span>
          <span className="mt-0.5 font-mono text-xs font-bold text-teal-500">{s.when}</span>
        </li>
      ))}
    </ol>
  );
}
