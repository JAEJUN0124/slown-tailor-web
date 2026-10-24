import { ChevronRight } from "lucide-react";
import type { PolicyDoc } from "@/content/policy";
import { BRAND } from "@/content/site";

/**
 * Terms / privacy screen (reference: big title at the top right, a
 * "BRAND > TITLE" trail over a 1px rule, then the text column).
 */
export function PolicyView({ doc }: { doc: PolicyDoc }) {
  return (
    <div className="px-[18px] pb-24 pt-5 xl:px-7">
      <h1 className="text-right text-[22px] font-medium uppercase leading-[1.4] tracking-normal text-st-text xl:text-[24px]">{doc.title}</h1>
      <p className="mt-[30px] flex items-center border-b border-st-ink pb-[11px] text-[13px] uppercase leading-[18px] tracking-normal text-st-ink">
        {BRAND.short}
        <ChevronRight className="mx-1 size-3.5" strokeWidth={1.2} aria-hidden="true" />
        {doc.title}
      </p>
      <div className="mt-[38px] max-w-[1022px] text-[12px] leading-[17px] text-st-ink xl:ml-[347px]">
        <h2 className="mb-[18px] font-bold">{doc.heading}</h2>
        {doc.articles.map((a) => (
          <section key={a.title || a.body[0]} className="mb-[17px]">
            {a.title && <h3 className="mb-[17px]">{a.title}</h3>}
            {a.body.map((b) => (
              <p key={b}>{b}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
