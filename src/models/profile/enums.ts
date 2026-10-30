/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

/** Статус дружбы между двумя профилями, включая направление заявки. */
export enum FriendStatus {
  PendingFirstSecond = 0,
  PendingSecondFirst = 1,
  Friend = 2,
}

/** Уровень прав профиля в Anixart. */
export enum PrivilegeLevel {
  None = 0,
  Member = 1,
  Releaser = 2,
  Moderator = 3,
  Administrator = 4,
  Developer = 5,
}

/** Разделы закладок; избранное настраивается отдельно. */
export enum BookmarkType {
  Watching = 1,
  InPlans = 2,
  Completed = 3,
  HoldOn = 4,
  Dropped = 5,
}

/** Порядок релизов в закладках. */
export enum BookmarkSortType {
  NewToOldAddTime = 1,
  OldToNewAddTime = 2,
  NewToOldYear = 3,
  OldToNewYear = 4,
  AlpabetInAToZ = 5,
  AlpabetInZToA = 6,
}

/** Коды отправки заявки: 2 и 3 означают подтверждение и отправку. */
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

/** Коды удаления заявки или существующей дружбы. */
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

export enum AchievementResult {
  AlreadyGranted = 2,
  AchievementNotFound = 3,
  ProfileNotFound = 4,
  GrantLimitReached = 5,
  BadgeChanged = 6
}

export enum ProfileBadgeShowcaseResult {
  InvalidBadge = 2,
  LimitReached = 3,
}

/** Событие, за которое выдаётся значок. */
export enum BadgeAwardTrigger {
  ClaimCode = "CLAIM_CODE",
  EpisodeWatched = "EPISODE_WATCHED",
  Manual = "MANUAL",
  ProfileListStatus = "PROFILE_LIST_STATUS"
}