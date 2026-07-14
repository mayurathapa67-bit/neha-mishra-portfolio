import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogSlug, type BlogPost } from "@/lib/content";
import { getContent } from "@/lib/content-store";
import { readingTime, formatDate } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
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
  const post = content.blog.find((p) => getBlogSlug(p) === slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt };
}

function findPost(content: { blog: BlogPost[] }, slug: string) {
  return content.blog.find((p) => getBlogSlug(p) === slug);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const content = await getContent();
  const post = findPost(content, slug);
  if (!post) notFound();

  const computed = readingTime(post.content);
  const more = content.blog.filter((p) => p.title !== post.title).slice(0, 2);

  return (
    <article className="container-editorial py-16 md:py-24">
      <Reveal>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-teal"
        >
          <Icon name="arrow" width={16} height={16} className="rotate-180" />
          Back to blog
        </Link>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="rounded-full border border-burgundy/30 bg-burgundy/5 px-3 py-1 font-semibold uppercase tracking-wider text-burgundy">
            {post.category}
          </span>
          <span>{formatDate(post.published_date)}</span>
          <span aria-hidden>&middot;</span>
          <span>{computed} min read</span>
        </div>
        <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {post.excerpt}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        {post.featured_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.featured_image}
            alt={post.title}
            className="mx-auto mt-12 max-w-3xl rounded-3xl object-cover shadow-xl"
          />
        ) : null}
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-12 max-w-2xl space-y-6 text-lg leading-relaxed text-ink/90">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Reveal>

      {more.length > 0 ? (
        <section className="mx-auto mt-20 max-w-2xl border-t border-line pt-10">
          <h2 className="font-display text-xl text-ink">Keep reading</h2>
          <ul className="mt-4 space-y-3">
            {more.map((m) => (
              <li key={m.title}>
                <Link
                  href={`/blog/${getBlogSlug(m)}`}
                  className="link-underline text-muted hover:text-teal"
                >
                  {m.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
