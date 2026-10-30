/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

/** Общие коды поля code в ответах API; это не HTTP-статусы. */
export enum CommonResult {
  Ok = 0,
  UnexpectedError = 1,
  Unauthorized = 401,
  InvalidUserAgent = 402,
  PermBan = 403,
}

export enum CommentAddResult {
  EmbeddableNotFound = 2,
  CommentNotFound = 3,
  ProfileNotFound = 4,
  CommentIsTooShort = 5,
  CommentIsTooLong = 6,
  CommentLimitReached = 7,
  InBlocklist = 8,
}

export enum CommentDeleteResult {
  CommentNotFound = 2,
  CommentNotOwned = 3,
}

export enum CommentEditResult {
  CommentNotFound = 2,
  CommentIsTooShort = 3,
  CommentIsTooLong = 4,
  CommentNotOwned = 5,
  CommentWasDeleted = 6,
  EmbeddableNotFound = 7,
}
