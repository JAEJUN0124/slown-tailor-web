import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListPage } from "@/components/ListPage";
import { LIST_KEYS, LISTS, type ListKey } from "@/content/catalog";
import { BRAND } from "@/content/shop";

export const dynamicParams = false;

export function generateStaticParams() {
  return LIST_KEYS.map((cat) => ({ cat }));
}

type Props = { params: Promise<{ cat: string }> };

const isList = (v: string): v is ListKey => v in LISTS;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cat } = await params;
  return { title: `${isList(cat) ? LISTS[cat].label : "상품"} - ${BRAND.name}` };
}

export default async function CategoryPage({ params }: Props) {
  const { cat } = await params;
  if (!isList(cat)) notFound();
  return <ListPage list={cat} />;
}
