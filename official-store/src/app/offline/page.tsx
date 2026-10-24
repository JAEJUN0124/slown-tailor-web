import type { Metadata } from "next";
import { InfoEntry, InfoShell } from "@/components/info/InfoShell";
import { INTRO } from "@/content/info";
import { STORES } from "@/content/stores";

export const metadata: Metadata = { title: "오프라인 유통망" };

/** Stores (reference: /offline.html). */
export default function OfflinePage() {
  return (
    <InfoShell menu="channel" current="/offline/" title="오프라인 유통망" intro={[INTRO, "가장 궁금해하시는 내용들을 모아 안내드립니다."]}>
      {STORES.map((s) => (
        <InfoEntry
          key={s.name}
          name={`${s.name} (${s.nameEn})`}
          lines={[
            ...(s.period ? [`운영기간 (Period) : ${s.period}`] : []),
            `운영시간 (Opening Hours) : ${s.hours}`,
            `주소 (Address) : ${s.address}`,
            s.addressEn,
            `연락처 (Tel) : ${s.tel}`,
          ]}
        />
      ))}
    </InfoShell>
  );
}
