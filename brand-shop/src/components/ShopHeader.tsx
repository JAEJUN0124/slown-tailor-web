"use client";

import Link from "next/link";
import { ChevronRight, Heart, Search, ShoppingBag, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BRAND, MALL } from "@/content/shop";
import { cn } from "@/lib/utils";

const SISTER_STYLE = {
  thin: "font-light lowercase tracking-[0.14em]",
  wide: "font-bold tracking-[0.24em]",
  bold: "font-extrabold tracking-[0.02em]",
} as const;

/** Dimmed full-width search layer opened from the top bar (reference: `.search-box`). */
function TotalSearch({ onClose }: { onClose: () => void }) {
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-black/20" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-label="통합 검색" className="absolute inset-x-0 top-0 z-[101] bg-white">
        <div className="relative mx-auto max-w-[1440px] px-5 pb-[100px] pt-[60px]">
          <form role="search" onSubmit={(e) => e.preventDefault()} className="mx-auto flex max-w-[692px] items-center border-b-2 border-black">
            <input
              ref={input}
              type="search"
              aria-label="검색어"
              placeholder="검색어를 입력해 주세요"
              className="h-14 min-w-0 flex-1 bg-transparent text-[20px] leading-[30px] text-black outline-none placeholder:text-shop-600 md:text-[24px]"
            />
            <button type="submit" aria-label="검색" className="flex size-8 items-center justify-center">
              <Search className="size-7" strokeWidth={1.5} />
            </button>
          </form>
          <button type="button" aria-label="검색 닫기" onClick={onClose} className="absolute right-5 top-5 flex size-6 items-center justify-center">
            <X className="size-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </>
  );
}

/** 40px black bar: mall logo, sister shops, utility icons, account links. */
function TopBar({ onSearch }: { onSearch: () => void }) {
  return (
    <div className="h-10 bg-black">
      <div className="mx-auto flex h-full max-w-[1440px] items-center px-5 text-[12px] leading-[18px] text-shop-400">
        <Link href="/" aria-label={`${MALL.name} ${MALL.suffix} 홈`} className="mr-[26px] shrink-0 text-[17px] leading-none tracking-[0.02em] text-white">
          <span className="font-extrabold">{MALL.name}</span> <span className="font-light">{MALL.suffix}</span>
        </Link>

        <div className="ml-auto flex items-center lg:pl-[280px]">
          <div className="relative mr-6 hidden items-center gap-6 pr-6 after:absolute after:right-0 after:top-1/2 after:h-3 after:w-px after:-translate-y-1/2 after:bg-shop-700 after:content-[''] lg:flex">
            {MALL.sisterShops.map((shop) => (
              <a key={shop.label} href={`#shop-${shop.style}`} className={cn("text-[12px] leading-4 text-white", SISTER_STYLE[shop.style])}>
                {shop.label}
              </a>
            ))}
          </div>

          <div className="relative mr-4 flex items-center gap-4 pr-4 after:absolute after:right-0 after:top-1/2 after:h-3 after:w-px after:-translate-y-1/2 after:bg-shop-700 after:content-[''] sm:mr-6 sm:gap-6 sm:pr-6">
            <button type="button" aria-label="통합 검색" onClick={onSearch} className="flex size-5 items-center justify-center">
              <Search className="size-5" strokeWidth={1.5} />
            </button>
            <a href="#wishlist" aria-label="찜한 상품" className="flex size-5 items-center justify-center">
              <Heart className="size-5" strokeWidth={1.5} />
            </a>
            <a href="#cart" aria-label={`장바구니, ${MALL.cartCount}개`} className="relative flex size-5 items-center justify-center">
              <ShoppingBag className="size-5" strokeWidth={1.5} />
              <span className="absolute -right-3 bottom-0 flex h-[15px] w-[22px] justify-center rounded-full bg-shop-accent text-[9px] font-bold leading-[15px] tracking-[-1px] text-white" aria-hidden="true">
                {MALL.cartCount}
              </span>
            </a>
          </div>

          <nav aria-label="내 계정" className="flex items-center gap-6">
            <a href="#mypage" className="hidden transition-colors hover:text-white sm:block">
              {MALL.myPage}
            </a>
            <a href="#login" className="transition-colors hover:text-white">
              {MALL.login}
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

type Menu = { label: string; href: string; items?: readonly { label: string; href: string }[]; more?: string };

/** Dropdown under a brand menu item: columns of links (reference: `.dropdown-layer`). */
function Dropdown({ id, menu, rows }: { id: string; menu: Menu; rows: number }) {
  return (
    <div id={id} className="absolute left-0 top-[45px] z-10 border border-black bg-white">
      <ul className="grid h-[404px] auto-cols-[200px] grid-flow-col content-start gap-y-3.5 pb-10 pt-6" style={{ gridTemplateRows: `repeat(${rows}, min-content)` }}>
        {menu.items?.map((item) => (
          <li key={item.label} className="px-5">
            <a href={item.href} className="line-clamp-2 text-[15px] leading-[21px] text-shop-900 hover:underline">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      {menu.more && (
        <a href={menu.href} className="absolute bottom-3.5 right-5 flex items-center text-[12px] leading-4 text-shop-500">
          {menu.more}
          <ChevronRight className="ml-0.5 size-3" strokeWidth={1.6} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

/** Search field that grows out of the 28px icon (reference: `form.active`, 0.5s). */
function BrandSearch() {
  const [open, setOpen] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onDown = (e: MouseEvent) => !form.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative order-3 ml-auto h-11 w-7 md:order-4">
      <form
        ref={form}
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className={cn(
          "absolute right-0 top-0 flex h-11 items-center border transition-[width,padding,border-color,background-color] duration-500",
          open ? "z-20 w-[min(316px,calc(100vw-40px))] border-black bg-white pl-5" : "w-7 border-transparent",
        )}
      >
        <input
          ref={input}
          type="search"
          aria-label={BRAND.searchPlaceholder}
          placeholder={BRAND.searchPlaceholder}
          tabIndex={open ? 0 : -1}
          className={cn(
            "h-full w-[calc(100%-60px)] bg-transparent pr-2.5 text-[15px] leading-[21px] text-shop-900 outline-none placeholder:text-shop-600",
            !open && "pointer-events-none opacity-0",
          )}
        />
        <button
          type={open ? "submit" : "button"}
          aria-label="브랜드 안에서 검색"
          aria-expanded={open}
          onClick={(e) => {
            if (!open) {
              e.preventDefault();
              setOpen(true);
            }
          }}
          className={cn("absolute top-1/2 flex size-7 -translate-y-1/2 items-center justify-center", open ? "right-3" : "right-0")}
        >
          <Search className="size-7" strokeWidth={1.25} />
        </button>
      </form>
    </div>
  );
}

/** 70px brand bar with the logo, brand like, category menus and search. */
function BrandBar() {
  const [open, setOpen] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const menus: Menu[] = [...BRAND.categories, BRAND.promotions];
  const promoIndex = menus.length - 1;

  const item = (menu: Menu, i: number, rows: number) => (
    <li
      key={menu.label}
      className="relative shrink-0"
      onMouseEnter={() => setOpen(i)}
      onMouseLeave={() => setOpen(null)}
      onFocus={() => setOpen(i)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setOpen(null)}
    >
      <a
        href={menu.href}
        aria-expanded={open === i}
        aria-controls={`brand-menu-${i}`}
        className={cn(
          "flex h-11 items-center px-2 text-[15px] leading-[21px] transition-colors md:h-[50px]",
          open !== null && open !== i ? "text-shop-500" : "text-shop-900",
        )}
      >
        {menu.label}
      </a>
      {open === i && (
        <div className="hidden lg:block">
          <Dropdown id={`brand-menu-${i}`} menu={menu} rows={rows} />
        </div>
      )}
    </li>
  );

  const divider = "relative ml-3 pl-3 before:absolute before:left-0 before:top-1/2 before:h-3.5 before:w-px before:-translate-y-1/2 before:bg-shop-250 before:content-['']";

  return (
    <div className="border-b border-black bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center px-5 md:h-[70px] md:flex-nowrap">
        <Link href="/" aria-label={`${BRAND.name} 브랜드 홈`} className="order-1 flex h-14 shrink-0 items-center md:h-auto">
          <span className="text-[26px] font-light leading-10 tracking-[0.18em] text-shop-900 md:text-[32px]">{BRAND.name}</span>
        </Link>

        <button
          type="button"
          aria-pressed={liked}
          aria-label={liked ? "브랜드 좋아요 취소" : "브랜드 좋아요"}
          onClick={() => setLiked((v) => !v)}
          className="order-2 ml-2 flex items-center gap-1 text-[13px] leading-[19px] text-shop-600"
        >
          <Heart className={cn("size-6", liked ? "fill-shop-like text-shop-like" : "text-shop-450")} strokeWidth={1.25} />
          <span>{BRAND.likes}</span>
        </button>

        <nav
          aria-label="브랜드 카테고리"
          className="scrollbar-none order-4 -mx-5 w-[calc(100%+40px)] overflow-x-auto px-3 md:order-3 md:mx-0 md:ml-6 md:w-auto md:overflow-visible md:px-0"
        >
          <div className="flex w-max items-center">
            <ul className="flex items-center">{BRAND.categories.map((menu, i) => item(menu, i, 10))}</ul>
            <ul className={divider}>
              <li className="shrink-0">
                <a href={BRAND.newIn.href} className="flex h-11 items-center px-2 text-[15px] leading-[21px] text-shop-900 md:h-[50px]">
                  {BRAND.newIn.label}
                </a>
              </li>
            </ul>
            <ul className={divider}>{item(BRAND.promotions, promoIndex, 6)}</ul>
          </div>
        </nav>

        <BrandSearch />
      </div>
    </div>
  );
}

export function ShopHeader() {
  const [searching, setSearching] = useState(false);
  const close = useCallback(() => setSearching(false), []);
  return (
    <header className="relative z-[100]">
      <TopBar onSearch={() => setSearching(true)} />
      <BrandBar />
      {searching && <TotalSearch onClose={close} />}
    </header>
  );
}
