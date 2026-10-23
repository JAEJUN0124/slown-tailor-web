import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { DeliveryGuide, ProductNotice, SizeGuide } from "@/components/ProductGuide";
import { PRODUCTS, productById, questionsFor, relatedTo, reviewsFor } from "@/content/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: productById(id)?.name ?? "상품" };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = productById(id);
  if (!product) notFound();
  return (
    <ProductDetail
      key={product.id}
      product={product}
      related={relatedTo(product)}
      reviews={reviewsFor(product)}
      questions={questionsFor(product)}
      guides={{
        size: <SizeGuide product={product} />,
        notice: <ProductNotice product={product} />,
        delivery: <DeliveryGuide />,
      }}
    />
  );
}
