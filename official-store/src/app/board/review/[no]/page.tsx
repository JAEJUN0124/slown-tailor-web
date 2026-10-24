import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductArt } from "@/components/art/ProductArt";
import { CommentForm } from "@/components/board/BoardViews";
import { InfoShell } from "@/components/info/InfoShell";
import { getProduct, productHref } from "@/content/catalog";
import { boardReviews, findBoardReview } from "@/content/reviews";
import { won } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return boardReviews().map((r) => ({ no: String(r.no) }));
}

type Props = { params: Promise<{ no: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = findBoardReview(Number((await params).no));
  return r ? { title: `${r.productName} 후기` } : {};
}

/** Review article (reference: /article/review/4/<no>/). */
export default async function ReviewArticlePage({ params }: Props) {
  const r = findBoardReview(Number((await params).no));
  const p = r && getProduct(r.productId);
  if (!r || !p) notFound();
  const related = boardReviews().filter((x) => x.productId === r.productId && x.no !== r.no).slice(0, 3);
  return (
    <InfoShell menu="account" title="Review" wide>
      <div className="mt-6 flex items-center gap-4 border-y border-st-line py-4">
        <ProductArt art={p} className="aspect-[2/3] w-[60px] shrink-0" />
        <div>
          <h2>{r.productName}</h2>
          <p className="mt-0.5">₩{won(p.price)}</p>
          <Link href={productHref(p.id)} className="mt-1.5 inline-block uppercase tracking-normal underline underline-offset-2">
            View Product
          </Link>
        </div>
      </div>
      <h3 className="mt-8 flex flex-wrap items-baseline gap-x-3 font-bold">
        {r.productName} 후기 <span className="font-normal text-st-mute">Written by {r.author.slice(0, 1)}****</span>
      </h3>
      <p className="mt-1 text-st-mute">{r.date}</p>
      <p className="mt-6 whitespace-pre-line text-[13px] leading-[21px] xl:max-w-[720px]">{r.text}</p>
      {r.photos > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {Array.from({ length: Math.min(3, r.photos) }, (_, i) => (
            <ProductArt key={i} art={{ ...p, tone: (p.tone ?? 0) + i }} frame={[0, 2, 6][i]} className="aspect-square w-[160px]" />
          ))}
        </div>
      )}
      <CommentForm />
      {related.length > 0 && (
        <section className="mt-12">
          <h4 className="font-bold">Related Articles</h4>
          <ul className="mt-3 border-t border-st-line">
            {related.map((x) => (
              <li key={x.no} className="border-b border-st-line py-3">
                <Link href={`/board/review/${x.no}/`} className="flex justify-between gap-4">
                  <span className="truncate">{x.productName} 후기</span>
                  <span className="shrink-0 text-st-mute">{x.date}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <Link href="/board/review/" className="mt-10 inline-block border border-st-ink px-5 py-2">
        목록
      </Link>
    </InfoShell>
  );
}
