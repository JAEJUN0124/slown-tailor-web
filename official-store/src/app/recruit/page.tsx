import type { Metadata } from "next";
import { InfoShell } from "@/components/info/InfoShell";
import { RECRUIT } from "@/content/info";
import { COMPANY } from "@/content/site";
import { DemoButton } from "@/components/ui/DemoButton";

export const metadata: Metadata = { title: "채용" };

/** Careers (reference: /recruit.html): mission text and openings. */
export default function RecruitPage() {
  return (
    <InfoShell menu="about" current="/recruit/" title={RECRUIT.title} intro={[RECRUIT.lead]}>
      <div className="space-y-[50px] xl:max-w-[640px]">
        {RECRUIT.sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-bold">{s.title}</h2>
            <p className="mt-2 text-[13px] leading-[21px]">{s.body}</p>
          </section>
        ))}
        <section>
          <h2 className="font-bold">채용 중인 포지션</h2>
          <ul className="mt-4 border-t border-st-ink">
            {RECRUIT.openings.map((o) => (
              <li key={o.role} className="grid grid-cols-[90px_1fr_auto] items-center gap-4 border-b border-st-line py-4 text-[13px]">
                <span className="text-st-mute">{o.team}</span>
                <span>{o.role}</span>
                <DemoButton what="지원서 접수는" className="text-[12px] underline underline-offset-2">
                  {o.type} · 지원하기
                </DemoButton>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-st-mute">지원 문의 : recruit@slown.example · {COMPANY.phone}</p>
        </section>
      </div>
    </InfoShell>
  );
}
