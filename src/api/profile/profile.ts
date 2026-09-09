import type { CommonResult } from "../../models";
import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  IPageableResponse,
  IResponse,
  IChangeLogin,
  IProfileInfoResponse,
  IProfileResponse,
  ProfileResult,
} from "../../models";

export class Profile {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить страницу истории смены логина профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param id - ID профиля.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IChangeLogin}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const profileId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.profile.changeLoginHistory(
   *   profileId,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async changeLoginHistory(
    id: number,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IChangeLogin>> {
    return (
      await this._client.http.request<IPageableResponse<IChangeLogin>>({
        path: `/profile/login/history/all/${id}/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить краткую информацию о текущем профиле.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Сводная информация о текущем профиле — {@link IProfileInfoResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.profile.info(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.channel_id);
   */
  public async info(
    options: IRequestOptions = {},
  ): Promise<IProfileInfoResponse> {
    return (
      await this._client.http.request<IProfileInfoResponse>({
        path: "/profile/info",
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить профиль по ID.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param id - ID профиля.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Профиль и признак принадлежности текущему пользователю — {@link IProfileResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const profileId = 123;
   *
   * const result = await client.endpoints.profile.get(
   *   profileId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.is_my_profile);
   */
  public async get(
    id: number,
    options: IRequestOptions = {},
  ): Promise<IProfileResponse> {
    return (
      await this._client.http.request<IProfileResponse>({
        path: `/profile/${id}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: ProfileResult,
        ...options,
      })
    ).data;
  }

  /**
   * Запросить социальные ссылки профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param id - ID профиля.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const profileId = 123;
   *
   * const result = await client.endpoints.profile.social(
   *   profileId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async social(
    id: number,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/social/${id}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }
}
