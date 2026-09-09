import type { CommonResult } from "../../models";
import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  ArticleCreateEditResult,
  ArticleDeleteResult,
  ArticleEditPinnedResult,
  ArticleMuteResult,
  ArticleResult,
  EmbedType,
  IArticle,
  IArticleCreateEditRequest,
  IArticleEmbedResponse,
  IArticleEventRequest,
  IArticleResponse,
  IArticleUploadFileResponse,
  IPageableResponse,
  IProfile,
  IResponse,
  VoteType,
} from "../../models";

export class Article {
  public constructor(private readonly _client: Anixart) {}

  private generateTempFileName(): string {
    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 15);

    return `temp_file_${timestamp}.jpg`;
  }

  /**
   * Получить статью по ID.
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
   * const result = await client.endpoints.article.get(
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
        path: `/article/${articleId}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: ArticleResult,
        ...options,
      })
    ).data;
  }

  /**
   * Создать статью в канале.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ArticleCreateEditResult}.
   *
   * @param channelId - ID канала.
   * @param data - Данные запроса — {@link IArticleCreateEditRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Статья — {@link IArticleResponse} с кодами {@link ArticleCreateEditResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IArticleCreateEditRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   * const article: IArticleCreateEditRequest = {
   *   is_signed: true,
   *   repost_article_id: null,
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
   * const result = await client.endpoints.article.create(
   *   channelId,
   *   article,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result);
   */
  public async create(
    channelId: number,
    data: IArticleCreateEditRequest,
    options: IRequestOptions = {},
  ): Promise<IArticleResponse<ArticleCreateEditResult>> {
    return (
      await this._client.http.request<
        IArticleResponse<ArticleCreateEditResult>
      >({
        path: `/article/create/${channelId}`,
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
   * Удалить статью.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ArticleDeleteResult}.
   *
   * @param articleId - ID статьи.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link ArticleDeleteResult}.
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
   * const result = await client.endpoints.article.delete(
   *   articleId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async delete(
    articleId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse<ArticleDeleteResult>> {
    return (
      await this._client.http.request<IResponse<ArticleDeleteResult>>({
        path: `/article/delete/${articleId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ArticleDeleteResult,
        ...options,
      })
    ).data;
  }

  /**
   * Изменить содержимое статьи.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ArticleCreateEditResult}.
   *
   * @param articleId - ID статьи.
   * @param data - Данные запроса — {@link IArticleCreateEditRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Статья — {@link IArticleResponse} с кодами {@link ArticleCreateEditResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IArticleCreateEditRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const articleId = 123;
   * const article: IArticleCreateEditRequest = {
   *   is_signed: true,
   *   repost_article_id: null,
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
   * const result = await client.endpoints.article.edit(
   *   articleId,
   *   article,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result);
   */
  public async edit(
    articleId: number,
    data: IArticleCreateEditRequest,
    options: IRequestOptions = {},
  ): Promise<IArticleResponse<ArticleCreateEditResult>> {
    return (
      await this._client.http.request<
        IArticleResponse<ArticleCreateEditResult>
      >({
        path: `/article/edit/${articleId}`,
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
   * Закрепить статью в канале или снять закрепление.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ArticleEditPinnedResult}.
   *
   * @param articleId - ID статьи.
   * @param isPinned - Закрепить статью при true, снять закрепление при false.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link ArticleEditPinnedResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const articleId = 123;
   * const isPinned = false;
   *
   * const result = await client.endpoints.article.editIsPinned(
   *   articleId,
   *   isPinned,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async editIsPinned(
    articleId: number,
    isPinned: boolean,
    options: IRequestOptions = {},
  ): Promise<IResponse<ArticleEditPinnedResult>> {
    return (
      await this._client.http.request<IResponse<ArticleEditPinnedResult>>({
        path: `/article/edit/pinned/${articleId}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: ArticleEditPinnedResult,
        query: {
          is_pinned: isPinned,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Отправить событие просмотра, открытия или чтения статей.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param data - Данные запроса — {@link IArticleEventRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @example
   * import { Anixart, ArticleEventType, ArticleEventEntryPoint } from "anixartjs";
   * import type { IArticleEventRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const event: IArticleEventRequest = {
   *   type: ArticleEventType.View,
   *   entry_point: ArticleEventEntryPoint.Unknown,
   *   articles: [123],
   * };
   *
   * const result = await client.endpoints.article.event(
   *   event,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async event(
    data: IArticleEventRequest,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/article/event`,
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
   * Скрыть статью.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ArticleMuteResult}.
   *
   * @param articleId - ID статьи.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link ArticleMuteResult}.
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
   * const result = await client.endpoints.article.mute(
   *   articleId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async mute(
    articleId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse<ArticleMuteResult>> {
    return (
      await this._client.http.request<IResponse<ArticleMuteResult>>({
        path: `/article/mute/${articleId}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: ArticleMuteResult,
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу репостов статьи.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param articleId - ID статьи.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param sort - Порядок сортировки.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IArticle}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const articleId = 123;
   * const page = 0;
   * const sort = 0;
   *
   * const result = await client.endpoints.article.reposts(
   *   articleId,
   *   page,
   *   sort,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async reposts(
    articleId: number,
    page: number = 0,
    sort: number,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IArticle>> {
    return (
      await this._client.http.request<IPageableResponse<IArticle>>({
        path: `/article/reposts/${articleId}/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          sort: sort,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Отменить скрытие статьи.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ArticleMuteResult}.
   *
   * @param articleId - ID статьи.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link ArticleMuteResult}.
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
   * const result = await client.endpoints.article.unmute(
   *   articleId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async unmute(
    articleId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse<ArticleMuteResult>> {
    return (
      await this._client.http.request<IResponse<ArticleMuteResult>>({
        path: `/article/unmute/${articleId}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: ArticleMuteResult,
        ...options,
      })
    ).data;
  }

  /**
   * Оценить статью.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param articleId - ID статьи.
   * @param vote - Оценка комментария или статьи — {@link VoteType}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart, VoteType } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const articleId = 123;
   * const vote = VoteType.Like;
   *
   * const result = await client.endpoints.article.vote(
   *   articleId,
   *   vote,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async vote(
    articleId: number,
    vote: VoteType,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/article/vote/${articleId}/${vote}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу профилей, оценивших статью.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param articleId - ID статьи.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param sort - Порядок сортировки. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IProfile}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const articleId = 123;
   * const page = 0;
   * const sort = 0;
   *
   * const result = await client.endpoints.article.votes(
   *   articleId,
   *   page,
   *   sort,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async votes(
    articleId: number,
    page: number = 0,
    sort: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IProfile>> {
    return (
      await this._client.http.request<IPageableResponse<IProfile>>({
        path: `/article/votes/${articleId}/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        query: {
          sort: sort,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Загрузить изображение для содержимого статьи.
   *
   * Авторизация: Bearer-токен редактора.
   *
   * @param mediaToken - Токен загрузки медиа, полученный через channel.editorAvaliable(). Это не токен аккаунта.
   * @param file - Содержимое изображения в Buffer.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Результат загрузки и данные файла — {@link IArticleUploadFileResponse}.
   *
   * @remarks
   * Используется отдельный media_upload_token редактора, а не токен аккаунта.
   *
   * @example
   * import { readFile } from "node:fs/promises";
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const mediaToken = "MEDIA_UPLOAD_TOKEN";
   * const file = await readFile("./cover.jpg");
   *
   * const result = await client.endpoints.article.uploadArticleImage(
   *   mediaToken,
   *   file,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result);
   */
  public async uploadArticleImage(
    mediaToken: string,
    file: Buffer,
    options: IRequestOptions = {},
  ): Promise<IArticleUploadFileResponse> {
    return (
      await this._client.http.request<IArticleUploadFileResponse>({
        path: "/content/upload",
        method: "POST",
        body: {
          type: "Image",
          data: {
            name: this.generateTempFileName(),
            file,
            type: "file",
          },
        },
        auth: {
          type: "Bearer",
          token: mediaToken,
        },
        customBaseUrl: "https://editor.anixsekai.com",
        ...options,
      })
    ).data;
  }

  /**
   * Получить данные для вставки внешней ссылки в статью.
   *
   * Авторизация: Bearer-токен редактора.
   *
   * @param type - Тип вставки: youtube, vk или link.
   * @param mediaToken - Токен загрузки медиа, полученный через channel.editorAvaliable(). Это не токен аккаунта.
   * @param link - URL внешнего ресурса для вставки в статью.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Данные для встраивания внешнего ресурса — {@link IArticleEmbedResponse}.
   *
   * @remarks
   * Используется отдельный media_upload_token редактора, а не токен аккаунта.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const type = "link";
   * const mediaToken = "MEDIA_UPLOAD_TOKEN";
   * const link = "https://example.com/article";
   *
   * const result = await client.endpoints.article.generateEmbedData(
   *   type,
   *   mediaToken,
   *   link,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result);
   */
  public async generateEmbedData(
    type: EmbedType,
    mediaToken: string,
    link: string,
    options: IRequestOptions = {},
  ): Promise<IArticleEmbedResponse> {
    const result = (
      await this._client.http.request<IArticleEmbedResponse>({
        path: `/embed/${type}`,
        method: "GET",
        query: {
          url: link,
        },
        auth: {
          type: "Bearer",
          token: mediaToken,
        },
        customBaseUrl: "https://editor.anixsekai.com",
        ...options,
      })
    ).data;

    result.url = link;

    return result;
  }
}
