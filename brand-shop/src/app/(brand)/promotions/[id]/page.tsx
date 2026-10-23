import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PromotionDetail } from "@/components/PromotionDetail";
import { PROMOTIONS, promotionById } from "@/content/promotions";
import { BRAND } from "@/content/shop";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROMOTIONS.map((p) => ({ id: p.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const promotion = promotionById(id);
  return { title: promotion ? `[${BRAND.name}] ${promotion.title}` : "기획전" };
}

export default async function PromotionPage({ params }: Props) {
  const { id } = await params;
  const promotion = promotionById(id);
  if (!promotion) notFound();
  return <PromotionDetail promotion={promotion} />;
}
