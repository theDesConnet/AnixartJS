import { IBadge, IProfile } from "./profile";
import { IPageableResponse, IResponse } from "./response";


export interface IProfileSettingsResponse extends IResponse {
    avatar: string,
    status: string,
    vkPage: string,
    tgPage: string,
    is_private: boolean,
    isPrivate: boolean,
    privacy_stats: number,
    privacy_counts: number,
    privacy_social: number,
    privacy_friend_requests: number,
    is_vk_bound: boolean,
    isVkBound: boolean,
    is_goolge_bound: boolean,
    isGoogleBound: boolean,
    is_login_changed: boolean,
    isLoginChanged: boolean,
    is_change_login_banned: boolean,
    ban_change_login_expires: number,
    is_change_avatar_banned: boolean,
    ban_change_avatar_expires: number,
    channel_id: number
}

export interface IBadgesResponse extends IPageableResponse<IBadge> {
    profile: IProfile
}

export interface IEmailChangeConfirmResponse extends IResponse<ChangeEmailConfirmResult> {
    emailHint: string
}

export interface IEmailChangeRequest {
    oldEmail: string,
    newEmail: string,
    password: string
}

export interface ILoginInfoResponse extends IResponse {
    login: string,
    avatar: string,
    is_change_avaliable: boolean,
    last_change_at: number,
    next_change_avaliable_at: number
}

export interface INewLogin {
    '@id': number,
    id: number,
    newLogin: string,
    timestamp: number
}

export enum SocialEditResult {
    InvalidVk = 2,
    InvalidTelegram = 3,
    InvalidInstagram = 4,
    InvalidTiktok = 5,
    InvalidDiscord = 6
}

export enum ChangeLoginResult {
    InvalidLogin = 2,
    LoginAlreadyTaken = 3,
    TimeLimit = 4
}

export enum ChangeEmailResult {
    InvalidEmail = 2,
    InvalidCurrentEmail = 3,
    EmailAlreadyTaken = 4
}

export enum ChangeEmailConfirmResult {
    InvalidPassword = 2
}

export enum ChangePasswordResult {
    InvalidPassword = 2,
    InvalidCurrentPassword = 3
}

export enum PasswordChangeResult {
    InvalidPassword = 2,
    InvalidCurrentPassword = 3
}

export enum PrivacyState {
    All = 0,
    OnlyFriends = 1,
    OnlyMe = 2
}

export enum PrivacyFriendRequestState {
    All = 0,
    OnlyMe = 1
}

export interface IPasswordChangeResponse extends IResponse<ChangePasswordResult> {
    token: string
}