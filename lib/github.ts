import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const REPO = process.env.GITHUB_REPO ?? "";
const TOKEN = process.env.GITHUB_TOKEN ?? "";
const BRANCH = process.env.GITHUB_BRANCH ?? "main";

export function gitHubEnabled(): boolean {
  return REPO.length > 0 && TOKEN.length > 0;
}

type GitHubFile = {
  content: string;
  sha: string;
};

type ReadResult<T> = {
  data: T;
  sha: string | null;
};

async function readFromGitHub<T>(filePath: string): Promise<ReadResult<T>> {
  const url = `https://api.github.com/repos/${REPO}/contents/${filePath}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (res.status === 404) {
    return { data: [] as unknown as T, sha: null };
  }
  if (!res.ok) {
    throw new Error(`GitHub read failed (${res.status}) for ${filePath}`);
  }

  const json = (await res.json()) as GitHubFile;
  const decoded = Buffer.from(json.content, "base64").toString("utf8");
  return { data: JSON.parse(decoded) as T, sha: json.sha };
}

async function readLocal<T>(filePath: string): Promise<ReadResult<T>> {
  const full = path.resolve(process.cwd(), filePath);
  try {
    const raw = await readFile(full, "utf8");
    return { data: JSON.parse(raw) as T, sha: null };
  } catch {
    return { data: [] as unknown as T, sha: null };
  }
}

export async function readJson<T>(filePath: string): Promise<ReadResult<T>> {
  if (gitHubEnabled()) return readFromGitHub<T>(filePath);
  return readLocal<T>(filePath);
}

async function writeToGitHub(
  filePath: string,
  body: string,
  message: string,
  sha: string | null
): Promise<void> {
  const url = `https://api.github.com/repos/${REPO}/contents/${filePath}`;
  const payload: Record<string, unknown> = {
    message,
    content: Buffer.from(body, "utf8").toString("base64"),
    branch: BRANCH,
  };
  if (sha) payload.sha = sha;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub write failed (${res.status}): ${detail}`);
  }
}

async function writeLocal(filePath: string, body: string): Promise<void> {
  const full = path.resolve(process.cwd(), filePath);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, body, "utf8");
}

export async function writeJson<T>(
  filePath: string,
  data: T,
  message: string,
  sha: string | null
): Promise<void> {
  const body = JSON.stringify(data, null, 2);
  if (gitHubEnabled()) {
    await writeToGitHub(filePath, body, message, sha);
    return;
  }
  await writeLocal(filePath, body);
}
