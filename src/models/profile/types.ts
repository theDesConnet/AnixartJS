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
} from "../";

export interface IProfile {
  id: number;
  login: string;
  avatar: string;
  status: string;

  badge: IBadge | null;

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

  is_blocked: boolean;
  is_me_blocked: boolean;
  is_stats_hidden: boolean;
  is_counts_hidden: boolean;
  is_social_hidden: boolean;
  is_friend_requests_disallowed: boolean;
  is_online: boolean;
}

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

export interface IProfileSlim {
  id: number;
  login: string;
  avatar: string;
}

export interface IProfileToken {
  id: number;
  token: string;
}

export type ICommentPreview = IReleaseComment & {
  commentType: "release";
};

export interface IPreferredType {
  name: string;
  percentage: number;
}

export interface IRole {
  id: number;
  name: string;
  color: string;
}

export interface IBadge {
  id: number;
  name: string;
  timestamp: number;
  type: number;
  image_url: string;
}

export interface IWatchDynamics {
  id: number;
  timestamp: number;
  day: number;
  count: number;
}

export interface IChangeLogin {
  id: number;
  newLogin: string;
  timestamp: number;
}

export type EnforcementType =
  | "profile_ban"
  | "channel_suspension"
  | "channel_mute"
  | "collection_edit"
  | "article_edit"
  | "release_comment_edit"
  | "collection_comment_edit"
  | "article_comment_edit";

export type AppealType = "UNKNOWN" | "NOT_AVAILABLE" | "MESSAGE" | "ADJUSTMENT";

export type AppealStatus =
  | "UNKNOWN"
  | "NOT_SUBMITTED"
  | "SUBMITTED"
  | "ACCEPTED"
  | "REJECTED";

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

export interface IProfileRole extends IProfileCompact {
  is_online: boolean;
  roles: IRole[];
}

export interface IAvailableTheme {
  id: number;
  name: string;
}

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

export interface IBookmarksExportRequest {
  bookmarksExportProfileLists: BookmarkType[];
}

export interface IBookmarksImportRequest {
  selected_importer_name: string;
  watching: number[];
  plans: number[];
  completed: number[];
  dropped: number[];
  holdOn: number[];
}

export interface IProfileInfoResponse extends IResponse {
  channel_id: number | null;
  privilege_level: PrivilegeLevel;
  rating_score: number;
  sponsorship_expires: number;
  is_perm_banned: boolean;
  is_sponsor: boolean;
}

export interface IProfileResponse extends IResponse<ProfileResult> {
  is_my_profile: boolean;
  profile: IProfile;
}

export interface IFriendStatusResponse<
  T extends number = CommonResult,
> extends IResponse<T> {
  friend_status: FriendStatus;
}

export interface IProfileEnforcementResponse extends IResponse {
  enforcement: IProfileEnforcement;
}

export interface IProfileHealthStatusResponse extends IResponse {
  ban_count: number;
  ban_for_3_month_count: number;
  last_ban_timestamp: number;
  last_ban_expires: number;
  blog_suspension_expires: number;
  blog_mute_expires: number;
}

export interface IProfileDeletionResponse extends IResponse<ProfileDeletionResult> {
    delete_at: number;
    requested_at: number;
}

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

export interface IBookmarksExportResponse
  extends IResponse<BookmarksExportResult> {
  releases: IRelease[] | null;
}
