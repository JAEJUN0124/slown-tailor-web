"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { DIFFERENTIATION } from "@/content/home";
import { EASE_OUT } from "@/lib/utils";

const viewport = { once: true, margin: "-10% 0px" } as const;

function Word({ children, delay, reduced }: { children: ReactNode; delay: number; reduced: boolean | null }) {
  return (
    <motion.span
      style={{ display: "inline-block" }}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.span>
  );
}

export function Differentiation() {
  const reduced = useReducedMotion();
  return (
    <section data-paint="cream" data-thread-side="left" className="relative flex min-h-[65svh] items-center py-section-py-lg">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-10 flex items-center justify-center gap-5" aria-hidden="true">
            {[0, 1].map((i) => (
              <motion.span
                key={i}
                className="block h-px w-10 origin-left bg-amber"
                initial={reduced ? false : { scaleX: 0 }}
                whileInView={reduced ? undefined : { scaleX: 1 }}
                viewport={viewport}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 * i }}
              />
            ))}
          </div>
          <h2 className="mb-10 text-h1 leading-tight text-espresso">
            <span className="block">
              <Word delay={0} reduced={reduced}>
                {DIFFERENTIATION.line1[0]}
              </Word>{" "}
              <Word delay={0.15} reduced={reduced}>
                {DIFFERENTIATION.line1[1]}
              </Word>
            </span>
            <span className="block">
              <motion.span
                className="relative inline-block font-extrabold text-coffee"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.3 }}
              >
                {DIFFERENTIATION.highlight}
                {/* an amber stitch drawn under the phrase */}
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full overflow-visible"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M1 8 C 20 2, 40 11, 60 6 S 90 4, 99 7"
                    fill="none"
                    stroke="#f3a257"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={reduced ? false : { pathLength: 0 }}
                    whileInView={reduced ? undefined : { pathLength: 1 }}
                    viewport={viewport}
                    transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.9 }}
                  />
                </svg>
              </motion.span>{" "}
              <Word delay={0.45} reduced={reduced}>
                {DIFFERENTIATION.tail}
              </Word>
            </span>
          </h2>
          <motion.p
            className="mx-auto max-w-xl text-lead text-mocha"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.1 }}
          >
            {DIFFERENTIATION.lead[0]}
            <br />
            {DIFFERENTIATION.lead[1]}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
