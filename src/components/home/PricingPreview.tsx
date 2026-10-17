"use client";

import { Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PRICING_PREVIEW } from "@/content/home";
import { findPriceItem, HOME_RENTAL_PREVIEW, HOME_WEDDING_PREVIEW } from "@/content/pricing";
import { PROMISES } from "@/content/site";
import { RichText } from "@/components/pricing/RichText";
import { ReasonFlow } from "@/components/ui/ReasonFlow";
import { Reveal } from "@/components/ui/Reveal";
import { cn, EASE_OUT, won } from "@/lib/utils";

type Row = { id: string; shortTitle: string };

/** A menu-card list: name, price, and the full composition on tap. */
function MenuRows({ rows, openId, onToggle }: { rows: readonly Row[]; openId: string | null; onToggle: (id: string) => void }) {
  return (
    <div className="border-t border-cream/10">
      {rows.map((row) => {
        const item = findPriceItem(row.id);
        if (!item) return null;
        const open = openId === row.id;
        return (
          <div key={row.id} className="border-b border-cream/10">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => onToggle(row.id)}
              className="group flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-body text-cream transition-colors group-hover:text-honey">{row.shortTitle}</span>
                {item.badge && (
                  <span className="rounded-full bg-amber px-2 py-0.5 text-[10px] font-semibold leading-none text-espresso">{item.badge}</span>
                )}
              </span>
              <span className="flex flex-shrink-0 items-center gap-3">
                <span className="text-right">
                  {item.listPrice && (
                    <span className="mb-0.5 block text-[11px] leading-none text-cream/35 line-through">₩{won(item.listPrice)}</span>
                  )}
                  <span className="text-body font-extrabold leading-none text-honey">₩{won(item.price)}</span>
                </span>
                <ChevronDown
                  width={15}
                  height={15}
                  className={cn("text-cream/40 transition-transform duration-300 ease-out", open && "rotate-180 text-amber")}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                >
                  <p className="pb-5 pr-8 text-caption leading-relaxed text-cream/60">
                    <RichText text={item.desc ?? ""} emphasis="font-medium text-cream/85" />
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function PricingPreview() {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <section data-paint="coffee" data-thread-side="right" className="relative py-section-py">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* why it costs what it costs */}
          <div>
            <Reveal>
              <p className="mb-4 text-label uppercase text-honey">{PRICING_PREVIEW.kicker}</p>
              <h2 className="text-h1 text-cream">{PRICING_PREVIEW.title}</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-lead text-cream/70">{PRICING_PREVIEW.fromLabel}</span>
                <span className="text-[clamp(2.25rem,4.4vw,3.5rem)] font-black leading-none tracking-tight text-amber">
                  {PRICING_PREVIEW.fromAmount}
                </span>
                <span className="text-lead text-cream/70">{PRICING_PREVIEW.fromSuffix}</span>
              </p>
            </Reveal>
            <Reveal delay={150}>
              <p className="mb-10 mt-8 max-w-md text-lead leading-relaxed text-cream/60">
                {PRICING_PREVIEW.lead[0]}
                <br />
                {PRICING_PREVIEW.lead[1]}
              </p>
            </Reveal>
            <ReasonFlow tone="dark" />
            <Reveal>
              <p className="mt-6 text-body font-medium text-cream">{PRICING_PREVIEW.conclusion}</p>
            </Reveal>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {PROMISES.map((p, i) => (
                <Reveal key={p.label} delay={i * 80}>
                  <div className="flex flex-col gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-amber text-espresso">
                      <Check width={14} height={14} strokeWidth={2.5} />
                    </span>
                    <p className="text-caption font-semibold text-cream md:text-body">{p.label}</p>
                    <p className="text-[11px] leading-relaxed text-cream/55 md:text-caption">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* the menu card */}
          <Reveal delay={120}>
            <div className="rounded-[28px] bg-espresso/45 p-6 ring-1 ring-cream/10 backdrop-blur-[2px] sm:p-9">
              <div className="mb-7 flex items-center justify-between">
                <p className="text-label uppercase text-honey">{PRICING_PREVIEW.listLabel}</p>
                <p className="text-caption text-cream/40">{PRICING_PREVIEW.vatNote}</p>
              </div>

              <div className="mb-3 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber">{PRICING_PREVIEW.rentalKicker}</span>
                <span className="text-[12px] font-semibold tracking-[0.12em] text-cream">{PRICING_PREVIEW.rentalLabel}</span>
              </div>
              <p className="mb-4 text-caption text-cream/50">{PRICING_PREVIEW.rentalNote}</p>
              <MenuRows rows={HOME_RENTAL_PREVIEW} openId={openId} onToggle={toggle} />
              <p className="mt-3 flex items-center gap-2 text-[11px] text-cream/45">
                <span className="h-1.5 w-1.5 animate-pulse-amber rounded-full bg-amber" aria-hidden="true" />
                {PRICING_PREVIEW.eventNote}
                {PRICING_PREVIEW.eventUntil}
              </p>

              <div className="mb-3 mt-10">
                <span className="text-[12px] font-semibold tracking-[0.12em] text-cream">{PRICING_PREVIEW.weddingLabel}</span>
              </div>
              <MenuRows rows={HOME_WEDDING_PREVIEW} openId={openId} onToggle={toggle} />

              <Link
                href="/pricing"
                className="group mt-10 inline-flex items-center gap-2 rounded-pill border border-cream/40 px-7 py-3 text-body text-cream transition-colors duration-300 hover:border-cream hover:bg-cream hover:text-espresso"
              >
                {PRICING_PREVIEW.cta}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
