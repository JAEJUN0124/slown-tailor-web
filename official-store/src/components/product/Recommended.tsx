import Link from "next/link";
import { ProductArt } from "@/components/art/ProductArt";
import { productHref } from "@/content/catalog";
import type { Product } from "@/content/types";
import { won } from "@/lib/utils";

/** "추천 상품": a sideways row of 464px cards on desktop, a 2-column grid on phones. */
export function Recommended({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section aria-labelledby="rec-title" className="mb-10 mt-20 space-y-8">
      <h2 id="rec-title" className="text-center text-[16px] leading-[1.6] text-st-text">
        추천 상품
      </h2>
      <ul className="scrollbar-none grid grid-cols-2 gap-2 overflow-x-auto xl:flex xl:gap-4 xl:px-5">
        {products.map((p) => (
          <li key={p.id} className="xl:w-[464px] xl:shrink-0">
            <Link href={productHref(p.id)} className="block">
              <ProductArt art={p} className="aspect-[2/3] w-full" />
              <div className="px-3 pb-12 pt-4 xl:px-0 xl:pb-14 xl:pl-5 xl:pt-3">
                <p className="truncate text-[14px] leading-[1.6] text-st-text [mask-image:linear-gradient(90deg,#000_85%,transparent)] xl:text-[16px]">{p.name}</p>
                <p className="text-[12px] leading-[1.6] text-st-faint xl:text-[14px]">{p.colorName}</p>
                <p className="text-[14px] leading-[1.6] text-st-text xl:text-[16px]">KRW {won(p.price)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
