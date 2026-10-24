"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Pagination } from "@/components/shop/Pagination";
import type { BoardReview } from "@/content/reviews";
import { DEMO_ONLY, toast } from "@/lib/store";

const PER_PAGE = 10;

/**
 * Review board list (reference: /board/product/list.html?board_no=4): number
 * over the product name, the title, masked author and date on one row (on
 * phones the name and title stack left, author and date right), then a
 * period / field / keyword search and pages.
 */
export function ReviewBoard({ rows }: { rows: BoardReview[] }) {
  const [page, setPage] = useState(1);
  const [field, setField] = useState<"title" | "product">("title");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");

  const filtered = query ? rows.filter((r) => (field === "title" ? `${r.productName} 후기` : r.productName).includes(query)) : rows;
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    setQuery(draft.trim());
    setPage(1);
  };

  return (
    <div>
      {shown.length ? (
        <ul>
          {shown.map((r) => (
            <li key={r.no} className="border-b border-st-line py-[14px]">
              <Link href={`/board/review/${r.no}/`} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 xl:grid-cols-[242px_minmax(0,1fr)_120px_auto] xl:items-end">
                <span className="col-span-2 text-[12px] text-st-faint xl:col-span-1">{r.no}</span>
                <span className="truncate xl:col-start-1 xl:row-start-2">{r.productName}</span>
                <span className="text-right xl:col-start-3 xl:row-start-2 xl:text-left">{r.author.slice(0, 1)}****</span>
                <span className="xl:col-start-2 xl:row-start-2 xl:truncate">{r.productName} 후기</span>
                <span className="self-end text-right xl:col-start-4 xl:row-start-2">{r.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-b border-st-line py-16 text-center text-st-mute">‘{query}’에 맞는 글이 없습니다. 다른 검색어로 찾아보세요.</p>
      )}

      <form role="search" onSubmit={onSearch} className="mt-3 flex flex-wrap items-center justify-end gap-1.5">
        <select aria-label="기간" className="h-8 w-20 border border-st-ink bg-white px-2 text-[12px]" defaultValue="week">
          <option value="week">일주일</option>
          <option value="month">한달</option>
          <option value="all">전체</option>
        </select>
        <select aria-label="검색 항목" value={field} onChange={(e) => setField(e.target.value as "title" | "product")} className="h-8 w-20 border border-st-ink bg-white px-2 text-[12px]">
          <option value="title">제목</option>
          <option value="product">상품명</option>
        </select>
        <label htmlFor="board-q" className="sr-only">
          검색어
        </label>
        <input id="board-q" value={draft} onChange={(e) => setDraft(e.target.value)} className="h-8 w-[110px] border-b border-st-ink bg-transparent text-[12px] outline-none focus:bg-st-field" />
        <button type="submit" className="h-8 px-3 text-[12px] uppercase tracking-normal">
          Search
        </button>
      </form>
      <Pagination page={page} pages={pages} onPage={setPage} className="mt-8" />
    </div>
  );
}

/** Comment box under a board article; the demo only explains that nothing is posted. */
export function CommentForm() {
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast(text.trim() ? `댓글 등록은 ${DEMO_ONLY}` : "댓글 내용을 입력해 주세요.");
      }}
      className="mt-10 border-t border-st-ink pt-6"
    >
      <label htmlFor="comment" className="font-bold">
        댓글 입력
      </label>
      <textarea id="comment" value={text} onChange={(e) => setText(e.target.value)} placeholder="로그인 후 댓글을 남길 수 있습니다." className="mt-3 h-[90px] w-full border border-st-line p-3 text-[12px] outline-none placeholder:text-st-faint focus:border-st-ink" />
      <div className="mt-2 text-right">
        <button type="submit" className="h-8 border border-st-ink px-5 text-[12px]">
          확인
        </button>
      </div>
    </form>
  );
}
