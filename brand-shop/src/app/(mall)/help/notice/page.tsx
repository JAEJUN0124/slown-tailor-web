import type { Metadata } from "next";
import { NoticeList } from "@/components/HelpLists";
import { HelpShell } from "@/components/HelpShell";

export const metadata: Metadata = { title: "공지사항" };

export default function NoticePage() {
  return (
    <HelpShell title="공지사항/당첨자 발표" crumbs={[{ label: "공지사항" }]}>
      <NoticeList />
    </HelpShell>
  );
}
