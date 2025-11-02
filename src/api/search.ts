import { Anixart } from "../client";
import { 
    IBaseApiParams, 
    IBaseSearchRequest, 
    IPageableResponse, 
    IProfile,
    DefaultResult,
    IRelease,
    IChannel,
    IChannelSearchRequest,
    IArticleSearchRequest,
    IArticle,
    ICollection,
    IReleasesInBookmarksSearchRequest,
    IFeedSearchResponse,
    IProfileChannel,
    IChannelSubscribersSearchRequest
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
        return this.client.call<DefaultResult, IPageableResponse<IProfile>>({ path: `/search/profiles/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }

    public async releases(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/search/releases/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, apiV2: true, ...options });
    }

    public async channels(data: IChannelSearchRequest, page: number, options?: IBaseApiParams): Promise<IPageableResponse<IChannel>> {
        return await this.client.call<DefaultResult, IPageableResponse<IChannel>>({ path: `/search/channels/${page}`, json: data, ...options });
    }

    public async articles(data: IArticleSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IArticle>> {
        return await this.client.call<DefaultResult, IPageableResponse<IArticle>>({ path: `/search/articles/${data.page}`, json: { query: data.query, channel_id: data.channel_id }, ...options });
    }

    public async collections(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<ICollection>> {
        return await this.client.call<DefaultResult, IPageableResponse<ICollection>>({ path: `/search/collections/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }

    public async favoriteCollections(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<ICollection>> {
        return await this.client.call<DefaultResult, IPageableResponse<ICollection>>({ path: `/search/favoriteCollections/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }

    public async favorties(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/search/favorites/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }

    public async history(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/search/history/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }

    public async profileCollections(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<ICollection>> {
        return await this.client.call<DefaultResult, IPageableResponse<ICollection>>({ path: `/search/profileCollections/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }

    public async releasesInBookmarks(data: IReleasesInBookmarksSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/search/profile/list/${data.type}/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }
    
    public async feed(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IFeedSearchResponse> {
        return await this.client.call<DefaultResult, IFeedSearchResponse>({ path: `/search/feed/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }

    public async channelSubscribers(data: IChannelSubscribersSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IProfileChannel>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfileChannel>>({ path: `/search/channel/${data.channel_id}/subscribers/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }
}