"use client";

import { useRef, useState } from "react";
import type { Promotion } from "@/content/promotions";
import { GRID, ProductCard } from "./ProductCard";
import { TabRects } from "./ui";

/** Sticky black tab bar over the promotion's six-up product grid. */
export function PromotionGoods({ tabs }: { tabs: Promotion["tabs"] }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const change = (i: number) => {
    setActive(i);
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY > top) window.scrollTo({ top });
  };

  return (
    <div ref={ref}>
      <TabRects tabs={tabs.map((t) => t.label)} active={active} onChange={change} sticky label="기획전 상품 분류" idPrefix="promo" />
      {tabs.map((t, i) => (
        <div key={t.label} role="tabpanel" id={`promo-panel-${i}`} aria-labelledby={`promo-tab-${i}`} hidden={i !== active} className="pt-10">
          <ul className={GRID[6]}>
            {t.products.map((p) => (
              <ProductCard key={p.id} product={p} size="sm" showChips />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
