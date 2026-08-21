"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Box } from "lucide-react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "lab-3d": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        lab?: string;
        orbit?: string;
      };
    }
  }
}

type LabElement = HTMLElement & { reset?: () => void };

/** Client wrapper for the <lab-3d> custom element: loads three.js on demand,
 * falls back to a plain panel when WebGL is unavailable, and never re-creates
 * the canvas on parent re-renders. */
export function LabViewer({
  lab,
  resetRef,
}: {
  lab: string;
  resetRef?: RefObject<(() => void) | null>;
}) {
  const elRef = useRef<LabElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unsupported">("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
      if (!gl) {
        if (!cancelled) setStatus("unsupported");
        return;
      }
      await import("./lab3d/element");
      if (!cancelled) setStatus("ready");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (resetRef) resetRef.current = () => elRef.current?.reset?.();
  }, [resetRef, status]);

  return (
    <div
      role="img"
      aria-label="Interactive 3D model of the laboratory. A text description follows below."
      className="h-140 overflow-hidden rounded-2xl bg-sage-900 shadow-xl"
    >
      {status === "ready" ? (
        <lab-3d
          ref={(el: LabElement | null) => {
            elRef.current = el;
          }}
          lab={lab}
          orbit="on"
          className="block h-full w-full"
        />
      ) : (
        <div className="grid h-full place-items-center text-white/75">
          <div className="grid justify-items-center gap-3 px-8 text-center">
            <Box aria-hidden className="size-8" />
            <p className="text-[13px] font-semibold tracking-[0.08em] uppercase">
              {status === "unsupported"
                ? "3D view unavailable on this device — the description below covers everything the model shows."
                : "Building the room…"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
