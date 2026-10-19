import type { IRequestOptions } from "../core/http/httpTypes";
import { Anixart } from "../core/anixartClient";
import { AchievementResult, IAchievementPreviewResponse, ILatestArticleResponse, IResponse } from "../models";

export class Achievement {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить достижения
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param code - Код достижения
   * @param badgeId - ID значка
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодом {@link AchivementResult}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const code = "CODE";
   *
   * const result = await client.endpoints.achievement.get(
   *   code,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async get(
    code: string,
    badgeId?: number,
    options: IRequestOptions = {},
  ): Promise<IResponse<AchievementResult>> {
    return (
      await this._client.http.request<IResponse<AchievementResult>>({
        path: `/achievement/get/${code}`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          badge_id: badgeId,
        },
        resultEnum: AchievementResult,
        ...options,
      })
    ).data;
  }

  /**
   * Получить ID последней статьи ленты.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns ID последней статьи — {@link ILatestArticleResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.feed.latestArticle(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.articleId);
   */
  public async preview(code: string, options: IRequestOptions = {}): Promise<IAchievementPreviewResponse> {
    return (
      await this._client.http.request<IAchievementPreviewResponse>({
        path: `/achievement/preview/${code}`,
        method: "GET",
        ...options,
      })
    ).data;
  }
}
