import type { Metadata } from "next";
import { getContent } from "@/lib/content-store";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact",
    description:
      "Work with Neha Mishra — content writer & copywriter based in Blacktown, Australia and Butwal, Nepal.",
  };
}

export default async function ContactPage() {
  const content = await getContent();
  const c = content.contact;
  const details = [
    { icon: "mail", label: "Email", value: c.email, href: `mailto:${c.email}` },
    {
      icon: "phone",
      label: "Phone",
      value: c.phone,
      href: `tel:${c.phone.replace(/\s/g, "")}`,
    },
    { icon: "pin", label: "Based in", value: c.location, href: null },
  ];

  return (
    <div className="container-editorial py-16 md:py-24">
      <Reveal>
        <p className="eyebrow mb-4">Contact</p>
        <h1 className="max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
          Let&apos;s make it read well.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Tell me about your project, your audience, and what success looks
          like. I&apos;ll reply within two business days.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.8fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-line bg-paper/60 p-8">
            <div className="space-y-6">
              {details.map((d) => (
                <div key={d.label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                    <Icon name={d.icon} width={20} height={20} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="link-underline font-medium text-ink hover:text-teal"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="font-medium text-ink">{d.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-line pt-6">
              <p className="text-xs uppercase tracking-widest text-muted">
                Elsewhere
              </p>
              <div className="mt-4 flex gap-3">
                {c.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink/70 transition-colors hover:border-teal hover:text-teal"
                  >
                    <Icon name={s.icon} width={18} height={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
