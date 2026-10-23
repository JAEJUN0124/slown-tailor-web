import Link from "next/link";
import { Briefcase, Clock3, ListChecks, Share2, Target, UserRound } from "lucide-react";
import { MEMBERSHIP, PRIVACY, TERMS, type Article } from "@/content/policy";
import { cn } from "@/lib/utils";

// 이용약관 · 개인정보 처리방침 · 멤버십 안내 bodies.

function ArticleBlock({ a }: { a: Article }) {
  return (
    <section className="mt-8 first:mt-0">
      <h4 className="text-[14px] font-bold leading-[20px] text-shop-700">{a.title}</h4>
      {a.paragraphs.map((p) => (
        <p key={p} className="mt-3 text-[14px] leading-[20px] text-shop-600">
          {p}
        </p>
      ))}
      {a.items && (
        <ol className="mt-3 list-inside list-decimal space-y-1 text-[14px] leading-[20px] text-shop-600">
          {a.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      )}
    </section>
  );
}

/** Terms in a grey box that scrolls on its own (reference: 960px, inner scroll). */
export function TermsDoc() {
  return (
    <div className="mx-auto max-w-[960px]">
      <h2 className="text-[17px] leading-[23px]">이용약관</h2>
      <div tabIndex={0} aria-label="이용약관 본문" className="mt-4 max-h-[640px] overflow-y-auto bg-shop-150 px-6 py-8 outline-offset-2 md:px-[50px] md:py-[50px]">
        {TERMS.map((c) => (
          <section key={c.title} className="mt-12 first:mt-0">
            <h3 className="mb-6 text-[18px] leading-[26px] md:text-[20px]">{c.title}</h3>
            {c.articles.map((a) => (
              <ArticleBlock key={a.title} a={a} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

const LABEL_ICONS = { list: ListChecks, target: Target, clock: Clock3, share: Share2, briefcase: Briefcase, user: UserRound };

function DataTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-[14px] leading-[20px]">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="border border-shop-250 bg-shop-100 px-4 py-3 font-normal text-shop-600">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((v, i) => (
                <td key={i} className="border border-shop-250 px-4 py-3">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Privacy policy: labelling icons, contents, numbered sections. */
export function PrivacyDoc() {
  return (
    <div className="mx-auto max-w-[960px]">
      <p className="text-[15px] leading-[24px]">{PRIVACY.intro}</p>
      <h2 className="mt-10 text-[17px] font-bold leading-[23px]">주요 개인정보 처리 표시(라벨링)</h2>
      <ul className="mt-4 grid grid-cols-3 border-l border-t border-shop-250 md:grid-cols-6">
        {PRIVACY.labels.map((l) => {
          const Icon = LABEL_ICONS[l.icon as keyof typeof LABEL_ICONS];
          return (
            <li key={l.title} className="flex flex-col items-center gap-2 border-b border-r border-shop-250 px-2 py-5 text-center text-[13px] leading-[18px]">
              <Icon className="size-7" strokeWidth={1.2} aria-hidden="true" />
              {l.title}
            </li>
          );
        })}
      </ul>
      <nav aria-label="목차" className="mt-10 bg-shop-100 px-6 py-6">
        <ol className="grid gap-2 text-[14px] leading-[20px] md:grid-cols-2">
          {PRIVACY.sections.map((s, i) => (
            <li key={s.title}>
              <a href={`#privacy-${i}`} className="hover:underline">
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      {PRIVACY.sections.map((s, i) => (
        <section key={s.title} id={`privacy-${i}`} className="mt-12 scroll-mt-5">
          <h3 className="text-[18px] font-bold leading-[26px]">{s.title}</h3>
          {s.paragraphs.map((p) => (
            <p key={p} className="mt-3 text-[15px] leading-[24px] text-shop-700">
              {p}
            </p>
          ))}
          {"table" in s && s.table && <DataTable head={s.table.head} rows={s.table.rows} />}
        </section>
      ))}
    </div>
  );
}

const block = "border-t border-shop-900 pt-[30px] pb-[60px]";
const blockTitle = "text-[20px] leading-[28px]";

/** Membership guide: intro banner, welcome coupons, grades, points, notes, terms. */
export function MembershipDoc() {
  const m = MEMBERSHIP;
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-[60px]">
      <section className={block}>
        <h2 className={blockTitle}>{m.intro.title}</h2>
        <div className="relative mt-[30px] overflow-hidden rounded-lg bg-[#eff1f7] px-6 py-10 md:px-[60px] md:py-[50px]">
          <p className="max-w-[720px] text-[18px] font-bold leading-[27px] md:text-[20px] md:leading-[29px]">{m.intro.lead}</p>
          <p className="mt-1 text-[14px] leading-[20px] text-shop-600">{m.intro.note}</p>
          <Link href={m.intro.cta.href} className="mt-6 inline-flex h-11 w-[180px] items-center justify-center rounded bg-shop-900 text-[14px] font-bold text-white hover:bg-black">
            {m.intro.cta.label}
          </Link>
          <div aria-hidden="true" className="absolute -bottom-10 right-[8%] hidden size-[220px] rounded-full bg-[#b9c6ff] md:block" />
          <div aria-hidden="true" className="absolute bottom-0 right-[12%] hidden h-[180px] w-[150px] rounded-t-xl border-[6px] border-b-0 border-white bg-white/70 md:block">
            <p className="px-3 pt-3 text-[11px] font-bold text-shop-accent">FOLIO SHOP</p>
            <div className="mx-3 mt-2 h-[110px] bg-linear-to-b from-[#e9e4dc] to-[#d6cfc4]" />
          </div>
        </div>
      </section>

      <section className={block}>
        <h2 className={blockTitle}>{m.welcome.title}</h2>
        <div className="mt-[30px] grid gap-10 md:grid-cols-2">
          {m.welcome.groups.map((g) => (
            <div key={g.label}>
              <h3 className="text-[17px] leading-[23px]">{g.label}</h3>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {g.tiles.map((t) => (
                  <li
                    key={t.caption}
                    className="relative flex h-[60px] w-[120px] flex-col items-center justify-center bg-linear-to-br from-[#2f4bff] to-[#13a89e] text-white after:absolute after:-right-1.5 after:top-1/2 after:size-3 after:-translate-y-1/2 after:rounded-full after:bg-white after:content-['']"
                  >
                    <strong className={cn("leading-none", t.value.length > 5 ? "text-[18px]" : "text-[22px]")}>{t.value}</strong>
                    <span className="mt-1 text-[10px] leading-none">{t.caption}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={block}>
        <h2 className={blockTitle}>{m.grades.title}</h2>
        <DataTable head={m.grades.head} rows={m.grades.rows} />
        <p className="mt-3 text-[13px] leading-[20px] text-shop-600">{m.grades.note}</p>
      </section>

      {[m.points, m.notes].map((s) => (
        <section key={s.title} className={block}>
          <h2 className={blockTitle}>{s.title}</h2>
          <ul className="mt-5 space-y-1.5 text-[14px] leading-[22px] text-shop-700">
            {s.items.map((i) => (
              <li key={i} className="relative pl-3 before:absolute before:left-0 before:top-[10px] before:size-[3px] before:rounded-full before:bg-shop-700">
                {i}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className={block}>
        <h2 className={blockTitle}>멤버십 약관</h2>
        <div tabIndex={0} aria-label="멤버십 약관 본문" className="mt-5 max-h-[400px] overflow-y-auto bg-shop-150 px-6 py-8 md:px-[50px]">
          {m.terms.map((a) => (
            <ArticleBlock key={a.title} a={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
