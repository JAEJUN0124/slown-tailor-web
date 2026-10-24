import type { Metadata } from "next";
import { FindForm } from "@/components/member/AccountForms";

export const metadata: Metadata = { title: "비밀번호 찾기" };

export default function FindPasswordPage() {
  return <FindForm kind="password" />;
}
