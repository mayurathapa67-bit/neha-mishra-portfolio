import { cache } from "react";
import { readJson } from "@/lib/github";
import type { Content } from "@/lib/content";

/**
 * Reads the live site content for the current request.
 * - On Vercel (GitHub configured): fetches the latest content.json from GitHub.
 * - In local dev: reads content.json from disk.
 * Wrapped in React's `cache()` so multiple calls within a single request
 * (layout + page) resolve to one read.
 */
export const getContent = cache(async (): Promise<Content> => {
  const { data } = await readJson<Content>("content.json");
  return data;
});
