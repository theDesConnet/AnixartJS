import { createParserRequest, fetchHlsLinks, httpUrl, isRecord, readJsonObject } from "./request";
import type { ILinkParserOptions, VideoLinks } from "./types";

/** Парсер источника Rutube. */
export class RutubeParser {
  private static _baseRutubeDomain = "rutube.ru";

  /** Возвращает варианты HLS или null, если ссылки отсутствуют. Ошибки запросов не скрываются. */
  public static async getDirectLinks(
    link: string,
    options: ILinkParserOptions = {},
  ): Promise<VideoLinks | null> {
    const url = httpUrl(link);
    if (url.hostname !== this._baseRutubeDomain && url.hostname !== "www.rutube.ru") return null;
    const videoId = /^\/play\/embed\/([\w-]+)\/?$/.exec(url.pathname)?.[1];
    if (!videoId) return null;

    const request = createParserRequest(options);
    const response = await request(
      `https://${this._baseRutubeDomain}/api/play/options/${videoId}/?no_404=true&referer&pver=v2`,
    );
    const body = await readJsonObject(response);
    if (!isRecord(body.video_balancer)) return null;
    const balancerUrl = body.video_balancer.default;
    if (typeof balancerUrl !== "string" || !balancerUrl.trim()) return null;

    return fetchHlsLinks(request, httpUrl(balancerUrl, response.url || url.href).href);
  }
}
