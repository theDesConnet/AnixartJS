import { Anixart } from "../client";
import {
    IPageableResponse,
    INotificationCountResponse,
    IFriendNotification,
    IRelatedReleaseNotification,
    IResponse,
    IBaseApiParams,
    DefaultResult,
    IArticleNotification
} from "../types";

//TODO: Удаление конкретных уведомлений
export class Notification {
    public constructor(private readonly client: Anixart) { }

    public async countNotifications(options?: IBaseApiParams): Promise<INotificationCountResponse> {
        return await this.client.call<DefaultResult, INotificationCountResponse>({ path: `/notification/count`, ...options });
    }

    public async getNotifications(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IFriendNotification | IRelatedReleaseNotification>> {
        return await this.client.call<DefaultResult, IPageableResponse<IFriendNotification | IRelatedReleaseNotification>>({ path: `/notification/all/${page}`, ...options });
    }

    public async getFriendsNotifications(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IFriendNotification>> {
        return await this.client.call<DefaultResult, IPageableResponse<IFriendNotification>>({ path: `/notification/friends/${page}`, ...options });
    }

    public async getRelatedReleaseNotifications(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IRelatedReleaseNotification>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelatedReleaseNotification>>({ path: `/notification/related/release/${page}`, ...options });
    }

    public async getEpisodeNotificaions(page: number, options?: IBaseApiParams): Promise<IPageableResponse<any>> {
        return await this.client.call<DefaultResult, IPageableResponse<any>>({ path: `/notification/episodes/${page}`, ...options });
    }

    public async getReleaseCommentNotifications(page: number, options?: IBaseApiParams): Promise<IPageableResponse<any>> {
        return await this.client.call<DefaultResult, IPageableResponse<any>>({ path: `/notification/releaseComments/${page}`, ...options });
    }

    public async getCollectionCommentNotifications(page: number, options?: IBaseApiParams): Promise<IPageableResponse<any>> {
        return await this.client.call<DefaultResult, IPageableResponse<any>>({ path: `/notification/collectionComments/${page}`, ...options });
    }

    public async getArticleNotifications(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IArticleNotification>> {
        return await this.client.call<DefaultResult, IPageableResponse<IArticleNotification>>({ path: `/notification/articles/${page}`, ...options });
    }

    public async removeAllNotifications(options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/notification/delete/all`, ...options });
    }

    public async readNotifications(options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/notification/read`, ...options });
    }
}