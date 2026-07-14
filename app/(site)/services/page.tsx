import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content-store";
import { ServicesGrid } from "@/components/ServicesGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Services",
    description:
      "Content strategy, SEO writing, brand copy, social media, and technical writing by Neha Mishra.",
  };
}

const process = [
  { step: "01", title: "Discover", text: "We unpack your audience, goals, and the voice you want to own." },
  { step: "02", title: "Draft", text: "I write the first pass — fast, honest, and built to be edited." },
  { step: "03", title: "Refine", text: "Tight rounds of revision until the words feel inevitable." },
  { step: "04", title: "Deliver", text: "Polished, formatted, and ready to publish or ship." },
];

export default async function ServicesPage() {
  const content = await getContent();
  return (
    <div className="container-editorial py-16 md:py-24">
      <SectionHeading
        eyebrow="Services"
        title="How we'll work together"
        description="Flexible engagements for teams that care about what they say and how it lands."
      />

      <div className="mt-14">
        <ServicesGrid services={content.services} />
      </div>

      <section className="mt-24">
        <SectionHeading eyebrow="The process" title="From brief to published" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-line bg-cream/70 p-6">
                <span className="font-display text-3xl text-teal">
                  {p.step}
                </span>
                <h3 className="mt-3 font-display text-xl text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <div className="mt-24 flex flex-col items-start gap-6 rounded-3xl border border-line bg-paper/60 p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">
              Not sure which service you need?
            </h2>
            <p className="mt-2 text-muted">
              Send a note and we&apos;ll figure out the right fit.
            </p>
          </div>
          <Link href="/contact" className="btn-primary whitespace-nowrap">
            Book a chat
            <Icon name="arrow" width={18} height={18} />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
