import type { CommonResult } from "../../models";
import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  IPageableResponse,
  IResponse,
  IProfileEnforcement,
  IProfileEnforcementResponse,
  IProfileHealthStatusResponse,
} from "../../models";

export class ProfileHealth {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить страницу ограничений аккаунта.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Массив ограничений или страница — {@link IPageableResponse} с элементами {@link IProfileEnforcement}.
   * @remarks При отсутствии ограничений сервер возвращает пустой массив, а не объект пагинации.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.profileHealth.account(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(Array.isArray(result) ? result : result.content);
   */
  public async account(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IProfileEnforcement[]> {
    return (
      await this._client.http.request<IProfileEnforcement[]>({
        path: `/profile/health/enforcement/account/all/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Отправить апелляцию на действие модерации.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param enforcementId - ID действия модерации.
   * @param message - Текст обращения.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const enforcementId = 123;
   * const message = "Мне понравилась эта серия!";
   *
   * const result = await client.endpoints.profileHealth.appeal(
   *   enforcementId,
   *   message,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async appeal(
    enforcementId: number,
    message: string,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/health/enforcement/${enforcementId}/appeal`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: {
            message: message,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу действий модерации над контентом.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Массив действий или страница — {@link IPageableResponse} с элементами {@link IProfileEnforcement}.
   * @remarks При отсутствии действий сервер возвращает пустой массив, а не объект пагинации.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.profileHealth.content(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(Array.isArray(result) ? result : result.content);
   */
  public async content(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IProfileEnforcement[]> {
    return (
      await this._client.http.request<IProfileEnforcement[]>({
        path: `/profile/health/enforcement/content/all/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить конкретное действие модерации по ID.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param id - ID действия модерации.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Действие модерации — {@link IProfileEnforcementResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const enforcementId = 123;
   *
   * const result = await client.endpoints.profileHealth.enforcement(
   *   enforcementId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.enforcement);
   */
  public async enforcement(
    id: number,
    options: IRequestOptions = {},
  ): Promise<IProfileEnforcementResponse> {
    return (
      await this._client.http.request<IProfileEnforcementResponse>({
        path: `/profile/health/enforcement/${id}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить статус ограничений и блокировок профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Статистика ограничений профиля — {@link IProfileHealthStatusResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.profileHealth.status(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.ban_count);
   */
  public async status(
    options: IRequestOptions = {},
  ): Promise<IProfileHealthStatusResponse> {
    return (
      await this._client.http.request<IProfileHealthStatusResponse>({
        path: `/profile/health/status`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }
}
