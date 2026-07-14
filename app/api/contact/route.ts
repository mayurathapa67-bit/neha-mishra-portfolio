import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { readJson, writeJson } from "@/lib/github";
import type { Submission } from "@/lib/types";

export const runtime = "nodejs";

const SUBMISSIONS_PATH = "data/submissions.json";

type ContactBody = {
  name?: string;
  email?: string;
  project?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required" },
      { status: 400 }
    );
  }

  const submission: Submission = {
    id: randomUUID(),
    name,
    email,
    project: (body.project ?? "").trim(),
    message,
    createdAt: new Date().toISOString(),
  };

  try {
    const { data, sha } = await readJson<Submission[]>(SUBMISSIONS_PATH);
    const list = Array.isArray(data) ? data : [];
    await writeJson(
      SUBMISSIONS_PATH,
      [...list, submission],
      `New contact submission from ${name}`,
      sha
    );
    return NextResponse.json({ ok: true, id: submission.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save submission";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
