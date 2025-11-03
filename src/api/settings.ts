import { Anixart } from "../client";
import {
    IBadgesResponse,
    IEmailChangeConfirmResponse,
    IEmailChangeRequest,
    ILoginInfoResponse,
    INewLogin,
    IProfileSettingsResponse,
    PrivacyFriendRequestState,
    PrivacyState,
    ISocialResponse, 
    IBaseApiParams, 
    IPageableResponse, 
    IResponse,
    IPasswordChangeResponse,
    DefaultResult,
    SocialEditResult,
    ChangeEmailConfirmResult,
    ChangeEmailResult,
    ChangePasswordResult,
    ChangeLoginResult
} from "../types";

export class Settings {
    public constructor(private readonly client: Anixart) { }

    public async getCurrentProfileSettings(options?: IBaseApiParams): Promise<IProfileSettingsResponse> {
        return await this.client.call<DefaultResult, IProfileSettingsResponse>({ path: `/profile/preference/my`, ...options });
    }

    public async getBadges(page: number, options?: IBaseApiParams): Promise<IBadgesResponse> {
        return await this.client.call<DefaultResult, IBadgesResponse>({ path: `/profile/preference/badge/all/${page}`, ...options });
    }

    public async editBadge(id: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/preference/badge/edit/${id}`, ...options });
    }

    public async removeBadge(options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/preference/badge/remove`, ...options });
    }

    public async setStatus(status: string, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/preference/status/edit`, json: { status }, ...options });
    }

    public async getSocial(options?: IBaseApiParams): Promise<ISocialResponse> {
        return await this.client.call<DefaultResult, ISocialResponse>({ path: `/profile/preference/social`, ...options });
    }

    public async setSocial(data: ISocialResponse, options?: IBaseApiParams): Promise<IResponse<SocialEditResult>> {
        return await this.client.call<SocialEditResult, IResponse<SocialEditResult>>({ path: `/profile/preference/social/edit`, json: {vkPage: data.vk_page, tgPage: data.tg_page, instPage: data.inst_page, ttPage: data.tt_page, discordPage: data.discord_page}, ...options });
    }

    public async confirmChangeEmail(currentPassword: string, options?: IBaseApiParams): Promise<IEmailChangeConfirmResponse> {
        return await this.client.call<ChangeEmailConfirmResult, IEmailChangeConfirmResponse>({ path: `/profile/preference/email/change/confirm`, queryParams: { current: currentPassword }, ...options });
    }

    public async changeEmail(data: IEmailChangeRequest, options?: IBaseApiParams): Promise<IResponse<ChangeEmailResult>> {
        return await this.client.call<ChangeEmailResult, IResponse<ChangeEmailResult>>({ path: `/profile/preference/email/change`, queryParams: { current_password: data.password, current: data.oldEmail, new: data.newEmail }, ...options });
    }

    public async changePassword(currentPassword: string, newPassword: string, options?: IBaseApiParams): Promise<IPasswordChangeResponse> {
        return await this.client.call<ChangePasswordResult, IPasswordChangeResponse>({ path: `/profile/preference/password/change`, queryParams: { current: currentPassword, new: newPassword }, ...options });
    }

    public async getLoginInfo(options?: IBaseApiParams): Promise<ILoginInfoResponse> {
        return await this.client.call<DefaultResult, ILoginInfoResponse>({ path: `/profile/preference/login/info`, ...options });
    }

    public async getLoginHistory(id: number, page: number, options?: IBaseApiParams): Promise<IPageableResponse<INewLogin>> {
        return await this.client.call<DefaultResult, IPageableResponse<INewLogin>>({ path: `/profile/login/history/all/${id}/${page}`, ...options });
    }

    public async changeLogin(newLogin: string, options?: IBaseApiParams): Promise<IResponse<ChangeLoginResult>> {
        return await this.client.call<ChangeLoginResult, IResponse<ChangeLoginResult>>({ path: `/profile/preference/login/change`, queryParams: { login: newLogin }, ...options });
    }

    public async setCommentNotification(options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/preference/notification/comment/edit`, ...options });
    }

    public async setCollectionCommentNotification(options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/preference/notification/my/collection/comment/edit`, ...options });
    }

    public async setReportProgressNotification(options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/preference/notification/report/process/edit`, ...options });
    }

    public async setRelatedReleaseNotification(options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/preference/notification/related/release/edit`, ...options });
    }

    public async setEpisodeNotification(options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/preference/notification/episode/edit`, ...options });
    }

    public async setStatusNotification(options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/preference/notification/status/edit`, ...options });
    }

    public async setPrivacyStats(state: PrivacyState, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/preference/privacy/stats/edit`, json: { permission: state }, ...options });
    }

    public async setPrivacyCounts(state: PrivacyState, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/preference/privacy/counts/edit`, json: { permission: state }, ...options });
    }

    public async setPrivacySocial(state: PrivacyState, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/preference/privacy/social/edit`, json: { permission: state }, ...options });
    }

    public async setPrivacyFriendRequests(state: PrivacyFriendRequestState, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/preference/privacy/friendRequests/edit`, json: { permission: state }, ...options });
    }
}