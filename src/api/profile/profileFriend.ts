import type { CommonResult } from "../../models";
import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  IPageableResponse,
  IResponse,
  RemoveFriendRequestResult,
  SendFriendRequestResult,
  IFriendStatusResponse,
  IProfile,
} from "../../models";

export class ProfileFriends {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить страницу друзей профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param id - ID профиля.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IProfile}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const profileId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.profileFriends.get(
   *   profileId,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async get(
    id: number,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IProfile>> {
    return (
      await this._client.http.request<IPageableResponse<IProfile>>({
        path: `/profile/friend/all/${id}/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить рекомендации профилей для добавления в друзья.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IProfile}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.profileFriends.recommendations(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async recommendations(
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IProfile>> {
    return (
      await this._client.http.request<IPageableResponse<IProfile>>({
        path: `/profile/friend/recommendations`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Скрыть заявку в друзья.
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
   * const result = await client.endpoints.profileFriends.hide(
   *   profileId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async hide(
    id: number,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/profile/friend/request/hide/${id}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Удалить заявку или прекратить дружбу с профилем.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link RemoveFriendRequestResult}.
   *
   * @param id - ID профиля.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IFriendStatusResponse} с кодами {@link RemoveFriendRequestResult}.
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
   * const result = await client.endpoints.profileFriends.remove(
   *   profileId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.friend_status);
   */
  public async remove(
    id: number,
    options: IRequestOptions = {},
  ): Promise<IFriendStatusResponse<RemoveFriendRequestResult>> {
    return (
      await this._client.http.request<
        IFriendStatusResponse<RemoveFriendRequestResult>
      >({
        path: `/profile/friend/request/remove/${id}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: RemoveFriendRequestResult,
        successCodes: [0, 2, 3],
        ...options,
      })
    ).data;
  }

  /**
   * Отправить заявку в друзья или подтвердить встречную заявку.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link SendFriendRequestResult}.
   *
   * @param id - ID профиля.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IFriendStatusResponse} с кодами {@link SendFriendRequestResult}.
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
   * const result = await client.endpoints.profileFriends.send(
   *   profileId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.friend_status);
   */
  public async send(
    id: number,
    options: IRequestOptions = {},
  ): Promise<IFriendStatusResponse<SendFriendRequestResult>> {
    return (
      await this._client.http.request<
        IFriendStatusResponse<SendFriendRequestResult>
      >({
        path: `/profile/friend/request/send/${id}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: SendFriendRequestResult,
        successCodes: [0, 2, 3],
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу входящих или исходящих заявок в друзья.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param type - Направление заявок: "in" — входящие, "out" — исходящие.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IProfile}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const type = "in";
   * const page = 0;
   *
   * const result = await client.endpoints.profileFriends.requests(
   *   type,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async requests(
    type: "in" | "out",
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IProfile>> {
    return (
      await this._client.http.request<IPageableResponse<IProfile>>({
        path: `/profile/friend/requests/${type}/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить последние входящие или исходящие заявки в друзья.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param type - Направление заявок: "in" — входящие, "out" — исходящие.
   * @param count - Количество возвращаемых заявок. По умолчанию: 5.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IProfile}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const type = "in";
   * const count = 5;
   *
   * const result = await client.endpoints.profileFriends.requestsLast(
   *   type,
   *   count,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async requestsLast(
    type: "in" | "out",
    count: number = 5,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IProfile>> {
    return (
      await this._client.http.request<IPageableResponse<IProfile>>({
        path: `/profile/friend/requests/${type}/last`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          count: count,
        },
        ...options,
      })
    ).data;
  }
}
