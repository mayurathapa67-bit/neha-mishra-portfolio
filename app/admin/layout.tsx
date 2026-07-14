import Link from "next/link";
import { site } from "@/lib/content";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="font-semibold text-slate-900">{site.nav.logo}</p>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Admin Console
            </p>
          </div>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900">
            View site &rarr;
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </div>
  );
}
