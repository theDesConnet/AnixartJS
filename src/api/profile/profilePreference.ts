import type { CommonResult } from "../../models";
import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  IResponse,
  IProfilePreferenceResponse,
  IChangeEmailRequest,
  IChangeEmailResendRequest,
  IChangeEmailResendResponse,
  IChangeEmailResponse,
  IChangeEmailVerifyRequest,
  IChangeLoginResponse,
  IChangePasswordRequest,
  IChangePasswordResponse,
  ILoginInfoResponse,
  IProfileSelectThemeResponse,
  IProfileSocialResponse,
  ISocialRequest,
  ChangeEmailVerifyResult,
  GoogleBindResult,
  GoogleUnbindResult,
  PrivacyFriendRequestState,
  PrivacyState,
  SocialEditResult,
  TelegramBindResult,
  TelegramUnbindResult,
  VkBindResult,
  VkUnbindResult,
  YandexBindResult,
  YandexUnbindResult,
  ChangePasswordResult,
  ChangeLoginResult,
  ChangeEmailResendResult,
  ChangeEmailResult,
  ProfileSelectThemeResult,
} from "../../models";

export class ProfilePreference {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Удалить аватар профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Настройки профиля — {@link IProfilePreferenceResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.profilePreference.avatarDelete(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.available_themes);
   */
  public async avatarDelete(
    options: IRequestOptions = {},
  ): Promise<IProfilePreferenceResponse> {
    return (
      await this._client.http.request<IProfilePreferenceResponse>({
        path: `/profile/preference/avatar/delete`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Загрузить аватар профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param image - Содержимое изображения в Buffer.
   * @param name - Имя файла изображения, включая расширение.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Настройки профиля — {@link IProfilePreferenceResponse}.
   *
   * @example
   * import { readFile } from "node:fs/promises";
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const image = await readFile("./cover.jpg");
   * const name = "cover.jpg";
   *
   * const result = await client.endpoints.profilePreference.avatarEdit(
   *   image,
   *   name,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.available_themes);
   */
  public async avatarEdit(
    image: Buffer,
    name: string,
    options: IRequestOptions = {},
  ): Promise<IProfilePreferenceResponse> {
    return (
      await this._client.http.request<IProfilePreferenceResponse>({
        path: "/profile/preference/avatar/edit",
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "Image",
          data: {
            type: "image",
            file: image,
            name,
            fields: {
              name,
            },
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Начать изменение почты аккаунта.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChangeEmailResult}.
   *
   * @param data - Данные запроса — {@link IChangeEmailRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Данные для следующего шага подтверждения — {@link IChangeEmailResponse}.
   *
   * @remarks
   * Замените hash и код значениями из предыдущего шага подтверждения; строки-заглушки из примера не подходят для реального запроса.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IChangeEmailRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const settings: IChangeEmailRequest = {
   *   new_email: "new@example.com",
   *   current_email: "old@example.com",
   *   current_password: "CURRENT_PASSWORD",
   * };
   *
   * const result = await client.endpoints.profilePreference.changeEmail(
   *   settings,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.timestamp_expires);
   */
  public async changeEmail(
    data: IChangeEmailRequest,
    options: IRequestOptions = {
      apiVersion: 2,
    },
  ): Promise<IChangeEmailResponse> {
    return (
      await this._client.http.request<IChangeEmailResponse>({
        path: `/profile/preference/email/change`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ChangeEmailResult,
        body: {
          type: "URL-Encoded",
          data: { ...data },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Повторно отправить код подтверждения смены почты.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChangeEmailResendResult}.
   *
   * @param data - Данные запроса — {@link IChangeEmailResendRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Срок действия повторного кода — {@link IChangeEmailResendResponse}.
   *
   * @remarks
   * Замените hash и код значениями из предыдущего шага подтверждения; строки-заглушки из примера не подходят для реального запроса.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IChangeEmailResendRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const settings: IChangeEmailResendRequest = {
   *   new_email: "new@example.com",
   *   current_email: "old@example.com",
   *   current_password: "CURRENT_PASSWORD",
   *   hash: "HASH_FROM_PREVIOUS_RESPONSE",
   * };
   *
   * const result = await client.endpoints.profilePreference.changeEmailResend(
   *   settings,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.timestamp_expires);
   */
  public async changeEmailResend(
    data: IChangeEmailResendRequest,
    options: IRequestOptions = {
      apiVersion: 2,
    },
  ): Promise<IChangeEmailResendResponse> {
    return (
      await this._client.http.request<IChangeEmailResendResponse>({
        path: `/profile/preference/email/resend`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ChangeEmailResendResult,
        body: {
          type: "URL-Encoded",
          data: { ...data },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Подтвердить смену почты.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChangeEmailVerifyResult}.
   *
   * @param data - Данные запроса — {@link IChangeEmailVerifyRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link ChangeEmailVerifyResult}.
   *
   * @remarks
   * Замените hash и код значениями из предыдущего шага подтверждения; строки-заглушки из примера не подходят для реального запроса.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IChangeEmailVerifyRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const settings: IChangeEmailVerifyRequest = {
   *   new_email: "new@example.com",
   *   code: 123456,
   *   hash: "HASH_FROM_PREVIOUS_RESPONSE",
   * };
   *
   * const result = await client.endpoints.profilePreference.changeEmailVerify(
   *   settings,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async changeEmailVerify(
    data: IChangeEmailVerifyRequest,
    options: IRequestOptions = {},
  ): Promise<IResponse<ChangeEmailVerifyResult>> {
    return (
      await this._client.http.request<IResponse<ChangeEmailVerifyResult>>({
        path: `/profile/preference/email/verify`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: ChangeEmailVerifyResult,
        query: { ...data },
        ...options,
      })
    ).data;
  }

  /**
   * Изменить логин профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChangeLoginResult}.
   *
   * @param login - Логин пользователя.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Результат смены логина и предложенные варианты — {@link IChangeLoginResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const login = "anime_reader";
   *
   * const result = await client.endpoints.profilePreference.changeLogin(
   *   login,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.suggested_logins);
   */
  public async changeLogin(
    login: string,
    options: IRequestOptions = {},
  ): Promise<IChangeLoginResponse> {
    return (
      await this._client.http.request<IChangeLoginResponse>({
        path: `/profile/preference/login/change`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ChangeLoginResult,
        query: {
          login,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить условия смены логина.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Текущий логин и условия его изменения — {@link ILoginInfoResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.profilePreference.changeLoginInfo(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.login);
   */
  public async changeLoginInfo(
    options: IRequestOptions = {},
  ): Promise<ILoginInfoResponse> {
    return (
      await this._client.http.request<ILoginInfoResponse>({
        path: `/profile/preference/login/info`,
        method: "POST",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Изменить пароль аккаунта.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChangePasswordResult}.
   *
   * @param data - Данные запроса — {@link IChangePasswordRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Результат смены пароля и новый токен — {@link IChangePasswordResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IChangePasswordRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const settings: IChangePasswordRequest = {
   *   current_password: "CURRENT_PASSWORD",
   *   new_password: "NEW_PASSWORD",
   * };
   *
   * const result = await client.endpoints.profilePreference.changePassword(
   *   settings,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async changePassword(
    data: IChangePasswordRequest,
    options: IRequestOptions = {},
  ): Promise<IChangePasswordResponse> {
    return (
      await this._client.http.request<IChangePasswordResponse>({
        path: `/profile/preference/password/change`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ChangePasswordResult,
        body: {
          type: "URL-Encoded",
          data: {
            current: data.current_password,
            new: data.new_password,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Скрыть или показать виджеты каналов озвучки.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param hidden - Скрывать виджеты при true, показывать при false.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const hidden = false;
   *
   * const result = await client.endpoints.profilePreference.episodeWidgetEdit(
   *   hidden,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async episodeWidgetEdit(
    hidden: boolean,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/preference/episode-widget/edit`,
        method: "POST",
        auth: { type: "Anixart" },
        query: {
          hidden,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Привязать аккаунт Google.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link GoogleBindResult}.
   *
   * @param idToken - ID-токен внешнего провайдера.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link GoogleBindResult}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const idToken = "PROVIDER_TOKEN";
   *
   * const result = await client.endpoints.profilePreference.googleBind(
   *   idToken,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async googleBind(
    idToken: string,
    options: IRequestOptions = {},
  ): Promise<IResponse<GoogleBindResult>> {
    return (
      await this._client.http.request<IResponse<GoogleBindResult>>({
        path: `/profile/preference/google/bind`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: GoogleBindResult,
        body: {
          type: "URL-Encoded",
          data: {
            idToken: idToken,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Отвязать аккаунт Google.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link GoogleUnbindResult}.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link GoogleUnbindResult}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.profilePreference.googleUnbind(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async googleUnbind(
    options: IRequestOptions = {},
  ): Promise<IResponse<GoogleUnbindResult>> {
    return (
      await this._client.http.request<IResponse<GoogleUnbindResult>>({
        path: `/profile/preference/google/unbind`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: GoogleUnbindResult,
        ...options,
      })
    ).data;
  }

  /**
   * Получить настройки текущего профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Настройки профиля — {@link IProfilePreferenceResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.profilePreference.my(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.available_themes);
   */
  public async my(
    options: IRequestOptions = {},
  ): Promise<IProfilePreferenceResponse> {
    return (
      await this._client.http.request<IProfilePreferenceResponse>({
        path: `/profile/preference/my`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Закрепить раздел профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param id - ID раздела профиля.
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
   * const sectionId = 123;
   *
   * const result = await client.endpoints.profilePreference.pinSection(
   *   sectionId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async pinSection(
    id: number,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/preference/section/edit`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: {
            id: id,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Изменить видимость счётчиков профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param state - Режим приватности — {@link PrivacyState}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @example
   * import { Anixart, PrivacyState } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const state = PrivacyState.All;
   *
   * const result = await client.endpoints.profilePreference.privacyCountsEdit(
   *   state,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async privacyCountsEdit(
    state: PrivacyState,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/preference/privacy/counts/edit`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: {
            permission: state,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Изменить доступность заявок в друзья.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param state - Режим приватности — {@link PrivacyFriendRequestState}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @example
   * import { Anixart, PrivacyFriendRequestState } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const state = PrivacyFriendRequestState.All;
   *
   * const result = await client.endpoints.profilePreference.privacyFriendRequestsEdit(
   *   state,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async privacyFriendRequestsEdit(
    state: PrivacyFriendRequestState,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/preference/privacy/friendRequests/edit`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: {
            permission: state,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Переключить режим инкогнито.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @remarks
   * Метод переключает состояние; повторный вызов может отменить предыдущее изменение.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.profilePreference.privacyIncognitoEdit(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async privacyIncognitoEdit(
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/preference/privacy/incognito/edit`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Изменить видимость социальных ссылок.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param state - Режим приватности — {@link PrivacyState}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @example
   * import { Anixart, PrivacyState } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const state = PrivacyState.All;
   *
   * const result = await client.endpoints.profilePreference.privacySocialEdit(
   *   state,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async privacySocialEdit(
    state: PrivacyState,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/preference/privacy/social/edit`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: {
            permission: state,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Изменить видимость статистики профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param state - Режим приватности — {@link PrivacyState}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @example
   * import { Anixart, PrivacyState } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const state = PrivacyState.All;
   *
   * const result = await client.endpoints.profilePreference.privacyStatsEdit(
   *   state,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async privacyStatsEdit(
    state: PrivacyState,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/preference/privacy/stats/edit`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: {
            permission: state,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Выбрать тему оформления профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ProfileSelectThemeResult}.
   *
   * @param id - ID темы.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Выбранная тема профиля — {@link IProfileSelectThemeResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const themeId = 123;
   *
   * const result = await client.endpoints.profilePreference.selectTheme(
   *   themeId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.theme);
   */
  public async selectTheme(
    id: number,
    options: IRequestOptions = {},
  ): Promise<IProfileSelectThemeResponse> {
    return (
      await this._client.http.request<IProfileSelectThemeResponse>({
        path: `/profile/preference/themes/edit`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ProfileSelectThemeResult,
        body: {
          type: "JSON",
          data: {
            id: id,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить социальные ссылки текущего профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Социальные ссылки профиля — {@link IProfileSocialResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.profilePreference.social(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.discord_page);
   */
  public async social(
    options: IRequestOptions = {},
  ): Promise<IProfileSocialResponse> {
    return (
      await this._client.http.request<IProfileSocialResponse>({
        path: `/profile/preference/social`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Изменить социальные ссылки профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link SocialEditResult}.
   *
   * @param data - Данные запроса — {@link ISocialRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link SocialEditResult}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ISocialRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const socialLinks: ISocialRequest = {
   *   vkPage: "example",
   *   tgPage: "example",
   *   instPage: "",
   *   ttPage: "",
   *   discordPage: "",
   * };
   *
   * const result = await client.endpoints.profilePreference.socialPagesEdit(
   *   socialLinks,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async socialPagesEdit(
    data: ISocialRequest,
    options: IRequestOptions = {},
  ): Promise<IResponse<SocialEditResult>> {
    return (
      await this._client.http.request<IResponse<SocialEditResult>>({
        path: `/profile/preference/social/edit`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: SocialEditResult,
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Изменить текстовый статус профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param status - Новый текст статуса профиля.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const status = "Смотрю новый сезон";
   *
   * const result = await client.endpoints.profilePreference.statusEdit(
   *   status,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async statusEdit(
    status: string,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/preference/status/edit`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: {
            status,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Привязать аккаунт Telegram.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link TelegramBindResult}.
   *
   * @param idToken - ID-токен внешнего провайдера.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link TelegramBindResult}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const idToken = "PROVIDER_TOKEN";
   *
   * const result = await client.endpoints.profilePreference.telegramBind(
   *   idToken,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async telegramBind(
    idToken: string,
    options: IRequestOptions = {},
  ): Promise<IResponse<TelegramBindResult>> {
    return (
      await this._client.http.request<IResponse<TelegramBindResult>>({
        path: `/profile/preference/telegram/bind`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: TelegramBindResult,
        body: {
          type: "URL-Encoded",
          data: {
            idToken: idToken,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Отвязать аккаунт Telegram.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link TelegramUnbindResult}.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link TelegramUnbindResult}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.profilePreference.telegramUnbind(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async telegramUnbind(
    options: IRequestOptions = {},
  ): Promise<IResponse<TelegramUnbindResult>> {
    return (
      await this._client.http.request<IResponse<TelegramUnbindResult>>({
        path: `/profile/preference/telegram/unbind`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: TelegramUnbindResult,
        ...options,
      })
    ).data;
  }

  /**
   * Привязать аккаунт VK.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link VkBindResult}.
   *
   * @param accessToken - Токен доступа внешнего провайдера.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link VkBindResult}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const accessToken = "PROVIDER_TOKEN";
   *
   * const result = await client.endpoints.profilePreference.vkBind(
   *   accessToken,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async vkBind(
    accessToken: string,
    options: IRequestOptions = {},
  ): Promise<IResponse<VkBindResult>> {
    return (
      await this._client.http.request<IResponse<VkBindResult>>({
        path: `/profile/preference/vk/bind`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: VkBindResult,
        body: {
          type: "URL-Encoded",
          data: {
            accessToken: accessToken,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Отвязать аккаунт VK.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link VkUnbindResult}.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link VkUnbindResult}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.profilePreference.vkUnbind(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async vkUnbind(
    options: IRequestOptions = {},
  ): Promise<IResponse<VkUnbindResult>> {
    return (
      await this._client.http.request<IResponse<VkUnbindResult>>({
        path: `/profile/preference/vk/unbind`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: VkUnbindResult,
        ...options,
      })
    ).data;
  }

  /**
   * Привязать аккаунт Яндекса.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link YandexBindResult}.
   *
   * @param accessToken - Токен доступа внешнего провайдера.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link YandexBindResult}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const accessToken = "PROVIDER_TOKEN";
   *
   * const result = await client.endpoints.profilePreference.yandexBind(
   *   accessToken,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async yandexBind(
    accessToken: string,
    options: IRequestOptions = {},
  ): Promise<IResponse<YandexBindResult>> {
    return (
      await this._client.http.request<IResponse<YandexBindResult>>({
        path: `/profile/preference/yandex/bind`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: YandexBindResult,
        body: {
          type: "URL-Encoded",
          data: {
            accessToken: accessToken,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Отвязать аккаунт Яндекса.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link YandexUnbindResult}.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link YandexUnbindResult}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.profilePreference.yandexUnbind(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async yandexUnbind(
    options: IRequestOptions = {},
  ): Promise<IResponse<YandexUnbindResult>> {
    return (
      await this._client.http.request<IResponse<YandexUnbindResult>>({
        path: `/profile/preference/yandex/unbind`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: YandexUnbindResult,
        ...options,
      })
    ).data;
  }
}
