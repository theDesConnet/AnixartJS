import type { CommonResult } from "../models";
import type { IRequestOptions } from "../core/http/httpTypes";
import { Anixart } from "../core/anixartClient";
import {
  BookmarkExportResult,
  IBookmarksExportRequest,
  IBookmarksExportResponse,
} from "../models";

export class Export {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Экспортировать выбранные списки закладок текущего профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link BookmarkExportResult}.
   *
   * @param data - Данные запроса — {@link IBookmarksExportRequest}.
   * @param sort - Порядок сортировки. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Экспортированные релизы — {@link IBookmarksExportResponse}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart, BookmarkType } from "anixartjs";
   * import type { IBookmarksExportRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const bookmarks: IBookmarksExportRequest = {
   *   bookmarksExportProfileLists: [BookmarkType.Watching],
   * };
   *
   * const result = await client.endpoints.export.bookmarks(
   *   bookmarks,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.releases);
   */
  public async bookmarks(
    data: IBookmarksExportRequest,
    sort?: number,
    options: IRequestOptions = {},
  ): Promise<IBookmarksExportResponse> {
    return (
      await this._client.http.request<IBookmarksExportResponse>({
        path: `/export/bookmarks`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: BookmarkExportResult,
        body: {
          type: "JSON",
          data: data,
        },
        query: {
          sort,
        },
        ...options,
      })
    ).data;
  }
}
