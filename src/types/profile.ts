//Thanks Nekonyx for this types (https://github.com/Nekonyx/anixart-api/blob/master/src/contracts/profile.ts)

import { IResponse } from "./response";
import { IBaseRequestPageable } from "./request";
import { IRelease, IVoteRelease } from "./release";

export enum BookmarkType {
    Watching = 1,
    InPlans = 2,
    Completed = 3,
    HoldOn = 4,
    Dropped = 5
}

export enum BookmarkSortType {
    NewToOldAddTime = 1,
    OldToNewAddTime = 2,
    NewToOldYear = 3,
    OldToNewYear = 4,
    AlpabetInAToZ = 5,
    AlpabetInZToA = 6
}

export interface IBookmarkRequest extends IBaseRequestPageable {
    filter_announce: number,
    id: number,
    type: BookmarkType,
    sort: BookmarkSortType,
    filter?: number
}

export interface IProfileToken {
    id: string
    token: string
}

export interface IProfile {
    id: number
    login: string
    avatar: string
    status: string
    sponsorshipExpires: number
    history: IRelease[]
    votes: IVoteRelease[]
    last_activity_time: number
    register_date: number
    vk_page: string
    tg_page: string
    inst_page: string
    tt_page: string
    discord_page: string
    ban_expires: number
    ban_reason: string
    ban_note: string | null,
    privilege_level: number
    watching_count: number
    plan_count: number
    completed_count: number
    hold_on_count: number
    dropped_count: number
    favorite_count: number
    comment_count: number
    collection_count: number
    video_count: number
    friend_count: number
    watched_episode_count: number
    watched_time: number
    is_private: boolean
    is_sponsor: boolean
    is_banned: boolean
    is_perm_banned: boolean
    is_bookmarks_transferred: boolean
    is_sponsor_transferred: boolean
    is_vk_bound: boolean
    is_google_bound: boolean
    is_release_type_notifications_enabled: boolean
    is_episode_notifications_enabled: boolean
    is_first_episode_notification_enabled: boolean
    is_related_release_notifications_enabled: boolean
    is_report_process_notifications_enabled: boolean
    is_comment_notifications_enabled: boolean
    is_my_collection_comment_notifications_enabled: boolean
    is_verified: boolean
    watch_dynamics: IWatchDynamics[]
    friend_status: number
    rating_score: number
    is_blocked: boolean
    is_me_blocked: boolean
    is_stats_hidden: boolean
    is_counts_hidden: boolean
    is_social_hidden: boolean
    is_friend_requests_disallowed: boolean
    is_online: boolean
    roles: IRole[]
    badge: IBadge | null
    preferred_genres: IPreferredType[],
    preferred_audiences: IPreferredType[],
    preferred_themes: IPreferredType[],
    theme_enabled: boolean,
    theme_gradient_start_color: string | null,
    theme_gradient_end_color: string | null,
    theme_gradient_angle: string | null,
    theme_icon_res_name: string | null,
    theme_icon_url: string | null,
    theme_icon_color: string | null,
    theme_icon_alpha: number,
    theme_icon_destiny: string | null,
    theme_icon_size: string | null,
    theme_animation_enabled: boolean,
    theme_animation_speed: string | null,
    theme_background_url: string | null,
    theme_background_mode: string | null,
    theme_background_alpha: number | null,
}

export interface IPreferredType {
    name: string,
    percentage: number
}

export interface IWatchDynamics {
    id: number,
    day: number,
    count: number,
    timestamp: number
}

export interface IRole {
    color: string,
    name: string
}

export interface IProfileShort {
    id: number,
    login: string,
    avatar: string,
    ban_expires: number,
    ban_reason: string,
    privilege_level: number,
    badge_id: number | null,
    badge_name: string | null,
    badge_type: number | null,
    badge_url: string | null,
    is_banned: boolean,
    is_sponsor: boolean,
    is_verified: boolean,
    is_online: boolean,
    friend_status: number,
    friend_count: number
}

export interface IProfileResponse extends IResponse {
    profile: IProfile,
    is_my_profile: boolean
}

export interface IFriendsRequest extends IBaseRequestPageable {
    id: number
}

export interface IFriendRequestResponse<T extends number = SendFriendRequestResult> extends IResponse {
    friend_status: T | null
}

export interface IBadge {
    id: number,
    name: string,
    type: number,
    image_url: string,
    timestamp: number
}

export interface ISocialRequest {
    vkPage: string,
    tgPage: string,
    instPage: string,
    ttPage: string,
    discordPage: string
}

export interface ISocialResponse extends IResponse {
    vk_page: string,
    tg_page: string,
    inst_page: string,
    tt_page: string,
    discord_page: string
}

export enum SendFriendRequestResult {
    RequestConfirmed = 2,
    RequestSent = 3,
    ProfileWasBlocked = 4,
    MyProfileWasBlocked = 5,
    FriendLimitReached = 6,
    TargetFriendLimitReached = 7,
    TargetFriendRequestsDisallowed = 8,
    FriendRequestLimitReached = 9
}

export enum RemoveFriendRequestResult {
    RequestRemoved = 2,
    FriendshipRemoved = 3
}

export enum AchivementResult {
    AlreadyGranted = 2,
    AchivementNotFound = 3
}

export enum BlocklistAddResult {
    AlreadyInBlocklist = 2
}