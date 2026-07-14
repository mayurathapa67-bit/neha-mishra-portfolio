import Link from "next/link";
import { getContent } from "@/lib/content-store";
import { getPortfolioSlug } from "@/lib/content";
import { Hero } from "@/components/Hero";
import { TypographyShowcase } from "@/components/TypographyShowcase";
import { ServicesGrid } from "@/components/ServicesGrid";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { BlogPreview } from "@/components/BlogPreview";
import { WritingSampleCard } from "@/components/WritingSampleCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getContent();
  const featured = content.portfolio.slice(0, 3);

  return (
    <>
      <Hero hero={content.hero} />

      {/* Featured writing samples */}
      <section className="container-editorial py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured work"
            title="Selected writing samples"
            description="A cross-section of the words I've written — strategy, story, and sales in equal measure."
          />
          <Reveal>
            <Link href="/portfolio" className="btn-ghost">
              View portfolio
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <WritingSampleCard
                title={item.title}
                category={item.category}
                excerpt={item.excerpt}
                readTime={item.read_time}
                date={item.published_date}
                client={item.client}
                href={`/portfolio/${getPortfolioSlug(item)}`}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <TypographyShowcase />

      {/* Services preview */}
      <section className="container-editorial py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What I do"
            title="Services for brands that mean it"
            description="From strategy to the final full stop, I help teams say the right thing."
          />
          <Reveal>
            <Link href="/services" className="btn-ghost">
              All services
            </Link>
          </Reveal>
        </div>
        <div className="mt-12">
          <ServicesGrid services={content.services} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-paper/40 py-20 md:py-28">
        <div className="container-editorial">
          <SectionHeading
            align="center"
            eyebrow="Kind words"
            title="What clients say"
          />
          <div className="mt-12">
            <TestimonialsCarousel testimonials={content.testimonials} />
          </div>
        </div>
      </section>

      <BlogPreview posts={content.blog} />

      {/* CTA band */}
      <section className="container-editorial py-20 md:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal to-teal-deep px-8 py-16 text-center md:px-16">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <h2 className="mx-auto max-w-2xl font-display text-3xl text-white sm:text-4xl">
              Have a story worth telling? Let&apos;s write it well.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              I take on a small number of projects each month to keep the work
              sharp. Tell me what you&apos;re building.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-teal-deep transition-transform hover:-translate-y-0.5"
            >
              Start a project
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
