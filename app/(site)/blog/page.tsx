import type { Metadata } from "next";
import { getContent } from "@/lib/content-store";
import { BlogPreview } from "@/components/BlogPreview";
import { Reveal } from "@/components/Reveal";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog",
    description:
      "Essays on writing, brand voice, and the craft of clear words by Neha Mishra.",
  };
}

export default async function BlogPage() {
  const content = await getContent();
  return (
    <div className="container-editorial py-16 md:py-24">
      <Reveal>
        <p className="eyebrow mb-4">Journal</p>
        <h1 className="max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
          Notes on writing well.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Occasional essays on craft, brand, and the small decisions that make
          words work harder.
        </p>
      </Reveal>

      <div className="mt-14">
        <BlogPreview posts={content.blog} limit={content.blog.length} />
      </div>
    </div>
  );
}
