"use client";

import { CircleQuestionMark } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { PRODUCTS, SHELVES } from "@/content/catalog";
import { BRAND, RANKING } from "@/content/shop";
import type { Product } from "@/content/types";
import { cn } from "@/lib/utils";
import { GRID, ProductCard } from "./ProductCard";
import { AGES, popularity, type Age } from "./ProductListing";
import { Dropdown } from "./ui";

const AGE_OPTIONS = AGES.map((a) => ({ value: a, label: a === "전체" ? "전체 연령" : a }));

/** Stable pseudo movement since the last update; the leader holds still. */
const movement = (p: Product, i: number) => (i === 0 ? 0 : (((p.clicks >> 3) + i) % 7) - 3);

/**
 * 판매 랭킹 (reference: `/ranking?rankSect=SALE_RANK…`): ranking type picker
 * as the title, update time with its note, age picker, shelf tabs on the
 * accent colour, then a six-up grid with rank and movement over each card.
 */
export function Ranking() {
  const [kind, setKind] = useState<string>(RANKING.kinds[0].value);
  const [age, setAge] = useState<Age>("전체");
  const [shelf, setShelf] = useState(0);
  const tipId = useId();

  const ranked = useMemo(() => {
    const key = RANKING.shelves[shelf];
    const score = (p: Product) => (kind === "sale" ? popularity(p, age) : p.clicks * (1 + ((p.sales >> AGES.indexOf(age)) % 5) / 10));
    return PRODUCTS.filter((p) => p.shelf === key && !p.soldOut).sort((a, b) => score(b) - score(a) || a.order - b.order);
  }, [kind, age, shelf]);

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-[120px] pt-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {/* The visible title is the picker, so the heading itself is for screen readers. */}
        <h1 className="sr-only">
          {RANKING.kinds.find((k) => k.value === kind)?.label} ({BRAND.name})
        </h1>
        <Dropdown
          label="랭킹 종류"
          value={kind}
          options={RANKING.kinds}
          onChange={setKind}
          align="left"
          buttonClass="text-[26px] font-normal leading-[34px] md:text-[33px] md:leading-[40px]"
          iconClass="ml-1 size-6"
          suffix={<span className="pl-2 text-[23px] md:text-[29px]">({BRAND.name})</span>}
        />
        <div className="flex items-center justify-between gap-5 md:justify-end">
          <span className="group relative flex items-center text-[15px] font-bold leading-[21px]">
            {RANKING.updated}
            <button type="button" aria-label="랭킹 기준 보기" aria-describedby={tipId} className="ml-0.5 text-shop-500 hover:text-shop-900">
              <CircleQuestionMark className="size-4" strokeWidth={1.4} />
            </button>
            <span
              role="tooltip"
              id={tipId}
              className="invisible absolute right-0 top-7 z-30 w-max max-w-[280px] border border-shop-900 bg-white p-6 font-normal opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
            >
              <span className="mb-1 block text-[13px] font-bold leading-[20px]">{RANKING.tip.title}</span>
              {RANKING.tip.lines.map((l) => (
                <span key={l} className="block text-[13px] leading-[22px]">
                  {l}
                </span>
              ))}
            </span>
          </span>
          <Dropdown label="연령" value={age} options={AGE_OPTIONS} onChange={(v) => setAge(v as Age)} buttonClass="text-[15px] leading-[21px]" />
        </div>
      </div>

      <div role="tablist" aria-label="랭킹 분류" className="mb-10 mt-10 flex border-y border-shop-250">
        {RANKING.shelves.map((s, i) => (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={i === shelf}
            onClick={() => setShelf(i)}
            className={cn(
              "h-[60px] flex-1 text-[16px] leading-[22px] transition-colors md:w-[102px] md:flex-none md:text-[17px] md:leading-[23px]",
              i === shelf ? "bg-shop-accent font-bold text-white" : "text-shop-900 hover:bg-shop-100",
            )}
          >
            {s === "shoes-acc" ? "슈즈＆잡화" : SHELVES[s].label}
          </button>
        ))}
      </div>

      <ul className={GRID[6]} aria-label={`${SHELVES[RANKING.shelves[shelf]].label} 랭킹`}>
        {ranked.map((p, i) => (
          <ProductCard key={p.id} product={p} size="sm" rank={i + 1} rankChange={movement(p, i)} showChips />
        ))}
      </ul>
    </section>
  );
}
