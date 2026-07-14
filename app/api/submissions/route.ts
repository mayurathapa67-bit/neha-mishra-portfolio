import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readJson, writeJson } from "@/lib/github";
import type { Submission } from "@/lib/types";

export const runtime = "nodejs";

const SUBMISSIONS_PATH = "data/submissions.json";

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { data } = await readJson<Submission[]>(SUBMISSIONS_PATH);
    const list = Array.isArray(data) ? data : [];
    return NextResponse.json({ submissions: list });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to read submissions";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let id = "";
  try {
    const body = (await request.json()) as { id?: string };
    id = body.id ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!id) {
    return NextResponse.json({ error: "Missing submission id" }, { status: 400 });
  }

  try {
    const { data, sha } = await readJson<Submission[]>(SUBMISSIONS_PATH);
    const list = Array.isArray(data) ? data : [];
    const next = list.filter((s) => s.id !== id);
    await writeJson(SUBMISSIONS_PATH, next, `Delete submission ${id}`, sha);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete submission";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
