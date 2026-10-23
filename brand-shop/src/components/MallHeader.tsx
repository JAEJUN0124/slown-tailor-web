"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search } from "lucide-react";
import { useCallback, useState } from "react";
import { MALL } from "@/content/shop";
import { cn } from "@/lib/utils";
import { CartLink, SmartLink, TotalSearch } from "./ShopHeader";

const SISTER_STYLE = {
  thin: "font-light lowercase tracking-[0.14em]",
  wide: "font-bold tracking-[0.24em]",
  bold: "font-extrabold tracking-[0.02em]",
} as const;

/**
 * Mall-wide header (reference: `.wrap.ssf header`): a black bar with only the
 * account links, a 70px row with the accent-coloured mall logo, utility icons
 * and sister shops, and a 50px category row closed by a black hairline.
 */
export function MallHeader() {
  const [searching, setSearching] = useState(false);
  const close = useCallback(() => setSearching(false), []);
  const pathname = usePathname();

  return (
    <header className="relative z-[100]">
      <div className="h-10 bg-black">
        <nav aria-label="내 계정" className="mx-auto flex h-full max-w-[1440px] items-center justify-end gap-6 px-5 text-[12px] leading-[18px] text-shop-400">
          <Link href="/login/" className="transition-colors hover:text-white">
            {MALL.myPage}
          </Link>
          <Link href="/login/" className="transition-colors hover:text-white">
            {MALL.login}
          </Link>
        </nav>
      </div>

      <div className="border-b border-black bg-white">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center px-5 md:h-[70px]">
          <Link href="/" aria-label={`${MALL.name} ${MALL.suffix} 홈`} className="text-[22px] leading-none tracking-[0.01em] text-shop-accent md:text-[26px]">
            <span className="font-extrabold">{MALL.name}</span> <span className="font-light">{MALL.suffix}</span>
          </Link>
          <div className="ml-auto flex items-center">
            <div className="flex items-center gap-6">
              <button type="button" aria-label="통합 검색" onClick={() => setSearching(true)} className="flex size-6 items-center justify-center">
                <Search className="size-6" strokeWidth={1.4} />
              </button>
              <Link href="/login/" aria-label="찜한 상품" className="flex size-6 items-center justify-center">
                <Heart className="size-6" strokeWidth={1.4} />
              </Link>
              <CartLink className="size-6" iconClass="size-6" />
            </div>
            <div className="relative ml-7 hidden items-center gap-6 pl-7 before:absolute before:left-0 before:top-1/2 before:h-3.5 before:w-px before:-translate-y-1/2 before:bg-shop-250 before:content-[''] lg:flex">
              {MALL.sisterShops.map((shop) => (
                <a key={shop.label} href={`#shop-${shop.style}`} className={cn("text-[16px] leading-[22px] text-black", SISTER_STYLE[shop.style])}>
                  {shop.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-shop-150">
          <nav aria-label="쇼핑 카테고리" className="scrollbar-none mx-auto flex h-[50px] max-w-[1440px] items-center overflow-x-auto px-5 text-[15px] leading-[21px] text-shop-900">
            <ul className="flex shrink-0 items-center gap-4">
              {MALL.categories.map((c) => (
                <li key={c.label} className="shrink-0">
                  <SmartLink href={c.href} className="hover:underline">
                    {c.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
            <ul className="relative ml-5 flex shrink-0 items-center gap-4 pl-5 before:absolute before:left-0 before:top-1/2 before:h-3.5 before:w-px before:-translate-y-1/2 before:bg-shop-250 before:content-['']">
              {MALL.specials.map((c) => (
                <li key={c.label} className="shrink-0">
                  <SmartLink
                    href={c.href}
                    aria-current={c.href !== "/" && pathname.startsWith(c.href.replace(/\/$/, "")) ? "page" : undefined}
                    className="hover:underline aria-[current=page]:font-bold"
                  >
                    {c.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {searching && <TotalSearch onClose={close} />}
    </header>
  );
}
