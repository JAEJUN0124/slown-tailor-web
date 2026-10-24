import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalArticle } from "@/components/magazine/MagazineDetails";
import { findEntry, JOURNALS } from "@/content/magazine";

export const dynamicParams = false;

export function generateStaticParams() {
  return JOURNALS.map((e) => ({ slug: e.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = findEntry("journal", (await params).slug);
  return e ? { title: `${e.titleKo} · ${e.title}` } : {};
}

/** Journal article (reference: /journal/<slug>, /editorial/<slug>). */
export default async function JournalPage({ params }: Props) {
  const e = findEntry("journal", (await params).slug);
  if (!e) notFound();
  return <JournalArticle entry={e} />;
}
