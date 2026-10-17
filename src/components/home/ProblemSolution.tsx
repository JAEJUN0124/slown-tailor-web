import { PROBLEM } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";

/** Question on cream paper, answer on coffee — the page paint blends the two as you scroll. */
export function ProblemSolution() {
  return (
    <section id="about">
      <div data-paint="cream" data-thread-side="right" className="relative">
        <div className="container py-section-py-lg">
          <div className="max-w-xl">
            <Reveal>
              <h2 className="text-h1 text-espresso">
                {PROBLEM.title[0]}
                <br />
                {PROBLEM.title[1]}
              </h2>
            </Reveal>
            <div className="mt-16 md:mt-24">
              <Reveal delay={100}>
                <p className="text-lead text-mocha">
                  {PROBLEM.lead[0]}
                  <br />
                  {PROBLEM.lead[1]}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div data-paint="coffee" data-thread-side="left" className="relative">
        <div className="container py-section-py-lg">
          <div className="max-w-xl">
            <Reveal>
              <h2 className="text-h1 text-cream">
                {PROBLEM.answer[0]}
                <br />
                {PROBLEM.answer[1]}
              </h2>
            </Reveal>
            <div className="mt-12 md:mt-16">
              <div className="flex w-full max-w-sm items-start">
                {PROBLEM.steps.map((step, i) => (
                  <div key={step} className="contents">
                    {i > 0 && (
                      <Reveal delay={i * 120 - 60} className="mt-[4px] h-px min-w-[28px] flex-1 bg-amber/40">
                        {null}
                      </Reveal>
                    )}
                    <Reveal delay={i * 120} className="flex flex-col items-center">
                      <div className="h-[9px] w-[9px] rounded-full bg-amber" />
                      <p className="mt-3 text-label uppercase tracking-widest text-cream/60">{step}</p>
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>
            <Reveal delay={200}>
              <p className="mt-12 text-lead text-cream/75">{PROBLEM.closing}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
