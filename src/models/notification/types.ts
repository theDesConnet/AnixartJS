import {
  ICommonCommentCompact,
  ICommonProfileNotification,
  IResponse,
} from "../common/types";
import { IProfile, IProfileSlim } from "../profile/types";
import { IDubber, IEpisodeCompact, IProfileReleaseTypeNotificationPreference, IRelease } from "../release/types";
import { ProfileFriendNotificationStatus } from "./enums";

export type IProfileNotificationType =
  | "friend"
  | "episode"
  | "releaseComment"
  | "collectionComment"
  | "myCollection"
  | "article"
  | "articleComment"
  | "myArticle"
  | "relatedRelease";

export type ProfileStatusNotificationPreferenceStatus =
  | "FAVORITE_STATUS"
  | "STATUS_WATCHING"
  | "STATUS_PLAN"
  | "STATUS_COMPLETED"
  | "STATUS_HOLD_ON"
  | "STATUS_DROPPED";

export interface INotificationCountResponse extends IResponse {
  count: number;
}

export interface IProfileCommentNotification<
  T extends ICommonCommentCompact,
> extends ICommonProfileNotification {
  comment: T;
  parent_comment: T;
}

export interface IProfileFriendNotification extends ICommonProfileNotification {
  profile: IProfile;
  status: ProfileFriendNotificationStatus;
  by_profile: IProfileSlim;
}

export interface IProfileArticleNotification extends ICommonProfileNotification {
  "@id": number;
  article: number;
  profile: IProfile;
}

export interface IProfileRelatedReleaseNotification extends ICommonProfileNotification {
  "@id": number;
  release: IRelease | number;
}

export interface IProfileEpisodeNotification extends ICommonProfileNotification {
  episode: IEpisodeCompact;
}

export interface IProfileTypeNotificationPreference {
  type: IDubber;
}

export interface IProfileStatusNotificationPreference {
  status: ProfileStatusNotificationPreferenceStatus;
}

export interface IReleaseTypeNotificationEditRequest {
  release_id: number;
  profile_release_type_notification_preferences: number[];
}

export interface IStatusNotificationEditRequest {
  profileStatusNotificationPreferences: number[];
}

export interface IProfileTypeNotificationEditRequest {
  profileTypeNotificationPreferences: number[];
}

export interface INotificationCountResponse extends IResponse {
  count: number;
}

export interface INotificationPreferenceResponse extends IResponse {
  profileStatusNotificationPreferences: IProfileStatusNotificationPreference[];

  profileTypeNotificationPreferences: IProfileTypeNotificationPreference[];

  is_release_type_notifications_enabled: boolean;
  is_episode_notifications_enabled: boolean;
  is_first_episode_notification_enabled: boolean;
  is_related_release_notifications_enabled: boolean;
  is_report_process_notifications_enabled: boolean;
  is_comment_notifications_enabled: boolean;
  is_my_collection_comment_notifications_enabled: boolean;
  is_article_notifications_enabled: boolean;
  is_my_article_comment_notifications_enabled: boolean;
}

export interface IReleaseTypeNotificationResponse extends IResponse {
  profile_release_type_notification_preferences:
    IProfileReleaseTypeNotificationPreference[] | null;
}
