"use client";

import Link from "next/link";
import { CircleQuestionMark, Star } from "lucide-react";
import { useId, useRef, useState, type ReactNode } from "react";
import { productById } from "@/content/catalog";
import { BENEFITS } from "@/content/guide";
import { BRAND } from "@/content/shop";
import type { Product } from "@/content/types";
import { cn, won } from "@/lib/utils";
import { BuyButtons, deliveriesOf, isSizeOut, SelectedLine, SIZE_REQUIRED, type Buy } from "./ProductBuy";
import { discountRate } from "./ProductCard";
import { ProductArt } from "./ProductArt";

const more = "ml-2 text-shop-600 underline underline-offset-2 hover:text-shop-900";

/** Question-mark button with a short note on hover or focus. */
function Tip({ label, text }: { label: string; text: string }) {
  const id = useId();
  return (
    <span className="group relative mx-1 inline-flex align-[-3px]">
      <button type="button" aria-label={`${label} 안내`} aria-describedby={id} className="text-shop-500 hover:text-shop-900">
        <CircleQuestionMark className="size-4" strokeWidth={1.4} />
      </button>
      <span
        role="tooltip"
        id={id}
        className="invisible absolute left-1/2 top-6 z-30 w-[240px] -translate-x-1/2 rounded-md border border-shop-250 bg-white p-3 text-[13px] font-normal leading-[19px] text-shop-700 opacity-0 shadow-[0_6px_16px_-8px_rgb(0_0_0/0.25)] transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}

function OptionRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[72px_1fr] items-start md:grid-cols-[90px_1fr]">
      <p className="pt-2 text-[15px] font-bold leading-[21px]">{label}</p>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

const chip = "h-9 min-w-[72px] rounded-md border px-3 text-[14px] leading-[20px] transition-colors";
const chipOn = "border-shop-900 font-bold shadow-[inset_0_0_0_1px_var(--color-shop-900)]";

/**
 * Info column of the product page (reference: `.godsInfo-area`): brand, name,
 * price and rating, the benefit table, colour / size / delivery options, the
 * selected line and the two buttons.
 */
export function ProductSummary({
  product: p,
  buy,
  reviewCount,
  onReviews,
}: {
  product: Product;
  buy: Buy;
  reviewCount: number;
  onReviews: () => void;
}) {
  const [cardsOpen, setCardsOpen] = useState(false);
  const sizesRef = useRef<HTMLDivElement>(null);
  const errorId = useId();
  const rate = discountRate(p);
  const points = Math.round((p.price * BENEFITS.pointRate) / 10) * 10;
  const gift = Math.round((p.price * BENEFITS.giftRate) / 100) * 100;
  const { normal, fast } = BENEFITS.delivery;

  const guard = (action: () => boolean) => () => {
    if (!action()) sizesRef.current?.querySelector<HTMLButtonElement>("button:not(:disabled)")?.focus();
  };

  return (
    <div className="min-w-0 lg:w-[39.29%]">
      <Link href="/" className="text-[20px] font-bold leading-[26px] underline decoration-[1.5px] underline-offset-[5px]">
        {BRAND.name}
      </Link>
      <h1 className="mt-2 text-[17px] leading-[23px]">{p.name}</h1>
      <div className="mt-5">
        {p.originalPrice && (
          <del className="block text-[15px] font-medium leading-[21px] text-shop-500">
            <span className="sr-only">정가 </span>
            {won(p.originalPrice)}원
          </del>
        )}
        <p className="flex items-baseline gap-1.5 text-[20px] font-bold leading-[28px]">
          {rate > 0 && (
            <em className="not-italic text-shop-accent">
              <span className="sr-only">할인율 </span>
              {rate}%
            </em>
          )}
          <span>
            <span className="sr-only">판매가 </span>
            {won(p.price)}
            <span className="ml-0.5 text-[15px] font-normal">원</span>
          </span>
        </p>
      </div>
      {reviewCount > 0 && p.rating !== undefined && (
        <p className="mt-4 flex items-center text-[15px] leading-[21px]">
          <Star className="mr-1 size-4 fill-shop-900" strokeWidth={0} aria-hidden="true" />
          <span className="font-bold">
            <span className="sr-only">평점 </span>
            {p.rating}
          </span>
          <button type="button" onClick={onReviews} className="ml-3 text-[14px] text-shop-600 underline underline-offset-2 hover:text-shop-900">
            리뷰 {reviewCount}건
          </button>
        </p>
      )}

      <dl className="mt-[30px] grid grid-cols-[64px_1fr] gap-y-[11px] border-t border-shop-250 pt-[30px] text-[14px] leading-[20px] md:grid-cols-[90px_1fr]">
        <dt className="text-shop-600">쿠폰</dt>
        <dd>
          <span aria-hidden="true" className="mr-1.5 inline-flex size-4 items-center justify-center rounded-full bg-shop-accent align-[-3px] text-[9px] font-bold text-white">
            F
          </span>
          {BENEFITS.coupon.lead} <em className="not-italic text-shop-accent">{BENEFITS.coupon.rate}</em> {BENEFITS.coupon.tail}
          <Link href={BENEFITS.coupon.link.href} className={more}>
            {BENEFITS.coupon.link.label}
          </Link>
        </dd>
        <dt className="text-shop-600">적립</dt>
        <dd>
          멤버십포인트 <em className="not-italic text-shop-accent">{won(points)}P</em> 적립
          <Link href="/membership/" className={more}>
            자세히보기
          </Link>
        </dd>
        <dt className="text-shop-600">할인</dt>
        <dd>
          멤버십 고객 최대 <em className="not-italic text-shop-accent">{won(gift)}원 (10%)</em> 기프트포인트 할인
          <Link href="/membership/" className={more}>
            자세히보기
          </Link>
        </dd>
        <dt className="text-shop-600">결제</dt>
        <dd>
          카드사별 혜택 안내
          <button type="button" aria-expanded={cardsOpen} onClick={() => setCardsOpen((v) => !v)} className={more}>
            {cardsOpen ? "접기" : "자세히보기"}
          </button>
          {cardsOpen && (
            <ul className="mt-2 rounded bg-shop-100 px-3 py-2.5 text-[13px] leading-[21px] text-shop-700">
              {BENEFITS.cards.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          )}
        </dd>
        <dt className="text-shop-600">배송</dt>
        <dd>
          <p>
            <b>{normal.label}</b>
            <Tip label={normal.label} text={normal.tip} />
            {normal.text}
          </p>
          {p.fastShipping && (
            <p className="mt-2">
              <b>{fast.label}</b>
              <Tip label={fast.label} text={fast.tip} />
              {fast.text}
            </p>
          )}
        </dd>
      </dl>

      <div className="mt-[30px] space-y-[26px] border-t border-shop-250 pt-[30px]">
        <OptionRow label="색상">
          <ul className="flex flex-wrap gap-2">
            {p.swatches.map((s) => {
              const sibling = productById(s.id);
              const on = s.id === p.id;
              if (!sibling) return null;
              return (
                <li key={s.id}>
                  <Link
                    href={`/product/${s.id}/`}
                    aria-label={`${s.name}${sibling.soldOut ? " (품절)" : ""}`}
                    aria-current={on ? "true" : undefined}
                    className="relative block h-20 w-[60px] overflow-hidden rounded-md"
                  >
                    <ProductArt art={sibling} className="absolute inset-0" />
                    <span aria-hidden="true" className={cn("absolute inset-0 rounded-md", on ? "border-2 border-shop-900" : "border border-shop-250")} />
                    {sibling.soldOut && (
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 bg-black/60 text-center text-[11px] leading-[18px] text-white">
                        품절
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </OptionRow>
        <OptionRow label="사이즈">
          <div ref={sizesRef} role="group" aria-label="사이즈" aria-describedby={buy.error ? errorId : undefined} className="flex flex-wrap gap-2">
            {p.sizes.map((s) => {
              const out = isSizeOut(p, s);
              const on = buy.sel.size === s;
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={on}
                  disabled={out}
                  onClick={() => buy.setSize(s)}
                  className={cn(chip, on ? chipOn : "border-shop-250 hover:border-shop-900", out && "text-shop-400 line-through hover:border-shop-250")}
                >
                  {s}
                  {out && <span className="sr-only"> 품절</span>}
                </button>
              );
            })}
          </div>
          {buy.error && (
            <p id={errorId} role="alert" className="mt-2 text-[13px] leading-[19px] text-shop-like">
              {SIZE_REQUIRED}
            </p>
          )}
        </OptionRow>
        <OptionRow label="배송방법">
          <div role="group" aria-label="배송방법" className="flex flex-wrap gap-2">
            {deliveriesOf(p).map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={buy.sel.delivery === d}
                onClick={() => buy.setDelivery(d)}
                className={cn(chip, buy.sel.delivery === d ? chipOn : "border-shop-250 hover:border-shop-900")}
              >
                {d}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[14px] leading-[20px] text-shop-500">{buy.sel.delivery === "택배" ? normal.text : "5,000원 · 원하는 날, 원하는 시간대에 받아 보세요"}</p>
        </OptionRow>
      </div>

      <div className="mt-[30px] border-t-2 border-shop-900">
        {buy.sel.size ? (
          <SelectedLine product={p} buy={buy} />
        ) : (
          <p className="py-5 text-[14px] leading-[20px] text-shop-500">{p.soldOut ? "모든 사이즈가 품절되었습니다." : "사이즈를 고르면 주문 금액이 표시됩니다."}</p>
        )}
      </div>
      <BuyButtons product={p} onCart={guard(buy.addCart)} onBuy={guard(buy.buyNow)} className="mt-[30px]" />
    </div>
  );
}
