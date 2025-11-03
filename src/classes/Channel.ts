import { Anixart } from "../client";
import { IChannel, IChannelBlockInfo, IChannelBlockManageRequest, IChannelCreateRequest, IUrlResponse, DefaultResult, Writable, ChannelSubscribeResult, ChannelUnsubscribeResult, ChannelBlockResult } from "../types";
import { ArticleBuilder } from "../utils/ArticleBuilder";
import { SuggestionArticle } from "./SuggestionArticle";
import { Article } from "./Article";
import { BaseProfile } from "./BaseProfile";
import { FullProfile } from "./FullProfile";

export class Channel {
    public readonly id: number;
    public readonly title: string;
    public readonly description: string;
    public readonly channelAvatar: string;
    public readonly channelCover: string;
    public readonly clientPermission: number;
    public readonly articleCount: number;
    public readonly subscriberCount: number;
    public readonly creationDate: Date;
    public readonly lastUpdateDate: Date;
    public readonly isBlog: boolean;
    public readonly isCommentingEnabled: boolean;
    public readonly isArticleSuggestionEnabled: boolean;
    public readonly isVerified: boolean;
    public readonly isDeleted: boolean;
    public readonly blogProfileId: number;
    public readonly isSubscribed: boolean;
    public readonly isBlocked: boolean;
    public readonly blockReason: string;
    public readonly blockExpiredDate: Date;
    public readonly isPermBlocked: boolean;
    public readonly isAdministratorOrHigher: boolean;

    constructor(private readonly client: Anixart, channelResponce: IChannel) {
        this.id = channelResponce.id;
        this.title = channelResponce.title;
        this.description = channelResponce.description;
        this.channelAvatar = channelResponce.avatar;
        this.channelCover = channelResponce.cover;
        this.clientPermission = channelResponce.permission;
        this.articleCount = channelResponce.article_count;
        this.subscriberCount = channelResponce.subscriber_count;
        this.creationDate = new Date(channelResponce.creation_date * 1000);
        this.lastUpdateDate = new Date(channelResponce.last_update_date * 1000);
        this.isBlog = channelResponce.is_blog;
        this.isCommentingEnabled = channelResponce.is_commenting_enabled;
        this.isArticleSuggestionEnabled = channelResponce.is_article_suggestion_enabled;
        this.isVerified = channelResponce.is_verified;
        this.isDeleted = channelResponce.is_deleted;
        this.blogProfileId = channelResponce.blog_profile_id;
        this.isSubscribed = channelResponce.is_subscribed;
        this.isBlocked = channelResponce.is_blocked;
        this.blockReason = channelResponce.block_reason;
        this.blockExpiredDate = new Date(channelResponce.block_expire_date * 1000);
        this.isPermBlocked = channelResponce.is_perm_blocked;
        this.isAdministratorOrHigher = channelResponce.is_administrator_or_higher;
    }

    private writeProperties(prop: keyof this, value: any) {
        (<Writable<this>>this)[prop] = value;
    }

    public async getArticles(page: number, date?: number): Promise<(Article | undefined)[]> {
        const request = await this.client.endpoints.channel.getArticles(this.id, page, date ?? 0);

        return request.content.map(article => new Article(this.client, article, this));
    }

    public async getArticleById(id: number): Promise<Article | null> {
        const request = await this.client.endpoints.channel.getArticle(id);

        return request.article ? new Article(this.client, request.article) : null;
    }

    public async createArticle(data: ArticleBuilder): Promise<Article | null> {
        const request = await this.client.endpoints.channel.createArticle(this.id, data.returnBuildAricle());

        return request.article ? new Article(this.client, request.article) : null;
    }

    public async subscribe(): Promise<DefaultResult | ChannelSubscribeResult> {
        const request = await this.client.endpoints.channel.subscribe(this.id);

        if (request.code == DefaultResult.Ok) {
            this.writeProperties("isSubscribed", true)
        }

        return request.code;
    }

    public async unsubscribe(): Promise<DefaultResult | ChannelUnsubscribeResult> {
        const request = await this.client.endpoints.channel.unsubscribe(this.id);

        if (request.code == DefaultResult.Ok) {
            this.writeProperties("isSubscribed", false)
        }

        return request.code;
    }

    public async setAvatar(file: Buffer): Promise<this> {
        const request = await this.client.endpoints.channel.uploadChannelAvatar(this.id, file);

        if (request.code == DefaultResult.Ok) {
            this.writeProperties("channelAvatar", request.url);
        }

        return this;
    }

    public async setCover(file: Buffer): Promise<this> {
        const request = await this.client.endpoints.channel.uploadChannelCover(this.id, file);

        if (request.code == DefaultResult.Ok) {
            this.writeProperties("channelCover", request.url);
        }
    
        return this;
    }

    public async getMediaToken(isSuggestionMode: boolean = false, isEditMode: boolean = false): Promise<string | null> {
        const request = await this.client.endpoints.channel.getAvaliableEditor(this.id, isSuggestionMode, isEditMode);

        return request.media_upload_token;
    }

    public async edit(data: IChannelCreateRequest): Promise<Channel | null> {
        const request = await this.client.endpoints.channel.editChannel(this.id, data);

        return request?.channel ? new Channel(this.client, request.channel) : null;
    }

    public async getArticleSuggestions(page: number): Promise<(SuggestionArticle[] | null)> {
        const request = await this.client.endpoints.channel.getArticleSuggestions(this.id, page)
        
        return request.content ? request.content.map(article => new SuggestionArticle(this.client, article, this)) : null;
    }

    public async createArticleSuggestion(data: ArticleBuilder): Promise<SuggestionArticle | null> {
        const request = await this.client.endpoints.channel.createArticleSuggestion(this.id, data.returnBuildAricle());

        return request.code == DefaultResult.Ok ? new SuggestionArticle(this.client, request.article, this) : null;
    }

    public async manageBlocklist(profile: BaseProfile | FullProfile | number, data: Omit<IChannelBlockManageRequest, "target_profile_id">): Promise<DefaultResult | ChannelBlockResult> {
        const request = await this.client.endpoints.channel.manageChannelBlocklist(this.id, {
            target_profile_id: typeof(profile) == "number" ? profile : profile.id,
            ...data
        })

        return request.code;
    }

    public async getBlocklist(profile: BaseProfile | FullProfile | number): Promise<IChannelBlockInfo | null> {
        const request = await this.client.endpoints.channel.getChannelBlockProfile(this.id, typeof(profile) == "number" ? profile : profile.id);

        return request.channel_block;
    }
}