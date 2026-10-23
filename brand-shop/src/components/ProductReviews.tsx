"use client";

import Link from "next/link";
import { ChevronDown, Star, X } from "lucide-react";
import { useId, useMemo, useRef, useState } from "react";
import type { Review } from "@/content/catalog";
import { REVIEW_COPY } from "@/content/guide";
import type { Product } from "@/content/types";
import { useDismiss } from "@/lib/useDismiss";
import { cn } from "@/lib/utils";
import { GRID } from "./ProductCard";
import { ProductArt } from "./ProductArt";
import { Checkbox, Pagination } from "./ui";

const FILTERS = ["전체", "포토리뷰", "도움리뷰", "스태프 PICK", "매장구매"] as const;
type Filter = (typeof FILTERS)[number];

const SORTS = ["베스트순", "최근 등록순", "평점 높은순", "평점 낮은순"] as const;
type Sort = (typeof SORTS)[number];

const FEELS = ["어두워요", "화면과 같아요", "밝아요"] as const;

const LIST_PAGE = 10;
const PHOTO_PAGE = 6;

const matches: Record<Filter, (r: Review) => boolean> = {
  전체: () => true,
  포토리뷰: (r) => r.photo,
  도움리뷰: (r) => r.helpful >= 6,
  "스태프 PICK": (r) => r.staff,
  매장구매: (r) => r.store,
};

const order: Record<Sort, (a: Review, b: Review) => number> = {
  베스트순: (a, b) => b.helpful + (b.photo ? 3 : 0) - (a.helpful + (a.photo ? 3 : 0)),
  // The samples are already newest first.
  "최근 등록순": () => 0,
  "평점 높은순": (a, b) => b.rating - a.rating,
  "평점 낮은순": (a, b) => a.rating - b.rating,
};

function Stars({ value, size = "sm" }: { value: number; size?: "sm" | "lg" }) {
  return (
    <span role="img" aria-label={`5점 만점에 ${value}점`} className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          strokeWidth={0}
          className={cn(size === "lg" ? "size-6" : "size-[15px]", i < Math.round(value) ? "fill-shop-900" : "fill-shop-250")}
        />
      ))}
    </span>
  );
}

/** A reviewer's "photo": the product drawn on another backdrop. */
function ReviewPhoto({ product: p, review, className }: { product: Product; review: Review; className?: string }) {
  const n = Number(review.id.split("-r").pop());
  return (
    <ProductArt art={{ kind: p.kind, color: p.color, variant: p.variant, tone: (p.tone ?? 0) + n }} detail={n % 2 === 0} className={className} />
  );
}

function Tags({ review }: { review: Review }) {
  if (!review.store && !review.staff) return null;
  return (
    <span className="mb-1.5 flex gap-1">
      {review.store && <span className="rounded-sm bg-[#eef1ff] px-1 text-[11px] leading-[17px] text-shop-accent">매장구매</span>}
      {review.staff && <span className="rounded-sm bg-shop-200 px-1 text-[11px] leading-[17px] text-shop-700">스태프 PICK</span>}
    </span>
  );
}

function ReviewRow({ product, review: r }: { product: Product; review: Review }) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();
  const expandable = r.photo || r.text.length > 44;
  return (
    <li className="border-b border-shop-250 py-6 md:flex md:items-start md:gap-4 md:px-3">
      <div className="flex items-center justify-between md:w-[120px] md:shrink-0 md:pt-0.5">
        <Stars value={r.rating} />
        <span className="text-[13px] text-shop-500 md:hidden">
          {r.user} · {r.date}
        </span>
      </div>
      <div id={bodyId} className="mt-3 min-w-0 flex-1 md:mt-0">
        <Tags review={r} />
        <p className="text-[14px] leading-[20px] text-shop-600">
          색상: {r.option} ({r.colorFeel})
        </p>
        <p className={cn("mt-3 text-[15px] leading-[23px]", !open && "line-clamp-1")}>{r.text}</p>
        {open && r.photo && <ReviewPhoto product={product} review={r} className="mt-4 h-[240px] w-[180px] rounded-sm" />}
        {expandable && (
          <button
            type="button"
            aria-expanded={open}
            aria-controls={bodyId}
            onClick={() => setOpen((v) => !v)}
            className="mt-2 text-[13px] text-shop-600 underline underline-offset-2 hover:text-shop-900"
          >
            {open ? "접기" : "더보기"}
          </button>
        )}
      </div>
      {r.photo && !open && <ReviewPhoto product={product} review={r} className="mt-3 size-[52px] shrink-0 rounded-sm md:mt-0" />}
      <span className="hidden w-[110px] shrink-0 text-center text-[14px] text-shop-500 md:block">{r.user}</span>
      <span className="hidden w-[90px] shrink-0 text-right text-[14px] text-shop-500 md:block">{r.date}</span>
    </li>
  );
}

/** 상품옵션 popover: narrow the list to some sizes. */
function OptionFilter({ sizes, value, onChange }: { sizes: string[]; value: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  useDismiss(ref, open, () => setOpen(false));
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-1 rounded-md border border-shop-250 pl-[15px] pr-2.5 text-[14px] leading-[20px]"
      >
        상품옵션
        {value.length > 0 && <span className="font-bold text-shop-accent">{value.length}</span>}
        <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} strokeWidth={1.6} aria-hidden="true" />
      </button>
      <div id={id} hidden={!open} className="absolute left-0 top-11 z-20 w-[280px] rounded-md border border-shop-250 bg-white p-5 shadow-[0_8px_20px_-12px_rgb(0_0_0/0.3)]">
        <p className="mb-3 text-[14px] font-bold leading-[20px]">사이즈</p>
        <div className="grid grid-cols-2 gap-3">
          {sizes.map((s) => (
            <Checkbox key={s} checked={value.includes(s)} onChange={(on) => onChange(on ? [...value, s] : value.filter((x) => x !== s))}>
              {s}
            </Checkbox>
          ))}
        </div>
        <div className="mt-5 flex justify-end gap-4 text-[13px]">
          <button type="button" onClick={() => onChange([])} className="text-shop-600 underline underline-offset-2">
            초기화
          </button>
          <button type="button" onClick={() => setOpen(false)} className="font-bold">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 리뷰 tab (reference: `.review-tab-section`): policy link, point band, score
 * and colour summary, photo reviews, then the filterable, sortable list.
 */
export function ProductReviews({ product, reviews }: { product: Product; reviews: Review[] }) {
  const [filter, setFilter] = useState<Filter>("전체");
  const [sort, setSort] = useState<Sort>("베스트순");
  const [sizes, setSizes] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [photoPage, setPhotoPage] = useState(1);
  const [viewing, setViewing] = useState<Review | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLElement>(null);

  const photos = useMemo(() => reviews.filter((r) => r.photo), [reviews]);
  const average = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const feel = (k: (typeof FEELS)[number]) => Math.round((reviews.filter((r) => r.colorFeel === k).length / Math.max(1, reviews.length)) * 100);

  const list = useMemo(
    () => reviews.filter((r) => matches[filter](r) && (sizes.length === 0 || sizes.includes(r.size))).sort(order[sort]),
    [reviews, filter, sizes, sort],
  );
  const pages = Math.ceil(list.length / LIST_PAGE);

  const reset = (fn: () => void) => {
    fn();
    setPage(1);
  };

  const openPhoto = (r: Review) => {
    setViewing(r);
    dialogRef.current?.showModal();
  };

  return (
    <div className="pt-10">
      <p className="text-right">
        <Link href={REVIEW_COPY.policy.href} className="text-[13px] text-shop-600 underline underline-offset-2 hover:text-shop-900">
          {REVIEW_COPY.policy.label}
        </Link>
      </p>
      <div className="mt-3 flex min-h-[100px] flex-col justify-center bg-[#ececec] px-6 py-5 md:px-[16%]">
        <p className="text-[18px] font-bold leading-[26px] md:text-[20px] md:leading-[28px]">{REVIEW_COPY.benefitTitle}</p>
        <p className="text-[13px] leading-[19px] md:text-[14px] md:leading-[20px]">{REVIEW_COPY.benefitText}</p>
      </div>

      {reviews.length === 0 ? (
        <p className="py-20 text-center text-[16px] leading-[24px]">{REVIEW_COPY.empty}</p>
      ) : (
        <>
          <div className="mt-[60px] flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-[120px]">
            <div className="flex flex-col items-center">
              <Stars value={average} size="lg" />
              <p className="mt-2 text-[40px] font-bold leading-[48px]">
                {average.toFixed(1)}
                <span className="text-[24px] text-shop-500">/5</span>
              </p>
            </div>
            <div className="w-full max-w-[400px]">
              <p className="mb-3 text-[15px] font-bold leading-[21px]">컬러</p>
              <ul className="space-y-2.5">
                {FEELS.map((k) => (
                  <li key={k} className="grid grid-cols-[96px_1fr_44px] items-center gap-3 text-[14px] leading-[20px]">
                    <span>{k}</span>
                    <span className="h-1.5 overflow-hidden rounded-full bg-shop-200">
                      <span className="block h-full rounded-full bg-shop-900" style={{ width: `${feel(k)}%` }} />
                    </span>
                    <span className="text-right text-shop-600">{feel(k)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {photos.length > 0 && (
            <section className="mt-[60px]">
              <h3 className="mb-5 text-[20px] font-bold leading-[28px]">
                포토리뷰 <span>{photos.length}</span>
              </h3>
              <ul className={GRID[6]}>
                {photos.slice((photoPage - 1) * PHOTO_PAGE, photoPage * PHOTO_PAGE).map((r) => (
                  <li key={r.id}>
                    <button type="button" onClick={() => openPhoto(r)} className="block w-full text-left" aria-label={`${r.user}님의 포토리뷰 크게 보기`}>
                      <span className="relative block pt-[100%]">
                        <ReviewPhoto product={product} review={r} className="absolute inset-0" />
                      </span>
                      <span className="mt-2.5 block">
                        <Stars value={r.rating} />
                      </span>
                      <span className="mt-1.5 block text-[13px] leading-[19px] text-shop-500">색상: {r.option}</span>
                      {r.store && <span className="mt-1.5 inline-block rounded-sm bg-[#eef1ff] px-1 text-[11px] leading-[17px] text-shop-accent">매장구매</span>}
                    </button>
                  </li>
                ))}
              </ul>
              <Pagination page={photoPage} pages={Math.ceil(photos.length / PHOTO_PAGE)} onChange={setPhotoPage} arrows={false} className="mt-10" />
            </section>
          )}

          <section ref={listRef} className="mt-[60px] scroll-mt-[60px] border-t-[3px] border-shop-900 pt-10">
            <h3 className="text-[24px] font-bold leading-[32px]">
              상품리뷰 <span>{reviews.length}</span>
            </h3>
            <div role="group" aria-label="리뷰 종류" className="scrollbar-none mt-10 flex gap-6 overflow-x-auto border-b border-shop-250">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => reset(() => setFilter(f))}
                  className={cn(
                    "-mb-px shrink-0 border-b-[3px] pb-2.5 text-[18px] font-bold leading-[26px] md:text-[20px] md:leading-[28px]",
                    filter === f ? "border-shop-900 text-shop-900" : "border-transparent text-shop-400 hover:text-shop-700",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <OptionFilter sizes={product.sizes} value={sizes} onChange={(v) => reset(() => setSizes(v))} />
              <div role="group" aria-label="정렬" className="flex flex-wrap gap-x-4 gap-y-1">
                {SORTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={sort === s}
                    onClick={() => reset(() => setSort(s))}
                    className={cn("text-[14px] font-bold leading-[20px]", sort === s ? "text-shop-900" : "text-shop-400 hover:text-shop-700")}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {list.length === 0 ? (
              <div className="mt-5 border-t border-shop-900 py-16 text-center">
                <p className="text-[15px] leading-[22px]">조건에 맞는 리뷰가 없습니다.</p>
                <button
                  type="button"
                  onClick={() =>
                    reset(() => {
                      setFilter("전체");
                      setSizes([]);
                    })
                  }
                  className="mt-5 h-9 rounded-md border border-shop-250 px-5 text-[14px] hover:border-shop-900"
                >
                  필터 초기화
                </button>
              </div>
            ) : (
              <ul className="mt-5 border-t border-shop-900">
                {list.slice((page - 1) * LIST_PAGE, page * LIST_PAGE).map((r) => (
                  <ReviewRow key={r.id} product={product} review={r} />
                ))}
              </ul>
            )}
            <Pagination
              page={page}
              pages={pages}
              onChange={(n) => {
                setPage(n);
                listRef.current?.scrollIntoView();
              }}
            />
          </section>
        </>
      )}

      <dialog
        ref={dialogRef}
        aria-label="포토리뷰"
        onClose={() => setViewing(null)}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className="m-auto w-[min(760px,calc(100vw-32px))] overflow-visible bg-white p-0 backdrop:bg-black/60"
      >
        {viewing && (
          <div className="grid md:grid-cols-[1fr_300px]">
            <div className="relative pt-[100%]">
              <ReviewPhoto product={product} review={viewing} className="absolute inset-0" />
            </div>
            <div className="p-6">
              <Stars value={viewing.rating} />
              <p className="mt-3 text-[14px] leading-[20px] text-shop-600">
                색상: {viewing.option} ({viewing.colorFeel})
              </p>
              <p className="mt-3 text-[15px] leading-[24px]">{viewing.text}</p>
              <p className="mt-5 text-[13px] text-shop-500">
                {viewing.user} · {viewing.date}
              </p>
            </div>
          </div>
        )}
        <button
          type="button"
          aria-label="닫기"
          onClick={() => dialogRef.current?.close()}
          className="absolute -top-11 right-0 flex size-10 items-center justify-center text-white"
        >
          <X className="size-7" strokeWidth={1.3} />
        </button>
      </dialog>
    </div>
  );
}
