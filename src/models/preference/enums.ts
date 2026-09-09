export enum PrivacyState {
    All = 0,
    OnlyFriends = 1,
    OnlyMe = 2
}

export enum PrivacyFriendRequestState {
    All = 0,
    OnlyMe = 1
}

export enum ChangeEmailResult {
    InvalidPassword = 2,
    InvalidOldEmail = 3,
    InvalidEmail = 4,
    EmailAlreadyTaken = 5,
    CodeAlreadySend = 6,
    CodeCannotSend = 7
}

export enum ChangeEmailResendResult {
    InvalidPassword = 2,
    InvalidOldEmail = 3,
    InvalidHash = 4,
    CodeCannotSend = 5,
}

export enum ChangeEmailVerifyResult {
    InvalidEmail = 2,
    CodeInvalid = 3,
    CodeExpired = 4,
    InvalidHash = 5,
    EmailAlreadyTaken = 6
}

export enum ChangeLoginResult {
    InvalidLogin = 2,
    LoginAlreadyTaken = 3,
    TimeLimit = 4
}

export enum ChangePasswordResult {
    InvalidPassword = 2,
    InvalidCurrentPassword = 3
}

export enum GoogleBindResult {
    InvalidRequest = 2,
    GoogleAlreadyBound = 3
}

export enum GoogleUnbindResult {
    GoogleNotBound = 2
}

export enum ProfileSelectThemeResult {
    ThemeNotFound = 2,
    ThemeNotAvaliable = 3
}

export enum SocialEditResult {
    InvalidVK = 2,
    InvalidTelegram = 3,
    InvalidInstagram = 4,
    InvalidTiktok = 5,
    InvalidDiscord = 6
}

export enum TelegramBindResult {
    InvalidRequest = 2,
    TelegramAlreadyBound = 3
}

export enum TelegramUnbindResult {
    TelegramNotBound = 2
}

export enum VkBindResult {
    InvalidRequest = 2,
    VkAlreadyBound = 3
}

export enum VkUnbindResult {
    VkNotBound = 2
}

export enum YandexBindResult {
    InvalidRequest = 2,
    YandexAlreadyBound = 3
}

export enum YandexUnbindResult {
    YandexNotBound = 2
}