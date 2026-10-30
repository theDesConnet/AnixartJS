/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

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

/** Канал с настройками публикаций и правами текущего пользователя. */
export interface IChannel {
  id: number;
  title: string;
  description: string;

  cover: string | null;
  avatar: string | null;

  cover_animation: string | null;
  avatar_animation: string | null;

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

  channel_badge_id: number | null;
  channel_badge_name: string | null;
  channel_badge_type: number | null;
  channel_badge_url: string | null;

  last_article_date: number;

  is_creator: boolean;
  is_administrator_or_higher: boolean;
}

/** Короткая карточка канала для вложенных объектов. */
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

/** Участник канала с правами и данными о блокировке. */
export interface IChannelProfile extends IProfileCompact {
  channel_id: number;
  permission: ChannelProfilePermission;
  permission_creation_date: number;

  is_blocked: boolean;
  is_perm_blocked: boolean;

  block_reason: string | null;
  block_expire_date: number | null;
}

/** Срок и причина блокировки участника канала. */
export interface IChannelBlock {
  added_date: number;
  expire_date: number;

  reason: string | null;

  is_perm_blocked: boolean;
  is_reason_showing_enabled: boolean;
}

/** Канал в списке доступных для публикации. */
export interface IEditorChannel {
  id: number;
  title: string;
  avatar: string | null;
  subscriber_count: number;
  is_blog: boolean;
}

/** Установка или снятие блокировки участника канала. */
export interface IChannelBlockManageRequest {
  target_profile_id: number;
  is_blocked: boolean;
  reason: string | null;
  expire_date: number | null;
  is_reason_showing_enabled: boolean;
  is_perm_blocked: boolean;
}

/** Фильтр каналов по правам, подписке и типу. */
export interface IChannelsFilterRequest {
  permission?: number | null;
  is_blog?: boolean | null;
  is_subscribed?: boolean | null;
  sort: ChannelsFilterSort | null;
}

/** Название, описание и настройки публикаций канала. */
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

/** Изменение прав выбранного участника. */
export interface IChannelPermissionManageRequest {
  target_profile_id: number;
  permission?: number | null;
}

/** Канал озвучки, его статьи и состояние виджета. */
export interface ITypeChannelResponse extends IResponse {
  channel: IChannel | null;
  articles: IArticle[];

  are_widgets_hidden_globally: boolean;
  is_hidden_by_user: boolean;
  is_widget_eligible: boolean;
}

/** Адрес загруженного аватара или обложки канала. */
export interface IChannelUploadCoverAvatarResponse extends IResponse<ChannelUploadCoverAvatarResult> {
  url: string | null;
}

/** Данные блокировки участника, если она существует. */
export interface IChannelBlockResponse extends IResponse<ChannelBlockResult> {
  channel_block: IChannelBlock | null;
}

/** Канал и число предложенных статей. */
export interface IChannelResponse extends IResponse<ChannelResult> {
  channel: IChannel | null;
  suggestion_count: number;
}

/** Канал после создания или редактирования. */
export interface IChannelCreateEditResponse extends IResponse<ChannelCreateEditResult> {
  channel: IChannel | null;
}

/** Личный канал после создания блога. */
export interface IBlogCreateResponse extends IResponse<BlogCreateResult> {
  channel: IChannel | null;
}

/** Доступность редактора и токен загрузки медиа. */
export interface IEditorAvailableResponse extends IResponse<EditorAvailableResult> {
  media_upload_token: string | null;
}

/** Каналы, доступные пользователю в редакторе. */
export interface IEditorChannelsResponse extends IResponse {
  channels: IEditorChannel[];
}

/** Количество подписок пользователя. */
export interface ISubscriptionCountResponse extends IResponse {
  subscription_count: number;
}
