"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { shopHref } from "@/content/catalog";

/** Plain menu entry (the tree nodes carry match functions, which cannot cross to the client). */
export type NavEntry = { path: string; name: string };
import { cn } from "@/lib/utils";

// List header built from the category tree (reference: CreateSection):
// the first-level name, the LNB (regulars + subs of that level, current one
// grayed) and, when the current line has them, a row of third-level sections
// (current one underlined). On phones both rows scroll sideways and the
// current section is scrolled into the middle.

export function CategoryNav({
  title,
  lnb,
  current,
  sections,
  activeSection,
}: {
  title: string;
  lnb: NavEntry[];
  current: string;
  sections?: NavEntry[];
  activeSection?: string;
}) {
  const lnbRef = useRef<HTMLUListElement>(null);
  const secRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState({ width: 100, left: 0 });

  // Bring the current items into view on narrow screens.
  useEffect(() => {
    const center = (box: HTMLElement | null, sel: string) => {
      const el = box?.querySelector<HTMLElement>(sel);
      if (!box || !el || box.scrollWidth <= box.clientWidth) return;
      box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2 });
    };
    center(lnbRef.current, "[aria-current]");
    const t = window.setTimeout(() => center(secRef.current, "[aria-current]"), 550);
    return () => window.clearTimeout(t);
  }, [current, activeSection]);

  const onSecScroll = () => {
    const el = secRef.current;
    if (!el) return;
    const frac = el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1;
    const max = el.scrollWidth - el.clientWidth;
    setProgress({ width: frac * 100, left: max > 0 ? (el.scrollLeft / max) * (1 - frac) * 100 : 0 });
  };
  useEffect(onSecScroll, [sections]);

  return (
    <div>
      <header className="flex h-[17.07vw] items-center xl:h-[78px] xl:border-b-[0.5px] xl:border-st-ink xl:pl-7">
        <h1 className="ml-[3.2vw] text-[4.8vw] font-semibold leading-[1.6] tracking-[-0.02em] text-st-ink xl:ml-0 xl:text-[20px]">{title}</h1>
      </header>
      <nav aria-label={`${title} 카테고리`} className="border-b-[0.13vw] border-st-ink xl:border-b-[0.5px]">
        <ul ref={lnbRef} className="scrollbar-none flex h-[12.27vw] items-center overflow-x-auto xl:h-[72px] xl:overflow-visible">
          {lnb.map((n, i) => {
            const on = n.path === current;
            return (
              <li key={n.path} className={cn("shrink-0", i === 0 && "xl:ml-2")}>
                <Link
                  href={shopHref(n.path)}
                  aria-current={on ? "page" : undefined}
                  className={cn("flex items-center whitespace-nowrap px-[3.2vw] text-[4.27vw] leading-[1.6] xl:px-5 xl:text-[16px]", on ? "text-black/20" : "text-st-ink")}
                >
                  {n.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {sections && sections.length > 1 && (
        <div className="relative border-b-[0.13vw] border-black/20 xl:border-b-[0.5px]">
          <div ref={secRef} onScroll={onSecScroll} className="scrollbar-none flex h-[13.33vw] items-center overflow-x-auto xl:h-[60px]">
            {sections.map((s, i) => {
              const on = s.path === activeSection;
              return (
                <Link
                  key={s.path}
                  href={shopHref(s.path)}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "flex h-full shrink-0 items-center whitespace-nowrap px-[3.2vw] text-[3.73vw] leading-[1.6] text-st-ink xl:px-6 xl:text-[16px]",
                    i === 0 && "xl:ml-1",
                    on && "underline underline-offset-[7.5px]",
                  )}
                >
                  {s.name}
                </Link>
              );
            })}
          </div>
          {/* Scroll position of the section row on phones. */}
          {progress.width < 100 && (
            <span className="absolute inset-x-0 bottom-0 h-[0.8vw] bg-transparent xl:hidden" aria-hidden="true">
              <span className="absolute inset-y-0 bg-[#9f9f9f]" style={{ width: `${progress.width}%`, left: `${progress.left}%` }} />
            </span>
          )}
        </div>
      )}
    </div>
  );
}
