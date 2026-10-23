"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT, FAQ, HELP_LINKS } from "@/content/help";
import { cn } from "@/lib/utils";

/**
 * Help desk side menu (reference: 150px column): FAQ and its categories,
 * the other desk pages, then the phone line. Below 1024px it becomes one
 * scrolling row of links.
 */
export function HelpNav() {
  const path = usePathname();
  const on = (href: string) => path === href || (href !== "/help/faq/" && path.startsWith(href));

  return (
    <nav aria-label="고객센터 메뉴" className="lg:w-[150px] lg:shrink-0">
      <ul className="scrollbar-none -mx-5 flex gap-5 overflow-x-auto border-b border-shop-250 px-5 pb-3 lg:hidden">
        {[{ label: "FAQ", href: "/help/faq/" }, ...HELP_LINKS].map((l) => (
          <li key={l.href} className="shrink-0">
            <Link href={l.href} aria-current={on(l.href) ? "page" : undefined} className={cn("text-[15px] leading-[28px]", on(l.href) ? "font-bold" : "text-shop-600")}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden lg:block">
        <Link href="/help/faq/" aria-current={path === "/help/faq/" ? "page" : undefined} className={cn("text-[17px] leading-[23px]", path === "/help/faq/" && "font-bold")}>
          FAQ
        </Link>
        <ul className="mt-3 space-y-1">
          {FAQ.map((c) => {
            const href = `/help/faq/${c.slug}/`;
            return (
              <li key={c.slug}>
                <Link href={href} aria-current={on(href) ? "page" : undefined} className={cn("text-[13px] leading-[20px]", on(href) ? "font-bold text-shop-900" : "text-shop-600 hover:text-shop-900")}>
                  {c.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="mt-10 space-y-3">
          {HELP_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={on(l.href) ? "page" : undefined} className={cn("text-[17px] leading-[23px]", on(l.href) && "font-bold")}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 border-t border-shop-900 pt-8">
          <p className="text-[17px] leading-[23px]">고객상담</p>
          <p className="mt-3 text-[12px] leading-[16px]">전국</p>
          <p className="text-[24px] font-bold leading-[28px]">{CONTACT.phone}</p>
          <p className="mt-2 text-[12px] leading-[16px]">수신자부담</p>
          <p className="text-[17px] font-bold leading-[22px]">{CONTACT.freePhone}</p>
          <p className="mt-3 text-[13px] leading-[19px] text-shop-600">
            {CONTACT.hours}
            <br />
            {CONTACT.closed}
          </p>
        </div>
      </div>
    </nav>
  );
}
