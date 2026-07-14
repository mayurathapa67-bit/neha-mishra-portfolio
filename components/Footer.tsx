import Link from "next/link";
import { Icon } from "@/components/Icons";
import type { Contact, Nav } from "@/lib/content";

export function Footer({ nav, contact }: { nav: Nav; contact: Contact }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-paper/60">
      <div className="container-editorial py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-semibold text-ink">
              {nav.logo}
            </p>
            <p className="mt-3 max-w-xs text-muted">{nav.tagline}</p>
            <p className="mt-4 text-sm text-muted">{contact.location}</p>
          </div>

          <div>
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-2">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm text-ink/80 hover:text-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Connect</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="link-underline inline-flex items-center gap-2 text-sm text-ink/80 hover:text-teal"
                >
                  <Icon name="mail" width={16} height={16} />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="link-underline inline-flex items-center gap-2 text-sm text-ink/80 hover:text-teal"
                >
                  <Icon name="phone" width={16} height={16} />
                  {contact.phone}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {contact.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink/70 transition-colors hover:border-teal hover:text-teal"
                >
                  <Icon name={s.icon} width={18} height={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row">
          <p>
            &copy; {year} {nav.logo}. All rights reserved.
          </p>
          <p>Crafted with care, between two cities.</p>
        </div>
      </div>
    </footer>
  );
}
