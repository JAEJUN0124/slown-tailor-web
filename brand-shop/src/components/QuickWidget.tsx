"use client";

import Link from "next/link";
import { ArrowUp, History, MessageSquareMore, X } from "lucide-react";
import { useEffect, useState } from "react";
import { productById } from "@/content/catalog";
import { BRAND, WIDGET } from "@/content/shop";
import type { Product } from "@/content/types";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { clearRecent, useRecent } from "@/lib/store";
import { cn, won } from "@/lib/utils";
import { ProductArt } from "./ProductArt";

const box = "w-12 rounded-l-md border border-shop-250 bg-white/80 shadow-[0_0_8px_rgb(0_0_0/0.08)]";

/**
 * Right-edge floating widget (reference: `#skyScraper`): recently viewed,
 * counsel and back-to-top. It rises 56px once the page scrolls past 39px;
 * the recently-viewed panel slides in from the right and closes on scroll.
 * Product pages record views in lib/store.
 */
export function QuickWidget() {
  const [down, setDown] = useState(false);
  const [open, setOpen] = useState(false);
  const recent = useRecent();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setDown(window.scrollY > 39);
      setOpen(false);
    };
    setDown(window.scrollY > 39);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const items = recent.map((id) => productById(id)).filter((p): p is Product => !!p);

  return (
    <div className={cn("fixed bottom-10 right-0 z-[90] transition-transform duration-500", down ? "translate-y-0" : "translate-y-14")}>
      <div className={cn("transition-transform duration-300 ease-out", open && "-translate-x-[345px]")}>
        <div className={cn(box, "flex flex-col")}>
          <button
            type="button"
            aria-label={WIDGET.recent}
            aria-expanded={open}
            aria-controls="recent-panel"
            onClick={() => setOpen((v) => !v)}
            className="relative flex size-12 items-center justify-center text-shop-900"
          >
            <History className="size-6" strokeWidth={1.4} />
            {items.length > 0 && <span className="absolute right-2 top-3 size-1 rounded-full bg-shop-accent" aria-hidden="true" />}
          </button>
          <Link href={WIDGET.talkHref} aria-label={WIDGET.talk} className="flex size-12 items-center justify-center text-shop-900">
            <MessageSquareMore className="size-6" strokeWidth={1.4} />
          </Link>
        </div>
        <div className={cn(box, "mt-1.5 transition-opacity duration-500", down ? "opacity-100" : "pointer-events-none opacity-0")}>
          <button
            type="button"
            aria-label={WIDGET.top}
            tabIndex={down ? 0 : -1}
            onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
            className="flex size-12 items-center justify-center text-shop-900"
          >
            <ArrowUp className="size-6" strokeWidth={1.4} />
          </button>
        </div>
      </div>

      <section
        id="recent-panel"
        aria-label={WIDGET.recent}
        inert={!open}
        className={cn(
          "absolute bottom-14 left-full flex max-h-[660px] min-h-[464px] w-[345px] max-w-[100vw] flex-col bg-white px-6 pb-[50px] pt-[30px] shadow-[0_0_8px_rgb(0_0_0/0.08)] transition-[transform,opacity] duration-300 ease-out",
          open ? "-translate-x-[345px] opacity-100" : "opacity-0",
        )}
      >
        <h3 className="mb-5 mr-8 border-b-2 border-black pb-2 text-[17px] font-bold leading-[23px] text-black">{WIDGET.recent}</h3>
        <button type="button" aria-label="닫기" onClick={() => setOpen(false)} className="absolute right-6 top-[30px] flex size-6 items-center justify-center">
          <X className="size-5" strokeWidth={1.5} />
        </button>
        {items.length ? (
          <ul className="-mr-6 flex-1 overflow-y-auto overscroll-contain pr-6">
            {items.map((product) => (
              <li key={product.id} className="mb-2">
                <Link href={`/product/${product.id}/`} onClick={() => setOpen(false)} className="flex pr-9">
                  <ProductArt art={product} className="mr-2.5 h-16 w-12 shrink-0" />
                  <span className="min-w-0 text-[12px] leading-[18px]">
                    <span className="block truncate font-medium text-shop-600">{BRAND.name}</span>
                    <span className="line-clamp-2 text-shop-600">{product.name}</span>
                    <span className="block font-bold text-shop-900">{won(product.price)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="flex-1 py-[30px] text-center text-[15px] leading-[22px] text-shop-600">{WIDGET.empty}</p>
        )}
        <p className="mt-[15px] text-right">
          <button type="button" onClick={clearRecent} className="text-[13px] leading-[19px] text-shop-600 underline">
            {WIDGET.clear}
          </button>
        </p>
      </section>
    </div>
  );
}
