import type { Metadata } from "next";
import { InfoShell } from "@/components/info/InfoShell";
import { BENEFIT } from "@/content/info";

export const metadata: Metadata = { title: "회원 전용 혜택" };

/** Member benefits (reference: /benefit.html): coupons, membership grades, review rewards. */
export default function BenefitPage() {
  const { club } = BENEFIT;
  return (
    <InfoShell menu="benefit" current="/benefit/">
      <div className="space-y-[50px]">
        {BENEFIT.blocks.map((b) => (
          <section key={b.title}>
            <h1 className="font-bold">{b.title}</h1>
            <p>{b.lead}</p>
            {b.items.map((i) => (
              <p key={i}>- {i}</p>
            ))}
          </section>
        ))}
        <section>
          <h2 className="font-bold">{club.title}</h2>
          <p>{club.lead}</p>
          <div className="mt-4 overflow-x-auto xl:max-w-[960px]">
            <table className="w-full min-w-[720px] text-left text-[12px] leading-[25px]">
              <thead className="bg-st-soft">
                <tr>
                  {club.head.map((h) => (
                    <th key={h} scope="col" className="px-1.5 font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {club.rows.map((r) => (
                  <tr key={r[0]}>
                    {r.map((c, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="px-1.5 font-normal">
                          {c}
                        </th>
                      ) : (
                        <td key={i} className="px-1.5">
                          {c}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-5 space-y-1">
            {club.notes.map((n) => (
              <li key={n}>- {n}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-bold">{BENEFIT.review.title}</h2>
          <p>{BENEFIT.review.lead}</p>
          {BENEFIT.review.items.map((i) => (
            <p key={i}>- {i}</p>
          ))}
        </section>
      </div>
    </InfoShell>
  );
}
