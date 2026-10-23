import type { Metadata } from "next";
import { StoreFinder } from "@/components/StoreFinder";
import { Breadcrumb, PageTitle } from "@/components/ui";

export const metadata: Metadata = { title: "매장찾기" };

export default function StoresPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "매장찾기" }]} />
      <section className="px-5 pb-[120px]">
        <PageTitle>매장찾기</PageTitle>
        <StoreFinder />
      </section>
    </>
  );
}
