/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

import { IEpisode } from "../release/types";
import { ReportType } from "./enums";

/** Причина жалобы из списка API. */
export interface IReportReason {
  id: number;
  name: string;
}

/** Жалоба; тип entity_id зависит от объекта жалобы. */
export interface IReportRequest<T = number> {
  entity_id?: T | null;
  message: string;
  reason: number;
}

/** Для жалобы на серию нужен объект серии, для остальных — ID. */
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