/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

import { IArticleCompact } from "../article/types";
import {
  ICommonCommentCompact,
  ICommonProfileNotification,
  IResponse,
} from "../common/types";
import { IProfile, IProfileSlim } from "../profile/types";
import { IDubber, IEpisodeCompact, IProfileReleaseTypeNotificationPreference, IRelease } from "../release/types";
import { ProfileFriendNotificationStatus } from "./enums";

/** Значения поля type в уведомлениях профиля. */
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

/** Разделы закладок, для которых настраиваются уведомления. */
export type ProfileStatusNotificationPreferenceStatus =
  | "FAVORITE_STATUS"
  | "STATUS_WATCHING"
  | "STATUS_PLAN"
  | "STATUS_COMPLETED"
  | "STATUS_HOLD_ON"
  | "STATUS_DROPPED";

/** Количество уведомлений по данным API. */
export interface INotificationCountResponse extends IResponse {
  count: number;
}

/** Уведомление о комментарии с данными родительского комментария. */
export interface IProfileCommentNotification<
  T extends ICommonCommentCompact,
> extends ICommonProfileNotification {
  comment: T;
  parent_comment: T;
}

/** Уведомление об изменении статуса дружбы. */
export interface IProfileFriendNotification extends ICommonProfileNotification {
  profile: IProfile;
  status: ProfileFriendNotificationStatus;
  by_profile: IProfileSlim;
}

/** Уведомление о статье. */
export interface IProfileArticleNotification extends ICommonProfileNotification {
  "@id": number;
  article: IArticleCompact;
  profile: IProfile;
}

/** Уведомление о связанном релизе. */
export interface IProfileRelatedReleaseNotification extends ICommonProfileNotification {
  "@id": number;
  release: IRelease | number;
}

/** Уведомление о новой серии. */
export interface IProfileEpisodeNotification extends ICommonProfileNotification {
  episode: IEpisodeCompact;
}

/** Озвучка в общих настройках уведомлений. */
export interface IProfileTypeNotificationPreference {
  type: IDubber;
}

/** Раздел закладок в настройках уведомлений. */
export interface IProfileStatusNotificationPreference {
  status: ProfileStatusNotificationPreferenceStatus;
}

/** ID озвучек для уведомлений по одному релизу. */
export interface IReleaseTypeNotificationEditRequest {
  release_id: number;
  profile_release_type_notification_preferences: number[];
}

/** Выбранные разделы закладок для уведомлений. */
export interface IStatusNotificationEditRequest {
  profileStatusNotificationPreferences: number[];
}

/** ID озвучек для общих настроек уведомлений. */
export interface IProfileTypeNotificationEditRequest {
  profileTypeNotificationPreferences: number[];
}

/** Количество уведомлений по данным API. */
export interface INotificationCountResponse extends IResponse {
  count: number;
}

/** Настройки уведомлений профиля. */
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

/** Настройки уведомлений об озвучках одного релиза. */
export interface IReleaseTypeNotificationResponse extends IResponse {
  profile_release_type_notification_preferences:
    IProfileReleaseTypeNotificationPreference[] | null;
}
