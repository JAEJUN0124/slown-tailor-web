import type { Metadata } from "next";
import { FindForm } from "@/components/member/AccountForms";

export const metadata: Metadata = { title: "아이디 찾기" };

export default function FindIdPage() {
  return <FindForm kind="id" />;
}
