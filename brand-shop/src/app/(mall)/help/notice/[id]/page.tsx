import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpShell, NoticeDetail } from "@/components/HelpShell";
import { NOTICES, noticeById } from "@/content/help";

export const dynamicParams = false;

export function generateStaticParams() {
  return NOTICES.map((n) => ({ id: n.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: noticeById(id)?.title ?? "공지사항" };
}

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params;
  const notice = noticeById(id);
  if (!notice) notFound();
  return (
    <HelpShell title="공지사항/당첨자 발표" crumbs={[{ label: "공지사항", href: "/help/notice/" }, { label: "상세" }]}>
      <NoticeDetail notice={notice} />
    </HelpShell>
  );
}
