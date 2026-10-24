import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { Recommended } from "@/components/product/Recommended";
import { Reviews } from "@/components/product/Reviews";
import { getProduct, PRODUCTS, recommendedFor } from "@/content/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).id);
  return p ? { title: `${p.name}_${p.colorName}`, description: p.tagline } : {};
}

/** Product detail (reference: /product/detail.html?product_no=…). */
export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).id);
  if (!p) notFound();
  return (
    <div className="pb-20 xl:pb-0">
      <ProductDetail product={p} />
      <Recommended products={recommendedFor(p)} />
      <Reviews product={p} />
    </div>
  );
}
