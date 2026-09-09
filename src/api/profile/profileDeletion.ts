import type { CommonResult } from "../../models";
import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import { IProfileDeletionResponse, ProfileDeletionResult } from "../../models";

export class ProfileDeletion {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Отменить запрос на удаление аккаунта.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ProfileDeletionResult}.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Сроки удаления аккаунта — {@link IProfileDeletionResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.profileDeletion.cancel(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.delete_at);
   */
  public async cancel(
    options: IRequestOptions = {},
  ): Promise<IProfileDeletionResponse> {
    return (
      await this._client.http.request<IProfileDeletionResponse>({
        path: `/profile/deletion/cancel`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ProfileDeletionResult,
        ...options,
      })
    ).data;
  }

  /**
   * Запросить удаление аккаунта с подтверждением паролем.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ProfileDeletionResult}.
   *
   * @param password - Текущий пароль аккаунта.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Сроки удаления аккаунта — {@link IProfileDeletionResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const password = "YOUR_PASSWORD";
   *
   * const result = await client.endpoints.profileDeletion.request(
   *   password,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.delete_at);
   */
  public async request(
    password: string,
    options: IRequestOptions = {},
  ): Promise<IProfileDeletionResponse> {
    return (
      await this._client.http.request<IProfileDeletionResponse>({
        path: `/profile/deletion/request`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "URL-Encoded",
          data: {
            password: password,
          },
        },
        resultEnum: ProfileDeletionResult,
        ...options,
      })
    ).data;
  }

  /**
   * Получить статус и сроки удаления аккаунта.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ProfileDeletionResult}.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Сроки удаления аккаунта — {@link IProfileDeletionResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.profileDeletion.status(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.delete_at);
   */
  public async status(
    options: IRequestOptions = {},
  ): Promise<IProfileDeletionResponse> {
    return (
      await this._client.http.request<IProfileDeletionResponse>({
        path: `/profile/deletion/status`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: ProfileDeletionResult,
        ...options,
      })
    ).data;
  }
}
