"use client";

import { ChevronUp, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { QUOTE } from "@/content/pricing";
import { CTA, SITE } from "@/content/site";
import { cn, EASE_OUT, won } from "@/lib/utils";
import { MAX_QTY, usePricing } from "./selection";

/** Floating quote basket: a compact pill that opens into the item list. */
export function QuoteDock() {
  const { lines, count, total, dispatch } = usePricing();
  const [open, setOpen] = useState(false);
  const visible = count > 0;

  useEffect(() => {
    if (!visible) setOpen(false);
    // Leave room under the footer so the dock never covers it.
    document.body.style.paddingBottom = visible ? "104px" : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  const qtyBtn =
    "grid h-6 w-6 place-items-center rounded-full border border-cream/20 text-[13px] leading-none text-cream/70 transition-colors hover:border-cream/50 hover:text-cream disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-4 z-[1000] flex justify-center px-3 sm:bottom-6"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <div className="w-full max-w-[560px] overflow-hidden rounded-[22px] bg-espresso text-cream shadow-[0_24px_60px_-18px_rgb(43_30_20/0.65)] ring-1 ring-cream/10">
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  className="overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                >
                  <div className="max-h-[45svh] overflow-y-auto px-5 pt-5" data-lenis-prevent>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-label uppercase text-honey">{QUOTE.title}</p>
                      <button
                        type="button"
                        onClick={() => dispatch({ type: "clear" })}
                        className="text-caption text-cream/50 transition-colors hover:text-cream"
                      >
                        {QUOTE.clear}
                      </button>
                    </div>
                    <ul className="divide-y divide-cream/10">
                      {lines.map((line) => (
                        <li key={line.id} className="flex items-center gap-3 py-3">
                          <span className="min-w-0 flex-1 truncate text-caption text-cream/85">{line.label}</span>
                          <span className="flex items-center gap-1.5">
                            <button
                              type="button"
                              className={qtyBtn}
                              aria-label={`${line.label} 수량 감소`}
                              onClick={() => dispatch({ type: "dec", id: line.id })}
                            >
                              −
                            </button>
                            <span className="w-4 text-center text-[12px] font-bold tabular-nums">{line.qty}</span>
                            <button
                              type="button"
                              className={qtyBtn}
                              aria-label={`${line.label} 수량 증가`}
                              disabled={line.qty >= MAX_QTY}
                              onClick={() => dispatch({ type: "inc", id: line.id })}
                            >
                              +
                            </button>
                          </span>
                          <span className="w-[96px] text-right text-caption font-semibold tabular-nums text-honey">
                            {won(line.price * line.qty)}원
                          </span>
                          <button
                            type="button"
                            aria-label={`${line.label} 빼기`}
                            onClick={() => dispatch({ type: "remove", id: line.id })}
                            className="text-cream/35 transition-colors hover:text-cream"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-3 p-2.5 pl-4">
              <button
                type="button"
                aria-expanded={open}
                aria-label={open ? QUOTE.toggleClose : QUOTE.toggleOpen}
                onClick={() => setOpen((o) => !o)}
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
              >
                <span className="grid h-8 min-w-8 place-items-center rounded-full bg-amber px-2 text-[13px] font-bold tabular-nums text-espresso">
                  {count}
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] text-cream/50">{QUOTE.title}</span>
                  <span className="block text-[18px] font-extrabold tabular-nums tracking-tight text-cream">{won(total)}원</span>
                </span>
                <ChevronUp className={cn("ml-1 h-4 w-4 text-cream/50 transition-transform duration-300", open && "rotate-180")} />
              </button>
              <a
                href={SITE.bookingUrl}
                className="flex-shrink-0 rounded-full bg-amber px-5 py-3 text-[14px] font-semibold text-espresso transition-colors duration-300 hover:bg-honey"
              >
                {CTA.booking} →
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
