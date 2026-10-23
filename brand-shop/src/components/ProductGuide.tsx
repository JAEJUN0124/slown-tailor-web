import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DELIVERY_GUIDE, SIZE_CHARTS, SIZE_NOTES, TRADE_NOTES, productNotice, type GuideRow } from "@/content/guide";
import type { Product } from "@/content/types";
import { Accordion } from "./ui";

// Static blocks under the product tabs. They render on the server and reach
// the client detail page as slots.

const cell = "border border-shop-250 px-3 py-3 text-center text-[14px] leading-[20px]";
const head = "bg-shop-100 font-normal text-shop-600";

/** 사이즈 가이드: one chart per size run. */
export function SizeGuide({ product }: { product: Product }) {
  const chart = SIZE_CHARTS[product.sizeKey];
  return (
    <Accordion title="사이즈 가이드" defaultOpen titleClass="font-bold">
      {chart ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse">
            <caption className="sr-only">{product.title} 사이즈 조견표</caption>
            <thead>
              <tr>
                <th scope="col" className={`${cell} ${head} w-[180px]`}>
                  SIZE
                  <span className="block text-[12px] leading-[18px]">{chart.unit}</span>
                </th>
                {product.sizes.map((s) => (
                  <th key={s} scope="col" className={`${cell} ${head}`}>
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chart.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className={`${cell} ${head}`}>
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={i} className={cell}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-[15px] leading-[24px]">단일 사이즈(F) 상품입니다. 크기: {product.fit}</p>
      )}
      <ul className="mt-5 space-y-1 text-[13px] leading-[19px] text-shop-600">
        {SIZE_NOTES.map((n) => (
          <li key={n} className="relative pl-3 before:absolute before:left-0 before:top-[8px] before:size-[3px] before:rounded-full before:bg-shop-600">
            {n}
          </li>
        ))}
      </ul>
    </Accordion>
  );
}

/** 상품정보제공고시 table. */
export function ProductNotice({ product }: { product: Product }) {
  return (
    <Accordion title="상품정보제공고시" className="border-t-2 border-t-shop-900">
      <table className="w-full border-collapse border-t border-shop-250 text-left text-[14px] leading-[20px]">
        <tbody>
          {productNotice(product).map(([label, value]) => (
            <tr key={label} className="border-b border-shop-250">
              <th scope="row" className="w-[38%] bg-shop-100 px-4 py-4 align-top font-normal text-shop-600 md:w-[280px] md:px-6">
                {label}
              </th>
              <td className="px-4 py-4 md:px-9">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Accordion>
  );
}

function GuideCell({ row }: { row: GuideRow }) {
  return (
    <dd className="px-4 py-5 text-[14px] leading-[24px] md:px-9">
      {row.title && <p className="font-bold">{row.title}</p>}
      {row.lines?.map((l) => (
        <p key={l} className={row.title ? "mt-1" : undefined}>
          {l}
        </p>
      ))}
      {row.steps && (
        <ol className="list-inside list-decimal">
          {row.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      )}
      {row.table && (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[420px] max-w-[430px] border-collapse text-[13px] leading-[19px]">
            <thead>
              <tr>
                {row.table.head.map((h) => (
                  <th key={h} scope="col" className="border border-shop-250 bg-shop-100 px-3 py-3 font-normal text-shop-600">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {row.table.rows.map((r) => (
                <tr key={r[0]}>
                  {r.map((v, i) => (
                    <td key={i} className="border border-shop-250 px-3 py-3 text-center">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {row.link && (
        <Link
          href={row.link.href}
          className="mt-3 inline-flex h-9 items-center gap-1 rounded border border-shop-250 px-3 text-[13px] font-bold transition-colors hover:border-shop-900"
        >
          {row.link.label}
          <ChevronRight className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
        </Link>
      )}
      {row.notes && (
        <ul className="mt-3 text-[13px] leading-[22px] text-shop-600">
          {row.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}
    </dd>
  );
}

/** 배송/교환/반품 안내 + 거래관련 기타 유의사항. */
export function DeliveryGuide() {
  return (
    <>
      <Accordion title="배송/교환/반품 안내" defaultOpen className="border-t-2 border-t-shop-900">
        <p className="text-[14px] leading-[20px]">{DELIVERY_GUIDE.intro}</p>
        {DELIVERY_GUIDE.sections.map((section) => (
          <section key={section.title} className="mt-10">
            <h4 className="mb-4 text-[16px] font-bold leading-[22px]">{section.title}</h4>
            <dl className="border-t border-shop-250">
              {section.rows.map((row) => (
                <div key={row.label} className="grid grid-cols-1 border-b border-shop-250 md:grid-cols-[280px_minmax(0,1fr)]">
                  <dt className="bg-shop-100 px-4 py-3 text-[14px] leading-[20px] text-shop-600 md:px-6 md:py-5">{row.label}</dt>
                  <GuideCell row={row} />
                </div>
              ))}
            </dl>
          </section>
        ))}
      </Accordion>
      <Accordion title="거래관련 기타 유의사항">
        <ul className="space-y-2 text-[14px] leading-[22px]">
          {TRADE_NOTES.map((n) => (
            <li key={n} className="relative pl-3 before:absolute before:left-0 before:top-[10px] before:size-[3px] before:rounded-full before:bg-shop-900">
              {n}
            </li>
          ))}
        </ul>
      </Accordion>
    </>
  );
}
