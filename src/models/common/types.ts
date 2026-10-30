/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

import {
  IProfileCompact,
  IProfileSlim,
  CommentAddResult,
  CommonResult,
  IProfileNotificationType,
} from "../";

/** Код результата API; HTTP-статус передаётся отдельно. */
export interface IResponse<T extends number = CommonResult> {
  /** Общий код API или код конкретного метода. */
  code: CommonResult | T;
}

/** Страница списка со счётчиками из ответа сервера. */
export interface IPageableResponse<
  T,
  TResult extends number = CommonResult,
> extends IResponse<TResult> {
  content: T[];
  total_count: number;
  total_page_count: number;
  current_page: number;
}

/** Общие поля комментариев к релизам, коллекциям и статьям. */
export interface ICommonComment<T extends IProfileCompact = IProfileCompact> {
  id: number;
  message: string;
  timestamp: number;
  type: number;
  vote: number;

  profile: T;

  /** ID родительского комментария; null для комментария вне ветки ответов. */
  parent_comment_id: number | null;

  vote_count: number;
  likes_count: number;

  is_spoiler: boolean;
  is_edited: boolean;
  is_deleted: boolean;
  is_reply: boolean;

  reply_count: number;
  can_like: boolean;
}

/** Короткая форма комментария для превью. */
export interface ICommonCommentCompact {
  id: number;
  profile: IProfileSlim;
  message: string;
  is_spoiler: boolean;
}

/** Поля, общие для уведомлений профиля. */
export interface ICommonProfileNotification<
  TType extends string = IProfileNotificationType,
> {
  type: TType;
  id: number;
  timestamp: number;
  is_new: boolean;
  is_pushed: boolean;
}

/** Текст комментария и отметка о спойлере. */
export interface ICommonCommentEditRequest {
  message: string;
  spoiler: boolean;
}

/** Новый комментарий или ответ на существующий. */
export interface ICommonCommentAddRequest extends ICommonCommentEditRequest {
  /** ID комментария, на который отправляется ответ. */
  parentCommentId?: number | null;
  /** ID пользователя, которому адресован ответ. */
  replyToProfileId?: number | null;
}

/** Созданный комментарий с кодом результата. */
export interface ICommonCommentAddResponse<
  T extends ICommonComment,
> extends IResponse<CommentAddResult> {
  comment: T;
}
