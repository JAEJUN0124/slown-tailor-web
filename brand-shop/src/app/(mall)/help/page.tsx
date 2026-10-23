import type { Metadata } from "next";
import { HelpShell, SupportHome } from "@/components/HelpShell";

export const metadata: Metadata = { title: "고객센터" };

export default function HelpPage() {
  return (
    <HelpShell title="고객센터">
      <SupportHome />
    </HelpShell>
  );
}
