import Link from "next/link";
import { formatDate } from "@/lib/utils";

export type SampleCardProps = {
  title: string;
  category: string;
  excerpt: string;
  readTime: number;
  date: string;
  client?: string;
  href: string;
  image?: string;
};

const accentFor: Record<string, string> = {
  Creative: "text-burgundy border-burgundy/30 bg-burgundy/5",
  Copywriting: "text-burgundy border-burgundy/30 bg-burgundy/5",
  SEO: "text-teal border-teal/30 bg-teal/5",
  Blog: "text-teal border-teal/30 bg-teal/5",
  Technical: "text-ink border-line bg-paper",
};

export function WritingSampleCard({
  title,
  category,
  excerpt,
  readTime,
  date,
  client,
  href,
  image,
}: SampleCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-line bg-cream/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal/50 hover:shadow-xl hover:shadow-teal/5"
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={title}
          className="-mx-6 -mt-6 mb-5 aspect-[16/10] w-[calc(100%+3rem)] rounded-t-2xl object-cover"
        />
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
            accentFor[category] ?? "text-teal border-teal/30 bg-teal/5"
          }`}
        >
          {category}
        </span>
        <span className="text-xs text-muted">{readTime} min read</span>
      </div>

      <h3 className="mt-5 font-display text-2xl leading-snug text-ink transition-colors group-hover:text-teal">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {excerpt}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
        <span>{client ?? formatDate(date)}</span>
        <span className="inline-flex items-center gap-1 font-medium text-teal">
          Read
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
