"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/Icons";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/content";

export function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const items = testimonials;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (next: number) => {
      setDir(next > index || (index === items.length - 1 && next === 0) ? 1 : -1);
      setIndex((next + items.length) % items.length);
    },
    [index, items.length]
  );

  useEffect(() => {
    const t = setInterval(() => go((index + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [go, index, items.length]);

  const active = items[index];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-paper/70 px-8 py-14 md:px-16">
      <span className="pointer-events-none absolute -top-6 left-6 font-display text-[10rem] leading-none text-teal/10">
        &ldquo;
      </span>

      <AnimatePresence mode="wait" custom={dir}>
        <motion.blockquote
          key={active.name}
          custom={dir}
          initial={{ opacity: 0, x: dir * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <p className="font-display text-2xl leading-snug text-ink md:text-3xl">
            {active.quote}
          </p>
          <footer className="mt-8 text-sm">
            <span className="font-semibold text-ink">{active.name}</span>
            <span className="text-muted">
              {" "}
              — {active.role}, {active.company}
            </span>
          </footer>
        </motion.blockquote>
      </AnimatePresence>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => go(index - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-teal hover:text-teal"
        >
          <Icon name="arrow" width={18} height={18} className="rotate-180" />
        </button>

        <div className="flex gap-2">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => go(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-teal" : "w-2 bg-line hover:bg-muted"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => go(index + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-teal hover:text-teal"
        >
          <Icon name="arrow" width={18} height={18} />
        </button>
      </div>
    </div>
  );
}
