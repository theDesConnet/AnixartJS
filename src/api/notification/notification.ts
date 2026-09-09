import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  IArticleCommentCompact,
  ICollectionCommentCompact,
  ICommonProfileNotification,
  INotificationCountResponse,
  IPageableResponse,
  IProfileArticleNotification,
  IProfileCommentNotification,
  IProfileEpisodeNotification,
  IProfileFriendNotification,
  IProfileRelatedReleaseNotification,
  IReleaseCommentCompact,
  IResponse,
  DeleteNotificationType,
} from "../../models";

export class Notification {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить страницу уведомлений разных типов.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link ICommonProfileNotification}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.notification.all(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async all(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<ICommonProfileNotification>> {
    return (
      await this._client.http.request<
        IPageableResponse<ICommonProfileNotification>
      >({
        path: `/notification/all/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу уведомлений о комментариях к статьям.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница уведомлений — {@link IPageableResponse} с элементами {@link IProfileCommentNotification}; комментарий — {@link IArticleCommentCompact}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.notification.articleComments(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async articleComments(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<
    IPageableResponse<IProfileCommentNotification<IArticleCommentCompact>>
  > {
    return (
      await this._client.http.request<
        IPageableResponse<IProfileCommentNotification<IArticleCommentCompact>>
      >({
        path: `/notification/article/comments/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу уведомлений о статьях.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IProfileArticleNotification}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.notification.articles(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async articles(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IProfileArticleNotification>> {
    return (
      await this._client.http.request<
        IPageableResponse<IProfileArticleNotification>
      >({
        path: `/notification/articles/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу уведомлений о комментариях к коллекциям.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница уведомлений — {@link IPageableResponse} с элементами {@link IProfileCommentNotification}; комментарий — {@link ICollectionCommentCompact}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.notification.collectionComments(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async collectionComments(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<
    IPageableResponse<IProfileCommentNotification<ICollectionCommentCompact>>
  > {
    return (
      await this._client.http.request<
        IPageableResponse<
          IProfileCommentNotification<ICollectionCommentCompact>
        >
      >({
        path: `/notification/collectionComments/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить счётчик уведомлений.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Количество уведомлений — {@link INotificationCountResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.notification.count(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.count);
   */
  public async count(
    options: IRequestOptions = {},
  ): Promise<INotificationCountResponse> {
    return (
      await this._client.http.request<INotificationCountResponse>({
        path: `/notification/count`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Удалить все уведомления.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.notification.deleteAll(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async deleteAll(options: IRequestOptions = {}): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/notification/delete/all`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Удалить уведомление указанного типа.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param notificationId - ID уведомления.
   * @param type - Тип уведомления — {@link DeleteNotificationType}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart, DeleteNotificationType } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const notificationId = 123;
   * const type = DeleteNotificationType.ArticleComment;
   *
   * const result = await client.endpoints.notification.delete(
   *   notificationId,
   *   type,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async delete(
    notificationId: number,
    type: DeleteNotificationType,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/notification/${type}/delete/${notificationId}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу уведомлений о сериях.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IProfileEpisodeNotification}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.notification.episodes(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async episodes(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IProfileEpisodeNotification>> {
    return (
      await this._client.http.request<
        IPageableResponse<IProfileEpisodeNotification>
      >({
        path: `/notification/episodes/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу уведомлений о заявках и дружбе.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IProfileFriendNotification}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.notification.friends(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async friends(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IProfileFriendNotification>> {
    return (
      await this._client.http.request<
        IPageableResponse<IProfileFriendNotification>
      >({
        path: `/notification/friends/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Отметить уведомления прочитанными.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.notification.read(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async read(options: IRequestOptions = {}): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/notification/read`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу уведомлений о связанных релизах.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IProfileRelatedReleaseNotification}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.notification.relatedReleases(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async relatedReleases(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IProfileRelatedReleaseNotification>> {
    return (
      await this._client.http.request<
        IPageableResponse<IProfileRelatedReleaseNotification>
      >({
        path: `/notification/related/release/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу уведомлений о комментариях к релизам.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница уведомлений — {@link IPageableResponse} с элементами {@link IProfileCommentNotification}; комментарий — {@link IReleaseCommentCompact}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.notification.releaseComments(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async releaseComments(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<
    IPageableResponse<IProfileCommentNotification<IReleaseCommentCompact>>
  > {
    return (
      await this._client.http.request<
        IPageableResponse<IProfileCommentNotification<IReleaseCommentCompact>>
      >({
        path: `/notification/releaseComments/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }
}
