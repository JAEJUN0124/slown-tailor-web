import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CampaignStage } from "@/components/magazine/MagazineDetails";
import { CAMPAIGNS, findEntry } from "@/content/magazine";

export const dynamicParams = false;

export function generateStaticParams() {
  return CAMPAIGNS.map((e) => ({ slug: e.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = findEntry("campaign", (await params).slug);
  return e ? { title: `${e.titleKo} · ${e.title}` } : {};
}

/** Campaign page (reference: /campaign/<slug>). */
export default async function CampaignPage({ params }: Props) {
  const e = findEntry("campaign", (await params).slug);
  if (!e) notFound();
  return <CampaignStage entry={e} />;
}
