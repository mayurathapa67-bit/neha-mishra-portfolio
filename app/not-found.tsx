import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-editorial flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-4xl text-ink sm:text-5xl">
        This page wandered off.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The words you&apos;re looking for aren&apos;t here. Let&apos;s get you
        back to the good stuff.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Return home
      </Link>
    </div>
  );
}
