import type { Metadata } from "next";
import { InfoShell } from "@/components/info/InfoShell";
import { CUSTOMER_SERVICE } from "@/content/info";

export const metadata: Metadata = { title: "고객 서비스" };

/** Customer service (reference: /customerservice.html). */
export default function CustomerServicePage() {
  return (
    <InfoShell menu="service" current="/customer-service/" title={CUSTOMER_SERVICE.title} intro={CUSTOMER_SERVICE.lead} wide>
      <div className="mt-[18px]">
        {CUSTOMER_SERVICE.rows.map((r) => (
          <p key={r}>{r}</p>
        ))}
      </div>
    </InfoShell>
  );
}
