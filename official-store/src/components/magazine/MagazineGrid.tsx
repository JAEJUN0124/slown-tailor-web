import Link from "next/link";
import { SceneArt } from "@/components/art/SceneArt";
import { MAGAZINE_META, type MagazineEntry } from "@/content/magazine";

/**
 * Campaign / lookbook / journal list (reference: .magazine_lists): three
 * columns of 3:2 covers with the English title on the left and the Korean
 * one on the right.
 */
export function MagazineGrid({ entries, label }: { entries: MagazineEntry[]; label: string }) {
  return (
    <div className="px-3 pb-24 pt-7 xl:px-3">
      <h1 className="sr-only">{label}</h1>
      <ul className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 xl:gap-y-[50px]">
        {entries.map((e) => (
          <li key={e.slug} className="px-0 sm:px-2 xl:px-4">
            <Link href={MAGAZINE_META[e.kind].detail(e.slug)} className="group block">
              <figure>
                <div className="aspect-[3/2] overflow-hidden">
                  <SceneArt scene={e.cover} className="transition-transform duration-700 ease-hm group-hover:scale-[1.03]" />
                </div>
                <figcaption className="flex items-start justify-between gap-6 px-4 pt-3 text-[16px] leading-[32px] tracking-[-0.01em] text-st-text xl:text-[18px]">
                  <span>{e.title}</span>
                  <span className="shrink-0 text-right">{e.titleKo}</span>
                </figcaption>
              </figure>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
