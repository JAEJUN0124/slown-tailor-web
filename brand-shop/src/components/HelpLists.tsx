"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { FAQ, faqCount, NOTICES, type FaqCategory, type FaqItem } from "@/content/help";
import { cn } from "@/lib/utils";
import { Pagination } from "./ui";

/** Label + wide input + 검색 (reference: FAQ검색 / 공지사항 검색 row). */
function SearchRow({ label, onSearch }: { label: string; onSearch: (q: string) => void }) {
  const [q, setQ] = useState("");
  const id = useId();
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(q.trim());
      }}
      className="flex flex-col gap-3 border-b border-shop-900 pb-10 md:flex-row md:items-center md:gap-0"
    >
      <label htmlFor={id} className="shrink-0 text-[17px] font-bold leading-[23px] md:w-[100px] md:font-normal">
        {label}
      </label>
      <div className="flex min-w-0 flex-1 gap-2">
        <input id={id} type="search" value={q} onChange={(e) => setQ(e.target.value)} className="h-9 min-w-0 flex-1 border border-shop-250 px-3 text-[14px] outline-none focus:border-shop-900" />
        <button type="submit" className="h-9 w-20 shrink-0 border border-shop-250 text-[14px] transition-colors hover:border-shop-900">
          검색
        </button>
      </div>
    </form>
  );
}

function FaqRow({ n, item }: { n: number; item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <li className="border-b border-shop-250">
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)} className="flex w-full items-center gap-4 py-5 text-left text-[14px] leading-[20px] md:gap-8">
        <span className="w-5 shrink-0 font-bold">{n}</span>
        <span className="shrink-0 font-bold">Q</span>
        <span className="min-w-0 flex-1">{item.q}</span>
        <ChevronDown className={cn("size-4 shrink-0 transition-transform", open && "rotate-180")} strokeWidth={1.4} aria-hidden="true" />
      </button>
      <div id={id} hidden={!open} className="flex gap-4 bg-shop-100 px-5 py-5 text-[14px] leading-[22px] md:gap-8 md:pl-[52px]">
        <span className="shrink-0 font-bold">A</span>
        <p className="text-shop-700">{item.a}</p>
      </div>
    </li>
  );
}

function FaqSection({ category }: { category: FaqCategory }) {
  return (
    <section className="mt-[60px]">
      <h2 className="text-[22px] leading-[30px] md:text-[24px] md:leading-[32px]">
        {category.label} <span className="ml-1">{faqCount(category)}</span>
      </h2>
      {category.groups.map((g) => (
        <div key={g.label} className="mt-10">
          <h3 className="text-[17px] leading-[23px]">
            {g.label} <span className="ml-1">{g.items.length}</span>
          </h3>
          <ul className="mt-5 border-t border-shop-900">
            {g.items.map((item, i) => (
              <FaqRow key={item.q} n={i + 1} item={item} />
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

/** FAQ: search across every answer, or browse one category (or all). */
export function FaqView({ slug }: { slug?: string }) {
  const [q, setQ] = useState("");
  const shown = slug ? FAQ.filter((c) => c.slug === slug) : FAQ;
  const found = q
    ? FAQ.flatMap((c) => c.groups.flatMap((g) => g.items)).filter((i) => `${i.q} ${i.a}`.toLowerCase().includes(q.toLowerCase()))
    : [];

  return (
    <>
      <SearchRow label="FAQ검색" onSearch={setQ} />
      {q ? (
        <section className="mt-[60px]" aria-live="polite">
          <h2 className="text-[22px] leading-[30px] md:text-[24px]">
            ‘{q}’ 검색 결과 <span className="ml-1">{found.length}</span>
          </h2>
          {found.length ? (
            <ul className="mt-5 border-t border-shop-900">
              {found.map((item, i) => (
                <FaqRow key={item.q} n={i + 1} item={item} />
              ))}
            </ul>
          ) : (
            <div className="py-16 text-center">
              <p className="text-[15px]">찾으시는 질문이 없습니다.</p>
              <p className="mt-1 text-[14px] text-shop-600">다른 낱말로 찾아보거나 1:1 문의를 남겨 주세요.</p>
              <button type="button" onClick={() => setQ("")} className="mt-5 h-9 rounded-md border border-shop-250 px-5 text-[14px] hover:border-shop-900">
                전체 FAQ 보기
              </button>
            </div>
          )}
        </section>
      ) : (
        shown.map((c) => <FaqSection key={c.slug} category={c} />)
      )}
    </>
  );
}

const PAGE = 10;

/** 공지사항/당첨자발표: search, numbered table, pages. */
export function NoticeList() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const list = q ? NOTICES.filter((n) => n.title.includes(q)) : NOTICES;
  const pages = Math.ceil(list.length / PAGE);

  return (
    <>
      <SearchRow
        label="공지사항 검색"
        onSearch={(v) => {
          setQ(v);
          setPage(1);
        }}
      />
      <table className="mt-[60px] w-full border-collapse text-[15px] leading-[22px]">
        <caption className="sr-only">공지사항 목록</caption>
        <thead>
          <tr className="border-b border-shop-900 text-[14px] text-shop-600">
            <th scope="col" className="hidden w-[90px] py-4 font-normal md:table-cell">
              번호
            </th>
            <th scope="col" className="py-4 font-normal">
              제목
            </th>
            <th scope="col" className="w-[110px] py-4 font-normal md:w-[140px]">
              공지일
            </th>
          </tr>
        </thead>
        <tbody>
          {list.slice((page - 1) * PAGE, page * PAGE).map((n) => (
            <tr key={n.id} className="border-b border-shop-250">
              <td className="hidden py-5 text-center text-shop-600 md:table-cell">{n.id}</td>
              <td className="py-5 pr-4">
                <Link href={`/help/notice/${n.id}/`} className="hover:underline">
                  {n.title}
                </Link>
              </td>
              <td className="py-5 text-center text-[14px] text-shop-600">{n.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {list.length === 0 && <p className="py-16 text-center text-[15px]">‘{q}’에 해당하는 공지가 없습니다.</p>}
      <Pagination page={page} pages={pages} onChange={setPage} />
    </>
  );
}
