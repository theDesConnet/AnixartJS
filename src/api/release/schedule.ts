import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import { IScheduleResponse } from "../../models";

export class Schedule {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить расписание выхода релизов.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Расписание по дням недели — {@link IScheduleResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({});
   *
   * const result = await client.endpoints.schedule.get(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.monday);
   */
  public async get(options: IRequestOptions = {}): Promise<IScheduleResponse> {
    return (
      await this._client.http.request<IScheduleResponse>({
        path: `/schedule`,
        method: "GET",
        ...options,
      })
    ).data;
  }
}
