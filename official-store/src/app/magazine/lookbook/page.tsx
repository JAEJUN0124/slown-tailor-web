import type { Metadata } from "next";
import { MagazineGrid } from "@/components/magazine/MagazineGrid";
import { LOOKBOOKS } from "@/content/magazine";

export const metadata: Metadata = { title: "룩북" };

/** 룩북 list (reference: /magazine/lookbook.html). */
export default function LookbookListPage() {
  return <MagazineGrid entries={LOOKBOOKS} label="룩북" />;
}
