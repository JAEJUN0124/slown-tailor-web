import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LookbookViewer, type Look } from "@/components/magazine/LookbookViewer";
import { PRODUCTS } from "@/content/catalog";
import { entryProducts, findEntry, LOOKBOOKS } from "@/content/magazine";
import type { Product } from "@/content/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOOKBOOKS.map((e) => ({ slug: e.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = findEntry("lookbook", (await params).slug);
  return e ? { title: `${e.titleKo} 룩북` } : {};
}

const TOPS = new Set<Product["line"]>(["outerwear", "tailoring", "knitwear", "shirts", "tops"]);
const MOODS: Look["mood"][] = ["paper", "stone", "warm", "cool"];

/** Lookbook (reference: /campaign/<season>_<men|women>). */
export default async function LookbookPage({ params }: Props) {
  const e = findEntry("lookbook", (await params).slug);
  if (!e) notFound();
  const pool = entryProducts(e, 40);
  const tops = pool.filter((p) => TOPS.has(p.line));
  const bottoms = PRODUCTS.filter((p) => !p.upcoming && (p.line === "trousers" || p.line === "denim" || p.line === "skirts") && (e.collection === "all" || p.gender === e.collection || p.gender === "unisex"));
  const looks: Look[] = tops.slice(0, 12).map((top, i) => ({ top, bottom: bottoms[i % bottoms.length], mood: MOODS[i % MOODS.length] }));
  return <LookbookViewer title={`${e.title} ${e.titleKo}`} body={e.body} looks={looks} />;
}
