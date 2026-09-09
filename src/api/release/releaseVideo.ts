import type { CommonResult } from "../../models";
import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  IPageableResponse,
  IReleaseVideo,
  IReleaseVideoCategoriesResponse,
  IReleaseVideoResponse,
  ReleaseVideoResult,
} from "../../models";

export class ReleaseVideo {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить информацию о видео релиза.
   *
   * Коды результата: {@link CommonResult}, {@link ReleaseVideoResult}.
   *
   * @param releaseId - ID релиза.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Видео, платформы просмотра и данные релиза — {@link IReleaseVideoResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const releaseId = 123;
   *
   * const result = await client.endpoints.releaseVideo.get(
   *   releaseId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.blocks);
   */
  public async get(
    releaseId: number,
    options: IRequestOptions = {},
  ): Promise<IReleaseVideoResponse> {
    return (
      await this._client.http.request<IReleaseVideoResponse>({
        path: `/video/release/${releaseId}`,
        method: "GET",
        resultEnum: ReleaseVideoResult,
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу видео релиза.
   *
   * @param releaseId - ID релиза.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IReleaseVideo}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const releaseId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.releaseVideo.all(
   *   releaseId,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async all(
    releaseId: number,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IReleaseVideo>> {
    return (
      await this._client.http.request<IPageableResponse<IReleaseVideo>>({
        path: `/video/release/${releaseId}/${page}`,
        method: "GET",
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу видео, добавленных профилем.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param profileId - ID профиля.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IReleaseVideo}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const profileId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.releaseVideo.profileVideo(
   *   profileId,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async profileVideo(
    profileId: number,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IReleaseVideo>> {
    return (
      await this._client.http.request<IPageableResponse<IReleaseVideo>>({
        path: `/video/profile/${profileId}/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу видео релиза в выбранной категории.
   *
   * @param releaseId - ID релиза.
   * @param categoryId - ID категории видео.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IReleaseVideo}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const releaseId = 123;
   * const categoryId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.releaseVideo.category(
   *   releaseId,
   *   categoryId,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async category(
    releaseId: number,
    categoryId: number,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IReleaseVideo>> {
    return (
      await this._client.http.request<IPageableResponse<IReleaseVideo>>({
        path: `/video/release/${releaseId}/category/${categoryId}/${page}`,
        method: "GET",
        ...options,
      })
    ).data;
  }

  /**
   * Получить категории видео.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Категории видео — {@link IReleaseVideoCategoriesResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const result = await client.endpoints.releaseVideo.categories(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.categories);
   */
  public async categories(
    options: IRequestOptions = {},
  ): Promise<IReleaseVideoCategoriesResponse> {
    return (
      await this._client.http.request<IReleaseVideoCategoriesResponse>({
        path: `/video/release/categories`,
        method: "GET",
        ...options,
      })
    ).data;
  }
}
