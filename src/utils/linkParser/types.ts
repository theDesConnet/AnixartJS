/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

/** Отмена и таймаут получения ссылок на видео. */
export interface ILinkParserOptions {
  /** Отмена всей цепочки запросов парсера. */
  signal?: AbortSignal;
  /** Общий таймаут цепочки запросов одного вызова, в миллисекундах. */
  timeoutMs?: number;
}

/** Прямая ссылка на видео и необязательный тип содержимого. */
export interface IVideoSource {
  src: string;
  type?: string;
}

/** Ключ — высота видео или unknown, если качество не определено. */
export type VideoLinks = Record<string, IVideoSource[]>;
