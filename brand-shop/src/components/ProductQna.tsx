"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useId, useState } from "react";
import type { Question } from "@/content/catalog";
import { QNA_COPY } from "@/content/guide";
import { cn } from "@/lib/utils";
import { Checkbox, Pagination } from "./ui";

const PAGE = 10;

function QuestionRow({ q }: { q: Question }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const status = <span className={cn("w-[96px] shrink-0 text-[14px]", q.status === "답변 완료" ? "text-shop-500" : "text-shop-accent")}>{q.status}</span>;
  const meta = (
    <>
      <span className="hidden w-[110px] shrink-0 text-center text-[14px] text-shop-500 md:block">{q.user}</span>
      <span className="hidden w-[90px] shrink-0 text-right text-[14px] text-shop-500 md:block">{q.date}</span>
    </>
  );

  if (q.secret) {
    return (
      <li className="flex items-center gap-4 border-b border-shop-250 px-3 py-6 md:px-6">
        {status}
        <span className="flex min-w-0 flex-1 items-center gap-1.5 text-[15px]">
          <Lock className="size-5 shrink-0" strokeWidth={1.4} aria-hidden="true" />
          {QNA_COPY.secret}
        </span>
        {meta}
      </li>
    );
  }
  return (
    <li className="border-b border-shop-250">
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)} className="flex w-full items-center gap-4 px-3 py-6 text-left md:px-6">
        {status}
        <span className="min-w-0 flex-1 truncate text-[15px]">{q.text}</span>
        {meta}
      </button>
      <div id={id} hidden={!open} className="bg-shop-100 px-6 py-5 text-[14px] leading-[22px] md:pl-[136px]">
        <p>
          <b className="mr-2">Q</b>
          {q.text}
        </p>
        <p className="mt-3 text-shop-700">
          <b className="mr-2 text-shop-900">A</b>
          {q.answer ?? "답변을 준비하고 있습니다."}
        </p>
      </div>
    </li>
  );
}

/** 문의 tab (reference: notice box + two buttons, secret filter, list). */
export function ProductQna({ questions }: { questions: Question[] }) {
  const [hideSecret, setHideSecret] = useState(false);
  const [page, setPage] = useState(1);
  const list = hideSecret ? questions.filter((q) => !q.secret) : questions;
  const btn = "flex h-11 w-full items-center justify-center rounded border border-shop-900 bg-white text-[14px] transition-colors hover:bg-shop-100 md:w-40";

  return (
    <div className="pb-[60px] pt-10">
      <h3 className="text-[24px] font-bold leading-[32px]">
        상품문의 <span>{questions.length}</span>
      </h3>
      <div className="mt-[30px] flex flex-col gap-4 bg-shop-100 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-[60px]">
        <p className="text-[14px] leading-[22px]">{QNA_COPY.intro}</p>
        <div className="flex shrink-0 gap-2">
          <Link href={QNA_COPY.oneToOne.href} className={btn}>
            {QNA_COPY.oneToOne.label}
          </Link>
          {/* Writing needs an account, as on the reference. */}
          <Link href="/login/" className={btn}>
            {QNA_COPY.write}
          </Link>
        </div>
      </div>
      <Checkbox
        checked={hideSecret}
        onChange={(v) => {
          setHideSecret(v);
          setPage(1);
        }}
        className="mt-[30px]"
      >
        {QNA_COPY.hideSecret}
      </Checkbox>
      {list.length === 0 ? (
        <p className="mt-5 border-t border-shop-900 py-16 text-center text-[15px] leading-[22px]">{QNA_COPY.empty}</p>
      ) : (
        <ul className="mt-5 border-t border-shop-900">
          {list.slice((page - 1) * PAGE, page * PAGE).map((q) => (
            <QuestionRow key={q.id} q={q} />
          ))}
        </ul>
      )}
      <Pagination page={page} pages={Math.ceil(list.length / PAGE)} onChange={setPage} />
    </div>
  );
}
