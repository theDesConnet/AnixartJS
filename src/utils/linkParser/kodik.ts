import { createParserRequest, httpUrl, isRecord, readJsonObject } from "./request";
import type { ILinkParserOptions, VideoLinks } from "./types";

export type KodikQuality = "240" | "360" | "480" | "720" | "1080" | string;

export interface KodikVideoSource {
  src: string;
  type: string;
}

export type KodikVideoLinks = Record<KodikQuality, KodikVideoSource[]>;

export interface IKodikParserOptions extends ILinkParserOptions {
  /** Путь из getLatestLink(); по умолчанию используется /ftor. */
  endpointPath?: string;
}

export interface KodikVast {
  title_small: string;
  src: string;
  timer?: number;
  hide_interface?: boolean;
  async_load?: boolean;
  vpaid_target_event?: string;
  vpaid_max_load_time?: number;
  vpaid_max_start_time?: number;
  vpaid_start_event?: string;
  vpaid_timer_start_event?: string;
  vpaid_ad_skippable_state?: boolean;
  advert_id?: string;
  save_views?: boolean;
  start_muted?: boolean;
  max_length?: number;
  disable_advert_click?: number;
  send_stat_method?: string;
  stop_timer_on_pause?: boolean;
}

export interface KodikDirectLinkResponse {
  advert_script: string;
  domain: string;
  default: number;
  links: KodikVideoLinks;
  vast: KodikVast[];
  reserve_vast: KodikVast[];
  ip: string;
}

/** Парсер источника Kodik. */
export class KodikParser {
  private static _baseKodikDomain = "kodikplayer.com";
  private static _endpointUrl = "/ftor";

  /** Извлекает путь endpoint из скрипта плеера. Не меняет endpoint следующих запросов автоматически. */
  public static async getLatestLink(
    url: string,
    options: ILinkParserOptions = {},
  ): Promise<string | null> {
    const request = createParserRequest(options);
    const page = await request(url);
    const html = await page.text();
    const scriptPath = /\bsrc\s*=\s*["']([^"']*\/assets\/js\/app\.player_single\.[^"']+\.js(?:\?[^"']*)?)["']/i.exec(html)?.[1];
    if (!scriptPath) return null;

    const script = await request(httpUrl(scriptPath, page.url || url));
    const encodedPath = /url\s*:\s*atob\(\s*["']([^"']+)["']\s*\)/i.exec(await script.text())?.[1];
    return encodedPath ? atob(encodedPath) : null;
  }

  /** Возвращает ссылки; endpointPath позволяет использовать путь из getLatestLink(). */
  public static async getDirectLinks(
    link: string,
    options: IKodikParserOptions = {},
  ): Promise<VideoLinks | null> {
    const endpoint = httpUrl(options.endpointPath ?? this._endpointUrl, `https://${this._baseKodikDomain}`);
    if (endpoint.origin !== `https://${this._baseKodikDomain}`) {
      throw new TypeError("Endpoint Kodik должен находиться на домене плеера");
    }

    const request = createParserRequest(options);
    const page = await request(link);
    const html = await page.text();
    const hash = /\w+\.hash\s*=\s*'([^']*)'/i.exec(html)?.[1];
    const id = /\w+\.id\s*=\s*'([^']*)'/i.exec(html)?.[1];
    const type = /\w+\.type\s*=\s*'([^']*)'/i.exec(html)?.[1];
    if (!hash || !id || !type) return null;

    const rawParams = /var\s+urlParams\s*=\s*'(.*?)';/s.exec(html)?.[1];
    const params: unknown = rawParams ? JSON.parse(rawParams) : {};

    if (!isRecord(params)) throw new TypeError("Kodik: неверный формат urlParams");

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      if (!["string", "number", "boolean"].includes(typeof value)) {
        throw new TypeError("Kodik: вложенные значения urlParams не поддерживаются");
      }
      endpoint.searchParams.set(key, String(value));
    }
    
    endpoint.searchParams.set("type", type);
    endpoint.searchParams.set("hash", hash);
    endpoint.searchParams.set("id", id);

    const response = await request(endpoint, {
      referrer: "",
      referrerPolicy: "no-referrer",
    });
    const body = await readJsonObject(response);
    if (!isRecord(body.links)) return null;

    const links: VideoLinks = Object.create(null);
    for (const [quality, sources] of Object.entries(body.links)) {
      if (!Array.isArray(sources)) throw new TypeError("Kodik: неверный список источников");
      for (const source of sources) {
        if (!isRecord(source) || typeof source.src !== "string") {
          throw new TypeError("Kodik: источник не содержит src");
        }
        let decoded = source.src.trim();
        if (!decoded) continue;
        if (!/^(?:https?:)?\/\//i.test(decoded) && !decoded.startsWith("/")) {
          const base64 = decoded.replace(/[a-zA-Z]/g, (letter) => {
            const offset = letter <= "Z" ? 65 : 97;
            return String.fromCharCode((letter.charCodeAt(0) - offset + 18) % 26 + offset);
          });
          decoded = atob(base64);
        }
        const src = httpUrl(decoded, page.url || link).href;
        (links[quality] ??= []).push({
          src,
          ...(typeof source.type === "string" ? { type: source.type } : {}),
        });
      }
    }

    return Object.keys(links).length ? links : null;
  }
}
