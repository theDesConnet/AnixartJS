import { Anixart } from "../client";
import {
    IPageableResponse,
    IBaseApiParams,
    IArticle,
    DefaultResult
} from "../types";

export class Feed {
    public constructor(private readonly client: Anixart) { }

    /**
     * Получение постов с каналов на которые подписан
     * 
     * Возвращает список {@link IArticle} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param page - Номер страницы
     * @param options - Дополнительные параметры
     * @returns Список постов
     * 
     * @example
     * const result = await client.endpoints.feed.my(0);
     */
    public async my(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IArticle>> {
        return await this.client.call<DefaultResult, IPageableResponse<IArticle>>({ path: `/feed/my/all/${page}`, ...options });
    }

    /**
     * Получение последних выложенных постов
     * 
     * Возвращает список {@link IArticle} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param page - Номер страницы
     * @param options - Дополнительные параметры
     * @returns Список постов
     * 
     * @example
     * const result = await client.endpoints.feed.latest(0);
     */
    public async latest(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IArticle>> {
        return await this.client.call<DefaultResult, IPageableResponse<IArticle>>({ path: `/article/latest/all/${page}`, method: "POST", ...options });
    }
}