/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

/** HTTP-методы, которые принимает клиент. */
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS";

/** Значение параметра; null и undefined не отправляются. */
export type HttpParameter =
  | string
  | number
  | boolean
  | null
  | undefined;

/** Параметры query или формы. Перед отправкой значения приводятся к строкам. */
export type HttpParameters = Record<string, HttpParameter>;

/** Формат тела определяет сериализацию и Content-Type запроса. */
export type HttpBody<T = unknown> =
  | {
      type: "JSON";
      data: T;
    }
  | {
      type: "URL-Encoded";
      data: HttpParameters;
    }
  | {
      type: "Image";
      data: {
        /** Имя файла в multipart-форме. */
        name: string;
        file: Buffer;
        /** Имя поля формы с файлом, например image; это не MIME-тип. */
        type: string;
        /** Своя граница multipart; без неё form-data создаст границу сам. */
        boundary?: string;
        /** Дополнительные текстовые поля формы. */
        fields?: Record<string, string>;
      };
    };

/** Anixart использует токен клиента в query, Bearer — переданный токен в заголовке. */
export type HttpAuthType = {
    type: "Anixart",
    /** Проверить наличие токена до отправки запроса. */
    required?: boolean
} | {
    type: "Bearer",
    token: string
};

/** Параметры, которые можно переопределить для отдельного вызова API. */
export interface IRequestOptions {
  /** Таймаут в миллисекундах; без значения таймаут клиента не задаётся. */
  timeoutMs?: number;
  /** Внешний сигнал отмены, работающий вместе с timeoutMs. */
  signal?: AbortSignal;
  /** Переопределяет настройку клиента для проверки поля code. */
  throwOnAnixartError?: boolean;
  /** Число N для заголовка API-Version: vN. */
  apiVersion?: number;
}

/** Внутреннее описание запроса, которое собирают методы разделов API. */
export interface HttpRequest<T = unknown> extends IRequestOptions {
  method: HttpMethod;
  path: string;

  query?: HttpParameters;
  body?: HttpBody<T>;

  auth?: HttpAuthType;
  /** Адрес сервиса для этого запроса вместо адреса API клиента. */
  customBaseUrl?: string;
  /** Успешные значения поля code в JSON, по умолчанию [0]. */
  successCodes?: number[];

  /** Имена кодов конкретного метода для сообщения AnixartError. */
  resultEnum?: Record<number, string>;

  /** Эти заголовки перезаписывают одноимённые заголовки клиента. */
  headers?: Record<string, string | number | boolean>;
}

/** HTTP-статус и заголовки вместе с разобранным JSON. */
export interface HttpResponse<T = unknown> {
  status: number;
  headers: Headers;
  data: T;
}
