import { Reveal } from "@/components/Reveal";

const lines = [
  { text: "Clarity", note: "is a kind of kindness." },
  { text: "Rhythm", note: "is what makes prose sing." },
  { text: "Restraint", note: "is the writer's real power." },
];

export function TypographyShowcase() {
  return (
    <section className="border-y border-line bg-paper/50">
      <div className="container-editorial py-20 md:py-28">
        <Reveal>
          <p className="eyebrow mb-4">A command of language</p>
          <h2 className="max-w-3xl font-display text-3xl leading-tight text-ink sm:text-4xl">
            Great writing is not decoration. It is the difference between being
            read and being remembered.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {lines.map((l, i) => (
            <Reveal key={l.text} delay={i * 0.1}>
              <p className="font-display text-5xl font-semibold italic text-teal">
                {l.text}
              </p>
              <p className="mt-3 text-lg text-muted">{l.note}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <blockquote className="mt-16 border-l-2 border-teal pl-6 font-display text-2xl italic leading-relaxed text-ink md:text-3xl">
            &ldquo;The first draft is the writer telling themselves the story.
            The final draft is the writer telling you.&rdquo;
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
