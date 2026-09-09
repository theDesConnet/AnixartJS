import type { CommonResult } from "../../models";
import type { IRequestOptions } from "../../core/http/httpTypes";
import { Anixart } from "../../core/anixartClient";
import { IPageableResponse, IProfileRole } from "../../models";

export class ProfileRoleList {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить страницу профилей с выбранной ролью.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param roleId - ID роли.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IProfileRole}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const roleId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.profileRoleList.all(
   *   roleId,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async all(
    roleId: number,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IProfileRole>> {
    return (
      await this._client.http.request<IPageableResponse<IProfileRole>>({
        path: `/role/all/${page}/${roleId}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }
}
