export enum DeleteNotificationType {
  ArticleComment = "article/comment",
  CollectionComment = "collectionComment",
  Episode = "episode",
  Friend = "friend",
  MyArticleComment = "my/article/comment",
  MyCollectionComment = "my/collection/comment",
  RelatedRelease = "related/release",
  ReleaseComment = "releaseComment",
}

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

export enum ProfileFriendNotificationStatus {
  Request = "REQUEST",
  Accept = "ACCEPT",
}
