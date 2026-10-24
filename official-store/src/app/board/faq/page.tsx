import type { Metadata } from "next";
import Link from "next/link";
import { InfoShell } from "@/components/info/InfoShell";
import { GUIDE_BOARD, INTRO } from "@/content/info";

export const metadata: Metadata = { title: "이용안내 FAQ" };

/** Guide board (reference: /board/free/list.html?board_no=3). */
export default function GuideBoardPage() {
  return (
    <InfoShell menu="account" title="이용안내 FAQ" intro={[INTRO, "제품에 대한 안내 및 추천, 배송상황 등 궁금하신 모든 사항에 대해 답변을 드립니다."]}>
      <ul className="-mt-6">
        {GUIDE_BOARD.map((r) => (
          <li key={r.no} className="border-b border-st-line py-[14px]">
            <Link href={`/board/faq/${r.no}/`} className="grid grid-cols-[40px_1fr_auto] items-center gap-4 xl:grid-cols-[60px_1fr_90px_90px_40px]">
              <span className="text-st-faint">{r.no}</span>
              <span className="truncate">{r.title}</span>
              <span className="hidden text-st-mute xl:block">관****</span>
              <span className="text-st-mute">{r.date}</span>
              <span className="hidden text-right text-st-mute xl:block">{r.views}</span>
            </Link>
          </li>
        ))}
      </ul>
    </InfoShell>
  );
}
