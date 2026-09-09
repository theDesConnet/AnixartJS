export enum ArticleResult {
  ArticleDeleted = 2,
}

export enum ArticleCreateEditResult {
  InvalidRepostArticle = 2,
  InvalidPayload = 3,
  InvalidTags = 4,
  TemporarilyDisabled = 5,
  ArticleLimitReached = 6,
  ChannelNotFound = 7,
  ChannelNotOwned = 8,
  ChannelCreatorBanned = 9,
  ChannelBlocked = 10,
  ArticleNotFound = 11,
  ArticleDeleted = 12,
  BlogNotCreated = 13,
}

export enum ArticleDeleteResult {
  ArticleNotFound = 2,
  ArticleNotOwned = 3,
  ArticleDeleted = 4,
}

export enum ArticleEditPinnedResult {
  ChannelNotFound = 2,
  ChannelNotOwned = 3,
  ArticleNotFound = 4,
  ArticleDeleted = 5,
}

export enum ArticleMuteResult {
  ArticleNotFound = 2,
  ChannelNotFound = 3,
  ChannelOwned = 4,
}

export enum ArticleSuggestionDeleteResult {
  ArticleSuggestionNotFound = 2,
  ArticleSuggestionNotOwned = 3,
}

export enum ArticleEventEntryPoint {
  Unknown = "unknown",
  Article = "article",
  Channel = "channel",
  Feed = "feed",
  Latest = "latest",
  Search = "search",
}

export enum ArticleEventType {
  View = "view",
  Open = "open",
  Read = "read",
}
