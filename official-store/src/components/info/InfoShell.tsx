import Link from "next/link";
import type { ReactNode } from "react";
import { ACCOUNT_MENU, INFO_MENUS, type InfoMenuKey, type NavLink } from "@/content/site";
import { cn } from "@/lib/utils";

// Layout of the brand, service and board screens (reference: .tabs-menu +
// .introduce-content). Desktop: a fixed side menu (section name, then links,
// the current one faded) and the content right of a 1px rule. Phones: the
// info menus become a sideways strip under the header; the account menu is
// left out, as the reference does.

function MenuLinks({ links, current, className }: { links: readonly NavLink[]; current?: string; className?: string }) {
  return (
    <ul className={className}>
      {links.map((l) => (
        <li key={l.label} className="shrink-0 xl:mb-1">
          <Link href={l.href} aria-current={l.href === current ? "page" : undefined} className={cn("text-[12px] leading-[20px] text-st-ink", l.href === current && "opacity-35")}>
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function InfoShell({
  menu,
  current,
  title,
  intro,
  children,
  wide = false,
}: {
  /** One of the info menus, or "account" for the board / my-shop screens. */
  menu: InfoMenuKey | "account";
  current?: string;
  title?: string;
  intro?: readonly string[];
  children: ReactNode;
  /** Let the content run without the 100px gap under the intro. */
  wide?: boolean;
}) {
  return (
    <div className="xl:flex xl:min-h-[calc(100vh-39px)]">
      {menu === "account" ? (
        <nav aria-label="계정 메뉴" className="hidden xl:block xl:w-[364px] xl:shrink-0 xl:px-7 xl:pt-[18px]">
          <div className="xl:sticky xl:top-[57px] xl:w-[307px]">
            {ACCOUNT_MENU.map((g, i) => (
              <div key={g.title} className={cn(i > 0 && "mt-6 border-t border-st-line pt-6")}>
                <p className="mb-[18px] text-[12px] font-bold leading-[20px] text-st-ink">{g.title}</p>
                <MenuLinks links={g.links} current={current} />
              </div>
            ))}
          </div>
        </nav>
      ) : (
        <nav
          aria-label={`${INFO_MENUS[menu].title} 메뉴`}
          className="sticky top-11 z-10 mx-2.5 flex h-[30px] items-center border-b border-st-text bg-white xl:static xl:mx-0 xl:block xl:h-auto xl:w-[255px] xl:shrink-0 xl:border-0 xl:bg-transparent xl:pl-7 xl:pt-[18px]"
        >
          <div className="flex min-w-0 flex-1 items-center xl:sticky xl:top-[57px] xl:block">
            <p className="mr-2.5 shrink-0 border-r border-st-text pr-2.5 text-[12px] font-bold leading-[20px] text-st-ink xl:mb-5 xl:mr-0 xl:border-0 xl:pr-0">{INFO_MENUS[menu].title}</p>
            <MenuLinks links={INFO_MENUS[menu].links} current={current} className="scrollbar-none flex min-w-0 gap-[15px] overflow-x-auto pl-[30px] xl:block xl:overflow-visible xl:pl-0" />
          </div>
        </nav>
      )}

      <div className="min-w-0 flex-1 px-2.5 pb-24 pt-[30px] xl:border-l xl:border-st-ink xl:px-0 xl:pb-[86px] xl:pl-[10px] xl:pr-7 xl:pt-[18px]">
        {(title || intro) && (
          <div className={cn("text-[12px] leading-[18px] text-st-ink", !wide && "border-b border-st-line pb-[94px]")}>
            {title && <h1 className="mb-[5px] text-[12px] font-bold leading-[18px]">{title}</h1>}
            {intro?.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        )}
        <div className={cn("text-[12px] leading-[18px] text-st-ink", (title || intro) && !wide && "pt-6")}>{children}</div>
      </div>
    </div>
  );
}

/** Underlined name followed by detail lines (stores, partners, contacts). */
export function InfoEntry({ name, lines, href }: { name: string; lines: readonly string[]; href?: string }) {
  return (
    <div className="mb-[30px]">
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className="mb-[5px] inline-block underline underline-offset-2">
          {name}
        </a>
      ) : (
        <p className="mb-[5px] underline underline-offset-2">{name}</p>
      )}
      {lines.map((l) => (
        <p key={l}>{l}</p>
      ))}
    </div>
  );
}
