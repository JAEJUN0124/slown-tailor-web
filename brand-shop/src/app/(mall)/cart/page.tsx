import type { Metadata } from "next";
import { CartView } from "@/components/CartView";
import { Breadcrumb, PageTitle } from "@/components/ui";

export const metadata: Metadata = { title: "장바구니" };

export default function CartPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "장바구니" }]} />
      <section className="mx-auto max-w-[1440px] px-5 pb-[120px]">
        <PageTitle>장바구니</PageTitle>
        <CartView />
      </section>
    </>
  );
}
