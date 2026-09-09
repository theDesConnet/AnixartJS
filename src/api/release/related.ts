import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import { IPageableResponse, IRelease } from "../../models";

export class Related {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить страницу релизов из связанной группы.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param relaredId - ID связанной группы релизов.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IRelease}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const relatedGroupId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.related.get(
   *   relatedGroupId,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async get(
    relaredId: number,
    page: number = 0,
    options: IRequestOptions = {
      apiVersion: 2,
    },
  ): Promise<IPageableResponse<IRelease>> {
    return (
      await this._client.http.request<IPageableResponse<IRelease>>({
        path: `/related/${relaredId}/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }
}
