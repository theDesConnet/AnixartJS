/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

import { IResponse } from "../common/types";
import { ITheme } from "../profile/types";
import { ChangeEmailResendResult, ChangeEmailResult, ChangeLoginResult, ChangePasswordResult, ProfileSelectThemeResult } from "./enums";

/** Новая почта и данные для подтверждения смены. */
export interface IChangeEmailRequest {
    new_email: string;
    current_email: string;
    current_password: string;
}

/** Повторная отправка кода смены почты с полученным hash. */
export interface IChangeEmailResendRequest {
    new_email: string;
    current_email: string;
    current_password: string;
    hash: string;
}

/** Код и hash для завершения смены почты. */
export interface IChangeEmailVerifyRequest {
    new_email: string;
    code: number;
    hash: string;
}

/** Текущий и новый пароли. */
export interface IChangePasswordRequest {
    current_password: string;
    new_password: string;
}

/** Ссылки на соцсети при редактировании профиля. */
export interface ISocialRequest {
    vkPage: string,
    tgPage: string,
    instPage: string,
    ttPage: string,
    discordPage: string
}

/** Hash и срок действия подтверждения смены почты. */
export interface IChangeEmailResponse extends IResponse<ChangeEmailResult> {
    hash: string
    timestamp_expires: number
}

/** Срок действия повторно отправленного кода смены почты. */
export interface IChangeEmailResendResponse extends IResponse<ChangeEmailResendResult> {
    timestamp_expires: number
}

/** Результат смены логина с вариантами от сервера. */
export interface IChangeLoginResponse extends IResponse<ChangeLoginResult> {
    suggested_logins: string[]
}

/** Текущий логин и ограничения на следующую смену. */
export interface ILoginInfoResponse extends IResponse {
    login: string,
    avatar: string,
    is_change_avaliable: boolean,
    last_change_at: number,
    next_change_avaliable_at: number
}

/** Токен, возвращённый после смены пароля. */
export interface IChangePasswordResponse extends IResponse<ChangePasswordResult> {
    token: string
}

/** Параметры выбранной темы профиля. */
export interface IProfileSelectThemeResponse extends IResponse<ProfileSelectThemeResult> {
    theme: ITheme
}

/** Ссылки на соцсети в формате ответа API. */
export interface IProfileSocialResponse extends IResponse {
    discord_page: string;
    inst_page: string;
    tg_page: string;
    tt_page: string;
    vk_page: string;
}