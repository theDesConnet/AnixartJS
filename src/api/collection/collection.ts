import type { CommonResult } from "../../models";
import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  CollectionResult,
  ICollection,
  ICollectionResponse,
  IPageableResponse,
  IRelease,
} from "../../models";

export class Collection {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить коллекцию по ID.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link CollectionResult}.
   *
   * @param collectionId - ID коллекции.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Коллекция и дополнительные данные ответа — {@link ICollectionResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const collectionId = 123;
   *
   * const result = await client.endpoints.collection.get(
   *   collectionId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.collection);
   */
  public async get(
    collectionId: number,
    options: IRequestOptions = {},
  ): Promise<ICollectionResponse> {
    return (
      await this._client.http.request<ICollectionResponse>({
        path: `/collection/${collectionId}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: CollectionResult,
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу коллекций с выбранной сортировкой.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param where - Режим выборки коллекций.
   * @param sort - Порядок сортировки.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link ICollection}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   * const where = 0;
   * const sort = 0;
   *
   * const result = await client.endpoints.collection.all(
   *   page,
   *   where,
   *   sort,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async all(
    page: number = 0,
    where: number,
    sort: number,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<ICollection>> {
    return (
      await this._client.http.request<IPageableResponse<ICollection>>({
        path: `/collection/all/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          previous_page: page == 0 ? 0 : page--,
          where: where,
          sort: sort,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу коллекций профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param profileId - ID профиля.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link ICollection}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const profileId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.collection.profileCollections(
   *   profileId,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async profileCollections(
    profileId: number,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<ICollection>> {
    return (
      await this._client.http.request<IPageableResponse<ICollection>>({
        path: `/collection/all/profile/${profileId}/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу коллекций, содержащих релиз.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param releaseId - ID релиза.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param sort - Порядок сортировки.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link ICollection}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const releaseId = 123;
   * const page = 0;
   * const sort = 0;
   *
   * const result = await client.endpoints.collection.releaseCollections(
   *   releaseId,
   *   page,
   *   sort,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async releaseCollections(
    releaseId: number,
    page: number = 0,
    sort: number,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<ICollection>> {
    return (
      await this._client.http.request<IPageableResponse<ICollection>>({
        path: `/collection/all/release/${releaseId}/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          sort: sort,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу релизов коллекции.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param collectionId - ID коллекции.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IRelease}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const collectionId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.collection.releases(
   *   collectionId,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async releases(
    collectionId: number,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IRelease>> {
    return (
      await this._client.http.request<IPageableResponse<IRelease>>({
        path: `/collection/${collectionId}/releases/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }
}
