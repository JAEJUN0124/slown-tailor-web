import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListPage } from "@/components/ListPage";
import { LIST_KEYS, LISTS, type ListKey } from "@/content/catalog";
import { BRAND } from "@/content/shop";

export const dynamicParams = false;

export function generateStaticParams() {
  return LIST_KEYS.flatMap((cat) => LISTS[cat].subs.map((s) => ({ cat, sub: s.slug })));
}

type Props = { params: Promise<{ cat: string; sub: string }> };

const isList = (v: string): v is ListKey => v in LISTS;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cat, sub } = await params;
  const label = isList(cat) ? LISTS[cat].subs.find((s) => s.slug === sub)?.label : undefined;
  return { title: `${label ?? "상품"} - ${BRAND.name}` };
}

export default async function SubCategoryPage({ params }: Props) {
  const { cat, sub } = await params;
  if (!isList(cat) || !LISTS[cat].subs.some((s) => s.slug === sub)) notFound();
  return <ListPage list={cat} sub={sub} />;
}
