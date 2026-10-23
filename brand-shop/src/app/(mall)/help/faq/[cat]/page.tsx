import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqView } from "@/components/HelpLists";
import { HelpShell } from "@/components/HelpShell";
import { FAQ } from "@/content/help";

export const dynamicParams = false;

export function generateStaticParams() {
  return FAQ.map((c) => ({ cat: c.slug }));
}

type Props = { params: Promise<{ cat: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cat } = await params;
  return { title: `FAQ - ${FAQ.find((c) => c.slug === cat)?.label ?? ""}` };
}

export default async function FaqCategoryPage({ params }: Props) {
  const { cat } = await params;
  const category = FAQ.find((c) => c.slug === cat);
  if (!category) notFound();
  return (
    <HelpShell title="FAQ" crumbs={[{ label: "FAQ", href: "/help/faq/" }, { label: category.label }]}>
      <FaqView slug={category.slug} />
    </HelpShell>
  );
}
