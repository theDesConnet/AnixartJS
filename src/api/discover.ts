/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

import type { IRequestOptions } from "../core/http/httpTypes";
import { Anixart } from "../core/anixartClient";
import {
  IDiscoverHubResponse,
  IInteresting,
  IPageableResponse,
  IRelease,
  IReleaseComment,
} from "../models";

export class Discover {
  public constructor(private readonly _client: Anixart) { }

  /**
   * Объединённая страница рекомендаций.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param recommendationsPreviousPage - Предыдущая страница рекомендаций По умолчанию: -1.
   * @param collectionsPreviousPage - Предыдущая страница коллекций (по умолчанию: -1)
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Объединённые рекомендации, коллекции и данные пагинации — {@link IDiscoverHubResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const result = await client.endpoints.discover.hub(
   *   -1,
   *   -1,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result);
   */
  public async hub(
    recommendationsPreviousPage: number = -1,
    collectionsPreviousPage: number = -1,
    options: IRequestOptions = {},
  ): Promise<IDiscoverHubResponse> {
    return (
      await this._client.http.request<IDiscoverHubResponse>({
        path: "/discover/hub",
        method: "GET",
        auth: {
          type: "Anixart"
        },
        query: {
          recommendations_previous_page: recommendationsPreviousPage,
          collections_previous_page: collectionsPreviousPage
        },
        ...options,
      })
    ).data;
  }

  /**
   * @deprecated В Anixart v11.3 (Beta) данный метод был убран.
   * 
   * Получить популярные комментарии к релизам.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IReleaseComment}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const result = await client.endpoints.discover.commentsWeek(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async commentsWeek(
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IReleaseComment>> {
    return (
      await this._client.http.request<IPageableResponse<IReleaseComment>>({
        path: "/discover/comments",
        method: "POST",
        ...options,
      })
    ).data;
  }

  /**
   * @deprecated В Anixart v11.3 (Beta) данный метод был убран.
   * 
   * Получить наиболее обсуждаемые релизы.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IRelease}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.discover.discussing(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async discussing(
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IRelease>> {
    return (
      await this._client.http.request<IPageableResponse<IRelease>>({
        path: "/discover/discussing",
        method: "POST",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * @deprecated В Anixart v11.3 (Beta) данный метод был убран.
   * 
   * Получить элементы раздела «Интересное».
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IInteresting}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const result = await client.endpoints.discover.interesting(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async interesting(
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IInteresting>> {
    return (
      await this._client.http.request<IPageableResponse<IInteresting>>({
        path: "/discover/interesting",
        method: "POST",
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу персональных рекомендаций релизов.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IRelease}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.discover.recommendations(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async recommendations(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IRelease>> {
    return (
      await this._client.http.request<IPageableResponse<IRelease>>({
        path: `/discover/recommendations/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        query: {
          previous_page: page == 0 ? 0 : page - 1,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу релизов, которые сейчас смотрят.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IRelease}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.discover.watching(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async watching(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IRelease>> {
    return (
      await this._client.http.request<IPageableResponse<IRelease>>({
        path: `/discover/watching/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }
}
