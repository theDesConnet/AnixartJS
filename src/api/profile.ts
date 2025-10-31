import { Anixart } from "../client";
import {
    IProfileResponse,
    IBookmarkRequest,
    IFriendsRequest,
    IProfileShort,
    IFriendRequestResponse,
    IBaseApiParams,
    IBaseSearchRequest,
    IPageableResponse,
    IRelease,
    IProfile,
    IResponse,
    ISubsciptionCountResponse,
    IVoteRelease,
    DefaultResult,
    SendFriendRequestResult,
    RemoveFriendRequestResult,
    AchivementResult,
    ISocialResponse,
    IExportBookmarksResponse,
    BookmarkExportResult,
    BlocklistAddResult,
    BookmarkType
} from "../types";

/**
 * Класс профиля
 * 
 * TODO: Понять для чего нужен эндпоинт '/profile/process/{id}' - POST
 * Пока что предположение что это что-то для модерации
 */
export class Profile {
    public constructor(private readonly client: Anixart) { }

    /**
     * Получение информация о профиле по его ID
     * 
     * Возвращает {@link IProfileResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param id - ID Профиля
     * @param options - Дополнительные параметры
     * @returns Информацию о профиле с указанным ID
     * 
     * @example
     * const result = await client.endpoints.profile.info(1);
     */
    public async info(id: number, options?: IBaseApiParams): Promise<IProfileResponse> {
        return this.client.call<DefaultResult, IProfileResponse>({ path: `/profile/${id}`, ...options });
    }

    /**
     * Получение закладок из профиля по его ID
     * 
     * Возвращает {@link IRelease} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param data - Данные для запроса
     * @param options - Дополнительные параметры
     * @returns Информацию о релизах которые находятся в закладке
     * 
     * @example
     * const { BookmarkType, BookmarkSortType } = require("anixartjs");
     * 
     * const result = await client.endpoints.profile.getBookmarks({
     *      type: BookmarkType.Watching,            //Тип закладки
     *      id: 1,                                  //ID профиля
     *      sort: BookmarkSortType.NewToOldAddTime, //Сортировка
     *      page: 0                                 //Страница
     * });
     */
    public async getBookmarks(data: IBookmarkRequest, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/profile/list/all/${data.id ? `${data.id}/` : ""}${data.type}/${data.page}`, queryParams: { sort: data.sort, filter: data.filter, filter_announce: data.filter_announce }, ...options });
    }

    /**
     * Добавление релиза в закладку
     * 
     * Возвращает код результата {@link IResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param id - ID релиза
     * @param type - Тип закладки {@link BookmarkType}
     * @param options - Дополнительные параметры
     * @returns Ответ API в виде числа
     * 
     * @example
     * const { BookmarkType } = require("anixartjs");
     * 
     * const result = await client.endpoints.profile.addBookmarks(1, BookmarkType.Watching);
     */
    public async addBookmark(id: number, type: BookmarkType, options?: IBaseApiParams): Promise<IResponse> {
        return this.client.call<DefaultResult, IResponse>({ path: `/profile/list/add/${type}/${id}`, ...options });
    }

    /**
     * Удаление релиза из закладки
     * 
     * Возвращает код результата {@link IResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param id - ID релиза
     * @param type - Тип закладки {@link BookmarkType}
     * @param options - Дополнительные параметры
     * @returns Ответ API в виде числа
     * 
     * @example
     * const { BookmarkType } = require("anixartjs");
     * 
     * const result = await client.endpoints.profile.removeBookmarks(1, BookmarkType.Watching);
     */
    public async removeBookmark(id: number, type: BookmarkType, options?: IBaseApiParams): Promise<IResponse> {
        return this.client.call<DefaultResult, IResponse>({ path: `/profile/list/delete/${type}/${id}`, ...options });
    }

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
    public async search(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IProfile>> {
        return this.client.call<DefaultResult, IPageableResponse<IProfile>>({ path: `/search/profiles/${data.page}`, json: { query: data.query, page: data.page }, ...options });
    }

    public async getFriends(data: IFriendsRequest, options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfileShort>>({ path: `/profile/friend/all/${data.id}/${data.page}`, ...options });
    }

    public async getFriendRecomendation(options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfileShort>>({ path: `/profile/friend/recomendations`, ...options });
    }

    public async getLastFriendRequests(type: "in" | "out", count: number, options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfileShort>>({ path: `/profile/friend/requests/${type}/last`, queryParams: { count }, ...options });
    }

    public async getFriendRequests(type: "in" | "out", page: number, options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfileShort>>({ path: `/profile/friend/requests/${type}/${page}`, ...options });
    }

    public async sendFriendRequest(id: number, options?: IBaseApiParams): Promise<IFriendRequestResponse> {
        return await this.client.call<SendFriendRequestResult, IFriendRequestResponse>({ path: `/profile/friend/request/send/${id}`, ...options });
    }

    public async removeFriendRequest(id: number, options?: IBaseApiParams): Promise<IFriendRequestResponse<RemoveFriendRequestResult>> {
        return await this.client.call<DefaultResult, IFriendRequestResponse<RemoveFriendRequestResult>>({ path: `/profile/friend/request/remove/${id}`, ...options });
    }

    public async hideFriendRequest(id: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/friend/request/hide/${id}`, ...options });
    }

    public async getAchivement(id: number, options?: IBaseApiParams): Promise<IResponse<AchivementResult>> {
        return await this.client.call<AchivementResult, IResponse<AchivementResult>>({ path: `/achivement/get/${id}`, ...options });
    }

    public async getFavorites(data: IBookmarkRequest, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/favorite/all/${data.page}`, queryParams: { sort: data.sort, filter: data.filter, filter_announce: data.filter_announce }, ...options });
    }

    public async getSubsciptions(page: number, options?: IBaseApiParams): Promise<IPageableResponse<any>> {
        return await this.client.call<DefaultResult, IPageableResponse<any>>({ path: `/channel/subscription/all/${page}`, ...options });
    }

    public async getSubscriptionCount(options?: IBaseApiParams): Promise<ISubsciptionCountResponse> {
        return await this.client.call<DefaultResult, ISubsciptionCountResponse>({ path: `/channel/subscription/count`, ...options });
    }

    public async getVotedReleases(id: number, page: number, sort: number = 1, options?: IBaseApiParams): Promise<IPageableResponse<IVoteRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IVoteRelease>>({ path: `/profile/vote/release/voted/${id}/${page}`, queryParams: {sort}, ...options})
    }

    public async getSocials(id: number, options?: IBaseApiParams): Promise<ISocialResponse> {
        return await this.client.call<DefaultResult, ISocialResponse>({ path: `/profile/social/${id}`, ...options });
    }

    public async getUnvotedReleases(page: number | "last" = "last", options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/profile/vote/release/unvoted/${page}`, ...options });
    }

    public async getRoleProfiles(id: number, page: number, options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfileShort>>({ path: `/role/all/${page}/${id}`, ...options });
    }

    public async exportBookmarks(listIds: Array<number>, sort?: number, options?: IBaseApiParams): Promise<IExportBookmarksResponse> {
        return await this.client.call<BookmarkExportResult, IExportBookmarksResponse>({ path: "/export/bookmarks", json: { bookmarksExportProfileLists: listIds }, queryParams: {sort}, ...options })
    }

    public async getBlocklist(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IProfile>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfile>>({ path: `/profile/blocklist/all/${page}`, ...options });
    }

    public async addToBlocklist(id: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/blocklist/add/${id}`, ...options });
    }

    public async removeFromBlocklist(id: number, options?: IBaseApiParams): Promise<IResponse<BlocklistAddResult>> {
        return await this.client.call<BlocklistAddResult, IResponse<BlocklistAddResult>>({ path: `/profile/blocklist/remove/${id}`, ...options });
    }
}