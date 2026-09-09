import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import { IPageableResponse, IRelease, IResponse } from "../../models";

export class History {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить страницу истории просмотра.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IRelease}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.history.get(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async get(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IRelease>> {
    return (
      await this._client.http.request<IPageableResponse<IRelease>>({
        path: `/history/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Добавить просмотр серии в историю.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param releaseId - ID релиза.
   * @param sourceId - ID источника серий.
   * @param position - Позиция серии в источнике; значение 0 передаётся без изменений.
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
   * const sourceId = 123;
   * const position = 0;
   *
   * const result = await client.endpoints.history.add(
   *   releaseId,
   *   sourceId,
   *   position,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async add(
    releaseId: number,
    sourceId: number,
    position: number,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/history/add/${releaseId}/${sourceId}/${position}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Удалить релиз из истории просмотра.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param releaseId - ID релиза.
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
   *
   * const result = await client.endpoints.history.delete(
   *   releaseId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async delete(
    releaseId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse> {
    return (
      await this._client.http.request<IResponse>({
        path: `/history/delete/${releaseId}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }
}
