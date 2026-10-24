import type { Metadata } from "next";
import { SceneArt } from "@/components/art/SceneArt";
import { InfoShell } from "@/components/info/InfoShell";
import { ABOUT } from "@/content/info";

export const metadata: Metadata = { title: "소개하기" };

/** About (reference: /about.html): photo + statement rows, purpose, mission. */
export default function AboutPage() {
  const row = ABOUT.rows[0];
  return (
    <InfoShell menu="about" current="/about/">
      <div className="space-y-24 xl:space-y-[115px] xl:pl-4 xl:pt-[62px]">
        <section className="items-center gap-8 xl:flex">
          <div className="aspect-[3/2] overflow-hidden xl:w-[654px] xl:shrink-0">
            <SceneArt scene={row.scene} />
          </div>
          <div className="mt-8 max-w-[444px] xl:mt-0">
            <h1 className="text-[22px] font-normal leading-[1.4] text-st-text">{row.title}</h1>
            <p className="mt-8 text-[14px] leading-[20px] text-st-text">{row.body}</p>
          </div>
        </section>

        <section className="flex flex-col-reverse gap-8 xl:flex-row xl:items-start xl:gap-[47px]">
          <div className="max-w-[376px] xl:pt-[54px]">
            <h2 className="text-[22px] font-normal leading-[1.4] text-st-text">{ABOUT.purpose.title}</h2>
            {ABOUT.purpose.paragraphs.map((p) => (
              <p key={p} className="mt-8 text-[14px] leading-[20px] text-st-text">
                {p}
              </p>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-2 gap-2.5">
            {ABOUT.purpose.scenes.map((s, i) => (
              <div key={i} className="aspect-[460/689] overflow-hidden">
                <SceneArt scene={s} />
              </div>
            ))}
          </div>
        </section>

        <section className="gap-2.5 xl:grid xl:grid-cols-2">
          <h2 className="text-[22px] font-normal leading-[1.4] text-st-text">{ABOUT.mission.title}</h2>
          <div className="mt-8 xl:mt-0">
            <p className="text-[16px] font-medium leading-[22px] text-st-ink">{ABOUT.mission.service}</p>
            <p className="text-[12px] leading-[18px] text-st-ink">{ABOUT.mission.serviceSub}</p>
            <ul className="mt-10 space-y-[35px]">
              {ABOUT.mission.items.map((m) => (
                <li key={m.title}>
                  <h3 className="text-[12px] leading-[15px] text-st-ink">{m.title}</h3>
                  <p className="mt-1 max-w-[380px] text-[12px] leading-[18px] text-st-ink">{m.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </InfoShell>
  );
}
