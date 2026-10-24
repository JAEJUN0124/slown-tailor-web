import type { Metadata } from "next";
import { MagazineGrid } from "@/components/magazine/MagazineGrid";
import { JOURNALS } from "@/content/magazine";

export const metadata: Metadata = { title: "저널" };

/** 저널 list (reference: /magazine/product.html). */
export default function JournalListPage() {
  return <MagazineGrid entries={JOURNALS} label="저널" />;
}
