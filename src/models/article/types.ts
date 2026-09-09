import {
  IProfileSlim,
  ArticleResult,
  IResponse,
  IChannel,
  ArticleEventType,
  ArticleEventEntryPoint,
  ICommonComment,
  IChannelProfile,
  ICommonCommentCompact,
  IChannelCompact,
} from "../";


export type EmbedType = "youtube" | "vk" | "link";

export interface IArticle {
  "@id": number;

  id: number;

  channel: IChannel;
  author: IProfileSlim | null;

  repost_article: IArticle | number | null;
  payload: IArticlePayload;

  creation_date: number;
  last_update_date: number;

  comment_count: number;
  repost_count: number;
  vote_count: number;
  vote: number;

  contains_repost_article: boolean;
  is_signed: boolean;
  is_pinned: boolean;
  is_muted: boolean;
  is_deleted: boolean;

  has_delete_enforcement: boolean;

  popular_comment: IPopularComment | null;
}

export interface IArticleCompact {
  id: number;
  channel: IChannelCompact;
  payload: IArticlePayload;
  creation_date: number;
  last_update_date: number;
}

export interface IArticleCommentCompact extends ICommonCommentCompact {
  article: IArticleCompact;
  embeddableId: number;
  embeddableTitle: string;
  embeddableDescription: string | null;
}

export interface IArticleTextBlock {
  text: string;
  text_length: number;
}

export interface IArticleHeaderBlock {
  text: string;
  text_length: number;
  level: number;
}

export interface IArticleImageItem {
  id: string;
  url: string;
  hash: string;
  width: number;
  height: number;
}

export interface IArticleImageBlock {
  items: IArticleImageItem[];
  item_count: number;
}

export interface IArticleQuoteBlock {
  text: string;
  caption: string;
  alignment: string;
  text_length: number;
  caption_length: number;
}

export interface IArticleListBlock {
  style: string;
  items: string[];
  item_count: number;
}

export interface IArticleEmbedBlock {
  url: string;
  hash: string;
  embed: string;
  width: number;
  height: number;
  image: string;
  title: string;
  service: string;
  site_name: string;
  description: string;
}

export interface IArticleDelimiterBlock {}

export interface IArticleParagraphPayloadBlock {
  id: string;
  type: "paragraph";
  name: "paragraph";
  data: IArticleTextBlock;
}

export interface IArticleHeaderPayloadBlock {
  id: string;
  type: "header";
  name: "header";
  data: IArticleHeaderBlock;
}

export interface IArticleQuotePayloadBlock {
  id: string;
  type: "quote";
  name: "quote";
  data: IArticleQuoteBlock;
}

export interface IArticleDelimiterPayloadBlock {
  id: string;
  type: "delimiter";
  name: "delimiter";
  data: IArticleDelimiterBlock;
}

export interface IArticleListPayloadBlock {
  id: string;
  type: "list";
  name: "list";
  data: IArticleListBlock;
}

export interface IArticleMediaPayloadBlock {
  id: string;
  type: "media";
  name: "media";
  data: IArticleImageBlock;
}

export interface IArticleEmbedPayloadBlock {
  id: string;
  type: "embed";
  name: "embed";
  data: IArticleEmbedBlock;
}

export type IArticlePayloadBlock =
  | IArticleParagraphPayloadBlock
  | IArticleHeaderPayloadBlock
  | IArticleQuotePayloadBlock
  | IArticleDelimiterPayloadBlock
  | IArticleListPayloadBlock
  | IArticleMediaPayloadBlock
  | IArticleEmbedPayloadBlock;

export interface IArticlePayload {
  time: number;
  version: string;
  blocks: IArticlePayloadBlock[];
  block_count: number;
}

export interface IArticleCreateEditRequest {
  is_signed: boolean;
  repost_article_id: number | null;
  payload: IArticlePayload;
}

export interface IArticleSuggestionCreateEditRequest extends Omit<
  IArticleCreateEditRequest,
  "repost_article_id"
> {}

export interface IPopularComment {
  id: number;
  profile: IProfileSlim | null;
  message: string | null;
  vote_count: number;
  timestamp: number;
}

export interface IArticleComment extends ICommonComment<IChannelProfile> {
  article: IArticle | number;
}

export interface IArticleEventRequest {
  type: ArticleEventType;
  entry_point: ArticleEventEntryPoint;
  articles: number[];
}

export interface IArticleResponse<
  T extends number = ArticleResult,
> extends IResponse<T> {
  article: IArticle;
}

export interface IArticleEmbedResponse extends IArticleEmbedBlock {
  success: number;
}

export interface IArticleUploadFileResponse {
  file: IArticleImageItem;
  success: number;
}

export interface ILatestArticleResponse extends IResponse {
  articleId: number;
}
