import type { Metadata } from "next";
import { MagazineGrid } from "@/components/magazine/MagazineGrid";
import { CAMPAIGNS } from "@/content/magazine";

export const metadata: Metadata = { title: "캠페인" };

/** 캠페인 list (reference: /magazine/campaign.html). */
export default function CampaignListPage() {
  return <MagazineGrid entries={CAMPAIGNS} label="캠페인" />;
}
