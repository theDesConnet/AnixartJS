import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import { IFilterRequest, IPageableResponse, IRelease } from "../../models";

export class Filter {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Найти релизы по фильтру.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param data - Данные запроса — {@link IFilterRequest}.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param extendedMode - Запрашивать расширенные данные релиза. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IRelease}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IFilterRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const filters: IFilterRequest = {
   *   start_year: 2020,
   *   end_year: 2025,
   *   country: "Япония",
   * };
   * const page = 0;
   *
   * const result = await client.endpoints.filter.get(
   *   filters,
   *   page,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async get(
    data: IFilterRequest,
    page: number = 0,
    extendedMode?: boolean,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IRelease>> {
    return (
      await this._client.http.request<IPageableResponse<IRelease>>({
        path: `/filter/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        query: {
          extended_mode: extendedMode,
        },
        ...options,
      })
    ).data;
  }
}
