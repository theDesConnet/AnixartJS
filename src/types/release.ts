import { IPageableResponse, IResponse, IBaseComment, CommentAddResult } from './response'
import { IProfileShort, IProfile, BookmarkType } from './profile'
import { IBaseRequestPageable, IBaseSearchRequest } from './request'

export enum ReleaseCategory {
    Unknown = 0,
    Series = 1,
    Movie = 2,
    OVA = 3,
    Special = 6
}

export enum VoteType {
    Like = 2,
    Dislike = 1
}

export enum ReleaseStatus {
    Unknown = 0,
    Finished = 1,
    Airing = 2,
    Announced = 3
}

export enum ReleaseVideoResult {
    InvalidReleaseId = 2
}

export enum BookmarkExportResult {
    InvalidProfileLists = 2,
    InvalidExtraFields = 3
}

export enum FilterSortType {
    SortDateUpdate = 0,
    SortGrade = 1,
    SortYear = 2,
    SortPopular = 3
}

export interface ICommentRepliesRequest extends IBaseRequestPageable {
    id: number,
    sort: number
}

export interface IVideoReleaseInCategoryRequest extends IBaseRequestPageable {
    id: number,
    categoryId: number
}

export interface IReleaseFilterRequest {
    category_id?: number
    country?: string
    end_year?: number
    episode_duration_from?: number
    episode_duration_to?: number
    episodes_from?: number
    episodes_to?: number
    is_genres_exclude_mode_enabled?: boolean
    season?: number
    start_year?: number
    status_id?: number
    studio?: string
    sort?: FilterSortType
    genres?: string[]
    profile_list_exclusions?: number[]
    types?: number[]
    age_ratings?: number[],
    source?: string
}

export interface IReleaseFilterResponse extends IPageableResponse<IRelease> { }

export interface IReleaseCategory {
    id: ReleaseCategory
    name: string
}

export interface IReleaseStatus {
    id: ReleaseStatus
    name: string
}

export interface IRelated {
    description: string,
    id: number,
    image: string,
    images: string[],
    name: string,
    name_ru: string,
    release_count: number
}

export interface IEpisodeLastUpdate {
    lastEpisodeTypeUpdateName: string;
    last_episode_source_update_id: number;
    last_episode_source_update_name: string;
    last_episode_type_update_id: number;
    last_episode_update_date: number;
    last_episode_update_name: string;
}

export interface IRelease {
    '@id': number
    id: number
    poster: string
    image: string
    year: string
    genres: string
    country: string
    director: string
    author: string
    translators: string
    studio: string
    description: string
    note: string | null
    related: IRelated
    category: IReleaseCategory
    rating: number
    grade: number
    status: IReleaseStatus
    duration: number
    season: number
    broadcast: number
    screenshots: string[]
    comments: ICommentRelease[]
    title_original: string
    title_ru: string
    title_alt: string
    episodes_released: number
    episodes_total: number
    release_date: string
    vote_1_count: number
    vote_2_count: number
    vote_3_count: number
    vote_4_count: number
    vote_5_count: number
    vote_count: number
    creation_date: number
    last_update_date: number
    aired_on_date: number
    favorites_count: number
    watching_count: number
    plan_count: number
    completed_count: number
    hold_on_count: number
    dropped_count: number
    is_adult: boolean
    is_play_disabled: boolean
    is_tpp_disabled: boolean
    can_video_appeal: boolean
    can_torlook_search: boolean
    is_deleted: boolean
    age_rating: number
    your_vote: number
    related_count: number
    comment_count: number
    comments_count: number
    collection_count: number
    profile_list_status: number
    status_id: number
    last_view_timestamp: number
    last_view_episode: IEpisode
    is_viewed: boolean
    is_favorite: boolean
    is_view_blocked: boolean
    screenshot_images: string[]
    related_releases: IRelease[]
    recommended_releases: IRelease[]
    episode_last_update: IEpisodeLastUpdate
    comment_per_day_count: number
    video_banners: IVideoBanners[]
    profile_release_type_notification_preference_count: number
    is_release_type_notifications_enabled: boolean
}

export interface IVoteRelease {
    translation: string,
    id: number,
    broadcast: number,
    year: string,
    country: string,
    duration: number,
    description: string,
    image: string,
    genres: string,
    studio: string,
    season: number,
    note: string | null,
    author: string,
    director: string,
    rating: number,
    grade: number,
    status: number,
    poster: string,
    title_original: string,
    title_ru: string,
    favorites_count: number,
    creation_date: number,
    last_update_date: number,
    is_deleted: boolean,
    is_favorite: boolean,
    is_viewed: boolean,
    is_play_disabled: boolean,
    is_adult: boolean,
    my_vote: number,
    voted_at: number,
    episodes_released: number,
    episodes_total: number,
    release_date: string,
    age_rating: number,
    profile_list_status: number,
}

export interface IVideo {
    id: number,
    release: IRelease | number,
    profile: IProfile,
    category: {
        id: number,
        name: string
    },
    hosting: {
        id: number,
        name: string,
        icon: string
    },
    title: string,
    image: string,
    url: string,
    timestamp: number,
    player_url: string,
    is_favorite: boolean,
    favorites_count: number
}

export interface IVideoResponse extends IResponse<ReleaseVideoResult> {
    release: IRelease,
    blocks: IVideo[],
    streaming_platforms: IVideoStreamingPlatform[],
    last_videos: IVideo[],
    can_appeal: boolean
}

export interface IVideoBanners {
    name: string,
    image: string,
    value: string,
    action_id: number,
    is_new: boolean
}

export interface IVideoStreamingPlatform {
    id: number,
    name: string,
    icon: string,
    url: string,
    position: number
}

export interface IReleaseResponse extends IResponse {
    release: IRelease
}

export interface ICommentReleaseRequest extends IBaseRequestPageable {
    id: number,
    sort: number
}

export interface ICommentReleaseResponse extends IResponse<CommentAddResult> {
    comment: ICommentRelease
}

export interface ICommentRelease extends IBaseComment {
    release: IRelease,
}

export interface IDubber {
    '@id': number,
    id: number,
    name: string,
    icon: string,
    workers: string,
    is_sub: boolean,
    episode_count: number,
    view_count: number,
    pinned: boolean
}

export interface IDubbersResponse extends IResponse {
    types: IDubber[]
}

export interface ISource {
    '@id': number,
    id: number,
    name: string,
    type: IDubber | number,
    episode_count: number,
}

export interface ISourcesResponse extends IResponse {
    sources: ISource[]
}

export interface IEpisode {
    '@id': number,
    position: number,
    release: IRelease | number,
    source: ISource | number,
    name: string,
    url: string,
    iframe: boolean,
    addedDate: number,
    is_filter: boolean,
    is_watched: boolean
}

export interface IEpisodesResponse extends IResponse {
    episodes: IEpisode[]
}

export interface IEpisodeResponse extends IResponse {
    episode: IEpisode
}

export interface IInterestingRelease {
    '@id': number,
    id: number,
    title: string,
    image: string,
    description: string,
    type: number,
    action: string,
    is_hidden: boolean
}

export interface ILastEpisodeUpdate {
    last_episode_update_date: number,
    last_episode_update_name: string,
    last_episode_source_update_id: number,
    last_episode_source_update_name: string,
    last_episode_type_update_id: number,
    lastEpisodeTypeUpdateName: string
}

export interface IExportBookmarksResponse extends IResponse<BookmarkExportResult> {
    releases: IExportRelease[]
}

export interface IExportRelease {
    id: number,
    title_alt: string,
    title_ru: string,
    title_original: string,
    your_vote: number | null,
    profile_list_status: number,
    is_favorite: boolean
}

export interface IReleasesInBookmarksSearchRequest extends IBaseSearchRequest {
    type: BookmarkType
}