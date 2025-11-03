import { Anixart } from "../client";
import {
    IPageableResponse,
    IBaseApiParams,
    IRelease,
    ICommentRelease,
    IInterestingRelease,
    DefaultResult
} from "../types";


export class Discover {
    public constructor(private readonly client: Anixart) { }

    /**
     * Получение списка релизов которые сейчас смотрят
     * 
     * Возвращает список {@link IRelease} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param page - Номер страницы
     * @param options - Дополнительные параметры
     * @returns Список релизов
     * 
     * @example
     * const result = await client.endpoints.discover.getWatching(0);
     */
    public async getWatching(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/discover/watching/${page}`, ...options });
    }

    /**
     * Получение популяных комментариев (10 штук)
     * 
     * Возвращает список {@link ICommentRelease} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param options - Дополнительные параметры
     * @returns Список релизов
     * 
     * @example
     * const result = await client.endpoints.discover.getComments();
     */
    public async getComments(options?: IBaseApiParams): Promise<IPageableResponse<ICommentRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<ICommentRelease>>({ path: `/discover/comments`, ...options });
    }

    /**
     * Получение самых обсуждаемых релизов (5 штук)
     * 
     * Возвращает список {@link IRelease} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param options - Дополнительные параметры
     * @returns Список релизов
     * 
     * @example
     * const result = await client.endpoints.discover.getDiscussing();
     */
    public async getDiscussing(options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/discover/discussing`, ...options });
    }

    /**
     * Получение списка рекомендаций
     * 
     * Возвращает список {@link IRelease} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param page - Номер страницы
     * @param options - Дополнительные параметры
     * @returns Список релизов
     * 
     * @example
     * const result = await client.endpoints.discover.getRecommendations(0);
     */
    public async getRecommendations(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/discover/recommendations/${page}`, queryParams: { previous_page: page > 0 ? -1 : page - 1 }, ...options });
    }

    /**
     * Получение списка интересных релизов
     * 
     * Возвращает список {@link IInterestingRelease} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param options - Дополнительные параметры
     * @returns Список релизов
     * 
     * @example
     * const result = await client.endpoints.discover.getInteresting(0);
     */
    public async getInteresting(options?: IBaseApiParams): Promise<IPageableResponse<IInterestingRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IInterestingRelease>>({ path: `/discover/interesting`, ...options });
    }
}