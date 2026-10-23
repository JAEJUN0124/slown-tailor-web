import type { Metadata } from "next";
import { TermsDoc } from "@/components/PolicyDocs";
import { Breadcrumb, PageTitle } from "@/components/ui";

export const metadata: Metadata = { title: "이용약관" };

export default function TermsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "이용약관" }]} />
      <section className="px-5 pb-[120px]">
        <PageTitle>이용약관</PageTitle>
        <TermsDoc />
      </section>
    </>
  );
}
