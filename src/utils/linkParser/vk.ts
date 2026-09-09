import { randomUUID } from "node:crypto";
import { createParserRequest, fetchHlsLinks, httpUrl, isRecord, readJsonObject } from "./request";
import type { ILinkParserOptions, VideoLinks } from "./types";

export interface VKVideoTokenResponse {
  token: string;
  expires_at: number;
}

/** Парсер источника VK Video. */
export class VKVideoParser {
  private static _baseVkDomain = "vk.com";
  private static _iosUserAgent =
    "com.vk.vkvideo.prod/822 (iPhone, iOS 16.7.7, iPhone10,4, Scale/2.0) SAK/1.119";

  /** Возвращает варианты HLS или null, если ссылки отсутствуют. Ошибки запросов не скрываются. */
  public static async getDirectLinks(
    link: string,
    options: ILinkParserOptions = {},
  ): Promise<VideoLinks | null> {
    const params = httpUrl(link).searchParams;
    const oid = params.get("oid");
    const id = params.get("id");
    const hash = params.get("hash");
    if (!oid || !/^-?\d+$/.test(oid) || !id || !/^\d+$/.test(id) || !hash) return null;

    const request = createParserRequest(options);
    const deviceId = randomUUID();
    const headers = { "User-Agent": this._iosUserAgent };
    const tokenUrl = new URL(`https://oauth.${this._baseVkDomain}/oauth/get_anonym_token`);
    tokenUrl.search = new URLSearchParams({
      client_id: "51552953",
      client_secret: "qgr0yWwXCrsxA1jnRtRX",
      device_id: deviceId,
    }).toString();
    const token = await readJsonObject(await request(tokenUrl, { headers }));
    
    if (token.error) throw new Error("VK: не удалось получить анонимный токен");
    if (typeof token.token !== "string" || !token.token) {
      throw new TypeError("VK: в ответе отсутствует анонимный токен");
    }

    const body = await readJsonObject(await request(
      `https://api.${this._baseVkDomain}/method/video.get`,
      {
        method: "POST",
        headers,
        body: new URLSearchParams({
          anonymous_token: token.token,
          device_id: deviceId,
          lang: "en",
          v: "5.244",
          videos: `${oid}_${id}_${hash}`,
        }),
      },
    ));

    if (body.error) throw new Error("VK: ошибка получения видео");
    if (!isRecord(body.response) || !Array.isArray(body.response.items)) return null;

    const video = body.response.items[0];
    if (!isRecord(video) || !isRecord(video.files)) return null;

    const hls = video.files.hls;
    if (typeof hls !== "string" || !hls.trim()) return null;

    return fetchHlsLinks(request, httpUrl(hls).href);
  }
}
