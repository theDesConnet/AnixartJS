import { ICommonComment, ICommonCommentCompact, IResponse } from "../common/types";
import { IProfile } from "../profile/types";
import { IRelease } from "../release/types";
import { CollectionCreateEditResult, CollectionEditImageResult, CollectionResult } from "./enums";

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
}

export interface ICollectionResponse extends IResponse<CollectionResult> {
  collection: ICollection | null;
  watching_count: number;
  plan_count: number;
  completed_count: number;
  hold_on_count: number;
  dropped_count: number;
}

export interface ICollectionComment extends ICommonComment {
  collection: ICollection | number;
}

export interface ICollectionCommentCompact extends ICommonCommentCompact {
  collection: ICollectionCompact;
  embeddableId: number;
  embeddableTitle: string;
}

export interface ICollectionCompact {
  id: number;
  title: string;
  image: string;
}

export interface ICollectionCreateEditRequest {
  title: string;
  description: string;
  is_private: boolean;
  releases: number[];
}

export interface ICollectionCreateEditResponse extends IResponse<CollectionCreateEditResult> {
  collection: ICollection | null;
}

export interface ICollectionEditImageResponse extends IResponse<CollectionEditImageResult> {
  url: string | null;
}
