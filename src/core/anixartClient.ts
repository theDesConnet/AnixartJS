import { Endpoints } from "./endpoints";
import { HttpClient } from "./http/httpClient";

export interface IAnixartOptions {
  baseUrl?: string;
  token?: string;
  userAgent?: string;
  throwOnAnixartError?: boolean;
}

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

  public static async getEndpointUrls(): Promise<IAnixartEndpointUrls | null> {
    const result = await fetch(API_ENDPOINTS_URL);

    if (!result.ok) return null;
    
    return result.json();
  }

  public setToken(token: string | undefined) {
    this.http.setToken(token);
  }

  public getBaseUrl(): string {
    return this.http.getBaseUrl();
  }
  public setBaseUrl(baseUrl: string) {
    this.http.setBaseUrl(baseUrl);
  }
}
