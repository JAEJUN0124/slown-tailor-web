"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, Search, Star } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { PRODUCTS, reviewsFor } from "@/content/catalog";
import { PROMOTIONS } from "@/content/promotions";
import { MALL } from "@/content/shop";
import type { Product } from "@/content/types";
import { cn } from "@/lib/utils";
import { ProductArt } from "./ProductArt";
import { GRID } from "./ProductCard";
import { ProductListing } from "./ProductListing";
import { PromotionTile } from "./PromotionList";
import { searchHref } from "./ShopHeader";
import { Pagination } from "./ui";

const TABS = ["상품", "기획전", "이벤트", "리뷰"] as const;
const SUGGESTIONS = ["수트", "코트", "셔츠", "로퍼", "니트", "벨트"];
const REVIEW_PAGE = 10;

type Scope = "brand" | "all";

const termsOf = (q: string) => q.toLowerCase().split(/\s+/).filter(Boolean);
const hits = (p: Product, t: string) => p.name.toLowerCase().includes(t) || p.keywords.includes(t);

function NoResults({ q, scope, what = "검색 결과" }: { q: string; scope: Scope; what?: string }) {
  return (
    <div className="flex flex-col items-center py-24 text-center">
      <p className="text-[16px] leading-[24px]">
        ‘{q}’에 대한 {what}가 없습니다.
      </p>
      <p className="mt-1 text-[14px] leading-[22px] text-shop-600">철자를 확인하거나 다른 검색어로 찾아보세요.</p>
      <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label="추천 검색어">
        {SUGGESTIONS.map((s) => (
          <li key={s}>
            <Link href={searchHref(s, scope)} className="inline-flex h-8 items-center rounded-full border border-shop-250 px-4 text-[13px] transition-colors hover:border-shop-900">
              {s}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReviewResults({ products, q, scope }: { products: Product[]; q: string; scope: Scope }) {
  const [page, setPage] = useState(1);
  const rows = useMemo(() => products.slice(0, 12).flatMap((p) => reviewsFor(p).slice(0, 3).map((r) => ({ p, r }))), [products]);
  if (!rows.length) return <NoResults q={q} scope={scope} what="리뷰" />;
  return (
    <>
      <ul className="mt-5 border-t border-shop-900">
        {rows.slice((page - 1) * REVIEW_PAGE, page * REVIEW_PAGE).map(({ p, r }) => (
          <li key={r.id} className="flex gap-4 border-b border-shop-250 py-5">
            <Link href={`/product/${p.id}/`} className="relative block h-[93px] w-[70px] shrink-0 overflow-hidden" aria-label={p.name}>
              <ProductArt art={p} className="absolute inset-0" />
            </Link>
            <div className="min-w-0 flex-1">
              <Link href={`/product/${p.id}/`} className="block truncate text-[14px] font-bold leading-[20px] hover:underline">
                {p.name}
              </Link>
              <span role="img" aria-label={`5점 만점에 ${r.rating}점`} className="mt-1.5 flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} aria-hidden="true" strokeWidth={0} className={cn("size-[14px]", i < r.rating ? "fill-shop-900" : "fill-shop-250")} />
                ))}
              </span>
              <p className="mt-1.5 line-clamp-2 text-[14px] leading-[21px]">{r.text}</p>
              <p className="mt-1.5 text-[13px] text-shop-500">
                {r.user} · {r.date}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <Pagination page={page} pages={Math.ceil(rows.length / REVIEW_PAGE)} onChange={setPage} />
    </>
  );
}

function Results({ q, scope }: { q: string; scope: Scope }) {
  const router = useRouter();
  const [draft, setDraft] = useState(q);
  const [tab, setTab] = useState(0);
  const terms = useMemo(() => termsOf(q), [q]);

  const products = useMemo(() => (terms.length ? PRODUCTS.filter((p) => terms.every((t) => hits(p, t))) : []), [terms]);
  const relevance = useCallback(
    (p: Product) => terms.reduce((s, t) => s + (p.name.toLowerCase().includes(t) ? 2 : 0) + (p.keywords.includes(t) ? 1 : 0), 0) * 1e6 + p.sales,
    [terms],
  );
  const promotions = useMemo(
    () =>
      PROMOTIONS.filter((pr) =>
        terms.some((t) => `${pr.title} ${pr.headline} ${pr.block.text}`.toLowerCase().includes(t) || pr.tabs[0].products.some((p) => hits(p, t))),
      ).map(({ id, title, theme, cover }) => ({ id, title, theme, cover })),
    [terms],
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = draft.trim();
    if (next) router.push(searchHref(next, scope));
  };

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-[120px] pt-10 md:pt-20">
      <form role="search" onSubmit={submit} className="mx-auto max-w-[692px]">
        <label htmlFor="search-page-q" className="sr-only">
          검색어
        </label>
        <div className="flex h-14 items-center border border-shop-900 pl-5 pr-3">
          <input
            id="search-page-q"
            type="search"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="h-full min-w-0 flex-1 bg-transparent text-[20px] outline-none md:text-[24px] [&::-webkit-search-cancel-button]:hidden"
          />
          <button type="submit" aria-label="검색" className="flex size-10 items-center justify-center">
            <Search className="size-8" strokeWidth={1.2} />
          </button>
        </div>
        {scope === "brand" && q && (
          <Link href={searchHref(q, "all")} className="mt-2.5 inline-flex items-center text-[13px] leading-[19px] text-shop-500 underline underline-offset-2 hover:text-shop-900">
            <span className="text-shop-900">‘{q}’</span>&nbsp;에 대한 {MALL.name} {MALL.suffix} 통합 검색 결과 보기
            <ChevronRight className="size-3" strokeWidth={1.8} aria-hidden="true" />
          </Link>
        )}
      </form>

      {!q ? (
        <p className="py-24 text-center text-[16px] leading-[24px]">검색어를 입력해 주세요.</p>
      ) : (
        <>
          <h1 className="mt-[60px] text-[20px] leading-[30px] md:mt-[90px] md:text-[24px] md:leading-[34px]">
            ‘{q}’에 대한 {scope === "brand" ? "브랜드관 내 검색 결과입니다." : "통합 검색 결과입니다."}
          </h1>
          <div role="tablist" aria-label="검색 결과 종류" className="scrollbar-none mt-10 flex gap-8 overflow-x-auto border-b border-shop-250">
            {TABS.map((t, i) => (
              <button
                key={t}
                type="button"
                role="tab"
                id={`search-tab-${i}`}
                aria-controls={`search-panel-${i}`}
                aria-selected={i === tab}
                onClick={() => setTab(i)}
                className={cn(
                  "-mb-px shrink-0 border-b-[3px] pb-2.5 text-[18px] leading-[26px] md:text-[20px] md:leading-[28px]",
                  i === tab ? "border-shop-900 font-bold" : "border-transparent hover:text-shop-600",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div role="tabpanel" id="search-panel-0" aria-labelledby="search-tab-0" hidden={tab !== 0}>
            {products.length ? (
              <ProductListing
                products={products}
                defaultSort="relevance"
                sortOptions={["relevance", "new", "popular", "priceAsc", "priceDesc", "discount", "reviews"]}
                relevance={relevance}
                showBrand
                countLine
                categoryFilter
              />
            ) : (
              <NoResults q={q} scope={scope} />
            )}
          </div>
          <div role="tabpanel" id="search-panel-1" aria-labelledby="search-tab-1" hidden={tab !== 1}>
            {promotions.length ? (
              <>
                <p className="mb-5 mt-[30px] text-[16px] leading-[22px]">{promotions.length}개 기획전</p>
                <ul className={GRID[4]}>
                  {promotions.map((p) => (
                    <PromotionTile key={p.id} promotion={p} />
                  ))}
                </ul>
              </>
            ) : (
              <NoResults q={q} scope={scope} what="기획전" />
            )}
          </div>
          <div role="tabpanel" id="search-panel-2" aria-labelledby="search-tab-2" hidden={tab !== 2}>
            <NoResults q={q} scope={scope} what="이벤트" />
          </div>
          <div role="tabpanel" id="search-panel-3" aria-labelledby="search-tab-3" hidden={tab !== 3}>
            <ReviewResults products={products} q={q} scope={scope} />
          </div>
        </>
      )}
    </section>
  );
}

/**
 * Search results (reference: `/search/result?brndShopId=…&keyword=…`): search
 * box with a link to the mall-wide results, then 상품 · 기획전 · 이벤트 · 리뷰
 * tabs. `?scope=all` gives the mall-wide wording; the sample catalog is the
 * same either way.
 */
export function SearchResults() {
  const params = useSearchParams();
  const q = (params.get("q") ?? "").trim();
  const scope: Scope = params.get("scope") === "all" ? "all" : "brand";
  // A new query starts from a fresh box and the first tab.
  return <Results key={`${scope}:${q}`} q={q} scope={scope} />;
}

