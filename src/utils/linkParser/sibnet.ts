import { createParserRequest, httpUrl } from "./request";
import type { ILinkParserOptions, VideoLinks } from "./types";

/** Парсер источника Sibnet. */
export class SibnetParser {
  public static srcMatch = /\bsrc\s*:\s*(?:"([^"]+)"|'([^']+)')/;

  /** Возвращает прямую ссылку в группе unknown: качество из страницы не извлекается. */
  public static async getDirectLinks(
    link: string,
    options: ILinkParserOptions = {},
  ): Promise<VideoLinks | null> {
    const request = createParserRequest(options);
    const page = await request(link);
    const match = this.srcMatch.exec(await page.text());
    const source = match?.[1] ?? match?.[2];
    if (!source) return null;

    const pageUrl = page.url || link;
    const sourceUrl = httpUrl(source, pageUrl);
    const response = await request(sourceUrl, { headers: { Referer: pageUrl } });
    const finalUrl = httpUrl(response.url || sourceUrl.href).href;
    const type = response.headers.get("content-type")?.split(";")[0]?.trim();
    await response.body?.cancel();

    return { unknown: [{ src: finalUrl, ...(type ? { type } : {}) }] };
  }
}
