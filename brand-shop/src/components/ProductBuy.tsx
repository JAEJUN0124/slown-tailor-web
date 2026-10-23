"use client";

import { ChevronDown, Minus, Plus, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { Product } from "@/content/types";
import { addToCart, DEMO_ONLY, toast, type Delivery } from "@/lib/store";
import { cn, won } from "@/lib/utils";

// Option state and controls shared by the info column and the floating
// option panel of the product page.

export type Selection = { size: string | null; delivery: Delivery; qty: number };

const MAX_QTY = 99;

export const SIZE_REQUIRED = "사이즈를 선택해 주세요.";

export const isSizeOut = (p: Product, size: string) => !!p.soldOut || p.soldOutSizes.includes(size);

export const deliveriesOf = (p: Product): Delivery[] => (p.fastShipping ? ["택배", "빠른배송"] : ["택배"]);

/**
 * One selected line at a time, as on the reference. A one-size item starts
 * selected. `addCart` and `buyNow` return false when a size is still missing.
 */
export function useBuy(product: Product) {
  const only = product.sizes.length === 1 && !isSizeOut(product, product.sizes[0]) ? product.sizes[0] : null;
  const [sel, setSel] = useState<Selection>({ size: only, delivery: "택배", qty: 1 });
  const [error, setError] = useState(false);

  const ready = () => {
    if (sel.size) return true;
    setError(true);
    return false;
  };

  return {
    sel,
    error: error && !sel.size,
    setSize: (size: string) => {
      setSel((s) => ({ ...s, size }));
      setError(false);
    },
    setDelivery: (delivery: Delivery) => setSel((s) => ({ ...s, delivery })),
    setQty: (qty: number) => setSel((s) => ({ ...s, qty: Math.max(1, Math.min(MAX_QTY, qty)) })),
    addCart: () => {
      if (!ready() || !sel.size) return false;
      addToCart({ id: product.id, size: sel.size, delivery: sel.delivery, qty: sel.qty });
      toast("장바구니에 담았습니다.", { label: "장바구니 보기", href: "/cart/" });
      return true;
    },
    buyNow: () => {
      if (!ready()) return false;
      toast(DEMO_ONLY);
      return true;
    },
  };
}

export type Buy = ReturnType<typeof useBuy>;

/** − 1 + (reference: 120×36, the minus greys out at one). */
export function QtyStepper({ qty, onChange }: { qty: number; onChange: (qty: number) => void }) {
  const btn = "flex size-9 shrink-0 items-center justify-center text-shop-900 disabled:text-shop-400";
  return (
    <div className="flex h-9 w-[120px] items-center border border-shop-250 bg-white">
      <button type="button" aria-label="수량 줄이기" disabled={qty <= 1} onClick={() => onChange(qty - 1)} className={btn}>
        <Minus className="size-4" strokeWidth={1.5} />
      </button>
      <span className="flex h-full flex-1 items-center justify-center border-x border-shop-250 text-[14px]" aria-live="polite">
        <span className="sr-only">수량 </span>
        {qty}
      </span>
      <button type="button" aria-label="수량 늘리기" disabled={qty >= MAX_QTY} onClick={() => onChange(qty + 1)} className={btn}>
        <Plus className="size-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}

/** "Black / 48" + quantity + amount. */
export function SelectedLine({ product, buy, boxed = false }: { product: Product; buy: Buy; boxed?: boolean }) {
  const { sel } = buy;
  if (!sel.size) return null;
  return (
    <div className={boxed ? "mt-4 bg-shop-150 px-3 py-4" : "py-5"}>
      <p className="text-[14px] leading-[20px]">
        {product.colorKo} / {sel.size}
        {sel.delivery === "빠른배송" && <span className="text-shop-600"> · 빠른배송</span>}
      </p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <QtyStepper qty={sel.qty} onChange={buy.setQty} />
        <p className={cn("font-bold", boxed ? "text-[20px] leading-[26px]" : "text-[24px] leading-[30px]")}>
          <span className="sr-only">주문 금액 </span>
          {won(product.price * sel.qty)}
          <span className="ml-0.5 text-[15px]">원</span>
        </p>
      </div>
    </div>
  );
}

/** 장바구니 (outlined) + 구매하기 (black), or the sold-out pair. */
export function BuyButtons({
  product,
  onCart,
  onBuy,
  className,
}: {
  product: Product;
  onCart: () => void;
  onBuy: () => void;
  className?: string;
}) {
  const base = "h-[50px] rounded text-[15px] leading-[21px] transition-colors";
  if (product.soldOut) {
    return (
      <div className={cn("grid grid-cols-2 gap-2", className)}>
        <button type="button" disabled className={cn(base, "bg-shop-400 text-white")}>
          품절
        </button>
        <button type="button" onClick={() => toast(DEMO_ONLY)} className={cn(base, "border border-shop-900 bg-white hover:bg-shop-100")}>
          재입고 알림 신청
        </button>
      </div>
    );
  }
  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      <button type="button" onClick={onCart} className={cn(base, "border border-shop-900 bg-white hover:bg-shop-100")}>
        장바구니
      </button>
      <button type="button" onClick={onBuy} className={cn(base, "bg-shop-900 text-white hover:bg-black")}>
        구매하기
      </button>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  children,
  selectRef,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: ReactNode;
  selectRef?: React.Ref<HTMLSelectElement>;
  error?: string;
}) {
  const id = useId();
  const errorId = useId();
  return (
    <div className="mt-4">
      <label htmlFor={id} className="mb-1.5 block text-[13px] leading-[19px] text-shop-600">
        {label}
      </label>
      <div className="relative">
        <select
          ref={selectRef}
          id={id}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-[50px] w-full appearance-none rounded-md border bg-white pl-4 pr-10 text-[14px] text-shop-900 focus:border-shop-900 focus:outline-none",
            error ? "border-shop-like" : "border-shop-250",
          )}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2" strokeWidth={1.4} aria-hidden="true" />
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-[13px] leading-[19px] text-shop-like">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Floating "구매하기" tab (reference: appears once the buy buttons leave the
 * screen) and the 346px option panel it slides out.
 */
export function BuyPanel({ product, buy, visible }: { product: Product; buy: Buy; visible: boolean }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sizeRef = useRef<HTMLSelectElement>(null);
  const wasOpen = useRef(false);
  const titleId = useId();
  const shown = visible && open;

  useEffect(() => {
    if (shown) {
      panelRef.current?.focus();
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onKey);
      wasOpen.current = true;
      return () => window.removeEventListener("keydown", onKey);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      if (visible) triggerRef.current?.focus({ preventScroll: true });
    }
  }, [shown, visible]);

  const guard = (action: () => boolean) => () => {
    if (!action()) sizeRef.current?.focus();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        hidden={!visible || open}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="fixed right-0 top-20 z-[80] h-12 w-[76px] rounded-l-md bg-shop-900 text-[14px] font-bold text-white shadow-[0_4px_12px_-4px_rgb(0_0_0/0.4)]"
      >
        구매하기
      </button>
      <div
        ref={panelRef}
        role="dialog"
        aria-labelledby={titleId}
        tabIndex={-1}
        inert={!shown}
        className={cn(
          "fixed right-0 top-20 z-[85] w-[346px] max-w-[calc(100vw-48px)] bg-white px-6 py-[30px] shadow-[0_0_12px_rgb(0_0_0/0.12)] outline-none transition-transform duration-300 ease-out",
          shown ? "translate-x-0" : "translate-x-[calc(100%+48px)]",
        )}
      >
        <button
          type="button"
          aria-label="옵션 선택 닫기"
          onClick={() => setOpen(false)}
          className="absolute -left-12 top-0 flex size-12 items-center justify-center bg-shop-900 text-white"
        >
          <X className="size-5" strokeWidth={1.5} />
        </button>
        <h2 id={titleId} className="border-b-2 border-shop-900 pb-3 text-[17px] font-bold leading-[23px]">
          옵션선택
        </h2>
        <SelectField
          label="사이즈"
          value={buy.sel.size ?? ""}
          onChange={buy.setSize}
          selectRef={sizeRef}
          error={buy.error ? SIZE_REQUIRED : undefined}
        >
          <option value="" disabled>
            사이즈 선택
          </option>
          {product.sizes.map((s) => (
            <option key={s} value={s} disabled={isSizeOut(product, s)}>
              {s}
              {isSizeOut(product, s) ? " (품절)" : ""}
            </option>
          ))}
        </SelectField>
        <SelectField label="배송방법" value={buy.sel.delivery} onChange={(v) => buy.setDelivery(v as Delivery)}>
          {deliveriesOf(product).map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </SelectField>
        <SelectedLine product={product} buy={buy} boxed />
        <BuyButtons product={product} onCart={guard(buy.addCart)} onBuy={guard(buy.buyNow)} className="mt-5" />
      </div>
    </>
  );
}
