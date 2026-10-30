/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

import { Endpoints } from "./endpoints";
import { HttpClient } from "./http/httpClient";

/** Настройки подключения и обработки ошибок API. */
export interface IAnixartOptions {
  /** Адрес API. По умолчанию — https://api.anixsekai.com. */
  baseUrl?: string;
  /** Токен профиля; для публичных методов не нужен. */
  token?: string;
  /** Заголовок User-Agent для всех запросов клиента. */
  userAgent?: string;
  /** Бросать AnixartError при неуспешном code в ответе. По умолчанию true. */
  throwOnAnixartError?: boolean;
}

/** Список адресов из внешнего urls.json, сгруппированный по ключам. */
export interface IAnixartEndpointUrls {
  [key: string]: {
    api_url: string;
    should_use_mirror_urls: boolean;
  };
}

const DEFAULT_BASE_URL = "https://api.anixsekai.com";
const DEFAULT_USER_AGENT =
  "AnixartApp/10.0-26090418 (Android 14; SDK 34; x86_64; OnePlus NE2210; ru)";
const API_ENDPOINTS_URL =
  "https://raw.githubusercontent.com/AnixHelper/pages/refs/heads/main/urls.json";

/** Клиент API: общее подключение и доступ к разделам через endpoints. */
export class Anixart {
  public http: HttpClient;
  public endpoints: Endpoints;
  constructor(private options: IAnixartOptions) {
    this.http = new HttpClient(
      options.baseUrl ?? DEFAULT_BASE_URL,
      options.userAgent ?? DEFAULT_USER_AGENT,
      options.throwOnAnixartError ?? true,
      options.token
    );
    this.endpoints = new Endpoints(this);
  }

  /** Загружает список адресов. При неуспешном HTTP-статусе возвращает null. */
  public static async getEndpointUrls(): Promise<IAnixartEndpointUrls | null> {
    const result = await fetch(API_ENDPOINTS_URL);

    if (!result.ok) return null;
    
    return result.json();
  }

  /** Меняет токен для следующих запросов. undefined сбрасывает авторизацию. */
  public setToken(token: string | undefined) {
    this.http.setToken(token);
  }

  /** Текущий адрес API, в том числе после смены зеркала. */
  public getBaseUrl(): string {
    return this.http.getBaseUrl();
  }
  /** Переключает адрес API для всех разделов этого клиента. */
  public setBaseUrl(baseUrl: string) {
    this.http.setBaseUrl(baseUrl);
  }
}
