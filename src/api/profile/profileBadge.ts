import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import { IPageableResponse, IResponse, IBadge } from "../../models";

export class ProfileBadge {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить страницу доступных значков профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IBadge}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.profileBadge.all(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async all(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IBadge>> {
    return (
      await this._client.http.request<IPageableResponse<IBadge>>({
        path: `/profile/preference/badge/all/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Установить значок профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param id - ID значка.
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
   * const badgeId = 123;
   *
   * const result = await client.endpoints.profileBadge.edit(
   *   badgeId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async edit(
    id: number,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/preference/badge/edit/${id}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Удалить выбранный значок профиля.
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
   * const result = await client.endpoints.profileBadge.remove(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async remove(options: IRequestOptions = {}): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/preference/badge/remove`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }
}
