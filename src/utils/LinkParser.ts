/**
 * Парсер различных источников
 */

import { ChildProcessWithoutNullStreams } from "child_process";

/**
 * KodikParser
 * Парсер источника Kodik
 * Большая часть кода основана на KodikWrapper (https://github.com/thedvxchsquad/kodikwrapper/blob/master/src/video-links.ts)
 */

/**
 * Качество
 */
export type KodikQuality = '240' | '360' | '480' | '720' | '1080' | string;

export interface KodikVideoSource {
    src: string,
    type: string
}

export type KodikVideoLinks = Record<KodikQuality, KodikVideoSource[]>;

export interface KodikVast {
    title_small: string,
    src: string,
    timer?: number,
    hide_interface?: boolean,
    async_load?: boolean,
    vpaid_target_event?: string,
    vpaid_max_load_time?: number,
    vpaid_max_start_time?: number,
    vpaid_start_event?: string,
    vpaid_timer_start_event?: string,
    vpaid_ad_skippable_state?: boolean,
    advert_id?: string,
    save_views?: boolean,
    start_muted?: boolean,
    max_length?: number,
    disable_advert_click?: number,
    send_stat_method?: string,
    stop_timer_on_pause?: boolean,
}

export interface KodikDirectLinkResponse {
    advert_script: string,
    domain: string,
    default: number,
    links: KodikVideoLinks,
    vast: KodikVast[],
    reserve_vast: KodikVast[],
    ip: string
}

export class KodikParser {
    private static _baseKodikDomain = 'kodik.info'
    private static _endpointUrl = '/ftor';

    public static async getLatestLink(url: string): Promise<string | null> {
        const endpointUrlRegex = new RegExp(/url:atob\(\"(?<encodedPath>[^"]+)\"\)/is);
        const appPlayerPathRegex = new RegExp(/src="(?<path>\/assets\/js\/app\.player_single\..*?\.js)"\>/is);

        const playerResponse = await (await fetch(url)).text();
        const appPlayerPath = playerResponse.match(appPlayerPathRegex)?.groups?.path;

        if (!appPlayerPath) return null;

        const appPlayerResponse = await (await fetch(`https://${new URL(url).host}${appPlayerPath}`)).text();
        const latestEndpoint = appPlayerResponse.match(endpointUrlRegex)?.groups?.encodedPath;

        if (!latestEndpoint) return null;

        return atob(latestEndpoint);
    }

    public static async getDirectLinks(url: string, endpointPath: string = this._endpointUrl): Promise<KodikVideoLinks | null> {
        const urlResponse = await (await fetch(url)).text();

        const urlParams = JSON.parse(urlResponse.match(/var\surlParams\s=\s'(?<params>.*?)';/is)?.groups?.params ?? "{}");
        const videoInfoHash = urlResponse.match(/videoInfo.hash\s=\s'(?<hash>.*?)';/is)?.groups?.hash;
        const videoInfoId = urlResponse.match(/videoInfo.id\s=\s'(?<id>.*?)';/is)?.groups?.id;
        const videoInfoType = urlResponse.match(/videoInfo.type\s=\s'(?<type>.*?)';/)?.groups?.type;
        const validKodikUrl = new RegExp(/\/\/(get|cloud)\.kodik-storage\.com\/useruploads\/.*?\/.*?\/(240|360|480|720|1080)\.mp4:hls:manifest.m3u8/s);

        if (!videoInfoHash || !videoInfoId || !videoInfoType) return null;

        const requestBody = {
            ...urlParams,
            type: videoInfoType,
            hash: videoInfoHash,
            id: videoInfoId
        }

        const directLinksResponse = await fetch(`https://${this._baseKodikDomain}${endpointPath}?${new URLSearchParams(requestBody).toString()}`, {
            referrer: '',
            referrerPolicy: "no-referrer"
        })
        if (directLinksResponse.headers.get("content-type") !== "application/json") return null;

        const directLinks: KodikDirectLinkResponse = await directLinksResponse.json();
        const zCharCode = 'Z'.charCodeAt(0);

        for (const [, sources] of Object.entries(directLinks.links)) {
          for (const source of sources) {
            if (validKodikUrl.test(source.src)) continue;

            const decryptedBase64 = source.src.replace(/[a-zA-Z]/g, e => {
                let eCharCode = e.charCodeAt(0);
                return String.fromCharCode((eCharCode <= zCharCode ? 90 : 122) >= (eCharCode = eCharCode + 18) ? eCharCode : eCharCode - 26);
              });
            source.src = atob(decryptedBase64);
          }
        }

        return directLinks.links;
    }
}


/** 
 * AniLibriaParser
 * Парсер источника Libria
 */

/**
 * Тайтл
 */
export interface AniLibriaAnime {
    id: number,
    type: {
        value: string,
        description: string
    },
    year: number,
    name: {
        main: string,
        english: string,
        alternative: string
    },
    alias: string,
    season: {
        value: string,
        description: string
    },
    poster: {
        src: string,
        preview: string,
        thumbnail: string,
        optimized: {
            src: string,
            preview: string,
            thumbnail: string
        }
    },
    fresh_at: string,
    created_at: string,
    updated_at: string,
    is_ongoing: boolean,
    age_rating: {
        value: string,
        description: string,
        label: string,
        is_adult: boolean
    },
    publish_day: {
        value: string,
        description: string
    },
    description: string
    notification: any,
    episodes_count: number | null,
    external_player: any,
    is_in_production: boolean,
    is_blocked_by_geo: boolean,
    is_blocked_by_copyrights: boolean,
    added_in_users_favorites: number,
    average_duration_of_episode: any,
    added_in_planned_collection: number,
    added_in_watched_collection: number,
    added_in_watching_collection: number,
    added_in_postponed_collection: number,
    added_in_abandoned_collection: number,
    genres: AniLibriaGenre[],
    members: AniLibriaMember[],
    sponsor: {
        id: string,
        title: string,
        description: string,
        url_title: string,
        url: string
    },
    episodes: AniLibriaEpisode[]
}

/**
 * Жанр
 */
export interface AniLibriaGenre {
    id: number,
    name: string,
    image: {
        preview: string,
        thumbnail: string,
        optimized: {
            preview: string,
            thumbnail: string
        }
    },
    total_releases: number
}

/**
 * Участник Anilibria
 */
export interface AniLibriaMember {
    id: string,
    role: {
        value: string,
        description: string
    },
    nickname: string,
    user: any
}

/**
 * Эпизод
 */
export interface AniLibriaEpisode {
    id: string,
    name: string | null,
    ordinal: number,
    opening: {
        stop: number | null,
        start: number | null
    },
    ending: {
        stop: number | null,
        start: number | null
    },
    preview: {
        src: string,
        preview: string,
        thumbnail: string,
        optimized: {
            src: string,
            preview: string,
            thumbnail: string
        }
    },
    hls_480: string,
    hls_720: string,
    hls_1080: string,
    duration: number,
    rutube_id: any,
    youtube_id: any,
    updated_at: string,
    sort_order: number,
    release_id: number,
    name_english: string | null
}

/**
 * Возвращаемый обьект
 */
export interface AniLibriaReturnObject {
    [key: string]: {
        src: string
    }
}

/**
 * Класс парсера анилибрии
 */
export class AniLibriaParser {
    private static _baseAniLibriaDomain = 'anilibria.top'
    private static _endpointUrl = '/api/v1/anime/releases'

    public static idPattern = new RegExp(/id=(?<id>\d+)/g);
    public static episodePattern =  new RegExp(/ep=(?<ep>\d+)/g)

    public static async getDirectLinks(link: string): Promise<AniLibriaReturnObject | null> {
        const id = this.idPattern.exec(link)?.groups?.id;
        const episode = this.episodePattern.exec(link)?.groups?.ep;

        const request = await fetch(`https://${this._baseAniLibriaDomain}${this._endpointUrl}/${id}`);

        let body = await request.json() as AniLibriaAnime;

        if (!body || typeof episode != 'string') return null;
        const ep = body.episodes.find(e => e.ordinal == parseInt(episode!)) ?? null;
        
        if (ep) {
            return {
                "1080": {
                    src: ep.hls_1080
                },
                "720": {
                    src: ep.hls_720
                },
                "480": {
                    src: ep.hls_480
                }
            }
        }

        return null;
    }
}

/** 
 * SibnetParser
 * Парсер источника Sibnet
 */
export class SibnetParser {
    private static _baseSibnetDomain = 'video.sibnet.ru';

    public static srcMatch = new RegExp(/src: (".*?")/g);

    public static async getDirectLink(link: string): Promise<string | null> {
        const request = await fetch(link);

        let body = await request.text();
        let match = this.srcMatch.exec(body);

        if (match) {
            const srcRequest = await fetch(`https://${this._baseSibnetDomain}${match[1].replace(/"/g, '')}`, {
                headers: {
                    host: this._baseSibnetDomain,
                    referer: link
                }
            });

            return srcRequest.url ?? null;
        }

        return null;
    }
}
