import { Anixart } from "../client";
import {
    IProfileResponse,
    IBookmarkRequest,
    IFriendsRequest,
    IProfileShort,
    IFriendRequestResponse,
    IBaseApiParams,
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
    BookmarkType,
    IChannel
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
     * Получение друзей профиля по его ID
     * 
     * Возвращает список {@link IProfileShort} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param data - Данные для получения списка друзей
     * @param options - Дополнительные параметры
     * @returns Список друзей
     * 
     * @example
     * const result = await client.endpoints.profile.getFriends({
     *      id: 1,      //ID Профиля
     *      page: 0     //Страница
     * });
     */
    public async getFriends(data: IFriendsRequest, options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfileShort>>({ path: `/profile/friend/all/${data.id}/${data.page}`, ...options });
    }

    /**
     * Получение списка рекомендаций для добавления в друзья
     * 
     * Возвращает список {@link IProfileShort} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param options - Дополнительные параметры
     * @returns Список потенциальных друзей
     * 
     * @example
     * const result = await client.endpoints.profile.getFriendRecomendation();
     */
    public async getFriendRecomendation(options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfileShort>>({ path: `/profile/friend/recomendations`, ...options });
    }

    /**
     * Получение списка последних заявок в друзья
     * 
     * Возвращает список {@link IProfileShort} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param type - Тип заявок (Входящие или исходящие)
     * @param count - Количество заявок
     * @param options - Дополнительные параметры
     * @returns Список последних заявок в друзья
     * 
     * @example
     * const result = await client.endpoints.profile.getLastFriendRequests("in", 5);
     */
    public async getLastFriendRequests(type: "in" | "out", count: number, options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfileShort>>({ path: `/profile/friend/requests/${type}/last`, queryParams: { count }, ...options });
    }

    /**
     * Получение списка заявок в друзья
     * 
     * Возвращает список {@link IProfileShort} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param type - Тип заявок (Входящие или исходящие)
     * @param page - Номер страницы
     * @param options - Дополнительные параметры
     * @returns Список заявок в друзья
     * 
     * @example
     * const result = await client.endpoints.profile.getFriendRequests("in", 0);
     */
    public async getFriendRequests(type: "in" | "out", page: number, options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfileShort>>({ path: `/profile/friend/requests/${type}/${page}`, ...options });
    }

    /**
     * Отправка запроса на добавление в друзья
     * 
     * Возвращает ответ {@link IFriendRequestResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}, {@link SendFriendRequestResult}
     * 
     * @param id - ID Профиля
     * @param options - Дополнительные параметры
     * @returns Статус дружбы
     * 
     * @example
     * const result = await client.endpoints.profile.sendFriendRequest(1);
     */
    public async sendFriendRequest(id: number, options?: IBaseApiParams): Promise<IFriendRequestResponse> {
        return await this.client.call<SendFriendRequestResult, IFriendRequestResponse>({ path: `/profile/friend/request/send/${id}`, ...options });
    }

    /**
     * Удаление запроса на добавление в друзья
     * 
     * Возвращает ответ {@link IFriendRequestResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}, {@link RemoveFriendRequestResult}
     * 
     * @param id - ID Профиля
     * @param options - Дополнительные параметры
     * @returns Статус дружбы
     * 
     * @example
     * const result = await client.endpoints.profile.removeFriendRequest(1);
     */
    public async removeFriendRequest(id: number, options?: IBaseApiParams): Promise<IFriendRequestResponse<RemoveFriendRequestResult>> {
        return await this.client.call<RemoveFriendRequestResult, IFriendRequestResponse<RemoveFriendRequestResult>>({ path: `/profile/friend/request/remove/${id}`, ...options });
    }

    /**
     * Скрытие запроса на добавление в друзья
     * 
     * Возвращает ответ {@link IResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param id - ID Профиля
     * @param options - Дополнительные параметры
     * @returns Код ответа
     * 
     * @example
     * const result = await client.endpoints.profile.hideFriendRequest(1);
     */
    public async hideFriendRequest(id: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/friend/request/hide/${id}`, ...options });
    }

    /**
     * Получение достижения в профиль
     * 
     * Возвращает ответ {@link IResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}, {@link AchivementResult}
     * 
     * @param id - ID Достижения
     * @param options - Дополнительные параметры
     * @returns Код ответа
     * 
     * @example
     * const result = await client.endpoints.profile.getAchivement("DEMO1-ACHIV-MENT2");
     * //Или
     * const result = await client.endpoints.profile.getAchivement(1);
     */
    public async getAchivement(id: string | number, options?: IBaseApiParams): Promise<IResponse<AchivementResult>> {
        return await this.client.call<AchivementResult, IResponse<AchivementResult>>({ path: `/achivement/get/${id}`, ...options });
    }

    /**
     * Получение избранных релизов в профиле
     * 
     * Возвращает релизы {@link IRelease} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param data - Данные для запроса
     * @param options - Дополнительные параметры
     * @returns Релизы
     * 
     * @example
     * const { BookmarkSortType } = require("anixartjs");
     * 
     * const result = await client.endpoints.profile.getFavorites({
     *     page: 1,                                 //Страница
     *     sort: BookmarkSortType.NewToOldAddTime,  //Сортировка
     *     filter_announce: 0,                      //Фильтр по анонсам
     * });
     */
    public async getFavorites(data: Omit<IBookmarkRequest, "id" | "type">, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/favorite/all/${data.page}`, queryParams: { sort: data.sort, filter: data.filter, filter_announce: data.filter_announce }, ...options });
    }

    /**
     * Получение подписок в профиле на каналы и блоги
     * 
     * Возвращает каналы и блоги {@link IChannel} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param page - Номер страницы
     * @param options - Дополнительные параметры
     * @returns Каналы и блоги
     * 
     * @example
     * const result = await client.endpoints.profile.getSubsciptions(0);
     */
    public async getSubsciptions(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IChannel>> {
        return await this.client.call<DefaultResult, IPageableResponse<IChannel>>({ path: `/channel/subscription/all/${page}`, ...options });
    }

    /**
     * Получение количество подписок в профиле на каналы и блоги
     * 
     * Возвращает число подписок {@link ISubsciptionCountResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param options - Дополнительные параметры
     * @returns Число подписок
     * 
     * @example
     * const result = await client.endpoints.profile.getSubsciptionCount(0);
     */
    public async getSubscriptionCount(options?: IBaseApiParams): Promise<ISubsciptionCountResponse> {
        return await this.client.call<DefaultResult, ISubsciptionCountResponse>({ path: `/channel/subscription/count`, ...options });
    }

    /**
     * Получение списка оцененных релизов профиля
     * 
     * Возвращает список {@link IVoteRelease} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param id - ID Профиля
     * @param page - Номер страницы
     * @param sort - Сортировка
     * @param options - Дополнительные параметры
     * @returns Список оцененных релизов
     * 
     * @example
     * const result = await client.endpoints.profile.getVotedReleases(1, 0);
     */
    public async getVotedReleases(id: number, page: number, sort: number = 1, options?: IBaseApiParams): Promise<IPageableResponse<IVoteRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IVoteRelease>>({ path: `/profile/vote/release/voted/${id}/${page}`, queryParams: {sort}, ...options})
    }

    /**
     * Получение списка юзернеймов профиля на другие соц. сети
     * 
     * Возвращает ответ {@link ISocialResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param id - ID Профиля
     * @param options - Дополнительные параметры
     * @returns Список оцененных релизов
     * 
     * @example
     * const result = await client.endpoints.profile.getSocials(1);
     */
    public async getSocials(id: number, options?: IBaseApiParams): Promise<ISocialResponse> {
        return await this.client.call<DefaultResult, ISocialResponse>({ path: `/profile/social/${id}`, ...options });
    }

    /**
     * Получение списка неоцененных релизов профиля (Предположительно которые находятся в закладках профиля)
     * 
     * Возвращает список {@link IRelease} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param page - Номер страницы
     * @param options - Дополнительные параметры
     * @returns Список неоцененных релизов
     * 
     * @example
     * const result = await client.endpoints.profile.getUnvotedReleases(0);
     */
    public async getUnvotedReleases(page: number | "last" = "last", options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/profile/vote/release/unvoted/${page}`, ...options });
    }

    /**
     * Получение списка профилей у которых есть конкретная роль
     * 
     * Возвращает список {@link IProfileShort} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param id - ID Роли
     * @param page - Номер страницы
     * @param options - Дополнительные параметры
     * @returns Список профилей у которых есть конкретная роль
     * 
     * @example
     * const result = await client.endpoints.profile.getRoleProfiles(0);
     */
    public async getRoleProfiles(id: number, page: number, options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfileShort>>({ path: `/role/all/${page}/${id}`, ...options });
    }

    /**
     * Экспорт закладок из профиля
     * 
     * Возвращает ответ {@link IExportBookmarksResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}, {@link BookmarkExportResult}
     * 
     * @param listIds - Типы закладок
     * @param sort - Сортировка
     * @param options - Дополнительные параметры
     * @returns Результат экспорта
     * 
     * @example
     * const { BookmarkType } = require("anixartjs");
     * 
     * const bookmarks = [BookmarkType.Watching, BookmarkType.Completed];
     * const result = await client.endpoints.profile.exportBookmarks(bookmarks);
     */
    public async exportBookmarks(listIds: Array<BookmarkType>, sort?: number, options?: IBaseApiParams): Promise<IExportBookmarksResponse> {
        return await this.client.call<BookmarkExportResult, IExportBookmarksResponse>({ path: "/export/bookmarks", json: { bookmarksExportProfileLists: listIds }, queryParams: {sort}, ...options })
    }

    /**
     * Получение списка профилей которые находятся в блоклисте
     * 
     * Возвращает список {@link IProfile} внутри {@link IPageableResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param page - Номер страницы
     * @param options - Дополнительные параметры
     * @returns Список профилей
     * 
     * @example
     * const result = await client.endpoints.profile.getBlocklist(0);
     */
    public async getBlocklist(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IProfile>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfile>>({ path: `/profile/blocklist/all/${page}`, ...options });
    }

    /**
     * Добавление профиля в блоклист
     * 
     * Возвращает ответ {@link IResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param id - ID Профиля
     * @param options - Дополнительные параметры
     * @returns Код ответа
     * 
     * @example
     * const result = await client.endpoints.profile.addToBlocklist(1);
     */
    public async addToBlocklist(id: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/blocklist/add/${id}`, ...options });
    }

    /**
     * Удаление профиля из блоклиста
     * 
     * Возвращает ответ {@link IResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}
     * 
     * @param id - ID Профиля
     * @param options - Дополнительные параметры
     * @returns Код ответа
     * 
     * @example
     * const result = await client.endpoints.profile.removeToBlocklist(1);
     */
    public async removeFromBlocklist(id: number, options?: IBaseApiParams): Promise<IResponse<BlocklistAddResult>> {
        return await this.client.call<BlocklistAddResult, IResponse<BlocklistAddResult>>({ path: `/profile/blocklist/remove/${id}`, ...options });
    }
}