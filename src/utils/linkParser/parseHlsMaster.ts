import type { VideoLinks } from "./types";

/**
 * Разбирает HLS master-плейлист и разрешает ссылки относительно его URL.
 */
export function parseHlsMaster(
  content: string,
  playlistUrl: string,
): VideoLinks {
  const baseUrl = new URL(playlistUrl);
  const lines = content.trim().split(/\r?\n/);

  if (lines[0]?.trim() !== "#EXTM3U") {
    throw new Error("Ответ не является HLS-плейлистом");
  }

  const links: VideoLinks = {};
  let pendingQuality: string | null = null;

  for (const rawLine of lines.slice(1)) {
    const line = rawLine.trim();

    if (!line) continue;

    if (line.startsWith("#EXT-X-STREAM-INF:")) {
      const attributes = line.slice("#EXT-X-STREAM-INF:".length);
      const attributePattern = /(?:^|,)([A-Z0-9-]+)=("[^"]*"|[^,]*)/g;

      pendingQuality = "unknown";

      for (const match of attributes.matchAll(attributePattern)) {
        if (match[1] !== "RESOLUTION") continue;

        const resolution = /^(\d+)x(\d+)$/.exec(match[2] ?? "");
        const height = resolution?.[2];

        if (height && Number(height) > 0) {
          pendingQuality = String(Number(height));
        }
      }

      continue;
    }

    if (line.startsWith("#EXT")) {
      pendingQuality = null;
      continue;
    }

    if (line.startsWith("#")) continue;
    if (pendingQuality === null) continue;

    const sourceUrl = new URL(line, baseUrl);

    if (sourceUrl.protocol !== "https:" && sourceUrl.protocol !== "http:") {
      throw new Error(`Недопустимый протокол: ${sourceUrl.protocol}`);
    }

    const sources = (links[pendingQuality] ??= []);

    if (!sources.some((source) => source.src === sourceUrl.href)) {
      sources.push({
        src: sourceUrl.href,
        type: "application/vnd.apple.mpegurl",
      });
    }

    pendingQuality = null;
  }

  return links;
}
