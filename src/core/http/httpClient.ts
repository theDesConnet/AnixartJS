/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

import { AnixartError } from "../errors/anixartError";
import { HttpError } from "../errors/httpError";
import type { HttpRequest, HttpResponse } from "./httpTypes";
import { CommonResult } from "../../models/common/enums";
import FormData from "form-data";

/** Подготовка запросов, разбор JSON и проверка кодов результата API. */
export class HttpClient {
  constructor(
    private _baseUrl: string,
    private readonly _userAgent: string,
    private readonly _throwOnAnixartError: boolean,
    private _token?: string,
  ) { }

  private hasResultCode(value: unknown): value is { code: number } {
    return (
      typeof value === "object" &&
      value !== null &&
      "code" in value &&
      typeof value.code === "number"
    );
  }

  public setBaseUrl(baseUrl: string) {
    this._baseUrl = baseUrl;
  }
  public getBaseUrl(): string {
    return this._baseUrl;
  }

  public setToken(token: string | undefined) {
    this._token = token;
  }

  private getResultCodeName(
    code: number,
    resultEnum?: Record<number, string>,
  ): string {
    return (
      CommonResult[code as CommonResult] ?? resultEnum?.[code] ?? "Unknown"
    );
  }

  /** Выполняет запрос. Тип T описывает ответ, но не проверяет его структуру. */
  async request<T>(request: HttpRequest): Promise<HttpResponse<T>> {
    const url = new URL(request.path, request.customBaseUrl ?? this._baseUrl);

    let body: BodyInit | undefined;
    let responseData: unknown;

    const headers: Record<string, string> = {
      "User-Agent": this._userAgent,
    };

    if (request.apiVersion) headers["API-Version"] = `v${request.apiVersion}`;

    if (request.query) {
      for (const [key, value] of Object.entries(request.query)) {
        if (value === undefined || value === null) continue;

        url.searchParams.set(key, String(value));
      }
    }

    if (request.auth) {
      switch (request.auth.type) {
        case "Anixart":
          // Anixart принимает токен в query, а не в заголовке Authorization.
          if (request.auth.required && !this._token) {
            throw new AnixartError(
              "Anixart token is required for this request",
              request.path,
              401,
              "Unauthorized"
            );
          }

          if (this._token) {
            url.searchParams.set("token", this._token);
          }
          break;

        case "Bearer":
          headers["Authorization"] = `Bearer ${request.auth.token}`;
          break;
      }
    }

    if (request.body) {
      switch (request.body.type) {
        case "JSON":
          headers["Content-Type"] = "application/json";
          body = JSON.stringify(request.body.data);
          break;

        case "URL-Encoded":
          headers["Content-Type"] = "application/x-www-form-urlencoded";
          const searchParams = new URLSearchParams();
          for (const [key, value] of Object.entries(request.body.data)) {
            if (value === undefined || value === null) continue;
            searchParams.set(key, String(value));
          }
          body = searchParams;
          break;

        case "Image":
          const formData = new FormData();

          if (request.body.data.boundary)
            formData.setBoundary(request.body.data.boundary);

          formData.append(request.body.data.type, request.body.data.file, {
            filename: request.body.data.name,
          });

          for (const [key, value] of Object.entries(
            request.body.data.fields ?? {},
          )) {
            formData.append(key, value);
          }

          headers["Content-Type"] =
            `multipart/form-data; boundary=${formData.getBoundary()}`;
          headers["Content-Length"] = String(formData.getLengthSync());
          // fetch получает готовое тело: объект из пакета form-data ему не подходит.
          body = new Uint8Array(await formData.getBuffer());
          break;
      }
    }

    const mergedHeaders = new Headers(headers);

    // Заголовки конкретного запроса имеют приоритет над собранными выше.
    for (const [name, value] of Object.entries(request.headers ?? {})) {
      mergedHeaders.set(name, String(value));
    }

    const timeoutSignal =
      request.timeoutMs === undefined
        ? undefined
        : AbortSignal.timeout(request.timeoutMs);
    // Запрос отменяется как по таймауту, так и по внешнему сигналу.
    const signal = timeoutSignal
      ? request.signal
        ? AbortSignal.any([request.signal, timeoutSignal])
        : timeoutSignal
      : request.signal;

    const response = await fetch(url, {
      method: request.method,
      headers: mergedHeaders,
      body: body ?? null,
      ...(signal ? { signal } : {}),
    });

    responseData = await response.text();

    if (String(responseData).trim() == "") {
      throw new HttpError(
        "Endpoint does not exists",
        response.status,
        responseData,
      );
    }

    if (!response.ok) {
      throw new HttpError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        responseData,
      );
    }

    try {
      const result = JSON.parse(String(responseData)) as T;
      // HTTP 200 не гарантирует успех: у API есть отдельное поле code.
      const successCodes = request.successCodes ?? [0];

      if (
        this.hasResultCode(result) &&
        !successCodes.includes(result.code) &&
        (request.throwOnAnixartError ?? this._throwOnAnixartError ?? true)
      ) {
        const codeName = this.getResultCodeName(
          result.code,
          request.resultEnum,
        );

        throw new AnixartError(
          `Anixart API Error: ${codeName} (${result.code})`,
          request.path,
          result.code ?? null,
          codeName,
          result,
        );
      }

      return {
        status: response.status,
        headers: response.headers,
        data: result,
      };
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new HttpError(
          "Failed to parse response as JSON",
          response.status,
          responseData,
        );
      }

      throw error;
    }
  }
}
