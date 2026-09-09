import type { CommonResult } from "../../models";
import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  CommentAddResult,
  CommentDeleteResult,
  CommentEditResult,
  ICommonCommentAddRequest,
  ICommonCommentAddResponse,
  ICommonCommentEditRequest,
  IPageableResponse,
  IProfile,
  IReleaseComment,
  IResponse,
  VoteType,
} from "../../models";

export class ReleaseComment {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Добавить комментарий к релизу.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link CommentAddResult}.
   *
   * @param releaseId - ID релиза.
   * @param data - Данные запроса — {@link ICommonCommentAddRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Добавленный комментарий — {@link ICommonCommentAddResponse} с комментарием типа {@link IReleaseComment}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ICommonCommentAddRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const releaseId = 123;
   * const comment: ICommonCommentAddRequest = {
   *   message: "Мне понравилась эта серия!",
   *   spoiler: false,
   * };
   *
   * const result = await client.endpoints.releaseComment.add(
   *   releaseId,
   *   comment,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.comment);
   */
  public async add(
    releaseId: number,
    data: ICommonCommentAddRequest,
    options: IRequestOptions = {},
  ): Promise<ICommonCommentAddResponse<IReleaseComment>> {
    return (
      await this._client.http.request<
        ICommonCommentAddResponse<IReleaseComment>
      >({
        path: `/release/comment/add/${releaseId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: CommentAddResult,
        body: {
          type: "JSON",
          data: {
            parentCommentId: data.parentCommentId ?? null,
            replyToProfileId: data.replyToProfileId ?? null,
            ...data,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить комментарий по ID.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param commentId - ID комментария.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Комментарий к релизу — {@link IReleaseComment}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const commentId = 123;
   *
   * const result = await client.endpoints.releaseComment.get(
   *   commentId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result);
   */
  public async get(
    commentId: number,
    options: IRequestOptions = {},
  ): Promise<IReleaseComment> {
    return (
      await this._client.http.request<IReleaseComment>({
        path: `/release/comment/${commentId}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу комментариев релиза.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param releaseId - ID релиза.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param sort - Порядок сортировки. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IReleaseComment}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const releaseId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.releaseComment.all(
   *   releaseId,
   *   page,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async all(
    releaseId: number,
    page: number = 0,
    sort?: number,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IReleaseComment>> {
    return (
      await this._client.http.request<IPageableResponse<IReleaseComment>>({
        path: `/release/comment/all/${releaseId}/${page}`,
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
   * Удалить свой комментарий.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link CommentDeleteResult}.
   *
   * @param commentId - ID комментария.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link CommentDeleteResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const commentId = 123;
   *
   * const result = await client.endpoints.releaseComment.delete(
   *   commentId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async delete(
    commentId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse<CommentDeleteResult>> {
    return (
      await this._client.http.request<IResponse<CommentDeleteResult>>({
        path: `/release/comment/delete/${commentId}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: CommentDeleteResult,
        ...options,
      })
    ).data;
  }

  /**
   * Изменить свой комментарий.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link CommentEditResult}.
   *
   * @param commentId - ID комментария.
   * @param data - Данные запроса — {@link ICommonCommentEditRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link CommentEditResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ICommonCommentEditRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const commentId = 123;
   * const comment: ICommonCommentEditRequest = {
   *   message: "Мне понравилась эта серия!",
   *   spoiler: false,
   * };
   *
   * const result = await client.endpoints.releaseComment.edit(
   *   commentId,
   *   comment,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async edit(
    commentId: number,
    data: ICommonCommentEditRequest,
    options: IRequestOptions = {},
  ): Promise<IResponse<CommentEditResult>> {
    return (
      await this._client.http.request<IResponse<CommentEditResult>>({
        path: `/release/comment/edit/${commentId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: CommentEditResult,
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу комментариев профиля к релизам.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param profileId - ID профиля.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param sort - Порядок сортировки. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IReleaseComment}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const profileId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.releaseComment.profileComments(
   *   profileId,
   *   page,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async profileComments(
    profileId: number,
    page: number = 0,
    sort?: number,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IReleaseComment>> {
    return (
      await this._client.http.request<IPageableResponse<IReleaseComment>>({
        path: `/release/comment/all/profile/${profileId}/${page}`,
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
   * Получить страницу ответов на комментарий.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param commentId - ID комментария.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param sort - Порядок сортировки. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IReleaseComment}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const commentId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.releaseComment.replies(
   *   commentId,
   *   page,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async replies(
    commentId: number,
    page: number = 0,
    sort?: number,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IReleaseComment>> {
    return (
      await this._client.http.request<IPageableResponse<IReleaseComment>>({
        path: `/release/comment/replies/${commentId}/${page}`,
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
   * Оценить комментарий.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param commentId - ID комментария.
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
   * const commentId = 123;
   * const vote = VoteType.Like;
   *
   * const result = await client.endpoints.releaseComment.vote(
   *   commentId,
   *   vote,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async vote(
    commentId: number,
    vote: VoteType,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/release/comment/vote/${commentId}/${vote}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу профилей, оценивших комментарий.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param commentId - ID комментария.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param sort - Порядок сортировки. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IProfile}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const commentId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.releaseComment.votes(
   *   commentId,
   *   page,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async votes(
    commentId: number,
    page: number = 0,
    sort?: number,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IProfile>> {
    return (
      await this._client.http.request<IPageableResponse<IProfile>>({
        path: `/release/comment/votes/${commentId}/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          sort: sort,
        },
        ...options,
      })
    ).data;
  }
}
