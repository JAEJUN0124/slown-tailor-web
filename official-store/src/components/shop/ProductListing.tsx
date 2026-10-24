"use client";

import { Plus, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SceneArt } from "@/components/art/SceneArt";
import { SORTS, sortProducts, type SortKey } from "@/content/catalog";
import type { Product, Scene } from "@/content/types";
import { cn } from "@/lib/utils";
import { Pagination } from "./Pagination";
import { ProductCard } from "./ProductCard";

const PER_PAGE = 12;

/** Sort and page live in the query string (?sort=new&page=2), like the reference's sort_method/page. */
function useListQuery() {
  const [state, setState] = useState<{ sort?: SortKey; page: number }>({ page: 1 });

  useEffect(() => {
    const read = () => {
      const q = new URLSearchParams(window.location.search);
      const sort = SORTS.find((s) => s.key === q.get("sort"))?.key;
      setState({ sort, page: Math.max(1, Number(q.get("page")) || 1) });
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const update = useCallback((next: { sort?: SortKey; page: number }) => {
    setState(next);
    const q = new URLSearchParams(window.location.search);
    if (next.sort) q.set("sort", next.sort);
    else q.delete("sort");
    if (next.page > 1) q.set("page", String(next.page));
    else q.delete("page");
    const qs = q.toString();
    window.history.pushState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  }, []);

  return [state, update] as const;
}

/**
 * Count, sort control, card grid and paging of a list screen. The feature
 * tile (category photo + title) opens the desktop grid across two columns and
 * two rows.
 */
export function ProductListing({ products, feature }: { products: Product[]; feature?: { title: string; scene: Scene } }) {
  const [{ sort, page }, setQuery] = useListQuery();
  const [expanded, setExpanded] = useState(false);
  const [sheet, setSheet] = useState(false);
  const top = useRef<HTMLDivElement>(null);

  const sorted = sortProducts(products, sort);
  const pages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const current = Math.min(page, pages);
  const shown = sorted.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const pickSort = (key: SortKey) => {
    setQuery({ sort: key, page: 1 });
    setSheet(false);
  };
  const goPage = (p: number) => {
    setQuery({ sort, page: p });
    top.current?.scrollIntoView({ block: "start" });
  };

  const sortButtons = (cls: string) =>
    SORTS.map((s, i) => (
      <li
        key={s.key}
        className={cn("transition-[opacity,transform] duration-200 ease-in-out xl:translate-x-0.5 xl:opacity-0", expanded && "xl:translate-x-0 xl:opacity-100")}
        style={expanded ? { transitionDelay: `${i ? 0.1 + i * 0.02 : 0}s` } : undefined}
      >
        <button type="button" aria-pressed={sort === s.key} onClick={() => pickSort(s.key)} className={cn(cls, sort === s.key && "underline underline-offset-[6px]")}>
          {s.label}
        </button>
      </li>
    ));

  return (
    <div ref={top} className="scroll-mt-12">
      {/* Count and sort (reference: .product__options) */}
      <div className="flex items-center justify-between px-[3.2vw] py-[4.27vw] xl:mx-7 xl:h-[74px] xl:border-t-[0.5px] xl:border-st-ink xl:px-0 xl:py-0">
        <p className="text-[3.73vw] leading-[1.6] text-st-ink xl:text-[16px]">{products.length}개 제품</p>
        <button type="button" onClick={() => setSheet(true)} className="flex items-center gap-[0.53vw] text-[3.73vw] leading-[1.6] text-st-ink xl:hidden">
          <Plus className="size-[3.2vw]" strokeWidth={1.5} aria-hidden="true" />
          필터
        </button>
        <div className="hidden items-center xl:flex">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="sort-list"
            onClick={() => setExpanded((e) => !e)}
            className={cn(
              "relative text-[16px] leading-[1.6] text-st-ink",
              expanded && "mr-5 pr-10 after:absolute after:right-0 after:top-1/2 after:h-3 after:w-px after:-translate-y-1/2 after:bg-st-ink",
            )}
          >
            필터
          </button>
          <div id="sort-list" className={cn("overflow-hidden transition-[width] duration-300 ease-linear", expanded ? "w-[369px]" : "w-0")}>
            <ul className="flex whitespace-nowrap">{sortButtons("flex items-center px-5 text-[16px] leading-[1.6] text-st-ink")}</ul>
          </div>
        </div>
      </div>

      {/* Grid (reference: .product__items) */}
      {shown.length ? (
        <div className="grid grid-cols-2 gap-x-[3.2vw] gap-y-[4vw] xl:mx-7 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-[3.6vw]">
          {feature && (
            <div className="relative col-span-2 row-span-2 hidden overflow-hidden xl:block">
              <SceneArt scene={feature.scene} className="absolute inset-0" focus={[50, 0]} />
              <p className="absolute left-0 top-0 z-[2] py-9 pl-7 text-[24px] leading-[1.6] tracking-[-0.02em] text-st-ink">{feature.title}</p>
            </div>
          )}
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="px-[3.2vw] py-24 text-center text-[14px] text-st-mute xl:px-7">조건에 맞는 제품이 아직 없습니다. 다른 카테고리를 둘러보세요.</p>
      )}

      <Pagination page={current} pages={pages} onPage={goPage} className="mb-[13.33vw] mt-[13.33vw] xl:mb-0 xl:mt-[30px] xl:pb-[30px]" />

      {/* Mobile sort sheet (reference: .product__options--ver2 .filter-area) */}
      <div
        className={cn("fixed inset-0 z-[150] bg-[rgb(245_245_245/0.55)] backdrop-blur-[3px] transition-opacity duration-300 xl:hidden", sheet ? "opacity-100" : "pointer-events-none opacity-0")}
        onClick={() => setSheet(false)}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="필터"
        className={cn(
          "fixed inset-x-0 bottom-0 z-[160] bg-white transition-[opacity,transform] duration-300 ease-in-out xl:hidden",
          sheet ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[100px] opacity-0",
        )}
      >
        <div className="flex items-center justify-between px-[5.33vw] pb-[5.33vw] pt-[8vw]">
          <h3 className="text-[3.73vw] leading-[1.6] text-st-ink">필터</h3>
          <button type="button" aria-label="필터 닫기" onClick={() => setSheet(false)} className="flex size-[4.27vw] items-center justify-center">
            <X className="size-[3.2vw]" strokeWidth={1.4} />
          </button>
        </div>
        <ul>
          {SORTS.map((s) => (
            <li key={s.key}>
              <button
                type="button"
                aria-pressed={sort === s.key}
                onClick={() => pickSort(s.key)}
                className={cn("block w-full py-[5.33vw] text-center text-[3.73vw] leading-[1.6] text-st-ink", sort === s.key && "underline underline-offset-4")}
              >
                {s.label}
              </button>
            </li>
          ))}
          <li className="flex justify-center pb-[8vw] pt-[5.33vw]">
            <button type="button" onClick={() => setSheet(false)} className="h-[11.73vw] w-[89.33vw] bg-st-ink text-[3.73vw] text-white">
              닫기
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
