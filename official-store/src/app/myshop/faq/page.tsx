import type { Metadata } from "next";
import { FaqList } from "@/components/info/FaqList";
import { InfoShell } from "@/components/info/InfoShell";
import { FAQ, INTRO } from "@/content/info";

export const metadata: Metadata = { title: "자주 묻는 질문" };

/** FAQ under the account menu (reference: /myshop/faq.html). */
export default function MyshopFaqPage() {
  return (
    <InfoShell menu="account" current="/myshop/faq/" title="자주 묻는 질문" intro={[INTRO, "가장 궁금해하시는 내용들을 모아 안내드립니다."]}>
      <div className="-mt-6">
        <FaqList groups={FAQ} />
      </div>
    </InfoShell>
  );
}
