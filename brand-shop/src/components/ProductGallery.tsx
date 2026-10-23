"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/content/types";
import { cn } from "@/lib/utils";
import { ProductArt } from "./ProductArt";

/** Studio cuts of a product: front and close-up, each on two backdrops. */
export function productCuts(p: Product) {
  const t = p.tone ?? 0;
  const art = (tone: number) => ({ kind: p.kind, color: p.color, variant: p.variant, tone });
  return [
    { art: art(t), detail: false },
    { art: art(t), detail: true },
    { art: art(t + 2), detail: false },
    { art: art(t + 2), detail: true },
  ];
}

/**
 * Detail gallery (reference: `.godsImg-area`): a block of 52×70 thumbnails,
 * three to a row, beside the 3:4 main image with large white chevrons. The
 * current thumbnail gets a 2px black frame, the rest a white veil.
 */
export function ProductGallery({ product }: { product: Product }) {
  const cuts = productCuts(product);
  const [index, setIndex] = useState(0);
  const last = cuts.length - 1;

  const arrow = "absolute top-1/2 z-10 flex h-[88px] w-11 -translate-y-1/2 items-center justify-center text-white drop-shadow-[0_0_2px_rgb(0_0_0/0.45)] transition-opacity disabled:opacity-35";

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row lg:items-start">
      <ul className="flex flex-wrap gap-1 lg:w-[164px] lg:shrink-0" aria-label="상품 이미지 목록">
        {cuts.map((c, i) => (
          <li key={i}>
            <button
              type="button"
              aria-label={`${i + 1}번째 이미지 보기`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
              className="relative block h-[70px] w-[52px] overflow-hidden rounded-md"
            >
              <ProductArt art={c.art} detail={c.detail} className="absolute inset-0" />
              <span
                aria-hidden="true"
                className={cn("absolute inset-0 rounded-md", i === index ? "border-2 border-shop-900" : "bg-white/60")}
              />
            </button>
          </li>
        ))}
      </ul>

      <div className="relative min-w-0 flex-1 lg:max-w-[566px]">
        <div className="relative pt-[133.33%]">
          {cuts.map((c, i) => (
            <ProductArt
              key={i}
              art={c.art}
              detail={c.detail}
              className={cn("absolute inset-0 transition-opacity duration-300", i === index ? "opacity-100" : "opacity-0")}
            />
          ))}
        </div>
        <button type="button" aria-label="이전 이미지" disabled={index === 0} onClick={() => setIndex(index - 1)} className={cn(arrow, "left-0")}>
          <ChevronLeft className="size-11" strokeWidth={0.9} />
        </button>
        <button type="button" aria-label="다음 이미지" disabled={index === last} onClick={() => setIndex(index + 1)} className={cn(arrow, "right-0")}>
          <ChevronRight className="size-11" strokeWidth={0.9} />
        </button>
        <p className="sr-only" aria-live="polite">
          {cuts.length}장 중 {index + 1}번째 이미지
        </p>
      </div>
    </div>
  );
}
