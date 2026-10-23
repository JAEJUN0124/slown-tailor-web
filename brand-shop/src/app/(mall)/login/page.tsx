import type { Metadata } from "next";
import { LoginView } from "@/components/AuthForms";
import { PageTitle } from "@/components/ui";

export const metadata: Metadata = { title: "로그인" };

export default function LoginPage() {
  return (
    <section className="px-5 pb-[120px]">
      <PageTitle>로그인</PageTitle>
      <LoginView />
    </section>
  );
}
