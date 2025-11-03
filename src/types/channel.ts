import { IProfile } from "./profile";
import { IBaseSearchRequest } from "./request";
import { IResponse, IBaseComment, CommentAddResult, IPageableResponse } from "./response";

export interface IChannel {
    id: number,
    title: string,
    description: string,
    avatar: string,
    cover: string,
    permission: number,
    article_count: number,
    subscriber_count: number,
    creation_date: number,
    last_update_date: number,
    is_blog: boolean,
    is_commenting_enabled: boolean,
    is_article_suggestion_enabled: boolean,
    is_verified: boolean,
    is_deleted: boolean,
    blog_profile_id: number,
    is_subscribed: boolean,
    is_blocked: boolean,
    block_reason: string,
    block_expire_date: number,
    is_perm_blocked: boolean,
    is_administrator_or_higher: boolean
}

export interface IArticleUploadFileResponse extends IResponse {
    file: IArticleImageItem,
    success: number
}

export interface IArticleSuggestionPublishResponse extends IResponse<ArticleSuggestionPublishResult> {
    article_id: number
}

export interface IChannelResponse<T extends number = ChannelResult> extends IResponse<T> {
    channel: IChannel,
    suggestion_count: number
}

export interface IChannelCreateRequest {
    title: string,
    description: string,
    is_article_suggestion_enabled: boolean,
    is_commenting_enabled: boolean
}

export interface ISubsciptionCountResponse extends IResponse {
    subscription_count: number
}

export interface IArticleCommentResponce extends IResponse<CommentAddResult> {
    comment: IArticleComment
}

export interface IArticleTextBlock {
    text: string,
    text_length: number
}

export interface IArticleHeaderBlock  {
    text: string,
    text_length: number,
    level: number
}

export interface IArticleImageItem {
    id: string,
    url: string,
    hash: string,
    width: number,
    height: number
}

export interface IArticleImageBlock {
    items: IArticleImageItem[],
    item_count: number
}

export interface IArticleQuoteBlock {
    text: string,
    caption: string,
    alignment: string,
    text_length: number,
    caption_length: number
}

export interface IArticleListBlock {
    style: string,
    items: string[],
    item_count: number
}

export interface IArticleEmbedBlock {
    url: string,
    hash: string,
    embed: string,
    width: number,
    height: number,
    image: string,
    title: string,
    service: string,
    site_name: string,
    description: string
}

export interface IArticlePayloadBlock {
    id: string,
    data: IArticleTextBlock | IArticleImageBlock | IArticleHeaderBlock | IArticleQuoteBlock | IArticleListBlock | IArticleEmbedBlock | {},
    name: string,
    type: string
}

export interface IArticleCreateRequest {
    repost_article_id: number | null,
    payload: {
        time: number,
        version: string,
        blocks: IArticlePayloadBlock[],
        block_count: number
    }
}

export interface IArticleSuggestionCreateRequest extends Omit<IArticleCreateRequest, 'repost_article_id'>{}

export interface IEmbedData extends IResponse {
    success: number,
    hash: string,
    site_name: string,
    title: string,
    description: string,
    image: string,
    embed: string,
    width: number,
    height: number,
    url: string
}

export interface IArticleResponse<T extends number = ArticleResult> extends IResponse<T> {
    article: IArticle
}

export interface IArticleCreateResponse extends IResponse<ArticleCreateEditResult> {
    article: IArticle
}

export interface IArticle {
    id: number,
    channel: IChannel,
    author: IProfile,
    payload: {
        time: number,
        blocks: IArticlePayloadBlock[]
    },
    vote: number,
    repost_article: IArticle,
    comment_count: number,
    repost_count: number,
    vote_count: number,
    creation_date: number,
    last_update_date: number,
    is_deleted: boolean,
    under_moderation_reason: string | null,
    is_under_moderation: boolean
    contains_repost_article: boolean
}

export interface IChannelBlockManageRequest {
    target_profile_id: number,
    is_blocked: boolean,
    reason: string | null,
    expire_date: number | null,
    is_reason_showing_enabled: boolean,
    is_perm_blocked: boolean
}

export interface IChannelBlockInfo {
    "@id": number,
    reason: string | null,
    added_date: number,
    expire_date: number | null,
    is_reason_showing_enabled: boolean,
    is_perm_blocked: boolean
}

export interface IChannelBlockInfoResponse extends IResponse<ChannelBlockResult> {
    channel_block: IChannelBlockInfo | null
}

export interface IChannelSearchRequest {
    query: string,
    permission?: number,
    is_blog: boolean,
    is_subscribed: boolean
}

export interface IArticleSearchRequest extends Omit<IBaseSearchRequest, "searchBy"> {
    channel_id: number
}

export interface IArticleComment extends IBaseComment {
    article: IArticle
}

export interface IChannelMediaTokenResponse extends IResponse<EditorAvaliableResult> {
    media_upload_token: string
}

export interface IFeedSearchResponse extends IResponse {
    articles: IPageableResponse<IArticle>,
    channels: IPageableResponse<IChannel>,
    tags: IPageableResponse<string>,
    blogs: IPageableResponse<IChannel>
}

export interface IChannelSubscribersSearchRequest extends IBaseSearchRequest {
    channel_id: number
}

export interface IChannelPermissionManageRequest {
    target_profile_id: number,
    permission: number
}

export enum ArticleCreateEditResult {
    InvalidRepostArticle = 2,
    InvalidPayload = 3,
    InvalidTags = 4,
    TemporarilyDisabled = 5,
    ArticleLimitReached = 6,
    ChannelNotFound = 7,
    ChannelNotOwned = 8,
    ChannelCreatorBanned = 9,
    ChannelBlocked = 10,
    ArticleNotFound = 11,
    ArticleDeleted = 12,
    BlogNotCreated = 13,
}

export enum ArticleDeleteResult {
    ArticleNotFound = 2,
    ArticleNotOwned = 3,
    ArticleDeleted = 4
}

export enum ArticleResult {
    ArticleDeleted = 2
}

export enum BlogCreateResult {
    ReputationLevelTooLow = 2
}

export enum ChannelCreateEditResult {
    InvalidTitle = 2,
    InvalidDescription = 3,
    ChannelLimitReached = 4,
    ChannelNotFound = 5,
    ChannelNotOwned = 6,
    ChannelCreatorBanned = 7
}

export enum ChannelPermissionManageResult {
    PermissionInvalid = 2,
    TargetProfileNotFound = 3,
    ChannelNotFound = 4,
    ChannelNotOwned = 5
}

export enum ChannelResult {
    ChannelNotFound = 2
}

export enum ChannelSubscribeResult {
    SubscriptionExists = 2,
    SubscriptionLimitReached = 3
}

export enum ChannelUnsubscribeResult {
    SubscriptionNotExists = 2
}

export enum ChannelBlockResult {
    ChannelNotFound = 2,
    ChannelNotOwned = 3,
    BlockNotFound = 4
}

export enum ChannelUploadCoverAvatarResult {
    ChannelNotFound = 2,
    ChannelNotOwned = 3
}

export enum EditorAvaliableResult {
    TemporarilyDisabled = 2,
    ArticleLimitReached = 3,
    ChannelNotFound = 4,
    ChannelNotOwned = 5,
    ChannelCreatorBanned = 6,
    BlogNotCreated = 7
}

export enum ArticleSuggestionPublishResult {
    ArticleSuggestionNotFound = 2,
    ChannelNotFound = 3,
    ChannelNotOwned = 4,
    InvalidPayload = 5,
    InvalidTags = 6,
    ChannelCreatorBanned = 7,
    TemporarilyDisabled = 8,
    BlogNotCreated = 9
}

export enum ArticleSuggestionDeleteResult {
    ArticleSuggestionNotFound = 2,
    ArticleSuggestionNotOwned = 3
}