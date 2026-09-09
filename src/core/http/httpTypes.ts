export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS";

export type HttpParameter =
  | string
  | number
  | boolean
  | null
  | undefined;

export type HttpParameters = Record<string, HttpParameter>;

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
        name: string;
        file: Buffer;
        type: string;
        boundary?: string;
        fields?: Record<string, string>;
      };
    };

export type HttpAuthType = {
    type: "Anixart",
    required?: boolean
} | {
    type: "Bearer",
    token: string
};

export interface IRequestOptions {
  timeoutMs?: number;
  signal?: AbortSignal;
  throwOnAnixartError?: boolean;
  apiVersion?: number;
}

export interface HttpRequest<T = unknown> extends IRequestOptions {
  method: HttpMethod;
  path: string;

  query?: HttpParameters;
  body?: HttpBody<T>;

  auth?: HttpAuthType;
  customBaseUrl?: string;
  successCodes?: number[];

  resultEnum?: Record<number, string>;

  headers?: HeadersInit;
}

export interface HttpResponse<T = unknown> {
  status: number;
  headers: Headers;
  data: T;
}
