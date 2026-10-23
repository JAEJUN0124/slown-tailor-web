"use client";

import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { REVIEWS, REVIEWS_SECTION } from "@/content/home";
import { SITE } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import { EASE_OUT } from "@/lib/utils";

const SPEED = 55; // px per second

type Review = (typeof REVIEWS)[number];

function Meta({ author, date }: { author: string; date: string }) {
  return (
    <>
      <span className="font-medium text-espresso">{author}</span>
      <span className="text-mocha" aria-hidden="true">·</span>
      <span className="text-mocha">{date}</span>
      <span className="text-mocha" aria-hidden="true">·</span>
      <span className="text-mocha">{REVIEWS_SECTION.source}</span>
    </>
  );
}

function ReviewModal({ review, onClose }: { review: Review; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-espresso/60 p-5 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${review.author} 후기`}
        className="max-h-[80svh] w-full max-w-md overflow-y-auto rounded-2xl bg-cream p-8"
        data-lenis-prevent
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 14 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        onClick={(e) => e.stopPropagation()}
      >
        <Stars className="mb-5" />
        <p className="mb-6 text-body leading-relaxed text-espresso">{review.text}</p>
        <div className="flex items-center gap-2 border-t border-line pt-4 text-caption">
          <Meta author={review.author} date={review.date} />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 text-caption text-mocha transition-colors duration-300 hover:text-espresso"
        >
          닫기
        </button>
      </motion.div>
    </motion.div>
  );
}

function ReviewCard({ review, onPause, onResume }: { review: Review; onPause: () => void; onResume: () => void }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useLayoutEffect(() => {
    const el = textRef.current;
    if (el) setOverflowing(el.scrollHeight > el.clientHeight + 1);
  }, [review.text]);

  return (
    <>
      <motion.div
        className="flex h-[280px] w-72 flex-shrink-0 cursor-default flex-col rounded-2xl border border-line bg-cream p-7 shadow-[0_18px_40px_-28px_rgb(43_30_20/0.45)] sm:w-[320px]"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
      >
        <Stars className="flex-shrink-0" />
        <div className="mt-4 min-h-0 flex-1 overflow-hidden">
          <span className="-mb-1 block select-none text-[2.5rem] leading-none text-amber" aria-hidden="true">
            “
          </span>
          <p ref={textRef} className="line-clamp-3 text-body leading-relaxed text-espresso">
            {review.text}
          </p>
          {overflowing && (
            <button
              type="button"
              onClick={() => {
                setOpen(true);
                onPause();
              }}
              className="mt-2 block cursor-pointer text-caption text-mocha transition-colors duration-300 hover:text-coffee"
            >
              더 보기 →
            </button>
          )}
        </div>
        <div className="mt-auto flex flex-shrink-0 items-center gap-2 border-t border-line pt-4 text-caption">
          <Meta author={review.author} date={review.date} />
        </div>
      </motion.div>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <ReviewModal
                review={review}
                onClose={() => {
                  setOpen(false);
                  onResume();
                }}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

export function Reviews() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const loopWidth = useRef(0);
  const x = useMotionValue(0);
  const hovered = useRef(false);
  const modalOpen = useRef(false);
  const dragging = useRef(false);
  const last = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) loopWidth.current = trackRef.current.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((t) => {
    if (reduced || hovered.current || modalOpen.current || dragging.current) {
      last.current = null;
      return;
    }
    if (last.current === null) {
      last.current = t;
      return;
    }
    const dt = t - last.current;
    last.current = t;
    const w = loopWidth.current;
    if (w <= 0) return;
    let next = x.get() - (dt / 1000) * SPEED;
    if (next < -w) next += w;
    x.set(next);
  });

  const setHover = (value: boolean) => () => {
    hovered.current = value;
    last.current = null;
  };
  const setModal = (value: boolean) => () => {
    modalOpen.current = value;
    last.current = null;
  };

  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews" data-paint="latte" data-thread-side="right" className="relative py-section-py">
      <div className="container mb-12 md:mb-16">
        <Reveal>
          <p className="mb-4 text-label uppercase text-amber-deep">Reviews</p>
          <h2 className="text-h1 text-espresso">
            {REVIEWS_SECTION.title[0]}
            <br />
            {REVIEWS_SECTION.title[1]}
          </h2>
        </Reveal>
      </div>

      <div className="overflow-hidden" onMouseEnter={setHover(true)} onMouseLeave={setHover(false)}>
        <motion.div
          ref={trackRef}
          className="flex w-max gap-4 pb-6 pt-2"
          style={{ x, touchAction: "pan-y" }}
          drag="x"
          dragConstraints={{ left: -99999, right: 0 }}
          dragElastic={0.04}
          dragMomentum={false}
          onDragStart={() => {
            dragging.current = true;
          }}
          onDragEnd={() => {
            dragging.current = false;
            last.current = null;
            const w = loopWidth.current;
            if (w <= 0) return;
            let v = x.get();
            while (v > 0) v -= w;
            while (v < -w) v += w;
            x.set(v);
          }}
        >
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} onPause={setModal(true)} onResume={setModal(false)} />
          ))}
        </motion.div>
      </div>

      <div className="container mt-10 flex justify-start">
        <Reveal delay={100}>
          <motion.a
            href={SITE.bookingUrl}
            className="inline-flex items-center gap-2.5 rounded-pill border border-coffee/60 px-7 py-3 text-body text-coffee"
            initial="rest"
            whileHover="hovered"
            variants={{ rest: { backgroundColor: "rgba(113,80,47,0)" }, hovered: { backgroundColor: "rgba(113,80,47,0.08)" } }}
            transition={{ duration: 0.3 }}
          >
            <span>{REVIEWS_SECTION.more}</span>
            <motion.span
              className="inline-block"
              variants={{ rest: { x: 0 }, hovered: { x: 4 } }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              →
            </motion.span>
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
