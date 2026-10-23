"use client";

import Link from "next/link";
import { useState } from "react";
import { PROMOTION_THEMES, type PromotionTheme } from "@/content/promotions";
import { BRAND, MALL } from "@/content/shop";
import type { Art } from "@/content/types";
import { cn } from "@/lib/utils";
import { ProductArt } from "./ProductArt";
import { GRID } from "./ProductCard";
import { Dropdown, Pagination } from "./ui";

export type PromotionCard = { id: string; title: string; theme: PromotionTheme; cover: Art };

const ALL = "all";
const BRANDS = [
  { value: ALL, label: "전체 브랜드" },
  { value: BRAND.name, label: BRAND.name },
  ...MALL.sisterShops.map((s) => ({ value: s.label, label: s.label })),
];
const THEMES = [{ value: ALL, label: "모든 테마" }, ...PROMOTION_THEMES.map((t) => ({ value: t, label: t }))];

const PAGE = 12;

/** 3:4 cover + brand + title (also used by the search results). */
export function PromotionTile({ promotion: p }: { promotion: PromotionCard }) {
  return (
    <li>
      <Link href={`/promotions/${p.id}/`} className="group block">
        <span className="relative block overflow-hidden pt-[133.5%]">
          <ProductArt art={p.cover} className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]" />
        </span>
        <span className="mt-2.5 block text-[15px] font-bold leading-[21px]">{BRAND.name}</span>
        <span className="block text-[15px] leading-[21px]">{p.title}</span>
      </Link>
    </li>
  );
}

/**
 * 기획전 list (reference: `/special/list`): brand and theme pickers on the
 * right, then four 3:4 cards per row. Arriving from the brand shop, the brand
 * picker starts on SLOWN. The other brands have no sample promotions.
 */
export function PromotionList({ items }: { items: PromotionCard[] }) {
  const [brand, setBrand] = useState<string>(BRAND.name);
  const [theme, setTheme] = useState<string>(ALL);
  const [page, setPage] = useState(1);

  const list = items.filter((p) => (brand === ALL || brand === BRAND.name) && (theme === ALL || p.theme === theme));
  const pick = (set: (v: string) => void) => (v: string) => {
    set(v);
    setPage(1);
  };

  return (
    <>
      <div className="flex justify-end gap-8 md:gap-10">
        <Dropdown label="브랜드" value={brand} options={BRANDS} onChange={pick(setBrand)} buttonClass="text-[15px] font-bold leading-[21px]" />
        <Dropdown label="테마" value={theme} options={THEMES} onChange={pick(setTheme)} buttonClass="text-[15px] font-bold leading-[21px]" />
      </div>
      {list.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-[16px] leading-[24px]">진행 중인 기획전이 없습니다.</p>
          <p className="mt-1 text-[14px] leading-[22px] text-shop-600">다른 브랜드나 테마를 골라 보세요.</p>
          <button
            type="button"
            onClick={() => {
              setBrand(ALL);
              setTheme(ALL);
            }}
            className="mt-6 h-9 w-[220px] rounded-md border border-shop-250 text-[14px] transition-colors hover:border-shop-900"
          >
            전체 기획전 보기
          </button>
        </div>
      ) : (
        <ul className={cn("mt-[30px]", GRID[4])}>
          {list.slice((page - 1) * PAGE, page * PAGE).map((p) => (
            <PromotionTile key={p.id} promotion={p} />
          ))}
        </ul>
      )}
      <Pagination page={page} pages={Math.ceil(list.length / PAGE)} onChange={setPage} className="mt-[60px]" />
    </>
  );
}
