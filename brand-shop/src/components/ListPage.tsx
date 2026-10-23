import Link from "next/link";
import { LISTS, listProducts, type ListKey } from "@/content/catalog";
import { BRAND } from "@/content/shop";
import { cn } from "@/lib/utils";
import { ProductListing } from "./ProductListing";
import { Breadcrumb } from "./ui";

/**
 * Category list (reference: `/LEMAIRE/{Category}/list`): title with the item
 * count over a 2px rule, sub-category links, then filters, sort and a 6-column
 * grid. Inside the brand shop the cards leave the brand line out.
 */
export function ListPage({ list, sub }: { list: ListKey; sub?: string }) {
  const def = LISTS[list];
  const subDef = def.subs.find((s) => s.slug === sub);
  const products = listProducts(list, sub);
  const tabs = [
    { label: "전체", href: `/list/${list}/`, on: !sub },
    ...def.subs.map((s) => ({ label: s.label, href: `/list/${list}/${s.slug}/`, on: s.slug === sub })),
    // The reference ends the shelf tabs with a New In shortcut.
    ...(list === "men" || list === "women" ? [{ label: "신상품", href: `/list/new/${list}/`, on: false }] : []),
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: BRAND.name, href: "/" },
          { label: def.label, href: `/list/${list}/` },
          ...(subDef ? [{ label: subDef.label }] : []),
        ]}
      />
      <section className="mx-auto max-w-[1440px] px-5 pb-[120px] pt-10">
        <div className="mb-5 border-b border-shop-250">
          <div className="flex items-baseline gap-2 border-b-2 border-shop-900 pb-[17px]">
            <h1 className="text-[32px] font-bold leading-10 text-shop-900 md:text-[41px]">{subDef?.label ?? def.label}</h1>
            <span className="text-[16px] font-bold leading-[18px] text-black">
              <em className="not-italic">{products.length}</em>개 상품
            </span>
          </div>
          <ul className="scrollbar-none flex overflow-x-auto pb-2 pt-[11px] md:flex-wrap">
            {tabs.map((t) => (
              <li key={t.href} className="shrink-0 py-[5px] pr-5">
                <Link
                  href={t.href}
                  aria-current={t.on ? "page" : undefined}
                  className={cn("text-[16px] leading-[28px] md:text-[17px]", t.on ? "font-bold text-shop-900" : "text-shop-600 hover:text-shop-900")}
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <ProductListing
          products={products}
          defaultSort={list === "outlet" ? "popular" : "new"}
          // The reference's New In list has no sort menu.
          showSort={list !== "new"}
        />
      </section>
    </>
  );
}
