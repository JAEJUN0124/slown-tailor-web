"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { cn, EASE_OUT } from "@/lib/utils";

type Paint = "espresso" | "coffee" | "latte" | "cream";

/**
 * Parallax photo band, inset from the page edges so the thread can keep
 * running in the margin beside it. The image layer is 124% tall and drifts.
 */
export function FullBleed({
  caption,
  tone = 0,
  grayscale = false,
  paint = "coffee",
  threadSide = "right",
}: {
  caption: string;
  tone?: number;
  grayscale?: boolean;
  paint?: Paint;
  threadSide?: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["12%", "-12%"]);
  const side = "clamp(1.5rem, 6vw, 6rem)";

  return (
    <section data-paint={paint} data-thread-side={threadSide} className="relative py-6 md:py-10" aria-label={caption}>
      <div className="px-[clamp(12px,3.6vw,56px)]">
        <div ref={ref} className="relative h-[44svh] overflow-hidden rounded-[22px] md:h-[70svh] md:rounded-[32px]">
          <motion.div className="absolute inset-x-0 w-full" style={{ y, height: "124%", top: "-12%" }}>
            <PhotoPlaceholder
              index={tone}
              className={cn("h-full w-full", grayscale && "grayscale")}
              label="FULL-BLEED PHOTO"
              alt={caption}
              figures="pair"
            />
          </motion.div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent to-espresso/70"
            aria-hidden="true"
          />
          <motion.div
            className="absolute bottom-8 md:bottom-14"
            style={{ left: side, right: "auto", textAlign: "left", maxWidth: "56rem" }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
          >
            <span className="mb-3 block h-px w-10 bg-amber" aria-hidden="true" />
            <p
              className="break-keep font-medium leading-snug tracking-wide text-cream"
              style={{ fontSize: "clamp(1.25rem, 3.5vw, 2.5rem)", textShadow: "0 2px 16px rgba(0,0,0,0.45)" }}
            >
              {caption}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
