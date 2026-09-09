export interface ILinkParserOptions {
  signal?: AbortSignal;
  /** Общий таймаут цепочки запросов одного вызова, в миллисекундах. */
  timeoutMs?: number;
}

export interface IVideoSource {
  src: string;
  type?: string;
}

/** Ключ — высота видео или unknown, если качество не определено. */
export type VideoLinks = Record<string, IVideoSource[]>;
