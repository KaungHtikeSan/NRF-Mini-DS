import { readFile } from "node:fs/promises";
import path from "node:path";

const files = {
  ios: {
    directory: "ios",
    filename: "NRFTokens.swift",
  },
  android: {
    directory: "android",
    filename: "NRFTokens.kt",
  },
} as const;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ platform: string }> },
) {
  const { platform } = await params;
  if (platform !== "ios" && platform !== "android") {
    return new Response("Platform not found.", { status: 404 });
  }

  const file = files[platform];
  const source = path.join(
    process.cwd(),
    "design-system",
    "generated",
    file.directory,
    file.filename,
  );
  const content = await readFile(source, "utf8");

  return new Response(content, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Disposition": "attachment; filename=" + file.filename,
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
