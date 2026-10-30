/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

/** Порядок статей в виджете канала у серий. */
export enum ChannelWidgetSort {
  Chronology = 0,
  Popularity = 1,
}

/** Период подсчёта популярности статей в виджете. */
export enum ChannelWidgetPopularityPeriod {
  Hours24 = 0,
  Days3 = 1,
  Days7 = 2,
}

/** Права участника внутри канала. */
export enum ChannelProfilePermission {
  Member = 0,
  Administrator = 1,
  Creator = 2,
}

export enum ChannelUploadCoverAvatarResult {
  ChannelNotFound = 2,
  ChannelNotOwned = 3,
}

export enum ChannelBlockResult {
  ChannelNotFound = 2,
  ChannelNotOwned = 3,
  BlockNotFound = 4,
}

export enum ChannelResult {
  ChannelNotFound = 2,
}

/** Сортировка списка каналов. */
export enum ChannelsFilterSort {
  None = 0,
  SubscriberCount = 1,
}

export enum ChannelCreateEditResult {
  InvalidTitle = 2,
  InvalidDescription = 3,
  ChannelLimitReached = 4,
  ChannelNotFound = 5,
  ChannelNotOwned = 6,
  ChannelCreatorBanned = 7,
}

export enum BlogCreateResult {
  ReputationLevelTooLow = 2,
}

export enum EditorAvailableResult {
  TemporarilyDisabled = 2,
  ArticleLimitReached = 3,
  ChannelNotFound = 4,
  ChannelNotOwned = 5,
  ChannelCreatorBanned = 6,
  BlogNotCreated = 7,
}

export enum ChannelPermissionManageResult {
  PermissionInvalid = 2,
  TargetProfileNotFound = 3,
  ChannelNotFound = 4,
  ChannelNotOwned = 5,
}

export enum ChannelSubscribeResult {
  SubscriptionExists = 2,
  SubscriptionLimitReached = 3,
}

export enum ChannelUnsubscribeResult {
  SubscriptionNotExists = 2,
}

export enum ChannelDeleteResult {
  ChannelNotFound = 2,
  ChannelNotOwned = 3,
}
