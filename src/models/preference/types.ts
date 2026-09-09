import { IResponse } from "../common/types";
import { ITheme } from "../profile/types";
import { ChangeEmailResendResult, ChangeEmailResult, ChangeLoginResult, ChangePasswordResult, ProfileSelectThemeResult } from "./enums";

export interface IChangeEmailRequest {
    new_email: string;
    current_email: string;
    current_password: string;
}

export interface IChangeEmailResendRequest {
    new_email: string;
    current_email: string;
    current_password: string;
    hash: string;
}

export interface IChangeEmailVerifyRequest {
    new_email: string;
    code: number;
    hash: string;
}

export interface IChangePasswordRequest {
    current_password: string;
    new_password: string;
}

export interface ISocialRequest {
    vkPage: string,
    tgPage: string,
    instPage: string,
    ttPage: string,
    discordPage: string
}

export interface IChangeEmailResponse extends IResponse<ChangeEmailResult> {
    hash: string
    timestamp_expires: number
}

export interface IChangeEmailResendResponse extends IResponse<ChangeEmailResendResult> {
    timestamp_expires: number
}

export interface IChangeLoginResponse extends IResponse<ChangeLoginResult> {
    suggested_logins: string[]
}

export interface ILoginInfoResponse extends IResponse {
    login: string,
    avatar: string,
    is_change_avaliable: boolean,
    last_change_at: number,
    next_change_avaliable_at: number
}

export interface IChangePasswordResponse extends IResponse<ChangePasswordResult> {
    token: string
}

export interface IProfileSelectThemeResponse extends IResponse<ProfileSelectThemeResult> {
    theme: ITheme
}

export interface IProfileSocialResponse extends IResponse {
    discord_page: string;
    inst_page: string;
    tg_page: string;
    tt_page: string;
    vk_page: string;
}