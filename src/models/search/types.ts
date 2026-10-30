/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

import { IArticle, IChannel, IPageableResponse, IRelated, IRelease, IResponse } from "../";

/** Поиск статей внутри канала. */
export interface IArticlesSearchRequest {
  channel_id: number;
  query: string;
}

/** Поиск каналов с фильтрами по правам и подписке. */
export interface IChannelsSearchRequest {
  query?: string | null;
  permission?: number | null;
  is_blog?: boolean | null;
  is_subscribed?: boolean | null;
}

/** Поисковая строка и режим поиска. */
export interface ISearchRequest {
  query: string;
  searchBy?: number;
}

/** Ответ поиска релизов API v2, без счётчиков пагинации. */
export interface IReleaseSearchResponse extends IResponse {
  related: IRelated | null;
  releases: IRelease[];
}

/** Результаты поиска по ленте, разбитые по категориям. */
export interface IFeedSearchResponse extends IResponse {
  tags: IPageableResponse<string> | null;
  channels: IPageableResponse<IChannel> | null;
  blogs: IPageableResponse<IChannel> | null;
  articles: IPageableResponse<IArticle> | null;
}
