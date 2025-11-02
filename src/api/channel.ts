import { Anixart } from "../client";
import {
    IPageableResponse,
    IResponse,
    IBaseApiParams,
    IChannelResponse, 
    IChannel,
    IArticle,
    IArticleCreateRequest,
    IArticleCreateResponse,
    IChannelCreateRequest,
    IProfileShort,
    IArticleCommentResponce,
    IArticleComment,
    IBaseCommentAddRequest,
    IChannelMediaTokenResponse,
    VoteType,
    IArticleUploadFileResponse,
    IUrlResponse,
    IEmbedData,
    IArticleResponse,
    IArticleSuggestionPublishResponse,
    IArticleSuggestionCreateRequest,
    IChannelBlockManageRequest,
    IChannelBlockInfoResponse,
    ArticleCreateEditResult,
    DefaultResult,
    ChannelResult,
    ChannelSubscribeResult,
    ChannelUnsubscribeResult,
    ArticleResult,
    ChannelCreateEditResult,
    ArticleDeleteResult,
    CommentAddResult,
    CommentDeleteResult,
    EditorAvaliableResult,
    ChannelUploadCoverAvatarResult,
    ChannelBlockResult,
    ArticleSuggestionPublishResult,
    ArticleSuggestionDeleteResult
} from "../types";
import { Utils } from "../utils/Utils";

/**
 * Это из беты аниксарта 9.0
 * 
 * TODO: ...
 */
export class Channel {
    public constructor(private readonly client: Anixart) { }

    public async info(id: number, options?: IBaseApiParams): Promise<IChannelResponse> {
        return await this.client.call<ChannelResult, IChannelResponse>({ path: `/channel/${id}`, ...options });
    }

    public async all(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IChannel>> {
        return await this.client.call<DefaultResult, IPageableResponse<IChannel>>({ path: `/channel/all/${page}`, ...options });
    }

    public async getBlog(id: number, options?: IBaseApiParams): Promise<IChannelResponse> {
        return await this.client.call<ChannelResult, IChannelResponse>({ path: `/channel/blog/${id}`, ...options });
    }

    public async subscribe(id: number, options?: IBaseApiParams): Promise<IResponse<ChannelSubscribeResult>> {
        return await this.client.call<ChannelSubscribeResult, IResponse<ChannelSubscribeResult>>({ path: `/channel/subscribe/${id}`, method: "POST", ...options });
    }

    public async unsubscribe(id: number, options?: IBaseApiParams): Promise<IResponse<ChannelUnsubscribeResult>> {
        return await this.client.call<ChannelUnsubscribeResult, IResponse<ChannelUnsubscribeResult>>({ path: `/channel/unsubscribe/${id}`, method: "POST", ...options });
    }

    public async getArticles(id: number, page: number, date?: number, options?: IBaseApiParams): Promise<IPageableResponse<IArticle>> {
        return await this.client.call<DefaultResult, IPageableResponse<IArticle>>({ path: `/article/all/${page}`, json: { channel_id: id, date: date ?? 0 }, ...options });
    }

    public async getArticle(id: number, options?: IBaseApiParams): Promise<IArticleResponse> {
        return await this.client.call<ArticleResult, IArticleResponse>({ path: `/article/${id}`, ...options });
    }

    public async createArticle(channelId: number, article: IArticleCreateRequest, options?: IBaseApiParams) {
        return await this.client.call<ArticleCreateEditResult, IArticleCreateResponse>({ path: `/article/create/${channelId}`, method: "POST", json: article, ...options });
    }

    public async editArticle(id: number, article: IArticleCreateRequest, options?: IBaseApiParams) {
        return await this.client.call<ArticleCreateEditResult, IArticleCreateResponse>({ path: `/article/edit/${id}`, method: "POST", json: article, ...options });
    }

    public async create(data: IChannelCreateRequest, options?: IBaseApiParams): Promise<IChannelResponse<ChannelCreateEditResult>> {
        return await this.client.call<ChannelCreateEditResult, IChannelResponse<ChannelCreateEditResult>>({ path: `/channel/create`, method: "POST", json: data, ...options });
    }

    public async removeArticleComment(id: number, options?: IBaseApiParams): Promise<IResponse<CommentDeleteResult>> {
        return await this.client.call<CommentDeleteResult, IResponse<CommentDeleteResult>>({ path: `/article/comment/delete/${id}`, ...options });
    }

    public async removeArticle(id: number, options?: IBaseApiParams): Promise<IResponse<ArticleDeleteResult>> {
        return await this.client.call<ArticleDeleteResult, IResponse<ArticleDeleteResult>>({ path: `/article/delete/${id}`, ...options});
    }

    public async addArticleComment(id: number, data: IBaseCommentAddRequest, options?: IBaseApiParams): Promise<IArticleCommentResponce> {
        return await this.client.call<CommentAddResult, IArticleCommentResponce>({ path: `/article/comment/add/${id}`, json: data, ...options });
    }

    public async getVotes(id: number, page: number, sort: number, options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfileShort>>({ path: `/article/votes/${id}/${page}`, queryParams: { sort }, method: "POST", ...options });
    }

    public async getComments(id: number, page: number, sort: number, options?: IBaseApiParams): Promise<IPageableResponse<IArticleComment>> {
        return await this.client.call<DefaultResult, IPageableResponse<IArticleComment>>({ path: `/article/comment/all/${id}/${page}`, queryParams: { sort }, ...options });
    }

    public async getCommentReplies(id: number, page: number, sort: number, options?: IBaseApiParams): Promise<IPageableResponse<IArticleComment>> {
        return await this.client.call<DefaultResult, IPageableResponse<IArticleComment>>({ path: `/article/comment/replies/${id}/${page}`, queryParams: { sort }, method: "POST", ...options });
    }

    public async getAvaliableEditor(id: number, isSuggestionMode: boolean = false, isEditMode: boolean = false,  options?: IBaseApiParams): Promise<IChannelMediaTokenResponse> {
        return await this.client.call<EditorAvaliableResult, IChannelMediaTokenResponse>({ path: `/channel/${id}/editor/available`, queryParams: {is_suggestion: isSuggestionMode, is_edit_mode: isEditMode},  ...options})
    }

    public async voteArticle(id: number, vote: VoteType, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/article/vote/${id}/${vote}`, ...options });
    }

    public async voteCommentArticle(id: number, vote: VoteType, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/article/comment/vote/${id}/${vote}`, ...options });
    }

    public async uploadArticleImage(media_token: string, file: Buffer, options?: IBaseApiParams): Promise<IArticleUploadFileResponse> {
        return await this.client.call<DefaultResult, IArticleUploadFileResponse>({ path: `/content/upload`, method: "POST", image: {stream: file, name: Utils.generateTempFileName(), type: "file"}, bearer: media_token, customBaseUrl: "https://editor.anixsekai.com",...options });
    }

    public async uploadChannelAvatar(id: number, file: Buffer, options?: IBaseApiParams): Promise<IUrlResponse> {
        return await this.client.call<ChannelUploadCoverAvatarResult, IUrlResponse>({ path: `/channel/avatar/upload/${id}`, method: "POST", image: {stream: file, name: Utils.generateTempFileName(), type: "image"}, ...options });
    }

    public async generateEmbedData(type: "youtube" | "vk" | "link", media_token: string, link: string, options?: IBaseApiParams): Promise<IEmbedData> {
        let request = await this.client.call<DefaultResult, IEmbedData>({ path: `/embed/${type}`, customBaseUrl: "https://editor.anixsekai.com", bearer: media_token, queryParams: {url: link},  ...options });
        
        request.url = link;
        
        return request;
    }

    public async uploadChannelCover(id: number, file: Buffer, options?: IBaseApiParams): Promise<IUrlResponse> {
        return await this.client.call<ChannelUploadCoverAvatarResult, IUrlResponse>({ path: `/channel/cover/upload/${id}`, method: "POST", image: {stream: file, name: Utils.generateTempFileName(), type: "image"}, ...options });
    };

    public async editChannel(id: number, data: IChannelCreateRequest, options?: IBaseApiParams): Promise<IChannelResponse> {
        return await this.client.call({ path: `/channel/edit/${id}`, json: data, ...options });
    }

    public async getArticleSuggestions(id: number, page: number, options?: IBaseApiParams): Promise<IPageableResponse<IArticle>> {
        return await this.client.call<DefaultResult, IPageableResponse<IArticle>>({ path: `/article/suggestion/all/${page}`, json: { channel_id: id },  ...options });
    }

    public async removeArticleSuggestion(id: number, options?: IBaseApiParams): Promise<IResponse<ArticleSuggestionDeleteResult>> {
        return await this.client.call<ArticleSuggestionDeleteResult, IResponse<ArticleSuggestionDeleteResult>>({ path: `/article/suggestion/delete/${id}`, ...options});
    }

    public async publishArticleSuggestion(id: number, options?: IBaseApiParams): Promise<IArticleSuggestionPublishResponse> {
        return await this.client.call<ArticleSuggestionPublishResult, IArticleSuggestionPublishResponse>({ path: `/article/suggestion/publish/${id}`, ...options});
    }

    public async createArticleSuggestion(id: number, data: IArticleSuggestionCreateRequest, options?: IBaseApiParams): Promise<IArticleResponse<ArticleCreateEditResult>> {
        return await this.client.call<ArticleCreateEditResult, IArticleResponse<ArticleCreateEditResult>>({ path: `/article/suggestion/create/${id}`, json: data, ...options });
    }

    public async manageChannelBlocklist(id: number, data: IChannelBlockManageRequest, options?: IBaseApiParams): Promise<IResponse<ChannelBlockResult>> {
        return await this.client.call<ChannelBlockResult, IResponse<ChannelBlockResult>>({ path: `/channel/${id}/block/manage`, json: data, ...options })
    }

    public async getChannelBlock(id: number, profileId: number, options?: IBaseApiParams): Promise<IChannelBlockInfoResponse> {
        return await this.client.call<ChannelBlockResult, IChannelBlockInfoResponse>({ path: `/channel/${id}/block/${profileId}`, ...options})
    }
}