"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { BRAND } from "@/content/shop";
import type { Product } from "@/content/types";
import { cn, won } from "@/lib/utils";
import { ProductArt } from "./ProductArt";

export function discountRate(p: Product) {
  return p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
}

/** Price line: plain, or struck-through original + rate + sale price. */
export function Price({ product, className }: { product: Product; className?: string }) {
  const rate = discountRate(product);
  return (
    <span className={cn("block font-bold", product.soldOut && "text-shop-400", className)}>
      {product.originalPrice && (
        <del className={cn("block text-[13px] font-medium leading-[19px]", product.soldOut ? "text-shop-400" : "text-shop-500")}>
          <span className="sr-only">정가 </span>
          {won(product.originalPrice)}
        </del>
      )}
      {rate > 0 && (
        <em className={cn("mr-0.5 not-italic", product.soldOut ? "text-shop-400" : "text-shop-accent")}>
          <span className="sr-only">할인율 </span>
          {rate}%{" "}
        </em>
      )}
      <span className="sr-only">판매가 </span>
      {won(product.price)}
      <span className="sr-only">원</span>
    </span>
  );
}

/**
 * Product tile from the reference's `.god-item`: 3:4 image whose second cut
 * fades in on hover, a wish heart on the image, then brand / name / price /
 * colour chips / tag / rating. The name link is stretched over the whole tile
 * so the heart can stay a separate button.
 */
export function ProductCard({
  product,
  size = "lg",
  rank,
  rankChange,
  showBrand = true,
  showChips = false,
}: {
  product: Product;
  size?: "lg" | "sm";
  rank?: number;
  /** Positions moved since the last update (ranking page). */
  rankChange?: number;
  /** Lists inside the brand shop leave the brand line empty. */
  showBrand?: boolean;
  showChips?: boolean;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <li className="group relative flex min-w-0 flex-col">
      {rank !== undefined && (
        <span className="mb-0.5 flex items-center gap-1 text-[15px] font-bold leading-[21px]">
          {rank}
          {rankChange !== undefined && (
            <span
              className={cn(
                "text-[11px] font-medium",
                rankChange > 0 ? "text-shop-like" : rankChange < 0 ? "text-[#3a6fd8]" : "text-shop-900",
              )}
            >
              <span aria-hidden="true">{rankChange > 0 ? "▲" : rankChange < 0 ? "▼" : "–"}</span>
              <span className="sr-only">{rankChange > 0 ? "상승" : rankChange < 0 ? "하락" : "변동 없음"} </span>
              {Math.abs(rankChange)}
            </span>
          )}
        </span>
      )}

      <div className="relative pt-[133.136%] before:absolute before:inset-0 before:z-10 before:bg-black/[0.03] before:content-['']">
        <ProductArt art={product} className="absolute inset-0" />
        <ProductArt
          art={product}
          detail
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <button
          type="button"
          aria-pressed={liked}
          aria-label={liked ? "찜 해제" : "찜하기"}
          onClick={() => setLiked((v) => !v)}
          className="absolute bottom-2.5 right-2.5 z-[13] flex size-7 items-center justify-center"
        >
          <Heart
            className={cn(
              "size-7 drop-shadow-[0_0_1px_rgb(0_0_0/0.3)]",
              liked ? "fill-shop-like text-shop-like" : "fill-transparent text-white",
            )}
            strokeWidth={1.2}
          />
        </button>
      </div>

      <div
        className={cn(
          "pt-2.5",
          size === "lg" ? "md:pr-20 text-[15px] leading-[21px]" : "md:pr-10 text-[14px] leading-[20px]",
        )}
      >
        {showBrand && <span className="block truncate text-[14px] font-bold leading-[20px]">{BRAND.name}</span>}
        <Link
          href={`/product/${product.id}/`}
          className="block text-[14px] leading-[20px] after:absolute after:inset-0 after:z-[12] after:content-['']"
        >
          <span className="line-clamp-2">{product.name}</span>
        </Link>
        <Price product={product} className="mt-1.5 text-[15px] leading-[21px]" />
        {showChips && product.swatches.length > 0 && (
          <span className="mt-2.5 flex flex-wrap gap-0.5" aria-label={`색상 ${product.swatches.map((s) => s.name).join(", ")}`}>
            {product.swatches.map((s) => (
              <span
                key={s.id}
                className={cn("size-2.5 rounded-[2px] border border-black/10", product.soldOut && "opacity-40")}
                style={{ background: s.color }}
              />
            ))}
          </span>
        )}
        {(product.tag || product.soldOut) && (
          <span className="mt-1.5 flex flex-wrap gap-1">
            {product.soldOut && (
              <span className="inline-flex rounded bg-shop-900 px-1 text-[11px] leading-[17px] text-white">품절</span>
            )}
            {product.tag && (
              <span className="inline-flex rounded bg-shop-200 px-1 text-[11px] leading-[17px] text-shop-600">{product.tag}</span>
            )}
          </span>
        )}
        <span className="mt-3 flex max-h-4 items-center overflow-hidden text-[11px] font-medium leading-[17px] text-shop-450">
          {product.rating !== undefined && (
            <>
              <span className="flex items-center">
                <Star className="mr-0.5 size-4 fill-current" strokeWidth={0} aria-hidden="true" />
                <span className="sr-only">평점 </span>
                {product.rating.toFixed(1)}
              </span>
              <span className="mr-1.5">
                (<span className="sr-only">후기 </span>
                {product.reviews})
              </span>
            </>
          )}
          <span className="flex items-center">
            <Heart className="mr-0.5 size-4 fill-current" strokeWidth={0} aria-hidden="true" />
            <span className="sr-only">찜 </span>
            {product.likes}
          </span>
        </span>
      </div>
    </li>
  );
}

/** Product grids used across the shop: 4, 5 or 6 columns on desktop. */
export const GRID = {
  4: "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4",
  5: "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-5",
  6: "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:grid-cols-6",
} as const;
