import { IProfile } from "./profile";
import { IRelease } from "./release";
import { IResponse } from "./response";

export interface INotificationCountResponse extends IResponse {
    count: number
}

export interface IBaseNotification {
    id: number,
    type: string,
    profile: IProfile,
    timestamp: number,
    is_pushed: boolean,
    is_new: boolean
}

export interface IFriendNotification extends IBaseNotification {
    status: string,
    by_profile: IProfile
}

export interface IArticleNotification extends IBaseNotification {
    '@id': number,
    article: number
}

export interface IRelatedReleaseNotification extends IBaseNotification {
    '@id': number,
    release: IRelease | number
}