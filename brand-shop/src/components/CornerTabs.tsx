"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Category tabs of the New In / Bestsellers corners: bold 20px labels in
 * light gray, the active one dark with a 2px underline (also on hover).
 * Like the reference, the first tab shown is picked at random after load.
 */
export function useRandomTab(count: number) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    setActive(Math.floor(Math.random() * count));
  }, [count]);
  return [active, setActive] as const;
}

export function CornerTabs({
  labels,
  active,
  onChange,
  vertical = false,
  className,
  idPrefix,
}: {
  labels: readonly string[];
  active: number;
  onChange: (index: number) => void;
  /** Stacked on large screens (New In); always a row below that. */
  vertical?: boolean;
  className?: string;
  idPrefix: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + labels.length) % labels.length;
    onChange(next);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-orientation={vertical ? "vertical" : "horizontal"}
      onKeyDown={onKeyDown}
      className={cn("flex", vertical ? "gap-6 lg:flex-col lg:items-start lg:gap-4" : "justify-center gap-6", className)}
    >
      {labels.map((label, i) => (
        <button
          key={label}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="button"
          role="tab"
          id={`${idPrefix}-tab-${i}`}
          aria-selected={i === active}
          aria-controls={`${idPrefix}-panel`}
          tabIndex={i === active ? 0 : -1}
          onClick={() => onChange(i)}
          className={cn(
            "relative text-[18px] font-bold leading-[26px] transition-colors md:text-[20px]",
            "after:absolute after:-bottom-px after:left-0 after:h-0.5 after:w-full after:bg-shop-900 after:content-['']",
            i === active
              ? "text-shop-900 after:opacity-100"
              : "text-shop-400 after:opacity-0 hover:text-shop-900 hover:after:opacity-100",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

/** Stable ids for a tablist + its panel. */
export function useTabIds() {
  return useId().replace(/:/g, "");
}
