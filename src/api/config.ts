import type { IRequestOptions } from "../core/http/httpTypes";
import { Anixart } from "../core/anixartClient";
import {
  IAnixPlayerConfigResponse,
  IConfigUrlsResponse,
  IToggleResponse,
} from "../models";

export class Config {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить конфигурацию AnixPlayer.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Конфигурация плеера и ссылки загрузки — {@link IAnixPlayerConfigResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const result = await client.endpoints.config.anixPlayer(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.download_links);
   */
  public async anixPlayer(
    options: IRequestOptions = {},
  ): Promise<IAnixPlayerConfigResponse> {
    return (
      await this._client.http.request<IAnixPlayerConfigResponse>({
        path: "/config/anixplayer",
        method: "GET",
        ...options,
      })
    ).data;
  }

  /**
   * Получить настройки и флаги функций для версии приложения.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param versionCode - Числовой код сборки приложения, не строка версии.
   * @param beta - Использовать настройки бета-версии. Необязательный параметр.
   * @param shouldUseMirrorUrls - Использовать альтернативные адреса API. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Флаги функций и конфигурация приложения — {@link IToggleResponse}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const versionCode = 26090418;
   *
   * const result = await client.endpoints.config.toggles(
   *   versionCode,
   *   undefined,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.adBannerDelay);
   */
  public async toggles(
    versionCode: number,
    beta?: boolean,
    shouldUseMirrorUrls?: boolean,
    options: IRequestOptions = {},
  ): Promise<IToggleResponse> {
    return (
      await this._client.http.request<IToggleResponse>({
        path: "/config/toggles",
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          version_code: versionCode,
          is_beta: beta ?? false,
          is_api_alt: shouldUseMirrorUrls ?? false,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить адреса сервисов и доступность способов авторизации.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param versionCode - Числовой код сборки приложения, не строка версии.
   * @param beta - Использовать настройки бета-версии. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Адреса сервисов и настройки доступности авторизации — {@link IConfigUrlsResponse}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const versionCode = 26090418;
   *
   * const result = await client.endpoints.config.urls(
   *   versionCode,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result);
   */
  public async urls(
    versionCode: number,
    beta?: boolean,
    options: IRequestOptions = {},
  ): Promise<IConfigUrlsResponse> {
    return (
      await this._client.http.request<IConfigUrlsResponse>({
        path: "/config/urls",
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          version_code: versionCode,
          is_beta: beta ?? false,
        },
        ...options,
      })
    ).data;
  }
}
