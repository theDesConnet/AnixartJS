/**
 * ╔═══════════════════════════════════════════════════╗
 * ║                    AnixartJS                      ║
 * ║    https://github.com/theDesConnet/AnixartJS      ║
 * ║          Licensed under GPL-2.0 License           ║
 * ║                   by DesConnet                    ║
 * ╚═══════════════════════════════════════════════════╝
 */

import { Auth, Settings, Profile, Release, Notification, Collection, Discover, Channel, Feed, Search } from "./api";
import { IBaseApiParams, IScheduleResponse, ITypeResponse, DefaultResult } from "./types";
import { Anixart } from "./client";

export class Endpoints {
    public readonly auth: Auth;
    public readonly profile: Profile;
    public readonly release: Release;
    public readonly settings: Settings;
    public readonly notification: Notification;
    public readonly collection: Collection;
    public readonly discover: Discover;
    public readonly channel: Channel;
    public readonly feed: Feed;
    public readonly search: Search;

    constructor(readonly client: Anixart) {
        this.auth = new Auth(client);
        this.profile = new Profile(client);
        this.release = new Release(client);
        this.settings = new Settings(client);
        this.notification = new Notification(client);
        this.collection = new Collection(client);
        this.discover = new Discover(client);
        this.channel = new Channel(client);
        this.feed = new Feed(client);
        this.search = new Search(client);
    }

    public async getSchedule(options?: IBaseApiParams): Promise<IScheduleResponse> {
        return await this.client.call<DefaultResult, IScheduleResponse>({ path: '/schedule', ...options });
    }

    public async getTypes(options?: IBaseApiParams): Promise<ITypeResponse> {
        return await this.client.call<DefaultResult, ITypeResponse>({ path: '/type/all', ...options });
    }
}