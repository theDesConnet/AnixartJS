import { createParserRequest, httpUrl, isRecord, readJsonObject } from "./request";
import type { ILinkParserOptions, VideoLinks } from "./types";

/**
 * Тайтл
 */
export interface AniLibriaAnime {
  id: number;
  type: {
    value: string;
    description: string;
  };
  year: number;
  name: {
    main: string;
    english: string;
    alternative: string;
  };
  alias: string;
  season: {
    value: string;
    description: string;
  };
  poster: {
    src: string;
    preview: string;
    thumbnail: string;
    optimized: {
      src: string;
      preview: string;
      thumbnail: string;
    };
  };
  fresh_at: string;
  created_at: string;
  updated_at: string;
  is_ongoing: boolean;
  age_rating: {
    value: string;
    description: string;
    label: string;
    is_adult: boolean;
  };
  publish_day: {
    value: string;
    description: string;
  };
  description: string;
  notification: unknown;
  episodes_count: number | null;
  external_player: unknown;
  is_in_production: boolean;
  is_blocked_by_geo: boolean;
  is_blocked_by_copyrights: boolean;
  added_in_users_favorites: number;
  average_duration_of_episode: unknown;
  added_in_planned_collection: number;
  added_in_watched_collection: number;
  added_in_watching_collection: number;
  added_in_postponed_collection: number;
  added_in_abandoned_collection: number;
  genres: AniLibriaGenre[];
  members: AniLibriaMember[];
  sponsor: {
    id: string;
    title: string;
    description: string;
    url_title: string;
    url: string;
  };
  episodes: AniLibriaEpisode[];
}

/**
 * Жанр
 */
export interface AniLibriaGenre {
  id: number;
  name: string;
  image: {
    preview: string;
    thumbnail: string;
    optimized: {
      preview: string;
      thumbnail: string;
    };
  };
  total_releases: number;
}

/**
 * Участник Anilibria
 */
export interface AniLibriaMember {
  id: string;
  role: {
    value: string;
    description: string;
  };
  nickname: string;
  user: unknown;
}

/**
 * Эпизод
 */
export interface AniLibriaEpisode {
  id: string;
  name: string | null;
  ordinal: number;
  opening: {
    stop: number | null;
    start: number | null;
  };
  ending: {
    stop: number | null;
    start: number | null;
  };
  preview: {
    src: string;
    preview: string;
    thumbnail: string;
    optimized: {
      src: string;
      preview: string;
      thumbnail: string;
    };
  };
  hls_480: string | null;
  hls_720: string | null;
  hls_1080: string | null;
  duration: number;
  rutube_id: unknown;
  youtube_id: unknown;
  updated_at: string;
  sort_order: number;
  release_id: number;
  name_english: string | null;
}

/**
 * Возвращаемый обьект
 */
export type AniLibriaReturnObject = VideoLinks;

/** Парсер источника AniLibria. */
export class AniLibriaParser {
  private static _baseAniLibriaDomain = "aniliberty.top";
  private static _endpointUrl = "/api/v1/anime/releases";

  /** Возвращает доступные качества серии или null, если серия либо ссылки отсутствуют. */
  public static async getDirectLinks(
    link: string,
    options: ILinkParserOptions = {},
  ): Promise<VideoLinks | null> {
    const params = httpUrl(link).searchParams;
    const id = params.get("id");
    const episode = params.get("ep");
    if (!id || !/^\d+$/.test(id) || !episode || !/^\d+$/.test(episode)) return null;
    const episodeNumber = Number(episode);
    if (!Number.isSafeInteger(episodeNumber) || episodeNumber < 1) return null;

    const request = createParserRequest(options);
    const endpoint = `https://${this._baseAniLibriaDomain}${this._endpointUrl}/${id}`;
    const response = await request(endpoint);
    const body = await readJsonObject(response);
    if (!Array.isArray(body.episodes)) return null;
    const target = body.episodes.find(
      (entry: unknown) => isRecord(entry) && entry.ordinal === episodeNumber,
    );
    if (!isRecord(target)) return null;

    const links: VideoLinks = {};
    for (const quality of ["1080", "720", "480"]) {
      const source = target[`hls_${quality}`];
      if (typeof source !== "string" || !source.trim()) continue;
      links[quality] = [{
        src: httpUrl(source, response.url || endpoint).href,
        type: "application/vnd.apple.mpegurl",
      }];
    }

    return Object.keys(links).length ? links : null;
  }
}
