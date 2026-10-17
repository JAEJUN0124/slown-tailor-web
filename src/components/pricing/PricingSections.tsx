"use client";

import { Check } from "lucide-react";
import { useLenis } from "lenis/react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { PRICING_CTA, PRICING_FAQ, PRICING_HERO, PROMISE_SECTION, TABS, WHY, type TabKey } from "@/content/pricing";
import { CTA, PROMISES, SITE } from "@/content/site";
import { ThreadAnchor } from "@/components/layout/Thread";
import { FaqList } from "@/components/ui/FaqList";
import { ReasonFlow } from "@/components/ui/ReasonFlow";
import { Reveal } from "@/components/ui/Reveal";
import { EASE_OUT } from "@/lib/utils";
import { usePricing } from "./selection";

export function PricingHero() {
  const reduced = useReducedMotion();
  const { setTab } = usePricing();
  const lenis = useLenis();
  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.9, ease: EASE_OUT, delay },
        };

  const jump = (key: TabKey) => {
    setTab(key);
    const target = document.getElementById("pricing-tabs");
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -60, duration: 1.1 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section data-paint="espresso" className="relative flex min-h-[86svh] items-end pb-28 pt-[140px] md:pb-32">
      {/* warm light pooling behind the headline */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(45% 55% at 82% 18%, rgb(243 162 87 / 0.28) 0%, transparent 70%), radial-gradient(50% 60% at 10% 90%, rgb(113 80 47 / 0.55) 0%, transparent 70%)",
        }}
      />
      <div className="container relative">
        <motion.p {...enter(0)} className="mb-6 flex items-center gap-3 text-label uppercase text-amber">
          <span className="h-px w-8 bg-amber/70" aria-hidden="true" />
          {PRICING_HERO.kicker}
        </motion.p>
        <motion.h1 {...enter(0.12)} className="text-display text-cream">
          {PRICING_HERO.title[0]}
          <br />
          {PRICING_HERO.title[1]}
        </motion.h1>
        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <motion.div {...enter(0.28)}>
            <p className="max-w-md text-lead text-cream/70">{PRICING_HERO.lead}</p>
            <p className="mt-6 flex flex-wrap items-baseline gap-x-3">
              <span className="text-lead text-cream/70">{PRICING_HERO.fromLabel}</span>
              <span className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-black leading-none tracking-tight text-amber">
                {PRICING_HERO.fromPrice}
              </span>
              <span className="text-lead text-cream/70">{PRICING_HERO.fromSuffix}</span>
            </p>
          </motion.div>
          <motion.div {...enter(0.42)}>
            <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-cream/45">{PRICING_HERO.jumpLabel}</p>
            <div className="flex max-w-md flex-wrap gap-2">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => jump(t.key)}
                  className="rounded-full border border-cream/20 px-4 py-2 text-caption text-cream/80 transition-colors duration-300 hover:border-amber hover:bg-amber hover:text-espresso"
                >
                  {t.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2" aria-hidden="true">
        <span className="block h-16 w-px bg-gradient-to-b from-amber/0 via-amber/40 to-amber/30" />
      </div>
      <ThreadAnchor x={0.5} top="100%" />
    </section>
  );
}

export function WhyReasonable() {
  return (
    <section data-paint="cream" data-thread-side="left" className="relative py-section-py">
      <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="mb-4 text-label uppercase text-amber-deep">{WHY.kicker}</p>
          <h2 className="text-h1 text-espresso">{WHY.title}</h2>
          <p className="mt-6 max-w-sm text-lead text-mocha">{WHY.lead}</p>
        </Reveal>
        <div>
          <ReasonFlow tone="light" />
          <Reveal>
            <p className="mt-7 text-h3 font-bold text-coffee">{WHY.conclusion}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function PromiseAndFaq() {
  return (
    <>
      <section data-paint="latte" data-thread-side="left" className="relative py-section-py-sm">
        <div className="container">
          <Reveal>
            <p className="mb-4 text-label uppercase text-amber-deep">Promise</p>
            <h2 className="mb-12 text-h1 text-espresso">{PROMISE_SECTION.title}</h2>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-0">
            {PROMISES.map((p, i) => (
              <Reveal key={p.label} delay={i * 90} className={i > 0 ? "sm:border-l sm:border-coffee/15 sm:pl-8" : "sm:pr-8"}>
                <span className="mb-5 grid h-9 w-9 place-items-center rounded-full bg-amber text-espresso">
                  <Check width={16} height={16} strokeWidth={2.5} />
                </span>
                <h3 className="mb-2 text-h3 text-espresso">{p.label}</h3>
                <p className="text-body text-mocha">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-paint="cream" data-thread-side="right" className="relative py-section-py">
        <div className="container">
          <Reveal>
            <p className="mb-4 text-label uppercase text-amber-deep">FAQ</p>
            <h2 className="mb-12 text-h1 text-espresso">{PRICING_FAQ.title}</h2>
          </Reveal>
          <FaqList items={PRICING_FAQ.items} />
        </div>
      </section>
    </>
  );
}

export function PricingCta() {
  return (
    <section data-paint="amber" className="relative flex min-h-[60svh] items-center py-section-py-sm text-center">
      <div className="container relative">
        <ThreadAnchor x={0.5} top="-48px" node />
        <Reveal>
          <p className="mb-4 text-label uppercase text-espresso/60">{PRICING_CTA.kicker}</p>
          <h2 className="text-h1 text-espresso">{PRICING_CTA.title}</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-5 max-w-[580px] text-lead text-espresso/75">{PRICING_CTA.lead}</p>
        </Reveal>
        <div className="mt-12">
          <Reveal delay={200}>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={SITE.bookingUrl}
                className="inline-flex w-full items-center justify-center rounded-pill bg-espresso px-10 py-4 text-body font-medium text-cream transition-colors duration-300 hover:bg-coffee sm:w-auto"
              >
                {CTA.booking}
              </a>
              <Link
                href={PRICING_CTA.secondaryHref}
                className="inline-flex w-full items-center justify-center rounded-pill border border-espresso/60 px-10 py-4 text-body font-medium text-espresso transition-colors duration-300 hover:bg-espresso/5 sm:w-auto"
              >
                {PRICING_CTA.secondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
