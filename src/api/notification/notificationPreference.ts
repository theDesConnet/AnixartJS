import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  IPageableResponse,
  IResponse,
  NotificationPreferenceEditType,
  INotificationPreferenceResponse,
  IReleaseTypeNotificationEditRequest,
  IStatusNotificationEditRequest,
  IProfileTypeNotificationEditRequest,
  IRelease,
  IReleaseTypeNotificationResponse,
} from "../../models";

export class NotificationPreference {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Переключить выбранную настройку уведомлений.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param type - Настройка для переключения — {@link NotificationPreferenceEditType}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @remarks
   
   * Метод переключает состояние; повторный вызов может отменить предыдущее изменение.
   *
   * @example
   * import { Anixart, NotificationPreferenceEditType } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const type = NotificationPreferenceEditType.Article;
   *
   * const result = await client.endpoints.notificationPreference.edit(
   *   type,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async edit(
    type: NotificationPreferenceEditType,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/preference/notification/${type}/edit`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить настройки уведомлений текущего профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Настройки уведомлений профиля — {@link INotificationPreferenceResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.notificationPreference.my(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.profileStatusNotificationPreferences);
   */
  public async my(
    options: IRequestOptions = {},
  ): Promise<INotificationPreferenceResponse> {
    return (
      await this._client.http.request<INotificationPreferenceResponse>({
        path: `/profile/preference/notification/my`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Изменить подписки на озвучки для конкретного релиза.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param data - Данные запроса — {@link IReleaseTypeNotificationEditRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IReleaseTypeNotificationEditRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const settings: IReleaseTypeNotificationEditRequest = {
   *   release_id: 123,
   *   profile_release_type_notification_preferences: [1],
   * };
   *
   * const result = await client.endpoints.notificationPreference.editReleaseTypes(
   *   settings,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async editReleaseTypes(
    data: IReleaseTypeNotificationEditRequest,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/preference/notification/release/type/edit`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Изменить списки закладок, для которых приходят уведомления.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param data - Данные запроса — {@link IStatusNotificationEditRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IStatusNotificationEditRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const settings: IStatusNotificationEditRequest = {
   *   profileStatusNotificationPreferences: [1],
   * };
   *
   * const result = await client.endpoints.notificationPreference.editStatus(
   *   settings,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async editStatus(
    data: IStatusNotificationEditRequest,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/preference/notification/status/edit`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Изменить общие подписки на озвучки.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param data - Данные запроса — {@link IProfileTypeNotificationEditRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IProfileTypeNotificationEditRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const settings: IProfileTypeNotificationEditRequest = {
   *   profileTypeNotificationPreferences: [1],
   * };
   *
   * const result = await client.endpoints.notificationPreference.editType(
   *   settings,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async editType(
    data: IProfileTypeNotificationEditRequest,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/preference/notification/type/edit`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу релизов с настройками уведомлений.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IRelease}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.notificationPreference.releases(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async releases(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IRelease>> {
    return (
      await this._client.http.request<IPageableResponse<IRelease>>({
        path: `/profile/preference/notification/release/all/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить настройки уведомлений об озвучках релиза.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param releaseId - ID релиза.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Настройки уведомлений об озвучках — {@link IReleaseTypeNotificationResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const releaseId = 123;
   *
   * const result = await client.endpoints.notificationPreference.releaseTypes(
   *   releaseId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.profile_release_type_notification_preferences);
   */
  public async releaseTypes(
    releaseId: number,
    options: IRequestOptions = {},
  ): Promise<IReleaseTypeNotificationResponse> {
    return (
      await this._client.http.request<IReleaseTypeNotificationResponse>({
        path: `/profile/preference/notification/release/type/${releaseId}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }
}
