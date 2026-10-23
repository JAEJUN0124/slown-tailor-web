"use client";

import { motion, useReducedMotion } from "motion/react";
import { REASONS } from "@/content/site";
import { cn, EASE_OUT } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** "Cause → effect" rows joined by a short amber thread that draws in on view. */
export function ReasonFlow({ tone }: { tone: "dark" | "light" }) {
  const reduced = useReducedMotion();
  const dark = tone === "dark";
  return (
    <div role="list" className={cn("border-t", dark ? "border-cream/10" : "border-line")}>
      {REASONS.map((r, i) => (
        <Reveal key={r.from} delay={i * 90}>
          <div
            role="listitem"
            className={cn(
              "grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b py-4 sm:gap-5",
              dark ? "border-cream/10" : "border-line",
            )}
          >
            <span className={cn("text-body", dark ? "text-cream/55" : "text-mocha")}>{r.from}</span>
            <span className="relative block h-px w-10 sm:w-20" aria-hidden="true">
              <span className={cn("absolute inset-0", dark ? "bg-cream/15" : "bg-coffee/15")} />
              <motion.span
                className="absolute inset-y-0 left-0 bg-amber"
                initial={reduced ? false : { width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.25 + i * 0.1 }}
              />
              <motion.span
                className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-amber"
                initial={reduced ? false : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.4, ease: EASE_OUT, delay: 1 + i * 0.1 }}
              />
            </span>
            <span className={cn("text-body font-medium", dark ? "text-cream" : "text-espresso")}>{r.to}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
