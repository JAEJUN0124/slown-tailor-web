"use client";

import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronsUpDown, Info, MessageCircle, Search, Siren, Sparkles, Star, ThumbsUp } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductArt } from "@/components/art/ProductArt";
import { REVIEW_KEYWORDS, reviewsFor, type Review } from "@/content/reviews";
import type { Product } from "@/content/types";
import { BRAND } from "@/content/site";
import { DEMO_ONLY, toast } from "@/lib/store";
import { cn } from "@/lib/utils";

const PER_PAGE = 10;

function Stars({ value, size = "size-3.5" }: { value: number; size?: string }) {
  return (
    <span className="flex" aria-label={`별점 ${value}점`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cn(size, i <= value ? "fill-st-deep text-st-deep" : "fill-st-line text-st-line")} strokeWidth={1} aria-hidden="true" />
      ))}
    </span>
  );
}

/** A review "photo": the product drawn on another backdrop. */
function ReviewPhoto({ product, seed, className }: { product: Product; seed: number; className?: string }) {
  return <ProductArt art={{ ...product, tone: (product.tone ?? 0) + seed }} frame={[0, 2, 6, 1][seed % 4]} className={className} />;
}

function ReviewItem({ review: r, product }: { review: Review; product: Product }) {
  const [more, setMore] = useState(false);
  const [helpful, setHelpful] = useState(false);
  const long = r.text.length > 90 || r.text.includes("\n");
  return (
    <li className="flex flex-col gap-5 border-b border-st-line py-10 xl:flex-row xl:gap-8">
      <div className="rounded-md bg-st-soft p-6 text-[12px] leading-[1.6] text-st-mute xl:w-[260px] xl:shrink-0">
        <p className="flex justify-between text-st-deep">
          <span className="font-medium">{r.author}</span>
          <span className="text-st-mute">{r.date.replaceAll("-", ".")}</span>
        </p>
        <p className="mt-2">
          <b className="font-medium text-st-text">키</b> {r.height} · <b className="font-medium text-st-text">몸무게</b> {r.weight}
        </p>
        {r.topSize && <p className="mt-1">· 평소사이즈(상의) {r.topSize}</p>}
        {r.bottomSize && <p className="mt-1">· 평소사이즈(하의) {r.bottomSize}</p>}
        <p className="mt-2">
          구매옵션 <span className="ml-2 text-st-text">{r.option}</span>
        </p>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Stars value={r.rating} />
          {r.pick && <span className="border border-st-deep px-2 py-0.5 text-[11px] font-medium text-st-deep">{BRAND.name} PICK</span>}
          {r.month && <span className="rounded-sm bg-st-soft px-2 py-0.5 text-[11px] font-medium text-st-deep">한 달 리뷰</span>}
        </div>
        <p className={cn("mt-5 whitespace-pre-line text-[14px] leading-[1.6] text-st-text", !more && long && "line-clamp-2")}>{r.text}</p>
        {long && (
          <button type="button" onClick={() => setMore((m) => !m)} className="ml-auto mt-1 flex items-center gap-1 text-[13px] font-medium text-st-deep">
            {more ? "접기" : "더 보기"}
            <ChevronDown className={cn("size-4 transition-transform", more && "rotate-180")} strokeWidth={1.4} />
          </button>
        )}
        {r.photos > 0 && (
          <ul className="mt-5 flex flex-wrap gap-3">
            {Array.from({ length: Math.min(4, r.photos) }, (_, i) => (
              <li key={i} className="relative size-[110px] overflow-hidden xl:size-[184px]">
                <ReviewPhoto product={product} seed={i} className="size-full" />
                {i === 3 && r.photos > 4 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-[15px] font-semibold text-white">+ 더 보기</span>
                )}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 flex items-center gap-8 text-[13px] text-st-mute">
          <button type="button" aria-pressed={helpful} onClick={() => setHelpful((h) => !h)} className={cn("flex items-center gap-1.5", helpful && "text-st-deep")}>
            <ThumbsUp className="size-4" strokeWidth={1.3} /> 유용해요 {r.helpful + (helpful ? 1 : 0)}
          </button>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="size-4" strokeWidth={1.3} /> 댓글 {r.comments}
          </span>
          <button type="button" onClick={() => toast(DEMO_ONLY)} className="ml-auto flex items-center gap-1.5">
            <Siren className="size-4" strokeWidth={1.3} /> 신고·차단
          </button>
        </div>
      </div>
    </li>
  );
}

/**
 * Review widget under the product (reference: a third-party review board):
 * summary, photo strip, filter row, keyword chips, the list and numbered pages.
 */
export function Reviews({ product }: { product: Product }) {
  const all = useMemo(() => reviewsFor(product), [product]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"new" | "best">("new");
  const [keyword, setKeyword] = useState<string | null>(null);

  if (!all.length)
    return (
      <section id="reviews" aria-labelledby="reviews-title" className="mx-auto max-w-[1320px] px-5 pb-24 pt-16 xl:px-0">
        <h2 id="reviews-title" className="border-b border-st-deep pb-6 text-[22px] font-semibold text-st-deep">
          리뷰 <span className="font-normal text-st-mute">0</span>
        </h2>
        <p className="py-16 text-center text-[14px] text-st-mute">아직 작성된 리뷰가 없습니다. 첫 리뷰를 남겨 주세요.</p>
      </section>
    );

  const pattern = REVIEW_KEYWORDS.find(([k]) => k === keyword)?.[1];
  const filtered = pattern ? all.filter((r) => pattern.test(r.text)) : all;
  const sorted = sort === "best" ? [...filtered].sort((a, b) => b.helpful - a.helpful || b.photos - a.photos) : filtered;
  const pages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const shown = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const photos = all.filter((r) => r.photos > 0).slice(0, 7);
  const avg = Math.round((all.reduce((n, r) => n + r.rating, 0) / all.length) * 10) / 10;
  const happy = Math.round((all.filter((r) => r.rating >= 4).length / all.length) * 100);
  const start = Math.floor((page - 1) / 10) * 10 + 1;
  const nums = Array.from({ length: Math.min(10, pages - start + 1) }, (_, i) => start + i);
  const pageBtn = "flex size-9 items-center justify-center rounded-md border border-st-line text-[14px] text-st-deep disabled:border-transparent disabled:bg-st-soft disabled:text-st-faint";

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="mx-auto max-w-[1320px] scroll-mt-16 px-5 pb-16 pt-16 xl:px-0">
      <h2 id="reviews-title" className="border-b border-st-deep pb-6 text-[22px] font-semibold text-st-deep">
        리뷰 <span className="font-normal text-st-mute">{all.length}</span>
      </h2>

      <div className="flex flex-col items-center gap-8 border-b border-st-line py-10 xl:flex-row xl:gap-0">
        <div className="flex flex-col items-center xl:w-[218px] xl:border-r xl:border-st-line">
          <p className="flex items-center gap-2 text-[40px] font-semibold leading-none text-st-deep">
            <Star className="size-8 fill-st-deep" strokeWidth={0} aria-hidden="true" /> {avg % 1 ? avg : avg.toFixed(0)}
          </p>
          <p className="mt-3 rounded bg-st-soft px-3 py-1 text-[12px] text-st-mute">{all.length}개의 리뷰</p>
        </div>
        <div className="xl:pl-[72px]">
          <Stars value={Math.round(avg)} size="size-5" />
          <p className="mt-2 text-[14px] font-medium text-st-deep">구매자의 {happy}%가 이 상품에 만족했어요</p>
        </div>
      </div>

      {photos.length > 0 && (
        <div className="border-b border-st-line py-10">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-st-deep">동영상/사진 모아보기</h3>
            <button type="button" onClick={() => toast(DEMO_ONLY)} className="flex items-center gap-1 text-[13px] text-st-mute">
              전체보기 <ChevronRight className="size-4" strokeWidth={1.3} />
            </button>
          </div>
          <ul className="scrollbar-none mt-4 flex gap-3 overflow-x-auto">
            {photos.map((r, i) => (
              <li key={r.id} className="relative h-[227px] w-[226px] shrink-0 overflow-hidden rounded">
                <ReviewPhoto product={product} seed={i} className="size-full" />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-b from-transparent to-black/70 p-4 pt-12 text-white">
                  <Stars value={r.rating} size="size-3" />
                  <p className="mt-2 line-clamp-2 text-[12px] leading-[1.5]">{r.text}</p>
                  <p className="mt-2 text-[11px] text-white/70">{r.date.replaceAll("-", ".")}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 pb-6 pt-10">
        <button type="button" aria-label="리뷰 검색" onClick={() => toast(DEMO_ONLY)} className="flex size-10 items-center justify-center rounded-md bg-st-soft">
          <Search className="size-4" strokeWidth={1.4} />
        </button>
        {["리뷰 종류", "별점", "키", "몸무게", "평소사이즈(상의)", "평소사이즈(하의)"].map((f) => (
          <button key={f} type="button" onClick={() => toast(DEMO_ONLY)} className="flex h-10 items-center gap-2 rounded-md bg-st-soft px-3 text-[13px] text-st-deep">
            {f} <ChevronDown className="size-4" strokeWidth={1.3} />
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setSort((s) => (s === "new" ? "best" : "new"));
            setPage(1);
          }}
          className="ml-auto flex items-center gap-1 text-[13px] text-st-deep"
        >
          {sort === "new" ? "최신순" : "추천순"} <ChevronsUpDown className="size-4 text-st-mute" strokeWidth={1.3} />
        </button>
      </div>
      <p className="flex items-center gap-1 text-[12px] text-st-mute">
        <Sparkles className="size-3.5" strokeWidth={1.3} /> 쇼핑에 도움이 되는 추천 키워드
      </p>
      <ul className="mt-3 flex flex-wrap gap-2 border-b border-st-line pb-6">
        {REVIEW_KEYWORDS.map(([k]) => (
          <li key={k}>
            <button
              type="button"
              aria-pressed={keyword === k}
              onClick={() => {
                setKeyword((c) => (c === k ? null : k));
                setPage(1);
              }}
              className={cn("rounded-full border px-3.5 py-2 text-[13px]", keyword === k ? "border-st-deep bg-st-deep text-white" : "border-st-line text-st-deep")}
            >
              {k}
            </button>
          </li>
        ))}
      </ul>

      {shown.length ? (
        <ul>
          {shown.map((r) => (
            <ReviewItem key={r.id} review={r} product={product} />
          ))}
        </ul>
      ) : (
        <p className="border-b border-st-line py-16 text-center text-[14px] text-st-mute">'{keyword}' 키워드가 들어간 리뷰가 없습니다. 다른 키워드를 골라 보세요.</p>
      )}

      <nav aria-label="리뷰 페이지" className="mt-8 flex flex-wrap items-center justify-center gap-1.5">
        <button type="button" aria-label="처음" disabled={page === 1} onClick={() => setPage(1)} className={pageBtn}>
          <ChevronsLeft className="size-4" strokeWidth={1.3} />
        </button>
        <button type="button" aria-label="이전" disabled={page === 1} onClick={() => setPage(page - 1)} className={pageBtn}>
          <ChevronLeft className="size-4" strokeWidth={1.3} />
        </button>
        {nums.map((n) => (
          <button key={n} type="button" aria-current={n === page ? "page" : undefined} onClick={() => setPage(n)} className={cn(pageBtn, n === page && "border-st-deep bg-st-deep font-semibold text-white")}>
            {n}
          </button>
        ))}
        <button type="button" aria-label="다음" disabled={page === pages} onClick={() => setPage(page + 1)} className={pageBtn}>
          <ChevronRight className="size-4" strokeWidth={1.3} />
        </button>
        <button type="button" aria-label="마지막" disabled={page === pages} onClick={() => setPage(pages)} className={pageBtn}>
          <ChevronsRight className="size-4" strokeWidth={1.3} />
        </button>
        <span className="ml-3 text-[12px] text-st-mute">
          {sorted.length ? `${(page - 1) * PER_PAGE + 1}-${Math.min(page * PER_PAGE, sorted.length)} of ${sorted.length}` : "0 of 0"}
        </span>
      </nav>
      <button type="button" onClick={() => toast("리뷰는 구매 확정 후 작성할 수 있습니다.")} className="mt-10 flex items-center gap-1 text-[12px] text-st-mute underline underline-offset-2">
        <Info className="size-3.5" strokeWidth={1.3} /> 리뷰 정책 안내
      </button>
    </section>
  );
}
