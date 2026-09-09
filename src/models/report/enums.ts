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