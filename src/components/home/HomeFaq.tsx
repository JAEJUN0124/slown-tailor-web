import { FAQ_SECTION, FAQS } from "@/content/home";
import { FaqList } from "@/components/ui/FaqList";
import { Reveal } from "@/components/ui/Reveal";

export function HomeFaq() {
  return (
    <section id="faq" data-paint="cream" data-thread-side="right" className="relative py-section-py">
      <div className="container">
        <Reveal>
          <p className="mb-4 text-label uppercase text-amber-deep">FAQ</p>
          <h2 className="mb-12 text-h1 text-espresso md:mb-16">{FAQ_SECTION.title}</h2>
        </Reveal>
        <FaqList items={FAQS} />
      </div>
    </section>
  );
}
