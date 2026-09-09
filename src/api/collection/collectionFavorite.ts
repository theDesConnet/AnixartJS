import type { CommonResult } from "../../models";
import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  FavoriteCollectionAddResult,
  FavoriteCollectionDeleteResult,
  ICollection,
  IPageableResponse,
  IResponse,
} from "../../models";

export class CollectionFavorite {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Добавить коллекцию в избранное.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link FavoriteCollectionAddResult}.
   *
   * @param collectionId - ID коллекции.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link FavoriteCollectionAddResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const collectionId = 123;
   *
   * const result = await client.endpoints.collectionFavorite.add(
   *   collectionId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async add(
    collectionId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse<FavoriteCollectionAddResult>> {
    return (
      await this._client.http.request<IResponse<FavoriteCollectionAddResult>>({
        path: `/collectionFavorite/add/${collectionId}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: FavoriteCollectionAddResult,
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу избранных коллекций.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link ICollection}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.collectionFavorite.get(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async get(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<ICollection>> {
    return (
      await this._client.http.request<IPageableResponse<ICollection>>({
        path: `/collectionFavorite/all/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Удалить коллекцию из избранного.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link FavoriteCollectionDeleteResult}.
   *
   * @param collectionId - ID коллекции.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link FavoriteCollectionDeleteResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const collectionId = 123;
   *
   * const result = await client.endpoints.collectionFavorite.delete(
   *   collectionId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async delete(
    collectionId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse<FavoriteCollectionDeleteResult>> {
    return (
      await this._client.http.request<
        IResponse<FavoriteCollectionDeleteResult>
      >({
        path: `/collectionFavorite/delete/${collectionId}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: FavoriteCollectionDeleteResult,
        ...options,
      })
    ).data;
  }
}
