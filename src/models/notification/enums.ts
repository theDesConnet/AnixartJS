/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

/** Значения для удаления уведомлений; отличаются от type в ответе. */
export enum DeleteNotificationType {
  ArticleComment = "articleComment",
  CollectionComment = "collectionComment",
  Episode = "episode",
  Friend = "friend",
  Article = "article/delete",
  MyArticleComment = "my/article/comment",
  MyCollectionComment = "my/collection/comment",
  RelatedRelease = "related/release",
  ReleaseComment = "releaseComment",
}

/** Значения для изменения отдельных настроек уведомлений. */
export enum NotificationPreferenceEditType {
  Article = "article",
  Comment = "comment",
  Episode = "episode",
  FirstEpisode = "episode/first",
  MyArticleComment = "my/article/comment",
  MyCollectionComment = "my/collection/comment",
  RelatedRelease = "related/release",
  ReportProcess = "report/process",
  SelectedReleases = "selected/releases",
}

/** Заявка в друзья или её принятие. */
export enum ProfileFriendNotificationStatus {
  Request = "REQUEST",
  Accept = "ACCEPT",
}
