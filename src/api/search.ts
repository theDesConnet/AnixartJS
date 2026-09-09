import type { CommonResult } from "../models";
import type { IRequestOptions } from "../core/http/httpTypes";
import { Anixart } from "../core/anixartClient";
import {
  BookmarkType,
  IArticle,
  IArticlesSearchRequest,
  IChannel,
  IChannelProfile,
  IChannelsSearchRequest,
  ICollection,
  IFeedSearchResponse,
  IPageableResponse,
  IProfile,
  IRelease,
  IReleaseSearchResponse,
  ISearchRequest,
} from "../models";

export class Search {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Найти статьи в канале.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param data - Данные запроса — {@link IArticlesSearchRequest}.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IArticle}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IArticlesSearchRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const search: IArticlesSearchRequest = {
   *   channel_id: 456,
   *   query: "приключения",
   * };
   * const page = 0;
   *
   * const result = await client.endpoints.search.articles(
   *   search,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async articles(
    data: IArticlesSearchRequest,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IArticle>> {
    return (
      await this._client.http.request<IPageableResponse<IArticle>>({
        path: `/search/articles/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Найти каналы с учётом фильтров.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param data - Данные запроса — {@link IChannelsSearchRequest}.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IChannel}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IChannelsSearchRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const search: IChannelsSearchRequest = {
   *   query: "аниме",
   *   is_blog: false,
   *   is_subscribed: false,
   * };
   * const page = 0;
   *
   * const result = await client.endpoints.search.channels(
   *   search,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async channels(
    data: IChannelsSearchRequest,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IChannel>> {
    return (
      await this._client.http.request<IPageableResponse<IChannel>>({
        path: `/search/channels/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Найти подписчиков канала.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param channelId - ID канала.
   * @param data - Данные запроса — {@link ISearchRequest}.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IChannelProfile}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ISearchRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   * const search: ISearchRequest = {
   *   query: "приключения",
   * };
   * const page = 0;
   *
   * const result = await client.endpoints.search.channelSubscribers(
   *   channelId,
   *   search,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async channelSubscribers(
    channelId: number,
    data: ISearchRequest,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IChannelProfile>> {
    return (
      await this._client.http.request<IPageableResponse<IChannelProfile>>({
        path: `/search/channel/${channelId}/subscribers/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Найти коллекции.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param data - Данные запроса — {@link ISearchRequest}.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link ICollection}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ISearchRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const search: ISearchRequest = {
   *   query: "приключения",
   * };
   * const page = 0;
   *
   * const result = await client.endpoints.search.collections(
   *   search,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async collections(
    data: ISearchRequest,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<ICollection>> {
    return (
      await this._client.http.request<IPageableResponse<ICollection>>({
        path: `/search/collections/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Найти коллекции среди избранных.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param data - Данные запроса — {@link ISearchRequest}.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link ICollection}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ISearchRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const search: ISearchRequest = {
   *   query: "приключения",
   * };
   * const page = 0;
   *
   * const result = await client.endpoints.search.favoriteCollections(
   *   search,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async favoriteCollections(
    data: ISearchRequest,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<ICollection>> {
    return (
      await this._client.http.request<IPageableResponse<ICollection>>({
        path: `/search/favoriteCollections/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Найти релизы среди избранных.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param data - Данные запроса — {@link ISearchRequest}.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IRelease}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ISearchRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const search: ISearchRequest = {
   *   query: "приключения",
   * };
   * const page = 0;
   *
   * const result = await client.endpoints.search.favorites(
   *   search,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async favorites(
    data: ISearchRequest,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IRelease>> {
    return (
      await this._client.http.request<IPageableResponse<IRelease>>({
        path: `/search/favorites/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Выполнить поиск по ленте.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param data - Данные запроса — {@link ISearchRequest}.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Найденные теги, каналы, блоги и статьи — {@link IFeedSearchResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ISearchRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const search: ISearchRequest = {
   *   query: "приключения",
   * };
   * const page = 0;
   *
   * const result = await client.endpoints.search.feed(
   *   search,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.tags);
   */
  public async feed(
    data: ISearchRequest,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IFeedSearchResponse> {
    return (
      await this._client.http.request<IFeedSearchResponse>({
        path: `/search/feed/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Найти релизы в истории просмотра.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param data - Данные запроса — {@link ISearchRequest}.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IRelease}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ISearchRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const search: ISearchRequest = {
   *   query: "приключения",
   * };
   * const page = 0;
   *
   * const result = await client.endpoints.search.history(
   *   search,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async history(
    data: ISearchRequest,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IRelease>> {
    return (
      await this._client.http.request<IPageableResponse<IRelease>>({
        path: `/search/history/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Найти коллекции указанного профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param profileId - ID профиля.
   * @param data - Данные запроса — {@link ISearchRequest}.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param releaseId - ID релиза. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link ICollection}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ISearchRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const profileId = 123;
   * const search: ISearchRequest = {
   *   query: "приключения",
   * };
   * const page = 0;
   *
   * const result = await client.endpoints.search.profileCollections(
   *   profileId,
   *   search,
   *   page,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async profileCollections(
    profileId: number,
    data: ISearchRequest,
    page: number = 0,
    releaseId?: number,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<ICollection>> {
    return (
      await this._client.http.request<IPageableResponse<ICollection>>({
        path: `/search/profileCollections/${profileId}/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        query: {
          release_id: releaseId,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Найти релизы в выбранном списке закладок.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param status - Список закладок — {@link BookmarkType}.
   * @param data - Данные запроса — {@link ISearchRequest}.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IRelease}.
   *
   * @example
   * import { Anixart, BookmarkType } from "anixartjs";
   * import type { ISearchRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const status = BookmarkType.Watching;
   * const search: ISearchRequest = {
   *   query: "приключения",
   * };
   * const page = 0;
   *
   * const result = await client.endpoints.search.profileList(
   *   status,
   *   search,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async profileList(
    status: BookmarkType,
    data: ISearchRequest,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IRelease>> {
    return (
      await this._client.http.request<IPageableResponse<IRelease>>({
        path: `/search/profile/list/${status}/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Найти профили.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param data - Данные запроса — {@link ISearchRequest}.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IProfile}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ISearchRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const search: ISearchRequest = {
   *   query: "приключения",
   * };
   * const page = 0;
   *
   * const result = await client.endpoints.search.profiles(
   *   search,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async profiles(
    data: ISearchRequest,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IProfile>> {
    return (
      await this._client.http.request<IPageableResponse<IProfile>>({
        path: `/search/profiles/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Найти релизы.
   *
   * Токен клиента передаётся в query, если задан.
   * По умолчанию используется API v2: releases и related. API v1 возвращает content и счётчики страниц.
   *
   * @param data - Данные запроса — {@link ISearchRequest}.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Результаты API v2 — {@link IReleaseSearchResponse}; для API v1 — {@link IPageableResponse} с элементами {@link IRelease}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ISearchRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const search: ISearchRequest = {
   *   query: "приключения",
   * };
   * const page = 0;
   *
   * const result = await client.endpoints.search.releases(
   *   search,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log("releases" in result ? result.releases : result.content);
   */
  public async releases(
    data: ISearchRequest,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IReleaseSearchResponse | IPageableResponse<IRelease>> {
    return (
      await this._client.http.request<IReleaseSearchResponse | IPageableResponse<IRelease>>({
        path: `/search/releases/${page}`,
        method: "POST",
        apiVersion: 2,
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }
}
