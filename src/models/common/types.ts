import {
  IProfileCompact,
  IProfileSlim,
  CommentAddResult,
  CommonResult,
  IProfileNotificationType,
} from "../";

export interface IResponse<T extends number = CommonResult> {
  code: CommonResult | T;
}

export interface IPageableResponse<
  T,
  TResult extends number = CommonResult,
> extends IResponse<TResult> {
  content: T[];
  total_count: number;
  total_page_count: number;
  current_page: number;
}

export interface ICommonComment<T extends IProfileCompact = IProfileCompact> {
  id: number;
  message: string;
  timestamp: number;
  type: number;
  vote: number;

  profile: T;

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

export interface ICommonCommentCompact {
  id: number;
  profile: IProfileSlim;
  message: string;
  is_spoiler: boolean;
}

export interface ICommonProfileNotification<
  TType extends string = IProfileNotificationType,
> {
  type: TType;
  id: number;
  timestamp: number;
  is_new: boolean;
  is_pushed: boolean;
}

export interface ICommonCommentEditRequest {
  message: string;
  spoiler: boolean;
}

export interface ICommonCommentAddRequest extends ICommonCommentEditRequest {
  parentCommentId?: number | null;
  replyToProfileId?: number | null;
}

export interface ICommonCommentAddResponse<
  T extends ICommonComment,
> extends IResponse<CommentAddResult> {
  comment: T;
}
