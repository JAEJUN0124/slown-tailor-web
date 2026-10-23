"use client";

import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { BRAND, type Product } from "@/content/shop";
import { cn, won } from "@/lib/utils";
import { ProductArt } from "./ProductArt";

/**
 * Product tile from the reference's `.god-item`: 3:4 image whose second cut
 * fades in on hover, a wish heart on the image, then brand / name / price /
 * tag / rating. The name link is stretched over the whole tile so the heart
 * can stay a separate button.
 */
export function ProductCard({ product, size = "lg", rank }: { product: Product; size?: "lg" | "sm"; rank?: number }) {
  const [liked, setLiked] = useState(false);

  return (
    <li className="group relative flex min-w-0 flex-col">
      {rank !== undefined && <span className="mb-0.5 text-[15px] font-bold leading-[21px]">{rank}</span>}

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
        <span className="block truncate text-[14px] font-bold leading-[20px]">{BRAND.name}</span>
        <a
          href={`#product-${product.id}`}
          className="block text-[14px] leading-[20px] after:absolute after:inset-0 after:z-[12] after:content-['']"
        >
          <span className="line-clamp-2">{product.name}</span>
        </a>
        <span className="mt-1.5 block text-[15px] font-bold leading-[21px]">
          <span className="sr-only">판매가 </span>
          {won(product.price)}
          <span className="sr-only">원</span>
        </span>
        {product.tag && (
          <span className="mt-1.5 inline-flex rounded bg-shop-200 px-1 text-[11px] leading-[17px] text-shop-600">
            {product.tag}
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
