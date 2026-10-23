import type { Metadata } from "next";
import { PromotionList } from "@/components/PromotionList";
import { Breadcrumb, PageTitle } from "@/components/ui";
import { PROMOTIONS } from "@/content/promotions";

export const metadata: Metadata = { title: "기획전" };

export default function PromotionsPage() {
  // Only what the cards need goes to the client.
  const items = PROMOTIONS.map(({ id, title, theme, cover }) => ({ id, title, theme, cover }));
  return (
    <>
      <Breadcrumb items={[{ label: "기획전" }]} />
      <section className="mx-auto max-w-[1440px] px-5 pb-[120px]">
        <PageTitle>기획전</PageTitle>
        <PromotionList items={items} />
      </section>
    </>
  );
}
