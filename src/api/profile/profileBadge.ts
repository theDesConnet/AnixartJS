/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import { IPageableResponse, IResponse, IBadge, IProfileBadgeSectionsResponse, IProfileBadgeResponse, IProfileBadgeShowcaseResponse, ProfileBadgeShowcaseResult, IProfileBadgePageableResponse } from "../../models";

export class ProfileBadge {
  public constructor(private readonly _client: Anixart) { }

  /**
   * @deprecated В Anixart 10.5 используется новая система разделов значков. Используйте list() или section().
   * 
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
   * @returns Информация о выбранном значке — {@link IProfileBadgeResponse}.
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
   * console.log(result.badge);
   */
  public async edit(
    id: number,
    options: IRequestOptions = {},
  ): Promise<IProfileBadgeResponse> {
    return (
      await this._client.http.request<IProfileBadgeResponse>({
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

  /**
   * Получить разделы значков профиля.
   *
   * Возвращает категории, недавно полученные значки
   * и значки, закреплённые в витрине пользователя.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param profileId - ID профиля.
   * @param recent - Строковый параметр фильтра недавних значков.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Разделы значков профиля — {@link IProfileBadgeSectionsResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   * 
   * const result = await client.endpoints.profileBadge.list(123);
   * console.log(result.sections);
   * console.log(result.showcased);
   */
  public async list(
    profileId: number,
    recent?: string,
    options: IRequestOptions = {},
  ): Promise<IProfileBadgeSectionsResponse> {
    return (
      await this._client.http.request<IProfileBadgeSectionsResponse>({
        path: `/profile/${profileId}/badge/list`,
        method: "GET",
        auth: { type: "Anixart" },
        query: { recent },
        ...options,
      })
    ).data;
  }

  /**
   * Получить значки определённой категории профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param profileId - ID профиля.
   * @param categoryId - ID категории значков.
   * @param page - Номер страницы, начиная с 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница значков — {@link IProfileBadgePageableResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   * 
   * const result = await client.endpoints.profileBadge.section(
   *   123, 1, 0
    * );
   * console.log(result.content);
   */
  public async section(
    profileId: number,
    categoryId: number,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IProfileBadgePageableResponse> {
    return (
      await this._client.http.request<IProfileBadgePageableResponse>({
        path: `/profile/${profileId}/badge/list/${categoryId}/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Закрепить значок в витрине профиля.
   *
   * Требуется токен авторизации.
   * Коды результата: {@link ProfileBadgeShowcaseResult}.
   *
   * @param id - ID значка.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Результат закрепления — {@link IProfileBadgeShowcaseResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   * 
   * const result = await client.endpoints.profileBadge.pinToShowcase(123);
   * console.log(result.code);
   */
  public async pinToShowcase(
    id: number,
    options: IRequestOptions = {},
  ): Promise<IProfileBadgeShowcaseResponse> {
    return (
      await this._client.http.request<IProfileBadgeShowcaseResponse>({
        path: `/profile/preference/badge/showcase/pin/${id}`,
        method: "POST",
        auth: { type: "Anixart", required: true },
        resultEnum: ProfileBadgeShowcaseResult,
        ...options,
      })
    ).data;
  }

  /**
   * Убрать значок из витрины профиля.
   *
   * Требуется токен авторизации.
   * Коды результата: {@link ProfileBadgeShowcaseResult}.
   *
   * @param id - ID значка.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Результат удаления из витрины — {@link IProfileBadgeShowcaseResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   * 
   * const result = await client.endpoints.profileBadge.unpinFromShowcase(123);
   * console.log(result.code);
   */
  public async unpinFromShowcase(
    id: number,
    options: IRequestOptions = {},
  ): Promise<IProfileBadgeShowcaseResponse> {
    return (
      await this._client.http.request<IProfileBadgeShowcaseResponse>({
        path: `/profile/preference/badge/showcase/unpin/${id}`,
        method: "POST",
        auth: { type: "Anixart", required: true },
        resultEnum: ProfileBadgeShowcaseResult,
        ...options,
      })
    ).data;
  }

  /**
   * Изменить порядок значков в витрине профиля.
   *
   * Передаёт массив ID значков в JSON-теле запроса.
   * Требуется токен авторизации.
   * Коды результата: {@link ProfileBadgeShowcaseResult}.
   *
   * @param ids - ID значков в необходимом порядке.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Результат сортировки — {@link IProfileBadgeShowcaseResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   * 
   * const result = await client.endpoints.profileBadge.reorderShowcase(
   *   [12, 34, 56]
   * );
   * console.log(result.code);
   */
  public async reorderShowcase(
    ids: number[],
    options: IRequestOptions = {},
  ): Promise<IProfileBadgeShowcaseResponse> {
    return (
      await this._client.http.request<IProfileBadgeShowcaseResponse>({
        path: `/profile/preference/badge/showcase/reorder`,
        method: "POST",
        auth: { type: "Anixart", required: true },
        resultEnum: ProfileBadgeShowcaseResult,
        body: {
          type: "JSON",
          data: { ids },
        },
        ...options,
      })
    ).data;
  }
}
