import type { MetadataRoute } from "next";
import { site, getBlogSlug, getPortfolioSlug } from "@/lib/content";

const BASE = "https://nehamishra.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/portfolio", "/services", "/blog", "/contact"];
  const staticEntries = routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.8,
  }));

  const blogEntries = site.blog.map((post) => ({
    url: `${BASE}/blog/${getBlogSlug(post)}`,
    lastModified: new Date(post.published_date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const portfolioEntries = site.portfolio.map((item) => ({
    url: `${BASE}/portfolio/${getPortfolioSlug(item)}`,
    lastModified: new Date(item.published_date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries, ...portfolioEntries];
}
