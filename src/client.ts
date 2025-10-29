/**
 * ╔═══════════════════════════════════════════════════╗
 * ║                    AnixartJS                      ║
 * ║    https://github.com/theDesConnet/AnixartJS      ║
 * ║          Licensed under GPL-2.0 License           ║
 * ║                   by DesConnet                    ║
 * ╚═══════════════════════════════════════════════════╝
 */

import { DefaultResult, IBaseRequest, IResponse, LoginResult } from "./types";
import { Endpoints } from "./endpoints";
import { Channel } from "./classes/Channel";
import { Article } from "./classes/Article";
import { FullProfile } from "./classes/FullProfile";
import { Release } from "./classes/Release";
import FormData from 'form-data';
import { Collection } from "./classes/Collection";

const DEFAULT_BASE_URL = 'https://api-s.anixsekai.com';
const USER_AGENT = "AnixartApp/9.0 BETA 7-25082901 (Android 9; SDK 28; x86_64; ROG ASUS AI2201_B; ru)";
const API_ENDPOINTS_URL = 'https://raw.githubusercontent.com/AnixHelper/pages/refs/heads/main/urls.json'

export interface IAnixartOptions {
    baseUrl?: string | URL,
    token?: string
}

export interface IAnixartEndpointUrls {
    [key: string]: {
        api_url: string,
        should_use_mirror_urls: boolean
    }
}

/**
 * Класс для работы с API Anixart
 */
export class Anixart{
    public readonly baseUrl: string | URL;
    public token?: string | null;
    public readonly endpoints = new Endpoints(this);

    constructor(options: IAnixartOptions) {
        this.baseUrl = options?.baseUrl ?? DEFAULT_BASE_URL;
        this.token = options?.token ?? null;
    }

    public static async getEndpointUrls(): Promise<IAnixartEndpointUrls> {
        return await (await fetch(API_ENDPOINTS_URL)).json();
    }

    public async getChannelById(id: number): Promise<Channel | null> {
        const request = await this.endpoints.channel.info(id);

        return request.channel ? new Channel(this, request.channel) : null;
    }

    public async getProfileById(id: number): Promise<FullProfile> {
        const request = await this.endpoints.profile.info(id);

        return new FullProfile(this, request.profile)
    }

    public async getLatestFeed(page: number): Promise<Article[]> {
        const request = await this.endpoints.feed.latest(page);

        return request.content.map(article => new Article(this, article));
    }

    public async getRandomRelease(extended: boolean = false): Promise<Release> {
        const request = await this.endpoints.release.getRandomRelease(extended);

        return new Release(this, request.release);
    }

    public async getArticleById(id: number): Promise<Article | null> {
        const request = await this.endpoints.channel.getArticle(id);

        return request.article ? new Article(this, request.article) : null;
    }

    public async getReleaseById(id: number, extended: boolean = true): Promise<Release | null> {
        const request = await this.endpoints.release.info(id, extended);

        return request.release ? new Release(this, request.release) : null;
    }

    public async getCollectionById(id: number): Promise<Collection | null> {
        const request = await this.endpoints.collection.info(id);

        return request.collection ? new Collection(this, request.collection) : null
    }

    public async getFavoriteCollections(page: number): Promise<Collection[]> {
        const request = await this.endpoints.collection.getCollectionFavorites(page);

        return request.content.map(x => new Collection(this, x));
    }

    public async getAllCollections(page: number, sort: number = 2): Promise<Collection[]> {
        const request = await this.endpoints.collection.all(page, sort);

        return request.content.map(x => new Collection(this, x));
    }

    public async login(username: string, password: string): Promise<LoginResult | DefaultResult> {
        const request = await this.endpoints.auth.signIn({
            login: username,
            password
        });

        if (request.code == DefaultResult.Ok) this.token = request.profileToken.token;

        return request.code;
    }

    public async call<TCode extends number, T extends IResponse<TCode>>(request: IBaseRequest): Promise<T> {
        let data: string;

        try {
            let url = new URL(request.path, request.customBaseUrl ?? this.baseUrl);

            const headers: Record<string, string> = {
                'User-Agent': USER_AGENT,
            }
    
            const requestInit: RequestInit = {
                headers,
                method: 'GET',
                
            }
    
            if (request.queryParams) {
                for (const [key, value] of Object.entries(request.queryParams)) {
                    if (typeof(value) != 'undefined') {
                        url.searchParams.append(key, value);
                    }
                }
            }
    
            if (request.token || this.token || request.bearer) {
                request.bearer ? headers["Authorization"] = `Bearer ${request.bearer}` : url.searchParams.append('token', request.token ?? this.token!);
            }
    
            if (request.json || request.urlEncoded || request.image) {
                requestInit.method = 'POST';
    
                switch (true) {
                    case (request.json !== undefined):
                        headers['Content-Type'] = 'application/json'
                        requestInit.body = JSON.stringify(request.json);
                        break;
    
                    case (request.urlEncoded !== undefined):
                        headers['Content-Type'] = 'application/x-www-form-urlencoded'
                        requestInit.body = new URLSearchParams(request.urlEncoded as Record<string, string>).toString();
                        break;
    
                    case (request.image !== null && request.image !== undefined):
                        const formData = new FormData();
                        formData.append(request.image.type, request.image.stream, {
                            filename: request.image.name
                        });
    
                        if (request.image.boundary) {
                            formData.setBoundary(request.image.boundary);
                        }
    
                        headers['Content-Length'] = String(formData.getLengthSync());
    
                        requestInit.body = new Uint8Array(formData.getBuffer());
                        requestInit.headers = formData.getHeaders(headers);
                        break;
                }
            }
    
            if (request.apiV2) {
                headers['API-Version'] = 'v2';
            }
    
            if (request.method) {
                requestInit.method = request.method;
            }
    
            const response = await fetch(url.toString(), requestInit);
            data = await response.text();
        } catch (error: any) {
            throw new Error(`[AnixartJS] Unexpected error: ${error.stack}`);
        }

        if (data.trim() == "") {
            throw new Error("[AnixartJS] Bad Request");
        }

        return JSON.parse(data);
    }
}