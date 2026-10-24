import type { Metadata } from "next";
import { InfoShell } from "@/components/info/InfoShell";
import { VALUE } from "@/content/info";

export const metadata: Metadata = { title: "가치" };

/** Values (reference: /value.html): three statements. */
export default function ValuePage() {
  return (
    <InfoShell menu="about" current="/value/" title="슬로운의 제품은" wide>
      <div className="mt-[60px] space-y-[60px] xl:max-w-[640px]">
        {VALUE.map((v) => (
          <section key={v.title}>
            <h2 className="text-[16px] font-medium leading-[22px] text-st-ink">{v.title}</h2>
            <p className="mt-3 text-[13px] leading-[21px] text-st-ink">{v.body}</p>
          </section>
        ))}
      </div>
    </InfoShell>
  );
}
