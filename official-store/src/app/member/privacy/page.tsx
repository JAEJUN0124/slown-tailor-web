import type { Metadata } from "next";
import { PolicyView } from "@/components/member/PolicyView";
import { PRIVACY } from "@/content/policy";

export const metadata: Metadata = { title: "개인정보 처리방침" };

export default function PrivacyPage() {
  return <PolicyView doc={PRIVACY} />;
}
