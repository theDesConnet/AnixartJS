import type { CommonResult } from "../models";
import type { IRequestOptions } from "../core/http/httpTypes";
import { Anixart } from "../core/anixartClient";
import {
  ArticleMuteResult,
  BlogCreateResult,
  ChannelBlockResult,
  ChannelCreateEditResult,
  ChannelPermissionManageResult,
  ChannelResult,
  ChannelSubscribeResult,
  ChannelUnsubscribeResult,
  ChannelUploadCoverAvatarResult,
  EditorAvailableResult,
  IArticle,
  IBlogCreateResponse,
  IChannel,
  IChannelBlockManageRequest,
  IChannelBlockResponse,
  IChannelCreateEditRequest,
  IChannelCreateEditResponse,
  IChannelPermissionManageRequest,
  IChannelProfile,
  IChannelResponse,
  IChannelsFilterRequest,
  IChannelUploadCoverAvatarResponse,
  IEditorAvailableResponse,
  IEditorChannelsResponse,
  IPageableResponse,
  IResponse,
  ISubscriptionCountResponse,
} from "../models";

export class Channel {
  public constructor(private readonly _client: Anixart) {}

  /**
   * Получить страницу статей канала.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param channelId - ID канала.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IArticle}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.channel.articles(
   *   channelId,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async articles(
    channelId: number,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IArticle>> {
    return (
      await this._client.http.request<IPageableResponse<IArticle>>({
        path: `/channel/${channelId}/article/all/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Загрузить аватар канала.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChannelUploadCoverAvatarResult}.
   *
   * @param channelId - ID канала.
   * @param image - Содержимое изображения в Buffer.
   * @param name - Имя файла изображения, включая расширение. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Адрес загруженного изображения — {@link IChannelUploadCoverAvatarResponse}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { readFile } from "node:fs/promises";
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   * const image = await readFile("./cover.jpg");
   *
   * const result = await client.endpoints.channel.avatarUpload(
   *   channelId,
   *   image,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.url);
   */
  public async avatarUpload(
    channelId: number,
    image: Buffer,
    name?: string,
    options: IRequestOptions = {},
  ): Promise<IChannelUploadCoverAvatarResponse> {
    return (
      await this._client.http.request<IChannelUploadCoverAvatarResponse>({
        path: `/channel/avatar/upload/${channelId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ChannelUploadCoverAvatarResult,
        body: {
          type: "Image",
          data: {
            name: name ?? "image.jpg",
            file: image,
            type: "image",
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить информацию о блокировке профиля в канале.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChannelBlockResult}.
   *
   * @param channelId - ID канала.
   * @param profileId - ID профиля.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Данные блокировки в канале — {@link IChannelBlockResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   * const profileId = 123;
   *
   * const result = await client.endpoints.channel.block(
   *   channelId,
   *   profileId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.channel_block);
   */
  public async block(
    channelId: number,
    profileId: number,
    options: IRequestOptions = {},
  ): Promise<IChannelBlockResponse> {
    return (
      await this._client.http.request<IChannelBlockResponse>({
        path: `/channel/${channelId}/block/${profileId}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: ChannelBlockResult,
        ...options,
      })
    ).data;
  }

  /**
   * Заблокировать профиль в канале или изменить его блокировку.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChannelBlockResult}.
   *
   * @param channelId - ID канала.
   * @param data - Данные запроса — {@link IChannelBlockManageRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Данные блокировки в канале — {@link IChannelBlockResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IChannelBlockManageRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   * const block: IChannelBlockManageRequest = {
   *   target_profile_id: 123,
   *   is_blocked: true,
   *   reason: null,
   *   expire_date: null,
   *   is_reason_showing_enabled: false,
   *   is_perm_blocked: true,
   * };
   *
   * const result = await client.endpoints.channel.blockManage(
   *   channelId,
   *   block,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.channel_block);
   */
  public async blockManage(
    channelId: number,
    data: IChannelBlockManageRequest,
    options: IRequestOptions = {},
  ): Promise<IChannelBlockResponse> {
    return (
      await this._client.http.request<IChannelBlockResponse>({
        path: `/channel/${channelId}/block/manage`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ChannelBlockResult,
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу заблокированных профилей канала.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param channelId - ID канала.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IChannelProfile}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.channel.blocks(
   *   channelId,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async blocks(
    channelId: number,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IChannelProfile>> {
    return (
      await this._client.http.request<IPageableResponse<IChannelProfile>>({
        path: `/channel/${channelId}/block/all/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить блог профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChannelResult}.
   *
   * @param profileId - ID профиля.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Канал и дополнительные данные ответа — {@link IChannelResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const profileId = 123;
   *
   * const result = await client.endpoints.channel.blog(
   *   profileId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.channel);
   */
  public async blog(
    profileId: number,
    options: IRequestOptions = {},
  ): Promise<IChannelResponse> {
    return (
      await this._client.http.request<IChannelResponse>({
        path: `/channel/blog/${profileId}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: ChannelResult,
        ...options,
      })
    ).data;
  }

  /**
   * Получить канал по ID.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChannelResult}.
   *
   * @param channelId - ID канала.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Канал и дополнительные данные ответа — {@link IChannelResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   *
   * const result = await client.endpoints.channel.get(
   *   channelId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.channel);
   */
  public async get(
    channelId: number,
    options: IRequestOptions = {},
  ): Promise<IChannelResponse> {
    return (
      await this._client.http.request<IChannelResponse>({
        path: `/channel/${channelId}`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: ChannelResult,
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу каналов по фильтру.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param data - Данные запроса — {@link IChannelsFilterRequest}.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IChannel}.
   *
   * @example
   * import { Anixart, ChannelsFilterSort } from "anixartjs";
   * import type { IChannelsFilterRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const filters: IChannelsFilterRequest = {
   *   sort: ChannelsFilterSort.None,
   * };
   * const page = 0;
   *
   * const result = await client.endpoints.channel.all(
   *   filters,
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async all(
    data: IChannelsFilterRequest,
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IChannel>> {
    return (
      await this._client.http.request<IPageableResponse<IChannel>>({
        path: `/channel/all/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Удалить обложку канала.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChannelUploadCoverAvatarResult}.
   *
   * @param channelId - ID канала.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Адрес загруженного изображения — {@link IChannelUploadCoverAvatarResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   *
   * const result = await client.endpoints.channel.coverDelete(
   *   channelId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.url);
   */
  public async coverDelete(
    channelId: number,
    options: IRequestOptions = {},
  ): Promise<IChannelUploadCoverAvatarResponse> {
    return (
      await this._client.http.request<IChannelUploadCoverAvatarResponse>({
        path: `/channel/cover/delete/${channelId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ChannelUploadCoverAvatarResult,
        ...options,
      })
    ).data;
  }

  /**
   * Загрузить обложку канала.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChannelUploadCoverAvatarResult}.
   *
   * @param channelId - ID канала.
   * @param image - Содержимое изображения в Buffer.
   * @param name - Имя файла изображения, включая расширение. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Адрес загруженного изображения — {@link IChannelUploadCoverAvatarResponse}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { readFile } from "node:fs/promises";
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   * const image = await readFile("./cover.jpg");
   *
   * const result = await client.endpoints.channel.coverUpload(
   *   channelId,
   *   image,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.url);
   */
  public async coverUpload(
    channelId: number,
    image: Buffer,
    name?: string,
    options: IRequestOptions = {},
  ): Promise<IChannelUploadCoverAvatarResponse> {
    return (
      await this._client.http.request<IChannelUploadCoverAvatarResponse>({
        path: `/channel/cover/upload/${channelId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ChannelUploadCoverAvatarResult,
        body: {
          type: "Image",
          data: {
            name: name ?? "image.jpg",
            file: image,
            type: "image",
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Создать канал.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChannelCreateEditResult}.
   *
   * @param data - Данные запроса — {@link IChannelCreateEditRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Канал и дополнительные данные ответа — {@link IChannelCreateEditResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IChannelCreateEditRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const settings: IChannelCreateEditRequest = {
   *   title: "Что посмотреть на выходных",
   *   description: "Подборка любимых приключенческих релизов",
   *   is_commenting_enabled: true,
   *   is_article_suggestion_enabled: true,
   *   is_episode_channel_widget_enabled: null,
   *   episode_channel_widget_sort: null,
   *   episode_channel_widget_popularity_period: null,
   *   episode_channel_widget_article_count: null,
   * };
   *
   * const result = await client.endpoints.channel.create(
   *   settings,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.channel);
   */
  public async create(
    data: IChannelCreateEditRequest,
    options: IRequestOptions = {},
  ): Promise<IChannelCreateEditResponse> {
    return (
      await this._client.http.request<IChannelCreateEditResponse>({
        path: `/channel/create`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ChannelCreateEditResult,
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Создать блог текущего профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link BlogCreateResult}.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Канал и дополнительные данные ответа — {@link IBlogCreateResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.channel.createBlog(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.channel);
   */
  public async createBlog(
    options: IRequestOptions = {},
  ): Promise<IBlogCreateResponse> {
    return (
      await this._client.http.request<IBlogCreateResponse>({
        path: `/channel/blog/create`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: BlogCreateResult,
        ...options,
      })
    ).data;
  }

  /**
   * Изменить настройки канала.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChannelCreateEditResult}.
   *
   * @param channelId - ID канала.
   * @param data - Данные запроса — {@link IChannelCreateEditRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Канал и дополнительные данные ответа — {@link IChannelCreateEditResponse}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IChannelCreateEditRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   * const settings: IChannelCreateEditRequest = {
   *   title: "Что посмотреть на выходных",
   *   description: "Подборка любимых приключенческих релизов",
   *   is_commenting_enabled: true,
   *   is_article_suggestion_enabled: true,
   *   is_episode_channel_widget_enabled: null,
   *   episode_channel_widget_sort: null,
   *   episode_channel_widget_popularity_period: null,
   *   episode_channel_widget_article_count: null,
   * };
   *
   * const result = await client.endpoints.channel.edit(
   *   channelId,
   *   settings,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.channel);
   */
  public async edit(
    channelId: number,
    data: IChannelCreateEditRequest,
    options: IRequestOptions = {},
  ): Promise<IChannelCreateEditResponse> {
    return (
      await this._client.http.request<IChannelCreateEditResponse>({
        path: `/channel/edit/${channelId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ChannelCreateEditResult,
        body: {
          type: "JSON",
          data: data,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Проверить доступность редактора и получить токен загрузки медиа.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link EditorAvailableResult}.
   *
   * @param channelId - ID канала.
   * @param isSuggestion - Проверить редактор для предложенной статьи. По умолчанию: false.
   * @param isEditMode - Проверить режим редактирования существующей статьи. По умолчанию: false.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Доступность редактора и токен загрузки медиа — {@link IEditorAvailableResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   * const isSuggestion = false;
   * const isEditMode = false;
   *
   * const result = await client.endpoints.channel.editorAvaliable(
   *   channelId,
   *   isSuggestion,
   *   isEditMode,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async editorAvaliable(
    channelId: number,
    isSuggestion: boolean = false,
    isEditMode: boolean = false,
    options: IRequestOptions = {},
  ): Promise<IEditorAvailableResponse> {
    return (
      await this._client.http.request<IEditorAvailableResponse>({
        path: `/channel/${channelId}/editor/available`,
        method: "GET",
        auth: { type: "Anixart" },
        resultEnum: EditorAvailableResult,
        query: {
          is_suggestion: isSuggestion,
          is_edit_mode: isEditMode,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить каналы, доступные для работы в редакторе.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param onlySubscribed - Ограничить выборку каналами из подписок.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Доступные каналы — {@link IEditorChannelsResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const onlySubscribed = false;
   *
   * const result = await client.endpoints.channel.editorAvaliableChannels(
   *   onlySubscribed,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.channels);
   */
  public async editorAvaliableChannels(
    onlySubscribed: boolean,
    options: IRequestOptions = {},
  ): Promise<IEditorChannelsResponse> {
    return (
      await this._client.http.request<IEditorChannelsResponse>({
        path: `/channel/editor/available/all`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          only_subscribed: onlySubscribed,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Скрыть канал.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ArticleMuteResult}.
   *
   * @param channelId - ID канала.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link ArticleMuteResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   *
   * const result = await client.endpoints.channel.mute(
   *   channelId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async mute(
    channelId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse<ArticleMuteResult>> {
    return (
      await this._client.http.request<IResponse<ArticleMuteResult>>({
        path: `/channel/mute/${channelId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ArticleMuteResult,
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу скрытых каналов.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IChannel}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.channel.mutes(
   *   page,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async mutes(
    page: number = 0,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IChannel>> {
    return (
      await this._client.http.request<IPageableResponse<IChannel>>({
        path: `/channel/mute/all/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Изменить права профиля в канале.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChannelPermissionManageResult}.
   *
   * @param channelId - ID канала.
   * @param data - Данные запроса — {@link IChannelPermissionManageRequest}.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link ChannelPermissionManageResult}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   * import type { IChannelPermissionManageRequest } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   * const permissions: IChannelPermissionManageRequest = {
   *   target_profile_id: 123,
   * };
   *
   * const result = await client.endpoints.channel.permissionManage(
   *   channelId,
   *   permissions,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async permissionManage(
    channelId: number,
    data: IChannelPermissionManageRequest,
    options: IRequestOptions = {},
  ): Promise<IResponse<ChannelPermissionManageResult>> {
    return (
      await this._client.http.request<IResponse<ChannelPermissionManageResult>>(
        {
          path: `/channel/${channelId}/permission/manage`,
          method: "POST",
          auth: { type: "Anixart" },
          resultEnum: ChannelPermissionManageResult,
          body: {
            type: "JSON",
            data: data,
          },
          ...options,
        },
      )
    ).data;
  }

  /**
   * Получить страницу профилей канала с фильтром по правам.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param channelId - ID канала.
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param permission - Уровень прав профиля в канале. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IChannelProfile}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   * const page = 0;
   *
   * const result = await client.endpoints.channel.permissions(
   *   channelId,
   *   page,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async permissions(
    channelId: number,
    page: number = 0,
    permission?: number,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IChannelProfile>> {
    return (
      await this._client.http.request<IPageableResponse<IChannelProfile>>({
        path: `/channel/${channelId}/permission/all/${page}`,
        method: "POST",
        auth: { type: "Anixart" },
        body: {
          type: "JSON",
          data: {
            permission,
          },
        },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу рекомендованных каналов.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param isBlog - Выбирать блоги вместо обычных каналов. По умолчанию: false.
   * @param excludeSubscribed - Исключить каналы, на которые уже оформлена подписка. По умолчанию: false.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IChannel}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   * const isBlog = false;
   * const excludeSubscribed = false;
   *
   * const result = await client.endpoints.channel.recommendations(
   *   page,
   *   isBlog,
   *   excludeSubscribed,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async recommendations(
    page: number = 0,
    isBlog: boolean = false,
    excludeSubscribed: boolean = false,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IChannel>> {
    return (
      await this._client.http.request<IPageableResponse<IChannel>>({
        path: `/channel/recommendations/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          is_blog: isBlog,
          exclude_subscribed: excludeSubscribed,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Подписаться на канал.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChannelSubscribeResult}.
   *
   * @param channelId - ID канала.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link ChannelSubscribeResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   *
   * const result = await client.endpoints.channel.subscribe(
   *   channelId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async subscribe(
    channelId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse<ChannelSubscribeResult>> {
    return (
      await this._client.http.request<IResponse<ChannelSubscribeResult>>({
        path: `/channel/subscribe/${channelId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ChannelSubscribeResult,
        ...options,
      })
    ).data;
  }

  /**
   * Получить количество подписок текущего профиля.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Количество подписок — {@link ISubscriptionCountResponse}.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const result = await client.endpoints.channel.subscriptionCount(
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.subscription_count);
   */
  public async subscriptionCount(
    options: IRequestOptions = {},
  ): Promise<ISubscriptionCountResponse> {
    return (
      await this._client.http.request<ISubscriptionCountResponse>({
        path: `/channel/subscription/count`,
        method: "GET",
        auth: { type: "Anixart" },
        ...options,
      })
    ).data;
  }

  /**
   * Получить страницу каналов и блогов из подписок.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * @param page - Номер страницы, начиная с 0. По умолчанию: 0.
   * @param sort - Порядок сортировки. Необязательный параметр.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Страница результатов — {@link IPageableResponse} с элементами {@link IChannel}.
   *
   * @remarks
   * Необязательные аргументы пропущены через `undefined`, чтобы передать `options` последним.
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const page = 0;
   *
   * const result = await client.endpoints.channel.subscriptions(
   *   page,
   *   undefined,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.content);
   */
  public async subscriptions(
    page: number = 0,
    sort?: number,
    options: IRequestOptions = {},
  ): Promise<IPageableResponse<IChannel>> {
    return (
      await this._client.http.request<IPageableResponse<IChannel>>({
        path: `/channel/subscription/all/${page}`,
        method: "GET",
        auth: { type: "Anixart" },
        query: {
          sort,
        },
        ...options,
      })
    ).data;
  }

  /**
   * Отменить скрытие канала.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ArticleMuteResult}.
   *
   * @param channelId - ID канала.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link ArticleMuteResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   *
   * const result = await client.endpoints.channel.unmute(
   *   channelId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async unmute(
    channelId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse<ArticleMuteResult>> {
    return (
      await this._client.http.request<IResponse<ArticleMuteResult>>({
        path: `/channel/unmute/${channelId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ArticleMuteResult,
        ...options,
      })
    ).data;
  }

  /**
   * Отписаться от канала.
   *
   * Токен клиента передаётся в query, если задан.
   *
   * Коды результата: {@link CommonResult}, {@link ChannelUnsubscribeResult}.
   *
   * @param channelId - ID канала.
   * @param options - Параметры запроса: таймаут, сигнал отмены, версия API и обработка ошибок.
   * @returns Ответ API — {@link IResponse} с кодами {@link ChannelUnsubscribeResult}.
   *
   * @remarks
   
   *
   * @example
   * import { Anixart } from "anixartjs";
   *
   * const client = new Anixart({ token: "YOUR_ANIXART_TOKEN" });
   *
   * const channelId = 123;
   *
   * const result = await client.endpoints.channel.unsubscribe(
   *   channelId,
   *   { timeoutMs: 15_000 },
   * );
   * console.log(result.code);
   */
  public async unsubscribe(
    channelId: number,
    options: IRequestOptions = {},
  ): Promise<IResponse<ChannelUnsubscribeResult>> {
    return (
      await this._client.http.request<IResponse<ChannelUnsubscribeResult>>({
        path: `/channel/unsubscribe/${channelId}`,
        method: "POST",
        auth: { type: "Anixart" },
        resultEnum: ChannelUnsubscribeResult,
        ...options,
      })
    ).data;
  }
}
