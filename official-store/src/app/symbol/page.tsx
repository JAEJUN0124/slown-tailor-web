import type { Metadata } from "next";
import { InfoShell } from "@/components/info/InfoShell";
import { SYMBOL } from "@/content/info";

export const metadata: Metadata = { title: "상징" };

/** The SLOWN mark: one line turning back on itself, ticked like a tape measure. */
function Mark({ solid }: { solid: boolean }) {
  return (
    <svg viewBox="0 0 440 120" className="w-full max-w-[440px]" role="img" aria-label={`슬로운 심볼 ${solid ? "VERSION.2" : "VERSION.1"}`}>
      <path d="M20 60 H180 C210 60 210 20 240 20 H420" fill="none" stroke="#000" strokeWidth={solid ? 5 : 7} strokeLinecap="square" />
      {!solid && <path d="M20 60 H180 C210 60 210 20 240 20 H420" fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="square" />}
      {[60, 100, 140].map((x) => (
        <path key={x} d={`M${x} 60 V${x === 100 ? 90 : 78}`} stroke="#000" strokeWidth={solid ? 4 : 2} />
      ))}
      <path d="M300 20 V100" stroke="#000" strokeWidth={solid ? 5 : 2} />
    </svg>
  );
}

/** Symbol (reference: /symbol.html): motifs on the left, the two versions on the right. */
export default function SymbolPage() {
  return (
    <InfoShell menu="about" current="/symbol/">
      <div className="xl:flex xl:gap-10 xl:pl-4">
        <div className="xl:w-[290px] xl:shrink-0">
          <h1 className="text-[12px] font-bold leading-[18px] text-st-faint">{SYMBOL.title}</h1>
          {SYMBOL.motifs.map((m) => (
            <p key={m} className="mt-5 text-[12px] font-bold leading-[18px] text-st-ink">
              {m}
            </p>
          ))}
          <p className="mt-10 max-w-[290px] text-[12px] leading-[20px] text-st-ink">{SYMBOL.body}</p>
        </div>
        <div className="mt-12 flex-1 space-y-24 xl:mt-0">
          {SYMBOL.versions.map((v, i) => (
            <section key={v}>
              <h2 className="text-[12px] leading-[18px] text-st-ink">{v}</h2>
              <div className="flex h-[300px] items-center justify-center xl:h-[400px]">
                <Mark solid={i === 1} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </InfoShell>
  );
}
