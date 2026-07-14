import type { Metadata } from "next";
import { getContent } from "@/lib/content-store";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { Reveal } from "@/components/Reveal";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Portfolio",
    description:
      "A filterable collection of writing samples — SEO, blog, copywriting, technical, and creative work by Neha Mishra.",
  };
}

export default async function PortfolioPage() {
  const content = await getContent();
  return (
    <div className="container-editorial py-16 md:py-24">
      <Reveal>
        <p className="eyebrow mb-4">Writing samples</p>
        <h1 className="max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
          Words for every brief.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Filter by discipline or search by keyword. Each sample is a small
          argument for why the right words are worth the effort.
        </p>
      </Reveal>

      <div className="mt-14">
        <PortfolioGrid items={content.portfolio} />
      </div>
    </div>
  );
}
