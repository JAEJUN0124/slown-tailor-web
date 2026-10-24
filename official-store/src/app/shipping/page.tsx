import type { Metadata } from "next";
import { InfoShell } from "@/components/info/InfoShell";
import { INTRO, SHIPPING } from "@/content/info";

export const metadata: Metadata = { title: "배송 및 교환" };

/** Shipping and returns (reference: /shipping.html). */
export default function ShippingPage() {
  return (
    <InfoShell menu="service" current="/shipping/" title="배송 및 교환" intro={[INTRO, "주문하신 상품의 배송과 교환, 반품, 환불 절차를 안내드립니다."]}>
      <div className="space-y-[50px]">
        {SHIPPING.map((s) => (
          <section key={s.title}>
            <h2 className="font-bold">{s.title}</h2>
            <ul className="mt-1.5 space-y-0.5">
              {s.items.map((i) => (
                <li key={i}>- {i}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </InfoShell>
  );
}
