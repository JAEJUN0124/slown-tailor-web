"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { KEY_VISUALS, type KeyVisual as Slide } from "@/content/shop";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";
import { ArtSvg } from "./ProductArt";

const DELAY = 4000; // autoplay delay (reference: Swiper autoplay 4000ms)
const SPEED = 300; // slide transition (reference: Swiper speed 300ms)

function SlideArt({ slide }: { slide: Slide }) {
  const [from, to] = slide.backdrop;
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `radial-gradient(55% 75% at ${slide.light}, rgb(255 255 255 / 0.16), transparent 70%), linear-gradient(160deg, ${from}, ${to})`,
      }}
    >
      {slide.props.map((prop, i) => (
        <ArtSvg
          key={i}
          art={prop}
          className="absolute bottom-[-2%] -translate-x-1/2"
          style={{ left: `${prop.left}%`, height: `${prop.height}%`, width: "auto", aspectRatio: "200 / 266" }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}

/** Thin two-bar pause / outline play glyphs, like the reference's line icons. */
function PlaybackIcon({ playing }: { playing: boolean }) {
  return (
    <svg viewBox="0 0 44 44" className="size-11" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      {playing ? <path d="M17 9 V35 M27 9 V35" /> : <path d="M15 10 L33 22 L15 34 Z" strokeLinejoin="round" />}
    </svg>
  );
}

/**
 * Full-bleed looping slider (reference: `.key-visual` Swiper). Clones of the
 * last/first slide sit at both ends so the loop always slides forward; after
 * landing on a clone the track jumps to the real slide without animating.
 */
export function KeyVisual() {
  const slides = KEY_VISUALS;
  const n = slides.length;
  const track = [slides[n - 1], ...slides, slides[0]];
  const reduced = useReducedMotion();

  const [pos, setPos] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [over, setOver] = useState(false);
  const moving = useRef(false);
  const drag = useRef<{ x: number; swiped: boolean } | null>(null);

  // Auto-moving content starts paused for people who ask for less motion.
  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (moving.current) return;
      moving.current = !reduced;
      setAnimate(!reduced);
      setPos((p) => p + dir);
    },
    [reduced],
  );

  const settle = useCallback(() => {
    moving.current = false;
    if (pos === 0 || pos === n + 1) {
      setAnimate(false);
      setPos(pos === 0 ? n : 1);
    }
  }, [pos, n]);

  // Without a transition there is no transitionend to settle on.
  useEffect(() => {
    if (reduced) settle();
  }, [reduced, settle]);

  // Turn transitions back on one frame after a silent jump.
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => setAnimate(!reduced));
    return () => cancelAnimationFrame(id);
  }, [animate, reduced]);

  // The reference keeps autoplaying after manual moves; the timer restarts per slide.
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => go(1), DELAY);
    return () => window.clearTimeout(t);
  }, [playing, pos, go]);

  const onPointerDown = (e: PointerEvent) => {
    drag.current = { x: e.clientX, swiped: false };
  };
  const onPointerUp = (e: PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 40) {
      drag.current.swiped = true;
      go(dx < 0 ? 1 : -1);
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="브랜드 주요 기획전"
      className="relative w-full overflow-hidden bg-black/20"
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      <div
        className="flex touch-pan-y"
        style={{
          transform: `translate3d(${-pos * 100}%, 0, 0)`,
          transition: animate && !reduced ? `transform ${SPEED}ms ease` : "none",
        }}
        onTransitionEnd={(e) => e.target === e.currentTarget && settle()}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onClickCapture={(e) => {
          // A swipe that ends on the slide link should not also follow it.
          if (drag.current?.swiped) e.preventDefault();
          drag.current = null;
        }}
        aria-live={playing ? "off" : "polite"}
      >
        {track.map((slide, i) => {
          const shown = i === pos;
          return (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${((i - 1 + n) % n) + 1} / ${n}`}
              aria-hidden={!shown}
              inert={!shown}
              className="relative w-full shrink-0"
            >
              <Link
                href={`/promotions/${slide.id}/`}
                draggable={false}
                className="relative block aspect-[4/5] md:aspect-[1920/853]"
              >
                <SlideArt slide={slide} />
                <span className="absolute inset-0 z-30 flex flex-col items-center justify-center px-8 text-center text-white md:px-20">
                  <span className="mb-1 line-clamp-2 max-w-[400px] whitespace-pre-line text-[26px] font-bold leading-[34px] md:text-[32px] md:leading-[42px]">
                    {slide.title}
                  </span>
                  <span className="line-clamp-2 max-w-[400px] whitespace-pre-line text-[15px] leading-[21px] md:text-[17px] md:leading-[23px]">
                    {slide.desc}
                  </span>
                </span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Below md the controls drop to the bottom edge so they clear the copy. */}
      <button
        type="button"
        aria-label="이전 슬라이드"
        onClick={() => go(-1)}
        className={cn(
          "absolute bottom-3 left-2.5 z-40 flex size-11 items-center justify-center rounded-xl transition-colors md:bottom-auto md:top-1/2 md:size-16 md:-translate-y-1/2",
          over ? "bg-black/40 text-white" : "text-white/80",
        )}
      >
        <ChevronLeft className="size-9 md:size-11" strokeWidth={0.9} />
      </button>
      <div
        className={cn(
          "absolute bottom-3 right-2.5 z-40 flex h-11 items-center justify-between rounded-xl transition-colors md:bottom-auto md:top-1/2 md:h-16 md:w-[114px] md:-translate-y-1/2 md:p-2.5",
          over ? "bg-black/40 text-white" : "text-white/80",
        )}
      >
        <button type="button" aria-label="다음 슬라이드" onClick={() => go(1)} className="flex size-11 items-center justify-center">
          <ChevronRight className="size-9 md:size-11" strokeWidth={0.9} />
        </button>
        <button
          type="button"
          aria-label={playing ? "자동 넘김 멈춤" : "자동 넘김 시작"}
          onClick={() => setPlaying((p) => !p)}
          className={cn("flex size-11 items-center justify-center transition-opacity", !playing && !over && "opacity-40")}
        >
          <PlaybackIcon playing={playing} />
        </button>
      </div>
    </section>
  );
}
