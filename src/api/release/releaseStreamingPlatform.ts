import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import { IPageableResponse, IReleaseStreamingPlatform } from "../../models";

export class ReleaseStreamingPlatform {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить платформы, на которых доступен релиз.
   *
   * @param releaseId - ID релиза.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IReleaseStreamingPlatform}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const releaseId = 123;
   *
   * const result = await client.endpoints.releaseStreamingPlatform.get(
   *   releaseId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async get(
    releaseId: number,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IReleaseStreamingPlatform>> {
    return (
      await this._client.http.request<
        IPageableResponse<IReleaseStreamingPlatform>
      >({
        path: `/release/streaming/platform/${releaseId}`,
        method: "GET",
        ...options,
      })
    ).data;
  }
}
