import {
  createParserRequest,
  fetchHlsLinks,
  httpUrl,
  isRecord,
} from "./request";
import type { ILinkParserOptions, VideoLinks } from "./types";

function decodeAttribute(value: string): string {
  return value.replace(
    /&(#x[0-9a-f]+|#\d+|quot|apos|amp|lt|gt);/gi,
    (entity, name: string) => {
      const normalized = name.toLowerCase();
      if (normalized.startsWith("#")) {
        const codePoint = normalized.startsWith("#x")
          ? Number.parseInt(normalized.slice(2), 16)
          : Number.parseInt(normalized.slice(1), 10);
        return codePoint > 0 && codePoint <= 0x10ffff
          ? String.fromCodePoint(codePoint)
          : entity;
      }
      switch (normalized) {
        case "quot":
          return '"';
        case "apos":
          return "'";
        case "amp":
          return "&";
        case "lt":
          return "<";
        case "gt":
          return ">";
        default:
          return entity;
      }
    },
  );
}

/** Парсер источника OK. */
export class OKParser {
  private static _regExpDataOptions =
    /\bdata-options\s*=\s*(?:"([^"]*)"|'([^']*)')/i;
  private static _okUserAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36";

  /** Возвращает варианты HLS для загруженного видео; live и другие провайдеры не поддерживаются. */
  public static async getDirectLinks(
    link: string,
    options: ILinkParserOptions = {},
  ): Promise<VideoLinks | null> {
    const request = createParserRequest(options);
    const headers = { "User-Agent": this._okUserAgent };
    const page = await request(link, { headers });
    const match = this._regExpDataOptions.exec(await page.text());
    const attribute = match?.[1] ?? match?.[2];
    if (!attribute) return null;

    const data: unknown = JSON.parse(decodeAttribute(attribute));
    if (!isRecord(data) || !isRecord(data.flashvars)) return null;
    const rawMetadata = data.flashvars.metadata;
    const metadata: unknown =
      typeof rawMetadata === "string" ? JSON.parse(rawMetadata) : rawMetadata;
    if (!isRecord(metadata)) return null;
    if (metadata.provider !== "UPLOADED_ODKL" || metadata.isLive) return null;
    if (
      typeof metadata.hlsManifestUrl !== "string" ||
      !metadata.hlsManifestUrl.trim()
    )
      return null;

    const url = httpUrl(metadata.hlsManifestUrl, page.url || link);
    return fetchHlsLinks(request, url.href, { headers });
  }
}
