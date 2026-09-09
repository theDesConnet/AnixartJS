import type { IRequestOptions } from "../core/http/httpTypes";
import { Anixart } from "../core/anixartClient";
import { IResponse, ITypeChannelResponse, ITypeResponse } from "../models";

export class Type {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить канал и статьи, связанные с озвучкой.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param typeId - ID озвучки.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Канал и дополнительные данные ответа — {@link ITypeChannelResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const typeId = 123;
   *
   * const result = await client.endpoints.type.channel(
   *   typeId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.channel);
   */
  public async channel(
    typeId: number,
    options: IRequestOptions = {},
  ): Promise<ITypeChannelResponse> {
    return (
      await this._client.http.request<ITypeChannelResponse>({
        path: `/type/${typeId}/channel`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Скрыть виджет озвучки.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param typeId - ID озвучки.
   * @param permanent - Скрыть виджет постоянно при true. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const typeId = 123;
   *
   * const result = await client.endpoints.type.hideWidget(
   *   typeId,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async hideWidget(
    typeId: number,
    permanent?: boolean,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/type/widget/hide/${typeId}`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          permanent: permanent ?? false,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Закрепить озвучку для релиза.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param releaseId - ID релиза.
   * @param typeId - ID озвучки.
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
   * const releaseId = 123;
   * const typeId = 123;
   *
   * const result = await client.endpoints.type.pin(
   *   releaseId,
   *   typeId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async pin(
    releaseId: number,
    typeId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/type/pin/${releaseId}/${typeId}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить список озвучек.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Доступные озвучки — {@link ITypeResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.type.all(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.types);
   */
  public async all(options: IRequestOptions = {}): Promise<ITypeResponse> {
    return (
      await this._client.http.request<ITypeResponse>({
        path: "/type/all",
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Вернуть скрытый виджет озвучки.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param typeId - ID озвучки.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const typeId = 123;
   *
   * const result = await client.endpoints.type.unhideWidget(
   *   typeId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async unhideWidget(
    typeId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/type/widget/unhide/${typeId}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Снять закрепление озвучки для релиза.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param releaseId - ID релиза.
   * @param typeId - ID озвучки.
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
   * const releaseId = 123;
   * const typeId = 123;
   *
   * const result = await client.endpoints.type.unpin(
   *   releaseId,
   *   typeId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async unpin(
    releaseId: number,
    typeId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/type/unpin/${releaseId}/${typeId}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }
}
