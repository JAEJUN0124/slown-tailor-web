"use client";

import { Check } from "lucide-react";
import type { PriceItem } from "@/content/pricing";
import { cn, won } from "@/lib/utils";
import { RichText } from "./RichText";
import { usePricing } from "./selection";

function priceText(n: number, item: PriceItem) {
  return `${won(n)}원${item.fromTilde ? "~" : ""}`;
}

function CheckMark({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-[3px] grid h-5 w-5 flex-shrink-0 place-items-center rounded-full border transition-colors duration-300",
        selected ? "border-amber bg-amber text-espresso" : "border-coffee/30 text-transparent group-hover:border-coffee/60",
      )}
    >
      <Check className="h-3 w-3" strokeWidth={3} />
    </span>
  );
}

/** A line on the price menu. Tapping it adds/removes it from the quote. */
export function MenuItem({ item }: { item: PriceItem }) {
  const { isSelected, dispatch } = usePricing();
  const selected = isSelected(item.id);
  const event = item.saleLabel === "이벤트가";

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => dispatch({ type: "toggle", id: item.id })}
      className={cn(
        "group grid w-full grid-cols-[auto_1fr] items-start gap-x-4 gap-y-3 border-b border-line px-3 py-5 text-left transition-colors duration-300 sm:grid-cols-[auto_1fr_auto]",
        selected ? "bg-latte/70" : "hover:bg-latte/40",
      )}
    >
      <CheckMark selected={selected} />
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {item.dot && <span className="inline-block h-2 w-2 flex-shrink-0 rounded-full" style={{ background: item.dot }} />}
          <span className={cn("text-body font-semibold transition-colors", selected ? "text-coffee" : "text-espresso")}>
            {item.title}
            {item.titleSuffix && <span className="font-normal text-mocha">{item.titleSuffix}</span>}
          </span>
          {item.tag && <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-mocha">{item.tag}</span>}
          {item.badge && (
            <span className="rounded-full bg-amber px-2 py-0.5 text-[10px] font-semibold leading-none text-espresso">{item.badge}</span>
          )}
        </span>
        {item.desc && (
          <span className="mt-1.5 block max-w-[560px] text-caption leading-relaxed text-mocha">
            <RichText text={item.desc} emphasis="font-medium text-coffee" />
          </span>
        )}
      </span>
      <span className="col-start-2 text-left sm:col-start-3 sm:text-right">
        <span className="flex items-baseline gap-1.5 sm:justify-end">
          {event && <span className="text-[11px] font-semibold text-amber-deep">{item.saleLabel}</span>}
          <span className="text-[19px] font-extrabold tabular-nums tracking-tight text-coffee">{priceText(item.price, item)}</span>
        </span>
        {item.listPrice !== undefined && (
          <span className="mt-0.5 block text-[11px] text-mocha/80">
            {item.listLabel} <s>{priceText(item.listPrice, item)}</s>
            {item.fromWord && " 부터"}
          </span>
        )}
      </span>
    </button>
  );
}

/** Single-price line for custom items and design options. */
export function PlainItem({ item, optionPricing = false }: { item: PriceItem; optionPricing?: boolean }) {
  const { isSelected, dispatch } = usePricing();
  const selected = isSelected(item.id);
  const label = item.priceText ?? (optionPricing ? (item.price === 0 ? "무료" : `+${won(item.price)}원`) : `${won(item.price)}원`);

  if (item.priceText) {
    return (
      <div className="flex items-center justify-between gap-4 border-b border-line px-3 py-5">
        <span className="pl-9 text-body font-semibold text-espresso">{item.title}</span>
        <span className="text-caption text-mocha">{label}</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => dispatch({ type: "toggle", id: item.id })}
      className={cn(
        "group flex w-full items-start gap-4 border-b border-line px-3 py-5 text-left transition-colors duration-300",
        selected ? "bg-latte/70" : "hover:bg-latte/40",
      )}
    >
      <CheckMark selected={selected} />
      <span className={cn("min-w-0 flex-1 text-body font-semibold transition-colors", selected ? "text-coffee" : "text-espresso")}>
        {item.title}
      </span>
      <span className="flex-shrink-0 text-[16px] font-bold tabular-nums text-coffee">{label}</span>
    </button>
  );
}
