import type { Metadata } from "next";
import { Ranking } from "@/components/Ranking";
import { Breadcrumb } from "@/components/ui";

export const metadata: Metadata = { title: "판매랭킹" };

export default function RankingPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "판매랭킹" }]} />
      <Ranking />
    </>
  );
}
