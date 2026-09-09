import { IEpisode } from "../release/types";
import { ReportType } from "./enums";

export interface IReportReason {
  id: number;
  name: string;
}

export interface IReportRequest<T = number> {
  entity_id?: T | null;
  message: string;
  reason: number;
}

export interface IReportPayloadMap {
  [ReportType.Article]: number;
  [ReportType.ArticleComment]: number;
  [ReportType.Channel]: number;
  [ReportType.Collection]: number;
  [ReportType.CollectionComment]: number;
  [ReportType.Episode]: IEpisode;
  [ReportType.Profile]: number;
  [ReportType.Release]: number;
  [ReportType.ReleaseComment]: number;
}