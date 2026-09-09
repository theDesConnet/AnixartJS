import type { CommonResult } from "../models";
import type { IRequestOptions } from "../core/http/httpTypes";
import { Anixart } from "../core/anixartClient";
import { IArticle, ILatestArticleResponse, IPageableResponse } from "../models";

export class Feed {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить страницу статей ленты.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param channelId - ID канала. Необязательный параметр.
   * @param date - Дата для фильтрации ленты. По умолчанию отправляется 0: без параметра сервер возвращает пустой ответ.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IArticle}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.feed.get(
   *   page,
   *   undefined,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async get(
    page: number = 0,
    channelId?: number,
    date: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IArticle>> {
    return (
      await this._client.http.request<IPageableResponse<IArticle>>({
        path: `/feed/all/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          channel_id: channelId,
          date: date,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить ID последней статьи ленты.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns ID последней статьи — {@link ILatestArticleResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.feed.latestArticle(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.articleId);
   */
  public async latestArticle(options: IRequestOptions = {}): Promise<ILatestArticleResponse> {
    return (
      await this._client.http.request<ILatestArticleResponse>({
        path: "/feed/latest",
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу последних опубликованных статей.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IArticle}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.feed.latestArticles(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async latestArticles(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IArticle>> {
    return (
      await this._client.http.request<IPageableResponse<IArticle>>({
        path: `/feed/latest/all/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }
}
