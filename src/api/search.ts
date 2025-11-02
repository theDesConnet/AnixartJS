import { Anixart } from "../client";
import { 
    IBaseApiParams, 
    IBaseSearchRequest, 
    IPageableResponse, 
    IProfile,
    DefaultResult,
    IRelease,
    IChannel,
    IChannelSearchRequest
} from "../types";

/**
 * Класс поиска
 */
export class Search {
    constructor(private client: Anixart) { }

    /**
    * Поиск пользователей
    * 
    * Возвращает результата поиска {@link IProfile} внутри {@link IPageableResponse}.
    * 
    * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
    * 
    * @param data - Данные для поиска
    * @param options - Дополнительные параметры
    * @returns Результаты поиска
    * 
    * @example
    * const result = await client.endpoints.profile.search({
    *      query: "Mradxx", //Запрос
    *      searchBy: 1,     //Пока что неизвестный параметр
    *      page: 0          //Страница
    * });
    */
    public async profiles(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IProfile>> {
        return this.client.call<DefaultResult, IPageableResponse<IProfile>>({ path: `/search/profiles/${data.page}`, json: { query: data.query, page: data.page }, ...options });
    }

    public async releases(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/search/releases/${data.page}`, json: { query: data.query, page: data.page }, apiV2: true, ...options });
    }

    public async channels(data: IChannelSearchRequest, page: number, options?: IBaseApiParams): Promise<IPageableResponse<IChannel>> {
        return await this.client.call<DefaultResult, IPageableResponse<IChannel>>({ path: `/search/channels/${page}`, json: data, ...options });
    }
}