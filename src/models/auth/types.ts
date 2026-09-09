import { IResponse } from "../common/types";
import { IProfile, IProfileToken } from "../profile/types";
import {
  CheckLoginResult,
  GoogleResult,
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

export interface ICheckLoginResponse extends IResponse<CheckLoginResult> {
  available: boolean;
  suggested_logins: string[];
}

export interface IFirebaseResponse extends IResponse {
  topicName: string;
}

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

export interface IRestoreResendRequest {
  data: string;
  password: string;
  hash: string;
}

export interface IRestoreVerifyRequest {
  data: string;
  password: string;
  hash: string;
  code: string;
}

export interface ISignInRequest {
  login: string;
  password: string;
}

export interface ISignUpRequest {
  login: string;
  email: string;
  password: string;
}

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

export interface ISignUpResponse extends IResponse<SignUpResult> {
  codeTimestampExpires: number;
  hash: string;
  suggested_logins: string[];
}

export interface IVerifyResponse extends IResponse<VerifyResult> {
  profile: IProfile;
  profileToken: IProfileToken;
  suggested_logins: string[];
}

export interface ITimestampResponse<
  T extends number = never,
> extends IResponse<T> {
  timestampExpires: number;
}

export interface IAuthProfileResponse<
  T extends number = never,
> extends IResponse<T> {
  profile: IProfile;
  profileToken: IProfileToken;
}

export interface IOAuthSignInResponse<
  T extends number = never,
> extends IAuthProfileResponse<T> {
  codeTimestampExpires: number;
  suggested_logins: string[];
  hash: string;
}

export interface IResendResponse extends ITimestampResponse<ResendResult> {}

export interface IRestoreResponse extends IResponse<RestoreResult> {
  hash: string;
  codeTimestampExpires: number;
}

export interface IRestoreResendResponse extends ITimestampResponse<RestoreResendResult> {}

export interface IRestoreVerifyResponse extends IAuthProfileResponse<RestoreVerifyResult> {}

export interface ISignInResponse extends IAuthProfileResponse<SignInResult> {}

export interface IGoogleResponse extends IOAuthSignInResponse<GoogleResult> {}

export interface ITelegramResponse extends IOAuthSignInResponse<TelegramResult> {}

export interface IVkResponse extends IOAuthSignInResponse<VkResult> {}

export interface IYandexResponse extends IOAuthSignInResponse<YandexResult> {
  email: string;
}
