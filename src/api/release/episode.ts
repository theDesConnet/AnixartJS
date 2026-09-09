import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  IDubbersResponse,
  IEpisodeResponse,
  IEpisodeTargetResponse,
  IEpisodeUpdate,
  IPageableResponse,
  IResponse,
  ISourcesResponse,
} from "../../models";

export class Episode {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить информацию о конкретной серии источника.
   *
   * @param releaseId - ID релиза.
   * @param sourceId - ID источника серий.
   * @param position - Позиция серии в источнике; значение 0 передаётся без изменений.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Серия — {@link IEpisodeTargetResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const releaseId = 123;
   * const sourceId = 123;
   * const position = 0;
   *
   * const result = await client.endpoints.episode.target(
   *   releaseId,
   *   sourceId,
   *   position,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.episode);
   */
  public async target(
    releaseId: number,
    sourceId: number,
    position: number,
    options: IRequestOptions = {},
  ): Promise<IEpisodeTargetResponse> {
    return (
      await this._client.http.request<IEpisodeTargetResponse>({
        path: `/episode/target/${releaseId}/${sourceId}/${position}`,
        method: "GET",
        ...options,
      })
    ).data;
  }

  /**
   * Получить серии релиза для выбранной озвучки и источника.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param releaseId - ID релиза.
   * @param dubberId - ID озвучки.
   * @param sourceId - ID источника серий.
   * @param sort - Порядок сортировки. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Серии релиза — {@link IEpisodeResponse}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const releaseId = 123;
   * const dubberId = 123;
   * const sourceId = 123;
   *
   * const result = await client.endpoints.episode.episodes(
   *   releaseId,
   *   dubberId,
   *   sourceId,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.episodes);
   */
  public async episodes(
    releaseId: number,
    dubberId: number,
    sourceId: number,
    sort?: number,
    options: IRequestOptions = {},
  ): Promise<IEpisodeResponse> {
    return (
      await this._client.http.request<IEpisodeResponse>({
        path: `/episode/${releaseId}/${dubberId}/${sourceId}`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          sort,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить источники серий для выбранной озвучки.
   *
   * @param releaseId - ID релиза.
   * @param dubberId - ID озвучки.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Источники серий — {@link ISourcesResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const releaseId = 123;
   * const dubberId = 123;
   *
   * const result = await client.endpoints.episode.sources(
   *   releaseId,
   *   dubberId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.sources);
   */
  public async sources(
    releaseId: number,
    dubberId: number,
    options: IRequestOptions = {},
  ): Promise<ISourcesResponse> {
    return (
      await this._client.http.request<ISourcesResponse>({
        path: `/episode/${releaseId}/${dubberId}`,
        method: "GET",
        ...options,
      })
    ).data;
  }

  /**
   * Получить доступные озвучки релиза.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param releaseId - ID релиза.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Доступные озвучки — {@link IDubbersResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const releaseId = 123;
   *
   * const result = await client.endpoints.episode.types(
   *   releaseId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.types);
   */
  public async types(
    releaseId: number,
    options: IRequestOptions = {},
  ): Promise<IDubbersResponse> {
    return (
      await this._client.http.request<IDubbersResponse>({
        path: `/episode/${releaseId}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Снять отметки просмотра серий источника.
   *
   * @param releaseId - ID релиза.
   * @param sourceId - ID источника серий.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок. Необязательный параметр.
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
   * const sourceId = 123;
   *
   * const result = await client.endpoints.episode.unwatch(
   *   releaseId,
   *   sourceId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async unwatch(
    releaseId: number,
    sourceId: number,
    options?: IRequestOptions,
  ): Promise<IResponse>;
  /**
   * Снять отметку просмотра конкретной серии.
   *
   * @param releaseId - ID релиза.
   * @param sourceId - ID источника серий.
   * @param position - Позиция серии в источнике; значение 0 передаётся без изменений.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок. Необязательный параметр.
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
   * const sourceId = 123;
   * const position = 0;
   *
   * const result = await client.endpoints.episode.unwatch(
   *   releaseId,
   *   sourceId,
   *   position,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async unwatch(
    releaseId: number,
    sourceId: number,
    position: number | undefined,
    options?: IRequestOptions,
  ): Promise<IResponse>;

  /**
   * Снять отметку просмотра серии или серий источника.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param releaseId - ID релиза.
   * @param sourceId - ID источника серий.
   * @param positionOrOptions - Позиция серии или опции запроса. Без позиции операция применяется к источнику. Необязательный параметр.
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
   * const releaseId = 123;
   * const sourceId = 123;
   *
   * const result = await client.endpoints.episode.unwatch(
   *   releaseId,
   *   sourceId,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async unwatch(
    releaseId: number,
    sourceId: number,
    positionOrOptions?: number | IRequestOptions,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    const position =
      typeof positionOrOptions === "number" ? positionOrOptions : undefined;
    const requestOptions =
      typeof positionOrOptions === "object" ? positionOrOptions : options;
    return (
      await this._client.http.request<IResponse>({
        path: `/episode/unwatch/${releaseId}/${sourceId}${position !== undefined ? `/${position}` : ""}`,
        method: "POST",
        auth: { type: "Anixart" },
        ...requestOptions,
      })
    ).data;
  }

  /**
   * Отметить просмотр серий источника.
   *
   * @param releaseId - ID релиза.
   * @param sourceId - ID источника серий.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок. Необязательный параметр.
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
   * const sourceId = 123;
   *
   * const result = await client.endpoints.episode.watch(
   *   releaseId,
   *   sourceId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async watch(
    releaseId: number,
    sourceId: number,
    options?: IRequestOptions,
  ): Promise<IResponse>;
  /**
   * Отметить просмотр конкретной серии.
   *
   * @param releaseId - ID релиза.
   * @param sourceId - ID источника серий.
   * @param position - Позиция серии в источнике; значение 0 передаётся без изменений.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок. Необязательный параметр.
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
   * const sourceId = 123;
   * const position = 0;
   *
   * const result = await client.endpoints.episode.watch(
   *   releaseId,
   *   sourceId,
   *   position,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async watch(
    releaseId: number,
    sourceId: number,
    position: number | undefined,
    options?: IRequestOptions,
  ): Promise<IResponse>;

  /**
   * Отметить просмотр серии или серий источника.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param releaseId - ID релиза.
   * @param sourceId - ID источника серий.
   * @param positionOrOptions - Позиция серии или опции запроса. Без позиции операция применяется к источнику. Необязательный параметр.
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
   * const releaseId = 123;
   * const sourceId = 123;
   *
   * const result = await client.endpoints.episode.watch(
   *   releaseId,
   *   sourceId,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async watch(
    releaseId: number,
    sourceId: number,
    positionOrOptions?: number | IRequestOptions,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    const position =
      typeof positionOrOptions === "number" ? positionOrOptions : undefined;
    const requestOptions =
      typeof positionOrOptions === "object" ? positionOrOptions : options;
    return (
      await this._client.http.request<IResponse>({
        path: `/episode/watch/${releaseId}/${sourceId}${position !== undefined ? `/${position}` : ""}`,
        method: "POST",
        auth: { type: "Anixart" },
        ...requestOptions,
      })
    ).data;
  }

  /**
   * Получить страницу обновлений серий релиза.
   *
   * @param releaseId - ID релиза.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IEpisodeUpdate}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const releaseId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.episode.updates(
   *   releaseId,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async updates(
    releaseId: number,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IEpisodeUpdate>> {
    return (
      await this._client.http.request<IPageableResponse<IEpisodeUpdate>>({
        path: `/episode/updates/${releaseId}/${page}`,
        method: "GET",
        ...options,
      })
    ).data;
  }
}
