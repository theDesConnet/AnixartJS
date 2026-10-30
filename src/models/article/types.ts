/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

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


/** Сервисы, поддерживаемые при вставке ссылки в статью. */
export type EmbedType = "youtube" | "vk" | "link";

/** Статья с содержимым, каналом и данными о реакциях. */
export interface IArticle {
  "@id": number;

  id: number;

  channel: IChannel;
  author: IProfileSlim | null;

  /** Репост может прийти объектом, только ID или отсутствовать. */
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

/** Короткая форма статьи без счётчиков и реакций. */
export interface IArticleCompact {
  id: number;
  channel: IChannelCompact;
  payload: IArticlePayload;
  creation_date: number;
  last_update_date: number;
}

/** Превью комментария с данными статьи. */
export interface IArticleCommentCompact extends ICommonCommentCompact {
  article: IArticleCompact;
  embeddableId: number;
  embeddableTitle: string;
  embeddableDescription: string | null;
}

/** Текст абзаца и его длина по данным API. */
export interface IArticleTextBlock {
  text: string;
  text_length: number;
}

/** Текст заголовка и его уровень. */
export interface IArticleHeaderBlock {
  text: string;
  text_length: number;
  level: number;
}

/** Загруженное изображение с размерами и хешем. */
export interface IArticleImageItem {
  id: string;
  url: string;
  hash: string;
  width: number;
  height: number;
}

/** Группа изображений в статье. */
export interface IArticleImageBlock {
  items: IArticleImageItem[];
  item_count: number;
}

/** Цитата с подписью и выравниванием. */
export interface IArticleQuoteBlock {
  text: string;
  caption: string;
  alignment: string;
  text_length: number;
  caption_length: number;
}

/** Список с заданным стилем отображения. */
export interface IArticleListBlock {
  style: string;
  items: string[];
  item_count: number;
}

/** Данные предпросмотра встроенной ссылки или видео. */
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

/** Разделитель без дополнительных данных. */
export interface IArticleDelimiterBlock {}

/** Абзац в массиве блоков статьи. */
export interface IArticleParagraphPayloadBlock {
  id: string;
  type: "paragraph";
  name: "paragraph";
  data: IArticleTextBlock;
}

/** Заголовок в массиве блоков статьи. */
export interface IArticleHeaderPayloadBlock {
  id: string;
  type: "header";
  name: "header";
  data: IArticleHeaderBlock;
}

/** Цитата в массиве блоков статьи. */
export interface IArticleQuotePayloadBlock {
  id: string;
  type: "quote";
  name: "quote";
  data: IArticleQuoteBlock;
}

/** Разделитель в массиве блоков статьи. */
export interface IArticleDelimiterPayloadBlock {
  id: string;
  type: "delimiter";
  name: "delimiter";
  data: IArticleDelimiterBlock;
}

/** Список в массиве блоков статьи. */
export interface IArticleListPayloadBlock {
  id: string;
  type: "list";
  name: "list";
  data: IArticleListBlock;
}

/** Группа изображений в массиве блоков статьи. */
export interface IArticleMediaPayloadBlock {
  id: string;
  type: "media";
  name: "media";
  data: IArticleImageBlock;
}

/** Встроенная ссылка или видео в массиве блоков статьи. */
export interface IArticleEmbedPayloadBlock {
  id: string;
  type: "embed";
  name: "embed";
  data: IArticleEmbedBlock;
}

/** Блок статьи; поле type определяет форму data. */
export type IArticlePayloadBlock =
  | IArticleParagraphPayloadBlock
  | IArticleHeaderPayloadBlock
  | IArticleQuotePayloadBlock
  | IArticleDelimiterPayloadBlock
  | IArticleListPayloadBlock
  | IArticleMediaPayloadBlock
  | IArticleEmbedPayloadBlock;

/** Содержимое статьи в формате блочного редактора. */
export interface IArticlePayload {
  time: number;
  version: string;
  /** Блоки в порядке отображения в статье. */
  blocks: IArticlePayloadBlock[];
  block_count: number;
}

/** Содержимое статьи, подпись автора и ID репоста. */
export interface IArticleCreateEditRequest {
  is_signed: boolean;
  repost_article_id: number | null;
  payload: IArticlePayload;
}

/** Предложенная статья; репосты в этом запросе не передаются. */
export interface IArticleSuggestionCreateEditRequest extends Omit<
  IArticleCreateEditRequest,
  "repost_article_id"
> {}

/** Комментарий, выбранный для превью под статьёй. */
export interface IPopularComment {
  id: number;
  profile: IProfileSlim | null;
  message: string | null;
  vote_count: number;
  timestamp: number;
}

/** Комментарий к статье с правами автора в канале. */
export interface IArticleComment extends ICommonComment<IChannelProfile> {
  article: IArticle | number;
}

/** Событие взаимодействия со статьями и место, откуда оно пришло. */
export interface IArticleEventRequest {
  type: ArticleEventType;
  entry_point: ArticleEventEntryPoint;
  articles: number[];
}

/** Статья с кодом результата операции. */
export interface IArticleResponse<
  T extends number = ArticleResult,
> extends IResponse<T> {
  article: IArticle;
}

/** Результат получения предпросмотра ссылки для редактора. */
export interface IArticleEmbedResponse extends IArticleEmbedBlock {
  success: number;
}

/** Загруженный файл в формате ответа редактора. */
export interface IArticleUploadFileResponse {
  file: IArticleImageItem;
  success: number;
}

/** ID последней статьи. */
export interface ILatestArticleResponse extends IResponse {
  articleId: number;
}
