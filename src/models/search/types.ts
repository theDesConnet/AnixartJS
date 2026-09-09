import { IArticle, IChannel, IPageableResponse, IRelated, IRelease, IResponse } from "../";

export interface IArticlesSearchRequest {
  channel_id: number;
  query: string;
}

export interface IChannelsSearchRequest {
  query?: string | null;
  permission?: number | null;
  is_blog?: boolean | null;
  is_subscribed?: boolean | null;
}

export interface ISearchRequest {
  query: string;
  searchBy?: number;
}

/** Ответ поиска релизов API v2, без счётчиков пагинации. */
export interface IReleaseSearchResponse extends IResponse {
  related: IRelated | null;
  releases: IRelease[];
}

export interface IFeedSearchResponse extends IResponse {
  tags: IPageableResponse<string> | null;
  channels: IPageableResponse<IChannel> | null;
  blogs: IPageableResponse<IChannel> | null;
  articles: IPageableResponse<IArticle> | null;
}
