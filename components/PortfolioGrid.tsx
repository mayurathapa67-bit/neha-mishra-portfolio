"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  portfolioCategories,
  getPortfolioSlug,
  type PortfolioItem,
} from "@/lib/content";
import { WritingSampleCard } from "@/components/WritingSampleCard";
import { Icon } from "@/components/Icons";
import { cn } from "@/lib/utils";

type Props = {
  items: PortfolioItem[];
};

type Filter = "All" | (typeof portfolioCategories)[number];

export function PortfolioGrid({ items }: Props) {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = filter === "All" || item.category === filter;
      const matchesQuery =
        q === "" ||
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        (item.client?.toLowerCase().includes(q) ?? false);
      return matchesCategory && matchesQuery;
    });
  }, [items, filter, query]);

  const filters: Filter[] = ["All", ...portfolioCategories];

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-line pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                filter === f
                  ? "border-teal bg-teal text-white"
                  : "border-line text-ink/70 hover:border-teal hover:text-teal"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Icon
            name="search"
            width={18}
            height={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search samples…"
            aria-label="Search writing samples"
            className="w-full rounded-full border border-line bg-cream/70 py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-teal"
          />
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        Showing {filtered.length} of {items.length} samples
      </p>

      <motion.div layout className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.title}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <WritingSampleCard
                title={item.title}
                category={item.category}
                excerpt={item.excerpt}
                readTime={item.read_time}
                date={item.published_date}
                client={item.client}
                image={item.featured_image}
                href={`/portfolio/${getPortfolioSlug(item)}`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted">
          No samples match your search. Try a different keyword or category.
        </p>
      ) : null}
    </div>
  );
}
