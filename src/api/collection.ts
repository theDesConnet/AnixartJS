import { Anixart } from "../client";
import {
    IPageableResponse,
    IResponse,
    IBaseApiParams,
    ICollectionResponse,
    IRelease,
    ICollection,
    IReleaseInCollectionRequest,
    ICollectionCreateRequest,
    ICollectionComment
} from "../types";

/**
 * Класс коллекции
 * 
 * TODO: editImage
 */
export class Collection {
    public constructor(private readonly client: Anixart) { }

    public async all(page: number, sort: number = 2, options?: IBaseApiParams): Promise<IPageableResponse<ICollection>> {
        return await this.client.call<IPageableResponse<ICollection>>({ path: `/collection/all/${page}`, queryParams: {sort, previous_page: page - 1}, ...options });
    }

    public async info(id: number, options?: IBaseApiParams): Promise<ICollectionResponse> {
        return await this.client.call<ICollectionResponse>({ path: `/collection/${id}`, ...options });
    }

    public async getCollectionReleases(id: number, page: number, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<IPageableResponse<IRelease>>({ path: `/collection/${id}/releases/${page}`, ...options });
    }

    public async getCollectionFavorites(page: number, options?: IBaseApiParams): Promise<IPageableResponse<ICollection>> {
        return await this.client.call<IPageableResponse<ICollection>>({ path: `/collectionFavorite/all/${page}`, ...options });
    }

    public async addCollectionFavorite(id: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/collectionFavorite/add/${id}`, ...options });
    }

    public async removeCollectionFavorite(id: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/collectionFavorite/delete/${id}`, ...options });
    }

    public async getReleaseInCollection(data: IReleaseInCollectionRequest, options?: IBaseApiParams): Promise<IPageableResponse<ICollection>> {
        return await this.client.call<IPageableResponse<ICollection>>({ path: `/collection/all/release/${data.id}/${data.page}`, queryParams: { sort: data.sort }, ...options });
    }

    public async getUserCollections(id: number, page: number, options?: IBaseApiParams): Promise<IPageableResponse<ICollection>> {
        return await this.client.call<IPageableResponse<ICollection>>({ path: `/collection/all/profile/${id}/${page}`, ...options });
    }

    public async createCollection(data: ICollectionCreateRequest, options?: IBaseApiParams): Promise<ICollectionResponse> {
        return await this.client.call<ICollectionResponse>({ path: `/collectionMy/create`, json: data, ...options });
    }

    public async editCollection(id: number, data: ICollectionCreateRequest, options?: IBaseApiParams): Promise<ICollectionResponse> {
        return await this.client.call<ICollectionResponse>({ path: `/collectionMy/edit/${id}`, json: data, ...options });
    }

    /**
     *  {
          "code": 0,
          "collection": null
        }
     * 
     */
    public async addReleaseToCollection(collectionId: number, releaseId: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/collectionMy/release/add/${collectionId}`, queryParams: { release_id: releaseId }, ...options });
    }

    public async deleteCollection(id: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/collectionMy/delete/${id}`, ...options });
    }

    public async getComments(id: number, page: number, sort: number, options?: IBaseApiParams): Promise<IPageableResponse<ICollectionComment>> {
        return await this.client.call<IPageableResponse<ICollectionComment>>({ path: `/collection/comment/all/${id}/${page}`, queryParams: { sort }, ...options });
    }

    public async getComment(id: number, options?: IBaseApiParams): Promise<IResponse & ICollectionComment> {
        return await this.client.call<IResponse & ICollectionComment>({ path: `/collection/comment/${id}`, ...options });
    }

    public async getCommentReplies(id: number, page: number, sort: number, options?: IBaseApiParams): Promise<IPageableResponse<ICollectionComment>> {
        return await this.client.call<IPageableResponse<ICollectionComment>>({ path: `/collection/comment/replies/${id}/${page}`, queryParams: { sort }, method: "POST", ...options });
    }
}
