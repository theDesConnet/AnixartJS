import type { CommonResult } from "../models";
import type { IRequestOptions } from "../core/http/httpTypes";
import { Anixart } from "../core/anixartClient";
import {
  BookmarksImportResult,
  IBookmarksImportRequest,
  IResponse,
} from "../models";

export class Import {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Импортировать релизы в списки закладок текущего профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link BookmarksImportResult}.
   *
   * @param data - Данные запроса — {@link IBookmarksImportRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link BookmarksImportResult}.
   *
   * @remarks
   * IMPORTER_NAME — заглушка: укажите имя используемого импортёра.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IBookmarksImportRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const bookmarks: IBookmarksImportRequest = {
   *   selected_importer_name: "IMPORTER_NAME",
   *   watching: [123],
   *   plans: [],
   *   completed: [456],
   *   dropped: [],
   *   holdOn: [],
   * };
   *
   * const result = await client.endpoints.import.bookmarks(
   *   bookmarks,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async bookmarks(
    data: IBookmarksImportRequest,
    options: IRequestOptions = {},
  ): Promise<IResponse<BookmarksImportResult>> {
    return (
      await this._client.http.request<IResponse<BookmarksImportResult>>({
        path: `/import/bookmarks`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: BookmarksImportResult,
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Проверить статус импорта закладок.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link BookmarksImportResult}.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link BookmarksImportResult}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.import.status(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async status(options: IRequestOptions = {}): Promise<IResponse<BookmarksImportResult>> {
    return (
      await this._client.http.request<IResponse<BookmarksImportResult>>({
        path: `/import/status`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: BookmarksImportResult,
        ...options,
      })
    ).data;
  }
}
