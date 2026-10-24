import type { Metadata } from "next";
import { PolicyView } from "@/components/member/PolicyView";
import { TERMS } from "@/content/policy";

export const metadata: Metadata = { title: "이용약관" };

export default function AgreementPage() {
  return <PolicyView doc={TERMS} />;
}
