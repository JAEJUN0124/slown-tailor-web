import type { Metadata } from "next";
import { InfoEntry, InfoShell } from "@/components/info/InfoShell";
import { INTRO } from "@/content/info";
import { PARTNERS } from "@/content/stores";

export const metadata: Metadata = { title: "온라인 유통망" };

/** Online channels (reference: /online.html). */
export default function OnlinePage() {
  return (
    <InfoShell menu="channel" current="/online/" title="온라인 유통망" intro={[INTRO, "가장 궁금해하시는 내용들을 모아 안내드립니다."]}>
      {PARTNERS.map((p) => (
        <InfoEntry key={p.name} name={p.name} lines={[p.desc, p.url]} />
      ))}
    </InfoShell>
  );
}
