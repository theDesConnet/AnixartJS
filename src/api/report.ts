import type { CommonResult } from "../models";
import type { IRequestOptions } from "../core/http/httpTypes";
import { Anixart } from "../core/anixartClient";
import {
  IReportReason,
  IReportRequest,
  IResponse,
  IReportPayloadMap,
  ReportResult,
  ReportType,
} from "../models";

export class Report {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить допустимые причины жалобы для выбранного типа объекта.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param type - Тип объекта жалобы — {@link ReportType}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Список результатов — {@link IReportReason}[].
   *
   * @example
   * import { Anixart, ReportType } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const type = ReportType.Article;
   *
   * const result = await client.endpoints.report.reasons(
   *   type,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result);
   */
  public async reasons(
    type: ReportType,
    options: IRequestOptions = {},
  ): Promise<IReportReason[]> {
    return (
      await this._client.http.request<IReportReason[]>({
        path: `/report/${type}/reasons`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Отправить жалобу на объект выбранного типа.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ReportResult}.
   *
   * @param type - Тип объекта жалобы — {@link ReportType}.
   * @param data - Данные запроса — {@link IReportRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link ReportResult}.
   *
   * @remarks
   
   * Получите допустимый reason через report.reasons(type). Для ReportType.Episode передаётся объект серии, для остальных типов — ID.
   *
   * @example
   * import { Anixart, ReportType } from "anixartjs";
   * import type { IReportRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const type = ReportType.Release;
   * const report: IReportRequest = {
   *   entity_id: 123,
   *   message: "Описание обнаруженной проблемы",
   *   reason: 1,
   * };
   *
   * const result = await client.endpoints.report.send(
   *   type,
   *   report,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async send<T extends ReportType>(
    type: T,
    data: IReportRequest<IReportPayloadMap[T]>,
    options: IRequestOptions = {},
  ): Promise<IResponse<ReportResult>> {
    return (
      await this._client.http.request<IResponse<ReportResult>>({
        path: `/report/${type}`,
        method: "POST",
        body: {
          type: "JSON",
          data,
        },
        auth: { type: "Anixart" },
        resultEnum: ReportResult,
        ...options,
      })
    ).data;
  }
}
