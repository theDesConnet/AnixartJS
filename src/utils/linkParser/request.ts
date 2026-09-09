import { parseHlsMaster } from "./parseHlsMaster";
import type { ILinkParserOptions, VideoLinks } from "./types";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function httpUrl(value: string, base?: string): URL {
  const url = new URL(value, base);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new TypeError("Парсер поддерживает только HTTP(S)-ссылки");
  }
  return url;
}

export function createParserRequest(options: ILinkParserOptions) {
  const timeoutSignal =
    options.timeoutMs === undefined ? undefined : AbortSignal.timeout(options.timeoutMs);
  const signal = timeoutSignal
    ? options.signal
      ? AbortSignal.any([options.signal, timeoutSignal])
      : timeoutSignal
    : options.signal;

  return async (url: string | URL, init: RequestInit = {}): Promise<Response> => {
    signal?.throwIfAborted();
    const response = await fetch(httpUrl(String(url)), {
      ...init,
      ...(signal ? { signal } : {}),
    });

    if (!response.ok) {
      await response.body?.cancel();
      throw new Error(`Ошибка источника: HTTP ${response.status}`);
    }

    return response;
  };
}

export async function readJsonObject(response: Response): Promise<Record<string, unknown>> {
  const body: unknown = await response.json();
  if (!isRecord(body)) throw new TypeError("Источник вернул JSON неверного формата");
  return body;
}

export async function fetchHlsLinks(
  request: ReturnType<typeof createParserRequest>,
  url: string,
  init: RequestInit = {},
): Promise<VideoLinks | null> {
  const response = await request(url, init);
  const links = parseHlsMaster(await response.text(), response.url || url);
  return Object.keys(links).length ? links : null;
}
