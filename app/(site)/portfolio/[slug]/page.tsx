import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPortfolioSlug, type PortfolioItem } from "@/lib/content";
import { getContent } from "@/lib/content-store";
import { readingTime, formatDate } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { Monogram } from "@/components/Monogram";
import { Icon } from "@/components/Icons";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const item = content.portfolio.find((p) => getPortfolioSlug(p) === slug);
  if (!item) return { title: "Sample not found" };
  return {
    title: item.title,
    description: item.excerpt,
  };
}

function findItem(content: { portfolio: PortfolioItem[] }, slug: string) {
  return content.portfolio.find((p) => getPortfolioSlug(p) === slug);
}

export default async function PortfolioSamplePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const content = await getContent();
  const item = findItem(content, slug);
  if (!item) notFound();

  const computed = readingTime(item.content);
  const related = content.portfolio
    .filter((p) => p.category === item.category && p.title !== item.title)
    .slice(0, 3);

  return (
    <article className="container-editorial py-16 md:py-24">
      <Reveal>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-teal"
        >
          <Icon name="arrow" width={16} height={16} className="rotate-180" />
          Back to portfolio
        </Link>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="rounded-full border border-teal/30 bg-teal/5 px-3 py-1 font-semibold uppercase tracking-wider text-teal">
            {item.category}
          </span>
          <span>{item.client}</span>
          <span aria-hidden>&middot;</span>
          <span>{formatDate(item.published_date)}</span>
          <span aria-hidden>&middot;</span>
          <span>{computed} min read</span>
        </div>
        <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl">
          {item.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {item.excerpt}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        {item.featured_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.featured_image}
            alt={item.title}
            className="mt-12 aspect-[21/9] w-full rounded-3xl object-cover shadow-xl"
          />
        ) : (
          <Monogram
            label={item.category[0]}
            variant={item.category === "Creative" || item.category === "Copywriting" ? "burgundy" : "teal"}
            className="mt-12 aspect-[21/9] w-full shadow-xl"
          />
        )}
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-12 max-w-2xl space-y-6 text-lg leading-relaxed text-ink/90">
          {item.content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Reveal>

      {related.length > 0 ? (
        <section className="mx-auto mt-20 max-w-2xl border-t border-line pt-10">
          <h2 className="font-display text-xl text-ink">
            More {item.category} work
          </h2>
          <ul className="mt-4 space-y-3">
            {related.map((r) => (
              <li key={r.title}>
                <Link
                  href={`/portfolio/${getPortfolioSlug(r)}`}
                  className="link-underline text-muted hover:text-teal"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
