import type { CommonResult } from "../../models";
import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import {
  CollectionCreateEditResult,
  CollectionDeleteResult,
  CollectionEditImageResult,
  ICollectionCreateEditRequest,
  ICollectionCreateEditResponse,
  ICollectionEditImageResponse,
  IPageableResponse,
  IRelease,
  IResponse,
  ReleaseAddCollectionResult,
} from "../../models";

export class CollectionMy {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Создать коллекцию.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link CollectionCreateEditResult}.
   *
   * @param data - Данные запроса — {@link ICollectionCreateEditRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Коллекция и дополнительные данные ответа — {@link ICollectionCreateEditResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ICollectionCreateEditRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const collection: ICollectionCreateEditRequest = {
   *   title: "Что посмотреть на выходных",
   *   description: "Подборка любимых приключенческих релизов",
   *   is_private: false,
   *   releases: [123, 456],
   * };
   *
   * const result = await client.endpoints.collectionMy.create(
   *   collection,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.collection);
   */
  public async create(
    data: ICollectionCreateEditRequest,
    options: IRequestOptions = {},
  ): Promise<ICollectionCreateEditResponse> {
    return (
      await this._client.http.request<ICollectionCreateEditResponse>({
        path: `/collectionMy/create`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: CollectionCreateEditResult,
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Изменить собственную коллекцию.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link CollectionCreateEditResult}.
   *
   * @param collectionId - ID коллекции.
   * @param data - Данные запроса — {@link ICollectionCreateEditRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Коллекция и дополнительные данные ответа — {@link ICollectionCreateEditResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { ICollectionCreateEditRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const collectionId = 123;
   * const collection: ICollectionCreateEditRequest = {
   *   title: "Что посмотреть на выходных",
   *   description: "Подборка любимых приключенческих релизов",
   *   is_private: false,
   *   releases: [123, 456],
   * };
   *
   * const result = await client.endpoints.collectionMy.edit(
   *   collectionId,
   *   collection,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.collection);
   */
  public async edit(
    collectionId: number,
    data: ICollectionCreateEditRequest,
    options: IRequestOptions = {},
  ): Promise<ICollectionCreateEditResponse> {
    return (
      await this._client.http.request<ICollectionCreateEditResponse>({
        path: `/collectionMy/edit/${collectionId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: CollectionCreateEditResult,
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Загрузить изображение коллекции.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link CollectionEditImageResult}.
   *
   * @param collectionId - ID коллекции.
   * @param image - Содержимое изображения в Buffer.
   * @param name - Имя файла изображения, включая расширение. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Адрес загруженного изображения — {@link ICollectionEditImageResponse}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   
   *
   * @example
   * import { readFile } from "node:fs/promises";
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const collectionId = 123;
   * const image = await readFile("./cover.jpg");
   *
   * const result = await client.endpoints.collectionMy.editImage(
   *   collectionId,
   *   image,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.url);
   */
  public async editImage(
    collectionId: number,
    image: Buffer,
    name?: string,
    options: IRequestOptions = {},
  ): Promise<ICollectionEditImageResponse> {
    return (
      await this._client.http.request<ICollectionEditImageResponse>({
        path: `/collectionMy/editImage/${collectionId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: CollectionEditImageResult,
        body: {
          type: "Image",
          data: {
            name: name ?? "image.jpg",
            file: image,
            type: "image",
            fields: {
              name: "image",
            },
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Удалить собственную коллекцию.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link CollectionDeleteResult}.
   *
   * @param collectionId - ID коллекции.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link CollectionDeleteResult}.
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
   * const result = await client.endpoints.collectionMy.delete(
   *   collectionId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async delete(
    collectionId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse<CollectionDeleteResult>> {
    return (
      await this._client.http.request<IResponse<CollectionDeleteResult>>({
        path: `/collectionMy/delete/${collectionId}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: CollectionDeleteResult,
        ...options,
      })
    ).data;
  }

  /**
   * Добавить релиз в коллекцию.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ReleaseAddCollectionResult}.
   *
   * @param collectionId - ID коллекции.
   * @param releaseId - ID релиза.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link ReleaseAddCollectionResult}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const collectionId = 123;
   * const releaseId = 123;
   *
   * const result = await client.endpoints.collectionMy.releaseAdd(
   *   collectionId,
   *   releaseId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async releaseAdd(
    collectionId: number,
    releaseId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse<ReleaseAddCollectionResult>> {
    return (
      await this._client.http.request<IResponse<ReleaseAddCollectionResult>>({
        path: `/collectionMy/release/add/${collectionId}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: ReleaseAddCollectionResult,
        query: {
          release_id: releaseId,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить релизы коллекции для редактирования.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param collectionId - ID коллекции.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IRelease}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const collectionId = 123;
   *
   * const result = await client.endpoints.collectionMy.releases(
   *   collectionId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async releases(
    collectionId: number,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IRelease>> {
    return (
      await this._client.http.request<IPageableResponse<IRelease>>({
        path: `/collectionMy/${collectionId}/releases`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }
}
