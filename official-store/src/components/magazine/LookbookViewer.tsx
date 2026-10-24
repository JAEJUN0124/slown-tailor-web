"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { SceneArt } from "@/components/art/SceneArt";
import { productHref } from "@/content/catalog";
import type { Product, Scene } from "@/content/types";
import { cn } from "@/lib/utils";

export type Look = { top: Product; bottom: Product; mood: Scene["mood"] };

/**
 * Lookbook (reference: /campaign/26aw_winter_men): three photos of the
 * current look on the left (each with a "+" to the piece), the look name,
 * copy and a strip of look thumbnails with a progress bar on the right.
 */
export function LookbookViewer({ title, body, looks }: { title: string; body: string; looks: Look[] }) {
  const [current, setCurrent] = useState(0);
  const strip = useRef<HTMLUListElement>(null);
  const look = looks[current];
  const outfit = (l: Look): Scene => ({ kind: "outfit", mood: l.mood, items: [l.top, l.bottom, { kind: "shoes", color: "#1c1c1d" }] });

  const pick = (i: number) => {
    setCurrent(i);
    const el = strip.current?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const plus = (p: Product) => (
    <Link href={productHref(p.id)} aria-label={`${p.name} 보기`} className="absolute bottom-3 right-3 flex size-8 items-center justify-center text-st-ink">
      <Plus className="size-4" strokeWidth={1.2} />
    </Link>
  );

  return (
    <div className="gap-8 px-4 pb-20 pt-[30px] lg:flex lg:items-start lg:pb-[30px]">
      <h1 className="sr-only">{title}</h1>
      <div className="grid grid-cols-[2fr_1fr] gap-2 lg:w-[694px] lg:shrink-0">
        <div className="relative row-span-2 aspect-[456/750] overflow-hidden">
          <SceneArt scene={outfit(look)} />
          {plus(look.top)}
        </div>
        <div className="relative overflow-hidden">
          <SceneArt scene={{ kind: "hanger", mood: "paper", items: [look.top] }} />
          {plus(look.top)}
        </div>
        <div className="relative overflow-hidden">
          <SceneArt scene={{ kind: "hanger", mood: "stone", flip: true, items: [look.bottom] }} />
          {plus(look.bottom)}
        </div>
      </div>

      <div className="mt-10 lg:mt-0 lg:flex lg:min-h-[750px] lg:flex-1 lg:items-center lg:justify-center">
        <div className="w-full max-w-[459px]">
          <h2 className="text-[24px] font-normal leading-[1.3] text-st-ink">Look {String(current + 1).padStart(2, "0")}</h2>
          <p className="mt-6 text-[12px] leading-[18px] text-st-ink">{body}</p>
          <ul ref={strip} className="scrollbar-none mt-10 flex gap-2.5 overflow-x-auto">
            {looks.map((l, i) => (
              <li key={i} className="w-[90px] shrink-0">
                <button type="button" aria-current={i === current} onClick={() => pick(i)} className="block w-full text-center">
                  <span className={cn("block aspect-[90/134] overflow-hidden transition-opacity", i === current && "opacity-30")}>
                    <SceneArt scene={outfit(l)} />
                  </span>
                  <span className={cn("mt-2 block text-[11px] text-st-ink", i === current && "opacity-30")}>Look {String(i + 1).padStart(2, "0")}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="relative mt-5 h-0.5 bg-st-line">
            <span className="absolute inset-y-0 left-0 bg-st-text transition-[width] duration-300" style={{ width: `${((current + 1) / looks.length) * 100}%` }} />
          </div>
          <p className="mt-4 text-center text-[14px] tabular-nums text-st-mute">
            {current + 1}/{looks.length}
          </p>
        </div>
      </div>
    </div>
  );
}
