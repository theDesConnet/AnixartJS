/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

import { ICommonComment, ICommonCommentCompact, IResponse } from "../common/types";
import { IBadge, IProfile, IProfileCompact } from "../profile/types";
import {
  FilterGenresMode,
  FilterSort,
  ReleaseCategory,
  ReleaseStatus,
  ReleaseVideoResult,
} from "./enums";

/** Пользовательская оценка релиза по пятибалльной шкале. */
export type IReleaseVote = 1 | 2 | 3 | 4 | 5;

/** Карточка релиза со статистикой и состоянием для текущего пользователя. */
export interface IRelease {
  id: number;

  age_rating: number;
  aired_on_date: number;

  author: string;
  broadcast: number;

  can_torlook_search: boolean;
  can_video_appeal: boolean;

  category: ReleaseCategory;

  collection_count: number;
  comment_count: number;
  comment_per_day_count: number;
  comments: IReleaseComment[];

  completed_count: number;
  country: string;
  description: string;
  director: string;
  dropped_count: number;
  duration: number;

  episode_last_update: IEpisodeUpdate;

  episodes_total: number;
  episodes_released: number;

  favorite_count: number;

  genres: string;
  grade: number;
  hold_on_count: number;

  image: string;

  is_adult: boolean;
  is_deleted: boolean;
  is_favorite: boolean;
  is_play_disabled: boolean;
  is_release_type_notifications_enabled: boolean;
  is_ru_blocked: boolean;
  is_tpp_disabled: boolean;
  is_view_blocked: boolean;
  is_viewed: boolean;

  last_view_episode: IEpisode;
  last_view_timestamp: number;

  note: string | null;

  note_background_color_dark: string;
  note_background_color_light: string;
  note_text_color_dark: string;
  note_text_color_light: string;

  plan_count: number;
  poster_animation?: string;
  screenshot_animations?: string[];

  profile_list_status: number;
  profile_release_type_notification_preference_count: number;
  profile_release_type_notification_preferences: IProfileReleaseTypeNotificationPreference[];

  rating: number;

  recommended_releases: IRelease[];

  related: IRelated;
  related_count: number;
  related_releases: IRelease[];

  release_date: string;

  screenshot_images: string[];

  season: number;

  source: string;

  status: IReleaseStatus;
  status_id: number;

  studio: string;

  title_original: string;
  title_ru: string;
  title_alt: string;

  translators: string;

  video_banners: IReleaseVideoBanner[];

  vote_1_count: number;
  vote_2_count: number;
  vote_3_count: number;
  vote_4_count: number;
  vote_5_count: number;
  vote_count: number;

  voted_at: number;

  watching_count: number;

  year: string;

  badge_count?: number;
  badges_preview?: IBadge[];

  creation_date: number;
  last_update_date: number;

  your_vote: number;
  my_vote: number;
}

/** Релиз в превью: ID, название и постер. */
export interface IReleaseCompact {
  id: number;
  title_ru: string;
  image: string;
}

/** Данные о последнем обновлении серий релиза. */
export interface IEpisodeUpdate {
  lastEpisodeTypeUpdateName: string;
  last_episode_source_update_id: number;
  last_episode_source_update_name: string;
  last_episode_type_update_id: number;
  last_episode_update_date: number;
  last_episode_update_name: string;
}

/** Статус выхода релиза: числовой код и название. */
export interface IReleaseStatus {
  id: ReleaseStatus;
  name: string;
}

/** Комментарий к релизу с привязкой к серии. */
export interface IReleaseComment extends ICommonComment<IProfileCompact> {
  release: IRelease;
  posted_at_episode: number;
}

/** Превью комментария с короткой карточкой релиза. */
export interface IReleaseCommentCompact extends ICommonCommentCompact {
  release: IReleaseCompact;
  embeddableId: number;
  embeddableTitle: string;
}

/** Серия у конкретного источника и состояние её просмотра. */
export interface IEpisode {
  id: number;

  added_date: number;
  position: number;
  quality: number;
  playback_position: number;

  release: IRelease;
  release_id: number;

  source: ISource;
  source_id: number;

  name: string;
  url: string;

  /** Ссылка ведёт на встраиваемый плеер. */
  iframe: boolean;
  is_filler: boolean;
  is_watched: boolean;
}

/** Серия в уведомлении: название, релиз и источник. */
export interface IEpisodeCompact {
  name: string;
  release: IReleaseCompact;
  source: ISourceCompact;
}

/** Источник серий для выбранной озвучки или субтитров. */
export interface ISource {
  episodes_count: number;
  id: number;
  name: string;
  quality: number;
  type: IDubber;
}

/** Название источника и короткие данные об озвучке. */
export interface ISourceCompact {
  name: string;
  type: IDubberCompact;
}

/** Озвучка, выбранная для уведомлений по релизу. */
export interface IProfileReleaseTypeNotificationPreference {
  type: IDubber;
}

/** Озвучка или субтитры со статистикой доступных серий. */
export interface IDubber {
  id: number;

  name: string;
  icon: string;
  workers: string;

  is_sub: boolean;
  pinned: boolean;

  episodes_count: number;
  quality: number;
  view_count: number;
}

/** Название озвучки или субтитров для превью. */
export interface IDubberCompact {
  name: string;
}

/** Дополнительное видео к релизу, например трейлер. */
export interface IReleaseVideo {
  id: number;
  /** В зависимости от ответа API приходит карточка релиза или только ID. */
  release: IRelease | number;
  profile: IProfile;
  category: {
    id: number;
    name: string;
  };
  hosting: {
    id: number;
    name: string;
    icon: string;
  };
  title: string;
  image: string;
  url: string;
  timestamp: number;
  player_url: string;
  is_favorite: boolean;
  favorites_count: number;
}

/** Баннер с действием в разделе видео релиза. */
export interface IReleaseVideoBanner {
  name: string;
  image: string;
  value: string;
  action_id: number;
  is_new: boolean;
}

/** Группа связанных релизов. */
export interface IRelated {
  description: string;
  id: number;
  image: string;
  images: string[];
  name: string;
  name_ru: string;
  release_count: number;
  cover_animation?: string;
}

/** Ссылка на релиз на стриминговой площадке. */
export interface IReleaseStreamingPlatform {
  id: number;
  release: IRelease;
  name: string;
  icon: string;
  url: string;
}

/** Категория дополнительных видео. */
export interface IReleaseVideoCategory {
  id: number;
  name: string;
}

/** Видео, сгруппированные по категории. */
export interface IReleaseVideoBlock {
  videos: IReleaseVideo[];
  category: IReleaseVideoCategory;
}

/** Карточка раздела «Интересное» с действием при открытии. */
export interface IInteresting {
  id: number;
  title: string;
  description: string;
  image: string;
  type: number;
  action: string;
  isHidden: boolean;
  image_animation?: string;
}

/** Видео, предлагаемое для добавления к релизу. */
export interface IReleaseVideoAppealRequest {
    categoryId: number;
    releaseId: number;
    title: string;
    url: string;
}

/** Условия фильтрации каталога релизов. */
export interface IFilterRequest {
  category_id?: number | null;
  country?: string | null;
  end_year?: number | null;

  episode_duration_from?: number | null;
  episode_duration_to?: number | null;

  episodes_from?: number | null;
  episodes_to?: number | null;

  genres_mode?: FilterGenresMode | null;
  is_genres_exclude_mode_enabled?: boolean;

  season?: number | null;
  source?: string | null;
  start_year?: number | null;
  status_id?: number | null;
  studio?: string | null;

  sort?: FilterSort | null;

  genres?: string[];
  profile_list_exclusions?: number[];
  types?: number[];
  age_ratings?: number[];
}

/** Одна серия, выбранная методом API. */
export interface IEpisodeTargetResponse extends IResponse {
  episode: IEpisode;
}

/** Список серий выбранного источника. */
export interface IEpisodeResponse extends IResponse {
  episodes: IEpisode[];
}

/** Доступные озвучки и субтитры. */
export interface IDubbersResponse extends IResponse {
  types: IDubber[];
}

/** Источники серий для выбранной озвучки. */
export interface ISourcesResponse extends IResponse {
  sources: ISource[];
}

/** Полная карточка релиза. */
export interface IReleaseResponse extends IResponse {
  release: IRelease;
}

/** Расписание релизов по дням недели. */
export interface IScheduleResponse extends IResponse {
  monday: IRelease[];
  tuesday: IRelease[];
  wednesday: IRelease[];
  thursday: IRelease[];
  friday: IRelease[];
  saturday: IRelease[];
  sunday: IRelease[];
}

/** Раздел видео релиза и доступность предложения новых видео. */
export interface IReleaseVideoResponse extends IResponse<ReleaseVideoResult> {
  blocks: IReleaseVideoBlock[];
  can_appeal: boolean;
  last_videos: IReleaseVideo[];
  release: IRelease;
  streaming_platforms: IReleaseStreamingPlatform;
}

/** Категории, доступные при добавлении видео. */
export interface IReleaseVideoCategoriesResponse extends IResponse {
  categories: IReleaseVideoCategory[];
}

/** Озвучки и необязательный список популярных ID. */
export interface ITypeResponse extends IResponse {
  types: IDubber[];
  popular_type_ids?: number[];
}
