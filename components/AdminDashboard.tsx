"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  portfolioCategories,
  type About,
  type BlogPost,
  type Content,
  type Experience,
  type Hero,
  type PortfolioCategory,
  type PortfolioItem,
  type Service,
  type Testimonial,
} from "@/lib/content";
import { readingTime } from "@/lib/utils";
import type { EnvStatus, Submission } from "@/lib/types";
import { ImageUploader } from "@/components/ImageUploader";

type Tab = "content" | "submissions" | "settings";

/* ---------- small UI primitives ---------- */

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 font-display text-lg text-slate-900">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
        />
      )}
    </label>
  );
}

/* ---------- content tab ---------- */

function ContentTab({
  content,
  setContent,
}: {
  content: Content;
  setContent: React.Dispatch<React.SetStateAction<Content>>;
}) {
  const { hero, about, services, testimonials, portfolio, blog } = content;

  const patchHero = (patch: Partial<Hero>) =>
    setContent((c) => ({ ...c, hero: { ...c.hero, ...patch } }));
  const patchAbout = (patch: Partial<About>) =>
    setContent((c) => ({ ...c, about: { ...c.about, ...patch } }));
  const setServices = (next: Service[]) => setContent((c) => ({ ...c, services: next }));
  const setTestimonials = (next: Testimonial[]) =>
    setContent((c) => ({ ...c, testimonials: next }));
  const setPortfolio = (next: PortfolioItem[]) =>
    setContent((c) => ({ ...c, portfolio: next }));
  const setBlog = (next: BlogPost[]) => setContent((c) => ({ ...c, blog: next }));

  const lines = (arr: string[]) => arr.join("\n");
  const fromLines = (text: string) =>
    text.split("\n").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="space-y-8">
      <Card title="Hero">
        <Field label="Title" value={hero.title} onChange={(v) => patchHero({ title: v })} />
        <Field
          label="Subtitle / tagline"
          textarea
          value={hero.subtitle}
          onChange={(v) => patchHero({ subtitle: v })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Primary CTA label"
            value={hero.cta_primary.label}
            onChange={(v) => patchHero({ cta_primary: { ...hero.cta_primary, label: v } })}
          />
          <Field
            label="Primary CTA link"
            value={hero.cta_primary.href}
            onChange={(v) => patchHero({ cta_primary: { ...hero.cta_primary, href: v } })}
          />
          <Field
            label="Secondary CTA label"
            value={hero.cta_secondary.label}
            onChange={(v) => patchHero({ cta_secondary: { ...hero.cta_secondary, label: v } })}
          />
              <Field
                label="Secondary CTA link"
                value={hero.cta_secondary.href}
                onChange={(v) => patchHero({ cta_secondary: { ...hero.cta_secondary, href: v } })}
              />
            </div>
            <ImageUploader
              label="Hero image"
              value={hero.image}
              onChange={(url) => patchHero({ image: url })}
            />
          </Card>

      <Card title="About">
        <Field
          label="Headline"
          value={about.headline}
          onChange={(v) => patchAbout({ headline: v })}
        />
        <ImageUploader
          label="Profile picture"
          value={about.image}
          onChange={(url) => patchAbout({ image: url })}
        />
        <Field
          label="Bio (one paragraph per line)"
          textarea
          value={lines(about.bio)}
          onChange={(v) => patchAbout({ bio: fromLines(v) })}
        />
        <Field
          label="Philosophy"
          textarea
          value={about.philosophy}
          onChange={(v) => patchAbout({ philosophy: v })}
        />
        <Field
          label="Expertise (one per line)"
          textarea
          value={lines(about.expertise)}
          onChange={(v) => patchAbout({ expertise: fromLines(v) })}
        />
        <Field
          label="Certifications (one per line)"
          textarea
          value={lines(about.certifications)}
          onChange={(v) => patchAbout({ certifications: fromLines(v) })}
        />
        <ExperienceEditor
          items={about.experience}
          onChange={(next) => patchAbout({ experience: next })}
        />
      </Card>

      <Card title="Services">
        <ListItemManager
          items={services}
          onChange={setServices}
          empty={() => ({ title: "", description: "", icon: "pen", price: "" })}
          render={(s, update, remove) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Title" value={s.title} onChange={(v) => update({ ...s, title: v })} />
              <Field label="Icon" value={s.icon} onChange={(v) => update({ ...s, icon: v })} />
              <div className="sm:col-span-2">
                <Field
                  label="Description"
                  textarea
                  value={s.description}
                  onChange={(v) => update({ ...s, description: v })}
                />
              </div>
              <Field
                label="Price (optional)"
                value={s.price ?? ""}
                onChange={(v) => update({ ...s, price: v })}
              />
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={remove}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        />
      </Card>

      <Card title="Writing Samples">
        <ListItemManager
          items={portfolio}
          onChange={setPortfolio}
          empty={() => ({
            title: "",
            category: "Blog",
            excerpt: "",
            client: "",
            published_date: new Date().toISOString().slice(0, 10),
            read_time: 3,
            featured_image: "",
            content: "",
          }) as PortfolioItem}
          render={(p, update, remove) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Title" value={p.title} onChange={(v) => update({ ...p, title: v })} />
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Category</span>
                  <select
                    value={p.category}
                    onChange={(e) => update({ ...p, category: e.target.value as PortfolioCategory })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
                  >
                    {portfolioCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <Field label="Excerpt" textarea value={p.excerpt} onChange={(v) => update({ ...p, excerpt: v })} />
              <Field
                label="Full content"
                textarea
                value={p.content}
                onChange={(v) => update({ ...p, content: v })}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Client" value={p.client ?? ""} onChange={(v) => update({ ...p, client: v })} />
                <Field
                  label="Published date"
                  value={p.published_date}
                  onChange={(v) => update({ ...p, published_date: v })}
                />
              </div>
              <ImageUploader
                value={p.featured_image}
                onChange={(url) => update({ ...p, featured_image: url })}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  ~{readingTime(p.content)} min read (auto)
                </span>
                <button
                  type="button"
                  onClick={remove}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        />
      </Card>

      <Card title="Blog Posts">
        <ListItemManager
          items={blog}
          onChange={setBlog}
          empty={() => ({
            title: "",
            category: "Strategy",
            excerpt: "",
            published_date: new Date().toISOString().slice(0, 10),
            read_time: 4,
            featured_image: "",
            content: "",
          })}
          render={(b, update, remove) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Title" value={b.title} onChange={(v) => update({ ...b, title: v })} />
                <Field label="Category" value={b.category} onChange={(v) => update({ ...b, category: v })} />
              </div>
              <Field label="Excerpt" textarea value={b.excerpt} onChange={(v) => update({ ...b, excerpt: v })} />
              <Field
                label="Full content"
                textarea
                value={b.content}
                onChange={(v) => update({ ...b, content: v })}
              />
              <Field
                label="Published date"
                value={b.published_date}
                onChange={(v) => update({ ...b, published_date: v })}
              />
              <ImageUploader
                value={b.featured_image}
                onChange={(url) => update({ ...b, featured_image: url })}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  ~{readingTime(b.content)} min read (auto)
                </span>
                <button
                  type="button"
                  onClick={remove}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        />
      </Card>

      <Card title="Testimonials">
        <ListItemManager
          items={testimonials}
          onChange={setTestimonials}
          empty={() => ({ quote: "", name: "", role: "", company: "", avatar: "" })}
          render={(t, update, remove) => (
            <div className="space-y-3">
              <Field label="Quote" textarea value={t.quote} onChange={(v) => update({ ...t, quote: v })} />
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Name" value={t.name} onChange={(v) => update({ ...t, name: v })} />
                <Field label="Role" value={t.role} onChange={(v) => update({ ...t, role: v })} />
                <Field label="Company" value={t.company} onChange={(v) => update({ ...t, company: v })} />
              </div>
              <div className="flex items-center justify-between">
                <Field label="Avatar URL" value={t.avatar} onChange={(v) => update({ ...t, avatar: v })} />
                <button
                  type="button"
                  onClick={remove}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        />
      </Card>
    </div>
  );
}

function ExperienceEditor({
  items,
  onChange,
}: {
  items: Experience[];
  onChange: (next: Experience[]) => void;
}) {
  return (
    <div className="space-y-3 border-t border-slate-100 pt-4">
      <p className="text-sm font-semibold text-slate-700">Experience</p>
      {items.map((exp, i) => (
        <div key={i} className="grid gap-3 rounded-lg bg-slate-50 p-3 sm:grid-cols-2">
          <Field
            label="Role"
            value={exp.role}
            onChange={(v) => onChange(items.map((x, j) => (j === i ? { ...x, role: v } : x)))}
          />
          <Field
            label="Company"
            value={exp.company}
            onChange={(v) => onChange(items.map((x, j) => (j === i ? { ...x, company: v } : x)))}
          />
          <Field
            label="Period"
            value={exp.period}
            onChange={(v) => onChange(items.map((x, j) => (j === i ? { ...x, period: v } : x)))}
          />
          <Field
            label="Description"
            value={exp.description}
            onChange={(v) => onChange(items.map((x, j) => (j === i ? { ...x, description: v } : x)))}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50 sm:col-span-2"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([...items, { role: "", company: "", period: "", description: "" }])
        }
        className="rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
      >
        + Add experience
      </button>
    </div>
  );
}

function ListItemManager<T>({
  items,
  onChange,
  empty,
  render,
}: {
  items: T[];
  onChange: (next: T[]) => void;
  empty: () => T;
  render: (item: T, update: (next: T) => void, remove: () => void, index: number) => ReactNode;
}) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
          {render(
            item,
            (next) => onChange(items.map((x, j) => (j === i ? next : x))),
            () => onChange(items.filter((_, j) => j !== i)),
            i
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, empty()])}
        className="rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
      >
        + Add item
      </button>
    </div>
  );
}

/* ---------- submissions tab ---------- */

function SubmissionsTab() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/submissions", { cache: "no-store" });
      if (res.ok) {
        const json = (await res.json()) as { submissions: Submission[] };
        setSubmissions(json.submissions ?? []);
        setLastUpdated(new Date());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch + 8s polling for live submissions.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    const id = setInterval(load, 8000);
    return () => clearInterval(id);
  }, [load]);

  async function remove(id: string) {
    await fetch("/api/submissions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-3 text-sm text-slate-500">
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            loading ? "animate-pulse bg-amber-400" : "bg-emerald-500"
          }`}
        />
        <span>
          Auto-refreshing every 8s{lastUpdated ? ` · updated ${lastUpdated.toLocaleTimeString()}` : ""}
        </span>
      </div>

      {submissions.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          No submissions yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {submissions.map((s) => (
            <li
              key={s.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">{s.name}</p>
                  <p className="text-sm text-slate-500">
                    {s.email}
                    {s.project ? ` · ${s.project}` : ""}
                  </p>
                  <p className="mt-2 text-sm text-slate-700">{s.message}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    {new Date(s.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(s.id)}
                  className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- settings tab ---------- */

function SettingsTab({ envStatus }: { envStatus: EnvStatus }) {
  async function signOut() {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.href = "/admin";
  }

  const rows: Array<{ label: string; ok: boolean; hint: string }> = [
    { label: "Admin password (ADMIN_PASSWORD)", ok: envStatus.admin, hint: "Required to log in" },
    {
      label: "GitHub storage (GITHUB_TOKEN + GITHUB_REPO)",
      ok: envStatus.github,
      hint: "Persists content & submissions",
    },
    {
      label: "Cloudinary uploads (CLOUDINARY_*)",
      ok: envStatus.cloudinary,
      hint: "Enables featured image uploads",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-display text-lg text-slate-900">Environment</h3>
        <ul className="space-y-3">
          {rows.map((r) => (
            <li key={r.label} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-800">{r.label}</p>
                <p className="text-xs text-slate-500">{r.hint}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  r.ok ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                }`}
              >
                {r.ok ? "Configured" : "Missing"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-2 font-display text-lg text-slate-900">Session</h3>
        <p className="mb-4 text-sm text-slate-500">
          Sign out of the admin console on this device.
        </p>
        <button
          type="button"
          onClick={signOut}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

/* ---------- top-level dashboard ---------- */

const TABS: Array<{ id: Tab; label: string }> = [
  { id: "content", label: "Content" },
  { id: "submissions", label: "Submissions" },
  { id: "settings", label: "Settings" },
];

export function AdminDashboard({
  initialContent,
  envStatus,
}: {
  initialContent: Content;
  envStatus: EnvStatus;
}) {
  const [content, setContent] = useState<Content>(initialContent);
  const [tab, setTab] = useState<Tab>("content");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  async function save() {
    setSaving(true);
    setStatus(null);
    const withTimes: Content = {
      ...content,
      portfolio: content.portfolio.map((p) => ({ ...p, read_time: readingTime(p.content) })),
      blog: content.blog.map((b) => ({ ...b, read_time: readingTime(b.content) })),
    };
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(withTimes),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Save failed");
      setContent(withTimes);
      setStatus({ type: "success", text: "Changes saved." });
    } catch (err) {
      setStatus({
        type: "error",
        text: err instanceof Error ? err.message : "Save failed",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "content" ? (
          <div className="flex items-center gap-3">
            {status ? (
              <span
                className={`text-sm ${
                  status.type === "success" ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {status.text}
              </span>
            ) : null}
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        ) : null}
      </div>

      {tab === "content" ? <ContentTab content={content} setContent={setContent} /> : null}
      {tab === "submissions" ? <SubmissionsTab /> : null}
      {tab === "settings" ? <SettingsTab envStatus={envStatus} /> : null}
    </div>
  );
}
