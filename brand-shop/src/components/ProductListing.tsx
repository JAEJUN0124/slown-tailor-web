"use client";

import { ArrowUpDown, ChevronDown, ChevronUp, RotateCcw, X } from "lucide-react";
import { useMemo, useRef, useState, type ReactNode } from "react";
import { SHELVES, subLabel } from "@/content/catalog";
import type { Product } from "@/content/types";
import { useDismiss } from "@/lib/useDismiss";
import { cn, won } from "@/lib/utils";
import { discountRate, GRID, ProductCard } from "./ProductCard";
import { Checkbox, Pagination } from "./ui";

// Filter bar + sort menu + grid + pages of the reference's list screens
// (`.list-leadin`, `.filtering`, `.sorting`). The reference asks the server
// for each change; here the same controls filter the sample data in place.

type FilterKey = "category" | "price" | "size" | "color" | "benefit";

const FILTER_LABEL: Record<FilterKey, string> = { category: "카테고리", price: "가격", size: "사이즈", color: "색상", benefit: "혜택/배송" };

const categoryOf = (p: Product) => `${p.shelf}/${p.sub}`;

export type SortKey = "relevance" | "new" | "popular" | "priceAsc" | "priceDesc" | "discount" | "reviews" | "md";

const SORT_LABEL: Record<SortKey, string> = {
  relevance: "정확도순",
  new: "신상품순",
  popular: "인기상품순",
  priceAsc: "낮은가격순",
  priceDesc: "높은가격순",
  discount: "높은할인율순",
  reviews: "구매후기순",
  md: "MD추천순",
};

export const AGES = ["전체", "10ㆍ20대", "30대", "40대", "50대이상"] as const;
export type Age = (typeof AGES)[number];

const BENEFITS: { key: string; label: string; test: (p: Product) => boolean }[] = [
  { key: "soldout", label: "품절 제외", test: (p) => !p.soldOut },
  { key: "membership", label: "멤버십포인트 사용", test: (p) => !p.outlet },
  { key: "gift", label: "기프트포인트 사용", test: (p) => !p.outlet },
  { key: "free", label: "무료배송", test: (p) => p.price >= 39900 },
  { key: "fast", label: "빠른배송", test: (p) => p.fastShipping },
  { key: "pickup", label: "매장픽업 가능", test: (p) => p.pickup },
  { key: "wrap", label: "무료포장", test: (p) => p.giftWrap },
];

const SIZE_GROUPS: { label: string; kinds: Product["kind"][] }[] = [
  { label: "상의·아우터", kinds: ["suit", "jacket", "coat", "shirt", "knit", "dress"] },
  { label: "하의", kinds: ["trousers", "skirt"] },
  { label: "슈즈", kinds: ["shoes", "pump"] },
  { label: "기타", kinds: ["belt", "tie", "bowtie", "square", "cufflinks", "bag", "case", "wallet"] },
];

/** Popularity shifts a little per age band so the sub-sorts differ. */
export function popularity(p: Product, age: Age = "전체") {
  const i = AGES.indexOf(age);
  return i <= 0 ? p.sales : p.sales * (1 + (((p.clicks >> (i * 2)) % 7) - 3) / 10);
}

export function sortProducts(list: Product[], sort: SortKey, age: Age = "전체", relevance?: (p: Product) => number) {
  const out = [...list];
  const by = (f: (p: Product) => number) => out.sort((a, b) => f(b) - f(a) || a.order - b.order);
  switch (sort) {
    case "relevance":
      return relevance ? by(relevance) : out;
    case "new":
      return by((p) => (p.isNew ? 1e6 : 0) - p.order);
    case "popular":
      return by((p) => popularity(p, age));
    case "priceAsc":
      return by((p) => -p.price);
    case "priceDesc":
      return by((p) => p.price);
    case "discount":
      return by((p) => discountRate(p));
    case "reviews":
      return by((p) => p.reviews ?? 0);
    case "md":
      return out.sort((a, b) => a.order - b.order);
  }
}

/** Up to six price bands from the list's own prices, rounded to 10,000원. */
function priceBands(list: Product[]) {
  const prices = [...new Set(list.map((p) => p.price))].sort((a, b) => a - b);
  if (prices.length < 2) return [];
  const n = Math.min(6, prices.length - 1);
  const cut = (i: number) => Math.round(prices[Math.floor((i * (prices.length - 1)) / n)] / 10000) * 10000;
  const bands: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const lo = i === 0 ? prices[0] : cut(i);
    const hi = i === n - 1 ? prices[prices.length - 1] : cut(i + 1);
    if (hi > lo) bands.push([lo, hi]);
  }
  return bands;
}

function SortMenu({
  options,
  sort,
  age,
  onChange,
}: {
  options: SortKey[];
  sort: SortKey;
  age: Age;
  onChange: (sort: SortKey, age: Age) => void;
}) {
  const [open, setOpen] = useState(false);
  const [ages, setAges] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(ref, open, () => setOpen(false));
  const label = sort === "popular" ? `${SORT_LABEL.popular}(${age})` : SORT_LABEL[sort];

  const choose = (s: SortKey, a: Age = "전체") => {
    onChange(s, a);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-0.5 text-[14px] leading-[20px] text-shop-900"
      >
        {label}
        <ArrowUpDown className="size-4" strokeWidth={1.4} aria-hidden="true" />
      </button>
      {open && (
        <ul className="absolute right-0 top-[46px] z-30 min-w-[150px] space-y-3 rounded-md border border-shop-250 bg-white p-5 text-[14px] leading-[20px]">
          {options.map((o) => (
            <li key={o}>
              {o === "popular" ? (
                <>
                  <span className="flex items-center justify-between gap-2">
                    <button type="button" onClick={() => choose("popular")} className={cn("whitespace-nowrap", sort === o ? "font-bold text-shop-900" : "text-shop-600")}>
                      {SORT_LABEL[o]}
                    </button>
                    <button type="button" aria-label="연령대 펼치기" aria-expanded={ages} onClick={() => setAges((v) => !v)} className="text-shop-600">
                      <ChevronDown className={cn("size-4 transition-transform", ages && "rotate-180")} strokeWidth={1.4} />
                    </button>
                  </span>
                  {ages && (
                    <ul className="mt-3 space-y-3 pl-3">
                      {AGES.map((a) => (
                        <li key={a}>
                          <button type="button" onClick={() => choose("popular", a)} className={cn("whitespace-nowrap", sort === "popular" && age === a ? "text-shop-accent" : "text-shop-600")}>
                            {a}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <button type="button" onClick={() => choose(o)} className={cn("whitespace-nowrap", sort === o ? "font-bold text-shop-900" : "text-shop-600")}>
                  {SORT_LABEL[o]}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const chip = "inline-flex h-8 items-center gap-1 rounded-full border border-shop-250 bg-white pl-3 pr-2 text-[13px] text-shop-900";

export function ProductListing({
  products,
  defaultSort = "new",
  sortOptions = ["new", "popular", "priceAsc", "priceDesc", "discount", "reviews", "md"],
  showSort = true,
  showBrand = false,
  pageSize = 24,
  relevance,
  countLine = false,
  empty,
  categoryFilter = false,
}: {
  products: Product[];
  defaultSort?: SortKey;
  sortOptions?: SortKey[];
  showSort?: boolean;
  showBrand?: boolean;
  pageSize?: number;
  relevance?: (p: Product) => number;
  /** Search shows "N개 상품" above the grid. */
  countLine?: boolean;
  empty?: ReactNode;
  /** Search adds a 카테고리 filter in front of the others. */
  categoryFilter?: boolean;
}) {
  const [panel, setPanel] = useState<FilterKey | null>(null);
  const [band, setBand] = useState<[number, number] | null>(null);
  const [custom, setCustom] = useState({ min: "", max: "" });
  const [sizes, setSizes] = useState<string[]>([]);
  const [sizeGroup, setSizeGroup] = useState(0);
  const [colors, setColors] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [cats, setCats] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>(defaultSort);
  const [age, setAge] = useState<Age>("전체");
  const [page, setPage] = useState(1);
  const top = useRef<HTMLDivElement>(null);

  const bands = useMemo(() => priceBands(products), [products]);
  const groups = useMemo(
    () =>
      SIZE_GROUPS.map((g) => ({
        label: g.label,
        sizes: [...new Set(products.filter((p) => g.kinds.includes(p.kind)).flatMap((p) => p.sizes))],
      })).filter((g) => g.sizes.length),
    [products],
  );
  const colorOptions = useMemo(() => [...new Map(products.map((p) => [p.colorKo, p.color])).entries()], [products]);
  const catOptions = useMemo(
    () => [...new Map(products.map((p) => [categoryOf(p), `${SHELVES[p.shelf].label} > ${subLabel(p)}`])).entries()],
    [products],
  );
  const catLabel = (key: string) => catOptions.find(([k]) => k === key)?.[1] ?? key;

  const filtered = useMemo(() => {
    const list = products.filter(
      (p) =>
        (!cats.length || cats.includes(categoryOf(p))) &&
        (!band || (p.price >= band[0] && p.price <= band[1])) &&
        (!sizes.length || p.sizes.some((s) => sizes.includes(s))) &&
        (!colors.length || colors.includes(p.colorKo)) &&
        benefits.every((b) => BENEFITS.find((x) => x.key === b)!.test(p)),
    );
    return sortProducts(list, sort, age, relevance);
  }, [products, cats, band, sizes, colors, benefits, sort, age, relevance]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const shown = filtered.slice((current - 1) * pageSize, current * pageSize);

  const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const reset = () => {
    setCats([]);
    setBand(null);
    setCustom({ min: "", max: "" });
    setSizes([]);
    setColors([]);
    setBenefits([]);
    setPage(1);
  };
  const go = (p: number) => {
    setPage(p);
    top.current?.scrollIntoView({ block: "start" });
  };

  const selected: { label: string; clear: () => void }[] = [
    ...cats.map((c) => ({ label: catLabel(c), clear: () => setCats((l) => l.filter((x) => x !== c)) })),
    ...(band ? [{ label: `${won(band[0])} ~ ${won(band[1])}원`, clear: () => setBand(null) }] : []),
    ...sizes.map((s) => ({ label: s, clear: () => setSizes((l) => l.filter((x) => x !== s)) })),
    ...colors.map((c) => ({ label: c, clear: () => setColors((l) => l.filter((x) => x !== c)) })),
    ...benefits.map((b) => ({ label: BENEFITS.find((x) => x.key === b)!.label, clear: () => setBenefits((l) => l.filter((x) => x !== b)) })),
  ];

  const applyCustom = () => {
    const min = Number(custom.min.replace(/\D/g, "")) || 0;
    const max = Number(custom.max.replace(/\D/g, "")) || Number.MAX_SAFE_INTEGER;
    setBand([Math.min(min, max), Math.max(min, max)]);
    setPage(1);
  };

  return (
    <div ref={top} className="scroll-mt-4">
      <div className="relative z-[11] mb-[30px] mt-5">
        <div className="flex items-start justify-between gap-4">
          <div role="tablist" aria-label="상품 필터" className="flex flex-wrap gap-1.5">
            {(Object.keys(FILTER_LABEL) as FilterKey[])
              .filter((k) => k !== "category" || categoryFilter)
              .map((k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={panel === k}
                  aria-controls={`filter-${k}`}
                  onClick={() => setPanel((v) => (v === k ? null : k))}
                  className={cn(
                    "flex h-9 items-center gap-0.5 rounded-md border border-shop-250 pl-[15px] pr-2.5 text-[14px] leading-[20px] text-shop-900",
                    panel === k && "font-bold",
                  )}
                >
                  {FILTER_LABEL[k]}
                  {panel === k ? <ChevronUp className="size-3" strokeWidth={1.8} aria-hidden="true" /> : <ChevronDown className="size-3" strokeWidth={1.8} aria-hidden="true" />}
                </button>
              ))}
          </div>
          {showSort && (
            <SortMenu
              options={sortOptions}
              sort={sort}
              age={age}
              onChange={(s, a) => {
                setSort(s);
                setAge(a);
                setPage(1);
              }}
            />
          )}
        </div>

        {panel && (
          <div id={`filter-${panel}`} role="tabpanel" className="mt-[15px] bg-shop-150 px-[30px] pb-2.5 pt-[30px]">
            {panel === "category" && (
              <ul className="grid grid-cols-1 gap-y-5 pb-5 sm:grid-cols-2 lg:grid-cols-4">
                {catOptions.map(([key, label]) => (
                  <li key={key}>
                    <Checkbox
                      checked={cats.includes(key)}
                      onChange={() => {
                        setCats((l) => toggle(l, key));
                        setPage(1);
                      }}
                    >
                      {label}
                    </Checkbox>
                  </li>
                ))}
              </ul>
            )}
            {panel === "price" && (
              <div className="flex flex-col gap-4 pb-5 lg:flex-row lg:items-start lg:justify-between">
                <ul className="flex flex-wrap gap-x-8 gap-y-4">
                  {bands.map(([lo, hi]) => {
                    const on = band?.[0] === lo && band?.[1] === hi;
                    return (
                      <li key={lo}>
                        <label className="inline-flex cursor-pointer items-center gap-2 text-[15px] leading-[21px]">
                          <input
                            type="radio"
                            name="price-band"
                            checked={on}
                            onChange={() => {
                              setBand([lo, hi]);
                              setPage(1);
                            }}
                            className="peer sr-only"
                          />
                          <span className={cn("flex size-[22px] items-center justify-center rounded-full border bg-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-shop-900", on ? "border-shop-accent" : "border-shop-250")}>
                            {on && <span className="size-2.5 rounded-full bg-shop-accent" />}
                          </span>
                          {won(lo)} ~ {won(hi)}원
                        </label>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex shrink-0 items-center gap-2">
                  {(["min", "max"] as const).map((k, i) => (
                    <span key={k} className="flex items-center gap-2">
                      {i === 1 && <span aria-hidden="true">~</span>}
                      <label className="flex h-9 w-[130px] items-center rounded-md border border-shop-250 bg-white px-3 text-[14px]">
                        <span className="sr-only">{k === "min" ? "최소 금액" : "최대 금액"}</span>
                        <input
                          inputMode="numeric"
                          value={custom[k]}
                          onChange={(e) => setCustom((c) => ({ ...c, [k]: e.target.value.replace(/[^\d,]/g, "") }))}
                          className="w-full min-w-0 bg-transparent text-right outline-none"
                        />
                        <span className="ml-1 text-shop-500">원</span>
                      </label>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={applyCustom}
                    disabled={!custom.min && !custom.max}
                    className="h-9 rounded-md bg-shop-900 px-6 text-[14px] text-white disabled:bg-shop-250 disabled:text-white"
                  >
                    적용
                  </button>
                </div>
              </div>
            )}
            {panel === "size" && (
              <div className="-mx-[30px] -mt-[30px]">
                <div role="tablist" aria-label="사이즈 그룹" className="flex gap-6 border-b border-white px-[30px] pt-5">
                  {groups.map((g, i) => (
                    <button
                      key={g.label}
                      type="button"
                      role="tab"
                      aria-selected={i === sizeGroup}
                      onClick={() => setSizeGroup(i)}
                      className={cn("relative pb-4 text-[17px] font-bold leading-[23px]", i === sizeGroup ? "text-shop-900 after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-full after:bg-shop-900 after:content-['']" : "text-shop-450")}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
                <ul className="grid grid-cols-2 gap-y-5 px-[30px] pb-5 pt-[30px] sm:grid-cols-4">
                  {groups[Math.min(sizeGroup, groups.length - 1)]?.sizes.map((s) => (
                    <li key={s}>
                      <Checkbox
                        checked={sizes.includes(s)}
                        onChange={() => {
                          setSizes((l) => toggle(l, s));
                          setPage(1);
                        }}
                      >
                        {s}
                      </Checkbox>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {panel === "color" && (
              <ul className="flex flex-wrap gap-6 pb-5">
                {colorOptions.map(([name, hex]) => {
                  const on = colors.includes(name);
                  return (
                    <li key={name}>
                      <button
                        type="button"
                        aria-pressed={on}
                        title={name}
                        onClick={() => {
                          setColors((l) => toggle(l, name));
                          setPage(1);
                        }}
                        className={cn("flex size-[30px] items-center justify-center rounded-md border", on ? "border-shop-900 ring-2 ring-shop-900 ring-offset-2 ring-offset-shop-150" : "border-black/10")}
                        style={{ background: hex }}
                      >
                        <span className="sr-only">{name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            {panel === "benefit" && (
              <ul className="grid grid-cols-1 gap-y-5 pb-5 sm:grid-cols-2 lg:grid-cols-4">
                {BENEFITS.map((b) => (
                  <li key={b.key}>
                    <Checkbox
                      checked={benefits.includes(b.key)}
                      onChange={() => {
                        setBenefits((l) => toggle(l, b.key));
                        setPage(1);
                      }}
                    >
                      {b.label}
                    </Checkbox>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {selected.length > 0 && (
          <div className="relative mt-px flex min-h-[50px] flex-wrap items-center gap-2 bg-shop-150 py-2.5 pl-[30px] pr-[62px]">
            {selected.map((s) => (
              <button key={s.label} type="button" onClick={s.clear} className={chip} aria-label={`${s.label} 필터 해제`}>
                {s.label}
                <X className="size-3.5 text-shop-600" strokeWidth={1.8} aria-hidden="true" />
              </button>
            ))}
            <button type="button" onClick={reset} aria-label="필터 초기화" className="absolute right-[30px] top-1/2 flex size-5 -translate-y-1/2 items-center justify-center text-shop-600">
              <RotateCcw className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>

      {countLine && <p className="mb-5 text-[16px] leading-[22px] text-shop-900">{filtered.length}개 상품</p>}

      {shown.length ? (
        <ul className={GRID[6]}>
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} size="sm" showBrand={showBrand} showChips />
          ))}
        </ul>
      ) : (
        (empty ?? (
          <div className="flex flex-col items-center py-24 text-center">
            <p className="text-[16px] text-shop-900">조건에 맞는 상품이 없습니다.</p>
            <p className="mt-1 text-[14px] text-shop-600">필터를 줄이거나 초기화해 보세요.</p>
            <button type="button" onClick={reset} className="mt-6 flex h-9 items-center gap-1 rounded-md border border-shop-250 px-6 text-[14px] text-shop-900">
              <RotateCcw className="size-4" strokeWidth={1.5} aria-hidden="true" />
              필터 초기화
            </button>
          </div>
        ))
      )}

      <Pagination page={current} pages={filtered.length ? pages : 0} onChange={go} />
    </div>
  );
}
