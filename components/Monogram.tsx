import { cn } from "@/lib/utils";

type MonogramProps = {
  label?: string;
  className?: string;
  variant?: "teal" | "burgundy" | "ink";
};

const fills: Record<string, string> = {
  teal: "from-teal/90 to-teal-deep",
  burgundy: "from-burgundy-soft to-burgundy",
  ink: "from-ink to-[#3a322c]",
};

export function Monogram({
  label = "NM",
  className,
  variant = "teal",
}: MonogramProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br",
        fills[variant],
        className
      )}
    >
      <span
        className="font-display text-white/90"
        style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", lineHeight: 1 }}
      >
        {label}
      </span>
      <span className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_70%,white,transparent_35%)]" />
    </div>
  );
}
