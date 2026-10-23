"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { DIRECTOR_SECTION, DIRECTORS } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { cn, EASE_OUT } from "@/lib/utils";

type Director = (typeof DIRECTORS)[number];

/** Portrait slot until real photography is in place. */
function Portrait({ director, className }: { director: Director; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex aspect-[3/4] items-end overflow-hidden rounded-2xl bg-gradient-to-b from-latte to-[#e3d2bd] p-4",
        className,
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-[72px] font-black tracking-tight text-coffee/10"
        aria-hidden="true"
      >
        {director.name.slice(0, 1)}
      </span>
      <span className="relative text-caption text-mocha">{director.name} — 사진 자리</span>
    </div>
  );
}

function Body({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className={cn("leading-relaxed text-mocha", i > 0 && "mt-4")}>
          {p}
        </p>
      ))}
    </>
  );
}

function Tag({ label }: { label: string }) {
  return <span className="rounded-full border border-coffee/15 bg-latte/70 px-3 py-1.5 text-caption text-coffee">{label}</span>;
}

function TabButton({ director, active, onClick, mobile }: { director: Director; active: boolean; onClick: () => void; mobile?: boolean }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls="director-panel"
      onClick={onClick}
      className={cn(
        "-mb-px flex flex-shrink-0 flex-col items-start border-b-2 transition-colors duration-300 ease-out",
        mobile ? "pb-3" : "pb-4",
        active ? "border-amber" : "border-transparent hover:border-coffee/25",
      )}
    >
      <span
        className={cn("transition-colors duration-300", mobile && "whitespace-nowrap", active ? "font-medium text-espresso" : "text-mocha")}
        style={{ lineHeight: 1.2 }}
      >
        {director.name}
      </span>
      <span className={cn("text-caption tracking-widest text-mocha/60", mobile && "whitespace-nowrap")}>{director.role}</span>
    </button>
  );
}

export function Directors() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const d = DIRECTORS[index];
  const swap = {
    initial: reduced ? false : { opacity: 0, y: 10, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: reduced ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" },
  } as const;

  return (
    <section id="director" data-paint="cream" data-thread-side="left" className="relative py-section-py">
      <div className="container">
        <Reveal>
          <p className="mb-4 text-label uppercase text-amber-deep">Directors</p>
          <h2 className="mb-5 text-h1 text-espresso">
            {DIRECTOR_SECTION.title[0]}
            <br />
            {DIRECTOR_SECTION.title[1]}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mb-10 max-w-lg text-lead text-mocha">
            {DIRECTOR_SECTION.lead[0]}
            <br />
            {DIRECTOR_SECTION.lead[1]}
          </p>
        </Reveal>

        {/* desktop */}
        <div className="hidden lg:block">
          <Reveal delay={150}>
            <div role="tablist" aria-label="디렉터 선택" className="mb-10 flex gap-8 border-b border-line">
              {DIRECTORS.map((director, i) => (
                <TabButton key={director.name} director={director} active={i === index} onClick={() => setIndex(i)} />
              ))}
            </div>
          </Reveal>
          <div id="director-panel" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={`desk-${index}`}
                {...swap}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="grid grid-cols-[220px_1fr] items-start gap-12 xl:grid-cols-[260px_1fr] xl:gap-16"
              >
                <Portrait director={d} />
                <div className="flex flex-col">
                  <div className="mb-5">
                    <p className="text-h3 leading-tight text-espresso">{d.name}</p>
                    <p className="mt-0.5 text-label tracking-widest text-amber-deep">— {d.role}</p>
                  </div>
                  <blockquote className="mb-7">
                    <p className="text-h2 italic leading-snug text-coffee">“{d.quote}”</p>
                  </blockquote>
                  <div className="mb-7 h-px w-12 bg-amber" />
                  <div className="mb-6">
                    <Body paragraphs={d.body} />
                  </div>
                  <div className="mb-8 flex flex-wrap gap-2">
                    {d.tags.map((t) => (
                      <Tag key={t} label={t} />
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <p className="text-caption tabular-nums tracking-widest text-mocha/60">
                      {String(index + 1).padStart(2, "0")} / {String(DIRECTORS.length).padStart(2, "0")}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* mobile / tablet */}
        <div className="lg:hidden">
          <div className="relative -mx-5 sm:-mx-8">
            <div className="scrollbar-none overflow-x-auto">
              <div
                role="tablist"
                aria-label="디렉터 선택"
                className="mb-7 flex gap-6 border-b border-line px-5 sm:px-8"
                style={{ width: "max-content", minWidth: "100%" }}
              >
                {DIRECTORS.map((director, i) => (
                  <TabButton key={director.name} director={director} active={i === index} onClick={() => setIndex(i)} mobile />
                ))}
              </div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={`mob-${index}`} {...swap} transition={{ duration: 0.45, ease: EASE_OUT }}>
              <div className="mb-6 flex justify-center">
                <Portrait director={d} className="w-full max-w-[180px] md:max-w-[220px]" />
              </div>
              <div className="mb-4">
                <p className="text-h3 leading-tight text-espresso">{d.name}</p>
                <p className="mt-0.5 text-label tracking-widest text-amber-deep">— {d.role}</p>
              </div>
              <blockquote className="mb-5">
                <p className="text-h3 italic leading-snug text-coffee">“{d.quote}”</p>
              </blockquote>
              <div className="mb-5 h-px w-10 bg-amber" />
              <div className="mb-4">
                <Body paragraphs={d.body} />
              </div>
              <div className="flex flex-wrap gap-2">
                {d.tags.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
