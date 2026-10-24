"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductArt } from "@/components/art/ProductArt";
import { BRAND, loginFor } from "@/content/site";
import { getProduct, productHref } from "@/content/catalog";
import { removeFromBag, setBagQty, toast, useBag } from "@/lib/store";
import { cn, won } from "@/lib/utils";

export function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="relative inline-flex size-[18px] shrink-0 cursor-pointer items-center justify-center border border-st-ink bg-white">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-label={label} className="peer absolute inset-0 cursor-pointer opacity-0" />
      {checked && <Check className="size-3.5" strokeWidth={1.6} aria-hidden="true" />}
      <span className="pointer-events-none absolute -inset-1 hidden peer-focus-visible:block peer-focus-visible:outline-2 peer-focus-visible:outline-st-ink" />
    </label>
  );
}

const label = "block text-[12px] leading-[18px] text-st-mute";

/**
 * Shopping bag (reference: /order/basket.html). Desktop: an envelope-like
 * "FROM / TO" column on the left, the items and totals on the right.
 */
export function CartView() {
  const router = useRouter();
  const bag = useBag();
  const items = bag.flatMap((i) => {
    const p = getProduct(i.id);
    return p ? [{ ...i, product: p }] : [];
  });
  const [unchecked, setUnchecked] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const selected = items.filter((i) => !unchecked.includes(i.key));
  const sum = (list: typeof items) => list.reduce((n, i) => n + i.product.price * i.qty, 0);

  const checkout = (list: typeof items) => {
    if (!list.length) {
      toast(items.length ? "결제할 상품을 선택해 주세요." : "장바구니가 비어 있습니다.");
      return;
    }
    router.push(`${loginFor("/order/")}&from=bag`);
  };

  const remove = (keys: string[]) => {
    if (!keys.length) {
      toast("삭제할 상품을 선택해 주세요.");
      return;
    }
    removeFromBag(keys);
    setUnchecked((u) => u.filter((k) => !keys.includes(k)));
    toast(`${keys.length}개 상품을 장바구니에서 뺐습니다.`);
  };

  return (
    <div className="xl:flex xl:min-h-[600px] xl:px-[30px] xl:pb-[86px] xl:pt-[30px]">
      <aside className="hidden w-[337px] shrink-0 flex-col border-r border-st-ink pr-[30px] xl:flex">
        <h1 className="text-[12px] font-bold leading-[15px] text-st-ink">쇼핑백</h1>
        <p className="mt-[30px] h-[320px] text-[13px] leading-[18px] text-st-ink">
          <b className={cn(label, "font-normal uppercase")}>From</b>
          {BRAND.name}
        </p>
        <p className="border-t border-st-line pt-[21px] text-[13px] leading-[18px] text-st-ink">
          <b className={cn(label, "font-normal uppercase")}>To</b>
          {BRAND.name} MEMBER
        </p>
      </aside>

      <section aria-labelledby="bag-title" className="min-w-0 flex-1 px-2.5 pt-5 xl:pl-[31px] xl:pr-0 xl:pt-0">
        <h2 id="bag-title" className="text-[12px] font-bold leading-[15px] text-st-ink">
          제품 상세 정보
        </h2>

        {!ready ? null : items.length === 0 ? (
          <p className="mt-[30px] text-[13px] text-st-ink">
            Your cart is empty.{" "}
            <Link href="/shop/men/new/" className="underline underline-offset-2">
              Go Shopping.
            </Link>
          </p>
        ) : (
          <ul className="mt-5">
            {items.map((i) => {
              const on = !unchecked.includes(i.key);
              return (
                <li key={i.key} className="relative flex gap-4 border-b border-st-line py-5 xl:gap-5">
                  <div className="w-[110px] shrink-0 space-y-2 xl:w-[196px]">
                    <Checkbox checked={on} onChange={(v) => setUnchecked((u) => (v ? u.filter((k) => k !== i.key) : [...u, i.key]))} label={`${i.product.name} 선택`} />
                    <Link href={productHref(i.product.id)} className="block">
                      <ProductArt art={i.product} className="aspect-[2/3] w-full" />
                    </Link>
                  </div>
                  <div className="grid min-w-0 flex-1 grid-cols-1 content-start gap-x-5 gap-y-4 pt-1 text-[13px] leading-[18px] text-st-ink xl:grid-cols-2">
                    <p className="min-w-0">
                      <b className={cn(label, "font-normal")}>제품</b>
                      <Link href={productHref(i.product.id)} className="hover:underline">
                        {i.product.name}_{i.product.colorName}
                      </Link>
                    </p>
                    <p>
                      <b className={cn(label, "font-normal")}>사이즈</b>
                      {i.size}
                    </p>
                    <div>
                      <b className={cn(label, "font-normal")}>수량</b>
                      <span className="mt-1 flex items-center gap-3">
                        <button type="button" aria-label="수량 줄이기" disabled={i.qty <= 1} onClick={() => setBagQty(i.key, i.qty - 1)} className="disabled:text-st-line">
                          <Minus className="size-3" strokeWidth={1.4} />
                        </button>
                        <span className="w-5 text-center tabular-nums">{i.qty}</span>
                        <button type="button" aria-label="수량 늘리기" onClick={() => setBagQty(i.key, i.qty + 1)}>
                          <Plus className="size-3" strokeWidth={1.4} />
                        </button>
                      </span>
                    </div>
                    <p>
                      <b className={cn(label, "font-normal")}>금액</b>₩{won(i.product.price * i.qty)}
                    </p>
                  </div>
                  <button type="button" onClick={() => remove([i.key])} className="absolute right-0 top-5 text-[11px] text-st-ink">
                    삭제하기
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-5 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex flex-col gap-2.5 xl:flex-row">
            <button type="button" onClick={() => checkout(items)} className="h-[35px] bg-[#333] px-3 text-[12px] font-bold text-white xl:w-[89px] xl:px-0">
              전체상품 결제
            </button>
            <button type="button" onClick={() => checkout(selected)} className="h-[35px] border border-st-ink bg-white px-3 text-[12px] text-st-ink xl:w-[89px] xl:px-0">
              선택상품 결제
            </button>
          </div>
          {items.length > 0 && (
            <div className="xl:w-[434px]">
              <dl className="flex gap-12 text-[12px] leading-[18px]">
                <div>
                  <dt className="text-st-mute">선택 상품 금액</dt>
                  <dd className="text-st-ink">KRW {won(sum(selected))}</dd>
                </div>
                <div>
                  <dt className="text-st-mute">배송비</dt>
                  <dd className="text-st-ink">무료 배송</dd>
                </div>
                <div>
                  <dt className="font-bold text-st-mute">총 합계 금액</dt>
                  <dd className="font-bold text-st-ink">KRW {won(sum(selected))}</dd>
                </div>
              </dl>
              <div className="mt-[58px] border-t border-st-line pt-3 text-right">
                <button type="button" onClick={() => remove(selected.map((i) => i.key))} className="text-[12px] text-st-ink">
                  선택 상품 삭제
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
