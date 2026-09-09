import type { CommonResult } from "../../models";
import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  IPageableResponse,
  IResponse,
  BlockListAddResult,
  IProfile,
} from "../../models";

export class ProfileBlockList {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Добавить профиль в чёрный список.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link BlockListAddResult}.
   *
   * @param id - ID профиля.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link BlockListAddResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const profileId = 123;
   *
   * const result = await client.endpoints.profileBlockList.addToBlockList(
   *   profileId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async addToBlockList(
    id: number,
    options: IRequestOptions = {},
  ): Promise<IResponse<BlockListAddResult>> {
    return (
      await this._client.http.request<IResponse<BlockListAddResult>>({
        path: `/profile/blocklist/add/${id}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: BlockListAddResult,
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу профилей из чёрного списка.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IProfile}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.profileBlockList.all(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async all(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IProfile>> {
    return (
      await this._client.http.request<IPageableResponse<IProfile>>({
        path: `/profile/blocklist/all/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Удалить профиль из чёрного списка.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param id - ID профиля.
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
   * const profileId = 123;
   *
   * const result = await client.endpoints.profileBlockList.remove(
   *   profileId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async remove(
    id: number,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/blocklist/remove/${id}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }
}
