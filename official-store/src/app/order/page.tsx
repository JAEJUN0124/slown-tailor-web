import type { Metadata } from "next";
import { OrderForm } from "@/components/cart/OrderForm";

export const metadata: Metadata = { title: "주문서 작성" };

export default function OrderPage() {
  return <OrderForm />;
}
