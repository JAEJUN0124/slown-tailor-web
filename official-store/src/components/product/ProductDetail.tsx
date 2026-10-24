"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight, Minus, Plus, Star, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GALLERY_FRAMES, ProductArt } from "@/components/art/ProductArt";
import { productHref } from "@/content/catalog";
import { loginFor } from "@/content/site";
import type { Product } from "@/content/types";
import { addToBag, toast } from "@/lib/store";
import { useDismiss } from "@/lib/useDismiss";
import { cn, won } from "@/lib/utils";
import { DetailDrawer, type DrawerTab } from "./DetailDrawer";

type Row = { size: string; qty: number };

// Product detail (reference: an Astro island on /product/detail.html). Gallery
// on the left half, product info centred on the right; on phones the info
// stacks under the gallery and buying goes through a bottom sheet.

export function ProductDetail({ product: p }: { product: Product }) {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [drawer, setDrawer] = useState<{ open: boolean; tab: DrawerTab }>({ open: false, tab: "상세 정보" });
  const allSoldOut = p.soldOut || p.sizes.every((s) => p.soldOutSizes.includes(s));
  const total = rows.reduce((n, r) => n + r.qty * p.price, 0);

  const openDrawer = (tab: DrawerTab) => setDrawer({ open: true, tab });

  const commit = (then: "bag" | "buy") => {
    if (p.upcoming) {
      toast("출시 알림을 신청했습니다. (데모 화면이라 알림은 가지 않습니다.)");
      return;
    }
    if (!rows.length) {
      setError(true);
      return;
    }
    addToBag(rows.map((r) => ({ id: p.id, size: r.size, qty: r.qty })));
    setSheet(false);
    if (then === "bag") setAdded(true);
    else router.push(`${loginFor("/order/")}&from=buy`);
  };

  const picker = (where: "inline" | "sheet") => (
    <OptionPicker
      where={where}
      product={p}
      rows={rows}
      error={error}
      soldOut={allSoldOut}
      onPick={(size) => {
        setError(false);
        setRows((rs) => (rs.some((r) => r.size === size) ? rs : [...rs, { size, qty: 1 }]));
      }}
      onQty={(size, qty) => setRows((rs) => rs.map((r) => (r.size === size ? { ...r, qty: Math.max(1, Math.min(99, qty)) } : r)))}
      onRemove={(size) => setRows((rs) => rs.filter((r) => r.size !== size))}
      onGuide={() => openDrawer("사이즈 안내")}
      total={total}
      onBag={() => commit("bag")}
      onBuy={() => commit("buy")}
    />
  );

  return (
    <>
      <div className="relative xl:flex xl:gap-8">
        <Gallery product={p} />
        <div className="flex xl:min-h-[calc(100vh-39px)] xl:flex-1 xl:items-center xl:justify-center">
          <div className="w-full xl:mx-auto xl:h-fit xl:max-w-[547px]">
            <div className="space-y-8 px-3 pb-8 pt-6 xl:pt-0">
              <div className="space-y-1">
                <h1 className="text-[20px] font-[450] leading-[1.3] text-st-text xl:text-[24px]">{p.name}</h1>
                <p className="text-[14px] font-semibold leading-[1.4] text-st-text xl:text-[16px] xl:font-medium xl:leading-[1.6]">{p.nameEn}</p>
                <p className="text-[14px] leading-[1.6] text-st-mute xl:text-[16px]">{p.tagline}</p>
                <div className="h-4" />
                <div className="flex items-center justify-between">
                  <p className="text-[16px] font-medium leading-[1.4] text-st-text xl:text-[20px]">KRW {won(p.price)}</p>
                  {p.reviews > 0 && (
                    <a href="#reviews" className="flex items-center gap-1 text-[13px] text-st-text">
                      <Star className="size-[13px] fill-st-deep" strokeWidth={0} aria-hidden="true" />
                      <span className="mr-1">{p.rating.toFixed(1)}</span>
                      <span className="underline underline-offset-2">{p.reviews}개 리뷰</span>
                    </a>
                  )}
                </div>
              </div>
              <p className="text-[14px] leading-[1.6] text-st-mute">{p.desc}</p>
              <button type="button" onClick={() => openDrawer("상세 정보")} className="flex items-center gap-0.5 text-[14px] text-st-text">
                <Plus className="size-4" strokeWidth={1.2} aria-hidden="true" />
                <span className="underline underline-offset-2">상품 상세 정보 보기</span>
              </button>
            </div>

            <div className="space-y-4 px-3 pb-8">
              <p className="text-[14px] leading-[1.6] text-st-text">색상: {p.colorName}</p>
              <ul className="grid grid-cols-6 gap-2 sm:grid-cols-8">
                {p.swatches.map((s) => {
                  const on = s.id === p.id;
                  return (
                    <li key={s.id}>
                      <Link
                        href={productHref(s.id)}
                        aria-label={`${s.name}${on ? " (선택됨)" : ""}`}
                        aria-current={on ? "true" : undefined}
                        className={cn("block p-0.5", on && "border-[0.5px] border-st-ink")}
                      >
                        <ProductArt art={{ ...p, color: s.color, tone: s.tone }} className="aspect-[3/4] w-full" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="hidden px-3 pb-3 xl:block">{picker("inline")}</div>
          </div>
        </div>
      </div>

      {/* Phones: fixed buy button, then the option sheet. */}
      <div data-buybar className="fixed inset-x-0 bottom-0 z-[80] border-t border-st-line bg-white px-4 py-3 xl:hidden">
        <button type="button" onClick={() => setSheet(true)} className="h-11 w-full bg-st-ink text-[14px] text-white" disabled={allSoldOut && !p.upcoming}>
          {p.upcoming ? "출시 알림 신청" : allSoldOut ? "품절" : "구매하기"}
        </button>
      </div>
      <div aria-hidden="true" onClick={() => setSheet(false)} className={cn("fixed inset-0 z-[200] bg-st-soft transition-opacity duration-[400ms] xl:hidden", sheet ? "opacity-50" : "pointer-events-none opacity-0")} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="옵션 선택"
        inert={!sheet}
        className={cn(
          "fixed inset-x-0 bottom-0 z-[210] bg-white px-5 pb-5 pt-10 shadow-[0_-2px_12px_0_rgb(0_0_0/0.1)] transition-[transform,opacity] duration-[400ms] ease-in-out xl:hidden",
          sheet ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        )}
      >
        {picker("sheet")}
      </div>

      {added && <AddedDialog onClose={() => setAdded(false)} />}
      <DetailDrawer product={p} open={drawer.open} tab={drawer.tab} onTab={(tab) => setDrawer({ open: true, tab })} onClose={() => setDrawer((d) => ({ ...d, open: false }))} />
    </>
  );
}

// ── Gallery ────────────────────────────────────────────────────────────
function Gallery({ product: p }: { product: Product }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const frames = Array.from({ length: GALLERY_FRAMES }, (_, i) => i);

  const slideWidth = () => track.current?.querySelector<HTMLElement>("[data-slide]")?.offsetWidth ?? 1;
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // At the far end the last slide counts as current, even when it cannot reach the left edge.
    setIndex(el.scrollLeft >= max - 2 ? frames.length - 1 : Math.round(el.scrollLeft / slideWidth()));
  };
  const go = (step: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(frames.length - 1, index + step));
    el.scrollTo({ left: next * slideWidth(), behavior: "smooth" });
  };

  return (
    <div className="relative xl:w-[50vw] xl:shrink-0">
      <div ref={track} onScroll={onScroll} className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain">
        {frames.map((f) => (
          <div key={f} data-slide className="w-full shrink-0 snap-start xl:w-auto">
            <ProductArt art={p} frame={f} className="aspect-[2/3] w-full xl:h-[calc(100vh-76px)] xl:w-auto" />
          </div>
        ))}
      </div>
      {/* Phones: one short bar per photo. */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-center gap-1 px-5 py-6 xl:hidden" aria-hidden="true">
        {frames.map((f) => (
          <span key={f} className={cn("block h-px w-4 bg-st-ink", f === index ? "opacity-100" : "opacity-20")} />
        ))}
      </div>
      <div className="hidden h-[38px] items-center justify-center px-2.5 xl:flex">
        <button type="button" aria-label="이전 사진" onClick={() => go(-1)} disabled={index === 0} className="flex size-8 items-center justify-start disabled:text-st-faint">
          <ChevronLeft className="size-4" strokeWidth={1.4} />
        </button>
        <span className="text-[14px] tabular-nums leading-[1.6] text-st-text" aria-live="polite">
          {index + 1} / {frames.length}
        </span>
        <button type="button" aria-label="다음 사진" onClick={() => go(1)} disabled={index === frames.length - 1} className="flex size-8 items-center justify-end disabled:text-st-faint">
          <ChevronRight className="size-4" strokeWidth={1.4} />
        </button>
      </div>
    </div>
  );
}

// ── Options ────────────────────────────────────────────────────────────
function OptionPicker({
  where,
  product: p,
  rows,
  error,
  soldOut,
  onPick,
  onQty,
  onRemove,
  onGuide,
  total,
  onBag,
  onBuy,
}: {
  where: "inline" | "sheet";
  product: Product;
  rows: Row[];
  error: boolean;
  soldOut: boolean;
  onPick: (size: string) => void;
  onQty: (size: string, qty: number) => void;
  onRemove: (size: string) => void;
  onGuide: () => void;
  total: number;
  onBag: () => void;
  onBuy: () => void;
}) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  useDismiss(box, open, () => setOpen(false));
  const listId = `size-list-${where}`;
  const last = rows[rows.length - 1];

  useEffect(() => {
    if (error) button.current?.focus();
  }, [error]);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[14px] leading-[1.6] text-st-text">옵션 선택</p>
          <button type="button" onClick={onGuide} className="text-[14px] leading-[1.6] text-st-text underline underline-offset-2">
            사이즈 안내
          </button>
        </div>
        <div ref={box} className="relative">
          {p.upcoming ? (
            <p className="border border-st-ink px-3 py-2.5 text-[14px] leading-[1.6] text-st-mute">출시 전 제품입니다. 알림을 신청하시면 출시 소식을 먼저 전해드립니다.</p>
          ) : open ? (
            <div className="border border-st-ink">
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="text-[14px] leading-[1.6] text-st-text">사이즈를 선택해주세요.</span>
                <button type="button" aria-label="사이즈 목록 닫기" onClick={() => setOpen(false)} className="flex size-5 items-center justify-center">
                  <X className="size-3.5" strokeWidth={1.4} />
                </button>
              </div>
              <ul id={listId} role="listbox" aria-label="사이즈">
                {p.sizes.map((s) => {
                  const out = p.soldOut || p.soldOutSizes.includes(s);
                  return (
                    <li key={s} role="option" aria-selected={rows.some((r) => r.size === s)} aria-disabled={out}>
                      <button
                        type="button"
                        disabled={out}
                        onClick={() => {
                          onPick(s);
                          setOpen(false);
                          button.current?.focus();
                        }}
                        className="block w-full px-3 py-3 text-left text-[14px] leading-[1.6] text-st-text hover:bg-st-soft disabled:text-st-faint disabled:hover:bg-transparent"
                      >
                        {s}
                        {out && " (품절)"}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <button
              ref={button}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={false}
              aria-controls={listId}
              aria-invalid={error || undefined}
              aria-describedby={error ? `${listId}-error` : undefined}
              onClick={() => setOpen(true)}
              disabled={soldOut}
              className={cn(
                "flex w-full items-center justify-between border px-3 py-2.5 text-left text-[14px] leading-[1.6]",
                error ? "border-[#c0392b]" : "border-st-ink",
                last ? "text-st-text" : "text-st-faint",
              )}
            >
              {soldOut ? "품절된 제품입니다." : last ? last.size : "사이즈를 선택해주세요."}
              <ChevronDown className="size-3 shrink-0 text-st-text" strokeWidth={1.6} aria-hidden="true" />
            </button>
          )}
          {error && (
            <p id={`${listId}-error`} role="alert" className="mt-2 text-[13px] text-[#c0392b]">
              사이즈를 먼저 골라 주세요.
            </p>
          )}
        </div>
      </div>

      {rows.length > 0 && (
        <div>
          <ul className="space-y-2 border-b border-st-ink pb-4">
            {rows.map((r) => (
              <li key={r.size} className="flex items-center justify-between text-[14px] leading-[1.6] text-st-text">
                <span>{r.size}</span>
                <span className="flex items-center gap-5">
                  <span className="flex items-center gap-3">
                    <button type="button" aria-label={`${r.size} 수량 줄이기`} onClick={() => onQty(r.size, r.qty - 1)} disabled={r.qty <= 1} className="text-st-mute disabled:text-st-line">
                      <Minus className="size-3.5" strokeWidth={1.4} />
                    </button>
                    <span className="w-4 text-center tabular-nums" aria-label={`수량 ${r.qty}`}>
                      {r.qty}
                    </span>
                    <button type="button" aria-label={`${r.size} 수량 늘리기`} onClick={() => onQty(r.size, r.qty + 1)} className="text-st-mute">
                      <Plus className="size-3.5" strokeWidth={1.4} />
                    </button>
                  </span>
                  <button type="button" aria-label={`${r.size} 빼기`} onClick={() => onRemove(r.size)} className="text-st-mute">
                    <X className="size-3.5" strokeWidth={1.4} />
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <p className="pt-4 text-right text-[16px] font-medium leading-[1.4] text-st-text">KRW {won(total)}</p>
        </div>
      )}

      <div className="flex gap-1">
        {p.upcoming ? (
          <button type="button" onClick={onBuy} className="grid h-11 w-full place-items-center border border-st-ink bg-st-ink text-[14px] text-white xl:text-[16px]">
            출시 알림 신청
          </button>
        ) : (
          <>
            <button type="button" onClick={onBag} disabled={soldOut} className="grid h-11 w-full place-items-center border border-st-ink bg-white text-[14px] text-st-ink disabled:border-st-line disabled:text-st-faint xl:text-[16px]">
              장바구니
            </button>
            <button type="button" onClick={onBuy} disabled={soldOut} className="grid h-11 w-full place-items-center border border-st-ink bg-st-ink text-[14px] text-white disabled:border-st-line disabled:bg-st-line xl:text-[16px]">
              {soldOut ? "품절" : "구매하기"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/** Centred confirmation after adding to the bag (reference: ADD TO BAG layer). */
function AddedDialog({ onClose }: { onClose: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLAnchorElement>(null);
  useDismiss(box, true, onClose);
  useEffect(() => first.current?.focus(), []);
  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center px-4">
      <div ref={box} role="alertdialog" aria-modal="true" aria-labelledby="added-title" aria-describedby="added-desc" className="w-full max-w-[420px] border border-st-ink bg-white">
        <h2 id="added-title" className="mx-4 border-b border-st-line px-4 py-3 text-[13px] font-semibold uppercase tracking-normal text-st-ink">
          Add to bag
        </h2>
        <p id="added-desc" className="px-4 pb-14 pt-6 text-[12px] text-st-ink">
          장바구니에 상품이 정상적으로 담겼습니다.
        </p>
        <div className="flex items-center justify-between px-4 pb-3 text-[12px]">
          <Link ref={first} href="/cart/" className="text-st-ink">
            쇼핑백 확인하기
          </Link>
          <button type="button" onClick={onClose} className="text-st-ink underline underline-offset-2">
            계속 쇼핑하기
          </button>
        </div>
      </div>
    </div>
  );
}
