/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

/** Объект жалобы; определяет маршрут API и тип данных. */
export enum ReportType {
  Article = "article",
  ArticleComment = "comment/article",
  Channel = "channel",
  Collection = "collection",
  CollectionComment = "comment/collection",
  Episode = "episode",
  Profile = "profile",
  Release = "release",
  ReleaseComment = "comment/release",
}

export enum ReportResult {
  EntityNotFound = 2,
  InvalidMessage = 3,
  ReasonNotFound = 4,
}