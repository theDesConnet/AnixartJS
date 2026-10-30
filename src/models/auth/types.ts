/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

import { IResponse } from "../common/types";
import { IProfile, IProfileToken } from "../profile/types";
import {
  CheckLoginResult,
  GoogleResult,
  QrAuthResult,
  QrAuthStatus,
  ResendResult,
  RestoreResendResult,
  RestoreResult,
  RestoreVerifyResult,
  SignInResult,
  SignUpResult,
  TelegramResult,
  VerifyResult,
  VkResult,
  YandexResult,
} from "./enums";

/** Доступность логина и предложенные сервером варианты. */
export interface ICheckLoginResponse extends IResponse<CheckLoginResult> {
  available: boolean;
  suggested_logins: string[];
}

/** Тема Firebase для подписки на уведомления. */
export interface IFirebaseResponse extends IResponse {
  topicName: string;
}

/** Данные регистрации для повторной отправки кода. */
export interface IResendRequest {
  login: string;
  email: string;
  password: string;
  vkAccessToken: string;
  googleIdToken: string;
  telegramIdToken: string;
  yandexAccessToken: string;
  hash: string;
}

/** Повторная отправка кода восстановления пароля. */
export interface IRestoreResendRequest {
  data: string;
  password: string;
  hash: string;
}

/** Подтверждение восстановления пароля кодом. */
export interface IRestoreVerifyRequest {
  data: string;
  password: string;
  hash: string;
  code: string;
}

/** Вход по логину и паролю. */
export interface ISignInRequest {
  login: string;
  password: string;
}

/** Регистрация по логину, почте и паролю. */
export interface ISignUpRequest {
  login: string;
  email: string;
  password: string;
}

/** Подтверждение регистрации кодом; токены зависят от способа входа. */
export interface IVerifyRequest {
  login: string;
  email: string;
  password?: string;
  vkAccessToken?: string;
  googleIdToken?: string;
  telegramIdToken?: string;
  yandexAccessToken?: string;
  hash: string;
  code: string;
}

/** Данные для подтверждения регистрации. */
export interface ISignUpResponse extends IResponse<SignUpResult> {
  codeTimestampExpires: number;
  hash: string;
  suggested_logins: string[];
}

/** Профиль и токен после подтверждения регистрации. */
export interface IVerifyResponse extends IResponse<VerifyResult> {
  profile: IProfile;
  profileToken: IProfileToken;
  suggested_logins: string[];
}

/** Ответ со сроком действия, возвращённым сервером. */
export interface ITimestampResponse<
  T extends number = never,
> extends IResponse<T> {
  timestampExpires: number;
}

/** Профиль и токен после авторизации. */
export interface IAuthProfileResponse<
  T extends number = never,
> extends IResponse<T> {
  profile: IProfile;
  profileToken: IProfileToken;
}

/** Ответ входа через внешний сервис с данными для подтверждения. */
export interface IOAuthSignInResponse<
  T extends number = never,
> extends IAuthProfileResponse<T> {
  codeTimestampExpires: number;
  suggested_logins: string[];
  hash: string;
}

/** Срок действия после повторной отправки кода регистрации. */
export interface IResendResponse extends ITimestampResponse<ResendResult> {}

/** Данные для подтверждения восстановления пароля. */
export interface IRestoreResponse extends IResponse<RestoreResult> {
  hash: string;
  codeTimestampExpires: number;
}

/** Срок действия после повторной отправки кода восстановления. */
export interface IRestoreResendResponse extends ITimestampResponse<RestoreResendResult> {}

/** Профиль и токен после восстановления пароля. */
export interface IRestoreVerifyResponse extends IAuthProfileResponse<RestoreVerifyResult> {}

/** Результат входа по логину и паролю. */
export interface ISignInResponse extends IAuthProfileResponse<SignInResult> {}

/** Результат входа через Google. */
export interface IGoogleResponse extends IOAuthSignInResponse<GoogleResult> {}

/** Результат входа через Telegram. */
export interface ITelegramResponse extends IOAuthSignInResponse<TelegramResult> {}

/** Результат входа через VK. */
export interface IVkResponse extends IOAuthSignInResponse<VkResult> {}

/** Результат входа через Яндекс с почтой пользователя. */
export interface IYandexResponse extends IOAuthSignInResponse<YandexResult> {
  email: string;
}

/** Данные новой сессии входа по QR и интервал её опроса. */
export interface IQrAuthCreateResponse extends IResponse<QrAuthResult> {
  expires_in: number;
  key: string;
  pin: string;
  poll_interval: number;
  secret: string;
}

/** Состояние QR-сессии; профиль и токен могут ещё отсутствовать. */
export interface IQrAuthStatusResponse extends IResponse<QrAuthResult> {
  status: QrAuthStatus;
  /** Присутствует после успешного подтверждения QR-сессии. */
  profile?: IProfile;
  /** Токен для дальнейших запросов после подтверждения входа. */
  profileToken?: IProfileToken;
}

/** Устройство и оставшиеся попытки подтверждения QR-сессии. */
export interface IQrAuthOpenResponse extends IResponse<QrAuthResult> {
  attempts_left: number;
  country_code: string;
  device: string;
  expires_in: number;
}
