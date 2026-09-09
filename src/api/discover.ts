import type { CommonResult } from "../models";
import type { IRequestOptions } from "../core/http/httpTypes";
import { Anixart } from "../core/anixartClient";
import {
  IInteresting,
  IPageableResponse,
  IRelease,
  IReleaseComment,
} from "../models";

export class Discover {
  public constructor(private readonly _client: Anixart) {}

  /**
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
