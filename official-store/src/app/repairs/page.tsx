import type { Metadata } from "next";
import { InfoEntry, InfoShell } from "@/components/info/InfoShell";
import { REPAIR_POLICY } from "@/content/guide";
import { INTRO } from "@/content/info";
import { STORES } from "@/content/stores";

export const metadata: Metadata = { title: "수선 서비스" };

/** Repairs and tailoring (reference: /repairs.html). */
export default function RepairsPage() {
  const r = REPAIR_POLICY;
  return (
    <InfoShell menu="service" current="/repairs/" title="수선 서비스" intro={[INTRO, "구매하신 제품을 오래 입으실 수 있도록 기장 수선과 수선 서비스를 운영합니다."]}>
      <div className="space-y-[50px] xl:max-w-[760px]">
        <section>
          <h2 className="font-bold">{r.tailoring.title}</h2>
          <p className="mt-1.5">{r.tailoring.body}</p>
          {r.tailoring.rules.map((x) => (
            <p key={x}>• {x}</p>
          ))}
          {r.tailoring.notes.map((x) => (
            <p key={x} className="mt-1.5">
              {x}
            </p>
          ))}
        </section>
        <section>
          <h2 className="font-bold">테일러링 서비스 신청 방법</h2>
          {r.apply.map((a) => (
            <div key={a.title} className="mt-3">
              <p className="underline underline-offset-2">{a.title}</p>
              <p>{a.body}</p>
            </div>
          ))}
        </section>
        <section>
          <h2 className="font-bold">{r.repair.title}</h2>
          <p className="mt-1.5">{r.repair.body}</p>
          {r.repair.rules.map((x) => (
            <p key={x}>{x}</p>
          ))}
        </section>
        <section>
          <h2 className="mb-3 font-bold">수선 접수 매장</h2>
          {STORES.slice(0, 5).map((s) => (
            <InfoEntry key={s.name} name={`${s.name} (${s.nameEn})`} lines={[`운영시간 (Opening Hours) : ${s.hours}`, `주소 (Address) : ${s.address}`, `연락처 (Tel) : ${s.tel}`]} />
          ))}
        </section>
      </div>
    </InfoShell>
  );
}
