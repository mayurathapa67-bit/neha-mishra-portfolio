"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { Hero as HeroContent } from "@/lib/content";
import { Monogram } from "@/components/Monogram";

export function Hero({ hero }: { hero: HeroContent }) {
  const reduce = useReducedMotion();
  const h = hero;

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };
  const item: Variants = reduce
    ? {}
    : {
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-burgundy/10 blur-3xl" />

      <div className="container-editorial relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div>
            <motion.p variants={item} className="eyebrow mb-5">
              Content Writer &amp; Copywriter
            </motion.p>
            <motion.h1
              variants={item}
              className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl"
            >
              {h.title}
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
            >
              {h.subtitle}
            </motion.p>
            <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
              <Link href={h.cta_primary.href} className="btn-primary">
                {h.cta_primary.label}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
              <Link href={h.cta_secondary.href} className="btn-ghost">
                {h.cta_secondary.label}
              </Link>
            </motion.div>

            <motion.dl
              variants={item}
              className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8"
            >
              {h.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl font-semibold text-teal">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-sm text-muted">{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div variants={item} className="relative">
            {h.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={h.image}
                alt={h.title}
                className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl shadow-teal/10"
              />
            ) : (
              <Monogram
                label="NM"
                variant="teal"
                className="aspect-[4/5] w-full shadow-xl shadow-teal/10"
              />
            )}
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-cream/90 px-5 py-4 shadow-lg ring-1 ring-line sm:block">
              <p className="font-display text-lg text-ink">
                &ldquo;Words are my craft.&rdquo;
              </p>
              <p className="text-xs uppercase tracking-widest text-muted">
                Neha Mishra
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
