"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/Icons";

const fields = [
  { name: "name", label: "Your name", type: "text", placeholder: "Jane Doe" },
  { name: "email", label: "Email", type: "email", placeholder: "jane@brand.com" },
  {
    name: "budget",
    label: "Project type",
    type: "select",
    options: [
      "Content strategy",
      "SEO writing",
      "Brand copy",
      "Social media",
      "Technical writing",
      "Something else",
    ],
  },
] as const;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "Content strategy",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error ?? "Something went wrong");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-3xl border border-teal/30 bg-teal/5 p-12 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white">
          <Icon name="check" width={26} height={26} />
        </div>
        <h3 className="mt-5 font-display text-2xl text-ink">
          Thank you, {form.name || "friend"}.
        </h3>
        <p className="mt-2 max-w-sm text-muted">
          Your message is on its way. I&apos;ll reply within two business days —
          usually sooner.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="btn-ghost mt-6"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-cream/70 p-8 md:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="mb-2 block text-sm font-medium text-ink">
            Your name
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Jane Doe"
            className="w-full rounded-xl border border-line bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-teal"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-2 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="jane@brand.com"
            className="w-full rounded-xl border border-line bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-teal"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-ink">
            Project type
          </label>
          <select
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className="w-full rounded-xl border border-line bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-teal"
          >
            {fields
              .filter((f) => f.type === "select")
              .flatMap((f) => f.options ?? [])
              .map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-ink">
            Tell me about your project
          </label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="A little about your brand, goals, and timeline…"
            className="w-full resize-none rounded-xl border border-line bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-teal"
          />
        </div>
      </div>
      {error ? (
        <p className="mt-4 rounded-xl border border-burgundy/30 bg-burgundy/5 px-4 py-3 text-sm text-burgundy">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary mt-6 w-full sm:w-auto disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send message"}
        <Icon name="arrow" width={18} height={18} />
      </button>
    </form>
  );
}
