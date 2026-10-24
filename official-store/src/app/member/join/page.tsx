import type { Metadata } from "next";
import { JoinView } from "@/components/member/JoinView";

export const metadata: Metadata = { title: "회원가입" };

/** Sign-up (reference: /member/join.html): one-tap gate, then the full form. */
export default function JoinPage() {
  return <JoinView />;
}
