"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { searchProducts, sortProducts } from "@/content/catalog";
import { BRAND } from "@/content/site";
import { toast } from "@/lib/store";
import { ProductCard } from "./ProductCard";

/**
 * Search results (reference: /product/search.html?keyword=…): a
 * "BRAND > SEARCH > [keyword]" trail with the item count on the right, then
 * the list cards. The keyword can be edited in the trail.
 */
export function SearchResults() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const read = () => {
      const k = new URLSearchParams(window.location.search).get("keyword") ?? "";
      setKeyword(k);
      setDraft(k);
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const results = sortProducts(searchProducts(keyword), "popular");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const k = draft.trim().toLowerCase();
    if (!k) {
      toast("검색어를 입력해 주세요.");
      return;
    }
    setKeyword(k);
    router.replace(`/search/?keyword=${encodeURIComponent(k)}`);
  };

  return (
    <div className="pb-10 pt-[60px]">
      <div className="mx-[18px] flex items-center justify-between border-b border-st-ink pb-2.5 xl:mx-7">
        <form role="search" onSubmit={onSubmit} className="flex min-w-0 items-center text-[13px] uppercase leading-[18px] tracking-normal text-st-ink">
          <span>{BRAND.short}</span>
          <ChevronRight className="mx-1.5 size-3.5" strokeWidth={1.2} aria-hidden="true" />
          <span>Search</span>
          <ChevronRight className="mx-1.5 size-3.5" strokeWidth={1.2} aria-hidden="true" />
          <label htmlFor="search-keyword" className="sr-only">
            검색어
          </label>
          <input id="search-keyword" value={draft} onChange={(e) => setDraft(e.target.value)} className="w-[120px] min-w-0 bg-transparent text-[13px] outline-none focus:bg-st-field" />
        </form>
        <p className="shrink-0 text-[13px] uppercase leading-[18px] tracking-normal text-st-ink">
          <strong>{results.length}</strong> Items
        </p>
      </div>

      {results.length ? (
        <div className="mt-[30px] grid grid-cols-2 gap-x-[3.2vw] gap-y-[4vw] xl:mx-7 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-[3.6vw]">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="mx-[18px] mt-[26px] min-h-[300px] text-[13px] uppercase tracking-normal text-[#9f9f9f] xl:mx-7">No result</p>
      )}
    </div>
  );
}
