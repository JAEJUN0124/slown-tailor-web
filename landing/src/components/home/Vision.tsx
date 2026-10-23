"use client";

import { motion, useReducedMotion } from "motion/react";
import { VISION } from "@/content/home";
import { SITE } from "@/content/site";
import { cn, EASE_OUT } from "@/lib/utils";

const viewport = { once: true, margin: "-10% 0px" } as const;

export function Vision() {
  const reduced = useReducedMotion();
  const rise = (y: number, duration: number, delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y, filter: "blur(6px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport,
          transition: { duration, ease: EASE_OUT, delay },
        };

  return (
    <section data-paint="espresso" data-thread-side="right" className="relative flex min-h-[80svh] items-center py-section-py-lg">
      <div className="container">
        <h2 className="mb-10 text-display text-cream md:mb-14">
          <motion.span className="block" {...rise(20, 0.9, 0)}>
            {VISION.title[0]}
          </motion.span>
          <motion.span className="block" {...rise(20, 0.9, 0.2)}>
            {VISION.title[1]}
          </motion.span>
        </h2>
        <motion.p className="mb-16 max-w-lg text-lead text-cream/70 md:mb-24" {...rise(16, 0.8, 0.7)}>
          {VISION.lead[0]}
          <br />
          {VISION.lead[1]}
        </motion.p>
        <motion.p className="text-lead text-cream/45" {...rise(24, 1, 1.3)}>
          {VISION.closing[0]}
          <br />
          <motion.span
            className={cn("font-semibold", reduced && "text-amber")}
            initial={reduced ? false : { color: "rgb(248 243 236)" }}
            whileInView={reduced ? undefined : { color: "rgb(243 162 87)" }}
            viewport={viewport}
            transition={{ color: { duration: 0.8, ease: "easeOut", delay: 2.4 } }}
          >
            {SITE.brandKo}
          </motion.span>
          {VISION.closing[1]}
        </motion.p>
      </div>
    </section>
  );
}
