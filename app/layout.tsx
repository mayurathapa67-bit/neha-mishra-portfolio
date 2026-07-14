import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nehamishra.example"),
  title: {
    default: `${site.nav.logo} — ${site.nav.tagline}`,
    template: `%s · ${site.nav.logo}`,
  },
  description:
    "Neha Mishra is a content writer & copywriter crafting editorial stories, SEO articles, and brand copy from Blacktown, Australia and Butwal, Nepal.",
  keywords: [
    "content writer",
    "copywriter",
    "SEO writing",
    "brand copy",
    "editorial",
    "Blacktown",
    "Butwal",
    "Neha Mishra",
  ],
  authors: [{ name: site.nav.logo }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://nehamishra.example",
    siteName: site.nav.logo,
    title: `${site.nav.logo} — ${site.nav.tagline}`,
    description:
      "Editorial stories, SEO articles, and brand copy that earns attention.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nav.logo} — ${site.nav.tagline}`,
    description:
      "Editorial stories, SEO articles, and brand copy that earns attention.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-teal focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
