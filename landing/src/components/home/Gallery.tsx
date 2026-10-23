import { GALLERY, GALLERY_SECTION } from "@/content/home";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Reveal } from "@/components/ui/Reveal";

export function Gallery() {
  return (
    <section data-paint="cream" data-thread-side="left" className="relative py-section-y">
      <div className="container">
        <Reveal>
          <p className="mb-4 text-label uppercase text-amber-deep">Moments</p>
          <h2 className="mb-4 text-h1 text-espresso">{GALLERY_SECTION.title}</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mb-12 text-lead text-mocha md:mb-16">
            {GALLERY_SECTION.lead[0]}
            <br />
            {GALLERY_SECTION.lead[1]}
          </p>
        </Reveal>

        {/* Fade the last row with a mask so it melts into whatever paint sits behind. */}
        <div className="[mask-image:linear-gradient(to_bottom,black_82%,transparent)]">
          <div className="columns-3 gap-[14px] lg:columns-4 lg:gap-[18px]">
            {GALLERY.map((photo, i) => (
              <Reveal key={i} delay={(i % 4) * 60} className="mb-[14px] break-inside-avoid lg:mb-[18px]">
                <div className="group cursor-pointer overflow-hidden rounded-xl">
                  <PhotoPlaceholder
                    index={i}
                    ratio={photo.ratio}
                    label={String(i + 1).padStart(2, "0")}
                    alt={photo.caption}
                    className="grayscale group-hover:scale-[1.04] group-hover:grayscale-0 motion-safe:transition-[filter,transform] motion-safe:duration-700 motion-safe:ease-out"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
