import type { CommonResult } from "../models";
import type { IRequestOptions } from "../core/http/httpTypes";
import { Anixart } from "../core/anixartClient";
import {
  CheckLoginResult,
  GoogleResult,
  ICheckLoginResponse,
  IFirebaseResponse,
  IGoogleResponse,
  IResendRequest,
  IResendResponse,
  IRestoreResendRequest,
  IRestoreResendResponse,
  IRestoreResponse,
  IRestoreVerifyRequest,
  IRestoreVerifyResponse,
  ISignInRequest,
  ISignInResponse,
  ISignUpRequest,
  ISignUpResponse,
  ITelegramResponse,
  IVerifyRequest,
  IVerifyResponse,
  IVkResponse,
  IYandexResponse,
  ResendResult,
  RestoreResendResult,
  RestoreResult,
  RestoreVerifyResult,
  SignInResult,
  SignUpResult,
  TelegramResult,
  VerifyResult,
  VkResult,
  YandexResult,
} from "../models";

export class Auth {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Проверить доступность логина.
   *
   * Коды результата: {@link CommonResult}, {@link CheckLoginResult}.
   *
   * @param login - Логин пользователя.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Доступность логина и предложенные варианты — {@link ICheckLoginResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const login = "anime_reader";
   *
   * const result = await client.endpoints.auth.checkLogin(
   *   login,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.available);
   */
  public async checkLogin(
    login: string,
    options: IRequestOptions = {},
  ): Promise<ICheckLoginResponse> {
    return (
      await this._client.http.request<ICheckLoginResponse>({
        path: `/auth/checkLogin`,
        method: "POST",
        resultEnum: CheckLoginResult,
        body: {
          type: "URL-Encoded",
          data: {
            login: login,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить название темы Firebase.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Название темы Firebase — {@link IFirebaseResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.auth.firebase(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.topicName);
   */
  public async firebase(
    options: IRequestOptions = {},
  ): Promise<IFirebaseResponse> {
    return (
      await this._client.http.request<IFirebaseResponse>({
        path: `/auth/firebase`,
        method: "POST",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Повторно отправить код подтверждения регистрации.
   *
   * Коды результата: {@link CommonResult}, {@link ResendResult}.
   *
   * @param data - Данные запроса — {@link IResendRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Срок действия кода подтверждения — {@link IResendResponse}.
   *
   * @remarks
   * Замените hash и код значениями из предыдущего шага подтверждения; строки-заглушки из примера не подходят для реального запроса.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IResendRequest } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const verification: IResendRequest = {
   *   login: "anime_reader",
   *   email: "reader@example.com",
   *   password: "YOUR_PASSWORD",
   *   vkAccessToken: "",
   *   googleIdToken: "",
   *   telegramIdToken: "",
   *   yandexAccessToken: "",
   *   hash: "HASH_FROM_PREVIOUS_RESPONSE",
   * };
   *
   * const result = await client.endpoints.auth.resend(
   *   verification,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.timestampExpires);
   */
  public async resend(
    data: IResendRequest,
    options: IRequestOptions = {},
  ): Promise<IResendResponse> {
    return (
      await this._client.http.request<IResendResponse>({
        path: `/auth/resend`,
        method: "POST",
        resultEnum: ResendResult,
        body: {
          type: "URL-Encoded",
          data: { ...data },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Начать восстановление аккаунта по логину или почте.
   *
   * Коды результата: {@link CommonResult}, {@link RestoreResult}.
   *
   * @param data - Логин или почта для восстановления аккаунта.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Данные для следующего шага подтверждения — {@link IRestoreResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const account = "reader@example.com";
   *
   * const result = await client.endpoints.auth.restore(
   *   account,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.codeTimestampExpires);
   */
  public async restore(
    data: string,
    options: IRequestOptions = {},
  ): Promise<IRestoreResponse> {
    return (
      await this._client.http.request<IRestoreResponse>({
        path: `/auth/restore`,
        method: "POST",
        resultEnum: RestoreResult,
        body: {
          type: "URL-Encoded",
          data: {
            data: data,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Повторно отправить код восстановления аккаунта.
   *
   * Коды результата: {@link CommonResult}, {@link RestoreResendResult}.
   *
   * @param data - Данные запроса — {@link IRestoreResendRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Срок действия кода подтверждения — {@link IRestoreResendResponse}.
   *
   * @remarks
   * Замените hash и код значениями из предыдущего шага подтверждения; строки-заглушки из примера не подходят для реального запроса.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IRestoreResendRequest } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const recovery: IRestoreResendRequest = {
   *   data: "reader@example.com",
   *   password: "YOUR_PASSWORD",
   *   hash: "HASH_FROM_PREVIOUS_RESPONSE",
   * };
   *
   * const result = await client.endpoints.auth.restoreResend(
   *   recovery,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.timestampExpires);
   */
  public async restoreResend(
    data: IRestoreResendRequest,
    options: IRequestOptions = {},
  ): Promise<IRestoreResendResponse> {
    return (
      await this._client.http.request<IRestoreResendResponse>({
        path: `/auth/restore/resend`,
        method: "POST",
        resultEnum: RestoreResendResult,
        body: {
          type: "URL-Encoded",
          data: { ...data },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Подтвердить восстановление аккаунта.
   *
   * Коды результата: {@link CommonResult}, {@link RestoreVerifyResult}.
   *
   * @param data - Данные запроса — {@link IRestoreVerifyRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Профиль и дополнительные данные ответа — {@link IRestoreVerifyResponse}.
   *
   * @remarks
   
   * Замените hash и код значениями из предыдущего шага подтверждения; строки-заглушки из примера не подходят для реального запроса.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IRestoreVerifyRequest } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const verification: IRestoreVerifyRequest = {
   *   data: "reader@example.com",
   *   password: "YOUR_PASSWORD",
   *   hash: "HASH_FROM_PREVIOUS_RESPONSE",
   *   code: "123456",
   * };
   *
   * const result = await client.endpoints.auth.restoreVerify(
   *   verification,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.profile);
   */
  public async restoreVerify(
    data: IRestoreVerifyRequest,
    options: IRequestOptions = {},
  ): Promise<IRestoreVerifyResponse> {
    return (
      await this._client.http.request<IRestoreVerifyResponse>({
        path: `/auth/restore/verify`,
        method: "POST",
        resultEnum: RestoreVerifyResult,
        body: {
          type: "URL-Encoded",
          data: { ...data },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Войти в аккаунт по логину и паролю.
   *
   * Коды результата: {@link CommonResult}, {@link SignInResult}.
   *
   * @param data - Данные запроса — {@link ISignInRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Профиль и дополнительные данные ответа — {@link ISignInResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ISignInRequest } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const credentials: ISignInRequest = {
   *   login: "anime_reader",
   *   password: "YOUR_PASSWORD",
   * };
   *
   * const result = await client.endpoints.auth.signIn(
   *   credentials,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.profile);
   */
  public async signIn(
    data: ISignInRequest,
    options: IRequestOptions = {},
  ): Promise<ISignInResponse> {
    return (
      await this._client.http.request<ISignInResponse>({
        path: `/auth/signIn`,
        method: "POST",
        resultEnum: SignInResult,
        body: {
          type: "URL-Encoded",
          data: { ...data },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Войти через аккаунт Google.
   *
   * Коды результата: {@link CommonResult}, {@link GoogleResult}.
   *
   * @param googleIdToken - ID-токен Google.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Результат входа или данные для продолжения регистрации — {@link IGoogleResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const googleIdToken = "PROVIDER_TOKEN";
   *
   * const result = await client.endpoints.auth.signInWithGoogle(
   *   googleIdToken,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.codeTimestampExpires);
   */
  public async signInWithGoogle(
    googleIdToken: string,
    options: IRequestOptions = {},
  ): Promise<IGoogleResponse> {
    return (
      await this._client.http.request<IGoogleResponse>({
        path: `/auth/google`,
        method: "POST",
        resultEnum: GoogleResult,
        body: {
          type: "URL-Encoded",
          data: {
            googleIdToken: googleIdToken,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Войти через аккаунт Telegram.
   *
   * Коды результата: {@link CommonResult}, {@link TelegramResult}.
   *
   * @param telegramTokenId - ID-токен Telegram.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Результат входа или данные для продолжения регистрации — {@link ITelegramResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const telegramTokenId = "PROVIDER_TOKEN";
   *
   * const result = await client.endpoints.auth.signInWithTelegram(
   *   telegramTokenId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.codeTimestampExpires);
   */
  public async signInWithTelegram(
    telegramTokenId: string,
    options: IRequestOptions = {},
  ): Promise<ITelegramResponse> {
    return (
      await this._client.http.request<ITelegramResponse>({
        path: `/auth/telegram`,
        method: "POST",
        resultEnum: TelegramResult,
        body: {
          type: "URL-Encoded",
          data: {
            telegramIdToken: telegramTokenId,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Войти через аккаунт VK.
   *
   * Коды результата: {@link CommonResult}, {@link VkResult}.
   *
   * @param vkAccessToken - Токен доступа VK.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Результат входа или данные для продолжения регистрации — {@link IVkResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const vkAccessToken = "PROVIDER_TOKEN";
   *
   * const result = await client.endpoints.auth.signInWithVk(
   *   vkAccessToken,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.codeTimestampExpires);
   */
  public async signInWithVk(
    vkAccessToken: string,
    options: IRequestOptions = {},
  ): Promise<IVkResponse> {
    return (
      await this._client.http.request<IVkResponse>({
        path: `/auth/vk`,
        method: "POST",
        resultEnum: VkResult,
        body: {
          type: "URL-Encoded",
          data: {
            vkAccessToken: vkAccessToken,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Войти через аккаунт Яндекса.
   *
   * Коды результата: {@link CommonResult}, {@link YandexResult}.
   *
   * @param yandexAccessToken - Токен доступа Яндекса.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Результат входа или данные для продолжения регистрации — {@link IYandexResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const yandexAccessToken = "PROVIDER_TOKEN";
   *
   * const result = await client.endpoints.auth.signInWithYandex(
   *   yandexAccessToken,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.email);
   */
  public async signInWithYandex(
    yandexAccessToken: string,
    options: IRequestOptions = {},
  ): Promise<IYandexResponse> {
    return (
      await this._client.http.request<IYandexResponse>({
        path: `/auth/yandex`,
        method: "POST",
        resultEnum: YandexResult,
        body: {
          type: "URL-Encoded",
          data: {
            yandexAccessToken: yandexAccessToken,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Зарегистрировать аккаунт.
   *
   * Коды результата: {@link CommonResult}, {@link SignUpResult}.
   *
   * @param data - Данные запроса — {@link ISignUpRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Данные для подтверждения регистрации — {@link ISignUpResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ISignUpRequest } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const registration: ISignUpRequest = {
   *   login: "anime_reader",
   *   email: "reader@example.com",
   *   password: "YOUR_PASSWORD",
   * };
   *
   * const result = await client.endpoints.auth.signUp(
   *   registration,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.codeTimestampExpires);
   */
  public async signUp(
    data: ISignUpRequest,
    options: IRequestOptions = {},
  ): Promise<ISignUpResponse> {
    return (
      await this._client.http.request<ISignUpResponse>({
        path: `/auth/signUp`,
        method: "POST",
        resultEnum: SignUpResult,
        body: {
          type: "URL-Encoded",
          data: { ...data },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Передать данные регистрации через аккаунт Google.
   *
   * Коды результата: {@link CommonResult}, {@link GoogleResult}.
   *
   * @param data - Данные запроса — {@link ISignUpRequest} без пароля.
   * @param googleIdToken - ID-токен Google.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Результат входа или данные для продолжения регистрации — {@link IGoogleResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ISignUpRequest } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const settings: Omit<ISignUpRequest, "password"> = {
   *   login: "anime_reader",
   *   email: "reader@example.com",
   * };
   * const googleIdToken = "PROVIDER_TOKEN";
   *
   * const result = await client.endpoints.auth.signUpWithGoogle(
   *   settings,
   *   googleIdToken,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.codeTimestampExpires);
   */
  public async signUpWithGoogle(
    data: Omit<ISignUpRequest, "password">,
    googleIdToken: string,
    options: IRequestOptions = {},
  ): Promise<IGoogleResponse> {
    return (
      await this._client.http.request<IGoogleResponse>({
        path: `/auth/google`,
        method: "POST",
        resultEnum: GoogleResult,
        body: {
          type: "URL-Encoded",
          data: {
            ...data,
            googleIdToken: googleIdToken,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Передать данные регистрации через аккаунт Telegram.
   *
   * Коды результата: {@link CommonResult}, {@link TelegramResult}.
   *
   * @param data - Данные запроса — {@link ISignUpRequest} без пароля.
   * @param telegramIdToken - ID-токен Telegram.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Результат входа или данные для продолжения регистрации — {@link ITelegramResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ISignUpRequest } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const settings: Omit<ISignUpRequest, "password"> = {
   *   login: "anime_reader",
   *   email: "reader@example.com",
   * };
   * const telegramIdToken = "PROVIDER_TOKEN";
   *
   * const result = await client.endpoints.auth.signUpWithTelegram(
   *   settings,
   *   telegramIdToken,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.codeTimestampExpires);
   */
  public async signUpWithTelegram(
    data: Omit<ISignUpRequest, "password">,
    telegramIdToken: string,
    options: IRequestOptions = {},
  ): Promise<ITelegramResponse> {
    return (
      await this._client.http.request<ITelegramResponse>({
        path: `/auth/telegram`,
        method: "POST",
        resultEnum: TelegramResult,
        body: {
          type: "URL-Encoded",
          data: {
            ...data,
            telegramIdToken: telegramIdToken,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Передать данные регистрации через аккаунт VK.
   *
   * Коды результата: {@link CommonResult}, {@link VkResult}.
   *
   * @param data - Данные запроса — {@link ISignUpRequest} без пароля.
   * @param vkAccessToken - Токен доступа VK.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Результат входа или данные для продолжения регистрации — {@link IVkResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ISignUpRequest } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const settings: Omit<ISignUpRequest, "password"> = {
   *   login: "anime_reader",
   *   email: "reader@example.com",
   * };
   * const vkAccessToken = "PROVIDER_TOKEN";
   *
   * const result = await client.endpoints.auth.signUpWithVk(
   *   settings,
   *   vkAccessToken,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.codeTimestampExpires);
   */
  public async signUpWithVk(
    data: Omit<ISignUpRequest, "password">,
    vkAccessToken: string,
    options: IRequestOptions = {},
  ): Promise<IVkResponse> {
    return (
      await this._client.http.request<IVkResponse>({
        path: `/auth/vk`,
        method: "POST",
        resultEnum: VkResult,
        body: {
          type: "URL-Encoded",
          data: {
            ...data,
            vkAccessToken: vkAccessToken,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Передать данные регистрации через аккаунт Яндекса.
   *
   * Коды результата: {@link CommonResult}, {@link YandexResult}.
   *
   * @param data - Данные запроса — {@link ISignUpRequest} без пароля.
   * @param yandexAccessToken - Токен доступа Яндекса.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Результат входа или данные для продолжения регистрации — {@link IYandexResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ISignUpRequest } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const settings: Omit<ISignUpRequest, "password"> = {
   *   login: "anime_reader",
   *   email: "reader@example.com",
   * };
   * const yandexAccessToken = "PROVIDER_TOKEN";
   *
   * const result = await client.endpoints.auth.signUpWithYandex(
   *   settings,
   *   yandexAccessToken,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.email);
   */
  public async signUpWithYandex(
    data: Omit<ISignUpRequest, "password">,
    yandexAccessToken: string,
    options: IRequestOptions = {},
  ): Promise<IYandexResponse> {
    return (
      await this._client.http.request<IYandexResponse>({
        path: `/auth/yandex`,
        method: "POST",
        resultEnum: YandexResult,
        body: {
          type: "URL-Encoded",
          data: {
            ...data,
            yandexAccessToken: yandexAccessToken,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Подтвердить регистрацию аккаунта.
   *
   * Коды результата: {@link CommonResult}, {@link VerifyResult}.
   *
   * @param data - Данные запроса — {@link IVerifyRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Профиль и дополнительные данные ответа — {@link IVerifyResponse}.
   *
   * @remarks
   
   * Замените hash и код значениями из предыдущего шага подтверждения; строки-заглушки из примера не подходят для реального запроса.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IVerifyRequest } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const verification: IVerifyRequest = {
   *   login: "anime_reader",
   *   email: "reader@example.com",
   *   password: "YOUR_PASSWORD",
   *   hash: "HASH_FROM_PREVIOUS_RESPONSE",
   *   code: "123456",
   * };
   *
   * const result = await client.endpoints.auth.verify(
   *   verification,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.profile);
   */
  public async verify(
    data: IVerifyRequest,
    options: IRequestOptions = {},
  ): Promise<IVerifyResponse> {
    return (
      await this._client.http.request<IVerifyResponse>({
        path: `/auth/verify`,
        method: "POST",
        resultEnum: VerifyResult,
        body: {
          type: "URL-Encoded",
          data: { ...data },
        },
        ...options,
      })
    ).data;
  }
}
