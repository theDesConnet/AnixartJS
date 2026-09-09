export enum CollectionResult {
  InvalidId = 2,
  IsPrivate = 3,
  IsDeleted = 4,
}

export enum FavoriteCollectionAddResult {
  CollectionNotFound = 2,
  CollectionAlreadyInFavorite = 3,
}

export enum FavoriteCollectionDeleteResult {
  CollectionNotFound = 2,
}

export enum CollectionEditImageResult {
  CollectionNotFound = 2,
}

export enum CollectionCreateEditResult {
  InvalidTitle = 2,
  InvalidDescription = 3,
  InvalidReleases = 4,
  CollectionLimitReached = 5,
  CollectionNotFound = 6,
  CollectionNotOwned = 7,
  CollectionDeleted = 8,
  ReleaseLimitReached = 9,
}

export enum ReleaseAddCollectionResult {
  CollectionNotFound = 2,
  CollectionNotOwned = 3,
  InvalidRelease = 4,
  ReleaseAlreadyInCollection = 5,
  CollectionDeleted = 6,
  ReleaseLimitReached = 7,
}

export enum CollectionDeleteResult {
  CollectionNotFound = 2,
  CollectionNotOwned = 3,
  CollectionDeleted = 4,
}
