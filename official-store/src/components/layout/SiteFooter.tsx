"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";
import { COMPANY, FOOTER_TREE } from "@/content/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "./SiteHeader";

// Footer (reference: #footer.new2312). From 1440px: company details on the
// left, a four-column site map on the right. Below that the site map becomes
// an accordion above the company details. Sizes follow the reference's vw
// values, so the type grows with the window.
export function SiteFooter() {
  const home = usePathname() === "/";
  const [open, setOpen] = useState<string | null>(null);
  const baseId = useId();

  return (
    <footer className={cn(home ? "bg-st-soft" : "bg-st-foot")}>
      <div
        className={cn(
          "mx-auto flex flex-wrap-reverse pb-[19.2vw] pt-[3.73vw] md:pb-[9.375vw] md:pt-[1.82vw] wide:flex-nowrap wide:justify-between wide:pb-[5vw] wide:pt-[2.5vw]",
          home ? "w-[calc(100%-32px)] xl:w-[calc(100%-48px)]" : "w-[calc(100%-10.67vw)] md:w-[calc(100%-8.33vw)] wide:w-full wide:max-w-[1440px]",
        )}
      >
        <div className="mt-[10.67vw] w-full md:mt-[5.2vw] wide:ml-[82px] wide:mt-0 wide:w-auto">
          <Wordmark className="text-[4.4vw] md:text-[2.1vw] wide:text-[1.15vw]" />
          <ul className="mt-[5.6vw] space-y-[1.6vw] md:mt-[2.73vw] md:space-y-[0.78vw] wide:mt-[1.46vw] wide:space-y-[0.42vw]">
            {COMPANY.info.map((r) => (
              <li key={r.label} className="text-[3.47vw] leading-[1.4] text-st-text md:text-[1.69vw] md:font-medium wide:text-[0.972vw] wide:font-normal">
                {r.label}:{r.value}
              </li>
            ))}
          </ul>
          <div className="mt-[10.13vw] md:mt-[4.95vw] wide:mt-[2.64vw]">
            <p className="text-[3.47vw] leading-[1.4] text-st-text md:text-[1.69vw] md:font-medium wide:text-[0.972vw] wide:font-normal">{COMPANY.cs.title}</p>
            <ul className="mt-[1.33vw] space-y-[1.33vw] md:mt-[0.65vw] md:space-y-[0.65vw] wide:mt-[0.35vw] wide:space-y-[0.35vw]">
              {COMPANY.cs.rows.map((r) => (
                <li key={r.label} className="text-[3.47vw] leading-[1.4] text-st-text md:text-[1.69vw] md:font-medium wide:text-[0.972vw] wide:font-normal">
                  {r.label}:{r.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav aria-label="사이트맵" className="w-full wide:mr-[82px] wide:w-auto">
          <ul className="wide:flex wide:gap-x-[62.5px]">
            {FOOTER_TREE.map((group, i) => {
              const expanded = open === group.label;
              const panelId = `${baseId}-${i}`;
              return (
                <li key={group.label} className="wide:w-[7.64vw]">
                  {/* Accordion header below 1440px, plain column title above. */}
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : group.label)}
                    className="flex w-full items-center justify-between border-b-[0.27vw] border-st-faint py-[2.67vw] text-left text-[3.47vw] font-medium leading-[5.55vw] text-st-text md:border-b-[0.13vw] md:py-[1.3vw] md:text-[1.69vw] md:leading-[2.71vw] wide:hidden"
                  >
                    {group.label}
                    {expanded ? <Minus className="size-[4.27vw] md:size-[2.08vw]" strokeWidth={1.2} aria-hidden="true" /> : <Plus className="size-[4.27vw] md:size-[2.08vw]" strokeWidth={1.2} aria-hidden="true" />}
                  </button>
                  <Link href={group.href} className="hidden text-[0.903vw] font-bold leading-[1.32vw] text-st-text wide:block">
                    {group.label}
                  </Link>
                  <ul id={panelId} className={cn("wide:mt-[1.32vw] wide:block", expanded ? "block py-[2vw] md:py-[1vw]" : "hidden")}>
                    {group.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="block py-[1.2vw] text-[3.73vw] leading-[5.07vw] text-st-text md:py-[0.5vw] md:text-[1.82vw] md:leading-[2.47vw] wide:py-0 wide:text-[0.972vw] wide:leading-[1.32vw]"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
