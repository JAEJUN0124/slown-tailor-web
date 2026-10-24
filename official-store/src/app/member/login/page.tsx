import type { Metadata } from "next";
import { LoginLayer } from "@/components/member/AuthLayer";

export const metadata: Metadata = { title: "로그인" };

/** Login (reference: /member/login.html under its one-tap sign-in layer). */
export default function LoginPage() {
  return <LoginLayer />;
}
