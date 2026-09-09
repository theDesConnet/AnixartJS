export enum FriendStatus {
  PendingFirstSecond = 0,
  PendingSecondFirst = 1,
  Friend = 2,
}

export enum PrivilegeLevel {
  None = 0,
  Member = 1,
  Releaser = 2,
  Moderator = 3,
  Administrator = 4,
  Developer = 5,
}

export enum BookmarkType {
  Watching = 1,
  InPlans = 2,
  Completed = 3,
  HoldOn = 4,
  Dropped = 5,
}

export enum BookmarkSortType {
  NewToOldAddTime = 1,
  OldToNewAddTime = 2,
  NewToOldYear = 3,
  OldToNewYear = 4,
  AlpabetInAToZ = 5,
  AlpabetInZToA = 6,
}

export enum SendFriendRequestResult {
  RequestConfirmed = 2,
  RequestSent = 3,
  ProfileWasBlocked = 4,
  MyProfileWasBlocked = 5,
  FriendLimitReached = 6,
  TargetFriendLimitReached = 7,
  TargetFriendRequestsDisallowed = 8,
  FriendRequestLimitReached = 9,
}

export enum ProfileDeletionResult {
    AlreadyRequested = 2,
    NotFound = 3,
    AlreadyProcessed = 4,
    InProgress = 5,
    InvalidPassword = 6,
    UnknownError = 7
}

export enum RemoveFriendRequestResult {
  RequestRemoved = 2,
  FriendshipRemoved = 3,
}

export enum ProfileResult {
  ProfileNotFound = 2,
}

export enum AchivementResult {
  AlreadyGranted = 2,
  AchivementNotFound = 3,
}

export enum BlockListAddResult {
  AlreadyInBlockList = 2,
}

export enum BookmarksExportResult {
  InvalidProfileLists = 2,
  InvalidExtraFields = 3,
}

export enum BookmarksImportResult {
  ImportLimitReached = 2,
}