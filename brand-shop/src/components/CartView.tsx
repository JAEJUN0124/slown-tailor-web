"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";
import { productById } from "@/content/catalog";
import { BRAND } from "@/content/shop";
import { DEMO_ONLY, removeFromCart, setCartQty, toast, useCart, type Delivery } from "@/lib/store";
import { cn, won } from "@/lib/utils";
import { ProductArt } from "./ProductArt";
import { QtyStepper } from "./ProductBuy";
import { Price } from "./ProductCard";
import { Checkbox, TabRects } from "./ui";

const TABS: { label: string; delivery?: Delivery }[] = [
  { label: "일반배송", delivery: "택배" },
  { label: "빠른배송", delivery: "빠른배송" },
  { label: "매장픽업" },
  { label: "예약주문" },
];

const FAST_FEE = 5000;

const NOTES = [
  "장바구니 상품은 최대 100개까지 담을 수 있고 30일 동안 저장됩니다.",
  "배송 방법마다 배송비 기준이 달라 배송비가 따로 붙을 수 있습니다.",
  "이 장바구니는 지금 쓰는 브라우저에만 저장되며, 데모라서 주문은 진행되지 않습니다.",
];

function Row({ label, value, small }: { label: string; value: number; small?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between", small ? "text-[13px] leading-[20px]" : "text-[15px] leading-[28px]")}>
      <span className="text-shop-600">{label}</span>
      <span>
        <em className="not-italic">{won(value)}</em>원
      </span>
    </div>
  );
}

/**
 * 장바구니 (reference: `/public/cart/list`): black delivery tabs with counts,
 * the line list on the left and the 400px 결제정보 box on the right. Lines
 * come from the product page and live in this browser only.
 */
export function CartView() {
  const items = useCart();
  const [picked, setPicked] = useState<number | null>(null);
  const [unchecked, setUnchecked] = useState<string[]>([]);

  const lines = items.flatMap((item) => {
    const product = productById(item.id);
    return product ? [{ item, product }] : [];
  });
  const counts = TABS.map((t) => lines.filter((l) => t.delivery && l.item.delivery === t.delivery).length);
  // Until a tab is picked, open the first one that has something in it.
  const tab = picked ?? Math.max(0, counts.findIndex((c) => c > 0));
  const shown = lines.filter((l) => TABS[tab].delivery && l.item.delivery === TABS[tab].delivery);
  const selected = shown.filter((l) => !unchecked.includes(l.item.key));
  const allOn = shown.length > 0 && selected.length === shown.length;

  const list = selected.reduce((s, l) => s + (l.product.originalPrice ?? l.product.price) * l.item.qty, 0);
  const discount = selected.reduce((s, l) => s + ((l.product.originalPrice ?? l.product.price) - l.product.price) * l.item.qty, 0);
  const shipping = selected.length && TABS[tab].delivery === "빠른배송" ? FAST_FEE : 0;
  const total = list - discount + shipping;

  const toggle = (key: string, on: boolean) => setUnchecked((u) => (on ? u.filter((k) => k !== key) : [...u, key]));

  return (
    <>
      <TabRects tabs={TABS.map((t, i) => `${t.label} (${counts[i]})`)} active={tab} onChange={setPicked} label="배송 방법" />
      <div className="mt-[30px] flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[60px]">
        <section aria-label="담은 상품" className="min-w-0 flex-1 border-t border-shop-900">
          {shown.length === 0 ? (
            <div className="flex flex-col items-center px-5 py-[60px] text-center text-[16px] leading-[23px]">
              <p>담은 상품이 없습니다.</p>
              <p>인기상품에서 관심상품을 찾아보세요.</p>
              <Link href="/ranking/" className="mt-5 flex h-9 w-[220px] items-center justify-center rounded-md border border-shop-250 text-[14px] transition-colors hover:border-shop-900">
                구경하러 가기
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-shop-250 py-4">
                <Checkbox checked={allOn} onChange={(on) => setUnchecked(on ? [] : shown.map((l) => l.item.key))}>
                  전체선택 ({selected.length}/{shown.length})
                </Checkbox>
                <button
                  type="button"
                  disabled={!selected.length}
                  onClick={() => removeFromCart(selected.map((l) => l.item.key))}
                  className="h-8 rounded border border-shop-250 px-3 text-[13px] transition-colors hover:border-shop-900 disabled:text-shop-400 disabled:hover:border-shop-250"
                >
                  선택삭제
                </button>
              </div>
              <ul>
                {shown.map(({ item, product: p }) => (
                  <li key={item.key} className="flex items-start gap-4 border-b border-shop-250 py-6">
                    <Checkbox checked={!unchecked.includes(item.key)} onChange={(on) => toggle(item.key, on)} className="mt-[1px]">
                      <span className="sr-only">{p.name} 선택</span>
                    </Checkbox>
                    <Link href={`/product/${p.id}/`} className="relative block h-[120px] w-[90px] shrink-0 overflow-hidden" tabIndex={-1} aria-hidden="true">
                      <ProductArt art={p} className="absolute inset-0" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-bold leading-[20px]">{BRAND.name}</p>
                      <Link href={`/product/${p.id}/`} className="block text-[14px] leading-[20px] hover:underline">
                        {p.name}
                      </Link>
                      <p className="mt-1 text-[13px] leading-[19px] text-shop-600">
                        {p.colorKo} / {item.size} · {item.delivery}
                      </p>
                      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                        <QtyStepper qty={item.qty} onChange={(q) => setCartQty(item.key, q)} />
                        <div className="text-right">
                          <Price product={p} className="text-[13px] leading-[19px] text-shop-600" />
                          <p className="text-[17px] font-bold leading-[24px]">
                            <span className="sr-only">주문 금액 </span>
                            {won(p.price * item.qty)}원
                          </p>
                        </div>
                      </div>
                    </div>
                    <button type="button" aria-label={`${p.name} 삭제`} onClick={() => removeFromCart([item.key])} className="flex size-6 shrink-0 items-center justify-center text-shop-500 hover:text-shop-900">
                      <X className="size-5" strokeWidth={1.4} />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        <aside aria-label="결제정보" className="border border-shop-900 p-6 md:p-9 lg:sticky lg:top-5 lg:w-[400px] lg:shrink-0">
          <h2 className="border-b-2 border-shop-900 pb-3 text-[20px] font-bold leading-[28px]">결제정보</h2>
          <div className="mt-5 space-y-1.5">
            <Row label="상품금액" value={list} />
            <Row label="배송비" value={shipping} />
            <Row label="할인금액" value={discount} />
          </div>
          <div className="mt-2.5 space-y-1.5 border border-shop-250 px-4 py-4">
            <Row label="상품할인" value={discount} small />
            <Row label="즉시할인" value={0} small />
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-shop-900 pt-5">
            <span className="text-[17px] leading-[23px]">총 구매 금액</span>
            <span className="text-[24px] font-bold leading-[30px]">
              {won(total)}
              <span className="text-[20px]">원</span>
            </span>
          </div>
          <button
            type="button"
            disabled={!selected.length}
            onClick={() => toast(DEMO_ONLY)}
            className="mt-5 h-[60px] w-full rounded bg-shop-900 text-[17px] font-bold text-white transition-colors hover:bg-black disabled:bg-shop-250"
          >
            {selected.length}건 주문하기
          </button>
        </aside>
      </div>
      <section className="mt-10 border-t border-shop-250 pt-10">
        <h3 className="text-[20px] font-bold leading-[28px]">이용안내</h3>
        <ul className="mt-2 space-y-1 text-[14px] leading-[22px] text-shop-600">
          {NOTES.map((n) => (
            <li key={n} className="relative pl-3 before:absolute before:left-0 before:top-[10px] before:size-[3px] before:rounded-full before:bg-shop-600">
              {n}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
