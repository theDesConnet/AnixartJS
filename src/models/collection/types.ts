/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

import { ICommonComment, ICommonCommentCompact, IResponse } from "../common/types";
import { IProfile } from "../profile/types";
import { IRelease } from "../release/types";
import { CollectionCreateEditResult, CollectionEditImageResult, CollectionResult } from "./enums";

/** Пользовательская коллекция с релизами и статистикой. */
export interface ICollection {
  "@id": number;
  id: number;
  creator: IProfile;
  title: string;
  description: string;
  image: string;
  creation_date: number;
  last_update_date: number;
  comment_count: number;
  favorites_count: number;
  is_private: boolean;
  is_deleted: boolean;
  is_favorite: boolean;
  releases: IRelease[];
  cover_animation?: string;
}

/** Коллекция со счётчиками по разделам закладок. */
export interface ICollectionResponse extends IResponse<CollectionResult> {
  collection: ICollection | null;
  watching_count: number;
  plan_count: number;
  completed_count: number;
  hold_on_count: number;
  dropped_count: number;
}

/** Комментарий к коллекции; коллекция может быть представлена ID. */
export interface ICollectionComment extends ICommonComment {
  collection: ICollection | number;
}

/** Превью комментария с короткой карточкой коллекции. */
export interface ICollectionCommentCompact extends ICommonCommentCompact {
  collection: ICollectionCompact;
  embeddableId: number;
  embeddableTitle: string;
}

/** Коллекция в превью: ID, название и обложка. */
export interface ICollectionCompact {
  id: number;
  title: string;
  image: string;
}

/** Параметры коллекции и ID входящих в неё релизов. */
export interface ICollectionCreateEditRequest {
  title: string;
  description: string;
  is_private: boolean;
  releases: number[];
}

/** Коллекция после создания или редактирования. */
export interface ICollectionCreateEditResponse extends IResponse<CollectionCreateEditResult> {
  collection: ICollection | null;
}

/** Адрес новой обложки коллекции. */
export interface ICollectionEditImageResponse extends IResponse<CollectionEditImageResult> {
  url: string | null;
}
