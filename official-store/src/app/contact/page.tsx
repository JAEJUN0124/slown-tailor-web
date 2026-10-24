import type { Metadata } from "next";
import { InfoEntry, InfoShell } from "@/components/info/InfoShell";
import { CONTACT } from "@/content/info";
import { STORES } from "@/content/stores";

export const metadata: Metadata = { title: "연락망" };

/** Contacts (reference: /contact.html): head office, customer centre, stores. */
export default function ContactPage() {
  const blocks = [
    ...CONTACT,
    { title: "공식 오프라인 스토어", lines: [] as string[] },
  ];
  return (
    <InfoShell menu="about" current="/contact/">
      {blocks.map((b, i) => (
        <section key={b.title} className={i > 0 ? "mt-[60px] border-t border-st-line pt-6" : ""}>
          <h1 className="mb-[30px] font-bold">{b.title}</h1>
          {b.lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
          {"links" in b &&
            b.links?.map((l) => (
              <div key={l.label} className="mt-[18px]">
                <InfoEntry name={l.label} lines={l.lines} />
              </div>
            ))}
          {i === blocks.length - 1 &&
            STORES.slice(0, 3).map((s) => <InfoEntry key={s.name} name={s.name} lines={[`운영시간 (Opening Hours) : ${s.hours}`, `주소 (Address) : ${s.address}`, s.addressEn, `연락처 (Tel) : ${s.tel}`]} />)}
        </section>
      ))}
    </InfoShell>
  );
}
