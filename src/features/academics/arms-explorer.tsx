"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { ArmDetail } from "@/features/academics/arm-detail";
import { ArmRow } from "@/features/academics/arm-row";
import { armsForLevel, levels, type LevelId } from "@/content/levels";
import { useParamState } from "@/lib/use-param-state";

export function ArmsExplorer() {
  const [levelId, setLevelId] = useParamState("level", "JSS1");
  const [armParam, setArm] = useParamState("arm", "0");

  const level = levels.find((l) => l.id === levelId) ?? levels[0];
  const arms = armsForLevel(level.id as LevelId);
  const armIdx = Math.min(Math.max(parseInt(armParam, 10) || 0, 0), arms.length - 1);

  return (
    <div>
      <div className="mt-8.5 mb-6.5 flex flex-wrap gap-2" role="tablist" aria-label="School level">
        {levels.map((l) => (
          <Button
            key={l.id}
            role="tab"
            aria-selected={l.id === level.id}
            variant={l.id === level.id ? "default" : "ghost"}
            onClick={() => {
              setLevelId(l.id);
              setArm("0");
            }}
            className="h-11 px-4"
          >
            <Icon name={l.icon} />
            {l.label}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-[1.35fr_1fr] items-start gap-6.5">
        <div className="grid gap-3">
          {arms.map((arm, i) => (
            <ArmRow
              key={arm.code}
              arm={arm}
              selected={i === armIdx}
              onSelect={() => setArm(String(i))}
            />
          ))}
        </div>
        <ArmDetail arm={arms[armIdx]} />
      </div>
    </div>
  );
}
