"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { ProductArt } from "@/components/art/ProductArt";
import { productHref } from "@/content/catalog";
import type { Product } from "@/content/types";
import { cn, won } from "@/lib/utils";

/** The three cuts a list card swipes through (front, close-up, other backdrop). */
const CARD_FRAMES = [0, 1, 2];

/** Status word in the top-left corner of the photo (reference: .figure::after). */
export function cardFlag(p: Product) {
  if (p.upcoming) return "출시 예정";
  if (p.soldOut) return "품절";
  if (p.isNew) return "신제품";
  return null;
}

/**
 * List card (reference: .product__item). A photo slider with a 1px progress
 * bar and hover arrows, then name · price on one row and the colour under it.
 * On phones: name (2 lines) · colour · price, arrows hidden, swipe to browse.
 */
export function ProductCard({ product: p }: { product: Product }) {
  const track = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const href = productHref(p.id);
  const flag = cardFlag(p);
  const dim = p.soldOut && !p.upcoming;

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="group/card">
      <div className="relative">
        <div
          ref={track}
          onScroll={(e) => setSlide(Math.round(e.currentTarget.scrollLeft / Math.max(1, e.currentTarget.clientWidth)))}
          className="scrollbar-none flex aspect-[2/3] snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        >
          {CARD_FRAMES.map((f) => (
            <Link
              key={f}
              href={href}
              tabIndex={f === 0 ? undefined : -1}
              aria-hidden={f === 0 ? undefined : true}
              aria-label={f === 0 ? `${p.prefix ? `${p.prefix} ` : ""}${p.name} ${p.colorName}` : undefined}
              className={cn("block h-full w-full shrink-0 snap-start", dim && "bg-st-soft")}
            >
              <ProductArt art={p} frame={f} className={cn("h-full w-full", dim && "opacity-50")} />
            </Link>
          ))}
        </div>
        {flag && (
          <span className="pointer-events-none absolute left-0 top-0 z-[3] px-[2.67vw] py-[3.2vw] text-[3.2vw] font-light leading-[1.4] text-[#9f9f9f] xl:p-5 xl:text-[16px] xl:leading-[1.6]">
            {flag}
          </span>
        )}
        {/* 1px progress bar along the bottom of the photo. */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
          <span className="block h-full bg-st-ink transition-[width] duration-300" style={{ width: `${((slide + 1) / CARD_FRAMES.length) * 100}%` }} />
        </span>
        <button
          type="button"
          aria-label="이전 사진"
          disabled={slide === 0}
          onClick={() => goTo(slide - 1)}
          className="absolute left-2.5 top-1/2 z-[4] hidden h-11 w-7 -translate-y-1/2 items-center justify-center text-st-text opacity-0 transition-opacity duration-[400ms] group-hover/card:opacity-100 disabled:!opacity-0 xl:flex"
        >
          <ChevronLeft className="size-[22px]" strokeWidth={1.2} />
        </button>
        <button
          type="button"
          aria-label="다음 사진"
          disabled={slide === CARD_FRAMES.length - 1}
          onClick={() => goTo(slide + 1)}
          className="absolute right-2.5 top-1/2 z-[4] hidden h-11 w-7 -translate-y-1/2 items-center justify-center text-st-text opacity-0 transition-opacity duration-[400ms] group-hover/card:opacity-100 disabled:!opacity-0 xl:flex"
        >
          <ChevronRight className="size-[22px]" strokeWidth={1.2} />
        </button>
      </div>

      <Link href={href} className="relative block xl:mt-[22px]" tabIndex={-1}>
        <div className="xl:flex xl:items-start xl:justify-between">
          <p className="mx-[3.2vw] line-clamp-2 py-[3.73vw] text-[3.47vw] leading-[1.4] text-st-ink xl:mx-0 xl:line-clamp-1 xl:w-[77%] xl:py-0 xl:text-[16px] xl:leading-[1.6]">
            {p.prefix && `${p.prefix} `}
            {p.name}
          </p>
          <p className="mb-[3.47vw] ml-[3.2vw] text-[3.47vw] leading-[1.4] text-[#9f9f9f] xl:hidden">{p.colorName}</p>
          <p className="mx-[3.2vw] text-[3.73vw] leading-[1.4] text-st-ink xl:absolute xl:right-0 xl:top-0 xl:mx-0 xl:text-right xl:text-[16px] xl:leading-[1.6]">
            ₩{won(p.price)}
          </p>
        </div>
        <p className="hidden text-[16px] leading-[1.6] text-st-ink xl:block">{p.colorName}</p>
      </Link>
    </div>
  );
}
