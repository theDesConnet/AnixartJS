export interface IAnixPlayerConfigResponse {
    download_links: Record<string, string>;
    last_version_code: number;
    whats_new: string;
}

export interface IToggleResponse {
    adBannerDelay: number;
    adBannerSizeType: number;
    adInterstitialDelay: number;

    codecProfile: string;

    impMessageEnabled: boolean;

    inAppUpdates: boolean;
    inAppUpdatesFlexibleDelay: number;
    inAppUpdatesImmediate: boolean;

    kodikIframeAd: boolean;

    lastGPVersionCode: number;
    lastVersionCode: number;

    minBlogCreateRatingScore: number;
    minGPVersionCode: number;
    minVersionCode: number;

    overrideGPVersion: boolean;

    sibnetRandUserAgent: boolean;

    snowfall: boolean;

    sponsorshipAvailable: boolean;
    sponsorshipPromotion: boolean;

    whatsNew: string;
    downloadLink: string;
    gpWhatsNew: string;
    gpDownloadLink: string;

    impMessageText: string;
    impMessageBackgroundColor: string;
    impMessageTextColor: string;
    impMessageLink: string;

    adBannerBlockId: string;
    adInterstitialBlockId: string;

    kodikVideoLinksUrl: string;
    sibnetUserAgent: string;
    torlookUrl: string;
    baseUrl: string;
    iframeEmbedUrl: string;
    kodikAdIframeUrl: string;
    editorUrl: string;
    staticDomain: string;
    sponsorshipText: string;
    pageNoConnectionUrl: string;

    searchBarIconUrl: string;
    searchBarIconTint: string;
    searchBarIconAction: string;
    searchBarIconValue: string;

    googleAuthAvailable: boolean;
    telegramAuthAvailable: boolean;
    vkAuthAvailable: boolean;
    consentRequired: boolean;
}

export interface IConfigUrlsResponse{
    api_urls: string[];
    editor_url?: string;
    static_domain?: string;
    should_use_mirror_urls: boolean;
    google_auth_available: boolean;
    telegram_auth_available: boolean;
    vk_auth_available: boolean;
    yandex_auth_available: boolean;
    consent_required: boolean;
}
