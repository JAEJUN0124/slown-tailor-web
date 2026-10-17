"use client";

import { useEffect, useRef, useState } from "react";
import { LOADER } from "@/content/home";
import { SITE } from "@/content/site";
import { cn } from "@/lib/utils";

const DURATION = 2200;

/** Full-screen counter shown once on the home page, centred, then lifted away. */
export function IntroLoader() {
  const [mounted, setMounted] = useState(true);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const raf = useRef(0);
  const start = useRef(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const finish = (holdMs: number) => {
      timers.push(
        setTimeout(() => {
          setLeaving(true);
          timers.push(setTimeout(() => setMounted(false), 800));
        }, holdMs),
      );
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(LOADER.target);
      setProgress(100);
      finish(300);
      return () => timers.forEach(clearTimeout);
    }

    const tick = (now: number) => {
      if (!start.current) start.current = now;
      const t = Math.min((now - start.current) / DURATION, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setCount(Math.round(LOADER.target * eased));
      setProgress(Math.round(100 * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else finish(450);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (!mounted) return null;

  const stage = progress < 30 ? 0 : progress < 60 ? 1 : progress < 90 ? 2 : 3;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-espresso px-8 text-center transition-[transform,opacity] duration-[800ms] ease-in-out",
        leaving ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
      )}
    >
      <span className="absolute left-1/2 top-12 -translate-x-1/2 text-label tracking-[0.32em] text-cream/45 md:top-16">
        {SITE.brand}
      </span>

      <div className="flex flex-col items-center">
        <span className="text-display font-black leading-none tabular-nums text-cream">{count.toLocaleString("ko-KR")}</span>
        <span className="mt-4 text-label tracking-[0.32em] text-amber">{LOADER.unit}</span>
        <p className="mt-8 text-label leading-relaxed text-cream/40">
          {LOADER.lines[0]}
          <br />
          {LOADER.lines[1]}
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 w-[min(320px,calc(100%-4rem))] -translate-x-1/2 md:bottom-16">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-caption text-cream/45">{LOADER.stages[stage]}</span>
          <span className="text-caption tabular-nums text-cream/30">{progress}%</span>
        </div>
        <div className="h-px w-full overflow-hidden bg-cream/10">
          <div className="h-full bg-amber" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
