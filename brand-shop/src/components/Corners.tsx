"use client";

import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { BESTSELLERS, CORNERS, NEW_IN, PICKS } from "@/content/shop";
import { cn } from "@/lib/utils";
import { CornerTabs, useRandomTab, useTabIds } from "./CornerTabs";
import { ProductArt } from "./ProductArt";
import { ProductCard } from "./ProductCard";

// Sections of the reference's `.corner-section`, top to bottom.

const GRID_4 = "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4";
const GRID_5 = "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-5";

function SectionTitle({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="mb-6 text-center text-[24px] font-bold leading-[30px] text-shop-900 lg:mb-[30px] lg:text-[32px] lg:leading-[38px]"
    >
      {children}
    </h2>
  );
}

/** Four category banners right under the key visual. */
export function Picks() {
  return (
    <section aria-label="추천 카테고리" className="mt-16 lg:mt-[100px]">
      <ul className="-mx-2 flex flex-wrap">
        {PICKS.map((pick, i) => (
          <li key={pick.title} className={cn("w-1/2 px-2 md:w-1/4", i < 2 && "mb-10 md:mb-0")}>
            <a href={pick.href} className="block">
              <div className="relative overflow-hidden pt-[133.432%]">
                <ProductArt art={pick} className="absolute inset-0" />
              </div>
              <div className="h-[84px] pt-2.5 text-[15px] leading-[21px] text-shop-900 md:pr-[23.6686%]">
                <p className="max-h-[42px] overflow-hidden font-bold">{pick.title}</p>
                <p className="max-h-[42px] overflow-hidden whitespace-pre-line">{pick.desc}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Fixed product corners: centred title + 4 × 2 grid. */
export function ProductCorners() {
  return (
    <>
      {CORNERS.map((corner) => (
        <section key={corner.id} aria-labelledby={`${corner.id}-title`} className="mt-20 lg:mt-[120px]">
          <SectionTitle id={`${corner.id}-title`}>{corner.title}</SectionTitle>
          <ul className={GRID_4}>
            {corner.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

/** Title + stacked tabs on the left, 5 × 2 grid on the right. */
export function NewIn() {
  const [active, setActive] = useRandomTab(NEW_IN.tabs.length);
  const ids = useTabIds();
  const tab = NEW_IN.tabs[active];

  return (
    <section aria-labelledby={`${ids}-title`} className="relative mt-20 lg:mt-[120px] lg:pl-[16.8571%]">
      <div className="mb-6 lg:absolute lg:left-0 lg:top-0 lg:mb-0 lg:w-[236px]">
        <h2 id={`${ids}-title`} className="text-[32px] font-bold leading-[38px] text-shop-900 lg:text-[46px] lg:leading-[52px]">
          {NEW_IN.title}
        </h2>
        <CornerTabs
          labels={NEW_IN.tabs.map((t) => t.label)}
          active={active}
          onChange={setActive}
          vertical
          idPrefix={ids}
          className="mt-4 lg:mt-[30px]"
        />
      </div>
      <ul id={`${ids}-panel`} role="tabpanel" aria-labelledby={`${ids}-tab-${active}`} className={GRID_5}>
        {tab.products.map((product) => (
          <ProductCard key={product.id} product={product} size="sm" />
        ))}
      </ul>
    </section>
  );
}

/** Ranked 4 × 2 grid with centred tabs and the ranking shortcut. */
export function Bestsellers() {
  const [active, setActive] = useRandomTab(BESTSELLERS.tabs.length);
  const ids = useTabIds();
  const tab = BESTSELLERS.tabs[active];

  return (
    <>
      <section aria-labelledby={`${ids}-title`} className="mt-20 lg:mt-[120px]">
        <SectionTitle id={`${ids}-title`}>{BESTSELLERS.title}</SectionTitle>
        <CornerTabs
          labels={BESTSELLERS.tabs.map((t) => t.label)}
          active={active}
          onChange={setActive}
          idPrefix={ids}
          className="mb-[33px]"
        />
        <ul id={`${ids}-panel`} role="tabpanel" aria-labelledby={`${ids}-tab-${active}`} className={GRID_4}>
          {tab.products.map((product, i) => (
            <ProductCard key={product.id} product={product} rank={i + 1} />
          ))}
        </ul>
      </section>
      <a
        href={BESTSELLERS.moreHref}
        className="mx-auto mt-10 flex h-11 w-[220px] items-center justify-center rounded-md border border-shop-250 pl-3.5 text-[14px] leading-[20px] text-shop-900 transition-colors hover:border-shop-900"
      >
        {BESTSELLERS.more}
        <ChevronRight className="ml-0.5 size-3" strokeWidth={1.6} aria-hidden="true" />
      </a>
    </>
  );
}
