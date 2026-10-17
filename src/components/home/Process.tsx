"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PROCESS } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { cn, EASE_OUT } from "@/lib/utils";
import { StepArt } from "./StepArt";

const STEPS = PROCESS.steps;
const N = STEPS.length;
const TOTAL = String(N).padStart(2, "0");

// "사르륵": each line surfaces out of a soft blur, one after another.
const lineVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, filter: "blur(6px)", transition: { duration: 0.28, ease: "easeIn" } },
};
const stackVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
  exit: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
};
const artMotion = {
  initial: { opacity: 0, scale: 0.97, filter: "blur(12px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.85, ease: EASE_OUT } },
  exit: { opacity: 0, scale: 1.01, filter: "blur(8px)", transition: { duration: 0.3, ease: "easeIn" as const } },
};

function Title({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="mb-4 text-label uppercase text-amber-deep">Process</p>
      <h2 className="text-h1 leading-tight text-espresso">
        {PROCESS.title[0]}
        <br />
        {PROCESS.title[1]}
      </h2>
    </div>
  );
}

function ArrowButton({ dir, disabled, onClick }: { dir: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  const Icon = dir === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? PROCESS.prevLabel : PROCESS.nextLabel}
      className="group grid h-12 w-12 place-items-center rounded-full border border-coffee/30 text-coffee transition-colors duration-300 hover:border-amber hover:bg-amber hover:text-espresso disabled:pointer-events-none disabled:opacity-25"
    >
      <Icon
        className={cn(
          "h-4 w-4 transition-transform duration-300",
          dir === "prev" ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5",
        )}
        strokeWidth={1.75}
      />
    </button>
  );
}

function Controls({ active, onPrev, onNext }: { active: number; onPrev: () => void; onNext: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <ArrowButton dir="prev" disabled={active === 0} onClick={onPrev} />
      <p className="min-w-[92px] text-center tabular-nums" aria-live="polite">
        <span className="text-h2 font-extrabold text-espresso">{STEPS[active].number}</span>
        <span className="text-caption text-mocha"> / {TOTAL}</span>
      </p>
      <ArrowButton dir="next" disabled={active === N - 1} onClick={onNext} />
    </div>
  );
}

/** Four labelled segments: done (coffee), current (amber, filling in), upcoming (empty). */
function Progress({ active }: { active: number }) {
  return (
    <ol className="grid grid-cols-4 gap-2 sm:gap-3" aria-label="진행 단계">
      {STEPS.map((step, i) => (
        <li key={step.number} className="min-w-0" aria-current={i === active ? "step" : undefined}>
          <div className="relative h-[3px] overflow-hidden rounded-full bg-coffee/15">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              initial={false}
              animate={{
                width: i <= active ? "100%" : "0%",
                backgroundColor: i < active ? "#71502f" : "#f3a257",
              }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            />
          </div>
          <p
            className={cn(
              "mt-2.5 truncate text-[11px] transition-colors duration-300 sm:text-caption",
              i === active ? "font-semibold text-espresso" : i < active ? "text-coffee" : "text-mocha/70",
            )}
          >
            <span className="mr-1.5 tabular-nums">{step.number}</span>
            {step.title}
          </p>
        </li>
      ))}
    </ol>
  );
}

function StepInfo({ index }: { index: number }) {
  const step = STEPS[index];
  return (
    <motion.div key={`info-${index}`} variants={stackVariants} initial="hidden" animate="show" exit="exit">
      <motion.p variants={lineVariants} className="text-label tracking-widest text-amber-deep">
        STEP {step.number}
      </motion.p>
      <motion.div variants={lineVariants} className="mt-5 flex items-baseline gap-3">
        <span className="text-[clamp(2.5rem,4.6vw,4rem)] font-black leading-none tracking-tight text-espresso">{step.metric}</span>
        <span className="text-label text-mocha">{step.metricLabel}</span>
      </motion.div>
      <motion.h3 variants={lineVariants} className="mt-7 text-h2 font-semibold text-coffee">
        {step.title}
      </motion.h3>
      <motion.p variants={lineVariants} className="mt-2 text-lead text-espresso/80">
        {step.subtitle}
      </motion.p>
      <motion.p variants={lineVariants} className="mt-5 max-w-md text-body text-mocha">
        {step.description}
      </motion.p>
      <motion.div variants={lineVariants} className="mt-6 flex flex-wrap gap-2">
        {step.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-coffee/15 bg-cream/70 px-3 py-1 text-[12px] text-coffee">
            {tag}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

/**
 * ≥1024px: the section is N viewports tall and the panel stays pinned while
 * scrolling picks the step. The arrows scroll to the neighbouring step, so
 * scroll position and the visible step never disagree.
 */
function PinnedProcess() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N))));
  });

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const target = Math.min(N - 1, Math.max(0, i));
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const y = top + travel * ((target + 0.5) / N);
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="process"
      data-paint="latte"
      data-thread-side="right"
      className="relative"
      style={{ height: `${N * 100}svh` }}
    >

      <div className="sticky overflow-hidden" style={{ top: "60px", height: "calc(100svh - 60px)" }}>
        <div className="container flex h-full flex-col py-8 xl:py-12">
          <div className="mb-7 flex flex-shrink-0 items-end justify-between gap-8">
            <Title />
            <Controls active={active} onPrev={() => goTo(active - 1)} onNext={() => goTo(active + 1)} />
          </div>
          <div className="mb-8 flex-shrink-0">
            <Progress active={active} />
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[2fr_3fr] items-center gap-14 xl:gap-24">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <StepInfo key={active} index={active} />
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div key={`art-${active}`} {...artMotion} className="flex w-full items-center justify-center">
                  <StepArt step={STEPS[active].key} className="w-full max-w-[440px] xl:max-w-[520px]" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** <1024px (and reduced motion): a stepper driven by the arrows or a swipe. */
function StepperProcess({ animate = true }: { animate?: boolean }) {
  const [active, setActive] = useState(0);
  const go = (i: number) => setActive(Math.min(N - 1, Math.max(0, i)));

  return (
    <section id="process" data-paint="latte" data-thread-side="right" className="relative py-section-py">
      <div className="container">
        <Reveal>
          <Title />
        </Reveal>
        <div className="mb-6 mt-10 flex items-center justify-between gap-4">
          <p className="text-caption text-mocha">좌우로 넘겨 보세요</p>
          <Controls active={active} onPrev={() => go(active - 1)} onNext={() => go(active + 1)} />
        </div>
        <Progress active={active} />

        <motion.div
          className="mt-10 touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(active + 1);
            else if (info.offset.x > 60) go(active - 1);
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={`m-${active}`} {...(animate ? artMotion : {})}>
              <StepArt step={STEPS[active].key} className="mx-auto mb-8 w-full max-w-[360px]" />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait" initial={false}>
            <StepInfo key={active} index={active} />
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export function Process() {
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const check = () => setDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  if (reduced) return <StepperProcess animate={false} />;
  return desktop ? <PinnedProcess /> : <StepperProcess />;
}
