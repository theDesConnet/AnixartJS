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
    * const result = await client.endpoints.search.profiles({
    *      query: "Mradxx", //Запрос
    *      page: 0          //Страница
    * });
    */
    public async profiles(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IProfile>> {
        return this.client.call<DefaultResult, IPageableResponse<IProfile>>({ path: `/search/profiles/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }

    /**
    * Поиск релизов
    * 
    * Возвращает результата поиска {@link IRelease} внутри {@link IPageableResponse}.
    * 
    * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
    * 
    * @param data - Данные для поиска
    * @param options - Дополнительные параметры
    * @returns Результаты поиска
    * 
    * @example
    * const result = await client.endpoints.search.releases({
    *      query: "стоун",  //Запрос
    *      page: 0          //Страница
    * });
    */
    public async releases(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/search/releases/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, apiV2: true, ...options });
    }

    /**
    * Поиск каналов
    * 
    * Возвращает результата поиска {@link IChannel} внутри {@link IPageableResponse}.
    * 
    * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
    * 
    * @param data - Данные для поиска
    * @param page - Номер страницы
    * @param options - Дополнительные параметры
    * @returns Результаты поиска
    * 
    * @example
    * const result = await client.endpoints.search.channels({
    *      query: "новостная",  //Запрос
    *      permission: 0,       //Привилегии (Необязательно)
    *      is_blog: false,      //Является ли канал блогом
    *      is_subscribed: false //Находится ли канал в подписках
    * }, 0);
    */
    public async channels(data: IChannelSearchRequest, page: number, options?: IBaseApiParams): Promise<IPageableResponse<IChannel>> {
        return await this.client.call<DefaultResult, IPageableResponse<IChannel>>({ path: `/search/channels/${page}`, json: data, ...options });
    }

    /**
    * Поиск постов
    * 
    * Возвращает результата поиска {@link IArticle} внутри {@link IPageableResponse}.
    * 
    * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
    * 
    * @param data - Данные для поиска
    * @param options - Дополнительные параметры
    * @returns Результаты поиска
    * 
    * @example
    * const result = await client.endpoints.search.articles({
    *      query: "интересный пост",  //Запрос
    *      channel_id: 1              //ID канала
    *      page: 0                    //Страница
    * });
    */
    public async articles(data: IArticleSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IArticle>> {
        return await this.client.call<DefaultResult, IPageableResponse<IArticle>>({ path: `/search/articles/${data.page}`, json: { query: data.query, channel_id: data.channel_id }, ...options });
    }

    /**
    * Поиск коллекций
    * 
    * Возвращает результата поиска {@link ICollection} внутри {@link IPageableResponse}.
    * 
    * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
    * 
    * @param data - Данные для поиска
    * @param options - Дополнительные параметры
    * @returns Результаты поиска
    * 
    * @example
    * const result = await client.endpoints.search.collections({
    *      query: "коллекция",  //Запрос
    *      page: 0              //Страница
    * });
    */
    public async collections(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<ICollection>> {
        return await this.client.call<DefaultResult, IPageableResponse<ICollection>>({ path: `/search/collections/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }

    /**
    * Поиск коллекций из избранных в профиле
    * 
    * Возвращает результата поиска {@link ICollection} внутри {@link IPageableResponse}.
    * 
    * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
    * 
    * @param data - Данные для поиска
    * @param options - Дополнительные параметры
    * @returns Результаты поиска
    * 
    * @example
    * const result = await client.endpoints.search.favoriteCollections({
    *      query: "коллекция",  //Запрос
    *      page: 0              //Страница
    * });
    */
    public async favoriteCollections(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<ICollection>> {
        return await this.client.call<DefaultResult, IPageableResponse<ICollection>>({ path: `/search/favoriteCollections/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }

    /**
    * Поиск релизов из избранных в профиле
    * 
    * Возвращает результата поиска {@link IRelease} внутри {@link IPageableResponse}.
    * 
    * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
    * 
    * @param data - Данные для поиска
    * @param options - Дополнительные параметры
    * @returns Результаты поиска
    * 
    * @example
    * const result = await client.endpoints.search.favorties({
    *      query: "стоун",  //Запрос
    *      page: 0          //Страница
    * });
    */
    public async favorties(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/search/favorites/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }

    /**
    * Поиск релизов из истории просмотра в профиле
    * 
    * Возвращает результата поиска {@link IRelease} внутри {@link IPageableResponse}.
    * 
    * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
    * 
    * @param data - Данные для поиска
    * @param options - Дополнительные параметры
    * @returns Результаты поиска
    * 
    * @example
    * const result = await client.endpoints.search.history({
    *      query: "стоун",  //Запрос
    *      page: 0          //Страница
    * });
    */
    public async history(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/search/history/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }

    /**
    * Поиск коллекций в профиле
    * 
    * Возвращает результата поиска {@link ICollection} внутри {@link IPageableResponse}.
    * 
    * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
    * 
    * @param data - Данные для поиска
    * @param options - Дополнительные параметры
    * @returns Результаты поиска
    * 
    * @example
    * const result = await client.endpoints.search.profileCollections({
    *      query: "коллекция",  //Запрос
    *      page: 0              //Страница
    * });
    */
    public async profileCollections(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<ICollection>> {
        return await this.client.call<DefaultResult, IPageableResponse<ICollection>>({ path: `/search/profileCollections/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }

    /**
    * Поиск релизов из закладок в профиле
    * 
    * Возвращает результата поиска {@link IRelease} внутри {@link IPageableResponse}.
    * 
    * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
    * 
    * @param data - Данные для поиска
    * @param options - Дополнительные параметры
    * @returns Результаты поиска
    * 
    * @example
    * const result = await client.endpoints.search.releasesInBookmarks({
    *      query: "стоун",  //Запрос
    *      page: 0          //Страница
    * });
    */
    public async releasesInBookmarks(data: IReleasesInBookmarksSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/search/profile/list/${data.type}/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }
    
    /**
    * Поиск по ленте новостей
    * 
    * Возвращает результата поиска {@link IFeedSearchResponse}.
    * 
    * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
    * 
    * @param data - Данные для поиска
    * @param options - Дополнительные параметры
    * @returns Результаты поиска
    * 
    * @example
    * const result = await client.endpoints.search.feed({
    *      query: "интересное что-то",  //Запрос
    *      page: 0                      //Страница
    * });
    */
    public async feed(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IFeedSearchResponse> {
        return await this.client.call<DefaultResult, IFeedSearchResponse>({ path: `/search/feed/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }

    /**
    * Поиск подписчиков в канале
    * 
    * Возвращает результата поиска {@link IProfileChannel} внутри {@link IPageableResponse}.
    * 
    * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
    * 
    * @param data - Данные для поиска
    * @param options - Дополнительные параметры
    * @returns Результаты поиска
    * 
    * @example
    * const result = await client.endpoints.search.channelSubscribers({
    *      query: "Mradxx",  //Запрос
    *      channel_id: 1,    //ID канала
    *      page: 0           //Страница
    * });
    */
    public async channelSubscribers(data: IChannelSubscribersSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IProfileChannel>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfileChannel>>({ path: `/search/channel/${data.channel_id}/subscribers/${data.page}`, json: { query: data.query, searchBy: data.searchBy }, ...options });
    }
}