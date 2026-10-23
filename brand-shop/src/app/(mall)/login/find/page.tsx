import type { Metadata } from "next";
import { FindAccount } from "@/components/AuthForms";
import { PageTitle } from "@/components/ui";

export const metadata: Metadata = { title: "아이디/비밀번호 찾기" };

export default function FindAccountPage() {
  return (
    <section className="px-5 pb-[120px]">
      <PageTitle>아이디 / 비밀번호 찾기</PageTitle>
      <FindAccount />
    </section>
  );
}
