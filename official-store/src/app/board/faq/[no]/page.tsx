import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InfoShell } from "@/components/info/InfoShell";
import { GUIDE_BOARD } from "@/content/info";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_BOARD.map((r) => ({ no: String(r.no) }));
}

type Props = { params: Promise<{ no: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const no = Number((await params).no);
  const r = GUIDE_BOARD.find((x) => x.no === no);
  return r ? { title: r.title } : {};
}

/** Guide board article. */
export default async function GuideArticlePage({ params }: Props) {
  const no = Number((await params).no);
  const r = GUIDE_BOARD.find((x) => x.no === no);
  if (!r) notFound();
  return (
    <InfoShell menu="account" title="이용안내 FAQ" wide>
      <h2 className="mt-8 font-bold">{r.title}</h2>
      <p className="mt-1 text-st-mute">
        관**** · {r.date} · 조회 {r.views}
      </p>
      <p className="mt-6 border-t border-st-line pt-6 text-[13px] leading-[21px] xl:max-w-[720px]">{r.body}</p>
      <Link href="/board/faq/" className="mt-10 inline-block border border-st-ink px-5 py-2">
        목록
      </Link>
    </InfoShell>
  );
}
