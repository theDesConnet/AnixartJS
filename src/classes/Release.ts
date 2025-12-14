import { Anixart } from "../client";
import { BookmarkType, IBaseCommentAddRequest, ICommentRelease, IEpisodeLastUpdate, IRelated, IRelease, IReleaseCategory, IReleaseStatus, IVideoBanners, DefaultResult, Writable, ReleaseAddCollectionResult, IEpisode } from "../types";
import { Collection } from "./Collection";
import { Dubber } from "./Dubber";
import { ReleaseComment } from "./ReleaseComment";

export class Release {
    public readonly id: number;
    public readonly poster: string;
    public readonly image: string;
    public readonly year: string;
    public readonly genres: string;
    public readonly country: string;
    public readonly director: string;
    public readonly author: string;
    public readonly translators: string;
    public readonly studio: string;
    public readonly description: string;
    public readonly note: string | null;
    public readonly related: IRelated;
    public readonly category: IReleaseCategory;
    public readonly rating: number;
    public readonly grade: number;
    public readonly status: IReleaseStatus;
    public readonly duration: number;
    public readonly season: number;
    public readonly broadcast: number;
    public readonly screenshots: string[];
    public readonly comments: ICommentRelease[];
    public readonly titleOriginal: string;
    public readonly titleRu: string;
    public readonly titleAlt: string;
    public readonly episodesReleased: number;
    public readonly episodesTotal: number;
    public readonly releaseDate: string;
    public readonly vote1Count: number;
    public readonly vote2Count: number;
    public readonly vote3Count: number;
    public readonly vote4Count: number;
    public readonly vote5Count: number;
    public readonly voteCount: number;
    public readonly creationDate: Date;
    public readonly lastUpdateDate: Date;
    public readonly airedOnDate: number;
    public readonly favoritesCount: number;
    public readonly watchingCount: number;
    public readonly planCount: number;
    public readonly completedCount: number;
    public readonly holdOnCount: number;
    public readonly droppedCount: number;
    public readonly isAdult: boolean;
    public readonly isPlayDisabled: boolean;
    public readonly isTppDisabled: boolean;
    public readonly canVideoAppeal: boolean;
    public readonly canTorlookSearch: boolean;
    public readonly isDeleted: boolean;
    public readonly ageRating: number;
    public readonly yourVote: number;
    public readonly relatedCount: number;
    public readonly commentCount: number;
    public readonly commentsCount: number;
    public readonly collectionCount: number;
    public readonly profileListStatus: number;
    public readonly statusId: number;
    public readonly lastViewTimestamp: number;
    public readonly lastViewEpisode: IEpisode;
    public readonly isViewed: boolean;
    public readonly isFavorite: boolean;
    public readonly isViewBlocked: boolean;
    public readonly screenshotImages: string[];
    public readonly relatedReleases: Release[] | null;
    public readonly recommendedReleases: Release[];
    public readonly episodeLastUpdate: IEpisodeLastUpdate;
    public readonly commentPerDayCount: number;
    public readonly videoBanners: IVideoBanners[];
    public readonly profileReleaseTypeNotificationPreferenceCount: number;
    public readonly isReleaseTypeNotificationsEnabled: boolean;

    constructor(private readonly client: Anixart, releaseResponse: IRelease) {
        this.id = releaseResponse.id;
        this.poster = releaseResponse.poster;
        this.image = releaseResponse.image;
        this.year = releaseResponse.year;
        this.genres = releaseResponse.genres;
        this.country = releaseResponse.country;
        this.director = releaseResponse.director;
        this.author = releaseResponse.author;
        this.translators = releaseResponse.translators;
        this.studio = releaseResponse.studio;
        this.description = releaseResponse.description;
        this.note = releaseResponse.note;
        this.related = releaseResponse.related;
        this.category = releaseResponse.category;
        this.rating = releaseResponse.rating;
        this.grade = releaseResponse.grade;
        this.status = releaseResponse.status;
        this.duration = releaseResponse.duration;
        this.season = releaseResponse.season;
        this.broadcast = releaseResponse.broadcast;
        this.screenshots = releaseResponse.screenshots;
        this.comments = releaseResponse.comments;
        this.titleOriginal = releaseResponse.title_original;
        this.titleRu = releaseResponse.title_ru;
        this.titleAlt = releaseResponse.title_alt;
        this.episodesReleased = releaseResponse.episodes_released;
        this.episodesTotal = releaseResponse.episodes_total;
        this.releaseDate = releaseResponse.release_date;
        this.vote1Count = releaseResponse.vote_1_count;
        this.vote2Count = releaseResponse.vote_2_count;
        this.vote3Count = releaseResponse.vote_3_count;
        this.vote4Count = releaseResponse.vote_4_count;
        this.vote5Count = releaseResponse.vote_5_count;
        this.voteCount = releaseResponse.vote_count;
        this.creationDate = new Date(releaseResponse.creation_date * 1000);
        this.lastUpdateDate = new Date(releaseResponse.last_update_date * 1000)
        this.airedOnDate = releaseResponse.aired_on_date;
        this.favoritesCount = releaseResponse.favorites_count;
        this.watchingCount = releaseResponse.watching_count;
        this.planCount = releaseResponse.plan_count;
        this.completedCount = releaseResponse.completed_count;
        this.holdOnCount = releaseResponse.hold_on_count;
        this.droppedCount = releaseResponse.dropped_count;
        this.isAdult = releaseResponse.is_adult;
        this.isPlayDisabled = releaseResponse.is_play_disabled;
        this.isTppDisabled = releaseResponse.is_tpp_disabled;
        this.canVideoAppeal = releaseResponse.can_video_appeal;
        this.canTorlookSearch = releaseResponse.can_torlook_search;
        this.isDeleted = releaseResponse.is_deleted;
        this.ageRating = releaseResponse.age_rating;
        this.yourVote = releaseResponse.your_vote;
        this.relatedCount = releaseResponse.related_count;
        this.commentCount = releaseResponse.comment_count;
        this.commentsCount = releaseResponse.comments_count;
        this.collectionCount = releaseResponse.collection_count;
        this.profileListStatus = releaseResponse.profile_list_status;
        this.statusId = releaseResponse.status_id;
        this.lastViewTimestamp = releaseResponse.last_view_timestamp;
        this.lastViewEpisode = releaseResponse.last_view_episode;
        this.isViewed = releaseResponse.is_viewed;
        this.isFavorite = releaseResponse.is_favorite;
        this.isViewBlocked = releaseResponse.is_view_blocked;
        this.screenshotImages = releaseResponse.screenshot_images;
        this.relatedReleases = releaseResponse.related_releases?.map(release => new Release(this.client, release));
        this.recommendedReleases = releaseResponse.recommended_releases?.map(release => new Release(this.client, release));
        this.episodeLastUpdate = releaseResponse.episode_last_update;
        this.commentPerDayCount = releaseResponse.comment_per_day_count;
        this.videoBanners = releaseResponse.video_banners;
        this.profileReleaseTypeNotificationPreferenceCount = releaseResponse.profile_release_type_notification_preference_count;
        this.isReleaseTypeNotificationsEnabled = releaseResponse.is_release_type_notifications_enabled;
    }

    private writeProperties(prop: keyof this, value: any) {
        (<Writable<this>>this)[prop] = value;
    }

    public async getDubbers() {
        const request = await this.client.endpoints.release.getDubbers(this.id);

        return request.types.map(dubber => new Dubber(this.client, dubber, this));
    }

    public async removeFromHistory(): Promise<DefaultResult> {
        const request = await this.client.endpoints.release.removeFromHistory(this.id);

        return request.code;
    }

    public async setFavorite(favorite: boolean): Promise<DefaultResult> {
        const request = favorite ?
        await this.client.endpoints.release.addFavorite(this.id) :
        await this.client.endpoints.release.removeFavorite(this.id);

        if (request.code == DefaultResult.Ok) {
            this.writeProperties("isFavorite", favorite);
        }

        return request.code;
    }

    public async addToList(type: BookmarkType): Promise<DefaultResult> {
        const request = await this.client.endpoints.release.addToProfileList(this.id, type);

        if (request.code == DefaultResult.Ok) {
            this.writeProperties("profileListStatus", type);
        }

        return request.code;
    }

    public async removeFromList(type?: BookmarkType): Promise<DefaultResult> {
        const request = await this.client.endpoints.release.removeFromProfileList(this.id, type ? type : this.profileListStatus);
        
        if (request.code == DefaultResult.Ok) {
            this.writeProperties("profileListStatus", null);
        }

        return request.code;
    }

    public async getRelatedReleases(page: number = 0): Promise<Release[] | null> {
        const request = await this.client.endpoints.release.getRelatedReleases(this.related.id, page);

        return request.code == DefaultResult.Ok ? request.content.map(release => new Release(this.client, release)) : null;
    }

    public async getComments(page: number = 0, sort: number = 0): Promise<ReleaseComment[] | null> {
        const request = await this.client.endpoints.release.getComments({ page, sort, id: this.id });

        return request.code == DefaultResult.Ok ? request.content.map(comment => new ReleaseComment(this.client, comment, this)) : null;
    }

    public async addComment(data: IBaseCommentAddRequest): Promise<ReleaseComment | null> {
        const request = await this.client.endpoints.release.addComment(this.id, data);

        if (request.code == DefaultResult.Ok) {
            this.writeProperties("commentCount", this.commentCount + 1)
            this.writeProperties("commentsCount", this.commentsCount + 1)
        }

        return request.code == DefaultResult.Ok ? new ReleaseComment(this.client, request.comment, this) : null;
    }

    public async addVote(vote: 1 | 2 | 3 | 4 | 5): Promise<DefaultResult> {
        const request = await this.client.endpoints.release.addVote(this.id, vote);

        if (request.code == DefaultResult.Ok) {
            this.writeProperties("voteCount", this.voteCount + 1);
            this.writeProperties("yourVote", vote);
        }

        return request.code
    }

    public async getCollections(page: number, sort: number = 0): Promise<Collection[]> {
        const request = await this.client.endpoints.collection.getReleaseInCollection({
            id: this.id,
            sort,
            page
        });

        return request.content.map(x => new Collection(this.client, x));
    }

    public async addToCollection(id: number): Promise<DefaultResult | ReleaseAddCollectionResult> {
        const request = await this.client.endpoints.collection.addReleaseToCollection(id, this.id);

        return request.code;
    }
}