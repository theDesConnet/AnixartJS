import {
  BlogCreateResult,
  ChannelBlockResult,
  ChannelCreateEditResult,
  ChannelProfilePermission,
  ChannelResult,
  ChannelsFilterSort,
  ChannelUploadCoverAvatarResult,
  ChannelWidgetPopularityPeriod,
  ChannelWidgetSort,
  EditorAvailableResult,
  IArticle,
  IProfileCompact,
  IResponse,
} from "../";

export interface IChannel {
  id: number;
  title: string;
  description: string;

  cover: string | null;
  avatar: string | null;

  permission: number;

  article_count: number;
  subscriber_count: number;

  creation_date: number;
  last_update_date: number;

  is_blog: boolean;
  is_commenting_enabled: boolean;
  is_article_suggestion_enabled: boolean;

  is_episode_channel_widget_enabled: boolean;
  episode_channel_widget_sort: ChannelWidgetSort;
  episode_channel_widget_popularity_period: ChannelWidgetPopularityPeriod;
  episode_channel_widget_article_count: number;

  is_linked_to_type: boolean;

  recent_article_count: number;

  is_verified: boolean;
  is_deleted: boolean;

  blog_profile_id: number | null;

  is_subscribed: boolean;
  is_muted: boolean;

  is_blocked: boolean;
  block_reason: string | null;
  block_expire_date: number | null;
  is_perm_blocked: boolean;

  is_creator: boolean;
  is_administrator_or_higher: boolean;
}

export interface IChannelCompact {
  id: number;
  title: string;
  description: string;

  cover: string | null;
  avatar: string | null;

  is_blog: boolean;
  is_commenting_enabled: boolean;
  is_deleted: boolean;

  blog_profile_id: number | null;
  permission: number;
}

export interface IChannelProfile extends IProfileCompact {
  channel_id: number;
  permission: ChannelProfilePermission;
  permission_creation_date: number;

  is_blocked: boolean;
  is_perm_blocked: boolean;

  block_reason: string | null;
  block_expire_date: number | null;
}

export interface IChannelBlock {
  added_date: number;
  expire_date: number;

  reason: string | null;

  is_perm_blocked: boolean;
  is_reason_showing_enabled: boolean;
}

export interface IEditorChannel {
  id: number;
  title: string;
  avatar: string | null;
  subscriber_count: number;
  is_blog: boolean;
}

export interface IChannelBlockManageRequest {
  target_profile_id: number;
  is_blocked: boolean;
  reason: string | null;
  expire_date: number | null;
  is_reason_showing_enabled: boolean;
  is_perm_blocked: boolean;
}

export interface IChannelsFilterRequest {
  permission?: number | null;
  is_blog?: boolean | null;
  is_subscribed?: boolean | null;
  sort: ChannelsFilterSort | null;
}

export interface IChannelCreateEditRequest {
  title: string;
  description: string;

  is_commenting_enabled: boolean;
  is_article_suggestion_enabled: boolean;

  is_episode_channel_widget_enabled: boolean | null;
  episode_channel_widget_sort: ChannelWidgetSort | null;
  episode_channel_widget_popularity_period: ChannelWidgetPopularityPeriod | null;
  episode_channel_widget_article_count: number | null;
}

export interface IChannelPermissionManageRequest {
  target_profile_id: number;
  permission?: number | null;
}

export interface ITypeChannelResponse extends IResponse {
  channel: IChannel | null;
  articles: IArticle[];

  are_widgets_hidden_globally: boolean;
  is_hidden_by_user: boolean;
  is_widget_eligible: boolean;
}

export interface IChannelUploadCoverAvatarResponse extends IResponse<ChannelUploadCoverAvatarResult> {
  url: string | null;
}

export interface IChannelBlockResponse extends IResponse<ChannelBlockResult> {
  channel_block: IChannelBlock | null;
}

export interface IChannelResponse extends IResponse<ChannelResult> {
  channel: IChannel | null;
  suggestion_count: number;
}

export interface IChannelCreateEditResponse extends IResponse<ChannelCreateEditResult> {
  channel: IChannel | null;
}

export interface IBlogCreateResponse extends IResponse<BlogCreateResult> {
  channel: IChannel | null;
}

export interface IEditorAvailableResponse extends IResponse<EditorAvailableResult> {
  media_upload_token: string | null;
}

export interface IEditorChannelsResponse extends IResponse {
  channels: IEditorChannel[];
}

export interface ISubscriptionCountResponse extends IResponse {
  subscription_count: number;
}
