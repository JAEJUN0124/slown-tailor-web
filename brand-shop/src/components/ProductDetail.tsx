"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { SHELVES, subLabel, type Question, type Review } from "@/content/catalog";
import { BRAND } from "@/content/shop";
import type { Product } from "@/content/types";
import { recordView } from "@/lib/store";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { BuyPanel, useBuy } from "./ProductBuy";
import { ProductGallery } from "./ProductGallery";
import { ProductInfoPanel, type Related } from "./ProductInfoPanel";
import { ProductQna } from "./ProductQna";
import { ProductReviews } from "./ProductReviews";
import { ProductSummary } from "./ProductSummary";
import { Breadcrumb, SaveButton, ShareButton, TabRects } from "./ui";

/** Server-rendered blocks the tabs place: size chart, product notice, delivery guide. */
export type ProductGuides = { size: ReactNode; notice: ReactNode; delivery: ReactNode };

/**
 * Product page (reference: `/{brand}/{goodsNo}/good`): breadcrumb with wish
 * and share, gallery + info column, then a sticky four-tab bar. Once the buy
 * buttons scroll away a floating "구매하기" tab opens the option panel.
 */
export function ProductDetail({
  product: p,
  related,
  reviews,
  questions,
  guides,
}: {
  product: Product;
  related: Related;
  reviews: Review[];
  questions: Question[];
  guides: ProductGuides;
}) {
  const buy = useBuy(p);
  const [tab, setTab] = useState(0);
  const [floating, setFloating] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => recordView(p.id), [p.id]);

  // The summary ends with the buy buttons. Watching the whole block (on screen at
  // load) rather than the buttons also catches jumps straight past them.
  useEffect(() => {
    const el = summaryRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setFloating(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /** Switch tabs; bring the bar back to the top if the reader is below it. */
  const showTab = (i: number, always = false) => {
    setTab(i);
    const el = tabsRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (always || window.scrollY > top) window.scrollTo({ top, behavior: always && !reduced ? "smooth" : "auto" });
  };

  const shelf = SHELVES[p.shelf];
  const trail = p.outlet
    ? [
        { label: "아울렛", href: "/list/outlet/" },
        { label: shelf.label, href: `/list/outlet/${p.shelf}/` },
      ]
    : [
        { label: shelf.label, href: `/list/${p.shelf}/` },
        { label: subLabel(p), href: `/list/${p.shelf}/${p.sub}/` },
      ];
  const tabs = ["상품정보", "사이즈", `리뷰 ${reviews.length}`, `문의 ${questions.length}`];

  return (
    <>
      <Breadcrumb
        items={[{ label: BRAND.name, href: "/" }, ...trail]}
        end={
          <div className="flex shrink-0 items-center gap-4">
            <SaveButton kind="wish" />
            <ShareButton />
          </div>
        }
      />
      <div className="mx-auto max-w-[1440px] px-5 pb-[120px]">
        <article ref={summaryRef} className="mt-6 flex flex-col gap-10 lg:mt-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 lg:w-[53.57%]">
            <ProductGallery product={p} />
          </div>
          <ProductSummary product={p} buy={buy} reviewCount={reviews.length} onReviews={() => showTab(2, true)} />
        </article>

        <div ref={tabsRef} className="mt-20 lg:mt-[120px]">
          <TabRects tabs={tabs} active={tab} onChange={(i) => showTab(i)} sticky label="상품 상세 정보" idPrefix="pdp" />
          <div role="tabpanel" id="pdp-panel-0" aria-labelledby="pdp-tab-0" hidden={tab !== 0}>
            <ProductInfoPanel product={p} related={related} onSizeGuide={() => showTab(1, true)} />
            {guides.notice}
            {guides.delivery}
          </div>
          <div role="tabpanel" id="pdp-panel-1" aria-labelledby="pdp-tab-1" hidden={tab !== 1} className="pt-[60px] md:pt-[150px]">
            {guides.size}
          </div>
          <div role="tabpanel" id="pdp-panel-2" aria-labelledby="pdp-tab-2" hidden={tab !== 2}>
            <ProductReviews product={p} reviews={reviews} />
          </div>
          <div role="tabpanel" id="pdp-panel-3" aria-labelledby="pdp-tab-3" hidden={tab !== 3}>
            <ProductQna questions={questions} />
            {guides.delivery}
          </div>
        </div>
      </div>
      <BuyPanel product={p} buy={buy} visible={floating} />
    </>
  );
}
