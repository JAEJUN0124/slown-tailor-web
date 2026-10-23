import Link from "next/link";
import { ChevronRight, Headset, MessageSquareText, PencilLine } from "lucide-react";
import type { ReactNode } from "react";
import { FAQ, faqCount, NOTICES, QUICK_LINKS, SUPPORT_CHANNELS, type Notice } from "@/content/help";
import { HelpNav } from "./HelpNav";
import { Breadcrumb, Narrow, PageTitle } from "./ui";

/**
 * Frame of every help desk page (reference: 1180px body, 150px side menu,
 * 960px content): breadcrumb, centred title, menu and content.
 */
export function HelpShell({ title, crumbs = [], children }: { title: string; crumbs?: { label: string; href?: string }[]; children: ReactNode }) {
  return (
    <>
      <Breadcrumb items={crumbs.length ? [{ label: "고객센터", href: "/help/" }, ...crumbs] : [{ label: "고객센터" }]} />
      <Narrow>
        <PageTitle>{title}</PageTitle>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-[70px]">
          <HelpNav />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </Narrow>
    </>
  );
}

const ICONS = { chat: MessageSquareText, write: PencilLine, phone: Headset };

const sectionTitle = "text-[22px] leading-[30px] md:text-[24px] md:leading-[32px]";

/** Help desk home: three support channels, quick links, FAQ shelves, latest notices. */
export function SupportHome() {
  return (
    <>
      <ul className="grid gap-12 border-b border-shop-900 pb-[60px] md:grid-cols-3 md:gap-6">
        {SUPPORT_CHANNELS.map((c) => {
          const Icon = ICONS[c.icon];
          return (
            <li key={c.icon} className="flex flex-col items-center text-center">
              <span className="flex size-[76px] items-center justify-center rounded-full border border-shop-250" aria-hidden="true">
                <Icon className="size-9" strokeWidth={1.1} />
              </span>
              <h2 className="mt-6 text-[20px] leading-[30px] md:text-[21px]">
                {c.title[0]}
                <br />
                {c.title[1]}
              </h2>
              <p className="mt-4 text-[13px] leading-[18px] text-shop-600">
                {c.lines.map((l, i) => (
                  <span key={i} className="block">
                    {l}
                  </span>
                ))}
              </p>
              {"actions" in c && (
                <div className="mt-8 flex gap-1">
                  {c.actions.map((a) => (
                    <Link key={a.label} href={a.href} className="flex h-9 items-center rounded border border-shop-250 px-4 text-[13px] transition-colors hover:border-shop-900">
                      {a.label}
                    </Link>
                  ))}
                </div>
              )}
              {"phones" in c && (
                <p className="mt-8 text-[17px] leading-[26px]">
                  {c.phones.map((p) => (
                    <span key={p} className="block">
                      {p}
                    </span>
                  ))}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <section className="mt-[60px]">
        <h2 className={sectionTitle}>Quick Link</h2>
        <ul className="mt-5 grid grid-cols-2 border-l border-t border-shop-250 md:grid-cols-4">
          {QUICK_LINKS.map((l) => (
            <li key={l.label} className="border-b border-r border-shop-250">
              <Link href={l.href} className="flex h-[60px] items-center justify-center text-[15px] transition-colors hover:bg-shop-100">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-[60px]">
        <h2 className={sectionTitle}>FAQ</h2>
        <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {FAQ.map((c) => (
            <li key={c.slug}>
              <Link href={`/help/faq/${c.slug}/`} className="flex h-[72px] flex-col items-center justify-center rounded border border-shop-250 text-[14px] transition-colors hover:border-shop-900">
                {c.label}
                <span className="text-[12px] text-shop-500">{faqCount(c)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-[60px]">
        <div className="flex items-end justify-between">
          <h2 className={sectionTitle}>공지사항/당첨자발표</h2>
          <Link href="/help/notice/" className="flex items-center text-[14px] text-shop-600 hover:text-shop-900">
            더보기
            <ChevronRight className="size-4" strokeWidth={1.4} aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-5 border-t border-shop-900">
          {NOTICES.slice(0, 5).map((n) => (
            <li key={n.id} className="border-b border-shop-250">
              <Link href={`/help/notice/${n.id}/`} className="flex items-center justify-between gap-4 py-4 text-[15px] hover:underline">
                <span className="min-w-0 truncate">{n.title}</span>
                <span className="shrink-0 text-[14px] text-shop-500">{n.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

/** One notice with a back-to-list button. */
export function NoticeDetail({ notice }: { notice: Notice }) {
  return (
    <article>
      <header className="flex flex-col gap-1 border-b border-shop-250 border-t-shop-900 border-t pb-5 pt-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-[20px] leading-[28px]">{notice.title}</h2>
        <time className="shrink-0 text-[14px] text-shop-500">{notice.date}</time>
      </header>
      <div className="space-y-3 py-10 text-[15px] leading-[26px]">
        {notice.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="flex justify-center border-t border-shop-250 pt-10">
        <Link href="/help/notice/" className="flex h-[50px] w-[200px] items-center justify-center rounded border border-shop-900 text-[15px] transition-colors hover:bg-shop-100">
          목록
        </Link>
      </div>
    </article>
  );
}
