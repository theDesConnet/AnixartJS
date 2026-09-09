import type { CommonResult } from "../../models";
import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  IPageableResponse,
  IReleaseVideo,
  IReleaseVideoAppealRequest,
  IResponse,
  ReleaseVideoAppealResult,
} from "../../models";

export class ReleaseVideoAppeal {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Отправить заявку на добавление видео к релизу.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ReleaseVideoAppealResult}.
   *
   * @param data - Данные запроса — {@link IReleaseVideoAppealRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link ReleaseVideoAppealResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IReleaseVideoAppealRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const settings: IReleaseVideoAppealRequest = {
   *   categoryId: 123,
   *   releaseId: 123,
   *   title: "Что посмотреть на выходных",
   *   url: "https://example.com/video",
   * };
   *
   * const result = await client.endpoints.releaseVideoAppeal.add(
   *   settings,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async add(
    data: IReleaseVideoAppealRequest,
    options: IRequestOptions = {},
  ): Promise<IResponse<ReleaseVideoAppealResult>> {
    return (
      await this._client.http.request<IResponse<ReleaseVideoAppealResult>>({
        path: `/video/appeal/add`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ReleaseVideoAppealResult,
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить свои заявки на добавление видео.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы или "last" для последних заявок. По умолчанию: "last".
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IReleaseVideo}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = "last";
   *
   * const result = await client.endpoints.releaseVideoAppeal.get(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async get(
    page: number | "last" = "last",
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IReleaseVideo>> {
    return (
      await this._client.http.request<IPageableResponse<IReleaseVideo>>({
        path: `/video/appeal/profile/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Удалить заявку на добавление видео.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ReleaseVideoAppealResult}.
   *
   * @param appealId - ID заявки на добавление видео.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link ReleaseVideoAppealResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const appealId = 123;
   *
   * const result = await client.endpoints.releaseVideoAppeal.delete(
   *   appealId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async delete(
    appealId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse<ReleaseVideoAppealResult>> {
    return (
      await this._client.http.request<IResponse<ReleaseVideoAppealResult>>({
        path: `/video/appeal/delete/${appealId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ReleaseVideoAppealResult,
        ...options,
      })
    ).data;
  }
}
