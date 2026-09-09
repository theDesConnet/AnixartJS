export enum CheckLoginResult {
  InvalidLogin = 2,
}

export enum LoginResult {
  InvalidLogin = 2,
  InvalidPassword = 3,
}

export enum RegisterResult {
  InvalidLogin = 2,
  InvalidEmail = 3,
  InvalidPassword = 4,
  LoginAlreadyTaken = 5,
  EmailAlreadyTaken = 6,
  CodeAlreadySend = 7,
  CodeCannotSend = 8,
  EmailServiceDisallowed = 9,
  TooManyRegistrations = 10,
}

export enum RegisterVerifyResult {
  InvalidLogin = 2,
  InvalidEmail = 3,
  InvalidPassword = 4,
  LoginAlreadyTaken = 5,
  EmailAlreadyTaken = 6,
  CodeAlreadySend = 7,
  CodeCannotSend = 8,
  InvalidHash = 9,
  EmailServiceDisallowed = 10,
  TooManyRegistrations = 11,
}

export enum RestorePasswordResult {
  ProfileNotFound = 2,
  CodeAlreadySend = 3,
  CodeCannotSend = 4,
}

export enum RestorePasswordVerifyResult {
  ProfileNotFound = 2,
  InvalidPassword = 3,
  CodeInvalid = 4,
  CodeExpired = 5,
  InvalidHash = 6,
}

export enum RestoreResult {
  ProfileNotFound = 2,
  CodeAlreadySend = 3,
  CodeCannotSend = 4
}

export enum ResendResult {
  InvalidLogin = 2,
  InvalidEmail = 3,
  InvalidPassword = 4,
  InvalidHash = 5,
  CodeCannotSend = 6
}

export enum RestoreResendResult {
  ProfileNotFound = 2,
  InvalidHash = 3,
  CodeCannotSend = 4
}

export enum RestoreVerifyResult {
  ProfileNotFound = 2,
  InvalidPassword = 3,
  CodeInvalid = 4,
  CodeExpired = 5,
  InvalidHash = 6
}

export enum SignInResult {
  InvalidLogin = 2,
  InvalidPassword = 3
}

export enum GoogleResult {
  InvalidRequest = 2,
  NotRegistered = 3,
  InvalidLogin = 4,
  InvalidEmail = 5,
  LoginAlreadyTaken = 6,
  EmailAlreadyTaken = 7,
  EmailChanged = 8,
  EmailChangedAndCodeAlreadySend = 9,
  EmailServiceDisallowed = 10,
  TooManyRegistrations = 11,
}

export enum TelegramResult {
  InvalidRequest = 2,
  NotRegistered = 3,
  InvalidLogin = 4,
  InvalidEmail = 5,
  LoginAlreadyTaken = 6,
  EmailAlreadyTaken = 7,
  CodeAlreadySend = 8,
  EmailServiceDisallowed = 9,
  TooManyRegistrations = 10
}

export enum VkResult {
  InvalidRequest = 2,
  NotRegistered = 3,
  InvalidLogin = 4,
  InvalidEmail = 5,
  LoginAlreadyTaken = 6,
  EmailAlreadyTaken = 7,
  CodeAlreadySend = 8,
  EmailServiceDisallowed = 9,
  TooManyRegistrations = 10
}

export enum YandexResult {
  InvalidRequest = 2,
  NotRegistered = 3,
  InvalidLogin = 4,
  InvalidEmail = 5,
  LoginAlreadyTaken = 6,
  EmailAlreadyTaken = 7,
  CodeAlreadySend = 8,
  EmailServiceDisallowed = 9,
  TooManyRegistrations = 10,
}

export enum SignUpResult {
  InvalidLogin = 2,
  InvalidEmail = 3,
  InvalidPassword = 4,
  LoginAlreadyTaken = 5,
  EmailAlreadyTaken = 6,
  CodeAlreadySend = 7,
  CodeCannotSend = 8,
  EmailServiceDisallowed = 9,
  TooManyRegistrations = 10,
}

export enum VerifyResult {
  InvalidLogin = 2,
  InvalidEmail = 3,
  InvalidPassword = 4,
  LoginAlreadyTaken = 5,
  EmailAlreadyTaken = 6,
  CodeInvalid = 7,
  CodeExpired = 8,
  InvalidHash = 9,
  EmailServiceDisallowed = 10,
  TooManyRegistrations = 11,
}