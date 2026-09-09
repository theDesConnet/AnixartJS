import type { CommonResult } from "../../models";
import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  IPageableResponse,
  IResponse,
  BookmarkSortType,
  BookmarkType,
  IRelease,
} from "../../models";

export class ProfileList {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Добавить релиз в выбранный список закладок.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param releaseId - ID релиза.
   * @param status - Список закладок — {@link BookmarkType}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart, BookmarkType } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const releaseId = 123;
   * const status = BookmarkType.Watching;
   *
   * const result = await client.endpoints.profileList.add(
   *   releaseId,
   *   status,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async add(
    releaseId: number,
    status: BookmarkType,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/list/add/${status}/${releaseId}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Удалить релиз из выбранного списка закладок.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param releaseId - ID релиза.
   * @param status - Список закладок — {@link BookmarkType}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart, BookmarkType } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const releaseId = 123;
   * const status = BookmarkType.Watching;
   *
   * const result = await client.endpoints.profileList.delete(
   *   releaseId,
   *   status,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async delete(
    releaseId: number,
    status: BookmarkType,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/list/delete/${status}/${releaseId}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу закладок текущего профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param status - Список закладок — {@link BookmarkType}.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param sort - Порядок сортировки — {@link BookmarkSortType}. Необязательный параметр.
   * @param filterAnnounce - Фильтр анонсированных релизов. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IRelease}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart, BookmarkType } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const status = BookmarkType.Watching;
   * const page = 0;
   *
   * const result = await client.endpoints.profileList.get(
   *   status,
   *   page,
   *   undefined,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async get(
    status: BookmarkType,
    page: number = 0,
    sort?: BookmarkSortType,
    filterAnnounce?: number,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IRelease>> {
    return (
      await this._client.http.request<IPageableResponse<IRelease>>({
        path: `/profile/list/all/${status}/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          sort,
          filter_announce: filterAnnounce,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу закладок указанного профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param profileId - ID профиля.
   * @param status - Список закладок — {@link BookmarkType}.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param sort - Порядок сортировки — {@link BookmarkSortType}. Необязательный параметр.
   * @param filterAnnounce - Фильтр анонсированных релизов. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IRelease}.
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
   * const page = 0;
   *
   * const result = await client.endpoints.profileList.getByProfile(
   *   profileId,
   *   status,
   *   page,
   *   undefined,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async getByProfile(
    profileId: number,
    status: BookmarkType,
    page: number = 0,
    sort?: BookmarkSortType,
    filterAnnounce?: number,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IRelease>> {
    return (
      await this._client.http.request<IPageableResponse<IRelease>>({
        path: `/profile/list/all/${profileId}/${status}/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          sort,
          filter_announce: filterAnnounce,
        },
        ...options,
      })
    ).data;
  }
}
