import type { CommonResult } from "../../models";
import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  ArticleCreateEditResult,
  ArticleResult,
  ArticleSuggestionDeleteResult,
  IArticle,
  IArticleResponse,
  IArticleSuggestionCreateEditRequest,
  IPageableResponse,
  IResponse,
} from "../../models";

export class ArticleSuggestion {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить предложенную статью по ID.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ArticleResult}.
   *
   * @param articleId - ID статьи.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Статья — {@link IArticleResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const articleId = 123;
   *
   * const result = await client.endpoints.articleSuggestion.get(
   *   articleId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.article);
   */
  public async get(
    articleId: number,
    options: IRequestOptions = {},
  ): Promise<IArticleResponse> {
    return (
      await this._client.http.request<IArticleResponse>({
        path: `/article/suggestion/${articleId}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: ArticleResult,
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу предложенных статей канала.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param channelId - ID канала.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IArticle}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.articleSuggestion.all(
   *   channelId,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async all(
    channelId: number,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IArticle>> {
    return (
      await this._client.http.request<IPageableResponse<IArticle>>({
        path: `/article/suggestion/all/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: {
            channel_id: channelId,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Предложить статью для публикации в канале.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ArticleCreateEditResult}.
   *
   * @param channelId - ID канала.
   * @param data - Данные запроса — {@link IArticleSuggestionCreateEditRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Статья — {@link IArticleResponse} с кодами {@link ArticleCreateEditResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IArticleSuggestionCreateEditRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   * const suggestion: IArticleSuggestionCreateEditRequest = {
   *   is_signed: true,
   *   payload: {
   *     time: Date.now(),
   *     version: "2.0.0",
   *     blocks: [
   *       {
   *         id: "intro",
   *         type: "paragraph",
   *         name: "paragraph",
   *         data: { text: "Привет!", text_length: 7 },
   *       },
   *     ],
   *     block_count: 1,
   *   },
   * };
   *
   * const result = await client.endpoints.articleSuggestion.create(
   *   channelId,
   *   suggestion,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result);
   */
  public async create(
    channelId: number,
    data: IArticleSuggestionCreateEditRequest,
    options: IRequestOptions = {},
  ): Promise<IArticleResponse<ArticleCreateEditResult>> {
    return (
      await this._client.http.request<
        IArticleResponse<ArticleCreateEditResult>
      >({
        path: `/article/suggestion/create/${channelId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ArticleCreateEditResult,
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Удалить предложенную статью.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ArticleSuggestionDeleteResult}.
   *
   * @param articleId - ID статьи.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link ArticleSuggestionDeleteResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const articleId = 123;
   *
   * const result = await client.endpoints.articleSuggestion.delete(
   *   articleId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async delete(
    articleId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse<ArticleSuggestionDeleteResult>> {
    return (
      await this._client.http.request<IResponse<ArticleSuggestionDeleteResult>>(
        {
          path: `/article/suggestion/delete/${articleId}`,
          method: "POST",
          auth: { type: "Anixart" },
          resultEnum: ArticleSuggestionDeleteResult,
          ...options,
        },
      )
    ).data;
  }

  /**
   * Изменить предложенную статью.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ArticleCreateEditResult}.
   *
   * @param articleId - ID статьи.
   * @param data - Данные запроса — {@link IArticleSuggestionCreateEditRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Статья — {@link IArticleResponse} с кодами {@link ArticleCreateEditResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IArticleSuggestionCreateEditRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const articleId = 123;
   * const suggestion: IArticleSuggestionCreateEditRequest = {
   *   is_signed: true,
   *   payload: {
   *     time: Date.now(),
   *     version: "2.0.0",
   *     blocks: [
   *       {
   *         id: "intro",
   *         type: "paragraph",
   *         name: "paragraph",
   *         data: { text: "Привет!", text_length: 7 },
   *       },
   *     ],
   *     block_count: 1,
   *   },
   * };
   *
   * const result = await client.endpoints.articleSuggestion.edit(
   *   articleId,
   *   suggestion,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result);
   */
  public async edit(
    articleId: number,
    data: IArticleSuggestionCreateEditRequest,
    options: IRequestOptions = {},
  ): Promise<IArticleResponse<ArticleCreateEditResult>> {
    return (
      await this._client.http.request<
        IArticleResponse<ArticleCreateEditResult>
      >({
        path: `/article/suggestion/edit/${articleId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ArticleCreateEditResult,
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Опубликовать предложенную статью.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ArticleCreateEditResult}.
   *
   * @param articleId - ID статьи.
   * @param isSigned - Публиковать статью с подписью автора.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Статья — {@link IArticleResponse} с кодами {@link ArticleCreateEditResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const articleId = 123;
   * const isSigned = false;
   *
   * const result = await client.endpoints.articleSuggestion.publish(
   *   articleId,
   *   isSigned,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result);
   */
  public async publish(
    articleId: number,
    isSigned: boolean,
    options: IRequestOptions = {},
  ): Promise<IArticleResponse<ArticleCreateEditResult>> {
    return (
      await this._client.http.request<
        IArticleResponse<ArticleCreateEditResult>
      >({
        path: `/article/suggestion/publish/${articleId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ArticleCreateEditResult,
        query: {
          is_signed: isSigned,
        },
        ...options,
      })
    ).data;
  }
}
