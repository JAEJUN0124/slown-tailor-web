import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = { title: "쇼핑백" };

export default function CartPage() {
  return <CartView />;
}
