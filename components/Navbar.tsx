"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/Icons";
import { cn } from "@/lib/utils";
import type { Nav } from "@/lib/content";

export function Navbar({ nav }: { nav: Nav }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-line/70 py-3" : "py-5"
      )}
    >
      <nav className="container-editorial flex items-center justify-between">
        <Link href="/" onClick={closeMenu} className="group flex flex-col leading-none">
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            {nav.logo}
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              {nav.tagline}
          </span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "link-underline text-sm font-medium transition-colors",
                  isActive(link.href) ? "text-teal" : "text-ink/80 hover:text-teal"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="btn-primary !py-2.5 !px-5 text-sm">
              Work with me
            </Link>
          </li>
        </ul>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
        >
          <Icon name={open ? "close" : "menu"} width={20} height={20} />
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
          >
            <ul className="container-editorial flex flex-col gap-1 pb-6 pt-4">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-medium",
                      isActive(link.href)
                        ? "bg-teal/10 text-teal"
                        : "text-ink/80"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link href="/contact" className="btn-primary w-full">
                  Work with me
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
