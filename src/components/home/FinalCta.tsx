"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { FINAL_CTA } from "@/content/home";
import { CTA, SITE } from "@/content/site";
import { ThreadAnchor } from "@/components/layout/Thread";
import { Reveal } from "@/components/ui/Reveal";
import { EASE_OUT } from "@/lib/utils";

/** The last stop on amber paper: the page-long thread ends in a knot above the headline. */
export function FinalCta() {
  const reduced = useReducedMotion();
  const hover = reduced ? {} : { scale: 1.02 };
  const transition = { duration: 0.3, ease: EASE_OUT };

  return (
    <section data-paint="amber" className="relative flex min-h-[70svh] items-center py-section-py-sm">
      <div className="container">
        <div className="relative mx-auto max-w-2xl text-center">
          {/* the thread comes to rest in a knot just above the headline */}
          <ThreadAnchor x={0.5} top="-56px" node />
          <Reveal>
            <h2 className="mb-6 text-h1 text-espresso">{FINAL_CTA.title}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mb-14 text-lead text-espresso/75 md:mb-16">
              {FINAL_CTA.lead}
              <br />
              <span className="font-medium text-espresso">{FINAL_CTA.leadStrong}</span>
            </p>
          </Reveal>
          <div>
            <Reveal delay={250}>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <motion.div whileHover={hover} transition={transition} className="w-full sm:w-auto">
                  <a
                    href={SITE.bookingUrl}
                    className="inline-flex w-full items-center justify-center rounded-pill bg-espresso px-10 py-4 text-body font-medium text-cream transition-colors duration-300 hover:bg-coffee"
                  >
                    {CTA.booking}
                  </a>
                </motion.div>
                <motion.div whileHover={hover} transition={transition} className="w-full sm:w-auto">
                  <Link
                    href="/pricing"
                    className="inline-flex w-full items-center justify-center rounded-pill border border-espresso/60 px-10 py-4 text-body font-medium text-espresso transition-colors duration-300 hover:bg-espresso/5"
                  >
                    {CTA.pricing}
                  </Link>
                </motion.div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={380}>
            <p className="mt-8 text-caption text-espresso/65">{FINAL_CTA.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
