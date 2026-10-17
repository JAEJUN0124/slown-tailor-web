"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function FaqList({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="max-w-[760px]">
      <div className="border-t border-line">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={i * 60} className="border-b border-line">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span
                  className={cn(
                    "font-medium transition-colors duration-200",
                    isOpen ? "text-coffee" : "text-espresso group-hover:text-coffee",
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    "grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-300 ease-out",
                    isOpen ? "rotate-45 border-amber bg-amber text-espresso" : "border-coffee/25 text-coffee group-hover:border-coffee/50",
                  )}
                >
                  <Plus width={14} height={14} />
                </span>
              </button>
              <div
                className={cn(
                  "grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="max-w-[640px] pb-6 text-body leading-relaxed text-mocha">{item.a}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
