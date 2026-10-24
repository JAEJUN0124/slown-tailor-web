"use client";

import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";
import type { FaqGroup } from "@/content/info";
import { cn } from "@/lib/utils";

/**
 * FAQ (reference: /faq.html). Category on the left, questions on the right;
 * a question opens its answer under it and turns bold.
 */
export function FaqList({ groups }: { groups: FaqGroup[] }) {
  const base = useId();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div>
      {groups.map((g, gi) => (
        <section key={g.title} className="border-t border-st-line py-6 xl:grid xl:grid-cols-[235px_1fr] xl:pb-[100px] xl:pt-6">
          <h2 className="mb-3 text-[12px] font-bold leading-[18px] text-st-ink xl:mb-0">{g.title}</h2>
          <ul className="xl:pr-2.5">
            {g.items.map((item, ii) => {
              const id = `${base}-${gi}-${ii}`;
              const on = open === id;
              return (
                <li key={item.q} className="border-b border-st-line">
                  <button type="button" aria-expanded={on} aria-controls={id} onClick={() => setOpen(on ? null : id)} className="flex w-full items-start gap-4 py-[15px] text-left text-[12px] leading-[18px] text-st-ink">
                    <span aria-hidden="true">Q</span>
                    <span className={cn("flex-1", on && "font-bold")}>{item.q}</span>
                    {on ? <Minus className="size-3.5 shrink-0" strokeWidth={1.2} aria-hidden="true" /> : <Plus className="size-3.5 shrink-0" strokeWidth={1.2} aria-hidden="true" />}
                  </button>
                  <p id={id} hidden={!on} className="gap-4 pb-8 text-[12px] leading-[18px] text-st-ink [&:not([hidden])]:flex">
                    <span aria-hidden="true">A</span>
                    <span className="flex-1">{item.a}</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
