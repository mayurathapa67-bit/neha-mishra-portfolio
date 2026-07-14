import { type Service } from "@/lib/content";
import { Icon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <Reveal key={service.title} delay={(i % 3) * 0.08}>
          <article className="group flex h-full flex-col rounded-2xl border border-line bg-cream/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-teal/50 hover:shadow-xl hover:shadow-teal/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
              <Icon name={service.icon} width={24} height={24} />
            </div>
            <h3 className="mt-5 font-display text-xl text-ink">
              {service.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {service.description}
            </p>
            {service.price ? (
              <p className="mt-5 text-sm font-medium text-teal">
                {service.price}
              </p>
            ) : null}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
