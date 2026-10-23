"use client";

import Link from "next/link";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { HERO } from "@/content/home";
import { CTA, SITE } from "@/content/site";
import { ThreadAnchor } from "@/components/layout/Thread";
import { EASE_OUT } from "@/lib/utils";

function enter(delay: number, reduced: boolean | null) {
  const shown = { opacity: 1, y: 0 };
  return reduced
    ? { initial: shown, animate: shown, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 24 }, animate: shown, transition: { duration: 0.8, ease: EASE_OUT, delay } };
}

function CountUp({ num, prefix, suffix, startDelay = 700 }: { num: number; prefix: string; suffix: string; startDelay?: number }) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(num);
  const mv = useMotionValue(num);

  useEffect(() => {
    if (reduced) return;
    mv.set(0);
    setValue(0);
    const unsub = mv.on("change", (v) => setValue(Math.round(v)));
    const timer = setTimeout(() => {
      animate(mv, num, { duration: 1.4, ease: EASE_OUT });
    }, startDelay);
    return () => {
      clearTimeout(timer);
      unsub();
    };
  }, [mv, num, reduced, startDelay]);

  const width = num.toLocaleString().length;
  return (
    <>
      {prefix}
      <span className="inline-block text-right tabular-nums" style={{ minWidth: `${width}ch` }}>
        {value.toLocaleString()}
      </span>
      {suffix}
    </>
  );
}

/** Stand-in for the hero video: a slowly drifting coffee-toned backdrop with grain. */
function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-[-6%] animate-hero-pan motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(55% 50% at 24% 28%, rgb(243 162 87 / 0.42) 0%, transparent 70%), radial-gradient(50% 55% at 78% 70%, rgb(113 80 47 / 0.9) 0%, transparent 72%), radial-gradient(38% 38% at 62% 18%, rgb(248 201 149 / 0.35) 0%, transparent 70%), linear-gradient(160deg, #4a3320 0%, #2b1e14 62%, #1d140d 100%)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-[0.16] mix-blend-overlay">
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>
      <span className="absolute bottom-6 right-5 rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/70 backdrop-blur-sm">
        HERO VIDEO
      </span>
    </div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section data-paint="espresso" className="relative h-svh min-h-[640px]">
      {HERO.videoSrc ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO.videoSrc.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${HERO.videoSrc}` : HERO.videoSrc}
          style={{ filter: "brightness(0.7) saturate(0.8) sepia(0.15)" }}
        />
      ) : (
        <HeroBackdrop />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgb(43 30 20 / 0.25) 0%, rgb(43 30 20 / 0.4) 50%, rgb(43 30 20 / 0.82) 100%)",
        }}
      />

      <div className="container relative z-10 flex h-full flex-col items-center pt-[60px]">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <motion.div {...enter(0, reduced)} className="mb-5 flex items-center gap-3 text-amber">
            <span className="h-px w-6 bg-current opacity-60" aria-hidden="true" />
            <p className="text-label uppercase tracking-widest">{HERO.eyebrow}</p>
            <span className="h-px w-6 bg-current opacity-60" aria-hidden="true" />
          </motion.div>
          <motion.h1 {...enter(0.15, reduced)} className="mb-6 text-display text-cream">
            {HERO.title[0]}
            <br />
            {HERO.title[1]}
          </motion.h1>
          <motion.p {...enter(0.3, reduced)} className="mb-10 max-w-md text-lead text-cream/75">
            {HERO.lead[0]}
            <br />
            {HERO.lead[1]}
          </motion.p>
          <motion.div {...enter(0.45, reduced)} className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <a
              href={SITE.bookingUrl}
              className="inline-flex w-full items-center justify-center rounded-pill bg-amber px-8 py-3.5 text-[14px] font-medium tracking-wide text-espresso transition-colors duration-300 hover:bg-honey sm:w-auto"
            >
              {CTA.booking}
            </a>
            <Link
              href="/pricing"
              className="inline-flex w-full items-center justify-center rounded-pill border border-cream/50 px-8 py-3.5 text-[14px] tracking-wide text-cream transition-colors duration-300 hover:border-cream hover:bg-cream/10 sm:w-auto"
            >
              {CTA.pricing}
            </Link>
          </motion.div>
        </div>

        <motion.div {...enter(0.6, reduced)} className="mb-36 w-full max-w-lg">
          <div className="grid grid-cols-3 divide-x divide-cream/15 border-t border-cream/15">
            {HERO.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center px-2 py-5 text-center">
                <p className="text-base leading-tight text-cream sm:text-h3" style={{ fontWeight: 900 }}>
                  <CountUp num={stat.num} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-[0.625rem] leading-snug text-cream/55 sm:text-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Start of the page-long thread: a quiet cue and the first stretch of line. */}
      <div className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center" aria-hidden="true">
        <span className="mb-3 text-[10px] font-medium tracking-[0.32em] text-cream/45">{HERO.scrollCue}</span>
        <span className="h-20 w-px bg-gradient-to-b from-amber/0 via-amber/40 to-amber/30" />
      </div>
      <ThreadAnchor x={0.5} top="100%" />
    </section>
  );
}
