import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readJson, writeJson } from "@/lib/github";
import type { Content } from "@/lib/content";

export const runtime = "nodejs";

const CONTENT_PATH = "content.json";

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { data } = await readJson<Content>(CONTENT_PATH);
    return NextResponse.json(
      { content: data },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to read content";
    return NextResponse.json(
      { error: message },
      {
        status: 500,
        headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
      }
    );
  }
}

export async function PUT(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let updated: Content;
  try {
    updated = (await request.json()) as Content;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const { sha } = await readJson<Content>(CONTENT_PATH);
    await writeJson(CONTENT_PATH, updated, "Update site content via admin", sha);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
