/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

import {
  IRelease,
  IReleaseComment,
  IReleaseVideo,
  CommonResult,
  IResponse,
  ICollection,
  FriendStatus,
  PrivilegeLevel,
  ProfileDeletionResult,
  BookmarkType,
  BookmarksExportResult,
  ProfileResult,
  BadgeAwardTrigger,
  IPageableResponse,
  ProfileBadgeShowcaseResult,
} from "../";

/** Полный профиль, включая статистику и настройки видимости. */
export interface IProfile {
  id: number;
  login: string;
  avatar: string;
  status: string;

  avatar_animation?: string;

  badge: IBadge | null;
  badge_count?: number;
  badges_preview?: IBadge[];

  history: IRelease[];
  votes: IRelease[];
  roles: IRole[];

  last_activity_time: number;
  register_date: number;

  vk_page: string;
  tg_page: string;
  inst_page: string;
  tt_page: string;
  discord_page: string;

  ban_expires: number;
  ban_reason: string | null;
  privilege_level: PrivilegeLevel;

  watching_count: number;
  plan_count: number;
  completed_count: number;
  hold_on_count: number;
  dropped_count: number;
  favorite_count: number;
  comment_count: number;
  collection_count: number;
  video_count: number;
  friend_count: number;
  subscription_count: number;

  watched_episode_count: number;
  watched_time: number;

  pinned_section_id: number;

  is_private: boolean;
  is_sponsor: boolean;
  is_banned: boolean;
  is_perm_banned: boolean;
  is_deleted: boolean;
  is_deletion_requested: boolean;

  is_bookmarks_transferred: boolean;
  is_sponsor_transferred: boolean;

  is_vk_bound: boolean;
  is_google_bound: boolean;
  is_telegram_bound: boolean;
  is_yandex_bound: boolean;

  is_incognito: boolean;
  episode_channel_widgets_hidden: boolean;

  is_release_type_notifications_enabled: boolean;
  is_episode_notifications_enabled: boolean;
  is_first_episode_notification_enabled: boolean;
  is_related_release_notifications_enabled: boolean;
  is_report_process_notifications_enabled: boolean;
  is_comment_notifications_enabled: boolean;
  is_my_collection_comment_notifications_enabled: boolean;
  is_article_notifications_enabled: boolean;
  is_my_article_comment_notifications_enabled: boolean;

  is_verified: boolean;

  friends_preview: IProfile[];
  collections_preview: ICollection[];
  comments_preview: ICommentPreview[];
  release_videos_preview: IReleaseVideo[];

  watch_dynamics: IWatchDynamics[];

  friend_status: FriendStatus | null;
  rating_score: number;

  preferred_genres: IPreferredType[] | null;
  preferred_audiences: IPreferredType[] | null;
  preferred_themes: IPreferredType[] | null;

  theme_enabled: boolean;

  theme_gradient_start_color: string | null;
  theme_gradient_end_color: string | null;
  theme_gradient_angle: string | null;

  theme_icon_res_name: string | null;
  theme_icon_url: string | null;
  theme_icon_color: string | null;
  theme_icon_alpha: number | null;
  theme_icon_density: string | null;
  theme_icon_size: string | null;

  theme_animation_enabled: boolean;
  theme_animation_speed: string | null;

  theme_background_url: string | null;
  theme_background_mode: string | null;
  theme_background_alpha: number | null;

  deletion_requested_at: number;
  deletion_delete_at: number;

  /** Этот профиль находится в чёрном списке текущего пользователя. */
  is_blocked: boolean;
  /** Текущий пользователь находится в чёрном списке этого профиля. */
  is_me_blocked: boolean;
  is_stats_hidden: boolean;
  is_counts_hidden: boolean;
  is_social_hidden: boolean;
  is_friend_requests_disallowed: boolean;
  is_online: boolean;
}

/** Профиль с данными о значке, привилегиях и блокировке. */
export interface IProfileCompact {
  badge_id: number | null;
  badge_name: string | null;
  badge_type: number | null;
  badge_url: string | null;

  ban_expires: number;
  ban_reason: string;

  id: number;

  is_banned: boolean;
  is_sponsor: boolean;
  is_verified: boolean;

  privilege_level: number;

  login: string;
  avatar: string;
}

/** Минимальная карточка автора: ID, логин и аватар. */
export interface IProfileSlim {
  id: number;
  login: string;
  avatar: string;
}

/** Токен доступа и ID профиля, которому он принадлежит. */
export interface IProfileToken {
  id: number;
  token: string;
}

/** Комментарий к релизу в превью профиля. */
export type ICommentPreview = IReleaseComment & {
  commentType: "release";
};

/** Жанр, аудитория или тема с долей в предпочтениях профиля. */
export interface IPreferredType {
  name: string;
  percentage: number;
}

/** Роль профиля с названием и цветом. */
export interface IRole {
  id: number;
  name: string;
  color: string;
}

/** Значок; набор дополнительных полей зависит от метода API. */
export interface IBadge {
  id: number;
  name: string;
  type: number;
  timestamp: number;

  badge_url?: string | null;
  image_small_url?: string | null;
  image_medium_url?: string | null;

  /** @deprecated */
  image_url?: string;

  description?: string | null;
  category?: IBadgeCategory | null;
  rarity?: string | null;
  award?: IBadgeAward | null;

  is_available?: boolean | null;
  is_owned?: boolean;
  is_selected?: boolean;
  is_showcased?: boolean;

  ownership_percentage?: number | null;
}

/** Категория значка в каталоге. */
export interface IBadgeCategory {
  id: number;
  title: string;
}

/** Условие выдачи значка и связанный с ним релиз. */
export interface IBadgeAward {
  /** Допускает новые значения сервера, которых ещё нет в enum. */
  trigger: BadgeAwardTrigger | (string & {});

  episode_name: string | null;
  profile_list_status: number | null;

  release_id: number | null;
  release_image: string | null;
  release_title: string | null;
}

/** Раздел каталога значков со своим счётчиком. */
export interface IBadgeSection {
  id: number;
  title: string;
  count: number;
  content: IBadge[];
}

/** Запись о количестве просмотров за день. */
export interface IWatchDynamics {
  id: number;
  timestamp: number;
  day: number;
  count: number;
}

/** Запись в истории смены логина. */
export interface IChangeLogin {
  id: number;
  newLogin: string;
  timestamp: number;
}

/** Объект или действие, к которому применена мера модерации. */
export type EnforcementType =
  | "profile_ban"
  | "channel_suspension"
  | "channel_mute"
  | "collection_edit"
  | "article_edit"
  | "release_comment_edit"
  | "collection_comment_edit"
  | "article_comment_edit";

/** Способ обжалования меры модерации. */
export type AppealType = "UNKNOWN" | "NOT_AVAILABLE" | "MESSAGE" | "ADJUSTMENT";

/** Текущее состояние апелляции. */
export type AppealStatus =
  | "UNKNOWN"
  | "NOT_SUBMITTED"
  | "SUBMITTED"
  | "ACCEPTED"
  | "REJECTED";

/** Достижение и значок, который за него выдаётся. */
export interface IAchievementPreview {
  name: string;
  badge: IBadge;
}

/** Мера модерации с историей обжалования и отмены. */
export interface IProfileEnforcement {
  type: EnforcementType;
  id: number;
  reason: string | null;
  creation_timestamp: number;
  appeal_type: AppealType;
  appeal_status: AppealStatus;
  appeal_submit_timestamp: number | null;
  appeal_expires_timestamp: number | null;
  appeal_process_message: string | null;
  appeal_process_timestamp: number | null;
  revocation_timestamp: number | null;
  is_revoked: boolean;
}

/** Профиль в списке участников с ролями. */
export interface IProfileRole extends IProfileCompact {
  is_online: boolean;
  roles: IRole[];
}

/** Тема, доступная для выбора в настройках. */
export interface IAvailableTheme {
  id: number;
  name: string;
}

/** Параметры оформления профиля. */
export interface ITheme {
  id: number;
  name: string;

  theme_enabled: boolean;

  theme_gradient_start_color: string | null;
  theme_gradient_end_color: string | null;
  theme_gradient_angle: string | null;

  theme_icon_res_name: string | null;
  theme_icon_url: string | null;
  theme_icon_color: string | null;
  theme_icon_alpha: number | null;
  theme_icon_density: string | null;
  theme_icon_size: string | null;

  theme_animation_enabled: boolean;
  theme_animation_speed: string | null;

  theme_background_url: string | null;
  theme_background_mode: string | null;
  theme_background_alpha: number | null;
}

/** Разделы закладок, выбранные для экспорта. */
export interface IBookmarksExportRequest {
  bookmarksExportProfileLists: BookmarkType[];
}

/** ID релизов, разложенные по разделам закладок. */
export interface IBookmarksImportRequest {
  selected_importer_name: string;
  watching: number[];
  plans: number[];
  completed: number[];
  dropped: number[];
  holdOn: number[];
}

/** Сводка о привилегиях, спонсорстве и блокировке профиля. */
export interface IProfileInfoResponse extends IResponse {
  channel_id: number | null;
  privilege_level: PrivilegeLevel;
  rating_score: number;
  sponsorship_expires: number;
  is_perm_banned: boolean;
  is_sponsor: boolean;
  ban_expires: number;
  is_banned: boolean;
}

/** Профиль и признак того, что он принадлежит текущему пользователю. */
export interface IProfileResponse extends IResponse<ProfileResult> {
  is_my_profile: boolean;
  profile: IProfile;
}

/** Статус дружбы после запроса к API. */
export interface IFriendStatusResponse<
  T extends number = CommonResult,
> extends IResponse<T> {
  friend_status: FriendStatus;
}

/** Подробности одной меры модерации. */
export interface IProfileEnforcementResponse extends IResponse {
  enforcement: IProfileEnforcement;
}

/** Сводка блокировок и ограничений профиля. */
export interface IProfileHealthStatusResponse extends IResponse {
  ban_count: number;
  ban_for_3_month_count: number;
  last_ban_timestamp: number;
  last_ban_expires: number;
  blog_suspension_expires: number;
  blog_mute_expires: number;
}

/** Даты запроса и запланированного удаления профиля. */
export interface IProfileDeletionResponse extends IResponse<ProfileDeletionResult> {
  delete_at: number;
  requested_at: number;
}

/** Текущие настройки профиля и ограничения на их изменение. */
export interface IProfilePreferenceResponse extends IResponse {
  available_themes: IAvailableTheme[];
  avatar: string;
  badge: IBadge | null;
  ban_change_avatar_expires: number;
  ban_change_login_expires: number;
  channel_id: number | null;
  email_hint: string | null;
  episode_channel_widgets_hidden: boolean;
  pinned_section_id: number | null;
  privacy_counts: number;
  privacy_friend_requests: number;
  privacy_social: number;
  privacy_stats: number;
  selected_theme_id: number;
  status: string;
  tgPage: string;
  vkPage: string;
  is_change_avatar_banned: boolean;
  is_change_login_banned: boolean;
  is_google_bound: boolean;
  is_incognito: boolean;
  is_login_changed: boolean;
  is_telegram_bound: boolean;
  is_vk_bound: boolean;
  is_yandex_bound: boolean;
}

/** Релизы из выбранных разделов закладок. */
export interface IBookmarksExportResponse
  extends IResponse<BookmarksExportResult> {
  releases: IRelease[] | null;
}

/** Каталог значков профиля, сгруппированный по разделам. */
export interface IProfileBadgeSectionsResponse
  extends IResponse {
  profile: IProfile;
  recent: IBadge[];
  sections: IBadgeSection[];
  showcased: IBadge[];
  total_count: number;
}

/** Страница значков вместе с данными профиля. */
export interface IProfileBadgePageableResponse
  extends IPageableResponse<IBadge> {
  profile: IProfile;
}

/** Данные одного значка. */
export interface IProfileBadgeResponse
  extends IResponse {
  badge: IBadge;
}

/** Код результата изменения витрины значков. */
export interface IProfileBadgeShowcaseResponse
  extends IResponse<ProfileBadgeShowcaseResult> { }

/** ID значков в нужном порядке на витрине. */
export interface IReorderBadgeShowcaseRequest {
  /** Порядок ID задаёт порядок значков на витрине. */
  ids: number[];
}

/** Предпросмотр достижения перед получением. */
export interface IAchievementPreviewResponse
  extends IResponse {
  achievement: IAchievementPreview;
}
