import type { Metadata } from "next";
import { ReviewBoard } from "@/components/board/BoardViews";
import { InfoShell } from "@/components/info/InfoShell";
import { INTRO } from "@/content/info";
import { boardReviews } from "@/content/reviews";

export const metadata: Metadata = { title: "Review" };

/** Review board (reference: /board/product/list.html?board_no=4). */
export default function ReviewBoardPage() {
  return (
    <InfoShell menu="account" title="Review" intro={[INTRO, "제품에 대한 안내 및 추천, 배송상황 등 궁금하신 모든 사항에 대해 답변을 드립니다."]}>
      <div className="-mt-6">
        <ReviewBoard rows={boardReviews()} />
      </div>
    </InfoShell>
  );
}
