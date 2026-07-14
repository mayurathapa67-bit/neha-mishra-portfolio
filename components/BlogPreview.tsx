import Link from "next/link";
import { getBlogSlug, type BlogPost } from "@/lib/content";
import { WritingSampleCard } from "@/components/WritingSampleCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function BlogPreview({
  posts,
  limit = 3,
}: {
  posts: BlogPost[];
  limit?: number;
}) {
  const shown = posts.slice(0, limit);
  return (
    <section className="container-editorial py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="From the journal"
          title="Thoughts on writing, brand, and craft"
        />
        <Reveal>
          <Link href="/blog" className="btn-ghost">
            All articles
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {shown.map((post, i) => (
          <Reveal key={post.title} delay={i * 0.08}>
            <WritingSampleCard
              title={post.title}
              category={post.category}
              excerpt={post.excerpt}
              readTime={post.read_time}
              date={post.published_date}
              image={post.featured_image}
              href={`/blog/${getBlogSlug(post)}`}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
