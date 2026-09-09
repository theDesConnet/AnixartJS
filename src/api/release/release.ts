import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  BookmarkType,
  IReleaseResponse,
  IReleaseVote,
  IResponse,
} from "../../models";

export class Release {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить релиз по ID.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param releaseId - ID релиза.
   * @param extendedMode - Запрашивать расширенные данные релиза. По умолчанию: true.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Релиз — {@link IReleaseResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const releaseId = 123;
   * const extendedMode = true;
   *
   * const result = await client.endpoints.release.get(
   *   releaseId,
   *   extendedMode,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.release);
   */
  public async get(
    releaseId: number,
    extendedMode: boolean = true,
    options: IRequestOptions = {},
  ): Promise<IReleaseResponse> {
    return (
      await this._client.http.request<IReleaseResponse>({
        path: `/release/${releaseId}`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          extended_mode: extendedMode,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить случайный релиз.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param extendedMode - Запрашивать расширенные данные релиза. По умолчанию: true.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Релиз — {@link IReleaseResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const extendedMode = true;
   *
   * const result = await client.endpoints.release.random(
   *   extendedMode,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.release);
   */
  public async random(
    extendedMode: boolean = true,
    options: IRequestOptions = {},
  ): Promise<IReleaseResponse> {
    return (
      await this._client.http.request<IReleaseResponse>({
        path: `/release/random`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          extended_mode: extendedMode,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить случайный релиз из коллекции.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param collectionId - ID коллекции.
   * @param extendedMode - Запрашивать расширенные данные релиза. По умолчанию: true.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Релиз — {@link IReleaseResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const collectionId = 123;
   * const extendedMode = true;
   *
   * const result = await client.endpoints.release.randomCollection(
   *   collectionId,
   *   extendedMode,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.release);
   */
  public async randomCollection(
    collectionId: number,
    extendedMode: boolean = true,
    options: IRequestOptions = {},
  ): Promise<IReleaseResponse> {
    return (
      await this._client.http.request<IReleaseResponse>({
        path: `/release/collection/${collectionId}/random`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          extended_mode: extendedMode,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить случайный релиз из избранного.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param extendedMode - Запрашивать расширенные данные релиза. По умолчанию: true.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Релиз — {@link IReleaseResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const extendedMode = true;
   *
   * const result = await client.endpoints.release.randomFavorite(
   *   extendedMode,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.release);
   */
  public async randomFavorite(
    extendedMode: boolean = true,
    options: IRequestOptions = {},
  ): Promise<IReleaseResponse> {
    return (
      await this._client.http.request<IReleaseResponse>({
        path: `/release/random/favorite`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          extended_mode: extendedMode,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить случайный релиз из списка закладок профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param profileId - ID профиля.
   * @param status - Список закладок — {@link BookmarkType}.
   * @param extendedMode - Запрашивать расширенные данные релиза. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Релиз — {@link IReleaseResponse}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart, BookmarkType } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const profileId = 123;
   * const status = BookmarkType.Watching;
   *
   * const result = await client.endpoints.release.randomProfileList(
   *   profileId,
   *   status,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.release);
   */
  public async randomProfileList(
    profileId: number,
    status: BookmarkType,
    extendedMode?: boolean,
    options: IRequestOptions = {},
  ): Promise<IReleaseResponse> {
    return (
      await this._client.http.request<IReleaseResponse>({
        path: `/release/random/profile/list/${profileId}/${status}`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          extended_mode: extendedMode,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Поставить оценку релизу.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param releaseId - ID релиза.
   * @param vote - Оценка релиза от 1 до 5.
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
   * const releaseId = 123;
   * const vote = 5;
   *
   * const result = await client.endpoints.release.addVote(
   *   releaseId,
   *   vote,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async addVote(
    releaseId: number,
    vote: IReleaseVote,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/release/vote/add/${releaseId}/${vote}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Удалить свою оценку релиза.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param releaseId - ID релиза.
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
   * const releaseId = 123;
   *
   * const result = await client.endpoints.release.deleteVote(
   *   releaseId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async deleteVote(
    releaseId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/release/vote/delete/${releaseId}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }
}
