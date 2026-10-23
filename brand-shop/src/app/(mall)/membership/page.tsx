import type { Metadata } from "next";
import { MembershipDoc } from "@/components/PolicyDocs";
import { Breadcrumb, PageTitle } from "@/components/ui";

export const metadata: Metadata = { title: "멤버십 안내" };

export default function MembershipPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "멤버십안내" }]} />
      <PageTitle>멤버십 안내</PageTitle>
      <MembershipDoc />
    </>
  );
}
