import type { Metadata } from "next";
import { PrivacyDoc } from "@/components/PolicyDocs";
import { Breadcrumb, PageTitle } from "@/components/ui";

export const metadata: Metadata = { title: "개인정보 처리방침" };

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "개인정보 처리방침" }]} />
      <section className="px-5 pb-[120px]">
        <PageTitle>개인정보 처리방침</PageTitle>
        <PrivacyDoc />
      </section>
    </>
  );
}
