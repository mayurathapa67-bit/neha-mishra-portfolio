import type { Metadata } from "next";
import { getContent } from "@/lib/content-store";
import { Reveal } from "@/components/Reveal";
import { Monogram } from "@/components/Monogram";
import { Icon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return { title: "About", description: content.about.bio[0] };
}

export default async function AboutPage() {
  const content = await getContent();
  const a = content.about;

  return (
    <div className="container-editorial py-16 md:py-24">
      <Reveal>
        <p className="eyebrow mb-4">About</p>
        <h1 className="max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
          {a.headline}
        </h1>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            {a.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          {a.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={a.image}
              alt="Neha Mishra"
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl shadow-burgundy/10"
            />
          ) : (
            <Monogram
              label="NM"
              variant="burgundy"
              className="aspect-[4/5] w-full shadow-xl shadow-burgundy/10"
            />
          )}
        </Reveal>
      </div>

      <Reveal>
        <blockquote className="mx-auto mt-20 max-w-3xl border-l-2 border-burgundy pl-6 font-display text-2xl italic leading-relaxed text-ink md:text-3xl">
          &ldquo;{a.philosophy}&rdquo;
        </blockquote>
      </Reveal>

      <section className="mt-20">
        <Reveal>
          <h2 className="font-display text-2xl text-ink">Areas of expertise</h2>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-3">
          {a.expertise.map((skill, i) => (
            <Reveal key={skill} delay={i * 0.05}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-cream/70 px-4 py-2 text-sm font-medium text-ink/80">
                <Icon name="check" width={16} height={16} className="text-teal" />
                {skill}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <Reveal>
          <h2 className="font-display text-2xl text-ink">Experience</h2>
        </Reveal>
        <div className="mt-8 space-y-6">
          {a.experience.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.08}>
              <div className="grid gap-2 border-t border-line pt-6 sm:grid-cols-[200px_1fr]">
                <div>
                  <p className="font-display text-lg text-ink">{exp.role}</p>
                  <p className="text-sm text-muted">{exp.period}</p>
                </div>
                <div>
                  <p className="font-medium text-teal">{exp.company}</p>
                  <p className="mt-1 text-muted">{exp.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <Reveal>
          <h2 className="font-display text-2xl text-ink">Certifications</h2>
        </Reveal>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {a.certifications.map((c, i) => (
            <Reveal key={c} delay={i * 0.06}>
              <li className="flex items-center gap-3 rounded-2xl border border-line bg-cream/70 px-5 py-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <Icon name="doc" width={18} height={18} />
                </span>
                <span className="text-sm font-medium text-ink">{c}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
